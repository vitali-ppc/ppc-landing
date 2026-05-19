"""B6 — Autonomous PPC Cabinet FastAPI приложение.

Это новое приложение для B6 (агенты + actions + dashboard API).
Старый `main.py` остаётся параллельно (для Kampaio v1 endpoints) — его рефакторинг
завершится на Day 3-4.

Запуск (dev):
    cd ai-server
    source venv/bin/activate
    uvicorn app:app --reload --port 8000

Полезные endpoints:
- POST /api/agents/run       — запустить Buzz
- GET  /api/agents           — список агентов
- GET  /api/actions          — список proposed actions
- POST /api/actions/{id}/approve
- POST /api/actions/{id}/reject
- GET  /health
"""
from __future__ import annotations

import logging
import os
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

load_dotenv(override=True)

logging.basicConfig(
    level=os.getenv("LOG_LEVEL", "INFO"),
    format="%(asctime)s %(levelname)s %(name)s: %(message)s",
)

import socketio

from routers import agents as agents_router
from routers import actions as actions_router
from routers import auth as auth_router
from routers import campaigns as campaigns_router
from routers import waitlist as waitlist_router
from routers import internal as internal_router
from routers import digest as digest_router
from routers import orchestrator as orchestrator_router
from routers import google_ads as google_ads_router
from routers import anomalies as anomalies_router
from services import vigil_scheduler
from ws.events import sio


@asynccontextmanager
async def lifespan(app: FastAPI):
    """FastAPI lifespan — start Vigil scheduler on startup, shut it down cleanly.

    Vigil only runs if VIGIL_ENABLED=true (default false). See
    services/vigil_scheduler.py for full env-var documentation.
    """
    vigil_scheduler.start_scheduler()
    try:
        yield
    finally:
        vigil_scheduler.stop_scheduler()


app = FastAPI(
    title="B6 — Autonomous PPC Cabinet",
    description="AI agents that manage Google Ads campaigns autonomously",
    version="0.4.0-sprint8",
    lifespan=lifespan,
)

# CORS — explicit origins; locked down from wildcard in Sprint 6.
_default_origins = "https://www.kampaio.com,https://kampaio.com,http://localhost:3002,http://localhost:3000"
_cors_origins = [o.strip() for o in os.getenv("CORS_ORIGINS", _default_origins).split(",") if o.strip()]
app.add_middleware(
    CORSMiddleware,
    allow_origins=_cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routers
app.include_router(auth_router.router)
app.include_router(agents_router.router)
app.include_router(actions_router.router)
app.include_router(campaigns_router.router)
app.include_router(waitlist_router.router)
app.include_router(internal_router.router)
app.include_router(digest_router.router)
app.include_router(orchestrator_router.router)
app.include_router(google_ads_router.router)
app.include_router(anomalies_router.router)


@app.get("/")
async def root():
    return {
        "service": "B6 Autonomous PPC Cabinet",
        "version": app.version,
        "endpoints": {
            "agents": "/api/agents",
            "actions": "/api/actions",
            "health": "/health",
            "docs": "/docs",
        },
    }


@app.get("/health")
async def health():
    return {
        "status": "ok",
        "mock_mode": os.getenv("GOOGLE_ADS_USE_MOCK", "false"),
        "model": os.getenv("ANTHROPIC_DEFAULT_MODEL", "claude-sonnet-4-6"),
        "socketio": True,
        "vigil": vigil_scheduler.scheduler_status(),
    }


# Mount Socket.IO ASGI app
# Это оборачивает FastAPI в socketio.ASGIApp — Socket.IO будет на /socket.io/, REST остаётся как был
socket_app = socketio.ASGIApp(sio, other_asgi_app=app, socketio_path="/socket.io")
# Замечание: для запуска через uvicorn используется `app:socket_app` вместо `app:app`
# См. start.py / docker-compose
