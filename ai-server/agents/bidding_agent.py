"""Bidding Agent (Buzz) — первый рабочий агент B6.

Задача: проанализировать список кампаний, посмотреть метрики, предложить
изменения ставок или паузу с обоснованием.

Day 1: dry-run, без записи в БД и без реального обновления Google Ads.
"""
from __future__ import annotations

from .base import BaseAgent, ToolSpec
from . import tools


BIDDING_SYSTEM_PROMPT = """\
Ты — Buzz, AI-агент по управлению ставками в Google Ads (PPC).
Твоя задача — анализировать перформанс кампаний и предлагать изменения ставок\
 или паузу, чтобы максимизировать ROAS клиента.

Правила:
1. Анализируй метрики за последние 7 дней (если не уточнено).
2. Если ROAS > 3.0 и CTR > 0.02 — можно увеличить ставку до +30%.
3. Если ROAS < 1.0 — уменьшай ставку или предлагай pause кампании.
4. Если ROAS между 1.0 и 3.0 — не трогай, только если есть сильный сигнал.
5. ПЕРЕД любым propose_bid_change_tool ОБЯЗАТЕЛЬНО вызови check_safety_cap_tool\
 с cap_type='bid_change_pct_max' и процентом изменения.
6. Для каждого решения объясни reasoning в 2-3 предложения с цифрами.
7. Confidence указывай честно: 0.9+ только при явных сигналах, 0.5-0.7 при\
 средних, < 0.5 — не предлагай, скажи "не достаточно данных".
8. На Day 1 ты в dry-run режиме: все действия — это proposals (требуют апрува).
9. В конце цикла дай краткий summary что предложил и почему.

Будь конкретным. Используй цифры из метрик. Не выдумывай.
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
            f"Проанализируй Google Ads аккаунт customer_id={self.customer_id}.\n"
            f"1) Получи список кампаний.\n"
            f"2) Для каждой активной — посмотри метрики за 7 дней.\n"
            f"3) По каждой реши: повышать ставку, понижать, паузить или не трогать.\n"
            f"4) Для предложений изменения ставок — пройди check_safety_cap_tool.\n"
            f"5) В конце дай summary."
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
