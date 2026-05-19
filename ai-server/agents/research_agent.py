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
from . import tools
from services import google_ads_client as gads
from services import audit

logger = logging.getLogger(__name__)


SAGE_SYSTEM_PROMPT = """\
You are Sage, an AI research agent in the B6 team. Your job has TWO parts:

**Part A — Cleanup (negative keywords).** FIRST, call `list_search_terms` to fetch\
 real queries that drained budget without converting (default filter: $5+ spend,\
 0 conversions over 30 days). For each clear junk query, propose adding it as a\
 NEGATIVE keyword via `propose_negative_keyword`. This is high-value work —\
 every junk query removed = real money saved every day going forward.

**Part B — Expansion.** AFTER cleanup, look at the campaign's current keywords\
 and propose 5-10 new ones worth testing + 2-3 audiences.

IMPORTANT: All reasoning, summaries, flags, and proposal text MUST be in English.

Part A — Negative keyword rules:
- Junk indicator: spend > $5, conversions = 0, intent clearly unrelated to product
- Be conservative with match_type:
  * EXACT — default, safest (blocks only the exact phrase)
  * PHRASE — only when several variants of the same junk phrase appear
  * BROAD — almost never (over-blocks legitimate variants)
- Skip queries that are borderline (low spend OR could convert later)
- For each negative keyword propose, include reasoning citing the wasted spend
  and why this query is irrelevant to the product

Part B — Keyword expansion rules:
- **Specifics > generic words** (bad: "active people". good: "runners 25-44, interested in marathons")
- For keywords specify **match_type** (EXACT / PHRASE / BROAD) — most should be PHRASE
- DO NOT propose duplicates of current keywords
- DO NOT propose the same text as a negative — these would cancel out

Use tools:
- `list_search_terms` — call FIRST, to fetch junk-query candidates
- `propose_negative_keyword` — for each clear junk query
- `propose_keyword` — for each new expansion keyword
- `propose_audience` — for each segment
- `finalize_research` — at the end, with an overall summary (1-2 sentences) noting
  both the cleanup savings ("blocked $X/mo in wasted spend") and expansion ideas
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
            from agents.tools import _get_access_token_for
            access_token = await _get_access_token_for(self.user_id, self.customer_id)

        # Кампания + её текущие ключи
        campaigns = await gads.list_campaigns(access_token, self.customer_id)
        target = next((c for c in campaigns if str(c["id"]) == str(self.campaign_id)), None)
        if not target:
            return f"Campaign {self.campaign_id} not found. Say 'campaign not found'."

        metrics = await gads.get_campaign_metrics(access_token, self.customer_id, self.campaign_id, days=7)
        try:
            keywords = await gads.get_keyword_metrics(access_token, self.customer_id, self.campaign_id)
        except Exception:
            keywords = []

        kw_lines = "\n".join([
            f"  - \"{k.get('keyword')}\" ({k.get('match_type')}) — CTR {k.get('ctr',0)*100:.1f}%, "
            f"conv {k.get('conv',0)}, spend ${k.get('spend',0):.2f}"
            for k in keywords[:10]
        ]) or "  (no keyword data)"

        return f"""\
Run research to expand this campaign.

**Campaign**: "{target['name']}" (id {target['id']})
- Strategy: {target.get('bid_strategy')}
- Budget: ${target['budget_micros']/1_000_000:.0f}/day
- ROAS: {metrics['roas']}, CTR: {metrics['ctr']*100:.2f}%

**Current keywords**:
{kw_lines}

Find 5-10 new keywords, 2-3 audiences, 1-2 competitor angles.\
 Then call `finalize_research`. All output must be in English.
"""

    def register_tools(self) -> list[ToolSpec]:
        return [
            ToolSpec(
                name="list_search_terms",
                description=(
                    "Fetch real search queries that triggered the client's ads. Default filter "
                    "(junk-spend indicator): spend > $5 over the last 30 days AND zero conversions. "
                    "ALWAYS call this FIRST (Part A — cleanup) before proposing new keywords."
                ),
                input_schema={
                    "type": "object",
                    "properties": {
                        "customer_id": {"type": "string"},
                        "days": {"type": "integer", "default": 30, "minimum": 7, "maximum": 90},
                        "min_cost_usd": {"type": "number", "default": 5.0},
                        "max_conversions": {"type": "number", "default": 0.0},
                        "limit": {"type": "integer", "default": 50, "minimum": 1, "maximum": 200},
                    },
                    "required": ["customer_id"],
                },
                handler=lambda customer_id, days=30, min_cost_usd=5.0, max_conversions=0.0, limit=50: tools.list_search_terms_tool(
                    customer_id, days, min_cost_usd, max_conversions, limit, user_id=self.user_id
                ),
            ),
            ToolSpec(
                name="propose_negative_keyword",
                description=(
                    "Propose adding a negative keyword at the campaign level. Use for clear junk "
                    "queries from list_search_terms output. match_type: EXACT (default, safest), "
                    "PHRASE (when multiple variants of the same junk), BROAD (almost never)."
                ),
                input_schema={
                    "type": "object",
                    "properties": {
                        "customer_id": {"type": "string"},
                        "campaign_id": {"type": "string"},
                        "keyword_text": {"type": "string", "description": "The junk query to block"},
                        "match_type": {"type": "string", "enum": ["EXACT", "PHRASE", "BROAD"], "default": "EXACT"},
                        "reasoning": {"type": "string", "description": "Cite wasted spend + why query is irrelevant"},
                        "confidence": {"type": "number", "minimum": 0, "maximum": 1, "default": 0.85},
                        "impact_summary": {"type": "string", "description": "e.g. 'saves ~$7.50/mo of wasted spend'"},
                    },
                    "required": ["customer_id", "campaign_id", "keyword_text", "reasoning"],
                },
                handler=lambda customer_id, campaign_id, keyword_text, reasoning, match_type="EXACT", confidence=0.85, impact_summary=None: tools.propose_negative_keyword_tool(
                    customer_id, campaign_id, keyword_text, match_type, reasoning, confidence, impact_summary, user_id=self.user_id
                ),
            ),
            ToolSpec(
                name="propose_keyword",
                description=(
                    "Propose one new keyword for the campaign. Call this separately for EACH keyword. "
                    "Specify match_type (EXACT/PHRASE/BROAD) and theme for grouping."
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
                    "Propose an audience segment for additional targeting."
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
                description="Final summary of the research session. Call this ONCE at the end.",
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
