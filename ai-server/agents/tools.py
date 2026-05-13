"""Tool implementations доступные агентам.

Каждая tool-функция — async и возвращает dict (JSON-сериализуемый).
Для записи действий и safety-проверок tools обращаются к DB и services.

Day 2: propose_* теперь персистят action в БД и возвращают action_id.
"""
from __future__ import annotations

import logging
import os
from typing import Any, Optional

from services import google_ads_client as gads
from services import audit

logger = logging.getLogger(__name__)


# ---------------------------------------------------------------------------
# Auth helper — на dev используем mock-токены, на prod подтягиваем из БД
# ---------------------------------------------------------------------------

async def _get_access_token_for(user_id: str, customer_id: Optional[str] = None) -> str:
    """Resolve access token for (user_id, customer_id). ALWAYS enforces ownership.

    Sprint 6 hardening: previously the query filtered by customer_id without checking user_id,
    which let any caller fetch any tenant's refresh_token if they knew the customer_id.
    Now both filters are always applied — without a matching (user_id, customer_id, is_active)
    row, we raise PermissionError.

    Without customer_id we fall back to the user's first active account (legacy callers).
    """
    if gads.use_mock():
        return "mock-access-token"

    from sqlalchemy import select
    from db.models import GoogleAdsAccount
    from db.session import AsyncSessionLocal

    async with AsyncSessionLocal() as session:
        query = (
            select(GoogleAdsAccount)
            .where(GoogleAdsAccount.user_id == user_id)
            .where(GoogleAdsAccount.is_active == True)
        )
        if customer_id:
            query = query.where(GoogleAdsAccount.google_customer_id == customer_id)

        result = await session.execute(query)
        conn = result.scalars().first()
        if conn is None or not conn.oauth_refresh_token:
            raise PermissionError(
                f"No active Google Ads connection for user={user_id} customer={customer_id}. "
                "User must complete OAuth flow first or does not own this customer."
            )
        return await gads.get_valid_access_token(conn.oauth_refresh_token)


# ---------------------------------------------------------------------------
# Tools — функции, которые агент будет вызывать через tool_use
# ---------------------------------------------------------------------------

async def list_campaigns_tool(customer_id: str, user_id: str = "dev") -> dict[str, Any]:
    """Список активных кампаний."""
    access_token = await _get_access_token_for(user_id, customer_id)
    campaigns = await gads.list_campaigns(access_token, customer_id)
    return {
        "customer_id": customer_id,
        "count": len(campaigns),
        "campaigns": campaigns,
    }


async def get_campaign_metrics_tool(
    customer_id: str,
    campaign_id: str,
    days: int = 7,
    user_id: str = "dev",
) -> dict[str, Any]:
    """Метрики кампании за последние N дней."""
    access_token = await _get_access_token_for(user_id, customer_id)
    metrics = await gads.get_campaign_metrics(access_token, customer_id, campaign_id, days=days)
    # Удобные derived-значения для агента
    metrics["spend_usd"] = round(metrics["spend_micros"] / 1_000_000, 2)
    metrics["avg_cpc_usd"] = round(metrics["avg_cpc_micros"] / 1_000_000, 2)
    return metrics


async def get_keyword_metrics_tool(
    customer_id: str,
    campaign_id: str,
    user_id: str = "dev",
) -> dict[str, Any]:
    """Метрики по ключевикам в кампании."""
    access_token = await _get_access_token_for(user_id, customer_id)
    keywords = await gads.get_keyword_metrics(access_token, customer_id, campaign_id)
    return {"campaign_id": campaign_id, "count": len(keywords), "keywords": keywords}


async def propose_bid_change_tool(
    customer_id: str,
    campaign_id: str,
    new_bid_usd: float,
    reasoning: str,
    confidence: float = 0.7,
    user_id: str = "dev",
) -> dict[str, Any]:
    """Предложить изменение ставки.

    Day 2: action персистится в `agent_actions` со статусом 'proposed' и
    параллельно в `audit_log`. После апрува через API будет применён.
    """
    target = {
        "customer_id": customer_id,
        "campaign_id": campaign_id,
        "new_bid_usd": new_bid_usd,
        "new_bid_micros": int(new_bid_usd * 1_000_000),
    }
    try:
        action_id = await audit.write_proposed_action(
            user_id=user_id,
            agent_type="bidding",
            action_type="update_bid",
            target=target,
            reasoning=reasoning,
            confidence=confidence,
        )
    except Exception as e:
        logger.exception("Failed to persist proposed bid change")
        return {"ok": False, "error": f"DB error: {e}"}

    proposed_action = {
        "action_id": action_id,
        "action_type": "update_bid",
        **target,
        "reasoning": reasoning,
        "confidence": confidence,
        "status": "proposed",
    }
    return {
        "ok": True,
        "action_id": action_id,
        "message": (
            f"Proposed bid update for campaign {campaign_id}: ${new_bid_usd:.2f} "
            f"(confidence {confidence:.2f}). Action ID: {action_id[:8]}... — requires approval."
        ),
        "proposed_action": proposed_action,
    }


async def propose_pause_campaign_tool(
    customer_id: str,
    campaign_id: str,
    reasoning: str,
    confidence: float = 0.7,
    user_id: str = "dev",
) -> dict[str, Any]:
    """Предложить поставить кампанию на паузу."""
    target = {"customer_id": customer_id, "campaign_id": campaign_id}
    try:
        action_id = await audit.write_proposed_action(
            user_id=user_id,
            agent_type="bidding",
            action_type="pause_campaign",
            target=target,
            reasoning=reasoning,
            confidence=confidence,
        )
    except Exception as e:
        logger.exception("Failed to persist pause proposal")
        return {"ok": False, "error": f"DB error: {e}"}

    proposed_action = {
        "action_id": action_id,
        "action_type": "pause_campaign",
        **target,
        "reasoning": reasoning,
        "confidence": confidence,
        "status": "proposed",
    }
    return {
        "ok": True,
        "action_id": action_id,
        "message": f"Proposed pausing campaign {campaign_id}. Action ID: {action_id[:8]}... — requires approval.",
        "proposed_action": proposed_action,
    }


async def check_safety_cap_tool(
    cap_type: str,
    amount: float,
    user_id: str = "dev",
) -> dict[str, Any]:
    """Заглушка safety-cap. На неделе 2 → реальная проверка из БД."""
    # Простая dev-логика
    defaults = {
        "bid_change_pct_max": float(os.getenv("SAFETY_BID_CHANGE_PCT_MAX", "30")),
        "daily_spend_pct_max": float(os.getenv("SAFETY_DAILY_SPEND_PCT_MAX", "110")),
        "actions_per_hour_max": float(os.getenv("SAFETY_ACTIONS_PER_HOUR_MAX", "10")),
    }
    cap = defaults.get(cap_type)
    if cap is None:
        return {"allowed": True, "reason": f"Unknown cap_type {cap_type} — defaulting to allow"}
    allowed = amount <= cap
    return {
        "allowed": allowed,
        "cap_type": cap_type,
        "limit": cap,
        "requested": amount,
        "reason": "ok" if allowed else f"Exceeds {cap_type} cap ({amount} > {cap})",
    }
