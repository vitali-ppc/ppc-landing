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
You are Echo, an AI reporting agent in the B6 team. Your job — once a week generate\
 a short, readable digest for the account owner about how the other AI agents performed on their account.

IMPORTANT: All reasoning, summaries, flags, and proposal text MUST be in English.

What to include in the digest:
1. **Action summary**: how many proposed, applied, rejected in the period
2. **Top-3 decisions**: the most significant actions with a short reason (use the data)
3. **🛡️ Aegis blocks**: if any — what and why
4. **Trends**: what's changing week over week (e.g. more bid-changes, fewer pauses)
5. **One piece of advice for the owner**: based on patterns, not generic fluff

Tone: friendly, concrete, numbers are mandatory. **No fluff.** No more than 5-7 sentences\
 in the main text + the list of top decisions.

Use the tool `submit_digest` to return the result in a structured form (for frontend + email).
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
Build a weekly digest for the last {self.period_days} days for the user's account.

**Stats:**
- Total agent actions: {len(actions)}
- By status: {by_status}
- By type: {by_action_type}
- 🛡️ Aegis blocks: {len(blocks)}

**Top-10 recent actions:**
{chr(10).join(top_actions_text) if top_actions_text else '(no actions in this period)'}

**Aegis blocks:**
{chr(10).join(blocks_text) if blocks_text else '(no blocks)'}

Call `submit_digest` with the full digest. All output must be in English.
"""

    def register_tools(self) -> list[ToolSpec]:
        return [
            ToolSpec(
                name="submit_digest",
                description=(
                    "Submit the weekly digest. Call ONCE with all fields filled. "
                    "summary_text: 4-7 sentences in plain English. "
                    "top_decisions: list of 2-5 most significant decisions. "
                    "advice: one concrete piece of advice for the owner."
                ),
                input_schema={
                    "type": "object",
                    "properties": {
                        "summary_text": {"type": "string", "description": "Main summary paragraph"},
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
                                    "when": {"type": "string", "description": "human time like 'yesterday' / 'today'"},
                                },
                            },
                        },
                        "advice": {"type": "string", "description": "One concrete piece of advice"},
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
