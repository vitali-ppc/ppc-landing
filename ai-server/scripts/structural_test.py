"""Структурный тест Day 1: проверяет что компоненты импортируются и
mock-tools отрабатывают БЕЗ обращения к Claude API.

Это позволяет убедиться что архитектура целая до получения ANTHROPIC_API_KEY.
"""
from __future__ import annotations

import asyncio
import os
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

os.environ.setdefault("GOOGLE_ADS_USE_MOCK", "true")
os.environ.setdefault("ANTHROPIC_API_KEY", "sk-ant-fake-for-structural-test")

from agents.bidding_agent import BiddingAgent
from agents import tools


async def check_imports_and_construction():
    print("[1/4] Imports OK")
    agent = BiddingAgent(user_id="test", customer_id="1234567890")
    print(f"      Agent {agent.name} created with {len(agent.tools)} tools:")
    for t in agent.tools:
        print(f"         - {t.name}: {t.description[:60]}...")


async def check_tools_execute_on_mock():
    print("\n[2/4] Tool: list_campaigns")
    res = await tools.list_campaigns_tool(customer_id="1234567890")
    assert res["count"] == 3, f"Expected 3 campaigns, got {res['count']}"
    print(f"      ✅ {res['count']} campaigns returned")

    print("\n[3/4] Tool: get_campaign_metrics")
    metrics = await tools.get_campaign_metrics_tool(
        customer_id="1234567890",
        campaign_id="100001",
        days=7,
    )
    assert metrics["campaign_id"] == "100001"
    assert "roas" in metrics
    print(f"      ✅ campaign 100001 ROAS = {metrics['roas']}, spend = ${metrics['spend_usd']}")

    print("\n[4/4] Tool: propose_bid_change + check_safety_cap")
    safety = await tools.check_safety_cap_tool(cap_type="bid_change_pct_max", amount=25)
    assert safety["allowed"], f"25% must be allowed, got {safety}"
    print(f"      ✅ 25% bid change within cap ({safety['limit']}%)")

    safety_over = await tools.check_safety_cap_tool(cap_type="bid_change_pct_max", amount=50)
    assert not safety_over["allowed"], "50% should exceed cap"
    print(f"      ✅ 50% bid change correctly blocked ({safety_over['reason']})")

    proposal = await tools.propose_bid_change_tool(
        customer_id="1234567890",
        campaign_id="100001",
        new_bid_usd=2.50,
        reasoning="ROAS 5.88x > 3, CTR 2.03% — safe to raise bid by 25%",
        confidence=0.85,
    )
    assert "proposed_action" in proposal
    print(f"      ✅ Proposed action returned: {proposal['proposed_action']['action_type']}")


async def main():
    print("=" * 60)
    print("B6 Day 1 Structural Test")
    print("=" * 60)
    print()

    await check_imports_and_construction()
    await check_tools_execute_on_mock()

    print("\n" + "=" * 60)
    print("✅ Все структурные проверки прошли")
    print()
    print("Что готово к Day 2:")
    print("  - SQLAlchemy модели + Alembic миграция (b6_dev.db создан)")
    print("  - google_ads_client с mock + real путями")
    print("  - BaseAgent с tool_use loop")
    print("  - BiddingAgent (Buzz) c 6 tools")
    print()
    print("Чтобы запустить агента с реальным Claude API:")
    print("  1. Получи ANTHROPIC_API_KEY на console.anthropic.com")
    print("  2. Положи в ai-server/.env: ANTHROPIC_API_KEY=sk-ant-...")
    print("  3. python scripts/smoke_test_bidding_agent.py")
    print("=" * 60)


if __name__ == "__main__":
    asyncio.run(main())
