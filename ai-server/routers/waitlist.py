"""Waitlist API — собираем email'ы заинтересованных юзеров.

MVP: пишем в простую SQLite-таблицу (через SQLAlchemy не лезем — миграции
лишние для этой одной таблицы). На production будет Resend для уведомлений.
"""
from __future__ import annotations

import logging
import os
import re
import sqlite3
from datetime import datetime
from pathlib import Path
from typing import Optional

from fastapi import APIRouter, HTTPException, Request
from pydantic import BaseModel, EmailStr, Field

from services import emailer

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/waitlist", tags=["waitlist"])

WAITLIST_DB = Path(__file__).resolve().parent.parent / "waitlist.db"


def _init_db():
    """Создаём табличку если её нет — это отдельная sqlite-БД от основной."""
    conn = sqlite3.connect(WAITLIST_DB)
    conn.execute(
        """CREATE TABLE IF NOT EXISTS signups (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT NOT NULL UNIQUE,
            source TEXT,
            referrer TEXT,
            ip TEXT,
            created_at TEXT NOT NULL
        )"""
    )
    conn.commit()
    conn.close()


_init_db()


class WaitlistSignupRequest(BaseModel):
    email: EmailStr
    source: Optional[str] = Field(None, description="Откуда пришёл: landing | twitter | reddit | hn")
    note: Optional[str] = Field(None, max_length=500)


class WaitlistSignupResponse(BaseModel):
    success: bool
    position: int
    message: str


@router.post("/signup", response_model=WaitlistSignupResponse)
async def signup(payload: WaitlistSignupRequest, request: Request):
    email = payload.email.lower().strip()
    if not re.match(r"^[^@]+@[^@]+\.[^@]+$", email):
        raise HTTPException(400, "Invalid email")

    ip = request.client.host if request.client else None
    referrer = request.headers.get("referer")

    conn = sqlite3.connect(WAITLIST_DB)
    try:
        # Дубликат — не ошибка, возвращаем позицию
        existing = conn.execute(
            "SELECT id FROM signups WHERE email = ?", (email,)
        ).fetchone()
        if existing:
            position = existing[0]
            return WaitlistSignupResponse(
                success=True,
                position=position,
                message=f"Already on the list, you're #{position}. We'll be in touch.",
            )

        conn.execute(
            "INSERT INTO signups (email, source, referrer, ip, created_at) VALUES (?,?,?,?,?)",
            (email, payload.source, referrer, ip, datetime.utcnow().isoformat()),
        )
        position = conn.execute("SELECT COUNT(*) FROM signups").fetchone()[0]
        conn.commit()
    finally:
        conn.close()

    logger.info("Waitlist signup: %s (#%d) source=%s", email, position, payload.source)

    # Welcome email через Resend (или mock-log в dev)
    try:
        subject, html = emailer.welcome_email(email, position)
        email_result = await emailer.send_email(
            to=email, subject=subject, html=html, tag="waitlist-welcome",
        )
        logger.info("Welcome email result for %s: %s", email, email_result.get("success"))
    except Exception:
        logger.exception("Welcome email failed (non-fatal, signup still ok)")

    return WaitlistSignupResponse(
        success=True,
        position=position,
        message=f"Got you, position #{position}. Welcome email is on the way.",
    )


@router.get("/stats")
async def stats():
    """Простая статистика — сколько подписалось."""
    conn = sqlite3.connect(WAITLIST_DB)
    try:
        total = conn.execute("SELECT COUNT(*) FROM signups").fetchone()[0]
        last_7d = conn.execute(
            "SELECT COUNT(*) FROM signups WHERE created_at >= datetime('now', '-7 days')"
        ).fetchone()[0]
        by_source = dict(
            conn.execute(
                "SELECT COALESCE(source,'unknown'), COUNT(*) FROM signups GROUP BY source"
            ).fetchall()
        )
    finally:
        conn.close()
    return {"total": total, "last_7d": last_7d, "by_source": by_source}
