"""HTTP endpoints для Google Ads кампаний.

Это «прокси» к google_ads_client с кешированием и mock-режимом.
Frontend дёргает /api/campaigns вместо хардкодить данные в UI.
"""
from __future__ import annotations

import logging
import os
import time
from typing import Optional

from fastapi import APIRouter, HTTPException, Query

from services import google_ads_client as gads

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/campaigns", tags=["campaigns"])


# Простой in-memory кеш на 30 секунд (для dev — не Redis)
_cache: dict[str, tuple[float, object]] = {}
CACHE_TTL = 30.0


def _cache_get(key: str):
    v = _cache.get(key)
    if v and (time.time() - v[0] < CACHE_TTL):
        return v[1]
    return None


def _cache_set(key: str, value):
    _cache[key] = (time.time(), value)


async def _get_access_token() -> str:
    """В dev/mock — фейковый токен. В prod — из БД по user_id."""
    if gads.use_mock():
        return "mock-access-token"
    refresh = os.getenv("DEV_REFRESH_TOKEN", "")
    if not refresh:
        raise HTTPException(503, "Google Ads not configured. Set GOOGLE_ADS_USE_MOCK=true for dev.")
    return await gads.get_valid_access_token(refresh)


@router.get("")
async def list_campaigns_endpoint(
    customer_id: str = Query(..., description="Google Ads customer ID без дефисов"),
    include_metrics: bool = Query(True, description="Подмешать 7-дневные метрики"),
    days: int = Query(7, ge=1, le=90),
):
    """Список активных кампаний клиента с опциональными метриками."""
    cache_key = f"list:{customer_id}:m={include_metrics}:d={days}"
    cached = _cache_get(cache_key)
    if cached is not None:
        return cached

    access_token = await _get_access_token()
    campaigns = await gads.list_campaigns(access_token, customer_id)

    if include_metrics:
        for c in campaigns:
            try:
                m = await gads.get_campaign_metrics(access_token, customer_id, str(c["id"]), days=days)
                c["roas"] = m.get("roas")
                c["ctr"] = m.get("ctr")
                c["spend_usd"] = round(m.get("spend_micros", 0) / 1_000_000, 2)
                c["conversions"] = m.get("conversions")
            except Exception as e:
                logger.warning("Failed to fetch metrics for campaign %s: %s", c.get("id"), e)
                c["metrics_error"] = str(e)

    response = {
        "customer_id": customer_id,
        "count": len(campaigns),
        "campaigns": campaigns,
        "cached_for_seconds": CACHE_TTL,
    }
    _cache_set(cache_key, response)
    return response


@router.get("/{campaign_id}/metrics")
async def get_campaign_metrics_endpoint(
    customer_id: str = Query(..., description="Google Ads customer ID"),
    campaign_id: str = "",  # path param
    days: int = Query(7, ge=1, le=90),
):
    """Подробные метрики одной кампании."""
    if not campaign_id:
        raise HTTPException(400, "campaign_id required")
    access_token = await _get_access_token()
    try:
        metrics = await gads.get_campaign_metrics(access_token, customer_id, campaign_id, days=days)
        metrics["spend_usd"] = round(metrics["spend_micros"] / 1_000_000, 2)
        metrics["avg_cpc_usd"] = round(metrics["avg_cpc_micros"] / 1_000_000, 2)
        return metrics
    except Exception as e:
        raise HTTPException(500, f"Failed to fetch metrics: {e}")


@router.delete("/cache")
async def clear_cache():
    """Очистить кеш кампаний (для разработки)."""
    n = len(_cache)
    _cache.clear()
    return {"cleared": n}
