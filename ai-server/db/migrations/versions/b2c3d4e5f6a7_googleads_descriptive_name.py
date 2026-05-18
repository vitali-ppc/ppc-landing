"""google_ads_accounts: add descriptive_name

Revision ID: b2c3d4e5f6a7
Revises: a1b2c3d4e5f6
Create Date: 2026-05-16 18:30:00.000000

Adds the user-given account label fetched from Google Ads API (descriptiveName).
Backfill is handled separately by scripts/backfill_account_names.py.
"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


revision: str = 'b2c3d4e5f6a7'
down_revision: Union[str, Sequence[str], None] = 'a1b2c3d4e5f6'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    with op.batch_alter_table('google_ads_accounts', schema=None) as batch_op:
        batch_op.add_column(sa.Column('descriptive_name', sa.String(length=255), nullable=True))


def downgrade() -> None:
    with op.batch_alter_table('google_ads_accounts', schema=None) as batch_op:
        batch_op.drop_column('descriptive_name')
