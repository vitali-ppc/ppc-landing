"""Aegis 🛡️ — Risk Agent.

Задача: после того как Buzz (или другой агент) создал proposed-actions,
Aegis их **рецензирует** и выдаёт risk-оценку:

- score: 0-100 (0 = безопасно, 100 = критично)
- flags: list[str] — конкретные проблемы которые увидел
- recommendation: 'approve' | 'review' | 'block'

Это **второй слой защиты** после safety_caps. Caps — это hard-rules
(жёсткие лимиты). Aegis — это soft-judge (учитывает контекст истории, паттерны).

На Day 4 — упрощённая реализация: AI-агент через Claude получает все proposed
действия и историю + heuristics, возвращает review для каждого.
"""
from __future__ import annotations

import logging
from datetime import datetime, timedelta
from typing import Any, Optional

from sqlalchemy import select, and_

from .base import BaseAgent, ToolSpec
from db.models import AgentAction, AuditLog
from db.session import AsyncSessionLocal

logger = logging.getLogger(__name__)


AEGIS_SYSTEM_PROMPT = """\
Ты — Aegis, AI risk-агент в команде B6. Твоя задача — рецензировать proposed-actions\
 от других агентов (Buzz, Vox, и т.д.) на потенциальные риски.

Что ты проверяешь:
1. **Размер изменения**: bid changes >25% — повышенный риск, >40% — высокий риск
2. **Стратегия кампании vs действие**: для TARGET_IMPRESSION_SHARE bid-изменения\
 могут не применяться напрямую — флаг
3. **Confidence уровень**: <0.7 от агента = должен быть review
4. **Brand vs Performance campaign**: brand-кампании трогать аккуратнее
5. **История**: если такой же тип action недавно был rejected — подозрение
6. **Размер бюджета vs предложенное**: action с бюджетом <$30/день может пострадать сильнее

Для каждого proposed action верни структурированный review через tool `submit_review`:
- action_id (UUID из списка)
- risk_score (0-100): 0=safe, 30=low, 60=medium, 80=high, 100=critical
- flags (массив строк): конкретные риски которые увидел
- recommendation: 'approve' | 'review' | 'block'
  - 'approve' = score ≤30, всё чисто, можно автоматом
  - 'review' = score 30-70, требует внимания юзера
  - 'block' = score >70, ОПАСНО, нужен явный override

В конце дай summary в 2-3 предложения.
Будь строг но честен. Не зажигай красные флаги без оснований.
"""


class AegisAgent(BaseAgent):
    name = "risk"
    mascot_emoji = "🛡️"
    mascot_name = "Aegis"
    system_prompt = AEGIS_SYSTEM_PROMPT

    def __init__(self, user_id: str, event_publisher=None):
        self._reviews_in_session: list[dict] = []
        super().__init__(user_id=user_id, event_publisher=event_publisher)

    async def build_initial_prompt(self) -> str:
        """Собираем все pending proposed actions + историю и шлём Aegis."""
        async with AsyncSessionLocal() as session:
            # Pending actions
            stmt = select(AgentAction).where(
                and_(
                    AgentAction.user_id == self.user_id,
                    AgentAction.status.in_(["proposed", "pending_approval"]),
                )
            ).order_by(AgentAction.created_at.desc()).limit(20)
            pending = (await session.execute(stmt)).scalars().all()

            # Recent rejected (последние 24 часа) — для контекста паттернов
            since = datetime.utcnow() - timedelta(hours=24)
            rej_stmt = select(AgentAction).where(
                and_(
                    AgentAction.user_id == self.user_id,
                    AgentAction.status == "rejected",
                    AgentAction.created_at >= since,
                )
            ).limit(10)
            recent_rejected = (await session.execute(rej_stmt)).scalars().all()

        if not pending:
            return "У нас нет pending proposed actions для review. Просто скажи 'no actions pending'."

        lines = ["Рецензируй следующие proposed actions:\n"]
        for a in pending:
            target = a.target or {}
            lines.append(
                f"- action_id={a.id}, type={a.action_type}, "
                f"campaign_id={target.get('campaign_id')}, "
                f"new_bid_usd={target.get('new_bid_usd')}, "
                f"confidence={a.confidence}, "
                f"reasoning={a.reasoning[:200] if a.reasoning else ''}"
            )

        if recent_rejected:
            lines.append("\nЗа последние 24ч пользователь отклонил:")
            for r in recent_rejected:
                t = r.target or {}
                lines.append(
                    f"- {r.action_type} on campaign {t.get('campaign_id')} "
                    f"(сейчас: {r.status})"
                )

        lines.append(
            "\nДля КАЖДОГО pending action вызови submit_review с risk_score, flags, recommendation."
        )
        return "\n".join(lines)

    def register_tools(self) -> list[ToolSpec]:
        return [
            ToolSpec(
                name="submit_review",
                description=(
                    "Submit risk review for a single proposed action. Call this once per action. "
                    "risk_score: 0 (safe) — 100 (critical). recommendation: approve | review | block."
                ),
                input_schema={
                    "type": "object",
                    "properties": {
                        "action_id": {"type": "string"},
                        "risk_score": {"type": "integer", "minimum": 0, "maximum": 100},
                        "flags": {"type": "array", "items": {"type": "string"}},
                        "recommendation": {"type": "string", "enum": ["approve", "review", "block"]},
                        "note": {"type": "string", "description": "1-2 sentence reasoning"},
                    },
                    "required": ["action_id", "risk_score", "recommendation"],
                },
                handler=self._handle_submit_review,
            ),
        ]

    async def _handle_submit_review(
        self,
        action_id: str,
        risk_score: int,
        recommendation: str,
        flags: Optional[list[str]] = None,
        note: Optional[str] = None,
    ) -> dict[str, Any]:
        """Записать review в audit_log + кеш в этой сессии для итогового результата."""
        review = {
            "action_id": action_id,
            "reviewer": "aegis",
            "risk_score": int(risk_score),
            "flags": flags or [],
            "recommendation": recommendation,
            "note": note,
            "reviewed_at": datetime.utcnow().isoformat(),
        }
        async with AsyncSessionLocal() as session:
            audit = AuditLog(
                action_id=action_id,
                user_id=self.user_id,
                event_type="risk.review",
                payload=review,
            )
            session.add(audit)
            await session.commit()
        self._reviews_in_session.append(review)
        logger.info("Aegis reviewed %s: score=%s rec=%s", action_id[:8], risk_score, recommendation)
        return {"ok": True, "review_saved": review}

    @property
    def reviews(self) -> list[dict]:
        return self._reviews_in_session
