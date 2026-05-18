"""SQLAlchemy models для B6 — Autonomous PPC Cabinet.

Соответствует схеме из плана (plan file). Совместимо с SQLite (dev) и Postgres (prod).
Для UUID на SQLite используем STRING (36 chars); на Postgres можно мигрировать на native UUID.
"""
from __future__ import annotations

import uuid
from datetime import datetime
from typing import Optional

from sqlalchemy import (
    Boolean,
    DateTime,
    ForeignKey,
    Index,
    Numeric,
    String,
    Text,
    UniqueConstraint,
    JSON,
)
from sqlalchemy.orm import Mapped, mapped_column, relationship

from .session import Base


def _new_uuid() -> str:
    return str(uuid.uuid4())


# ---------------------------------------------------------------------------
# Users
# ---------------------------------------------------------------------------

class User(Base):
    __tablename__ = "users"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=_new_uuid)
    email: Mapped[str] = mapped_column(String(255), unique=True, nullable=False, index=True)
    password_hash: Mapped[str] = mapped_column(Text, nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

    is_active: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)
    email_verified: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)

    stripe_customer_id: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)
    subscription_tier: Mapped[Optional[str]] = mapped_column(String(50), nullable=True)  # 'l1' | 'l2' | 'l3'
    autonomy_level: Mapped[str] = mapped_column(String(10), default="l0")  # 'l0' | 'l1' | 'l2' | 'l3'

    google_ads_accounts: Mapped[list["GoogleAdsAccount"]] = relationship(
        back_populates="user", cascade="all, delete-orphan"
    )
    agents: Mapped[list["Agent"]] = relationship(back_populates="user", cascade="all, delete-orphan")


# ---------------------------------------------------------------------------
# Google Ads accounts (per user)
# ---------------------------------------------------------------------------

class GoogleAdsAccount(Base):
    __tablename__ = "google_ads_accounts"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=_new_uuid)
    user_id: Mapped[str] = mapped_column(String(36), ForeignKey("users.id", ondelete="CASCADE"), index=True)
    google_customer_id: Mapped[str] = mapped_column(String(50), nullable=False)
    oauth_refresh_token: Mapped[str] = mapped_column(Text, nullable=False)
    descriptive_name: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)
    timezone: Mapped[Optional[str]] = mapped_column(String(50), nullable=True)
    currency: Mapped[Optional[str]] = mapped_column(String(10), nullable=True)
    connected_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)

    user: Mapped["User"] = relationship(back_populates="google_ads_accounts")


# ---------------------------------------------------------------------------
# Agents (per user)
# ---------------------------------------------------------------------------

class Agent(Base):
    __tablename__ = "agents"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=_new_uuid)
    user_id: Mapped[str] = mapped_column(String(36), ForeignKey("users.id", ondelete="CASCADE"), index=True)
    # 'bidding', 'strategy', 'creative', 'research', 'risk', 'reporting', 'orchestrator'
    type: Mapped[str] = mapped_column(String(50), nullable=False)
    status: Mapped[str] = mapped_column(String(20), default="active")  # active | paused | disabled
    mascot_name: Mapped[Optional[str]] = mapped_column(String(50), nullable=True)
    config: Mapped[Optional[dict]] = mapped_column(JSON, nullable=True)
    last_run_at: Mapped[Optional[datetime]] = mapped_column(DateTime, nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

    user: Mapped["User"] = relationship(back_populates="agents")
    actions: Mapped[list["AgentAction"]] = relationship(back_populates="agent", cascade="all, delete-orphan")


# ---------------------------------------------------------------------------
# Agent actions — каждое действие AI
# ---------------------------------------------------------------------------

class AgentAction(Base):
    __tablename__ = "agent_actions"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=_new_uuid)
    agent_id: Mapped[str] = mapped_column(String(36), ForeignKey("agents.id"), index=True)
    user_id: Mapped[str] = mapped_column(String(36), ForeignKey("users.id"), index=True)
    # 'update_bid', 'pause_campaign', 'generate_creative', 'reallocate_budget', ...
    action_type: Mapped[str] = mapped_column(String(50), nullable=False)
    target: Mapped[Optional[dict]] = mapped_column(JSON, nullable=True)  # campaign_id, keyword, etc.
    before_state: Mapped[Optional[dict]] = mapped_column(JSON, nullable=True)
    after_state: Mapped[Optional[dict]] = mapped_column(JSON, nullable=True)
    reasoning: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    confidence: Mapped[Optional[float]] = mapped_column(Numeric(3, 2), nullable=True)
    # proposed | pending_approval | approved | applied | rejected | reverted | blocked_by_safety
    status: Mapped[str] = mapped_column(String(30), default="proposed", index=True)
    approved_by: Mapped[Optional[str]] = mapped_column(String(36), ForeignKey("users.id"), nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, index=True)
    applied_at: Mapped[Optional[datetime]] = mapped_column(DateTime, nullable=True)

    agent: Mapped["Agent"] = relationship(back_populates="actions")


# ---------------------------------------------------------------------------
# Audit log — immutable trail
# ---------------------------------------------------------------------------

class AuditLog(Base):
    __tablename__ = "audit_log"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=_new_uuid)
    action_id: Mapped[Optional[str]] = mapped_column(String(36), ForeignKey("agent_actions.id"), nullable=True)
    user_id: Mapped[str] = mapped_column(String(36), ForeignKey("users.id"), index=True)
    event_type: Mapped[str] = mapped_column(String(50), nullable=False)
    payload: Mapped[Optional[dict]] = mapped_column(JSON, nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, index=True)


# ---------------------------------------------------------------------------
# Safety caps — per user, per cap_type
# ---------------------------------------------------------------------------

class SafetyCap(Base):
    __tablename__ = "safety_caps"
    __table_args__ = (UniqueConstraint("user_id", "cap_type", name="uq_user_captype"),)

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=_new_uuid)
    user_id: Mapped[str] = mapped_column(String(36), ForeignKey("users.id", ondelete="CASCADE"), index=True)
    # 'daily_spend_max', 'bid_change_pct_max', 'actions_per_hour_max', 'budget_change_per_day_max'
    cap_type: Mapped[str] = mapped_column(String(50), nullable=False)
    limit_value: Mapped[float] = mapped_column(Numeric, nullable=False)
    current_value: Mapped[float] = mapped_column(Numeric, default=0)
    reset_at: Mapped[Optional[datetime]] = mapped_column(DateTime, nullable=True)


# ---------------------------------------------------------------------------
# Activity events — для real-time stream + replay
# ---------------------------------------------------------------------------

class ActivityEvent(Base):
    __tablename__ = "activity_events"
    __table_args__ = (
        Index("ix_activity_user_created", "user_id", "created_at"),
    )

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=_new_uuid)
    user_id: Mapped[str] = mapped_column(String(36), ForeignKey("users.id"), index=True)
    agent_id: Mapped[Optional[str]] = mapped_column(String(36), ForeignKey("agents.id"), nullable=True)
    # 'thinking', 'inspecting', 'decided', 'acted', 'blocked', 'paused', 'resumed'
    event_type: Mapped[str] = mapped_column(String(50), nullable=False)
    payload: Mapped[Optional[dict]] = mapped_column(JSON, nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
