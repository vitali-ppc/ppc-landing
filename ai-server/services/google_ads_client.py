"""Google Ads API client для B6.

Сейчас REST-based (httpx), карта от существующего main.py.
В продакшене может быть рефакторнут на официальный google-ads SDK,
но REST даёт нам гибкость и понятный контроль.

DEV-режим: если переменная GOOGLE_ADS_USE_MOCK=true, возвращает синтетику —
позволяет тестировать агентов без production token.
"""
from __future__ import annotations

import hashlib
import logging
import os
from datetime import datetime, timedelta
from typing import Any, Optional

import httpx

logger = logging.getLogger(__name__)

GOOGLE_ADS_API_BASE = "https://googleads.googleapis.com/v20"
TOKEN_CACHE_TTL_SECONDS = 3600
_token_cache: dict[str, dict[str, Any]] = {}


def use_mock() -> bool:
    return os.getenv("GOOGLE_ADS_USE_MOCK", "false").lower() in {"1", "true", "yes"}


# ---------------------------------------------------------------------------
# OAuth token management
# ---------------------------------------------------------------------------

async def refresh_access_token(refresh_token: str) -> str:
    """Обмен refresh_token на новый access_token через Google OAuth."""
    client_id = os.getenv("GOOGLE_CLIENT_ID")
    client_secret = os.getenv("GOOGLE_CLIENT_SECRET")

    if not client_id or not client_secret:
        raise RuntimeError("Google OAuth credentials not configured (GOOGLE_CLIENT_ID / GOOGLE_CLIENT_SECRET)")

    async with httpx.AsyncClient(timeout=20.0) as client:
        response = await client.post(
            "https://oauth2.googleapis.com/token",
            data={
                "client_id": client_id,
                "client_secret": client_secret,
                "refresh_token": refresh_token,
                "grant_type": "refresh_token",
            },
        )
        response.raise_for_status()
        data = response.json()
        access_token = data.get("access_token")
        if not access_token:
            raise RuntimeError("No access_token in refresh response")
        return access_token


async def exchange_code_for_tokens(code: str, redirect_uri: str) -> dict[str, Any]:
    """Initial OAuth code exchange — converts auth code (one-time) into refresh_token + access_token.

    Used in the OAuth callback flow after user authorizes our app on Google.
    Returns: {access_token, refresh_token, expires_in, scope, token_type, id_token?}.
    """
    client_id = os.getenv("GOOGLE_CLIENT_ID")
    client_secret = os.getenv("GOOGLE_CLIENT_SECRET")

    if not client_id or not client_secret:
        raise RuntimeError("Google OAuth credentials not configured")

    async with httpx.AsyncClient(timeout=20.0) as client:
        response = await client.post(
            "https://oauth2.googleapis.com/token",
            data={
                "client_id": client_id,
                "client_secret": client_secret,
                "code": code,
                "redirect_uri": redirect_uri,
                "grant_type": "authorization_code",
            },
        )
        response.raise_for_status()
        data = response.json()
        if not data.get("refresh_token"):
            # If user previously authorized without prompt=consent, Google won't return refresh_token.
            # We force prompt=consent on the auth URL to avoid this.
            raise RuntimeError(
                "No refresh_token in exchange response. "
                "Ensure auth URL uses access_type=offline AND prompt=consent."
            )
        return data


async def list_accessible_customers(refresh_token: str) -> list[str]:
    """List Google Ads customer IDs the user has access to via OAuth.

    Returns list of customer_id strings (10-digit, no dashes). The user's Google account
    may have access to multiple Ads accounts (own + MCC-managed).

    NOTE: This ALWAYS calls the real Google API regardless of GOOGLE_ADS_USE_MOCK,
    because the OAuth flow requires real customer IDs to be useful. The mock flag
    only affects campaign/metric data queries.

    See: https://developers.google.com/google-ads/api/rest/auth#listaccessiblecustomers
    """
    access_token = await refresh_access_token(refresh_token)
    async with httpx.AsyncClient(timeout=20.0) as client:
        r = await client.get(
            f"{GOOGLE_ADS_API_BASE}/customers:listAccessibleCustomers",
            headers={
                "Authorization": f"Bearer {access_token}",
                "developer-token": os.getenv("GOOGLE_ADS_DEVELOPER_TOKEN", ""),
            },
        )
        if r.status_code != 200:
            logger.warning("listAccessibleCustomers -> %s: %s", r.status_code, r.text[:300])
            r.raise_for_status()
        data = r.json()
        # Response format: {"resourceNames": ["customers/1234567890", "customers/9876543210", ...]}
        resource_names = data.get("resourceNames", []) or []
        return [rn.split("/")[-1] for rn in resource_names]


async def get_valid_access_token(refresh_token: str) -> str:
    """Кеширует access_token на 1 час по хешу refresh_token."""
    if not refresh_token:
        raise ValueError("refresh_token required")

    cache_key = hashlib.md5(refresh_token.encode()).hexdigest()
    cached = _token_cache.get(cache_key)
    if cached and (datetime.now().timestamp() - cached["timestamp"] < TOKEN_CACHE_TTL_SECONDS):
        return cached["access_token"]

    access_token = await refresh_access_token(refresh_token)
    _token_cache[cache_key] = {
        "access_token": access_token,
        "timestamp": datetime.now().timestamp(),
    }
    return access_token


def _headers(access_token: str, mcc_id: Optional[str] = None) -> dict[str, str]:
    h = {
        "Authorization": f"Bearer {access_token}",
        "developer-token": os.getenv("GOOGLE_ADS_DEVELOPER_TOKEN", ""),
    }
    mcc = mcc_id or os.getenv("GOOGLE_ADS_MCC_ID")
    if mcc:
        h["login-customer-id"] = mcc.replace("-", "")
    return h


# ---------------------------------------------------------------------------
# Account info
# ---------------------------------------------------------------------------

async def get_account_info(access_token: str, customer_id: str) -> Optional[dict[str, Any]]:
    """Returns timezone, currency and descriptiveName (user-given account label)."""
    if use_mock():
        return {
            "timezone": "Europe/Kiev",
            "currencyCode": "USD",
            "descriptiveName": f"Mock Account {customer_id}",
        }

    async with httpx.AsyncClient(timeout=20.0) as client:
        r = await client.get(
            f"{GOOGLE_ADS_API_BASE}/customers/{customer_id}",
            headers=_headers(access_token),
        )
        if r.status_code != 200:
            logger.warning("get_account_info %s -> %s: %s", customer_id, r.status_code, r.text[:200])
            return None
        data = r.json()
        return {
            "timezone": data.get("timeZone"),
            "currencyCode": data.get("currencyCode", "USD"),
            "descriptiveName": data.get("descriptiveName"),
        }


# ---------------------------------------------------------------------------
# Campaigns — READ
# ---------------------------------------------------------------------------

def _mock_campaigns() -> list[dict[str, Any]]:
    """Синтетические кампании для dev."""
    return [
        {
            "id": "100001",
            "name": "Winter Shoes Promo",
            "status": "ENABLED",
            "budget_micros": 50_000_000,  # $50/day
            "bid_strategy": "TARGET_ROAS",
        },
        {
            "id": "100002",
            "name": "Summer Sale",
            "status": "ENABLED",
            "budget_micros": 30_000_000,
            "bid_strategy": "MAXIMIZE_CONVERSIONS",
        },
        {
            "id": "100003",
            "name": "Brand Defense",
            "status": "ENABLED",
            "budget_micros": 20_000_000,
            "bid_strategy": "TARGET_IMPRESSION_SHARE",
        },
    ]


async def list_campaigns(access_token: str, customer_id: str) -> list[dict[str, Any]]:
    """Список активных кампаний для аккаунта."""
    if use_mock():
        return _mock_campaigns()

    query = """
        SELECT
          campaign.id, campaign.name, campaign.status,
          campaign_budget.amount_micros, campaign.bidding_strategy_type
        FROM campaign
        WHERE campaign.status != 'REMOVED'
    """
    return await _search_stream(access_token, customer_id, query, _campaign_row_to_dict)


def _campaign_row_to_dict(row: dict) -> dict[str, Any]:
    campaign = row.get("campaign", {})
    budget = row.get("campaignBudget", {})
    return {
        "id": campaign.get("id"),
        "name": campaign.get("name"),
        "status": campaign.get("status"),
        "budget_micros": int(budget.get("amountMicros", 0)) if budget else 0,
        "bid_strategy": campaign.get("biddingStrategyType"),
    }


# ---------------------------------------------------------------------------
# Campaign metrics — READ
# ---------------------------------------------------------------------------

def _mock_campaign_metrics(campaign_id: str, days: int) -> dict[str, Any]:
    """Синтетика — варьируем по campaign_id чтобы у Vox/Buzz было что решать.

    100001 Winter Shoes Promo  → стар-перформер (ROAS 5.88, расширять)
    100002 Summer Sale          → средний (ROAS 2.10, держать)
    100003 Brand Defense        → недокручен (ROAS 1.40, сократить или паузить)
    """
    profiles = {
        "100001": {
            "impressions": 15_000, "clicks": 305, "ctr": 0.0203,
            "spend_micros": 51_000_000, "conversions": 12,
            "conversion_value": 300.0, "roas": 5.88,
            "avg_cpc_micros": 167_213,
        },
        "100002": {
            "impressions": 22_000, "clicks": 320, "ctr": 0.0145,
            "spend_micros": 80_000_000, "conversions": 8,
            "conversion_value": 168.0, "roas": 2.10,
            "avg_cpc_micros": 250_000,
        },
        "100003": {
            "impressions": 8_000, "clicks": 80, "ctr": 0.0100,
            "spend_micros": 40_000_000, "conversions": 2,
            "conversion_value": 56.0, "roas": 1.40,
            "avg_cpc_micros": 500_000,
        },
    }
    profile = profiles.get(campaign_id, {
        "impressions": 10_000, "clicks": 200, "ctr": 0.02,
        "spend_micros": 50_000_000, "conversions": 5,
        "conversion_value": 200.0, "roas": 4.0,
        "avg_cpc_micros": 250_000,
    })
    return {"campaign_id": campaign_id, "days": days, **profile}


async def get_campaign_metrics(
    access_token: str, customer_id: str, campaign_id: str, days: int = 7
) -> dict[str, Any]:
    """Метрики кампании за последние N дней."""
    if use_mock():
        return _mock_campaign_metrics(campaign_id, days)

    end_date = datetime.utcnow().date()
    start_date = end_date - timedelta(days=days)
    query = f"""
        SELECT
          metrics.impressions, metrics.clicks, metrics.ctr,
          metrics.cost_micros, metrics.conversions, metrics.conversions_value,
          metrics.average_cpc
        FROM campaign
        WHERE campaign.id = {campaign_id}
          AND segments.date BETWEEN '{start_date}' AND '{end_date}'
    """
    rows = await _search_stream(access_token, customer_id, query, lambda r: r)
    # Aggregate
    totals = {
        "impressions": 0,
        "clicks": 0,
        "spend_micros": 0,
        "conversions": 0.0,
        "conversion_value": 0.0,
    }
    for row in rows:
        m = row.get("metrics", {})
        totals["impressions"] += int(m.get("impressions", 0))
        totals["clicks"] += int(m.get("clicks", 0))
        totals["spend_micros"] += int(m.get("costMicros", 0))
        totals["conversions"] += float(m.get("conversions", 0))
        totals["conversion_value"] += float(m.get("conversionsValue", 0))

    impressions = totals["impressions"] or 1
    spend = totals["spend_micros"] / 1_000_000 or 0.001
    return {
        "campaign_id": campaign_id,
        "days": days,
        **totals,
        "ctr": round(totals["clicks"] / impressions, 4),
        "roas": round(totals["conversion_value"] / spend, 2),
        "avg_cpc_micros": int(totals["spend_micros"] / max(totals["clicks"], 1)),
    }


async def get_keyword_metrics(
    access_token: str, customer_id: str, campaign_id: str
) -> list[dict[str, Any]]:
    """Метрики ключевиков в кампании."""
    if use_mock():
        return [
            {"keyword": "winter shoes", "match_type": "EXACT", "ctr": 0.045, "spend": 12.50, "conv": 3},
            {"keyword": "warm boots", "match_type": "PHRASE", "ctr": 0.038, "spend": 8.20, "conv": 2},
            {"keyword": "leather boots", "match_type": "BROAD", "ctr": 0.022, "spend": 14.30, "conv": 1},
        ]
    # Production query stub
    return []


# ---------------------------------------------------------------------------
# Campaigns — WRITE (требуют production token)
# ---------------------------------------------------------------------------

async def update_bid(
    access_token: str,
    customer_id: str,
    ad_group_criterion_resource: str,
    new_bid_micros: int,
    *,
    dry_run: bool = True,
) -> dict[str, Any]:
    """Обновить ставку.

    В dev (mock или dry_run=True) — возвращает имитацию.
    В prod — делает mutate-запрос к API.
    """
    if use_mock() or dry_run:
        logger.info("update_bid (dry_run) %s -> %s micros", ad_group_criterion_resource, new_bid_micros)
        return {"applied": False, "dry_run": True, "new_bid_micros": new_bid_micros}

    # Production: mutate AdGroupCriterion.cpc_bid_micros
    # см. https://developers.google.com/google-ads/api/docs/samples/update-keyword-bid
    raise NotImplementedError("Production bid update not implemented yet — будет добавлено после Google Ads token approval")


async def pause_campaign(
    access_token: str,
    customer_id: str,
    campaign_id: str,
    *,
    dry_run: bool = True,
) -> dict[str, Any]:
    """Поставить кампанию на паузу."""
    if use_mock() or dry_run:
        logger.info("pause_campaign (dry_run) %s", campaign_id)
        return {"applied": False, "dry_run": True, "campaign_id": campaign_id}

    raise NotImplementedError("Production pause not implemented yet")


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

async def _search_stream(
    access_token: str,
    customer_id: str,
    query: str,
    row_mapper,
) -> list[Any]:
    """Выполнить GAQL-запрос через searchStream endpoint."""
    url = f"{GOOGLE_ADS_API_BASE}/customers/{customer_id}/googleAds:searchStream"
    async with httpx.AsyncClient(timeout=30.0) as client:
        r = await client.post(url, headers=_headers(access_token), json={"query": query})
        if r.status_code != 200:
            logger.warning("searchStream %s -> %s: %s", customer_id, r.status_code, r.text[:300])
            return []
        data = r.json()
        # searchStream возвращает список объектов с "results"
        results: list[Any] = []
        for chunk in data if isinstance(data, list) else [data]:
            for row in chunk.get("results", []) or []:
                results.append(row_mapper(row))
        return results
