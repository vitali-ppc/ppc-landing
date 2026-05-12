"""Internal endpoints — для server-to-server вызовов (frontend → backend).

Stripe webhook handler в Next.js шлёт сюда события для синхронизации БД.

Production: endpoint должен быть защищён internal-secret token'ом (не открыт наружу).
"""
from __future__ import annotations

import logging
import os
from typing import Optional

from fastapi import APIRouter, Header, HTTPException
from pydantic import BaseModel
from sqlalchemy import select

from db.models import User
from db.session import AsyncSessionLocal

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/internal", tags=["internal"])

INTERNAL_SECRET = os.getenv("B6_INTERNAL_SECRET", "")


class StripeSync(BaseModel):
    event: str  # checkout_completed | subscription_updated | subscription_cancelled
    email: Optional[str] = None
    stripe_customer_id: Optional[str] = None
    stripe_subscription_id: Optional[str] = None
    status: Optional[str] = None
    tier: Optional[str] = None  # l1 | l2 | l3 | unknown


def _check_auth(secret: Optional[str]) -> None:
    """На production требуем internal secret. На dev — не требуем (для удобства)."""
    if not INTERNAL_SECRET:
        return  # dev mode
    if secret != INTERNAL_SECRET:
        raise HTTPException(403, "Forbidden")


@router.post("/stripe-sync")
async def stripe_sync(
    payload: StripeSync,
    x_internal_secret: Optional[str] = Header(None),
):
    """Принимает события от Stripe webhook (через Next.js) и обновляет users."""
    _check_auth(x_internal_secret)

    async with AsyncSessionLocal() as session:
        # Найти юзера: либо по email (checkout_completed), либо по stripe_customer_id
        user = None
        if payload.email:
            user = (
                await session.execute(select(User).where(User.email == payload.email.lower()))
            ).scalar_one_or_none()
        if not user and payload.stripe_customer_id:
            user = (
                await session.execute(
                    select(User).where(User.stripe_customer_id == payload.stripe_customer_id)
                )
            ).scalar_one_or_none()

        if not user:
            logger.warning(
                "stripe-sync: user not found (email=%s, customer=%s) — пропускаем",
                payload.email, payload.stripe_customer_id,
            )
            return {"status": "user_not_found", "event": payload.event}

        # Обновляем
        if payload.stripe_customer_id and not user.stripe_customer_id:
            user.stripe_customer_id = payload.stripe_customer_id

        if payload.event == "subscription_updated":
            if payload.tier and payload.tier != "unknown":
                user.subscription_tier = payload.tier
                # На покупке L1 автоматически даём L1-режим автономности
                if user.autonomy_level == "l0":
                    user.autonomy_level = payload.tier
        elif payload.event == "subscription_cancelled":
            user.subscription_tier = None
            user.autonomy_level = "l0"

        await session.commit()
        logger.info(
            "stripe-sync OK: user=%s event=%s tier=%s",
            user.email, payload.event, payload.tier,
        )
        return {
            "status": "synced",
            "user_id": user.id,
            "tier": user.subscription_tier,
            "autonomy_level": user.autonomy_level,
        }
