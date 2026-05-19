"""Digest endpoint — запуск Echo (Reporting Agent) + получение последнего digest.

Endpoints:
- POST /api/digest/run — запустить Echo, сгенерить новый digest, опционально отослать email
- GET /api/digest/latest?user_id=... — получить последний сохранённый digest
"""
from __future__ import annotations

import base64
import logging
from typing import Optional

from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import Response
from pydantic import BaseModel, EmailStr

from agents.reporting_agent import EchoAgent, get_latest_digest
from db.models import User
from dependencies import get_current_user
from services import emailer
from services.digest_pdf import build_digest_pdf

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


@router.get("/latest/pdf")
async def latest_digest_pdf(
    customer_label: Optional[str] = None,
    current_user: User = Depends(get_current_user),
):
    """Download the latest digest as a client-ready PDF.

    Optional ?customer_label= overrides the title (e.g. "goodevas.it").
    """
    digest = await get_latest_digest(current_user.id)
    if not digest:
        raise HTTPException(404, "No digest yet — run /api/digest/run first")
    pdf_bytes = build_digest_pdf(digest, customer_label=customer_label)
    filename = f"b6-weekly-report-{digest.get('generated_at', '')[:10]}.pdf"
    return Response(
        content=pdf_bytes,
        media_type="application/pdf",
        headers={"Content-Disposition": f'attachment; filename="{filename}"'},
    )


class EmailDigestRequest(BaseModel):
    to_email: EmailStr
    customer_label: Optional[str] = None
    note: Optional[str] = None  # optional plain-text note prepended to the email body


class EmailDigestResponse(BaseModel):
    success: bool
    to: str
    detail: Optional[str] = None


@router.post("/latest/email", response_model=EmailDigestResponse)
async def email_latest_digest(
    payload: EmailDigestRequest,
    current_user: User = Depends(get_current_user),
):
    """Send the latest digest to a client email address as a PDF attachment."""
    digest = await get_latest_digest(current_user.id)
    if not digest:
        raise HTTPException(404, "No digest yet — run /api/digest/run first")

    pdf_bytes = build_digest_pdf(digest, customer_label=payload.customer_label)
    pdf_b64 = base64.b64encode(pdf_bytes).decode("ascii")
    filename = f"b6-weekly-report-{digest.get('generated_at', '')[:10]}.pdf"

    subject, html = emailer.weekly_digest_email(payload.to_email, digest)
    if payload.note:
        # Prepend the note above the auto-generated body
        html = f"<p>{payload.note}</p>" + html

    result = await emailer.send_email(
        to=payload.to_email,
        subject=subject,
        html=html,
        tag="weekly-digest-client",
        attachments=[
            {
                "filename": filename,
                "content": pdf_b64,
                "type": "application/pdf",
            }
        ],
    )
    return EmailDigestResponse(
        success=bool(result.get("success", False)),
        to=payload.to_email,
        detail=result.get("message") or result.get("id"),
    )
