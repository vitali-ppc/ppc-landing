"""Sage 🦉 — Research Agent.

Анализирует текущую кампанию и предлагает **расширение**:
- Новые ключевые слова (с обоснованием)
- Audience segments
- Конкурентные углы

В production: использует Perplexity или DataForSEO для real-data.
В dev: Claude рассуждает на основе campaign context.
"""
from __future__ import annotations

import logging
import os
from typing import Any, Optional

from .base import BaseAgent, ToolSpec
from services import google_ads_client as gads
from services import audit

logger = logging.getLogger(__name__)


SAGE_SYSTEM_PROMPT = """\
Ты — Sage, AI research-агент в команде B6. Твоя задача — найти **новые возможности**\
 для расширения кампании клиента.

У тебя есть данные одной кампании: топ-ключи, метрики, стратегия. На основе этого:

1. **Предложи 5-10 новых ключевых слов**, которые стоит протестировать:
   - Long-tail варианты от текущих топ-перформеров
   - Semantically related (синонимы, родственные понятия)
   - Intent-based (commercial / informational / navigational)
   - Группировка по themes

2. **Предложи 2-3 audience-сегмента** для дополнительного таргетинга:
   - In-market audiences
   - Affinity / custom intent
   - Lookalike возможности

3. **Найди 1-2 competitor angle**:
   - Какие подходы используют сильные конкуренты в этой нише
   - Где у них слабость, которой можно воспользоваться

Правила:
- **Конкретика > общие слова** (плохо: «активные люди». хорошо: «runners 25-44, interested in marathons»)
- Для ключей указывай **match_type** (EXACT / PHRASE / BROAD) — большинство должны быть PHRASE
- НЕ предлагай дубликаты текущих ключей
- НЕ предлагай негативные ключи (это другая задача)

Используй tools:
- `propose_keyword` — одна за раз, для каждого нового ключа
- `propose_audience` — одна за раз, для каждого сегмента
- `finalize_research` — в конце, с overall summary (1-2 предложения)
"""


class ResearchAgent(BaseAgent):
    name = "research"
    mascot_emoji = "🦉"
    mascot_name = "Sage"
    system_prompt = SAGE_SYSTEM_PROMPT

    def __init__(
        self,
        user_id: str,
        customer_id: str,
        campaign_id: str,
        event_publisher=None,
    ):
        self.customer_id = customer_id
        self.campaign_id = campaign_id
        self._keywords: list[dict] = []
        self._audiences: list[dict] = []
        self._summary: Optional[str] = None
        super().__init__(user_id=user_id, event_publisher=event_publisher)

    async def build_initial_prompt(self) -> str:
        if gads.use_mock():
            access_token = "mock-access-token"
        else:
            refresh = os.getenv("DEV_REFRESH_TOKEN", "")
            access_token = await gads.get_valid_access_token(refresh)

        # Кампания + её текущие ключи
        campaigns = await gads.list_campaigns(access_token, self.customer_id)
        target = next((c for c in campaigns if str(c["id"]) == str(self.campaign_id)), None)
        if not target:
            return f"Кампания {self.campaign_id} не найдена. Скажи 'campaign not found'."

        metrics = await gads.get_campaign_metrics(access_token, self.customer_id, self.campaign_id, days=7)
        try:
            keywords = await gads.get_keyword_metrics(access_token, self.customer_id, self.campaign_id)
        except Exception:
            keywords = []

        kw_lines = "\n".join([
            f"  - «{k.get('keyword')}» ({k.get('match_type')}) — CTR {k.get('ctr',0)*100:.1f}%, "
            f"conv {k.get('conv',0)}, spend ${k.get('spend',0):.2f}"
            for k in keywords[:10]
        ]) or "  (нет данных по ключам)"

        return f"""\
Проведи research для расширения этой кампании.

**Кампания**: «{target['name']}» (id {target['id']})
- Стратегия: {target.get('bid_strategy')}
- Бюджет: ${target['budget_micros']/1_000_000:.0f}/день
- ROAS: {metrics['roas']}, CTR: {metrics['ctr']*100:.2f}%

**Текущие ключи**:
{kw_lines}

Найди 5-10 новых ключей, 2-3 аудитории, 1-2 competitor angle.\
 Затем позови `finalize_research`.
"""

    def register_tools(self) -> list[ToolSpec]:
        return [
            ToolSpec(
                name="propose_keyword",
                description=(
                    "Предложить один новый ключ для кампании. Вызывай для КАЖДОГО ключа отдельно. "
                    "Указывай match_type (EXACT/PHRASE/BROAD) и theme для группировки."
                ),
                input_schema={
                    "type": "object",
                    "properties": {
                        "keyword": {"type": "string"},
                        "match_type": {"type": "string", "enum": ["EXACT", "PHRASE", "BROAD"]},
                        "theme": {"type": "string", "description": "e.g. 'lifestyle', 'urgency', 'product-feature'"},
                        "estimated_intent": {"type": "string", "enum": ["commercial", "informational", "navigational"]},
                        "rationale": {"type": "string"},
                    },
                    "required": ["keyword", "match_type", "theme", "rationale"],
                },
                handler=self._handle_propose_keyword,
            ),
            ToolSpec(
                name="propose_audience",
                description=(
                    "Предложить audience segment для дополнительного таргетинга."
                ),
                input_schema={
                    "type": "object",
                    "properties": {
                        "audience_label": {"type": "string", "description": "Short label"},
                        "audience_type": {
                            "type": "string",
                            "enum": ["in-market", "affinity", "custom_intent", "lookalike", "demographic"],
                        },
                        "description": {"type": "string"},
                        "rationale": {"type": "string"},
                    },
                    "required": ["audience_label", "audience_type", "description", "rationale"],
                },
                handler=self._handle_propose_audience,
            ),
            ToolSpec(
                name="finalize_research",
                description="Финальный summary research-сессии. Вызывай ОДИН раз в конце.",
                input_schema={
                    "type": "object",
                    "properties": {
                        "summary": {"type": "string", "description": "1-2 sentences overall conclusion"},
                        "competitor_angle": {
                            "type": "string",
                            "description": "Optional: what's the competitive gap to exploit",
                        },
                    },
                    "required": ["summary"],
                },
                handler=self._handle_finalize,
            ),
        ]

    async def _handle_propose_keyword(
        self,
        keyword: str,
        match_type: str,
        theme: str,
        rationale: str,
        estimated_intent: Optional[str] = None,
    ) -> dict[str, Any]:
        target = {
            "customer_id": self.customer_id,
            "campaign_id": self.campaign_id,
            "keyword": keyword,
            "match_type": match_type,
            "theme": theme,
            "estimated_intent": estimated_intent,
        }
        try:
            action_id = await audit.write_proposed_action(
                user_id=self.user_id,
                agent_type="research",
                action_type="add_keyword",
                target=target,
                reasoning=rationale,
                confidence=0.7,
            )
        except Exception as e:
            return {"ok": False, "error": str(e)}

        entry = {"action_id": action_id, **target, "rationale": rationale}
        self._keywords.append(entry)
        return {
            "ok": True,
            "action_id": action_id,
            "message": f"Keyword «{keyword}» ({match_type}) saved",
        }

    async def _handle_propose_audience(
        self,
        audience_label: str,
        audience_type: str,
        description: str,
        rationale: str,
    ) -> dict[str, Any]:
        target = {
            "customer_id": self.customer_id,
            "campaign_id": self.campaign_id,
            "audience_label": audience_label,
            "audience_type": audience_type,
            "description": description,
        }
        try:
            action_id = await audit.write_proposed_action(
                user_id=self.user_id,
                agent_type="research",
                action_type="add_audience",
                target=target,
                reasoning=rationale,
                confidence=0.65,
            )
        except Exception as e:
            return {"ok": False, "error": str(e)}

        entry = {"action_id": action_id, **target, "rationale": rationale}
        self._audiences.append(entry)
        return {
            "ok": True,
            "action_id": action_id,
            "message": f"Audience «{audience_label}» ({audience_type}) saved",
        }

    async def _handle_finalize(self, summary: str, competitor_angle: Optional[str] = None) -> dict[str, Any]:
        self._summary = summary
        return {
            "ok": True,
            "keywords_count": len(self._keywords),
            "audiences_count": len(self._audiences),
            "summary": summary,
            "competitor_angle": competitor_angle,
        }

    @property
    def proposals(self) -> list[dict]:
        # Для совместимости с router'ом (там используется .proposals)
        return self._keywords + self._audiences

    @property
    def research_result(self) -> dict[str, Any]:
        return {
            "keywords": self._keywords,
            "audiences": self._audiences,
            "summary": self._summary,
        }
