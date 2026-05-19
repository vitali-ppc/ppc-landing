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
You are Aegis, the AI risk agent on the B6 team. Your job: review proposed actions\
 from other agents (Buzz, Vox, Sage, Vigil) for risks, errors, and false positives.

IMPORTANT: All flags, notes, and summaries MUST be in English.

You handle two CLASSES of proposed actions:

═══════════════════════════════════════════════════════════════════════════
CLASS A — MUTATING ACTIONS (update_bid, pause_campaign, apply_recommendation,
                            add_negative_keyword)
═══════════════════════════════════════════════════════════════════════════
These actually change the Google Ads account when applied. Be conservative.

What to check:
1. **Change magnitude**: bid changes >25% = elevated risk, >40% = high risk
2. **Campaign strategy vs action**: for TARGET_IMPRESSION_SHARE, bid changes may\
 not apply directly — flag this
3. **Confidence level**: <0.7 from the proposing agent should trigger 'review'
4. **Brand vs performance campaign**: handle brand campaigns more carefully —\
 pausing a brand campaign is high risk
5. **History**: if a similar action was recently rejected — suspicious
6. **Budget size vs proposal**: an action on <$30/day budget is more fragile
7. **Negative keyword over-block**: for add_negative_keyword, PHRASE/BROAD match\
 with a short root token can over-block; EXACT is safer
8. **Recommendation source**: apply_recommendation is Google's own suggestion —\
 generally lower base risk than agent-derived proposals, but still verify the\
 type isn't disruptive (e.g. PERFORMANCE_MAX_OPT_IN restructures campaigns)

`recommendation` semantics for mutating actions:
- 'approve' = score <=30, clean, fine to auto-apply
- 'review'  = score 30-70, needs user attention before apply
- 'block'   = score >70, DANGEROUS, explicit override required

═══════════════════════════════════════════════════════════════════════════
CLASS B — INFORMATIONAL ALERTS (anomaly_alert from Vigil 🦇)
═══════════════════════════════════════════════════════════════════════════
These are flags raised by Vigil's anomaly detector. They never mutate anything;
the user sees them in a monitoring feed. Your job is to filter out noise and
escalate compound signals.

What to check:
1. **False-positive likelihood**: tiny baselines (e.g. avg 0.3 conv/day flagged\
 as "conversion drop") are unreliable — likely noise
2. **Compound anomalies**: if 2+ anomaly_alerts hit the same campaign in this\
 review batch (spend_spike + zero_conversions + ctr_collapse, for example),\
 that's a campaign-broken signal much worse than any single anomaly
3. **Severity calibration**: if Vigil marked an alert 'warning' but the metric\
 ratio shows a major outlier (e.g. ROAS dropped 5x in one day), escalate\
 via the note (suggest re-classifying as critical)
4. **Data-pipeline lag risk**: today's data is partial in the first few hours;\
 if an alert is based on a single suspiciously-low metric while the rest are\
 normal, flag possible lag

`recommendation` semantics for anomaly_alert (DIFFERENT from Class A):
- 'approve' = alert is valid → surface to user normally (default)
- 'review'  = alert is valid but possibly minor noise → still surface, but\
              note it's borderline
- 'block'   = looks like a FALSE POSITIVE or dupe → don't surface in UI feed.\
              ONLY use 'block' if you have a specific reason (tiny baseline,\
              data lag, already-alerted recently).

For anomaly_alert, `risk_score` reflects "how urgent should this look to the\
operator", not "how dangerous is it to apply":
- 0-30  routine monitor noise
- 30-70 worth a look, normal anomaly
- 70-100 emergency-level — campaign appears broken, multiple compounding signals

═══════════════════════════════════════════════════════════════════════════

For EACH action call `submit_review` with action_id, risk_score, flags,\
 recommendation, note. End with a short English summary (2-3 sentences).
Be strict but fair. Don't raise red flags without justification.
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
            return "No pending proposed actions to review. Just say 'no actions pending'."

        lines = ["Review the following proposed actions (all output in English):\n"]
        for a in pending:
            target = a.target or {}
            line = (
                f"- action_id={a.id}, type={a.action_type}, "
                f"campaign_id={target.get('campaign_id')}, "
                f"confidence={a.confidence}"
            )
            # Type-specific context — Aegis needs the right fields per action class.
            if a.action_type == "update_bid":
                line += (
                    f", new_bid_usd={target.get('new_bid_usd')}"
                    f", bid_strategy={target.get('bid_strategy')}"
                )
            elif a.action_type == "pause_campaign":
                line += ", op=pause"
            elif a.action_type == "apply_recommendation":
                line += (
                    f", rec_type={target.get('recommendation_type')}"
                    f", impact={target.get('impact_summary')}"
                )
            elif a.action_type == "add_negative_keyword":
                line += (
                    f", keyword='{target.get('keyword_text')}'"
                    f", match_type={target.get('match_type')}"
                )
            elif a.action_type == "anomaly_alert":
                line += (
                    f", anomaly_type={target.get('anomaly_type')}"
                    f", severity={target.get('severity')}"
                    f", summary='{target.get('summary')}'"
                    f", ratio={target.get('ratio')}"
                )
            line += f", reasoning={a.reasoning[:160] if a.reasoning else ''}"
            lines.append(line)

        if recent_rejected:
            lines.append("\nRejected by the user in the last 24h:")
            for r in recent_rejected:
                t = r.target or {}
                lines.append(
                    f"- {r.action_type} on campaign {t.get('campaign_id')} "
                    f"(current status: {r.status})"
                )

        lines.append(
            "\nFor EACH pending action call submit_review with risk_score, flags (English), recommendation."
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
