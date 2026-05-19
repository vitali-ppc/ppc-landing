"""HTTP endpoints для управления агентами.

Day 2:
- POST /api/agents/run — запустить конкретного агента (пока только bidding)
- GET  /api/agents — список агентов пользователя
- POST /api/agents/{type}/pause — пауза агента
- POST /api/agents/{type}/resume — резюм агента
"""
from __future__ import annotations

import logging
from typing import Optional

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel, Field
from sqlalchemy import select

from agents.bidding_agent import BiddingAgent
from agents.risk_agent import AegisAgent
from agents.strategy_agent import StrategyAgent
from agents.creative_agent import CreativeAgent
from agents.research_agent import ResearchAgent
from agents.anomaly_agent import VigilAgent
from db.models import Agent, User
from db.session import AsyncSessionLocal
from dependencies import get_current_user
from ws.events import make_publisher, publish_event

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/agents", tags=["agents"])


class RunAgentRequest(BaseModel):
    agent_type: str = Field(default="bidding", description="Тип агента: bidding | strategy | creative")
    customer_id: str = Field(..., description="Google Ads customer ID")
    campaign_id: Optional[str] = Field(default=None, description="Обязательно для 'creative' агента")


class RunAgentResponse(BaseModel):
    success: bool
    agent: str
    iterations: int
    tool_calls: int
    proposed_action_ids: list[str]
    final_text: str
    error: Optional[str] = None
    # Aegis-фаза (если запустили)
    risk_reviews: list[dict] = []
    risk_iterations: int = 0


@router.post("/run", response_model=RunAgentResponse)
async def run_agent(payload: RunAgentRequest, current_user: User = Depends(get_current_user)):
    """Запустить один цикл агента и вернуть результат.

    Поддерживаемые agent_type:
    - 'bidding'  (Buzz)    → потом auto-run Aegis для review
    - 'strategy' (Vox)     → потом auto-run Aegis для review
    """
    if payload.agent_type not in ("bidding", "strategy", "creative", "research", "anomaly"):
        raise HTTPException(400, f"Unsupported agent type: {payload.agent_type}")
    if payload.agent_type in ("creative", "research") and not payload.campaign_id:
        raise HTTPException(400, f"campaign_id required for '{payload.agent_type}' agent")

    user_id = current_user.id
    publisher = make_publisher(user_id)
    await publish_event(user_id, "session.start", {
        "customer_id": payload.customer_id, "agent_type": payload.agent_type,
    })

    # Маршрутизация по agent_type
    if payload.agent_type == "bidding":
        main_agent = BiddingAgent(
            user_id=user_id,
            customer_id=payload.customer_id,
            event_publisher=publisher,
        )
    elif payload.agent_type == "strategy":
        main_agent = StrategyAgent(
            user_id=user_id,
            customer_id=payload.customer_id,
            event_publisher=publisher,
        )
    elif payload.agent_type == "creative":
        main_agent = CreativeAgent(
            user_id=user_id,
            customer_id=payload.customer_id,
            campaign_id=payload.campaign_id,
            event_publisher=publisher,
        )
    elif payload.agent_type == "anomaly":
        main_agent = VigilAgent(
            user_id=user_id,
            customer_id=payload.customer_id,
            event_publisher=publisher,
        )
    else:  # research
        main_agent = ResearchAgent(
            user_id=user_id,
            customer_id=payload.customer_id,
            campaign_id=payload.campaign_id,
            event_publisher=publisher,
        )

    main_result = await main_agent.run()
    final_clean = "".join(ch for ch in main_result.final_text if ch >= " " or ch in "\n\t")

    # Собираем proposed_ids по типу агента
    if payload.agent_type == "strategy":
        proposed_ids = [a.get("action_id") for a in main_agent.proposed_shifts if a.get("action_id")]
    elif payload.agent_type in ("creative", "research"):
        proposed_ids = [a.get("action_id") for a in main_agent.proposals if a.get("action_id")]
    else:
        proposed_ids = [a.get("action_id") for a in main_result.actions_proposed if a.get("action_id")]

    # Алиас для compatibility
    buzz_result = main_result
    buzz = main_agent

    # Aegis ревьюит то что Buzz насоздавал (если есть)
    risk_reviews: list[dict] = []
    risk_iterations = 0
    if proposed_ids:
        try:
            aegis = AegisAgent(user_id=user_id, event_publisher=publisher)
            aegis_result = await aegis.run()
            risk_reviews = list(aegis.reviews)
            risk_iterations = aegis_result.iterations
            if aegis_result.error:
                logger.warning("Aegis returned error: %s", aegis_result.error)
        except Exception:
            logger.exception("Aegis review failed (continuing)")

    await publish_event(user_id, "session.complete", {
        "proposed_ids": proposed_ids, "reviews": risk_reviews,
    })

    return RunAgentResponse(
        success=buzz_result.error is None,
        agent=buzz.name,
        iterations=buzz_result.iterations,
        tool_calls=len(buzz_result.tool_calls),
        proposed_action_ids=proposed_ids,
        final_text=final_clean,
        error=buzz_result.error,
        risk_reviews=risk_reviews,
        risk_iterations=risk_iterations,
    )


@router.get("")
async def list_agents(current_user: User = Depends(get_current_user)):
    """Список агентов пользователя."""
    async with AsyncSessionLocal() as session:
        stmt = select(Agent).where(Agent.user_id == current_user.id)
        agents_list = (await session.execute(stmt)).scalars().all()
        return {
            "user_id": current_user.id,
            "count": len(agents_list),
            "agents": [
                {
                    "id": a.id,
                    "type": a.type,
                    "mascot_name": a.mascot_name,
                    "status": a.status,
                    "last_run_at": a.last_run_at.isoformat() if a.last_run_at else None,
                }
                for a in agents_list
            ],
        }


@router.post("/{agent_type}/pause")
async def pause_agent(agent_type: str, current_user: User = Depends(get_current_user)):
    """Поставить агента на паузу."""
    async with AsyncSessionLocal() as session:
        stmt = select(Agent).where(Agent.user_id == current_user.id, Agent.type == agent_type)
        agent = (await session.execute(stmt)).scalar_one_or_none()
        if not agent:
            raise HTTPException(404, f"Agent {agent_type} not found")
        agent.status = "paused"
        await session.commit()
        return {"agent_id": agent.id, "type": agent_type, "status": agent.status}


@router.post("/{agent_type}/resume")
async def resume_agent(agent_type: str, current_user: User = Depends(get_current_user)):
    """Возобновить работу агента."""
    async with AsyncSessionLocal() as session:
        stmt = select(Agent).where(Agent.user_id == current_user.id, Agent.type == agent_type)
        agent = (await session.execute(stmt)).scalar_one_or_none()
        if not agent:
            raise HTTPException(404, f"Agent {agent_type} not found")
        agent.status = "active"
        await session.commit()
        return {"agent_id": agent.id, "type": agent_type, "status": agent.status}
