"""Database session factory.

Dev: SQLite через aiosqlite (file-based).
Prod: Postgres через psycopg (нужно раскомментить в requirements.txt и установить).
"""
from __future__ import annotations

import os
from sqlalchemy import create_engine
from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine
from sqlalchemy.orm import sessionmaker, declarative_base

DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./b6_dev.db")

# Async engine — основной путь
# Для SQLite: sqlite+aiosqlite:///./b6_dev.db
# Для Postgres: postgresql+psycopg://...
def _to_async_url(url: str) -> str:
    if url.startswith("sqlite:///"):
        return url.replace("sqlite:///", "sqlite+aiosqlite:///")
    if url.startswith("postgresql://"):
        return url.replace("postgresql://", "postgresql+psycopg://")
    return url


ASYNC_DATABASE_URL = _to_async_url(DATABASE_URL)

async_engine = create_async_engine(
    ASYNC_DATABASE_URL,
    echo=os.getenv("LOG_LEVEL") == "DEBUG",
    future=True,
)

AsyncSessionLocal = async_sessionmaker(
    async_engine,
    class_=AsyncSession,
    expire_on_commit=False,
)

# Sync engine — для Alembic миграций
sync_engine = create_engine(DATABASE_URL, future=True)
SyncSessionLocal = sessionmaker(sync_engine, expire_on_commit=False)

Base = declarative_base()


async def get_db() -> AsyncSession:
    """FastAPI dependency для async session."""
    async with AsyncSessionLocal() as session:
        yield session
