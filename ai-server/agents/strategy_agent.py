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
from services import google_ads_client as gads
from services import audit

logger = logging.getLogger(__name__)


VOX_SYSTEM_PROMPT = """\
Ты — Vox, AI strategy-агент в команде B6. Твоя задача — управление бюджетом\
 МЕЖДУ кампаниями (не внутри одной).

Принцип: тебе дают список ВСЕХ активных кампаний клиента с их метриками за 7 дней.\
 Ты решаешь как перераспределить бюджет:

1. **Star-перформеры** (ROAS ≥ 3.0 + конверсии стабильные) → давать больше бюджета (+10-30%)
2. **Подтянутые** (ROAS 1.5-3.0) → держать как есть
3. **Слабые** (ROAS 1.0-1.5) → сократить бюджет (-20-40%) для проверки
4. **Убытки** (ROAS < 1.0 за 7+ дней) → паузить или сильно сократить

Правила:
- НЕ повышай бюджет более чем на 30% за один раз (риск)
- НЕ сокращай бюджет ниже 20% от текущего (можно убить кампанию)
- Перераспределение должно быть **нулевой суммой**: если у одной +$N, у другой -$N
- Если все кампании отличные — скажи это и не лезь зря

Возвращай proposed_actions через tool `propose_budget_shift` —\
 КАЖДЫЙ shift отдельным вызовом. Если ничего не нужно менять — позови `submit_no_action`\
 с объяснением почему.

В финале дай 2-3 предложения summary стратегии.
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
        lines = ["Активные кампании с метриками за 7 дней:\n"]
        for c in campaigns:
            try:
                m = await gads.get_campaign_metrics(access_token, self.customer_id, str(c["id"]), days=7)
                lines.append(
                    f"- campaign_id={c['id']} «{c['name']}»\n"
                    f"  бюджет: ${c['budget_micros']/1_000_000:.0f}/day"
                    f", стратегия: {c.get('bid_strategy')}\n"
                    f"  ROAS: {m['roas']}, CTR: {m['ctr']*100:.2f}%"
                    f", spend $: {m['spend_micros']/1_000_000:.0f}"
                    f", conv: {m['conversions']}, conv_value $: {m['conversion_value']}"
                )
            except Exception as e:
                lines.append(f"- campaign_id={c['id']}: ошибка метрик ({e})")

        lines.append("\nПроанализируй и предложи перераспределение бюджета (или скажи что не нужно).")
        return "\n".join(lines)

    def register_tools(self) -> list[ToolSpec]:
        return [
            ToolSpec(
                name="propose_budget_shift",
                description=(
                    "Предложить изменение бюджета одной кампании. "
                    "delta_micros: положительное = добавить, отрицательное = сократить (в micros, 1$ = 1_000_000). "
                    "ВАЖНО: сумма deltas по всем кампаниям должна быть ≈ 0 (zero-sum reallocation)."
                ),
                input_schema={
                    "type": "object",
                    "properties": {
                        "customer_id": {"type": "string"},
                        "campaign_id": {"type": "string"},
                        "delta_micros": {"type": "integer", "description": "1$ = 1_000_000 micros"},
                        "new_total_micros": {"type": "integer", "description": "Новый дневной бюджет в micros"},
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
                    "Сказать что перераспределение не нужно. Используй когда все кампании в хорошей форме "
                    "или данных слишком мало для решения."
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
