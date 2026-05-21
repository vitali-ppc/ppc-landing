"""HTTP endpoints for Vigil 🦇 anomaly alerts (Sprint 8 Phase 4).

These are read-only views and acknowledge actions for the dashboard's Vigil
monitoring panel. Anomaly alerts are stored as `AgentAction(action_type=
'anomaly_alert')` so they share the standard agent_actions plumbing, but the
UI surfaces them in a separate feed because semantically they're flags, not
proposals to apply.

Endpoints:
    GET  /api/anomalies/recent?days=N&include_hidden=false
    POST /api/anomalies/{action_id}/acknowledge
    POST /api/anomalies/{action_id}/dismiss
"""
from __future__ import annotations

import logging
from datetime import datetime, timedelta
from typing import Optional

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy import select, and_, desc

from db.models import AgentAction, AuditLog, User
from db.session import AsyncSessionLocal
from dependencies import get_current_user

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/anomalies", tags=["anomalies"])


class AnomalyAlert(BaseModel):
    id: str
    customer_id: Optional[str]
    campaign_id: Optional[str]
    campaign_name: Optional[str]
    anomaly_type: str
    severity: str
    summary: Optional[str]
    metric_name: Optional[str]
    today_value: Optional[float]
    baseline_value: Optional[float]
    ratio: Optional[float]
    today_date: Optional[str]
    reasoning: Optional[str]
    confidence: Optional[float]
    status: str  # proposed | acknowledged | dismissed | applied (reuses AgentAction.status)
    created_at: str
    # Aegis verdict, if any
    aegis_score: Optional[int] = None
    aegis_recommendation: Optional[str] = None
    aegis_flags: list[str] = []


class AnomalyListResponse(BaseModel):
    count: int
    by_severity: dict[str, int]
    alerts: list[AnomalyAlert]
    last_scan_at: Optional[str]


def _serialize(action: AgentAction, review: Optional[AuditLog]) -> AnomalyAlert:
    target = action.target or {}
    rv_payload = (review.payload if review else None) or {}
    return AnomalyAlert(
        id=action.id,
        customer_id=target.get("customer_id"),
        campaign_id=target.get("campaign_id"),
        campaign_name=target.get("campaign_name"),
        anomaly_type=target.get("anomaly_type") or "unknown",
        severity=target.get("severity") or "warning",
        summary=target.get("summary"),
        metric_name=target.get("metric_name"),
        today_value=target.get("today_value"),
        baseline_value=target.get("baseline_value"),
        ratio=target.get("ratio"),
        today_date=target.get("today_date"),
        reasoning=action.reasoning,
        confidence=float(action.confidence) if action.confidence is not None else None,
        status=action.status,
        created_at=action.created_at.isoformat(),
        aegis_score=rv_payload.get("risk_score"),
        aegis_recommendation=rv_payload.get("recommendation"),
        aegis_flags=rv_payload.get("flags") or [],
    )


@router.get("/recent", response_model=AnomalyListResponse)
async def list_recent_anomalies(
    days: int = 7,
    include_hidden: bool = False,
    current_user: User = Depends(get_current_user),
):
    """List anomaly alerts for the current user from the last N days.

    By default hides alerts where Aegis recommended 'block' (false positives)
    or that the user has already dismissed. Pass include_hidden=true to see
    everything (useful for debugging).
    """
    if days < 1 or days > 90:
        raise HTTPException(400, "days must be 1..90")

    since = datetime.utcnow() - timedelta(days=days)
    async with AsyncSessionLocal() as session:
        stmt = (
            select(AgentAction)
            .where(
                and_(
                    AgentAction.user_id == current_user.id,
                    AgentAction.action_type == "anomaly_alert",
                    AgentAction.created_at >= since,
                )
            )
            .order_by(desc(AgentAction.created_at))
            .limit(200)
        )
        actions = (await session.execute(stmt)).scalars().all()

        # Attach latest Aegis review per action (one query, lookup by action_id)
        review_map: dict[str, AuditLog] = {}
        if actions:
            ids = [a.id for a in actions]
            r_stmt = (
                select(AuditLog)
                .where(
                    and_(
                        AuditLog.action_id.in_(ids),
                        AuditLog.event_type == "risk.review",
                    )
                )
                .order_by(desc(AuditLog.created_at))
            )
            for rv in (await session.execute(r_stmt)).scalars().all():
                if rv.action_id and rv.action_id not in review_map:
                    review_map[rv.action_id] = rv

        # Latest scan time for "checked Y minutes ago" UI label
        scan_stmt = (
            select(AuditLog)
            .where(
                and_(
                    AuditLog.user_id == current_user.id,
                    AuditLog.event_type == "vigil.scan",
                )
            )
            .order_by(desc(AuditLog.created_at))
            .limit(1)
        )
        last_scan = (await session.execute(scan_stmt)).scalar_one_or_none()

    alerts: list[AnomalyAlert] = []
    by_severity: dict[str, int] = {"info": 0, "warning": 0, "critical": 0}
    for a in actions:
        item = _serialize(a, review_map.get(a.id))
        if not include_hidden:
            # 'applied'   = user clicked Acknowledge (saw it, no action needed)
            # 'rejected'  = user clicked Dismiss   (false positive)
            # 'dismissed' = legacy status from earlier code; treat same as rejected
            # Aegis 'block' verdict = noise, never show by default
            if a.status in {"applied", "dismissed", "rejected"}:
                continue
            if item.aegis_recommendation == "block":
                continue
        alerts.append(item)
        sev = item.severity if item.severity in by_severity else "warning"
        by_severity[sev] = by_severity.get(sev, 0) + 1

    return AnomalyListResponse(
        count=len(alerts),
        by_severity=by_severity,
        alerts=alerts,
        last_scan_at=last_scan.created_at.isoformat() if last_scan else None,
    )


class AnomalyActionResponse(BaseModel):
    id: str
    status: str


@router.post("/{action_id}/acknowledge", response_model=AnomalyActionResponse)
async def acknowledge_anomaly(
    action_id: str,
    current_user: User = Depends(get_current_user),
):
    """Mark an anomaly_alert as acknowledged — user saw it, no further action.

    Status moves to 'applied' (reusing the AgentAction state machine — anomaly
    alerts don't go to Google Ads, so 'applied' here means 'closed by user').
    Writes an audit_log entry so we can attribute the acknowledgement.
    """
    return await _change_anomaly_status(
        action_id, current_user, new_status="applied", event="anomaly.acknowledged"
    )


@router.post("/{action_id}/dismiss", response_model=AnomalyActionResponse)
async def dismiss_anomaly(
    action_id: str,
    current_user: User = Depends(get_current_user),
):
    """Mark an anomaly_alert as dismissed — user judged it a false positive.

    Status moves to 'rejected' (reusing AgentAction states). Useful for
    surfacing learning later: which alert types get dismissed most often?
    """
    return await _change_anomaly_status(
        action_id, current_user, new_status="rejected", event="anomaly.dismissed"
    )


class VigilSettings(BaseModel):
    enabled: bool
    min_severity: str  # 'info' | 'warning' | 'critical'
    schedule_mode: str  # 'off' | 'daily' | 'weekly'


class UpdateVigilSettings(BaseModel):
    enabled: Optional[bool] = None
    min_severity: Optional[str] = None
    schedule_mode: Optional[str] = None


@router.get("/settings", response_model=VigilSettings)
async def get_vigil_settings_endpoint(current_user: User = Depends(get_current_user)):
    """Return current user's Vigil preferences (enabled + email severity + schedule_mode)."""
    from services import vigil_settings as vs
    s = await vs.get_vigil_settings(current_user.id)
    return VigilSettings(
        enabled=s["enabled"],
        min_severity=s["min_severity"],
        schedule_mode=s["schedule_mode"],
    )


@router.patch("/settings", response_model=VigilSettings)
async def update_vigil_settings_endpoint(
    payload: UpdateVigilSettings,
    current_user: User = Depends(get_current_user),
):
    """Update Vigil settings — pass any subset of fields to change.

    enabled=False stops Vigil from scanning this user's accounts entirely.
    schedule_mode controls background scheduler: off=manual-only, daily=once/24h,
    weekly=once/168h. Manual "Run now" works regardless of schedule_mode.
    min_severity raises/lowers the email notification threshold; in-app feed
    still shows everything regardless of this setting.
    """
    from services import vigil_settings as vs
    try:
        s = await vs.set_vigil_settings(
            current_user.id,
            enabled=payload.enabled,
            min_severity=payload.min_severity,
            schedule_mode=payload.schedule_mode,
        )
    except ValueError as e:
        raise HTTPException(400, str(e))
    return VigilSettings(
        enabled=s["enabled"],
        min_severity=s["min_severity"],
        schedule_mode=s["schedule_mode"],
    )


class RunNowResponse(BaseModel):
    ok: bool
    targets: int = 0
    scanned: int = 0
    skipped: int = 0
    errors: int = 0
    alerts_total: int = 0
    ran_at: Optional[str] = None
    reason: Optional[str] = None


@router.post("/run-now", response_model=RunNowResponse)
async def run_vigil_now(current_user: User = Depends(get_current_user)):
    """Manual one-shot Vigil scan for the current user's active Google Ads accounts.

    Bypasses schedule_mode (works even when 'off') and per-mode interval (works
    even if a scheduled scan ran 5 minutes ago). Useful when:
    - User is in manual-only mode and wants results now
    - User wants a fresh scan after making changes in Google Ads UI
    - Demo / sales call needs a live tick

    Cost: ~$1.14 per scan on Goodevas-scale portfolio (33 accounts × concurrency=1).
    """
    from services import vigil_scheduler
    result = await vigil_scheduler.run_vigil_for_user(current_user.id, force=True)
    return RunNowResponse(**result)


async def _change_anomaly_status(
    action_id: str, user: User, *, new_status: str, event: str
) -> AnomalyActionResponse:
    async with AsyncSessionLocal() as session:
        action = await session.get(AgentAction, action_id)
        if not action:
            raise HTTPException(404, "Anomaly alert not found")
        if action.user_id != user.id:
            raise HTTPException(403, "Not your alert")
        if action.action_type != "anomaly_alert":
            raise HTTPException(400, "Not an anomaly_alert action")

        action.status = new_status
        if new_status == "applied":
            action.applied_at = datetime.utcnow()
        session.add(
            AuditLog(
                action_id=action.id,
                user_id=user.id,
                event_type=event,
                payload={"by_user": user.id},
            )
        )
        await session.commit()
        return AnomalyActionResponse(id=action.id, status=action.status)
