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


MANUAL_BID_STRATEGIES = {"MANUAL_CPC", "ENHANCED_CPC"}


async def propose_bid_change_tool(
    customer_id: str,
    campaign_id: str,
    new_bid_usd: float,
    reasoning: str,
    confidence: float = 0.7,
    bid_strategy: Optional[str] = None,
    user_id: str = "dev",
) -> dict[str, Any]:
    """Propose a CPC bid change for a campaign.

    Defense in depth: rejects with a clear error if the campaign's bid_strategy
    is not MANUAL_CPC/ENHANCED_CPC, even if the LLM ignores the prompt and tries
    to call this on a Pmax/TargetROAS/etc. campaign. The LLM is expected to pass
    the bid_strategy it observed via get_campaign_metrics.
    """
    if bid_strategy and bid_strategy not in MANUAL_BID_STRATEGIES:
        return {
            "ok": False,
            "error": (
                f"propose_bid_change is not valid for bid_strategy={bid_strategy}. "
                f"Manual CPC bid changes only apply to MANUAL_CPC or ENHANCED_CPC. "
                f"For this campaign consider: pause, or applying a Google recommendation "
                f"(TARGET_ROAS_OPT_IN, SET_TARGET_ROAS, FORECASTING_CAMPAIGN_BUDGET, etc.)."
            ),
            "rejected_reason": "incompatible_bid_strategy",
            "bid_strategy": bid_strategy,
        }

    target = {
        "customer_id": customer_id,
        "campaign_id": campaign_id,
        "new_bid_usd": new_bid_usd,
        "new_bid_micros": int(new_bid_usd * 1_000_000),
        "bid_strategy": bid_strategy,
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


async def list_recommendations_tool(
    customer_id: str,
    user_id: str = "dev",
) -> dict[str, Any]:
    """Fetch Google's own recommendations for this customer account.

    Returns a list of active (not dismissed) recommendations Google has generated
    for the account — budget changes, keyword suggestions, bidding strategy
    migrations, asset additions, etc. Agents use this to align proposals with
    Google's own signal rather than re-deriving them from raw metrics.
    """
    try:
        access_token = await _get_access_token_for(user_id, customer_id)
    except PermissionError as e:
        return {"ok": False, "error": str(e), "recommendations": []}

    recommendations = await gads.list_recommendations(access_token, customer_id)
    return {
        "ok": True,
        "customer_id": customer_id,
        "count": len(recommendations),
        "recommendations": recommendations,
    }


async def propose_apply_recommendation_tool(
    customer_id: str,
    recommendation_resource_name: str,
    recommendation_type: str,
    reasoning: str,
    confidence: float = 0.7,
    impact_summary: Optional[str] = None,
    user_id: str = "dev",
) -> dict[str, Any]:
    """Propose applying a specific Google recommendation.

    The recommendation must already exist in Google's system (fetched via
    list_recommendations_tool). This tool persists a proposed action with
    action_type='apply_recommendation' so it goes through the standard
    Aegis review + approval flow before being sent to Google Ads.
    """
    target = {
        "customer_id": customer_id,
        "recommendation_resource_name": recommendation_resource_name,
        "recommendation_type": recommendation_type,
        "impact_summary": impact_summary,
    }
    try:
        action_id = await audit.write_proposed_action(
            user_id=user_id,
            agent_type="bidding",
            action_type="apply_recommendation",
            target=target,
            reasoning=reasoning,
            confidence=confidence,
        )
    except Exception as e:
        logger.exception("Failed to persist apply_recommendation proposal")
        return {"ok": False, "error": f"DB error: {e}"}

    proposed_action = {
        "action_id": action_id,
        "action_type": "apply_recommendation",
        **target,
        "reasoning": reasoning,
        "confidence": confidence,
        "status": "proposed",
    }
    return {
        "ok": True,
        "action_id": action_id,
        "message": (
            f"Proposed applying Google recommendation {recommendation_type} "
            f"({recommendation_resource_name.split('/')[-1][:12]}). "
            f"Action ID: {action_id[:8]}... — requires approval."
        ),
        "proposed_action": proposed_action,
    }


async def list_search_terms_tool(
    customer_id: str,
    days: int = 30,
    min_cost_usd: float = 5.0,
    max_conversions: float = 0.0,
    limit: int = 50,
    user_id: str = "dev",
) -> dict[str, Any]:
    """Fetch real search queries that triggered ads — find junk-spend candidates.

    Default filter (industry-standard junk indicator): spend > $5 over 30 days
    AND zero conversions. These are prime candidates to add as negative keywords.
    """
    try:
        access_token = await _get_access_token_for(user_id, customer_id)
    except PermissionError as e:
        return {"ok": False, "error": str(e), "search_terms": []}

    items = await gads.list_search_terms(
        access_token,
        customer_id,
        days=days,
        min_cost_usd=min_cost_usd,
        max_conversions=max_conversions,
        limit=limit,
    )
    return {
        "ok": True,
        "customer_id": customer_id,
        "filter": {"days": days, "min_cost_usd": min_cost_usd, "max_conversions": max_conversions},
        "count": len(items),
        "search_terms": items,
    }


async def propose_negative_keyword_tool(
    customer_id: str,
    campaign_id: str,
    keyword_text: str,
    match_type: str,
    reasoning: str,
    confidence: float = 0.8,
    impact_summary: Optional[str] = None,
    user_id: str = "dev",
) -> dict[str, Any]:
    """Propose adding a negative keyword at campaign level.

    match_type must be EXACT / PHRASE / BROAD. EXACT is safest — blocks only
    the exact junk phrase. PHRASE/BROAD can over-block legitimate variants;
    use only with clear evidence the variants are also junk.
    """
    match_type = (match_type or "EXACT").upper()
    if match_type not in {"EXACT", "PHRASE", "BROAD"}:
        return {
            "ok": False,
            "error": f"Invalid match_type {match_type} — must be EXACT, PHRASE, or BROAD",
        }

    target = {
        "customer_id": customer_id,
        "campaign_id": campaign_id,
        "keyword_text": keyword_text,
        "match_type": match_type,
        "impact_summary": impact_summary,
    }
    try:
        action_id = await audit.write_proposed_action(
            user_id=user_id,
            agent_type="research",
            action_type="add_negative_keyword",
            target=target,
            reasoning=reasoning,
            confidence=confidence,
        )
    except Exception as e:
        logger.exception("Failed to persist negative keyword proposal")
        return {"ok": False, "error": f"DB error: {e}"}

    return {
        "ok": True,
        "action_id": action_id,
        "message": (
            f"Proposed negative keyword: '{keyword_text}' [{match_type}] on campaign {campaign_id}. "
            f"Action ID: {action_id[:8]}... — requires approval."
        ),
        "proposed_action": {
            "action_id": action_id,
            "action_type": "add_negative_keyword",
            **target,
            "reasoning": reasoning,
            "confidence": confidence,
            "status": "proposed",
        },
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
