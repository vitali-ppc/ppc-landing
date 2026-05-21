"""Per-user Vigil settings (Sprint 8 Phase 6 + Sprint 8.7 schedule modes).

Stored in the existing `safety_caps` table via three cap_types:
- `vigil_enabled`         limit_value 0 or 1                    (master kill switch)
- `vigil_min_severity`    limit_value 0=info, 1=warning, 2=critical  (email threshold)
- `vigil_schedule_mode`   limit_value 0=off, 1=daily, 2=weekly  (Sprint 8.7)

The schedule_mode controls whether the background scheduler picks up the user's
accounts. `off` → scheduler ignores; user runs Vigil manually via "Run now"
button. `daily` / `weekly` → scheduler scans at most once per that interval.

Defaults when no row exists:
- vigil_enabled       = 1     (on — but schedule_mode=off makes this dormant)
- vigil_min_severity  = 2     (critical only — matches vigil_notifier filter)
- vigil_schedule_mode = "off" (manual-only by default; explicit opt-in to autonomy)
"""
from __future__ import annotations

from typing import Optional

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from db.models import SafetyCap
from db.session import AsyncSessionLocal

SEVERITY_LEVELS = {"info": 0, "warning": 1, "critical": 2}
SEVERITY_FROM_INT = {v: k for k, v in SEVERITY_LEVELS.items()}

SCHEDULE_MODES = {"off": 0, "daily": 1, "weekly": 2}
SCHEDULE_MODE_FROM_INT = {v: k for k, v in SCHEDULE_MODES.items()}

# How often the scheduler should run a scan in each mode (hours).
# These are MINIMUM intervals — the scheduler ticks more often, but skips
# users whose last scan is still within this window.
SCHEDULE_INTERVAL_HOURS = {"off": 0, "daily": 24, "weekly": 168}


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


async def get_schedule_mode(user_id: str) -> str:
    """Default: 'off' (manual-only). Returns 'off' | 'daily' | 'weekly'."""
    async with AsyncSessionLocal() as session:
        cap = await _get_cap(session, user_id, "vigil_schedule_mode")
        if cap is None:
            return "off"
        level = int(float(cap.limit_value))
        return SCHEDULE_MODE_FROM_INT.get(level, "off")


async def get_vigil_settings(user_id: str) -> dict:
    return {
        "enabled": await is_vigil_enabled(user_id),
        "min_severity": await get_min_severity(user_id),
        "schedule_mode": await get_schedule_mode(user_id),
    }


async def set_vigil_settings(
    user_id: str,
    *,
    enabled: Optional[bool] = None,
    min_severity: Optional[str] = None,
    schedule_mode: Optional[str] = None,
) -> dict:
    """Upsert one or more settings. Returns the new effective state."""
    if min_severity is not None and min_severity not in SEVERITY_LEVELS:
        raise ValueError(
            f"min_severity must be one of {list(SEVERITY_LEVELS)} (got {min_severity!r})"
        )
    if schedule_mode is not None and schedule_mode not in SCHEDULE_MODES:
        raise ValueError(
            f"schedule_mode must be one of {list(SCHEDULE_MODES)} (got {schedule_mode!r})"
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
        if schedule_mode is not None:
            cap = await _get_cap(session, user_id, "vigil_schedule_mode")
            value = float(SCHEDULE_MODES[schedule_mode])
            if cap is None:
                session.add(
                    SafetyCap(
                        user_id=user_id,
                        cap_type="vigil_schedule_mode",
                        limit_value=value,
                        current_value=0,
                    )
                )
            else:
                cap.limit_value = value
        await session.commit()

    return await get_vigil_settings(user_id)
