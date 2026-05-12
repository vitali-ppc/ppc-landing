"""Maximus 🐻 — Orchestrator (главный агент команды).

Роль: координировать остальных агентов. **Не делает работу сам** — управляет тем
кто и когда работает + автоматизирует апрувы по уровню autonomy юзера.

Особенность: Maximus — это **не Claude-агент** в смысле базового класса.
Это deterministic Python-функция которая применяет правила. Почему:
- Решения должны быть строго предсказуемыми (особенно auto-approve)
- Не платить LLM за то что можно сделать if-else
- В будущем можно добавить Claude-обёртку для smart-decisions
"""
from __future__ import annotations

import logging
from datetime import datetime, timedelta
from typing import Any, Optional

from sqlalchemy import select, and_, desc

from db.models import Agent, AgentAction, AuditLog, User
from db.session import AsyncSessionLocal
from services import audit
from services import google_ads_client as gads

logger = logging.getLogger(__name__)


# Пороги автоматического апрува по autonomy level.
# Aegis recommendation: approve | review | block
AUTO_APPROVE_RULES = {
    "l0": {  # Observer — никаких авто-действий
        "auto_approve_recommendations": [],
        "min_confidence": 1.0,  # nothing passes
    },
    "l1": {  # Co-pilot — каждое действие через user, ничего auto
        "auto_approve_recommendations": [],
        "min_confidence": 1.0,
    },
    "l2": {  # Approval mode — auto-approve если Aegis = "approve" и confidence высокий
        "auto_approve_recommendations": ["approve"],
        "min_confidence": 0.8,
    },
    "l3": {  # Autonomous — auto-approve "approve" + "review" если confidence очень высокий
        "auto_approve_recommendations": ["approve", "review"],
        "min_confidence": 0.85,
    },
}


async def run_orchestrator_cycle(
    user_id: str,
    *,
    dry_run: bool = False,
) -> dict[str, Any]:
    """Один cycle orchestration:
    1. Найти юзера + его autonomy_level
    2. Получить все pending actions с их risk_review (от Aegis)
    3. По правилам autonomy_level — какие можно auto-approve
    4. (если dry_run=False) выполнить auto-approve
    5. Вернуть summary что произошло
    """
    async with AsyncSessionLocal() as session:
        user = await session.get(User, user_id)
        if user is None:
            return {"error": f"User {user_id} not found"}

        autonomy = user.autonomy_level or "l0"
        rules = AUTO_APPROVE_RULES.get(autonomy, AUTO_APPROVE_RULES["l0"])

        # Все pending actions с risk_review
        stmt = select(AgentAction).where(
            and_(
                AgentAction.user_id == user_id,
                AgentAction.status.in_(["proposed", "pending_approval"]),
            )
        ).order_by(AgentAction.created_at.desc()).limit(50)
        pending = (await session.execute(stmt)).scalars().all()

        # Берём latest risk_review per action
        actions_with_review: list[tuple[AgentAction, Optional[dict]]] = []
        for a in pending:
            rev_stmt = (
                select(AuditLog)
                .where(AuditLog.action_id == a.id, AuditLog.event_type == "risk.review")
                .order_by(desc(AuditLog.created_at))
                .limit(1)
            )
            rev = (await session.execute(rev_stmt)).scalar_one_or_none()
            actions_with_review.append((a, rev.payload if rev else None))

        # Решения
        auto_approved: list[dict] = []
        kept_pending: list[dict] = []
        blocked: list[dict] = []

        for a, review in actions_with_review:
            decision = _decide(a, review, rules)
            entry = {
                "action_id": a.id,
                "action_type": a.action_type,
                "campaign_id": (a.target or {}).get("campaign_id"),
                "confidence": float(a.confidence) if a.confidence is not None else None,
                "aegis_score": review.get("risk_score") if review else None,
                "aegis_recommendation": review.get("recommendation") if review else None,
                "decision": decision["decision"],
                "reason": decision["reason"],
            }
            if decision["decision"] == "auto_approve":
                auto_approved.append(entry)
            elif decision["decision"] == "block":
                blocked.append(entry)
            else:
                kept_pending.append(entry)

    # Применяем auto-approvals (вне session, чтобы избежать lock)
    if not dry_run and auto_approved:
        for entry in auto_approved:
            try:
                # Применяем как dry_run в Google Ads (write-операции реально пойдут когда production token + apply_to_google_ads=True)
                action = await audit.get_action(entry["action_id"])
                if not action:
                    continue
                target = action["target"] or {}
                after_state = None
                try:
                    if action["action_type"] == "update_bid":
                        after_state = await gads.update_bid(
                            access_token="dev-token",
                            customer_id=target.get("customer_id"),
                            ad_group_criterion_resource=f"campaign_{target.get('campaign_id')}",
                            new_bid_micros=int(target.get("new_bid_micros", 0)),
                            dry_run=True,  # пока всегда dry_run, реально пишем только с явным разрешением
                        )
                    elif action["action_type"] == "pause_campaign":
                        after_state = await gads.pause_campaign(
                            access_token="dev-token",
                            customer_id=target.get("customer_id"),
                            campaign_id=target.get("campaign_id"),
                            dry_run=True,
                        )
                    elif action["action_type"] == "adjust_budget":
                        after_state = {"dry_run": True, "delta_usd": target.get("delta_usd")}
                except NotImplementedError as e:
                    after_state = {"dry_run": True, "note": str(e)}

                # Mark approved → applied
                await audit.update_action_status(
                    entry["action_id"], "approved", approved_by_user_id=f"maximus:{user_id}"
                )
                await audit.update_action_status(
                    entry["action_id"], "applied",
                    approved_by_user_id=f"maximus:{user_id}", after_state=after_state,
                )
            except Exception:
                logger.exception("Failed to auto-apply action %s", entry["action_id"])

    # Записываем сам orchestration cycle в audit
    orchestration_payload = {
        "autonomy_level": autonomy,
        "rules": rules,
        "auto_approved_count": len(auto_approved),
        "kept_pending_count": len(kept_pending),
        "blocked_count": len(blocked),
        "auto_approved": auto_approved,
        "kept_pending": kept_pending,
        "blocked": blocked,
        "dry_run": dry_run,
        "run_at": datetime.utcnow().isoformat(),
    }

    async with AsyncSessionLocal() as session:
        log = AuditLog(
            user_id=user_id,
            event_type="orchestration.cycle",
            payload=orchestration_payload,
        )
        session.add(log)

        # Update Maximus agent last_run_at
        agent_stmt = select(Agent).where(Agent.user_id == user_id, Agent.type == "orchestrator")
        max_agent = (await session.execute(agent_stmt)).scalar_one_or_none()
        if max_agent:
            max_agent.last_run_at = datetime.utcnow()
        else:
            session.add(Agent(
                user_id=user_id, type="orchestrator", mascot_name="Maximus",
                status="active", last_run_at=datetime.utcnow(),
            ))
        await session.commit()

    logger.info(
        "Maximus cycle for %s (autonomy=%s): auto_approved=%d, pending=%d, blocked=%d",
        user_id, autonomy, len(auto_approved), len(kept_pending), len(blocked),
    )
    return orchestration_payload


def _decide(
    action: AgentAction,
    review: Optional[dict],
    rules: dict[str, Any],
) -> dict[str, str]:
    """Применить правила autonomy к одному action.

    Returns: { decision: 'auto_approve' | 'keep_pending' | 'block', reason: str }
    """
    # Если нет review — Maximus не имеет права авто-апрувить (нет проверки Aegis)
    if review is None:
        return {"decision": "keep_pending", "reason": "Aegis ещё не рецензировал — требует обзора"}

    rec = review.get("recommendation", "review")
    score = review.get("risk_score", 100)
    confidence = float(action.confidence) if action.confidence is not None else 0

    # Block — всегда блокируем
    if rec == "block":
        return {
            "decision": "block",
            "reason": f"Aegis заблокировал (score {score}). Не апрувим даже на L3.",
        }

    # Auto-approve по правилу autonomy_level
    if rec in rules["auto_approve_recommendations"] and confidence >= rules["min_confidence"]:
        return {
            "decision": "auto_approve",
            "reason": (
                f"Aegis: {rec} (score {score}), confidence {confidence:.2f} ≥ "
                f"{rules['min_confidence']} — пропускаем автоматически"
            ),
        }

    # Иначе — требует ручного апрува
    return {
        "decision": "keep_pending",
        "reason": (
            f"Aegis: {rec} (score {score}), confidence {confidence:.2f} — "
            f"требует ручного апрува"
        ),
    }


async def get_latest_orchestration(user_id: str) -> Optional[dict[str, Any]]:
    """Последний orchestration cycle (для frontend)."""
    async with AsyncSessionLocal() as session:
        stmt = (
            select(AuditLog)
            .where(AuditLog.user_id == user_id, AuditLog.event_type == "orchestration.cycle")
            .order_by(desc(AuditLog.created_at))
            .limit(1)
        )
        log = (await session.execute(stmt)).scalar_one_or_none()
        return log.payload if log else None
