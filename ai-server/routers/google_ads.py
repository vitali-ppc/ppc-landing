"""Google Ads OAuth + connections management.

Endpoints:
- GET  /api/google-ads/oauth/start         → returns auth_url for browser redirect
- GET  /api/google-ads/oauth/callback      → Google redirects here with code; we exchange + store
- GET  /api/google-ads/accounts            → list connected accounts for user
- DELETE /api/google-ads/accounts/{id}     → disconnect (soft-delete is_active=False)

Flow:
1. Frontend: user clicks "Connect Google Ads"
2. Frontend calls GET /api/google-ads/oauth/start → gets {auth_url}
3. Frontend: window.location.href = auth_url (browser → Google)
4. User authorizes on Google
5. Google redirects to GET /api/google-ads/oauth/callback?code=...&state=...
6. Backend: exchange code → refresh_token; list customer accounts; store in DB
7. Backend redirects to https://www.kampaio.com/b6?connected=N (where N = accounts added)
"""
from __future__ import annotations

import logging
import os
import secrets
from datetime import datetime
from typing import Optional

import httpx
from fastapi import APIRouter, Depends, HTTPException, Query
from fastapi.responses import RedirectResponse
from pydantic import BaseModel
from sqlalchemy import select

from db.models import GoogleAdsAccount, User
from db.session import AsyncSessionLocal
from dependencies import get_current_user
from services.google_ads_client import (
    exchange_code_for_tokens,
    get_account_info,
    list_accessible_customers,
    refresh_access_token,
)

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/google-ads", tags=["google-ads"])

# In-memory state store for OAuth CSRF tokens. Keyed by state token, value is user_id.
# TTL handled manually — entries cleaned on use or expire after 10 min.
# For prod scale we'd move this to Redis, but for single-server B6 this is fine.
_oauth_state_store: dict[str, tuple[str, datetime]] = {}
_OAUTH_STATE_TTL_SECONDS = 600


def _get_backend_base_url() -> str:
    """Returns the backend's public base URL (used for redirect_uri)."""
    # Must EXACTLY match a URI registered in Google Cloud Console OAuth client.
    return os.getenv("B6_BACKEND_BASE_URL", "https://api.kampaio.com")


def _get_frontend_base_url() -> str:
    """Returns the frontend URL (where we redirect after OAuth completes)."""
    return os.getenv("B6_FRONTEND_BASE_URL", "https://www.kampaio.com")


def _redirect_uri() -> str:
    """OAuth callback URI — must be whitelisted in Google Cloud Console."""
    return f"{_get_backend_base_url()}/api/google-ads/oauth/callback"


def _cleanup_expired_states() -> None:
    """Remove expired entries from in-memory state store."""
    now = datetime.utcnow()
    expired = [
        state for state, (_, created) in _oauth_state_store.items()
        if (now - created).total_seconds() > _OAUTH_STATE_TTL_SECONDS
    ]
    for state in expired:
        _oauth_state_store.pop(state, None)


# ─────────────────────────────────────────────────────────────────────────────
# Models
# ─────────────────────────────────────────────────────────────────────────────

class OAuthStartResponse(BaseModel):
    auth_url: str
    state: str


class ConnectedAccount(BaseModel):
    id: str
    google_customer_id: str
    descriptive_name: Optional[str] = None
    timezone: Optional[str] = None
    currency: Optional[str] = None
    is_active: bool
    connected_at: str


# ─────────────────────────────────────────────────────────────────────────────
# Endpoints
# ─────────────────────────────────────────────────────────────────────────────

@router.get("/oauth/start", response_model=OAuthStartResponse)
async def oauth_start(current_user: User = Depends(get_current_user)):
    """Generate the Google OAuth URL.

    Frontend should redirect the browser to the returned auth_url. The user authorizes
    on Google, then Google redirects back to /api/google-ads/oauth/callback.

    Uses access_type=offline and prompt=consent to ensure refresh_token is returned
    (Google omits it on re-authorization without prompt=consent).
    """
    client_id = os.getenv("GOOGLE_CLIENT_ID")
    if not client_id:
        raise HTTPException(500, "GOOGLE_CLIENT_ID not configured")

    user_id = current_user.id
    _cleanup_expired_states()
    state = secrets.token_urlsafe(32)
    _oauth_state_store[state] = (user_id, datetime.utcnow())

    # Scopes:
    # - adwords: full Google Ads read+write (needed for Buzz/Aegis/etc operations)
    # - userinfo.email: confirms which Google account user logged in with (nice-to-have)
    scopes = " ".join([
        "https://www.googleapis.com/auth/adwords",
        "https://www.googleapis.com/auth/userinfo.email",
    ])

    params = {
        "client_id": client_id,
        "redirect_uri": _redirect_uri(),
        "response_type": "code",
        "scope": scopes,
        "access_type": "offline",
        "prompt": "consent",
        "state": state,
        "include_granted_scopes": "true",
    }
    query_string = "&".join(f"{k}={httpx.QueryParams({k: v})[k]}" for k, v in params.items())
    auth_url = f"https://accounts.google.com/o/oauth2/v2/auth?{query_string}"

    logger.info("OAuth start for user=%s, state=%s...", user_id, state[:8])
    return OAuthStartResponse(auth_url=auth_url, state=state)


@router.get("/oauth/callback")
async def oauth_callback(
    code: Optional[str] = Query(None),
    state: Optional[str] = Query(None),
    error: Optional[str] = Query(None),
):
    """Handle the redirect from Google after user authorizes (or denies).

    On success: exchange code for refresh_token → list accessible customers →
    store each as a GoogleAdsAccount → redirect to frontend.

    On error: redirect to frontend with error indicator.
    """
    frontend_base = _get_frontend_base_url()

    if error:
        logger.warning("OAuth error from Google: %s", error)
        return RedirectResponse(f"{frontend_base}/b6?google_ads_error={error}")

    if not code or not state:
        return RedirectResponse(f"{frontend_base}/b6?google_ads_error=missing_params")

    # Validate state
    _cleanup_expired_states()
    state_entry = _oauth_state_store.pop(state, None)
    if state_entry is None:
        logger.warning("Invalid or expired OAuth state: %s...", state[:8])
        return RedirectResponse(f"{frontend_base}/b6?google_ads_error=invalid_state")
    user_id, _ = state_entry

    # Exchange code for tokens
    try:
        tokens = await exchange_code_for_tokens(code, _redirect_uri())
    except Exception as e:
        logger.exception("Failed to exchange code for tokens")
        return RedirectResponse(f"{frontend_base}/b6?google_ads_error=token_exchange_failed")

    refresh_token = tokens["refresh_token"]

    # List accessible Google Ads accounts
    try:
        customer_ids = await list_accessible_customers(refresh_token)
    except Exception as e:
        logger.exception("Failed to list accessible customers")
        return RedirectResponse(f"{frontend_base}/b6?google_ads_error=list_customers_failed")

    if not customer_ids:
        logger.warning("No accessible Google Ads accounts for user %s", user_id)
        return RedirectResponse(f"{frontend_base}/b6?google_ads_error=no_accounts")

    # Store each connection (or update existing). Fetch timezone/currency/name where possible.
    added = 0
    updated = 0
    async with AsyncSessionLocal() as session:
        for customer_id in customer_ids:
            # Try to fetch account info; tolerate failures (e.g. MCC accounts without direct access).
            tz, curr, descriptive_name = None, None, None
            try:
                from services.google_ads_client import get_valid_access_token
                access_token = await get_valid_access_token(refresh_token)
                info = await get_account_info(access_token, customer_id)
                if info:
                    tz = info.get("timezone")
                    curr = info.get("currencyCode")
                    descriptive_name = info.get("descriptiveName")
            except Exception:
                logger.warning("Could not fetch account info for %s (may be MCC or no-access)", customer_id)

            existing_q = await session.execute(
                select(GoogleAdsAccount).where(
                    GoogleAdsAccount.user_id == user_id,
                    GoogleAdsAccount.google_customer_id == customer_id,
                )
            )
            existing = existing_q.scalar_one_or_none()
            if existing:
                existing.oauth_refresh_token = refresh_token
                existing.timezone = tz or existing.timezone
                existing.currency = curr or existing.currency
                existing.descriptive_name = descriptive_name or existing.descriptive_name
                existing.is_active = True
                updated += 1
            else:
                session.add(GoogleAdsAccount(
                    user_id=user_id,
                    google_customer_id=customer_id,
                    oauth_refresh_token=refresh_token,
                    timezone=tz,
                    currency=curr,
                    descriptive_name=descriptive_name,
                    is_active=True,
                ))
                added += 1
        await session.commit()

    logger.info("OAuth callback success: user=%s, added=%d, updated=%d", user_id, added, updated)
    return RedirectResponse(
        f"{frontend_base}/b6?google_ads_connected={added + updated}&added={added}&updated={updated}"
    )


@router.get("/accounts", response_model=list[ConnectedAccount])
async def list_accounts(current_user: User = Depends(get_current_user)):
    """List all Google Ads accounts connected by the current user."""
    async with AsyncSessionLocal() as session:
        result = await session.execute(
            select(GoogleAdsAccount)
            .where(GoogleAdsAccount.user_id == current_user.id)
            .order_by(GoogleAdsAccount.connected_at.desc())
        )
        accounts = result.scalars().all()
        return [
            ConnectedAccount(
                id=acc.id,
                google_customer_id=acc.google_customer_id,
                descriptive_name=acc.descriptive_name,
                timezone=acc.timezone,
                currency=acc.currency,
                is_active=acc.is_active,
                connected_at=acc.connected_at.isoformat(),
            )
            for acc in accounts
        ]


@router.delete("/accounts/{account_id}")
async def disconnect_account(account_id: str, current_user: User = Depends(get_current_user)):
    """Soft-disconnect: set is_active=False. Does not revoke OAuth at Google
    (user can do that on https://myaccount.google.com/permissions).
    """
    async with AsyncSessionLocal() as session:
        acc = await session.get(GoogleAdsAccount, account_id)
        if acc is None or acc.user_id != current_user.id:
            raise HTTPException(404, "Account not found")
        acc.is_active = False
        await session.commit()
        return {"success": True, "google_customer_id": acc.google_customer_id}
