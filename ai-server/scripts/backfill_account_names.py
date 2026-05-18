"""Backfill descriptive_name for existing GoogleAdsAccount rows.

For every is_active=True account without descriptive_name, calls Google Ads
get_account_info via the stored refresh_token and writes the descriptiveName.

Tolerates MCC accounts / lost-access by leaving descriptive_name=NULL.
Idempotent: re-running only touches rows that are still NULL.

Usage:
    python scripts/backfill_account_names.py [--dry-run] [--all]

  --dry-run : show what would change, don't write
  --all     : also re-fetch names for rows that already have one (refresh)
"""
from __future__ import annotations

import argparse
import asyncio
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
AI_SERVER_DIR = HERE.parent
sys.path.insert(0, str(AI_SERVER_DIR))

from sqlalchemy import select, or_  # noqa: E402

from db.models import GoogleAdsAccount  # noqa: E402
from db.session import AsyncSessionLocal  # noqa: E402
from services.google_ads_client import (  # noqa: E402
    get_account_info,
    get_valid_access_token,
)


async def backfill(dry_run: bool, refresh_all: bool) -> int:
    async with AsyncSessionLocal() as session:
        q = select(GoogleAdsAccount).where(GoogleAdsAccount.is_active == True)
        if not refresh_all:
            q = q.where(or_(GoogleAdsAccount.descriptive_name.is_(None), GoogleAdsAccount.descriptive_name == ""))
        rows = (await session.execute(q)).scalars().all()

    if not rows:
        print("[ok] nothing to backfill.")
        return 0

    print(f"[plan] {len(rows)} accounts to process (dry_run={dry_run}, refresh_all={refresh_all})")

    updated = 0
    failed = 0
    for acc in rows:
        try:
            access_token = await get_valid_access_token(acc.oauth_refresh_token)
            info = await get_account_info(access_token, acc.google_customer_id)
        except Exception as e:
            print(f"  [skip] {acc.google_customer_id}: token/refresh failed ({e})")
            failed += 1
            continue

        if not info:
            print(f"  [skip] {acc.google_customer_id}: API returned no info (MCC or no-access)")
            failed += 1
            continue

        name = info.get("descriptiveName")
        if not name:
            print(f"  [skip] {acc.google_customer_id}: no descriptiveName in response")
            failed += 1
            continue

        prev = acc.descriptive_name or "—"
        print(f"  {acc.google_customer_id}: '{prev}' → '{name}'")
        if not dry_run:
            async with AsyncSessionLocal() as session:
                row = await session.get(GoogleAdsAccount, acc.id)
                if row:
                    row.descriptive_name = name
                    await session.commit()
        updated += 1

    print(f"[done] updated={updated}, failed/skipped={failed}, dry_run={dry_run}")
    return 0


def main() -> int:
    p = argparse.ArgumentParser()
    p.add_argument("--dry-run", action="store_true")
    p.add_argument("--all", action="store_true", help="Re-fetch names for rows that already have one")
    args = p.parse_args()
    return asyncio.run(backfill(args.dry_run, args.all))


if __name__ == "__main__":
    raise SystemExit(main())
