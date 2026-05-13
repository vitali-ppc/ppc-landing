"""Auth API — registration, login, current user.

Sprint 6: replaces hardcoded `dev-user-001` with proper email+password auth.
Uses bcrypt + HS256 JWT. Access token TTL: 7 days. No email verification yet.
"""
from __future__ import annotations

import logging
from typing import Optional

from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel, EmailStr, Field
from sqlalchemy import func, select

from db.models import GoogleAdsAccount, User
from db.session import AsyncSessionLocal
from dependencies import get_current_user
from services.auth import create_access_token, hash_password, verify_password

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/auth", tags=["auth"])


class RegisterRequest(BaseModel):
    email: EmailStr
    password: str = Field(min_length=8, max_length=128)


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class UserDTO(BaseModel):
    id: str
    email: str
    subscription_tier: Optional[str] = None
    autonomy_level: str
    google_ads_accounts_count: int = 0


class AuthResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserDTO


def _user_to_dto(user: User, google_ads_count: int = 0) -> UserDTO:
    return UserDTO(
        id=user.id,
        email=user.email,
        subscription_tier=user.subscription_tier,
        autonomy_level=user.autonomy_level,
        google_ads_accounts_count=google_ads_count,
    )


@router.post("/register", response_model=AuthResponse, status_code=status.HTTP_201_CREATED)
async def register(payload: RegisterRequest) -> AuthResponse:
    email = payload.email.lower().strip()

    async with AsyncSessionLocal() as session:
        existing = await session.execute(select(User).where(User.email == email))
        if existing.scalar_one_or_none() is not None:
            raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Email already registered")

        user = User(
            email=email,
            password_hash=hash_password(payload.password),
            is_active=True,
            email_verified=False,
        )
        session.add(user)
        await session.commit()
        await session.refresh(user)

    logger.info("User registered: %s (id=%s)", user.email, user.id)
    token = create_access_token(user.id)
    return AuthResponse(access_token=token, user=_user_to_dto(user, 0))


@router.post("/login", response_model=AuthResponse)
async def login(payload: LoginRequest) -> AuthResponse:
    email = payload.email.lower().strip()

    async with AsyncSessionLocal() as session:
        result = await session.execute(select(User).where(User.email == email))
        user = result.scalar_one_or_none()
        if user is None or not verify_password(payload.password, user.password_hash):
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid email or password")
        if not user.is_active:
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Account is disabled")

        accounts_count = await session.scalar(
            select(func.count(GoogleAdsAccount.id)).where(GoogleAdsAccount.user_id == user.id)
        )

    logger.info("User login: %s (id=%s)", user.email, user.id)
    token = create_access_token(user.id)
    return AuthResponse(access_token=token, user=_user_to_dto(user, accounts_count or 0))


@router.get("/me", response_model=UserDTO)
async def me(current_user: User = Depends(get_current_user)) -> UserDTO:
    async with AsyncSessionLocal() as session:
        accounts_count = await session.scalar(
            select(func.count(GoogleAdsAccount.id)).where(GoogleAdsAccount.user_id == current_user.id)
        )
    return _user_to_dto(current_user, accounts_count or 0)
