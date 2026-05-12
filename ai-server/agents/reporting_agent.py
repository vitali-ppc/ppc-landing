"""Echo 📊 — Reporting Agent.

Раз в неделю смотрит на все agent_actions + audit_log пользователя,
генерит сжатый weekly digest на простом языке («что AI сделал», «что заблокировано»,
«какие тренды»), и отдаёт его пользователю (email + frontend).

Особенность: Echo НЕ влияет на Google Ads. Только смотрит на историю.
Это самый дешёвый агент по токенам.
"""
from __future__ import annotations

import logging
from datetime import datetime, timedelta
from typing import Any, Optional

from sqlalchemy import select, desc, and_, func

from .base import BaseAgent, ToolSpec
from db.models import AgentAction, AuditLog
from db.session import AsyncSessionLocal

logger = logging.getLogger(__name__)


ECHO_SYSTEM_PROMPT = """\
Ты — Echo, AI reporting-агент в команде B6. Твоя задача — раз в неделю генерировать\
 краткий, читабельный digest для владельца про работу остальных AI-агентов на его аккаунте.

Что включить в digest:
1. **Сводка действий**: сколько proposed, applied, rejected за период
2. **Топ-3 решения**: самые значимые действия с короткой причиной (используй данные)
3. **🛡️ Aegis-блокировки**: если были — что и почему
4. **Тренды**: что меняется неделя к неделе (например — больше bid-changes, меньше пауз)
5. **Один совет владельцу**: на основе паттернов, не общая чушь

Тон: дружелюбный, конкретный, цифры обязательны. **Без воды.** Не более 5-7 предложений\
 в основном тексте + список топ-решений.

Используй tool `submit_digest` чтобы вернуть результат структурно (для frontend + email).
"""


class EchoAgent(BaseAgent):
    name = "reporting"
    mascot_emoji = "📊"
    mascot_name = "Echo"
    system_prompt = ECHO_SYSTEM_PROMPT

    def __init__(self, user_id: str, event_publisher=None, period_days: int = 7):
        self.period_days = period_days
        self._digest: Optional[dict[str, Any]] = None
        super().__init__(user_id=user_id, event_publisher=event_publisher)

    async def build_initial_prompt(self) -> str:
        """Собираем agent_actions + аналитику за последние N дней."""
        since = datetime.utcnow() - timedelta(days=self.period_days)

        async with AsyncSessionLocal() as session:
            # Все действия за период
            stmt = select(AgentAction).where(
                and_(
                    AgentAction.user_id == self.user_id,
                    AgentAction.created_at >= since,
                )
            ).order_by(desc(AgentAction.created_at))
            actions = (await session.execute(stmt)).scalars().all()

            # Aegis-блокировки (из audit_log где payload содержит recommendation='block')
            block_stmt = select(AuditLog).where(
                and_(
                    AuditLog.user_id == self.user_id,
                    AuditLog.event_type == "risk.review",
                    AuditLog.created_at >= since,
                )
            )
            reviews = (await session.execute(block_stmt)).scalars().all()
            blocks = [
                r for r in reviews
                if isinstance(r.payload, dict) and r.payload.get("recommendation") == "block"
            ]

        # Aggregate
        by_status: dict[str, int] = {}
        by_action_type: dict[str, int] = {}
        for a in actions:
            by_status[a.status] = by_status.get(a.status, 0) + 1
            by_action_type[a.action_type] = by_action_type.get(a.action_type, 0) + 1

        # Топ-10 actions (самые свежие) — для контекста модели
        top_actions_text = []
        for a in actions[:10]:
            t = a.target or {}
            top_actions_text.append(
                f"- {a.created_at.strftime('%m-%d %H:%M')} | {a.action_type} | "
                f"campaign={t.get('campaign_id')} | status={a.status} | "
                f"confidence={a.confidence} | reasoning='{(a.reasoning or '')[:80]}'"
            )

        blocks_text = []
        for b in blocks[:5]:
            p = b.payload
            blocks_text.append(
                f"- action_id={p.get('action_id','?')[:8]}.. score={p.get('risk_score','?')} "
                f"flags={p.get('flags', [])} note='{(p.get('note') or '')[:80]}'"
            )

        return f"""\
Сделай weekly digest за последние {self.period_days} дней для аккаунта пользователя.

**Статистика:**
- Всего действий агентов: {len(actions)}
- По статусам: {by_status}
- По типам: {by_action_type}
- 🛡️ Aegis-блокировок: {len(blocks)}

**Топ-10 свежих действий:**
{chr(10).join(top_actions_text) if top_actions_text else '(нет действий за период)'}

**Aegis-блокировки:**
{chr(10).join(blocks_text) if blocks_text else '(нет блокировок)'}

Вызови `submit_digest` с полным digest'ом.
"""

    def register_tools(self) -> list[ToolSpec]:
        return [
            ToolSpec(
                name="submit_digest",
                description=(
                    "Submit the weekly digest. Call ONCE with all fields filled. "
                    "summary_text: 4-7 предложений на русском человеческим языком. "
                    "top_decisions: список 2-5 самых значимых решений. "
                    "advice: один конкретный совет владельцу."
                ),
                input_schema={
                    "type": "object",
                    "properties": {
                        "summary_text": {"type": "string", "description": "Главный summary параграф"},
                        "actions_count": {"type": "integer"},
                        "applied": {"type": "integer"},
                        "rejected": {"type": "integer"},
                        "blocks": {"type": "integer"},
                        "top_decisions": {
                            "type": "array",
                            "items": {
                                "type": "object",
                                "properties": {
                                    "agent": {"type": "string", "description": "e.g. 'Buzz'"},
                                    "emoji": {"type": "string", "description": "e.g. '🐝'"},
                                    "summary": {"type": "string", "description": "1 sentence"},
                                    "when": {"type": "string", "description": "human time like 'вчера' / 'today'"},
                                },
                            },
                        },
                        "advice": {"type": "string", "description": "Один конкретный совет"},
                        "period_label": {"type": "string", "description": "e.g. 'last 7 days'"},
                    },
                    "required": ["summary_text", "actions_count", "top_decisions"],
                },
                handler=self._handle_submit_digest,
            ),
        ]

    async def _handle_submit_digest(
        self,
        summary_text: str,
        actions_count: int,
        top_decisions: list[dict],
        applied: int = 0,
        rejected: int = 0,
        blocks: int = 0,
        advice: str = "",
        period_label: str = "",
    ) -> dict[str, Any]:
        digest = {
            "summary_text": summary_text,
            "actions_count": actions_count,
            "applied": applied,
            "rejected": rejected,
            "blocks": blocks,
            "top_decisions": top_decisions,
            "advice": advice,
            "period": period_label or f"last {self.period_days} days",
            "generated_at": datetime.utcnow().isoformat(),
        }

        # Пишем в audit_log для истории
        async with AsyncSessionLocal() as session:
            audit = AuditLog(
                user_id=self.user_id,
                event_type="echo.digest",
                payload=digest,
            )
            session.add(audit)
            await session.commit()

        self._digest = digest
        logger.info("Echo digest for %s: %d actions, %d blocks", self.user_id, actions_count, blocks)
        return {"ok": True, "digest": digest}

    @property
    def digest(self) -> Optional[dict[str, Any]]:
        return self._digest


async def get_latest_digest(user_id: str) -> Optional[dict[str, Any]]:
    """Последний сохранённый digest пользователя (для frontend)."""
    async with AsyncSessionLocal() as session:
        stmt = (
            select(AuditLog)
            .where(AuditLog.user_id == user_id, AuditLog.event_type == "echo.digest")
            .order_by(desc(AuditLog.created_at))
            .limit(1)
        )
        log = (await session.execute(stmt)).scalar_one_or_none()
        return log.payload if log else None
