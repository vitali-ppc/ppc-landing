"""Mira 🎨 — Creative Agent.

Генерит:
- 3 варианта ad copy (headline + description) для конкретной кампании
- Для каждого варианта — prompt для генерации картинки
- (Опционально) реально генерит картинку через fal.ai

Основа решений: читает метрики кампании (что работает, что нет), учитывает target keywords.

Это **визуально wow** агент: пользователь видит готовые объявления, не пустые анализы.
"""
from __future__ import annotations

import logging
import os
from typing import Any, Optional

from .base import BaseAgent, ToolSpec
from services import google_ads_client as gads
from services import image_gen
from services import audit

logger = logging.getLogger(__name__)


MIRA_SYSTEM_PROMPT = """\
Ты — Mira, AI creative-агент в команде B6. Твоя задача — создавать рекламные креативы\
 для Google Ads кампаний пользователя.

У тебя есть данные одной кампании (метрики, бюджет, стратегия). Твоё задание:

1. Сгенерируй **3 варианта** ad copy (Responsive Search Ad-формат):
   - **Headline 1** (макс 30 символов) — главное преимущество
   - **Headline 2** (макс 30 символов) — call to action
   - **Description** (макс 90 символов) — детали + что мотивирует кликнуть

2. К каждому варианту — **image prompt** для display ad (одной строкой):
   - Стиль (modern minimalist / lifestyle photo / product hero / abstract)
   - Объект (что показать)
   - Mood (energetic / calm / luxurious / playful)

3. Объясни **почему именно такие** креативы — на основе данных кампании.

Правила Google Ads:
- Без CAPS LOCK, восклицательных знаков подряд
- Без обещаний типа «100% guaranteed»
- Без неподтверждённых статистик
- Конкретика > общие слова

Используй tool `propose_creative_set` (ОДИН раз) с всеми 3 вариантами.
"""


class CreativeAgent(BaseAgent):
    name = "creative"
    mascot_emoji = "🎨"
    mascot_name = "Mira"
    system_prompt = MIRA_SYSTEM_PROMPT

    def __init__(
        self,
        user_id: str,
        customer_id: str,
        campaign_id: str,
        event_publisher=None,
        generate_images: bool = True,
    ):
        self.customer_id = customer_id
        self.campaign_id = campaign_id
        self.generate_images = generate_images
        self._proposals: list[dict] = []
        super().__init__(user_id=user_id, event_publisher=event_publisher)

    async def build_initial_prompt(self) -> str:
        """Собираем контекст одной кампании для Mira."""
        if gads.use_mock():
            access_token = "mock-access-token"
        else:
            refresh = os.getenv("DEV_REFRESH_TOKEN", "")
            access_token = await gads.get_valid_access_token(refresh)

        # Список кампаний — найдём нашу
        campaigns = await gads.list_campaigns(access_token, self.customer_id)
        target = next((c for c in campaigns if str(c["id"]) == str(self.campaign_id)), None)
        if not target:
            return f"Кампания {self.campaign_id} не найдена. Скажи 'campaign not found' и выйди."

        # Метрики
        metrics = await gads.get_campaign_metrics(
            access_token, self.customer_id, self.campaign_id, days=7
        )
        try:
            keywords = await gads.get_keyword_metrics(
                access_token, self.customer_id, self.campaign_id
            )
        except Exception:
            keywords = []

        kw_lines = "\n".join([
            f"  - «{k.get('keyword')}» ({k.get('match_type')}) CTR {k.get('ctr',0)*100:.1f}%"
            for k in keywords[:5]
        ]) or "  (нет данных по ключам)"

        return f"""\
Создай 3 варианта рекламы для следующей кампании.

**Кампания**: «{target['name']}» (id {target['id']})
- Стратегия: {target.get('bid_strategy')}
- Бюджет: ${target['budget_micros']/1_000_000:.0f}/день

**Метрики за 7 дней**:
- ROAS: {metrics['roas']}
- CTR: {metrics['ctr']*100:.2f}%
- Конверсий: {metrics['conversions']}
- Стоимость конверсии: ~${metrics['spend_micros']/1_000_000/max(metrics['conversions'],1):.2f}

**Топ-5 ключей в кампании**:
{kw_lines}

Вызови `propose_creative_set` с 3 вариантами + image prompts.
"""

    def register_tools(self) -> list[ToolSpec]:
        return [
            ToolSpec(
                name="propose_creative_set",
                description=(
                    "Submit 3 ad creative variants for this campaign. Call ONCE with all 3."
                ),
                input_schema={
                    "type": "object",
                    "properties": {
                        "variants": {
                            "type": "array",
                            "minItems": 1,
                            "maxItems": 3,
                            "items": {
                                "type": "object",
                                "properties": {
                                    "label": {"type": "string", "description": "Short name, e.g. 'Bold deal', 'Trust angle'"},
                                    "headline_1": {"type": "string", "maxLength": 30},
                                    "headline_2": {"type": "string", "maxLength": 30},
                                    "description": {"type": "string", "maxLength": 90},
                                    "image_prompt": {"type": "string", "description": "One sentence prompt for image gen"},
                                    "rationale": {"type": "string", "description": "Why this variant fits the data"},
                                },
                                "required": ["label", "headline_1", "headline_2", "description", "image_prompt", "rationale"],
                            },
                        },
                        "strategy_note": {"type": "string", "description": "Overall thinking about A/B test setup"},
                    },
                    "required": ["variants"],
                },
                handler=self._handle_propose_creative_set,
            ),
        ]

    async def _handle_propose_creative_set(
        self,
        variants: list[dict],
        strategy_note: str = "",
    ) -> dict[str, Any]:
        result_variants = []
        for v in variants:
            # Опционально генерим картинку
            image_result = None
            if self.generate_images:
                image_result = await image_gen.generate_image(v["image_prompt"], num_images=1)

            target = {
                "customer_id": self.customer_id,
                "campaign_id": self.campaign_id,
                "label": v["label"],
                "headline_1": v["headline_1"],
                "headline_2": v["headline_2"],
                "description": v["description"],
                "image_prompt": v["image_prompt"],
                "image_url": (image_result or {}).get("urls", [None])[0],
                "image_mock": (image_result or {}).get("mock"),
            }
            try:
                action_id = await audit.write_proposed_action(
                    user_id=self.user_id,
                    agent_type="creative",
                    action_type="create_ad_variant",
                    target=target,
                    reasoning=v["rationale"],
                    confidence=0.75,
                )
            except Exception as e:
                logger.exception("Failed to persist creative variant")
                return {"ok": False, "error": str(e)}

            proposal = {
                "action_id": action_id,
                "action_type": "create_ad_variant",
                **target,
                "rationale": v["rationale"],
                "status": "proposed",
            }
            self._proposals.append(proposal)
            result_variants.append(proposal)

        return {
            "ok": True,
            "variants": result_variants,
            "strategy_note": strategy_note,
            "message": f"Mira proposed {len(result_variants)} ad variants",
        }

    @property
    def proposals(self) -> list[dict]:
        return self._proposals
