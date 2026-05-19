"""Vigil 🦇 — 24/7 background scheduler.

APScheduler AsyncIOScheduler runs inside the FastAPI event loop. No external
worker process required (Celery / Redis would be overkill for a 33-account
scale; revisit if we ever go multi-worker uvicorn).

Behavior:
- Every VIGIL_INTERVAL_MINUTES (default 60), iterate every (user, customer)
  with an active Google Ads connection.
- Per-(user, customer) dedup: skip if a `vigil.scan` AuditLog entry exists
  within VIGIL_DEDUP_MINUTES (default 45). Prevents storms on overlapping
  ticks or after restart.
- Concurrency cap (VIGIL_MAX_CONCURRENT, default 3) via asyncio.Semaphore —
  protects Anthropic rate limits + Google Ads API quota.
- After each successful Vigil run, fire Aegis review on newly-proposed alerts.
- Hard gate: VIGIL_ENABLED env var must equal "true" (case-insensitive) to run.
  Defaults to "false" everywhere — explicit opt-in required.

Env vars (all optional):
    VIGIL_ENABLED               default false
    VIGIL_INTERVAL_MINUTES      default 60
    VIGIL_DEDUP_MINUTES         default 45   (must be < interval to allow scans)
    VIGIL_MAX_CONCURRENT        default 3
    VIGIL_DAYS_WINDOW           default 14   (passed to VigilAgent)
"""
from __future__ import annotations

import asyncio
import logging
import os
from datetime import datetime, timedelta
from typing import Optional

from apscheduler.schedulers.asyncio import AsyncIOScheduler
from sqlalchemy import select, and_

from db.models import AuditLog, GoogleAdsAccount, User
from db.session import AsyncSessionLocal

logger = logging.getLogger(__name__)


def _env_bool(name: str, default: bool = False) -> bool:
    return os.getenv(name, "true" if default else "false").lower() in {"1", "true", "yes"}


def _env_int(name: str, default: int) -> int:
    try:
        return int(os.getenv(name, str(default)))
    except (TypeError, ValueError):
        return default


_scheduler: Optional[AsyncIOScheduler] = None


def vigil_enabled() -> bool:
    return _env_bool("VIGIL_ENABLED", default=False)


def vigil_interval_minutes() -> int:
    return max(1, _env_int("VIGIL_INTERVAL_MINUTES", 60))


def vigil_dedup_minutes() -> int:
    return max(1, _env_int("VIGIL_DEDUP_MINUTES", 45))


def vigil_max_concurrent() -> int:
    return max(1, _env_int("VIGIL_MAX_CONCURRENT", 3))


def vigil_days_window() -> int:
    # Default 30 days — detector uses yesterday as reference + median of
    # prior ~28 days as baseline. Less data still works (median falls back
    # to whatever is available) but is more noise-prone.
    return max(7, _env_int("VIGIL_DAYS_WINDOW", 30))


async def _list_scan_targets() -> list[tuple[str, str]]:
    """Return list of (user_id, google_customer_id) pairs to scan this tick.

    Filters to: active user + active Google Ads account + non-empty refresh_token
    + user's vigil_enabled setting (default on).
    """
    from services import vigil_settings as _vs

    out: list[tuple[str, str]] = []
    async with AsyncSessionLocal() as session:
        stmt = (
            select(GoogleAdsAccount, User)
            .join(User, User.id == GoogleAdsAccount.user_id)
            .where(
                and_(
                    GoogleAdsAccount.is_active == True,  # noqa: E712
                    User.is_active == True,  # noqa: E712
                )
            )
        )
        rows = (await session.execute(stmt)).all()

    # Per-user opt-out check (1 DB call per distinct user, cached locally).
    enabled_cache: dict[str, bool] = {}
    for ga, _user in rows:
        if not ga.oauth_refresh_token:
            continue
        if ga.user_id not in enabled_cache:
            enabled_cache[ga.user_id] = await _vs.is_vigil_enabled(ga.user_id)
        if not enabled_cache[ga.user_id]:
            continue
        out.append((ga.user_id, ga.google_customer_id))
    return out


async def _was_scanned_recently(user_id: str, customer_id: str) -> bool:
    """Check if a `vigil.scan` AuditLog entry was written for this pair within
    VIGIL_DEDUP_MINUTES. Used to skip overlapping ticks / post-restart storms.
    """
    cutoff = datetime.utcnow() - timedelta(minutes=vigil_dedup_minutes())
    async with AsyncSessionLocal() as session:
        stmt = (
            select(AuditLog)
            .where(
                and_(
                    AuditLog.user_id == user_id,
                    AuditLog.event_type == "vigil.scan",
                    AuditLog.created_at >= cutoff,
                )
            )
            .order_by(AuditLog.created_at.desc())
            .limit(5)
        )
        rows = (await session.execute(stmt)).scalars().all()
    for r in rows:
        if isinstance(r.payload, dict) and r.payload.get("customer_id") == customer_id:
            return True
    return False


async def _record_scan(user_id: str, customer_id: str, payload: dict) -> None:
    """Write the dedup marker + scan summary into audit_log."""
    async with AsyncSessionLocal() as session:
        session.add(
            AuditLog(
                user_id=user_id,
                event_type="vigil.scan",
                payload={"customer_id": customer_id, **payload},
            )
        )
        await session.commit()


async def _run_vigil_for_account(
    user_id: str,
    customer_id: str,
    sem: asyncio.Semaphore,
) -> dict:
    """Run Vigil for one (user, account), then Aegis review on any new alerts.

    Returns a small summary dict — surfaced into audit_log for observability.
    """
    # Lazy imports to avoid pulling heavy modules at scheduler-construction time.
    from agents.anomaly_agent import VigilAgent
    from agents.risk_agent import AegisAgent
    from services import vigil_notifier
    from ws.events import make_publisher

    async with sem:
        publisher = make_publisher(user_id)
        agent = VigilAgent(
            user_id=user_id,
            customer_id=customer_id,
            event_publisher=publisher,
            days=vigil_days_window(),
        )
        try:
            result = await agent.run()
        except Exception:
            logger.exception(
                "Vigil run crashed for user=%s customer=%s", user_id, customer_id
            )
            return {
                "ok": False,
                "error": "vigil_run_exception",
                "alerts": 0,
                "iterations": 0,
            }

        alerts = list(agent.alerts)
        new_action_ids = [
            a.get("action_id") for a in alerts if a.get("action_id")
        ]

        # Aegis follow-up — review newly raised anomaly alerts.
        aegis_reviews_count = 0
        aegis_reviews: list[dict] = []
        if alerts:
            try:
                aegis = AegisAgent(user_id=user_id, event_publisher=publisher)
                await aegis.run()
                aegis_reviews = list(aegis.reviews)
                aegis_reviews_count = len(aegis_reviews)
            except Exception:
                logger.exception(
                    "Aegis follow-up failed for user=%s customer=%s",
                    user_id, customer_id,
                )

        # Critical-anomaly email digest (one per scan, rate-limited per customer).
        email_summary: dict = {"sent": False}
        if new_action_ids:
            try:
                email_summary = await vigil_notifier.notify_critical_anomalies(
                    user_id=user_id,
                    customer_id=customer_id,
                    new_action_ids=new_action_ids,
                    aegis_reviews=aegis_reviews,
                )
            except Exception:
                logger.exception(
                    "Vigil email notify failed for user=%s customer=%s",
                    user_id, customer_id,
                )

        return {
            "ok": result.error is None,
            "error": result.error,
            "alerts": len(alerts),
            "iterations": result.iterations,
            "tool_calls": len(result.tool_calls),
            "aegis_reviews": aegis_reviews_count,
            "email": email_summary,
        }


async def vigil_tick() -> dict:
    """Single scheduler tick — scan every eligible account.

    Returns a summary dict for logging. Safe to call manually (e.g. from a
    test endpoint) — doesn't depend on APScheduler running.
    """
    if not vigil_enabled():
        return {"skipped": True, "reason": "VIGIL_ENABLED=false"}

    targets = await _list_scan_targets()
    if not targets:
        logger.info("Vigil tick: no scan targets (no active accounts).")
        return {"targets": 0, "scanned": 0}

    sem = asyncio.Semaphore(vigil_max_concurrent())

    async def _maybe_run(user_id: str, customer_id: str) -> tuple[str, str, dict]:
        if await _was_scanned_recently(user_id, customer_id):
            return user_id, customer_id, {"skipped": True, "reason": "recent_scan"}
        summary = await _run_vigil_for_account(user_id, customer_id, sem)
        await _record_scan(user_id, customer_id, summary)
        return user_id, customer_id, summary

    tasks = [_maybe_run(uid, cid) for uid, cid in targets]
    results = await asyncio.gather(*tasks, return_exceptions=True)

    scanned = 0
    skipped = 0
    alerts_total = 0
    errors = 0
    for r in results:
        if isinstance(r, BaseException):
            errors += 1
            logger.exception("Vigil tick subtask crashed: %s", r)
            continue
        _, _, summary = r
        if summary.get("skipped"):
            skipped += 1
        elif summary.get("ok"):
            scanned += 1
            alerts_total += summary.get("alerts", 0)
        else:
            errors += 1

    summary = {
        "targets": len(targets),
        "scanned": scanned,
        "skipped": skipped,
        "errors": errors,
        "alerts_total": alerts_total,
        "tick_at": datetime.utcnow().isoformat(),
    }
    logger.info("Vigil tick complete: %s", summary)
    return summary


def start_scheduler() -> Optional[AsyncIOScheduler]:
    """Start the APScheduler for Vigil. Idempotent — calling twice is a no-op.

    Called from FastAPI lifespan. Returns the scheduler or None if disabled.
    """
    global _scheduler

    if not vigil_enabled():
        logger.info("Vigil scheduler disabled (VIGIL_ENABLED!=true). Not starting.")
        return None
    if _scheduler is not None and _scheduler.running:
        return _scheduler

    interval = vigil_interval_minutes()
    sched = AsyncIOScheduler()
    sched.add_job(
        vigil_tick,
        trigger="interval",
        minutes=interval,
        id="vigil_tick",
        replace_existing=True,
        max_instances=1,
        coalesce=True,
        # APScheduler treats naive datetimes as local time — use datetime.now()
        # not datetime.utcnow() to avoid a `Run time was missed` warning at boot.
        next_run_time=datetime.now() + timedelta(seconds=30),
    )
    sched.start()
    _scheduler = sched
    logger.info(
        "Vigil scheduler started: interval=%dm dedup=%dm concurrency=%d days=%d",
        interval,
        vigil_dedup_minutes(),
        vigil_max_concurrent(),
        vigil_days_window(),
    )
    return sched


def stop_scheduler() -> None:
    """Stop the scheduler. Called from FastAPI lifespan shutdown."""
    global _scheduler
    if _scheduler is not None:
        try:
            _scheduler.shutdown(wait=False)
        except Exception:
            logger.exception("Vigil scheduler shutdown failed")
        _scheduler = None
        logger.info("Vigil scheduler stopped.")


def scheduler_status() -> dict:
    """Snapshot for /health or debug — what's the scheduler currently doing."""
    sched = _scheduler
    if sched is None:
        return {
            "enabled": vigil_enabled(),
            "running": False,
            "next_run": None,
        }
    job = sched.get_job("vigil_tick")
    return {
        "enabled": vigil_enabled(),
        "running": sched.running,
        "interval_minutes": vigil_interval_minutes(),
        "dedup_minutes": vigil_dedup_minutes(),
        "max_concurrent": vigil_max_concurrent(),
        "days_window": vigil_days_window(),
        "next_run": job.next_run_time.isoformat() if job and job.next_run_time else None,
    }
