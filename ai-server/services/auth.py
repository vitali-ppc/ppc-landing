"""Auth utilities — bcrypt password hashing + HS256 JWT access tokens.

Used by `routers/auth.py` (register/login) and `dependencies.py::get_current_user`.
"""
from __future__ import annotations

import os
import logging
from datetime import datetime, timedelta
from typing import Optional

import bcrypt
from jose import jwt, JWTError

logger = logging.getLogger(__name__)

JWT_ALGORITHM = "HS256"
DEFAULT_TOKEN_TTL_MINUTES = 60 * 24 * 7  # 7 days
_BCRYPT_MAX_BYTES = 72  # bcrypt hard limit; longer passwords are truncated at the byte level


def _get_secret() -> str:
    secret = os.getenv("JWT_SECRET_KEY")
    if secret:
        return secret
    if os.getenv("B6_ENV", "dev") == "prod":
        raise RuntimeError("JWT_SECRET_KEY must be set in production")
    logger.warning("JWT_SECRET_KEY not set — using dev fallback. Set it in .env for stable tokens.")
    return "dev-only-do-not-use-in-production-jwt-secret-key-1234567890"


def _encode_password(plain: str) -> bytes:
    return plain.encode("utf-8")[:_BCRYPT_MAX_BYTES]


def hash_password(plain: str) -> str:
    return bcrypt.hashpw(_encode_password(plain), bcrypt.gensalt()).decode("utf-8")


def verify_password(plain: str, hashed: str) -> bool:
    try:
        return bcrypt.checkpw(_encode_password(plain), hashed.encode("utf-8"))
    except Exception:
        return False


def create_access_token(user_id: str, expires_minutes: int = DEFAULT_TOKEN_TTL_MINUTES) -> str:
    now = datetime.utcnow()
    payload = {
        "sub": user_id,
        "iat": int(now.timestamp()),
        "exp": int((now + timedelta(minutes=expires_minutes)).timestamp()),
    }
    return jwt.encode(payload, _get_secret(), algorithm=JWT_ALGORITHM)


def decode_access_token(token: str) -> dict:
    """Returns payload dict on success. Raises JWTError on invalid/expired token."""
    return jwt.decode(token, _get_secret(), algorithms=[JWT_ALGORITHM])


def extract_user_id(token: Optional[str]) -> Optional[str]:
    """Best-effort decode for Socket.IO connect handler. Returns None on any failure."""
    if not token:
        return None
    try:
        payload = decode_access_token(token)
        return payload.get("sub")
    except JWTError:
        return None
