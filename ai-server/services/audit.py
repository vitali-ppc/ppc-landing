"""Audit + AgentAction persistence layer.

Все proposed actions от агентов проходят через write_action() и попадают в
`agent_actions` таблицу. Параллельно пишется immutable запись в `audit_log`.

На Day 2 reasoning_text персистится; на Day 3 будем добавлять WebSocket-publish.
"""
from __future__ import annotations

import logging
from datetime import datetime, timedelta
from typing import Any, Optional

from sqlalchemy import select, and_, func
from sqlalchemy.ext.asyncio import AsyncSession

from db.models import Agent, AgentAction, AuditLog
from db.session import AsyncSessionLocal

logger = logging.getLogger(__name__)

# Sprint 7 safety: how many REAL applies (apply_to_google_ads=true) per
# (user, customer_id) in the last 24h are allowed before we refuse to apply.
DAILY_REAL_APPLY_CAP = 5


async def write_proposed_action(
    *,
    user_id: str,
    agent_type: str,
    action_type: str,
    target: dict[str, Any],
    reasoning: str,
    confidence: float,
    before_state: Optional[dict[str, Any]] = None,
    after_state: Optional[dict[str, Any]] = None,
    initial_status: str = "proposed",
    session: Optional[AsyncSession] = None,
) -> str:
    """Записать предложенное действие. Возвращает action_id.

    `session` опционален: если не передан, открываем свой.
    """
    own_session = session is None
    if own_session:
        session = AsyncSessionLocal()
    try:
        agent_id = await _ensure_agent(session, user_id, agent_type)

        action = AgentAction(
            agent_id=agent_id,
            user_id=user_id,
            action_type=action_type,
            target=target,
            before_state=before_state,
            after_state=after_state,
            reasoning=reasoning,
            confidence=confidence,
            status=initial_status,
        )
        session.add(action)
        await session.flush()  # получить action.id

        # Параллельная immutable запись в audit_log
        audit = AuditLog(
            action_id=action.id,
            user_id=user_id,
            event_type=f"action.{initial_status}",
            payload={
                "agent_type": agent_type,
                "action_type": action_type,
                "target": target,
                "reasoning": reasoning,
                "confidence": confidence,
            },
        )
        session.add(audit)

        if own_session:
            await session.commit()
        logger.info(
            "Action %s saved: %s/%s for user %s (status=%s)",
            action.id, agent_type, action_type, user_id, initial_status,
        )
        return action.id
    except Exception:
        if own_session:
            await session.rollback()
        raise
    finally:
        if own_session:
            await session.close()


async def _ensure_agent(session: AsyncSession, user_id: str, agent_type: str) -> str:
    """Если у юзера ещё нет агента этого типа — создать."""
    stmt = select(Agent).where(Agent.user_id == user_id, Agent.type == agent_type)
    existing = (await session.execute(stmt)).scalar_one_or_none()
    if existing:
        existing.last_run_at = datetime.utcnow()
        await session.flush()
        return existing.id

    mascot_map = {
        "bidding": "Buzz",
        "strategy": "Vox",
        "creative": "Mira",
        "research": "Sage",
        "risk": "Aegis",
        "reporting": "Echo",
        "orchestrator": "Maximus",
        "anomaly": "Vigil",
    }
    agent = Agent(
        user_id=user_id,
        type=agent_type,
        status="active",
        mascot_name=mascot_map.get(agent_type, agent_type.title()),
        last_run_at=datetime.utcnow(),
    )
    session.add(agent)
    await session.flush()
    return agent.id


async def update_action_status(
    action_id: str,
    new_status: str,
    *,
    approved_by_user_id: Optional[str] = None,
    after_state: Optional[dict[str, Any]] = None,
) -> Optional[dict[str, Any]]:
    """Поменять статус action (approved/rejected/applied/reverted)."""
    async with AsyncSessionLocal() as session:
        action = await session.get(AgentAction, action_id)
        if action is None:
            return None
        action.status = new_status
        if approved_by_user_id:
            action.approved_by = approved_by_user_id
        if new_status == "applied":
            action.applied_at = datetime.utcnow()
        if after_state is not None:
            action.after_state = after_state

        # Immutable audit запись
        audit = AuditLog(
            action_id=action.id,
            user_id=action.user_id,
            event_type=f"action.{new_status}",
            payload={"by_user": approved_by_user_id, "after_state": after_state},
        )
        session.add(audit)
        await session.commit()

        return {
            "id": action.id,
            "status": action.status,
            "approved_by": action.approved_by,
            "applied_at": action.applied_at.isoformat() if action.applied_at else None,
        }


async def list_actions(
    user_id: str,
    *,
    status: Optional[str] = None,
    limit: int = 50,
    include_review: bool = True,
) -> list[dict[str, Any]]:
    """Список действий пользователя, опционально по статусу.

    Если include_review=True — для каждого action прицепляется последний risk_review.
    """
    from sqlalchemy import desc as sqldesc
    async with AsyncSessionLocal() as session:
        stmt = select(AgentAction).where(AgentAction.user_id == user_id)
        if status:
            stmt = stmt.where(AgentAction.status == status)
        stmt = stmt.order_by(AgentAction.created_at.desc()).limit(limit)
        rows = (await session.execute(stmt)).scalars().all()

        result: list[dict[str, Any]] = []
        for a in rows:
            item: dict[str, Any] = {
                "id": a.id,
                "agent_id": a.agent_id,
                "action_type": a.action_type,
                "target": a.target,
                "reasoning": a.reasoning,
                "confidence": float(a.confidence) if a.confidence is not None else None,
                "status": a.status,
                "before_state": a.before_state,
                "after_state": a.after_state,
                "created_at": a.created_at.isoformat(),
                "applied_at": a.applied_at.isoformat() if a.applied_at else None,
            }
            if include_review:
                rev_stmt = (
                    select(AuditLog)
                    .where(AuditLog.action_id == a.id, AuditLog.event_type == "risk.review")
                    .order_by(sqldesc(AuditLog.created_at))
                    .limit(1)
                )
                rev = (await session.execute(rev_stmt)).scalar_one_or_none()
                item["risk_review"] = rev.payload if rev else None
            result.append(item)
        return result


async def get_risk_review(action_id: str) -> Optional[dict[str, Any]]:
    """Последний risk-review (от Aegis) для action_id."""
    from sqlalchemy import desc
    async with AsyncSessionLocal() as session:
        stmt = (
            select(AuditLog)
            .where(AuditLog.action_id == action_id, AuditLog.event_type == "risk.review")
            .order_by(desc(AuditLog.created_at))
            .limit(1)
        )
        log = (await session.execute(stmt)).scalar_one_or_none()
        return log.payload if log else None


async def get_action(action_id: str) -> Optional[dict[str, Any]]:
    async with AsyncSessionLocal() as session:
        a = await session.get(AgentAction, action_id)
        if a is None:
            return None
        return {
            "id": a.id,
            "user_id": a.user_id,
            "agent_id": a.agent_id,
            "action_type": a.action_type,
            "target": a.target,
            "reasoning": a.reasoning,
            "confidence": float(a.confidence) if a.confidence is not None else None,
            "status": a.status,
            "before_state": a.before_state,
            "after_state": a.after_state,
            "created_at": a.created_at.isoformat(),
            "applied_at": a.applied_at.isoformat() if a.applied_at else None,
        }


async def count_real_applies_last_24h(user_id: str, customer_id: str) -> int:
    """Count AgentActions that were REALLY applied to Google Ads in the last 24h
    for a specific (user_id, customer_id) pair.

    "Really applied" means status='applied' AND after_state.applied=true
    (i.e. apply_to_google_ads=true was used, not dry-run).

    Sprint 7 safety cap: routers/actions.py refuses further real applies once
    this returns >= DAILY_REAL_APPLY_CAP, regardless of Aegis verdict.
    """
    since = datetime.utcnow() - timedelta(hours=24)
    async with AsyncSessionLocal() as session:
        stmt = select(AgentAction).where(
            and_(
                AgentAction.user_id == user_id,
                AgentAction.status == "applied",
                AgentAction.applied_at.is_not(None),
                AgentAction.applied_at >= since,
            )
        )
        rows = (await session.execute(stmt)).scalars().all()
    count = 0
    for row in rows:
        target = row.target or {}
        after = row.after_state or {}
        if target.get("customer_id") != customer_id:
            continue
        # Only count REAL applies (after_state.applied=true, not dry_run)
        if after.get("applied") is True and after.get("dry_run") is False:
            count += 1
    return count
