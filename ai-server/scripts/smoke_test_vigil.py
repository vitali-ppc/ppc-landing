"""Smoke test for Vigil 🦇 — Sprint 8 Phase 1.

Runs in 3 layers:
  Layer 1 — pure detector with hand-built data (no API, no LLM, no DB)
  Layer 2 — mock Google Ads data → detector via tool wrapper (still no LLM, no DB)
  Layer 3 — full VigilAgent.run() with mock account (LLM + DB write)

Usage:
    cd ai-server
    source venv/bin/activate
    GOOGLE_ADS_USE_MOCK=true python scripts/smoke_test_vigil.py

Requires ANTHROPIC_API_KEY in env for Layer 3.
"""
from __future__ import annotations

import asyncio
import os
import sys
from datetime import datetime, timedelta
from pathlib import Path

# Make `ai-server/` importable when run as a script.
ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT))

# Load .env from ai-server/ so ANTHROPIC_API_KEY etc. are available.
try:
    from dotenv import load_dotenv  # type: ignore
    load_dotenv(ROOT / ".env", override=True)
except ImportError:
    pass

# Force mock mode for predictable behavior.
os.environ.setdefault("GOOGLE_ADS_USE_MOCK", "true")

from services.anomaly_detector import detect_anomalies  # noqa: E402


def _day_offset(offset: int, **m: float) -> dict:
    return {
        "date": (datetime.utcnow().date() - timedelta(days=offset)).isoformat(),
        "impressions": int(m.get("impressions", 0)),
        "clicks": int(m.get("clicks", 0)),
        "cost_micros": int(m.get("cost_micros", 0)),
        "conversions": float(m.get("conversions", 0.0)),
        "conversion_value": float(m.get("conversion_value", 0.0)),
    }


def layer1_pure_detector() -> int:
    """Hand-built input that should trigger each rule at least once.

    Note: detector uses YESTERDAY (offset=1), not today (offset=0). Anomalies
    are placed at offset=1, baseline at offsets 2..29.
    """
    print("\n" + "=" * 60)
    print("LAYER 1 — pure detector (no API, no LLM, no DB)")
    print("=" * 60)

    # Partial-today placeholder for all campaigns
    today = _day_offset(0, impressions=200, clicks=4, cost_micros=2_000_000,
                        conversions=0, conversion_value=0)

    campaigns = [
        # Spend spike: yesterday $45 vs $15 median + 2x daily budget over-deliver
        {
            "campaign_id": "AAA",
            "campaign_name": "Spike-Test",
            "daily_budget_micros": 18_000_000,  # $18/day budget; $45 spent = 2.5× over
            "daily": [
                today,
                _day_offset(1, impressions=2500, clicks=50, cost_micros=45_000_000, conversions=4, conversion_value=120),
                *[_day_offset(i, impressions=2000, clicks=40, cost_micros=15_000_000, conversions=3, conversion_value=90) for i in range(2, 30)],
            ],
        },
        # Zero conversions yesterday with significant spend
        {
            "campaign_id": "BBB",
            "campaign_name": "Zero-Conv-Test",
            "daily_budget_micros": 25_000_000,
            "daily": [
                today,
                _day_offset(1, impressions=1800, clicks=30, cost_micros=22_000_000, conversions=0, conversion_value=0),
                *[_day_offset(i, impressions=1700, clicks=32, cost_micros=18_000_000, conversions=2.5, conversion_value=75) for i in range(2, 30)],
            ],
        },
        # CTR collapse yesterday — impressions stable, clicks crater
        {
            "campaign_id": "CCC",
            "campaign_name": "CTR-Collapse-Test",
            "daily_budget_micros": 22_000_000,
            "daily": [
                today,
                _day_offset(1, impressions=10500, clicks=42, cost_micros=8_500_000, conversions=3, conversion_value=90),
                *[_day_offset(i, impressions=10000, clicks=200, cost_micros=20_000_000, conversions=4, conversion_value=120) for i in range(2, 30)],
            ],
        },
        # ROAS drop yesterday
        {
            "campaign_id": "DDD",
            "campaign_name": "ROAS-Drop-Test",
            "daily_budget_micros": 35_000_000,
            "daily": [
                today,
                _day_offset(1, impressions=3000, clicks=60, cost_micros=30_000_000, conversions=3, conversion_value=33),
                *[_day_offset(i, impressions=3200, clicks=64, cost_micros=32_000_000, conversions=4, conversion_value=160) for i in range(2, 30)],
            ],
        },
        # Quiet — nothing should fire
        {
            "campaign_id": "EEE",
            "campaign_name": "Quiet-Test",
            "daily_budget_micros": 25_000_000,
            "daily": [
                today,
                *[_day_offset(i, impressions=2000, clicks=40, cost_micros=20_000_000, conversions=3, conversion_value=100) for i in range(1, 30)],
            ],
        },
        # NEW: Intentional budget bump — operator raised budget 5×, Google
        # is now spending up to the new budget. Should NOT trigger spend_spike
        # because Google is NOT over-delivering the new budget cap.
        {
            "campaign_id": "FFF",
            "campaign_name": "Intentional-Bump-Test",
            "daily_budget_micros": 100_000_000,  # bumped to $100/day
            "daily": [
                today,
                _day_offset(1, impressions=10000, clicks=200, cost_micros=95_000_000, conversions=15, conversion_value=600),
                *[_day_offset(i, impressions=2000, clicks=40, cost_micros=18_000_000, conversions=3, conversion_value=120) for i in range(2, 30)],
            ],
        },
    ]
    anomalies = detect_anomalies(campaigns, baseline_days=28)

    types_seen = {a.type for a in anomalies}
    print(f"\n  Detected {len(anomalies)} anomalies across {len(campaigns)} campaigns:")
    for a in anomalies:
        print(f"   [{a.severity:8}] {a.campaign_name:24} {a.type:18} → {a.summary}")

    expected = {"spend_spike", "zero_conversions", "ctr_collapse", "roas_drop"}
    missing = expected - types_seen
    extra_on_quiet = [a for a in anomalies if a.campaign_id == "EEE"]
    extra_on_bump = [a for a in anomalies if a.campaign_id == "FFF"]
    if missing:
        print(f"\n  ❌ Missing rule types: {missing}")
        return 1
    if extra_on_quiet:
        print(f"\n  ❌ Quiet campaign produced false positives: {extra_on_quiet}")
        return 1
    if extra_on_bump:
        print(f"\n  ❌ Intentional budget-bump campaign produced false positives: "
              f"{[a.type for a in extra_on_bump]} — budget-aware rule failing")
        return 1
    print("\n  ✅ Layer 1 PASS — all rules fire, quiet + intentional-bump stay quiet.")
    return 0


async def layer2_tool_wrapper() -> int:
    """detect_anomalies_tool wired through google_ads_client mock data."""
    print("\n" + "=" * 60)
    print("LAYER 2 — tool wrapper + mock Google Ads data (no LLM, no DB write)")
    print("=" * 60)

    from agents.tools import detect_anomalies_tool

    result = await detect_anomalies_tool(
        customer_id="3133506664", days=14, user_id="dev-user-001"
    )
    if not result.get("ok"):
        print(f"  ❌ Tool returned error: {result}")
        return 1
    print(f"  Scanned campaigns: {result['scanned_campaigns']}")
    print(f"  Candidate anomalies: {result['candidate_count']}")
    for c in result["candidates"]:
        print(f"   [{c['severity']:8}] {c['campaign_name']:30} {c['type']:18} → {c['summary']}")
    if result["candidate_count"] == 0:
        print("  ⚠️  No candidates from mock data — mock fixtures may need adjustment.")
        return 1
    print("\n  ✅ Layer 2 PASS — tool wrapper returns structured candidates.")
    return 0


async def layer3_full_agent() -> int:
    """Run VigilAgent end-to-end on mock data (uses LLM + writes to DB)."""
    print("\n" + "=" * 60)
    print("LAYER 3 — full VigilAgent.run() (LLM + DB)")
    print("=" * 60)
    if not os.environ.get("ANTHROPIC_API_KEY"):
        print("  ⚠️  ANTHROPIC_API_KEY missing — skipping Layer 3.")
        return 0

    # Verify dev-user-001 exists (assume Alembic migrations + seed already ran).
    from db.session import AsyncSessionLocal
    from db.models import User
    from sqlalchemy import select

    async with AsyncSessionLocal() as session:
        stmt = select(User).where(User.id == "dev-user-001")
        existing = (await session.execute(stmt)).scalar_one_or_none()
        if not existing:
            print("  ❌ dev-user-001 not in DB. Run `alembic upgrade head && python scripts/seed_dev.py`.")
            return 1

    from agents.anomaly_agent import VigilAgent

    captured: list[tuple[str, dict]] = []

    async def cap(event_type: str, payload: dict) -> None:
        captured.append((event_type, payload))

    agent = VigilAgent(
        user_id="dev-user-001",
        customer_id="3133506664",
        event_publisher=cap,
        days=14,
    )
    result = await agent.run()

    print(f"  iterations: {result.iterations}")
    print(f"  tool_calls: {len(result.tool_calls)}")
    print(f"  alerts raised: {len(agent.alerts)}")
    print(f"  final_text: {result.final_text[:300]}")
    if result.error:
        print(f"  ❌ Error: {result.error}")
        return 1
    if not result.tool_calls:
        print("  ❌ Vigil made no tool calls.")
        return 1
    if not agent.alerts:
        print("  ⚠️  Vigil scanned but raised 0 alerts — could be valid if it deduped, but mock data should trigger at least one.")
        # Don't fail the test on this — model judgment is part of the loop.
    print("\n  ✅ Layer 3 PASS — VigilAgent runs end-to-end.")
    return 0


async def main() -> int:
    rc1 = layer1_pure_detector()
    if rc1 != 0:
        return rc1
    rc2 = await layer2_tool_wrapper()
    if rc2 != 0:
        return rc2
    rc3 = await layer3_full_agent()
    return rc3


if __name__ == "__main__":
    sys.exit(asyncio.run(main()))
