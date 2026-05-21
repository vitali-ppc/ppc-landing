"""Базовый agent loop.

Каждый агент:
- Имеет system_prompt и набор tools
- Запускается через run_once() — один цикл reasoning
- Использует Claude Messages API + tool_use паттерн
- Публикует события через event_publisher (Socket.IO + activity_events DB)
"""
from __future__ import annotations

import json
import logging
import os
from dataclasses import dataclass, field
from datetime import datetime
from typing import Any, Awaitable, Callable, Optional

from anthropic import Anthropic

logger = logging.getLogger(__name__)

# По умолчанию Sonnet 4.6 (рекомендация плана для старта).
DEFAULT_MODEL = os.getenv("ANTHROPIC_DEFAULT_MODEL", "claude-sonnet-4-6")
MAX_AGENT_ITERATIONS = 8  # safety cap на петли tool_use


@dataclass
class ToolSpec:
    """Описание инструмента, доступного агенту."""

    name: str
    description: str
    input_schema: dict
    handler: Callable[..., Awaitable[Any]]  # async function


@dataclass
class AgentRunResult:
    """Результат одного run() цикла."""

    final_text: str = ""
    iterations: int = 0
    actions_proposed: list[dict] = field(default_factory=list)
    tool_calls: list[dict] = field(default_factory=list)
    error: Optional[str] = None


EventPublisher = Callable[[str, dict], Awaitable[None]]


class BaseAgent:
    """Базовый класс для всех агентов B6.

    Производные классы переопределяют:
    - name (str)
    - mascot_emoji / mascot_name
    - system_prompt
    - register_tools() — возвращает список ToolSpec'ов
    """

    name: str = "base"
    mascot_emoji: str = "🤖"
    mascot_name: str = "Bot"
    system_prompt: str = "You are a helpful agent."
    model: str = DEFAULT_MODEL

    def __init__(self, user_id: str, event_publisher: Optional[EventPublisher] = None):
        self.user_id = user_id
        self.client = Anthropic()  # подхватывает ANTHROPIC_API_KEY из env
        self.tools = self.register_tools()
        self._event_publisher = event_publisher

    # ---- Override in subclass --------------------------------------------

    def register_tools(self) -> list[ToolSpec]:
        return []

    async def build_initial_prompt(self) -> str:
        """Главный prompt для запуска цикла. Override в подклассах."""
        return "Analyze the situation and decide what to do."

    # ---- Core loop -------------------------------------------------------

    async def run(self) -> AgentRunResult:
        """Запустить один цикл reasoning'а агента.

        Возвращает AgentRunResult с финальным текстом + список proposed actions.
        """
        result = AgentRunResult()
        await self._emit("thinking", {"message": f"{self.mascot_name} starting analysis"})

        initial_prompt = await self.build_initial_prompt()
        messages: list[dict] = [{"role": "user", "content": initial_prompt}]

        tools_payload = [
            {"name": t.name, "description": t.description, "input_schema": t.input_schema}
            for t in self.tools
        ]
        tools_by_name = {t.name: t for t in self.tools}

        for iteration in range(MAX_AGENT_ITERATIONS):
            result.iterations = iteration + 1
            try:
                response = self.client.messages.create(
                    model=self.model,
                    max_tokens=8192,  # Day 6: повышено с 4096 после Aegis upper-token edge
                    system=self.system_prompt,
                    tools=tools_payload,
                    messages=messages,
                )
            except Exception as e:
                logger.exception("Agent %s LLM error", self.name)
                result.error = f"LLM call failed: {e}"
                await self._emit("error", {"message": result.error})
                return result

            # Sprint 8.8 — record token usage + cost per LLM call.
            # Doesn't block on errors (best-effort instrumentation).
            await self._record_usage(response, iteration + 1)

            # Собираем ответ ассистента в messages (требование Anthropic — assistant turn передаётся обратно)
            assistant_content = []
            for block in response.content:
                if block.type == "text":
                    assistant_content.append({"type": "text", "text": block.text})
                elif block.type == "tool_use":
                    assistant_content.append(
                        {
                            "type": "tool_use",
                            "id": block.id,
                            "name": block.name,
                            "input": block.input,
                        }
                    )
            messages.append({"role": "assistant", "content": assistant_content})

            # Если модель завершила без tool_use — выходим
            if response.stop_reason == "end_turn":
                final = next(
                    (b.text for b in response.content if b.type == "text"),
                    "",
                )
                result.final_text = final
                await self._emit("done", {"text": final[:200]})
                return result

            if response.stop_reason != "tool_use":
                # Что-то странное — выходим
                result.error = f"Unexpected stop_reason: {response.stop_reason}"
                return result

            # Обрабатываем tool_use блоки → собираем tool_result в один user-сообщение
            tool_results = []
            for block in response.content:
                if block.type != "tool_use":
                    continue
                spec = tools_by_name.get(block.name)
                if spec is None:
                    tool_results.append(
                        {
                            "type": "tool_result",
                            "tool_use_id": block.id,
                            "content": f"Unknown tool: {block.name}",
                            "is_error": True,
                        }
                    )
                    continue

                await self._emit(
                    "calling_tool",
                    {"tool": block.name, "input": _stringify(block.input)},
                )
                try:
                    tool_output = await spec.handler(**block.input)
                except Exception as e:
                    logger.exception("Tool %s failed", block.name)
                    tool_results.append(
                        {
                            "type": "tool_result",
                            "tool_use_id": block.id,
                            "content": f"Tool error: {e}",
                            "is_error": True,
                        }
                    )
                    continue

                # Логируем вызов
                result.tool_calls.append(
                    {
                        "name": block.name,
                        "input": dict(block.input),
                        "output_preview": _stringify(tool_output)[:200],
                        "ts": datetime.utcnow().isoformat(),
                    }
                )

                # Если tool вернул структуру с "proposed_action" — собираем
                if isinstance(tool_output, dict) and "proposed_action" in tool_output:
                    result.actions_proposed.append(tool_output["proposed_action"])

                tool_results.append(
                    {
                        "type": "tool_result",
                        "tool_use_id": block.id,
                        "content": _stringify(tool_output),
                    }
                )

            # Передаём результаты обратно модели
            messages.append({"role": "user", "content": tool_results})

        # Превышен max_iterations
        result.error = f"Max iterations ({MAX_AGENT_ITERATIONS}) reached"
        await self._emit("error", {"message": result.error})
        return result

    # ---- Usage tracking (Sprint 8.8) -------------------------------------

    async def _record_usage(self, response: Any, iteration: int) -> None:
        """Write per-call token usage + cost to audit_log (event_type='llm.usage').

        Aggregations come via GET /api/usage. Best-effort: any error here is
        logged but does NOT fail the agent run.
        """
        try:
            usage = getattr(response, "usage", None)
            if usage is None:
                return
            input_tokens = int(getattr(usage, "input_tokens", 0) or 0)
            output_tokens = int(getattr(usage, "output_tokens", 0) or 0)
            cache_creation = int(getattr(usage, "cache_creation_input_tokens", 0) or 0)
            cache_read = int(getattr(usage, "cache_read_input_tokens", 0) or 0)

            cost_usd = _compute_cost(
                self.model, input_tokens, output_tokens, cache_creation, cache_read
            )

            # Lazy import to avoid circular dependencies at module load time.
            from db.models import AuditLog
            from db.session import AsyncSessionLocal

            async with AsyncSessionLocal() as session:
                session.add(
                    AuditLog(
                        user_id=self.user_id,
                        event_type="llm.usage",
                        payload={
                            "agent": self.name,
                            "mascot": self.mascot_name,
                            "model": self.model,
                            "input_tokens": input_tokens,
                            "output_tokens": output_tokens,
                            "cache_creation_tokens": cache_creation,
                            "cache_read_tokens": cache_read,
                            "cost_usd": cost_usd,
                            "iteration": iteration,
                            "customer_id": getattr(self, "customer_id", None),
                        },
                    )
                )
                await session.commit()
        except Exception:
            logger.exception("Failed to record LLM usage for agent=%s", self.name)

    # ---- Event publishing -----------------------------------------------

    async def _emit(self, event_type: str, payload: dict) -> None:
        if self._event_publisher is None:
            return
        try:
            await self._event_publisher(
                event_type,
                {
                    "agent": self.name,
                    "mascot": self.mascot_name,
                    "user_id": self.user_id,
                    **payload,
                },
            )
        except Exception:
            logger.exception("Event publisher failed")


def _stringify(obj: Any) -> str:
    """Сериализовать tool output в строку (Claude ждёт string в tool_result.content)."""
    if isinstance(obj, str):
        return obj
    try:
        return json.dumps(obj, default=str, ensure_ascii=False)
    except Exception:
        return str(obj)


# Pricing per 1M tokens (USD). Source: anthropic.com/pricing as of 2026-05-21.
# Sonnet 4.5/4.6 share the same rates. Haiku 4.5 is roughly 1/4 the price.
# If the model string doesn't match a known family, defaults to Sonnet
# (conservative — overestimates rather than under-reports).
_PRICING: dict[str, dict[str, float]] = {
    "sonnet": {"input": 3.0, "output": 15.0, "cache_write": 3.75, "cache_read": 0.30},
    "opus":   {"input": 15.0, "output": 75.0, "cache_write": 18.75, "cache_read": 1.50},
    "haiku":  {"input": 0.80, "output": 4.0, "cache_write": 1.0, "cache_read": 0.08},
}


def _compute_cost(
    model: str,
    input_tokens: int,
    output_tokens: int,
    cache_creation_tokens: int,
    cache_read_tokens: int,
) -> float:
    """Compute USD cost for a single Anthropic call given token counts.

    Returns USD rounded to 6 decimals (~$0.000001 precision). Total cost
    on a 33-account Vigil tick lands around $0.66-1.14, so $0.000001 is
    overkill for display but useful for aggregating thousands of small
    calls without rounding drift.
    """
    family = "sonnet"  # safe default
    model_lower = (model or "").lower()
    for key in _PRICING:
        if key in model_lower:
            family = key
            break

    rates = _PRICING[family]
    cost = (
        input_tokens * rates["input"]
        + output_tokens * rates["output"]
        + cache_creation_tokens * rates["cache_write"]
        + cache_read_tokens * rates["cache_read"]
    ) / 1_000_000.0
    return round(cost, 6)
