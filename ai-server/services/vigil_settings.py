"""Per-user Vigil settings (Sprint 8 Phase 6).

Stored in the existing `safety_caps` table via two cap_types:
- `vigil_enabled`        limit_value 0 or 1
- `vigil_min_severity`   limit_value 0=info, 1=warning, 2=critical (email threshold)

This lets a user turn Vigil monitoring off entirely, or raise the email
threshold so they only get pinged on critical (default behavior, but the
setting makes it explicit).

Defaults when no row exists:
- vigil_enabled = 1 (on by default — Vigil is the whole point of this sprint)
- vigil_min_severity = 2 (critical only — matches current vigil_notifier filter)
"""
from __future__ import annotations

from typing import Optional

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from db.models import SafetyCap
from db.session import AsyncSessionLocal

SEVERITY_LEVELS = {"info": 0, "warning": 1, "critical": 2}
SEVERITY_FROM_INT = {v: k for k, v in SEVERITY_LEVELS.items()}


async def _get_cap(session: AsyncSession, user_id: str, cap_type: str) -> Optional[SafetyCap]:
    stmt = (
        select(SafetyCap)
        .where(SafetyCap.user_id == user_id)
        .where(SafetyCap.cap_type == cap_type)
        .limit(1)
    )
    return (await session.execute(stmt)).scalar_one_or_none()


async def is_vigil_enabled(user_id: str) -> bool:
    """Default: on. User must explicitly disable via UI."""
    async with AsyncSessionLocal() as session:
        cap = await _get_cap(session, user_id, "vigil_enabled")
        if cap is None:
            return True
        return float(cap.limit_value) > 0


async def get_min_severity(user_id: str) -> str:
    """Default: critical. Returns 'info' | 'warning' | 'critical'."""
    async with AsyncSessionLocal() as session:
        cap = await _get_cap(session, user_id, "vigil_min_severity")
        if cap is None:
            return "critical"
        level = int(float(cap.limit_value))
        return SEVERITY_FROM_INT.get(level, "critical")


async def get_vigil_settings(user_id: str) -> dict:
    return {
        "enabled": await is_vigil_enabled(user_id),
        "min_severity": await get_min_severity(user_id),
    }


async def set_vigil_settings(
    user_id: str,
    *,
    enabled: Optional[bool] = None,
    min_severity: Optional[str] = None,
) -> dict:
    """Upsert one or both settings. Returns the new effective state."""
    if min_severity is not None and min_severity not in SEVERITY_LEVELS:
        raise ValueError(
            f"min_severity must be one of {list(SEVERITY_LEVELS)} (got {min_severity!r})"
        )

    async with AsyncSessionLocal() as session:
        if enabled is not None:
            cap = await _get_cap(session, user_id, "vigil_enabled")
            value = 1.0 if enabled else 0.0
            if cap is None:
                session.add(
                    SafetyCap(
                        user_id=user_id,
                        cap_type="vigil_enabled",
                        limit_value=value,
                        current_value=0,
                    )
                )
            else:
                cap.limit_value = value
        if min_severity is not None:
            cap = await _get_cap(session, user_id, "vigil_min_severity")
            value = float(SEVERITY_LEVELS[min_severity])
            if cap is None:
                session.add(
                    SafetyCap(
                        user_id=user_id,
                        cap_type="vigil_min_severity",
                        limit_value=value,
                        current_value=0,
                    )
                )
            else:
                cap.limit_value = value
        await session.commit()

    return await get_vigil_settings(user_id)
