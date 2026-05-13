"""user is_active + email_verified

Revision ID: a1b2c3d4e5f6
Revises: 84cf759d7c69
Create Date: 2026-05-13 12:00:00.000000

Sprint 6: add is_active and email_verified columns to users table.
Backfills both columns: is_active=TRUE for all existing rows, email_verified=FALSE.
"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


revision: str = 'a1b2c3d4e5f6'
down_revision: Union[str, Sequence[str], None] = '84cf759d7c69'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.add_column(sa.Column('is_active', sa.Boolean(), nullable=False, server_default=sa.true()))
        batch_op.add_column(sa.Column('email_verified', sa.Boolean(), nullable=False, server_default=sa.false()))

    # Drop server_default after backfill so the application layer owns the default
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.alter_column('is_active', server_default=None)
        batch_op.alter_column('email_verified', server_default=None)


def downgrade() -> None:
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.drop_column('email_verified')
        batch_op.drop_column('is_active')
