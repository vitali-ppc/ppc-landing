"""Digest endpoint — запуск Echo (Reporting Agent) + получение последнего digest.

Endpoints:
- POST /api/digest/run — запустить Echo, сгенерить новый digest, опционально отослать email
- GET /api/digest/latest?user_id=... — получить последний сохранённый digest
"""
from __future__ import annotations

import logging
from typing import Optional

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel, EmailStr

from agents.reporting_agent import EchoAgent, get_latest_digest
from db.models import User
from dependencies import get_current_user
from services import emailer

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/digest", tags=["digest"])


class RunDigestRequest(BaseModel):
    period_days: int = 7
    send_email: bool = False
    email_override: Optional[EmailStr] = None


class RunDigestResponse(BaseModel):
    success: bool
    digest: Optional[dict] = None
    email_result: Optional[dict] = None
    error: Optional[str] = None


@router.post("/run", response_model=RunDigestResponse)
async def run_digest(payload: RunDigestRequest, current_user: User = Depends(get_current_user)):
    """Запустить Echo и сгенерить новый digest."""
    echo = EchoAgent(user_id=current_user.id, period_days=payload.period_days)
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
        to_email = payload.email_override or current_user.email
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
async def latest_digest(current_user: User = Depends(get_current_user)):
    """Последний сохранённый digest текущего пользователя."""
    digest = await get_latest_digest(current_user.id)
    if not digest:
        raise HTTPException(404, "No digest yet — run /api/digest/run first")
    return digest
