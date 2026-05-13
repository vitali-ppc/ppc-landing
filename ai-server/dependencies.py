"""FastAPI dependencies — auth current_user resolver.

Use `Depends(get_current_user)` on protected endpoints. Returns User ORM object
loaded from DB. Raises 401 on missing/invalid/expired token, 403 on inactive user.
"""
from __future__ import annotations

import logging
from typing import Optional

from fastapi import Depends, Header, HTTPException, status
from jose import JWTError

from db.models import User
from db.session import AsyncSessionLocal
from services.auth import decode_access_token

logger = logging.getLogger(__name__)


def _extract_bearer(authorization: Optional[str]) -> str:
    if not authorization:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Missing Authorization header",
            headers={"WWW-Authenticate": "Bearer"},
        )
    parts = authorization.split()
    if len(parts) != 2 or parts[0].lower() != "bearer":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid Authorization header format",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return parts[1]


async def get_current_user(authorization: Optional[str] = Header(default=None)) -> User:
    token = _extract_bearer(authorization)
    try:
        payload = decode_access_token(token)
    except JWTError as e:
        logger.debug("JWT decode failed: %s", e)
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token",
            headers={"WWW-Authenticate": "Bearer"},
        )

    user_id = payload.get("sub")
    if not user_id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token missing subject",
            headers={"WWW-Authenticate": "Bearer"},
        )

    async with AsyncSessionLocal() as session:
        user = await session.get(User, user_id)

    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found",
            headers={"WWW-Authenticate": "Bearer"},
        )

    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Account is disabled",
        )

    return user


async def get_current_user_optional(authorization: Optional[str] = Header(default=None)) -> Optional[User]:
    """Same as get_current_user but returns None instead of raising for missing/invalid tokens.

    Useful for endpoints with both public and authenticated views.
    """
    if not authorization:
        return None
    try:
        return await get_current_user(authorization=authorization)
    except HTTPException:
        return None
