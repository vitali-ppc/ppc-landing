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

GOOGLE_ADS_API_BASE = "https://googleads.googleapis.com/v24"
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
    """Returns timezone, currency and descriptiveName via GAQL search.

    Google Ads API doesn't expose a plain GET /customers/{id}; we have to query
    the customer resource via searchStream. Returns None on any failure
    (MCC account / no-access / API error).
    """
    if use_mock():
        return {
            "timezone": "Europe/Kiev",
            "currencyCode": "USD",
            "descriptiveName": f"Mock Account {customer_id}",
        }

    query = (
        "SELECT customer.descriptive_name, customer.currency_code, "
        "customer.time_zone, customer.manager FROM customer LIMIT 1"
    )
    url = f"{GOOGLE_ADS_API_BASE}/customers/{customer_id}/googleAds:searchStream"
    async with httpx.AsyncClient(timeout=20.0) as client:
        r = await client.post(url, headers=_headers(access_token), json={"query": query})
        if r.status_code != 200:
            logger.warning("get_account_info %s -> %s: %s", customer_id, r.status_code, r.text[:200])
            return None
        data = r.json()

    # searchStream returns a list of chunks; each chunk has a "results" array.
    chunks = data if isinstance(data, list) else [data]
    for chunk in chunks:
        for row in chunk.get("results", []) or []:
            customer = row.get("customer", {}) if isinstance(row, dict) else {}
            return {
                "timezone": customer.get("timeZone"),
                "currencyCode": customer.get("currencyCode", "USD"),
                "descriptiveName": customer.get("descriptiveName"),
                "isManager": customer.get("manager", False),
            }
    return None


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
# Recommendations (v24 — Google's own AI suggestions for the account)
# ---------------------------------------------------------------------------

# Subset of Recommendation.type enum values we actively surface to agents.
# Full list at https://developers.google.com/google-ads/api/reference/rpc/v24/
# RecommendationTypeEnum.RecommendationType — there are 60+ types; we filter to
# the ones with clear automate-apply value for SMB / e-com clients.
RECOMMENDATION_TYPES_PRIORITY = {
    # Budget — high value, low risk
    "CAMPAIGN_BUDGET": "Increase a budget-constrained campaign's daily budget",
    "MOVE_UNUSED_BUDGET": "Reallocate unused budget between campaigns",
    "MARGINAL_ROI_CAMPAIGN_BUDGET": "Increase budget where marginal ROI is positive",
    "FORECASTING_CAMPAIGN_BUDGET": "Raise budget before a forecasted spike",
    # Bidding strategy migrations — strategic
    "TARGET_CPA_OPT_IN": "Switch to Target CPA bidding",
    "TARGET_ROAS_OPT_IN": "Switch to Target ROAS bidding",
    "MAXIMIZE_CONVERSIONS_OPT_IN": "Switch to Maximize Conversions",
    "MAXIMIZE_CONVERSION_VALUE_OPT_IN": "Switch to Maximize Conversion Value",
    "MAXIMIZE_CLICKS_OPT_IN": "Switch to Maximize Clicks",
    # Content — quality improvements
    "KEYWORD": "Add a suggested keyword to an ad group",
    "TEXT_AD": "Add a new text ad based on best-performing assets",
    "RESPONSIVE_SEARCH_AD": "Add a responsive search ad",
    "RESPONSIVE_SEARCH_AD_ASSET": "Add new headlines/descriptions to an existing RSA",
    # Pmax migrations
    "PERFORMANCE_MAX_OPT_IN": "Try Performance Max for this account",
    "IMPROVE_PERFORMANCE_MAX_AD_STRENGTH": "Improve PMax ad strength",
    "UPGRADE_SMART_SHOPPING_CAMPAIGN_TO_PERFORMANCE_MAX": "Upgrade Smart Shopping to Pmax",
    # Assets
    "SITELINK_ASSET": "Add sitelink assets",
    "CALLOUT_ASSET": "Add callout assets",
    "CALL_ASSET": "Add a call asset",
    "LEAD_FORM_ASSET": "Add a lead form asset",
}


async def list_recommendations(access_token: str, customer_id: str) -> list[dict[str, Any]]:
    """Fetch active (not dismissed, not yet applied) recommendations from Google for a customer.

    Returns a normalized list of:
        {
          "resource_name": "customers/{cid}/recommendations/{id}",
          "type":          "CAMPAIGN_BUDGET" | "KEYWORD" | ...,
          "campaign":      "customers/{cid}/campaigns/{cid}" | None,
          "ad_group":      "customers/{cid}/adGroups/{agid}" | None,
          "impact_base":   {"impressions": ..., "clicks": ..., "cost_micros": ..., "conversions": ...},
          "impact_potential": {... same fields ...},
          "type_specific": <nested dict for type — e.g. keyword_recommendation, campaign_budget_recommendation>,
        }
    """
    if use_mock():
        # Synthetic recommendations so agents can be smoke-tested in dev.
        return [
            {
                "resource_name": f"customers/{customer_id}/recommendations/mock-budget-1",
                "type": "CAMPAIGN_BUDGET",
                "campaign": f"customers/{customer_id}/campaigns/100001",
                "ad_group": None,
                "impact_base": {"clicks": 120, "impressions": 4500, "cost_micros": 12_000_000, "conversions": 5.0},
                "impact_potential": {"clicks": 195, "impressions": 7200, "cost_micros": 19_000_000, "conversions": 8.0},
                "type_specific": {
                    "campaign_budget_recommendation": {
                        "current_budget_amount_micros": 20_000_000,
                        "recommended_budget_amount_micros": 32_000_000,
                    }
                },
            },
            {
                "resource_name": f"customers/{customer_id}/recommendations/mock-keyword-1",
                "type": "KEYWORD",
                "campaign": f"customers/{customer_id}/campaigns/100002",
                "ad_group": f"customers/{customer_id}/adGroups/200001",
                "impact_base": {"clicks": 0, "impressions": 0, "cost_micros": 0, "conversions": 0.0},
                "impact_potential": {"clicks": 35, "impressions": 1200, "cost_micros": 4_500_000, "conversions": 1.5},
                "type_specific": {"keyword_recommendation": {"keyword": {"text": "buy goodevas online", "match_type": "PHRASE"}}},
            },
        ]

    # GAQL v24 quirks (observed empirically on goodevas.it 2026-05-19):
    # - `WHERE recommendation.dismissed = FALSE` returns 0 rows even when
    #   active recommendations exist. Filter dismissed in Python instead.
    # - `recommendation.impact.base_metrics.*` nested field selects raise
    #   INVALID_ARGUMENT. Impact data has to be fetched per-row separately or
    #   parsed from the resource fetched in full. For now we surface type +
    #   target only — impact is reconstructed in agent prompts from context.
    query = (
        "SELECT "
        "recommendation.resource_name, "
        "recommendation.type, "
        "recommendation.campaign, "
        "recommendation.ad_group, "
        "recommendation.dismissed "
        "FROM recommendation"
    )
    url = f"{GOOGLE_ADS_API_BASE}/customers/{customer_id}/googleAds:searchStream"
    async with httpx.AsyncClient(timeout=30.0) as client:
        r = await client.post(url, headers=_headers(access_token), json={"query": query})
    if r.status_code != 200:
        logger.warning("list_recommendations %s -> %s: %s", customer_id, r.status_code, r.text[:300])
        return []
    data = r.json()
    chunks = data if isinstance(data, list) else [data]

    out: list[dict[str, Any]] = []
    for chunk in chunks:
        for row in chunk.get("results", []) or []:
            rec = row.get("recommendation", {}) or {}
            if rec.get("dismissed") is True:
                # Skip dismissed — Python-side because GAQL WHERE doesn't work here.
                continue
            out.append(
                {
                    "resource_name": rec.get("resourceName"),
                    "type": rec.get("type"),
                    "campaign": rec.get("campaign"),
                    "ad_group": rec.get("adGroup"),
                    # Impact metrics omitted: GAQL v24 rejects nested
                    # `recommendation.impact.*` field selection. Agents
                    # operate on type + target context for now.
                    "impact_base": {},
                    "impact_potential": {},
                    "type_specific": {},
                }
            )
    return out


async def apply_recommendation(
    access_token: str,
    customer_id: str,
    recommendation_resource_name: str,
    *,
    dry_run: bool = True,
) -> dict[str, Any]:
    """Apply a Google-suggested recommendation. Returns audit-friendly dict.

    Real apply uses RecommendationService.ApplyRecommendation via REST:
        POST customers/{cid}/recommendations:apply
        body: {operations: [{resource_name: "..."}]}

    Some recommendation types accept type-specific parameters (e.g. a custom
    budget amount). For Sprint 7 we always apply with Google's suggested
    parameters (no override) — that's the safest baseline.
    """
    if use_mock() or dry_run:
        logger.info(
            "apply_recommendation (dry_run=%s) %s/%s",
            dry_run, customer_id, recommendation_resource_name,
        )
        return {
            "applied": False,
            "dry_run": True,
            "customer_id": customer_id,
            "recommendation": recommendation_resource_name,
        }

    url = f"{GOOGLE_ADS_API_BASE}/customers/{customer_id}/recommendations:apply"
    body = {
        "operations": [{"resourceName": recommendation_resource_name}],
        "partialFailure": False,
    }
    async with httpx.AsyncClient(timeout=30.0) as client:
        r = await client.post(url, headers=_headers(access_token), json=body)
    if r.status_code != 200:
        logger.error(
            "apply_recommendation %s -> %s: %s",
            recommendation_resource_name, r.status_code, r.text[:500],
        )
        raise RuntimeError(f"Google Ads apply_recommendation failed: {r.status_code} {r.text[:200]}")

    response = r.json()
    logger.info("apply_recommendation applied %s", recommendation_resource_name)
    return {
        "applied": True,
        "dry_run": False,
        "customer_id": customer_id,
        "recommendation": recommendation_resource_name,
        "google_ads_response": response,
    }


async def dismiss_recommendation(
    access_token: str, customer_id: str, recommendation_resource_name: str
) -> dict[str, Any]:
    """Mark a Google recommendation as dismissed (won't show up again until Google re-suggests).

    Use when the user rejects a recommendation we surfaced via Buzz/Vox — keeps
    Google's surface in sync with our DB so the same suggestion doesn't loop.
    """
    if use_mock():
        return {"dismissed": True, "dry_run": True, "recommendation": recommendation_resource_name}

    url = f"{GOOGLE_ADS_API_BASE}/customers/{customer_id}/recommendations:dismiss"
    body = {"operations": [{"resourceName": recommendation_resource_name}]}
    async with httpx.AsyncClient(timeout=20.0) as client:
        r = await client.post(url, headers=_headers(access_token), json=body)
    if r.status_code != 200:
        logger.warning(
            "dismiss_recommendation %s -> %s: %s",
            recommendation_resource_name, r.status_code, r.text[:200],
        )
        return {"dismissed": False, "error": r.text[:200]}
    return {"dismissed": True, "recommendation": recommendation_resource_name}


# ---------------------------------------------------------------------------
# Search Terms — find junk queries to add as negative keywords (Phase 3)
# ---------------------------------------------------------------------------

async def list_search_terms(
    access_token: str,
    customer_id: str,
    *,
    days: int = 30,
    min_cost_usd: float = 5.0,
    max_conversions: float = 0.0,
    limit: int = 50,
) -> list[dict[str, Any]]:
    """Find search queries that triggered ads but drained budget with no return.

    Default filter (junk indicator): spend > $5 over 30 days AND conversions == 0.
    These are prime candidates for negative-keyword cleanup.

    Returns list of:
        {
          "search_term": "how to fix broken shoes",
          "campaign_id": "22932954882",
          "ad_group_id": "...",
          "ad_group_resource": "customers/.../adGroups/...",
          "clicks": 12,
          "impressions": 340,
          "cost_micros": 7_500_000,   # $7.50
          "cost_usd": 7.50,
          "conversions": 0.0,
          "status": "NONE" | "ADDED" | "EXCLUDED",
        }
    """
    if use_mock():
        return [
            {
                "search_term": "how to fix broken shoes",
                "campaign_id": "100001",
                "ad_group_id": "200001",
                "ad_group_resource": f"customers/{customer_id}/adGroups/200001",
                "clicks": 12,
                "impressions": 340,
                "cost_micros": 7_500_000,
                "cost_usd": 7.5,
                "conversions": 0.0,
                "status": "NONE",
            },
            {
                "search_term": "ремонт обуви бесплатно",
                "campaign_id": "100002",
                "ad_group_id": "200002",
                "ad_group_resource": f"customers/{customer_id}/adGroups/200002",
                "clicks": 8,
                "impressions": 220,
                "cost_micros": 6_200_000,
                "cost_usd": 6.2,
                "conversions": 0.0,
                "status": "NONE",
            },
        ]

    min_cost_micros = int(min_cost_usd * 1_000_000)
    # Date range token in GAQL — LAST_7_DAYS / LAST_30_DAYS / LAST_90_DAYS
    if days <= 7:
        date_range = "LAST_7_DAYS"
    elif days <= 30:
        date_range = "LAST_30_DAYS"
    else:
        date_range = "LAST_90_DAYS"

    query = (
        "SELECT "
        "search_term_view.search_term, "
        "search_term_view.status, "
        "search_term_view.ad_group, "
        "campaign.id, "
        "ad_group.id, "
        "metrics.clicks, "
        "metrics.impressions, "
        "metrics.cost_micros, "
        "metrics.conversions "
        "FROM search_term_view "
        f"WHERE segments.date DURING {date_range} "
        f"AND metrics.cost_micros > {min_cost_micros} "
        f"AND metrics.conversions <= {max_conversions} "
        "AND search_term_view.status != 'EXCLUDED' "
        "ORDER BY metrics.cost_micros DESC "
        f"LIMIT {limit}"
    )

    url = f"{GOOGLE_ADS_API_BASE}/customers/{customer_id}/googleAds:searchStream"
    async with httpx.AsyncClient(timeout=30.0) as client:
        r = await client.post(url, headers=_headers(access_token), json={"query": query})
    if r.status_code != 200:
        logger.warning("list_search_terms %s -> %s: %s", customer_id, r.status_code, r.text[:300])
        return []

    data = r.json()
    chunks = data if isinstance(data, list) else [data]
    out: list[dict[str, Any]] = []
    for chunk in chunks:
        for row in chunk.get("results", []) or []:
            stv = row.get("searchTermView", {}) or {}
            cmp = row.get("campaign", {}) or {}
            ag = row.get("adGroup", {}) or {}
            m = row.get("metrics", {}) or {}
            cost_micros = int(m.get("costMicros") or 0)
            out.append(
                {
                    "search_term": stv.get("searchTerm"),
                    "campaign_id": cmp.get("id"),
                    "ad_group_id": ag.get("id"),
                    "ad_group_resource": stv.get("adGroup"),
                    "clicks": int(m.get("clicks") or 0),
                    "impressions": int(m.get("impressions") or 0),
                    "cost_micros": cost_micros,
                    "cost_usd": round(cost_micros / 1_000_000, 2),
                    "conversions": float(m.get("conversions") or 0.0),
                    "status": stv.get("status"),
                }
            )
    return out


# Allowed Google Ads keyword match types for negative criteria.
NEGATIVE_KEYWORD_MATCH_TYPES = {"BROAD", "PHRASE", "EXACT"}


async def add_negative_keyword(
    access_token: str,
    customer_id: str,
    campaign_id: str,
    keyword_text: str,
    match_type: str = "EXACT",
    *,
    dry_run: bool = True,
) -> dict[str, Any]:
    """Add a negative keyword at the campaign level.

    Uses customers/{cid}/campaignCriteria:mutate. Campaign-level negative is
    safer than ad-group-level for SMB clients — it blocks the term across
    the whole campaign so the same junk doesn't reappear in another ad group.

    EXACT match by default — block only the exact phrase. PHRASE/BROAD are
    available but riskier (can over-block legitimate variants).
    """
    if match_type not in NEGATIVE_KEYWORD_MATCH_TYPES:
        raise ValueError(f"Invalid match_type {match_type}; must be one of {NEGATIVE_KEYWORD_MATCH_TYPES}")

    if use_mock() or dry_run:
        logger.info(
            "add_negative_keyword (dry_run=%s) %s/%s '%s' [%s]",
            dry_run, customer_id, campaign_id, keyword_text, match_type,
        )
        return {
            "applied": False,
            "dry_run": True,
            "customer_id": customer_id,
            "campaign_id": campaign_id,
            "keyword": keyword_text,
            "match_type": match_type,
        }

    url = f"{GOOGLE_ADS_API_BASE}/customers/{customer_id}/campaignCriteria:mutate"
    body = {
        "operations": [
            {
                "create": {
                    "campaign": f"customers/{customer_id}/campaigns/{campaign_id}",
                    "negative": True,
                    "keyword": {"text": keyword_text, "matchType": match_type},
                }
            }
        ],
        "partialFailure": False,
        "validateOnly": False,
    }
    async with httpx.AsyncClient(timeout=30.0) as client:
        r = await client.post(url, headers=_headers(access_token), json=body)
    if r.status_code != 200:
        logger.error(
            "add_negative_keyword %s/%s '%s' -> %s: %s",
            customer_id, campaign_id, keyword_text, r.status_code, r.text[:500],
        )
        raise RuntimeError(f"Google Ads add_negative_keyword failed: {r.status_code} {r.text[:200]}")

    response = r.json()
    logger.info("add_negative_keyword applied %s/%s '%s'", customer_id, campaign_id, keyword_text)
    return {
        "applied": True,
        "dry_run": False,
        "customer_id": customer_id,
        "campaign_id": campaign_id,
        "keyword": keyword_text,
        "match_type": match_type,
        "google_ads_response": response,
    }


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
    """Update CPC bid on an ad group criterion (keyword-level).

    NOTE: Sprint 7 ships pause_campaign with real apply. update_bid real apply
    is deferred to Sprint 7.5 because the current Buzz proposal model passes
    campaign_id rather than ad_group_criterion resource_name — needs a model
    refactor on the agent side first.
    """
    if use_mock() or dry_run:
        logger.info("update_bid (dry_run) %s -> %s micros", ad_group_criterion_resource, new_bid_micros)
        return {"applied": False, "dry_run": True, "new_bid_micros": new_bid_micros}

    raise NotImplementedError(
        "Real bid update requires per-keyword ad_group_criterion resource name. "
        "Buzz currently proposes at campaign level — refactor pending (Sprint 7.5)."
    )


async def get_campaign_status(access_token: str, customer_id: str, campaign_id: str) -> Optional[str]:
    """Return current campaign status (ENABLED / PAUSED / REMOVED) or None on failure.

    Used by pause_campaign to capture before_state before applying changes.
    """
    if use_mock():
        return "ENABLED"
    query = (
        f"SELECT campaign.status FROM campaign "
        f"WHERE campaign.id = {campaign_id} LIMIT 1"
    )
    url = f"{GOOGLE_ADS_API_BASE}/customers/{customer_id}/googleAds:searchStream"
    async with httpx.AsyncClient(timeout=20.0) as client:
        r = await client.post(url, headers=_headers(access_token), json={"query": query})
        if r.status_code != 200:
            logger.warning("get_campaign_status %s/%s -> %s: %s", customer_id, campaign_id, r.status_code, r.text[:200])
            return None
        data = r.json()
    chunks = data if isinstance(data, list) else [data]
    for chunk in chunks:
        for row in chunk.get("results", []) or []:
            return (row.get("campaign", {}) or {}).get("status")
    return None


async def pause_campaign(
    access_token: str,
    customer_id: str,
    campaign_id: str,
    *,
    dry_run: bool = True,
) -> dict[str, Any]:
    """Pause a Google Ads campaign.

    Returns a structured dict with the before/after state and a `dry_run` flag
    so the caller can persist it as audit. Raises on API errors (caller logs
    and stores as 'failed' status).
    """
    if use_mock() or dry_run:
        logger.info("pause_campaign (dry_run=%s) %s/%s", dry_run, customer_id, campaign_id)
        return {
            "applied": False,
            "dry_run": True,
            "customer_id": customer_id,
            "campaign_id": campaign_id,
            "before_status": None,
            "after_status": "PAUSED",
        }

    # Real apply path
    before_status = await get_campaign_status(access_token, customer_id, campaign_id)
    if before_status == "PAUSED":
        return {
            "applied": False,
            "noop": True,
            "reason": "Campaign already PAUSED",
            "customer_id": customer_id,
            "campaign_id": campaign_id,
            "before_status": before_status,
            "after_status": before_status,
        }
    if before_status == "REMOVED":
        raise RuntimeError(f"Campaign {campaign_id} is REMOVED — cannot pause")

    resource_name = f"customers/{customer_id}/campaigns/{campaign_id}"
    url = f"{GOOGLE_ADS_API_BASE}/customers/{customer_id}/campaigns:mutate"
    body = {
        "operations": [
            {
                "update": {
                    "resourceName": resource_name,
                    "status": "PAUSED",
                },
                "updateMask": "status",
            }
        ],
        "partialFailure": False,
        "validateOnly": False,
    }

    async with httpx.AsyncClient(timeout=30.0) as client:
        r = await client.post(url, headers=_headers(access_token), json=body)

    if r.status_code != 200:
        logger.error(
            "pause_campaign %s/%s -> %s: %s",
            customer_id, campaign_id, r.status_code, r.text[:500],
        )
        raise RuntimeError(f"Google Ads mutate failed: {r.status_code} {r.text[:200]}")

    response = r.json()
    logger.info("pause_campaign applied %s/%s (before=%s)", customer_id, campaign_id, before_status)
    return {
        "applied": True,
        "dry_run": False,
        "customer_id": customer_id,
        "campaign_id": campaign_id,
        "before_status": before_status,
        "after_status": "PAUSED",
        "google_ads_response": response,
    }


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
