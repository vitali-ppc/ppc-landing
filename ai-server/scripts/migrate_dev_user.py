"""One-shot script: migrate all dev-user-001 data to a real registered user.

Usage:
    python scripts/migrate_dev_user.py --email chornyi.vitali@gmail.com [--dry-run]

What it does:
  1. Finds user where email == --email (must already be registered via /api/auth/register)
  2. Finds user with id='dev-user-001' (must exist)
  3. Updates user_id from 'dev-user-001' → <real_user.id> across these tables:
       google_ads_accounts, agents, agent_actions, audit_log, safety_caps, activity_events
  4. Deletes the dev-user-001 row

Idempotent: if dev-user-001 doesn't exist or already migrated, exits cleanly.
"""
from __future__ import annotations

import argparse
import asyncio
import sys
from pathlib import Path

# Allow running from project root or ai-server/
HERE = Path(__file__).resolve().parent
AI_SERVER_DIR = HERE.parent
sys.path.insert(0, str(AI_SERVER_DIR))

from sqlalchemy import select, update, delete  # noqa: E402

from db.models import (  # noqa: E402
    ActivityEvent,
    Agent,
    AgentAction,
    AuditLog,
    GoogleAdsAccount,
    SafetyCap,
    User,
)
from db.session import AsyncSessionLocal  # noqa: E402

DEV_USER_ID = "dev-user-001"


async def migrate(email: str, dry_run: bool) -> int:
    email = email.lower().strip()

    async with AsyncSessionLocal() as session:
        dev_user = await session.get(User, DEV_USER_ID)
        if dev_user is None:
            print(f"[ok] No '{DEV_USER_ID}' row found — nothing to migrate.")
            return 0

        result = await session.execute(select(User).where(User.email == email))
        real_user = result.scalar_one_or_none()
        if real_user is None:
            print(f"[error] User with email={email} not registered yet.")
            print(f"        Register first at /api/auth/register, then re-run.")
            return 1
        if real_user.id == DEV_USER_ID:
            print(f"[error] Real user id == '{DEV_USER_ID}' — refusing to self-merge.")
            return 1

        print(f"[plan] dev-user-001 → {real_user.id} ({real_user.email})")

        # Count rows in each table for reporting
        tables_to_migrate = [
            ("google_ads_accounts", GoogleAdsAccount),
            ("agents", Agent),
            ("agent_actions", AgentAction),
            ("audit_log", AuditLog),
            ("safety_caps", SafetyCap),
            ("activity_events", ActivityEvent),
        ]
        for name, model in tables_to_migrate:
            count_q = await session.execute(
                select(model).where(model.user_id == DEV_USER_ID)
            )
            n = len(count_q.scalars().all())
            print(f"  {name}: {n} rows")

        # Also count AgentAction.approved_by refs (separate FK back to users)
        approved_by_q = await session.execute(
            select(AgentAction).where(AgentAction.approved_by == DEV_USER_ID)
        )
        approved_by_n = len(approved_by_q.scalars().all())
        print(f"  agent_actions.approved_by: {approved_by_n} rows")

        if dry_run:
            print("[dry-run] no changes made.")
            return 0

        for name, model in tables_to_migrate:
            await session.execute(
                update(model).where(model.user_id == DEV_USER_ID).values(user_id=real_user.id)
            )
            print(f"  [done] reassigned {name}")

        # Reassign AgentAction.approved_by (nullable FK to users.id)
        await session.execute(
            update(AgentAction)
            .where(AgentAction.approved_by == DEV_USER_ID)
            .values(approved_by=real_user.id)
        )
        print(f"  [done] reassigned agent_actions.approved_by")

        # Now safe to remove dev-user-001 (all FK refs moved)
        await session.execute(delete(User).where(User.id == DEV_USER_ID))
        print(f"  [done] deleted users.{DEV_USER_ID}")

        await session.commit()
        print(f"[ok] migration complete.")
        return 0


def main() -> int:
    p = argparse.ArgumentParser()
    p.add_argument("--email", required=True, help="Target user email (must be registered already)")
    p.add_argument("--dry-run", action="store_true", help="Show counts but don't modify")
    args = p.parse_args()
    return asyncio.run(migrate(args.email, args.dry_run))


if __name__ == "__main__":
    raise SystemExit(main())
