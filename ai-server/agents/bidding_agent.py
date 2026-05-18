"""Bidding Agent (Buzz) — первый рабочий агент B6.

Задача: проанализировать список кампаний, посмотреть метрики, предложить
изменения ставок или паузу с обоснованием.

Day 1: dry-run, без записи в БД и без реального обновления Google Ads.
"""
from __future__ import annotations

from .base import BaseAgent, ToolSpec
from . import tools


BIDDING_SYSTEM_PROMPT = """\
You are Buzz, an AI agent for Google Ads bid management (PPC).
Your job: analyze campaign performance and propose bid changes or pauses to\
 maximize the client's ROAS.

IMPORTANT: All reasoning, summaries, and proposed-action text MUST be in English.

Rules:
1. Analyze metrics over the last 7 days (unless told otherwise).
2. If ROAS > 3.0 and CTR > 0.02, you may raise the bid by up to +30%.
3. If ROAS < 1.0, lower the bid or propose pausing the campaign.
4. If ROAS is between 1.0 and 3.0, leave it alone unless there is a strong signal.
5. BEFORE any propose_bid_change_tool call, ALWAYS call check_safety_cap_tool\
 with cap_type='bid_change_pct_max' and the percent change.
6. For every decision, explain reasoning in 2-3 sentences with concrete numbers.
7. Be honest with confidence: 0.9+ only on clear signals, 0.5-0.7 on moderate ones,\
 < 0.5 means don't propose — say "not enough data".
8. You are in dry-run mode: every action is a proposal (requires user approval).
9. At the end of the cycle, give a short English summary of what you proposed and why.

Be specific. Use numbers from the metrics. Don't make things up.
"""


class BiddingAgent(BaseAgent):
    name = "bidding"
    mascot_emoji = "🐝"
    mascot_name = "Buzz"
    system_prompt = BIDDING_SYSTEM_PROMPT

    def __init__(self, user_id: str, customer_id: str, event_publisher=None):
        self.customer_id = customer_id
        super().__init__(user_id=user_id, event_publisher=event_publisher)

    async def build_initial_prompt(self) -> str:
        return (
            f"Analyze the Google Ads account customer_id={self.customer_id}.\n"
            f"1) List the campaigns.\n"
            f"2) For each active campaign, pull metrics over the last 7 days.\n"
            f"3) For each: decide — raise bid, lower bid, pause, or leave alone.\n"
            f"4) Before any bid change, call check_safety_cap_tool.\n"
            f"5) End with a short English summary.\n"
            f"All reasoning, proposals, and summary text must be in English."
        )

    def register_tools(self) -> list[ToolSpec]:
        return [
            ToolSpec(
                name="list_campaigns",
                description="List all active campaigns for the Google Ads account.",
                input_schema={
                    "type": "object",
                    "properties": {
                        "customer_id": {"type": "string", "description": "Google Ads customer ID (without dashes)"},
                    },
                    "required": ["customer_id"],
                },
                handler=lambda customer_id: tools.list_campaigns_tool(customer_id, user_id=self.user_id),
            ),
            ToolSpec(
                name="get_campaign_metrics",
                description="Get performance metrics for a campaign over the last N days (default 7).",
                input_schema={
                    "type": "object",
                    "properties": {
                        "customer_id": {"type": "string"},
                        "campaign_id": {"type": "string"},
                        "days": {"type": "integer", "default": 7, "minimum": 1, "maximum": 90},
                    },
                    "required": ["customer_id", "campaign_id"],
                },
                handler=lambda customer_id, campaign_id, days=7: tools.get_campaign_metrics_tool(
                    customer_id, campaign_id, days=days, user_id=self.user_id
                ),
            ),
            ToolSpec(
                name="get_keyword_metrics",
                description="Get keyword-level metrics within a campaign.",
                input_schema={
                    "type": "object",
                    "properties": {
                        "customer_id": {"type": "string"},
                        "campaign_id": {"type": "string"},
                    },
                    "required": ["customer_id", "campaign_id"],
                },
                handler=lambda customer_id, campaign_id: tools.get_keyword_metrics_tool(
                    customer_id, campaign_id, user_id=self.user_id
                ),
            ),
            ToolSpec(
                name="check_safety_cap",
                description=(
                    "Check whether an action is within safety caps. Use BEFORE proposing bid changes. "
                    "cap_type='bid_change_pct_max' with amount=percent_change (e.g. 25 for 25%)."
                ),
                input_schema={
                    "type": "object",
                    "properties": {
                        "cap_type": {"type": "string", "enum": ["bid_change_pct_max", "daily_spend_pct_max", "actions_per_hour_max"]},
                        "amount": {"type": "number"},
                    },
                    "required": ["cap_type", "amount"],
                },
                handler=lambda cap_type, amount: tools.check_safety_cap_tool(
                    cap_type, amount, user_id=self.user_id
                ),
            ),
            ToolSpec(
                name="propose_bid_change",
                description=(
                    "Propose a bid change for a campaign. Will be saved as 'proposed' status, "
                    "requires user approval before being applied to Google Ads. ALWAYS call "
                    "check_safety_cap first."
                ),
                input_schema={
                    "type": "object",
                    "properties": {
                        "customer_id": {"type": "string"},
                        "campaign_id": {"type": "string"},
                        "new_bid_usd": {"type": "number", "description": "New bid in USD"},
                        "reasoning": {"type": "string", "description": "2-3 sentence explanation with numbers"},
                        "confidence": {"type": "number", "minimum": 0, "maximum": 1, "default": 0.7},
                    },
                    "required": ["customer_id", "campaign_id", "new_bid_usd", "reasoning"],
                },
                handler=lambda customer_id, campaign_id, new_bid_usd, reasoning, confidence=0.7: tools.propose_bid_change_tool(
                    customer_id, campaign_id, new_bid_usd, reasoning, confidence, user_id=self.user_id
                ),
            ),
            ToolSpec(
                name="propose_pause_campaign",
                description=(
                    "Propose pausing a campaign (e.g. when ROAS < 1 and no recovery signals). "
                    "Saved as 'proposed', requires approval."
                ),
                input_schema={
                    "type": "object",
                    "properties": {
                        "customer_id": {"type": "string"},
                        "campaign_id": {"type": "string"},
                        "reasoning": {"type": "string"},
                        "confidence": {"type": "number", "default": 0.7},
                    },
                    "required": ["customer_id", "campaign_id", "reasoning"],
                },
                handler=lambda customer_id, campaign_id, reasoning, confidence=0.7: tools.propose_pause_campaign_tool(
                    customer_id, campaign_id, reasoning, confidence, user_id=self.user_id
                ),
            ),
        ]
