"""Socket.IO server + event publisher.

Каждый юзер подключается в свою «комнату» (room) по user_id.
События публикуются туда → frontend получает мгновенно.

События которые мы шлём:
- agent.started      { agent, mascot, customer_id }
- agent.thinking     { agent, mascot, message }
- agent.calling_tool { agent, mascot, tool, input }
- agent.done         { agent, mascot, text }
- agent.error        { agent, mascot, message }
- agent.review       { agent: 'aegis', target_action_id, risk_score, recommendation }
"""
from __future__ import annotations

import logging
from datetime import datetime
from typing import Any

import socketio

logger = logging.getLogger(__name__)

# ASGI mode (для FastAPI)
sio = socketio.AsyncServer(
    async_mode="asgi",
    cors_allowed_origins="*",  # dev — open
    logger=False,
    engineio_logger=False,
)


@sio.event
async def connect(sid: str, environ: dict, auth: dict | None = None):
    """Клиент подключился. Опционально передаёт user_id в auth → join room."""
    user_id = (auth or {}).get("user_id", "dev-user-001")
    await sio.enter_room(sid, f"user:{user_id}")
    logger.info("Socket.IO connected: sid=%s, user_id=%s", sid, user_id)
    await sio.emit(
        "connected",
        {"sid": sid, "user_id": user_id, "ts": datetime.utcnow().isoformat()},
        to=sid,
    )


@sio.event
async def disconnect(sid: str):
    logger.info("Socket.IO disconnected: sid=%s", sid)


async def publish_event(user_id: str, event_type: str, payload: dict[str, Any]) -> None:
    """Опубликовать событие в комнату пользователя.

    Используется агентами через event_publisher callback.
    """
    room = f"user:{user_id}"
    enriched = {
        **payload,
        "event_type": event_type,
        "ts": datetime.utcnow().isoformat(),
    }
    try:
        await sio.emit(event_type, enriched, room=room)
    except Exception:
        logger.exception("Failed to emit %s to %s", event_type, room)


def make_publisher(user_id: str):
    """Возвращает async-функцию-publisher для passing в BaseAgent.event_publisher."""

    async def _publish(event_type: str, payload: dict[str, Any]) -> None:
        await publish_event(user_id, f"agent.{event_type}", payload)

    return _publish
