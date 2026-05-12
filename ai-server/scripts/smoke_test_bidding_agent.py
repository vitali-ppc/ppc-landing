"""Smoke test: запускает Bidding Agent (Buzz) против mock Google Ads данных.

Использование (из ai-server/):
    source venv/bin/activate
    export GOOGLE_ADS_USE_MOCK=true
    export ANTHROPIC_API_KEY=sk-ant-...  # твой реальный ключ
    python scripts/smoke_test_bidding_agent.py

Что произойдёт:
1. Создаётся Bidding Agent
2. Он зовёт list_campaigns → получает 3 mock-кампании
3. Для каждой запрашивает get_campaign_metrics (mock-метрики)
4. Решает что делать, опционально check_safety_cap
5. Предлагает propose_bid_change / propose_pause_campaign
6. Выводит summary + список proposed actions

Это «театр для одного актёра» — мы видим целиком как агент работает,
до того как подключить frontend и WebSocket.
"""
from __future__ import annotations

import asyncio
import json
import logging
import os
import sys
from pathlib import Path

# Поднимаем sys.path
sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from dotenv import load_dotenv
load_dotenv(override=True)  # Перезаписываем пустые shell-vars значениями из .env

logging.basicConfig(
    level=os.getenv("LOG_LEVEL", "INFO"),
    format="%(asctime)s %(levelname)s %(name)s: %(message)s",
)
logger = logging.getLogger("smoke")

from agents.bidding_agent import BiddingAgent  # noqa: E402


async def console_event_publisher(event_type: str, payload: dict) -> None:
    """Простой logger для событий (вместо Socket.IO)."""
    mascot = payload.get("mascot", "?")
    if event_type == "calling_tool":
        print(f"  🐝 {mascot}: вызываю {payload.get('tool')} → {payload.get('input')[:120]}")
    elif event_type == "thinking":
        print(f"  🐝 {mascot}: {payload.get('message')}")
    elif event_type == "done":
        print(f"  🐝 {mascot}: ✅ {payload.get('text')}")
    elif event_type == "error":
        print(f"  🐝 {mascot}: ❌ {payload.get('message')}")
    else:
        print(f"  🐝 {mascot}: [{event_type}] {payload}")


async def main():
    if not os.getenv("ANTHROPIC_API_KEY") or os.getenv("ANTHROPIC_API_KEY", "").endswith("xxx"):
        print("❌ ANTHROPIC_API_KEY не задан или placeholder. Задай реальный ключ в .env")
        sys.exit(1)

    if not os.getenv("GOOGLE_ADS_USE_MOCK"):
        print("ℹ️  GOOGLE_ADS_USE_MOCK не задан, ставлю true для smoke test")
        os.environ["GOOGLE_ADS_USE_MOCK"] = "true"

    print("=" * 70)
    print("B6 Smoke Test — Bidding Agent (Buzz) на mock Google Ads")
    print("=" * 70)

    agent = BiddingAgent(
        user_id="dev-user-001",
        customer_id="1234567890",
        event_publisher=console_event_publisher,
    )

    print(f"\n🐝 Agent {agent.name} ({agent.mascot_emoji} {agent.mascot_name}) starting...")
    print(f"   Model: {agent.model}")
    print(f"   Tools: {[t.name for t in agent.tools]}\n")

    result = await agent.run()

    print("\n" + "=" * 70)
    print("РЕЗУЛЬТАТ")
    print("=" * 70)
    print(f"Iterations: {result.iterations}")
    print(f"Tool calls: {len(result.tool_calls)}")
    print(f"Proposed actions: {len(result.actions_proposed)}")
    if result.error:
        print(f"❌ Error: {result.error}")

    if result.tool_calls:
        print("\nИстория вызовов:")
        for i, call in enumerate(result.tool_calls, 1):
            print(f"  [{i}] {call['name']}({call['input']}) → {call['output_preview'][:80]}")

    if result.actions_proposed:
        print(f"\n📋 Proposed actions ({len(result.actions_proposed)}):")
        for i, action in enumerate(result.actions_proposed, 1):
            print(f"  {i}. {action['action_type']} campaign={action['campaign_id']}")
            print(f"     reasoning: {action['reasoning']}")
            print(f"     confidence: {action['confidence']}")

    print("\n💬 Финальный текст агента:")
    print(result.final_text)
    print()


if __name__ == "__main__":
    asyncio.run(main())
