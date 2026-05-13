"""Maximus orchestrator endpoint."""
from __future__ import annotations

import logging
from typing import Optional

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel

from agents.orchestrator import run_orchestrator_cycle, get_latest_orchestration
from db.models import User
from db.session import AsyncSessionLocal
from dependencies import get_current_user

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/orchestrator", tags=["orchestrator"])


class RunCycleRequest(BaseModel):
    dry_run: bool = False
    autonomy_level_override: Optional[str] = None  # 'l0' | 'l1' | 'l2' | 'l3' для тестов


@router.post("/cycle")
async def orchestrator_cycle(payload: RunCycleRequest, current_user: User = Depends(get_current_user)):
    """Запустить один orchestration cycle (Maximus решает что авто-апрувить)."""

    # Опциональный override autonomy_level — для тестов разных режимов
    if payload.autonomy_level_override:
        async with AsyncSessionLocal() as session:
            user = await session.get(User, current_user.id)
            if user:
                user.autonomy_level = payload.autonomy_level_override
                await session.commit()

    result = await run_orchestrator_cycle(current_user.id, dry_run=payload.dry_run)
    if "error" in result:
        raise HTTPException(404, result["error"])
    return result


@router.get("/latest")
async def latest_cycle(current_user: User = Depends(get_current_user)):
    """Последний orchestration cycle (для дашборда)."""
    cycle = await get_latest_orchestration(current_user.id)
    if cycle is None:
        raise HTTPException(404, "No orchestration cycle yet")
    return cycle


class AutonomyUpdate(BaseModel):
    autonomy_level: str  # l0 | l1 | l2 | l3


@router.post("/autonomy")
async def set_autonomy(payload: AutonomyUpdate, current_user: User = Depends(get_current_user)):
    """Установить autonomy level текущего пользователя."""
    if payload.autonomy_level not in ("l0", "l1", "l2", "l3"):
        raise HTTPException(400, "autonomy_level must be l0/l1/l2/l3")
    async with AsyncSessionLocal() as session:
        user = await session.get(User, current_user.id)
        if user is None:
            raise HTTPException(404, "User not found")
        user.autonomy_level = payload.autonomy_level
        await session.commit()
        return {
            "user_id": user.id,
            "autonomy_level": user.autonomy_level,
            "subscription_tier": user.subscription_tier,
        }
