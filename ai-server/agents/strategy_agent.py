"""Vox 🦊 — Strategy Agent.

Особенность: смотрит на **все кампании одновременно** и принимает
**cross-campaign** решения о бюджете:
- «Шифтнуть $X из плохой кампании в хорошую»
- «Паузить кампанию с ROAS < 1.5 и переложить бюджет»
- «Дать больше бюджета star-перформеру»

Это принципиально другой angle чем Buzz, который оптимизирует одну кампанию.
Vox мыслит как **CMO**: распределение ресурсов между активами.
"""
from __future__ import annotations

import logging
from datetime import datetime
from typing import Any, Optional

from .base import BaseAgent, ToolSpec
from . import tools
from services import google_ads_client as gads
from services import audit

logger = logging.getLogger(__name__)


VOX_SYSTEM_PROMPT = """\
You are Vox, an AI strategy agent in the B6 team. Your job is budget management\
 ACROSS campaigns (not within a single one).

IMPORTANT: All reasoning, summaries, flags, and proposal text MUST be in English.

Principle: you are given a list of ALL active campaigns for the client with their 7-day metrics.\
 You decide how to reallocate the budget:

1. **Star performers** (ROAS >= 3.0 + stable conversions) -> give more budget (+10-30%)
2. **Solid** (ROAS 1.5-3.0) -> keep as is
3. **Weak** (ROAS 1.0-1.5) -> cut budget (-20-40%) for a test
4. **Losses** (ROAS < 1.0 over 7+ days) -> pause or cut deeply

Rules:
- DO NOT raise budget by more than 30% at once (risk)
- DO NOT cut budget below 20% of current (you can kill the campaign)
- Reallocation must be **zero-sum**: if one campaign gets +$N, another gets -$N
- If all campaigns are doing great — say so and don't touch them for the sake of it

Return proposed_actions via the tool `propose_budget_shift` —\
 EACH shift in a separate call. If nothing should change — call `submit_no_action`\
 with an explanation why.

At the end give a 2-3 sentence strategy summary.
"""


class StrategyAgent(BaseAgent):
    name = "strategy"
    mascot_emoji = "🦊"
    mascot_name = "Vox"
    system_prompt = VOX_SYSTEM_PROMPT

    def __init__(self, user_id: str, customer_id: str, event_publisher=None):
        self.customer_id = customer_id
        self._proposed_shifts: list[dict] = []
        super().__init__(user_id=user_id, event_publisher=event_publisher)

    async def build_initial_prompt(self) -> str:
        """Собираем все кампании + их 7-дневные метрики, отдаём Vox."""
        if gads.use_mock():
            access_token = "mock-access-token"
        else:
            import os
            refresh = os.getenv("DEV_REFRESH_TOKEN", "")
            access_token = await gads.get_valid_access_token(refresh)

        campaigns = await gads.list_campaigns(access_token, self.customer_id)
        lines = ["Active campaigns with 7-day metrics:\n"]
        for c in campaigns:
            try:
                m = await gads.get_campaign_metrics(access_token, self.customer_id, str(c["id"]), days=7)
                lines.append(
                    f"- campaign_id={c['id']} \"{c['name']}\"\n"
                    f"  budget: ${c['budget_micros']/1_000_000:.0f}/day"
                    f", strategy: {c.get('bid_strategy')}\n"
                    f"  ROAS: {m['roas']}, CTR: {m['ctr']*100:.2f}%"
                    f", spend $: {m['spend_micros']/1_000_000:.0f}"
                    f", conv: {m['conversions']}, conv_value $: {m['conversion_value']}"
                )
            except Exception as e:
                lines.append(f"- campaign_id={c['id']}: metrics error ({e})")

        lines.append("\nAnalyze and propose budget reallocation (or say it's not needed). All output must be in English.")
        return "\n".join(lines)

    def register_tools(self) -> list[ToolSpec]:
        return [
            ToolSpec(
                name="propose_budget_shift",
                description=(
                    "Propose a budget change for a single campaign. "
                    "delta_micros: positive = add, negative = cut (in micros, $1 = 1_000_000). "
                    "IMPORTANT: the sum of deltas across all campaigns must be ~ 0 (zero-sum reallocation)."
                ),
                input_schema={
                    "type": "object",
                    "properties": {
                        "customer_id": {"type": "string"},
                        "campaign_id": {"type": "string"},
                        "delta_micros": {"type": "integer", "description": "$1 = 1_000_000 micros"},
                        "new_total_micros": {"type": "integer", "description": "New daily budget in micros"},
                        "reasoning": {"type": "string"},
                        "confidence": {"type": "number"},
                    },
                    "required": ["customer_id", "campaign_id", "delta_micros", "new_total_micros", "reasoning"],
                },
                handler=self._handle_propose_budget_shift,
            ),
            ToolSpec(
                name="submit_no_action",
                description=(
                    "Say that reallocation is not needed. Use when all campaigns are in good shape "
                    "or there's too little data to make a decision."
                ),
                input_schema={
                    "type": "object",
                    "properties": {
                        "reason": {"type": "string"},
                    },
                    "required": ["reason"],
                },
                handler=self._handle_no_action,
            ),
            ToolSpec(
                name="list_recommendations",
                description=(
                    "Fetch Google's own active recommendations for the customer. "
                    "Especially relevant for Vox: MOVE_UNUSED_BUDGET, MARGINAL_ROI_CAMPAIGN_BUDGET, "
                    "FORECASTING_CAMPAIGN_BUDGET, CAMPAIGN_BUDGET — these are cross-campaign signals. "
                    "Call this BEFORE proposing budget shifts."
                ),
                input_schema={
                    "type": "object",
                    "properties": {"customer_id": {"type": "string"}},
                    "required": ["customer_id"],
                },
                handler=lambda customer_id: tools.list_recommendations_tool(customer_id, user_id=self.user_id),
            ),
            ToolSpec(
                name="propose_apply_recommendation",
                description=(
                    "Propose applying a Google-generated recommendation. Use this for budget-related "
                    "recommendations (MOVE_UNUSED_BUDGET, CAMPAIGN_BUDGET, etc.) instead of, or in "
                    "addition to, propose_budget_shift. Saved as 'proposed' — requires approval."
                ),
                input_schema={
                    "type": "object",
                    "properties": {
                        "customer_id": {"type": "string"},
                        "recommendation_resource_name": {"type": "string"},
                        "recommendation_type": {"type": "string"},
                        "reasoning": {"type": "string"},
                        "confidence": {"type": "number", "minimum": 0, "maximum": 1, "default": 0.8},
                        "impact_summary": {"type": "string"},
                    },
                    "required": ["customer_id", "recommendation_resource_name", "recommendation_type", "reasoning"],
                },
                handler=lambda customer_id, recommendation_resource_name, recommendation_type, reasoning, confidence=0.8, impact_summary=None: tools.propose_apply_recommendation_tool(
                    customer_id,
                    recommendation_resource_name,
                    recommendation_type,
                    reasoning,
                    confidence,
                    impact_summary,
                    user_id=self.user_id,
                ),
            ),
        ]

    async def _handle_propose_budget_shift(
        self,
        customer_id: str,
        campaign_id: str,
        delta_micros: int,
        new_total_micros: int,
        reasoning: str,
        confidence: float = 0.7,
    ) -> dict[str, Any]:
        delta_usd = delta_micros / 1_000_000
        new_total_usd = new_total_micros / 1_000_000
        target = {
            "customer_id": customer_id,
            "campaign_id": campaign_id,
            "delta_micros": delta_micros,
            "delta_usd": delta_usd,
            "new_total_micros": new_total_micros,
            "new_total_usd": new_total_usd,
        }
        try:
            action_id = await audit.write_proposed_action(
                user_id=self.user_id,
                agent_type="strategy",
                action_type="adjust_budget",
                target=target,
                reasoning=reasoning,
                confidence=confidence,
            )
        except Exception as e:
            logger.exception("Failed to persist Vox proposal")
            return {"ok": False, "error": str(e)}

        proposed = {
            "action_id": action_id,
            "action_type": "adjust_budget",
            **target,
            "reasoning": reasoning,
            "confidence": confidence,
            "status": "proposed",
        }
        self._proposed_shifts.append(proposed)

        sign = "+" if delta_usd >= 0 else ""
        return {
            "ok": True,
            "action_id": action_id,
            "message": (
                f"Proposed budget shift for campaign {campaign_id}: "
                f"{sign}${delta_usd:.0f}/day → new total ${new_total_usd:.0f}/day "
                f"(confidence {confidence:.2f})."
            ),
            "proposed_action": proposed,
        }

    async def _handle_no_action(self, reason: str) -> dict[str, Any]:
        logger.info("Vox: no budget reallocation today (%s)", reason)
        return {"ok": True, "message": "No action proposed — strategy is stable.", "reason": reason}

    @property
    def proposed_shifts(self) -> list[dict]:
        return self._proposed_shifts
