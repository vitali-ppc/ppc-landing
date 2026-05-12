"""Maximus orchestrator endpoint."""
from __future__ import annotations

import logging
from typing import Optional

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from sqlalchemy import select

from agents.orchestrator import run_orchestrator_cycle, get_latest_orchestration
from db.models import User
from db.session import AsyncSessionLocal

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/orchestrator", tags=["orchestrator"])


class RunCycleRequest(BaseModel):
    user_id: str = "dev-user-001"
    dry_run: bool = False
    autonomy_level_override: Optional[str] = None  # 'l0' | 'l1' | 'l2' | 'l3' для тестов


@router.post("/cycle")
async def orchestrator_cycle(payload: RunCycleRequest):
    """Запустить один orchestration cycle (Maximus решает что авто-апрувить)."""

    # Опциональный override autonomy_level — для тестов разных режимов
    if payload.autonomy_level_override:
        async with AsyncSessionLocal() as session:
            user = await session.get(User, payload.user_id)
            if user:
                user.autonomy_level = payload.autonomy_level_override
                await session.commit()

    result = await run_orchestrator_cycle(payload.user_id, dry_run=payload.dry_run)
    if "error" in result:
        raise HTTPException(404, result["error"])
    return result


@router.get("/latest")
async def latest_cycle(user_id: str = "dev-user-001"):
    """Последний orchestration cycle (для дашборда)."""
    cycle = await get_latest_orchestration(user_id)
    if cycle is None:
        raise HTTPException(404, "No orchestration cycle yet")
    return cycle


class AutonomyUpdate(BaseModel):
    user_id: str = "dev-user-001"
    autonomy_level: str  # l0 | l1 | l2 | l3


@router.post("/autonomy")
async def set_autonomy(payload: AutonomyUpdate):
    """Установить autonomy level пользователя (для testing/demo)."""
    if payload.autonomy_level not in ("l0", "l1", "l2", "l3"):
        raise HTTPException(400, "autonomy_level must be l0/l1/l2/l3")
    async with AsyncSessionLocal() as session:
        user = await session.get(User, payload.user_id)
        if user is None:
            raise HTTPException(404, "User not found")
        user.autonomy_level = payload.autonomy_level
        await session.commit()
        return {
            "user_id": user.id,
            "autonomy_level": user.autonomy_level,
            "subscription_tier": user.subscription_tier,
        }
