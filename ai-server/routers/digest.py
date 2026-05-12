"""Digest endpoint — запуск Echo (Reporting Agent) + получение последнего digest.

Endpoints:
- POST /api/digest/run — запустить Echo, сгенерить новый digest, опционально отослать email
- GET /api/digest/latest?user_id=... — получить последний сохранённый digest
"""
from __future__ import annotations

import logging
from typing import Optional

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, EmailStr
from sqlalchemy import select

from agents.reporting_agent import EchoAgent, get_latest_digest
from db.models import User
from db.session import AsyncSessionLocal
from services import emailer

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/digest", tags=["digest"])


class RunDigestRequest(BaseModel):
    user_id: str = "dev-user-001"
    period_days: int = 7
    send_email: bool = False
    email_override: Optional[EmailStr] = None


class RunDigestResponse(BaseModel):
    success: bool
    digest: Optional[dict] = None
    email_result: Optional[dict] = None
    error: Optional[str] = None


@router.post("/run", response_model=RunDigestResponse)
async def run_digest(payload: RunDigestRequest):
    """Запустить Echo и сгенерить новый digest."""
    echo = EchoAgent(user_id=payload.user_id, period_days=payload.period_days)
    result = await echo.run()

    if result.error or not echo.digest:
        return RunDigestResponse(
            success=False,
            error=result.error or "Echo не вернул digest (возможно нет данных за период)",
        )

    digest = echo.digest

    # Опционально шлём email
    email_result = None
    if payload.send_email:
        to_email = payload.email_override
        if not to_email:
            # Берём из БД
            async with AsyncSessionLocal() as session:
                user = await session.get(User, payload.user_id)
                if user:
                    to_email = user.email

        if not to_email:
            email_result = {"success": False, "message": "No email known for user"}
        else:
            subject, html = emailer.weekly_digest_email(to_email, digest)
            email_result = await emailer.send_email(
                to=to_email,
                subject=subject,
                html=html,
                tag="weekly-digest",
            )

    return RunDigestResponse(success=True, digest=digest, email_result=email_result)


@router.get("/latest")
async def latest_digest(user_id: str = "dev-user-001"):
    """Последний сохранённый digest пользователя."""
    digest = await get_latest_digest(user_id)
    if not digest:
        raise HTTPException(404, "No digest yet — run /api/digest/run first")
    return digest
