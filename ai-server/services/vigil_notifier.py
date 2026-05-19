"""Vigil 🦇 critical-anomaly email notifications (Sprint 8 Phase 5).

When Vigil raises one or more critical alerts on a customer in a single scan,
the user gets a single digest email — not one email per alert (spam-avoidance).

Rules:
- Only critical severity triggers email (warnings stay in-app).
- Aegis-blocked alerts (false positives) are excluded.
- Per-(user, customer_id) rate limit: max VIGIL_EMAIL_DAILY_CAP emails / 24h
  (default 3). Beyond the cap we still log the alert to UI but skip email.
- Per-alert dedupe: each alert is emailed at most once. Tracked via AuditLog
  event_type='vigil.alert_emailed' with payload.action_id.
- Mock-mode honesty: if RESEND_API_KEY is unset, the email is logged to
  sent_emails.jsonl, NOT delivered. The audit log still records the attempt
  so the UI can show "Mock mode" honestly.

Env vars:
    RESEND_API_KEY              — required for real delivery (services/emailer.py)
    VIGIL_EMAIL_ENABLED         default true   (independent of VIGIL_ENABLED)
    VIGIL_EMAIL_DAILY_CAP       default 3      per (user, customer) per 24h
    VIGIL_DASHBOARD_URL         default https://www.kampaio.com/b6  (link in email)
"""
from __future__ import annotations

import logging
import os
from datetime import datetime, timedelta
from typing import Any, Iterable

from sqlalchemy import select, and_, desc

from db.models import AgentAction, AuditLog, User
from db.session import AsyncSessionLocal
from services import emailer

logger = logging.getLogger(__name__)


def _env_bool(name: str, default: bool = False) -> bool:
    return os.getenv(name, "true" if default else "false").lower() in {"1", "true", "yes"}


def _env_int(name: str, default: int) -> int:
    try:
        return int(os.getenv(name, str(default)))
    except (TypeError, ValueError):
        return default


def email_enabled() -> bool:
    return _env_bool("VIGIL_EMAIL_ENABLED", default=True)


def daily_cap() -> int:
    return max(1, _env_int("VIGIL_EMAIL_DAILY_CAP", 3))


def dashboard_url() -> str:
    return os.getenv("VIGIL_DASHBOARD_URL", "https://www.kampaio.com/b6")


async def _email_count_last_24h(user_id: str, customer_id: str) -> int:
    """Count `vigil.email` audit entries for this (user, customer) in last 24h."""
    cutoff = datetime.utcnow() - timedelta(hours=24)
    async with AsyncSessionLocal() as session:
        stmt = (
            select(AuditLog)
            .where(
                and_(
                    AuditLog.user_id == user_id,
                    AuditLog.event_type == "vigil.email",
                    AuditLog.created_at >= cutoff,
                )
            )
            .order_by(desc(AuditLog.created_at))
            .limit(20)
        )
        rows = (await session.execute(stmt)).scalars().all()
    return sum(
        1
        for r in rows
        if isinstance(r.payload, dict) and r.payload.get("customer_id") == customer_id
    )


async def _already_emailed_ids(action_ids: list[str]) -> set[str]:
    """Return subset of action_ids that already have a `vigil.alert_emailed` log entry."""
    if not action_ids:
        return set()
    async with AsyncSessionLocal() as session:
        stmt = select(AuditLog).where(
            and_(
                AuditLog.event_type == "vigil.alert_emailed",
                AuditLog.action_id.in_(action_ids),
            )
        )
        rows = (await session.execute(stmt)).scalars().all()
    return {r.action_id for r in rows if r.action_id}


_SEVERITY_RANK = {"info": 0, "warning": 1, "critical": 2}


def _filter_min_severity_unblocked(
    actions: list[AgentAction],
    aegis_by_action: dict[str, dict],
    min_severity: str,
) -> list[AgentAction]:
    threshold = _SEVERITY_RANK.get(min_severity, 2)
    out: list[AgentAction] = []
    for a in actions:
        target = a.target or {}
        sev = (target.get("severity") or "warning").lower()
        if _SEVERITY_RANK.get(sev, 1) < threshold:
            continue
        review = aegis_by_action.get(a.id) or {}
        if review.get("recommendation") == "block":
            continue
        out.append(a)
    return out


def _format_html(
    user_email: str,
    customer_id: str,
    alerts: Iterable[AgentAction],
    dash_url: str,
) -> str:
    rows: list[str] = []
    for a in alerts:
        t = a.target or {}
        rows.append(
            "<tr>"
            f"<td style='padding:8px 12px;border-bottom:1px solid #eee;font-family:monospace;'>"
            f"{t.get('anomaly_type', '?').replace('_', ' ')}</td>"
            f"<td style='padding:8px 12px;border-bottom:1px solid #eee;'>"
            f"{t.get('campaign_name') or t.get('campaign_id') or '?'}</td>"
            f"<td style='padding:8px 12px;border-bottom:1px solid #eee;'>"
            f"{t.get('summary') or ''}</td>"
            "</tr>"
        )
    body_rows = "\n".join(rows) or "<tr><td colspan='3' style='padding:12px;'>No alerts.</td></tr>"
    return f"""\
<div style="font-family: -apple-system, system-ui, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #1F232B;">
  <div style="margin-bottom: 24px;">
    <div style="font-size: 22px; font-weight: 700;">🦇 Vigil — critical alerts on your Google Ads account</div>
    <div style="color: #666; font-size: 13px; margin-top: 4px;">Customer ID: {customer_id}</div>
  </div>
  <p style="font-size: 14px; line-height: 1.5;">
    Vigil's overnight scan found <strong>{sum(1 for _ in alerts) if False else len(list(alerts))} critical anomaly signal(s)</strong> on this account.
    These are worth a 60-second look before you start your day.
  </p>
  <table style="width:100%; border-collapse: collapse; margin: 16px 0; font-size: 13px;">
    <thead>
      <tr style="background: #15181D; color: #fff;">
        <th style="padding:8px 12px; text-align:left;">Anomaly</th>
        <th style="padding:8px 12px; text-align:left;">Campaign</th>
        <th style="padding:8px 12px; text-align:left;">Signal</th>
      </tr>
    </thead>
    <tbody>
      {body_rows}
    </tbody>
  </table>
  <p style="margin-top: 24px;">
    <a href="{dash_url}" style="display: inline-block; background: #9F7AEA; color: #fff; padding: 10px 18px; border-radius: 6px; text-decoration: none; font-weight: 600;">Open Vigil dashboard</a>
  </p>
  <hr style="border:0; border-top:1px solid #eee; margin: 24px 0;"/>
  <div style="font-size: 11px; color: #999;">
    Sent to {user_email} by Kampaio · Vigil monitors your account 24/7 and emails only critical signals.
    To stop these emails, set Vigil to severity = warning+ in your account settings.
  </div>
</div>
"""


def _format_text(customer_id: str, alerts: list[AgentAction], dash_url: str) -> str:
    lines = [
        f"Vigil — critical alerts on Google Ads account {customer_id}.",
        "",
    ]
    for a in alerts:
        t = a.target or {}
        lines.append(
            f"- [{t.get('anomaly_type', '?')}] {t.get('campaign_name') or t.get('campaign_id')}: "
            f"{t.get('summary') or ''}"
        )
        if a.reasoning:
            lines.append(f"    → {a.reasoning[:160]}")
    lines.extend(["", f"Open dashboard: {dash_url}"])
    return "\n".join(lines)


async def notify_critical_anomalies(
    user_id: str,
    customer_id: str,
    *,
    new_action_ids: list[str],
    aegis_reviews: list[dict] | None = None,
) -> dict[str, Any]:
    """After a Vigil run, decide whether to send the user a digest email.

    Returns a summary dict suitable for logging / debugging.
    """
    if not email_enabled():
        return {"sent": False, "reason": "VIGIL_EMAIL_ENABLED=false"}
    if not new_action_ids:
        return {"sent": False, "reason": "no_new_alerts"}

    async with AsyncSessionLocal() as session:
        user = await session.get(User, user_id)
        if not user:
            return {"sent": False, "reason": "user_missing"}
        if not user.email:
            return {"sent": False, "reason": "no_email"}

        # Reload the actual AgentAction rows
        stmt = select(AgentAction).where(AgentAction.id.in_(new_action_ids))
        actions = list((await session.execute(stmt)).scalars().all())

    # Aegis verdicts (passed in from scheduler) — index by action_id
    aegis_by_action: dict[str, dict] = {}
    for rv in aegis_reviews or []:
        aid = rv.get("action_id")
        if aid:
            aegis_by_action[aid] = rv

    from services import vigil_settings as _vs
    min_severity = await _vs.get_min_severity(user_id)
    critical = _filter_min_severity_unblocked(actions, aegis_by_action, min_severity)
    if not critical:
        return {
            "sent": False,
            "reason": "no_alerts_above_min_severity",
            "min_severity": min_severity,
        }

    # Per-alert dedupe: skip ones already emailed before
    already = await _already_emailed_ids([a.id for a in critical])
    fresh = [a for a in critical if a.id not in already]
    if not fresh:
        return {"sent": False, "reason": "all_already_emailed"}

    # Per-(user, customer) daily cap
    sent_today = await _email_count_last_24h(user_id, customer_id)
    if sent_today >= daily_cap():
        return {
            "sent": False,
            "reason": "daily_cap_reached",
            "sent_today": sent_today,
            "cap": daily_cap(),
        }

    dash_url = dashboard_url()
    user_email = user.email if user else ""
    subject = f"[Kampaio] 🦇 {len(fresh)} critical alert(s) on customer {customer_id}"
    html = _format_html(user_email, customer_id, fresh, dash_url)
    text = _format_text(customer_id, fresh, dash_url)

    result = await emailer.send_email(
        to=user_email,
        subject=subject,
        html=html,
        text=text,
        tag="vigil.critical",
    )

    # Audit-log success/mock-mode regardless — UI can surface "Mock mode" banner
    mock_mode = bool(result.get("mock"))
    delivered = bool(result.get("success")) and not mock_mode

    async with AsyncSessionLocal() as session:
        session.add(
            AuditLog(
                user_id=user_id,
                event_type="vigil.email",
                payload={
                    "customer_id": customer_id,
                    "to": user_email,
                    "alert_count": len(fresh),
                    "alert_ids": [a.id for a in fresh],
                    "delivered": delivered,
                    "mock_mode": mock_mode,
                    "resend_id": result.get("id"),
                },
            )
        )
        for a in fresh:
            session.add(
                AuditLog(
                    action_id=a.id,
                    user_id=user_id,
                    event_type="vigil.alert_emailed",
                    payload={"delivered": delivered, "mock_mode": mock_mode},
                )
            )
        await session.commit()

    logger.info(
        "Vigil email: user=%s customer=%s alerts=%d delivered=%s mock=%s",
        user_id, customer_id, len(fresh), delivered, mock_mode,
    )
    return {
        "sent": True,
        "alerts_in_email": len(fresh),
        "delivered": delivered,
        "mock_mode": mock_mode,
        "to": user_email,
        "subject": subject,
    }
