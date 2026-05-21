"""HTTP endpoint for per-agent LLM usage breakdown (Sprint 8.8).

Aggregates `audit_log` rows with event_type='llm.usage' (written by
BaseAgent._record_usage after every Anthropic Messages call) into a
per-agent cost + token summary for the current user.

Use cases:
- Dashboard widget showing "this week: Buzz $X, Aegis $Y, Vigil $Z"
- Unit economics for the first paying customer ("avg agent cost / day")
- Spotting expensive models (e.g. is Aegis worth $0.05/action?)

Endpoint:
    GET /api/usage?days=7
"""
from __future__ import annotations

import logging
from datetime import datetime, timedelta
from typing import Optional

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy import select, and_

from db.models import AuditLog, User
from db.session import AsyncSessionLocal
from dependencies import get_current_user

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/usage", tags=["usage"])


class AgentUsage(BaseModel):
    agent: str
    mascot: Optional[str] = None
    calls: int
    input_tokens: int
    output_tokens: int
    cache_creation_tokens: int
    cache_read_tokens: int
    cost_usd: float


class UsageResponse(BaseModel):
    days: int
    since: str
    total_cost_usd: float
    total_calls: int
    by_agent: list[AgentUsage]


@router.get("", response_model=UsageResponse)
async def get_usage(
    days: int = 7,
    current_user: User = Depends(get_current_user),
):
    """Return per-agent LLM cost + token breakdown for the last N days.

    Reads from audit_log (event_type='llm.usage'). Each row = one Anthropic
    Messages call; we sum tokens & cost by `payload.agent`.
    """
    if days < 1 or days > 365:
        raise HTTPException(400, "days must be 1..365")

    since = datetime.utcnow() - timedelta(days=days)
    async with AsyncSessionLocal() as session:
        stmt = (
            select(AuditLog)
            .where(
                and_(
                    AuditLog.user_id == current_user.id,
                    AuditLog.event_type == "llm.usage",
                    AuditLog.created_at >= since,
                )
            )
        )
        rows = (await session.execute(stmt)).scalars().all()

    # Aggregate in-memory — usage rows are small (one per LLM call), and
    # users have at most a few thousand per week even at heavy usage.
    buckets: dict[str, dict] = {}
    total_cost = 0.0
    total_calls = 0
    for r in rows:
        p = r.payload or {}
        if not isinstance(p, dict):
            continue
        agent = p.get("agent") or "unknown"
        b = buckets.setdefault(
            agent,
            {
                "agent": agent,
                "mascot": p.get("mascot"),
                "calls": 0,
                "input_tokens": 0,
                "output_tokens": 0,
                "cache_creation_tokens": 0,
                "cache_read_tokens": 0,
                "cost_usd": 0.0,
            },
        )
        b["calls"] += 1
        b["input_tokens"] += int(p.get("input_tokens", 0) or 0)
        b["output_tokens"] += int(p.get("output_tokens", 0) or 0)
        b["cache_creation_tokens"] += int(p.get("cache_creation_tokens", 0) or 0)
        b["cache_read_tokens"] += int(p.get("cache_read_tokens", 0) or 0)
        cost = float(p.get("cost_usd", 0.0) or 0.0)
        b["cost_usd"] += cost
        total_cost += cost
        total_calls += 1
        # Update mascot if we didn't have one (some rows might miss it)
        if not b["mascot"] and p.get("mascot"):
            b["mascot"] = p.get("mascot")

    # Round cost per agent + sort by cost descending (biggest spenders first)
    by_agent = [
        AgentUsage(**{**b, "cost_usd": round(b["cost_usd"], 4)})
        for b in buckets.values()
    ]
    by_agent.sort(key=lambda a: a.cost_usd, reverse=True)

    return UsageResponse(
        days=days,
        since=since.isoformat(),
        total_cost_usd=round(total_cost, 4),
        total_calls=total_calls,
        by_agent=by_agent,
    )
