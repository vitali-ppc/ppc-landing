"""Сидинг минимального dev-юзера для smoke tests.

User id = 'dev-user-001' (используется тестами).
Запуск: python scripts/seed_dev.py
"""
from __future__ import annotations

import asyncio
import os
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from dotenv import load_dotenv
load_dotenv(override=True)

from sqlalchemy import select

from db.models import User, SafetyCap
from db.session import AsyncSessionLocal


DEV_USER_ID = "dev-user-001"
DEV_EMAIL = "dev@b6.local"


DEFAULT_CAPS = [
    ("daily_spend_pct_max", float(os.getenv("SAFETY_DAILY_SPEND_PCT_MAX", "110"))),
    ("bid_change_pct_max", float(os.getenv("SAFETY_BID_CHANGE_PCT_MAX", "30"))),
    ("actions_per_hour_max", float(os.getenv("SAFETY_ACTIONS_PER_HOUR_MAX", "10"))),
]


async def seed():
    async with AsyncSessionLocal() as session:
        # User
        existing = await session.get(User, DEV_USER_ID)
        if existing:
            print(f"User {DEV_USER_ID} уже существует (email={existing.email})")
        else:
            user = User(
                id=DEV_USER_ID,
                email=DEV_EMAIL,
                password_hash="!dev-no-login!",
                subscription_tier="l1",
                autonomy_level="l1",
            )
            session.add(user)
            await session.flush()
            print(f"✅ Создан dev user {DEV_USER_ID}")

        # Safety caps
        for cap_type, limit in DEFAULT_CAPS:
            cap_stmt = select(SafetyCap).where(
                SafetyCap.user_id == DEV_USER_ID, SafetyCap.cap_type == cap_type
            )
            cap_exists = (await session.execute(cap_stmt)).scalar_one_or_none()
            if cap_exists:
                cap_exists.limit_value = limit
            else:
                session.add(
                    SafetyCap(
                        user_id=DEV_USER_ID, cap_type=cap_type, limit_value=limit
                    )
                )
        await session.commit()
        print(f"✅ Safety caps настроены: {[c[0] for c in DEFAULT_CAPS]}")


if __name__ == "__main__":
    asyncio.run(seed())
