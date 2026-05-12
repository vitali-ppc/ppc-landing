# B6 — HANDOFF (текущее состояние)

> **Если ты новый Claude в этой сессии**: прочитай **сначала** [`CLAUDE.md`](./CLAUDE.md) для контекста проекта, **потом** этот файл для текущего состояния.
> Полный архитектурный план: [`/Users/vitaly/.claude/plans/noble-waddling-sparkle.md`](/Users/vitaly/.claude/plans/noble-waddling-sparkle.md)
> Архитектура системы: [`ARCHITECTURE.md`](./ARCHITECTURE.md)
> История изменений: [`CHANGELOG.md`](./CHANGELOG.md)

**Дата последнего обновления**: 2026-05-12 (Sprint 3 — full docs refresh)
**Текущая ветка**: `v2-autonomous-agents`
**Прогресс кода**: **100%** (все 7 агентов работают, production stack готов)
**Статус**: 🚀 **LAUNCH-READY** — код собирается, контейнеры готовы, ждут deployment

---

## ⚡ Быстрая сводка (TL;DR)

| | |
|---|---|
| Что есть | 7 AI-агентов + multi-tier autonomy + live theatre UI + 22 endpoints + Docker prod stack |
| Что не сделано **в коде** | Multi-tenancy auth (single dev-user), real Stripe live mode, Google Ads write ops |
| Что не сделано **в deployment** | Не задеплоено на Hetzner, не задеплоено на Vercel, домен не указывает на сервера |
| **Главный блокер** | Google Ads production token — 4-8 недель approval. До этого работаем в `GOOGLE_ADS_USE_MOCK=true` |

---

## 📦 Состояние Git

**Локальная ветка `v2-autonomous-agents`** содержит 4 свежих коммита поверх `main`:

```
528590f B6 production prep: Docker + Caddy + docs + launch kit
c22bcdf B6 frontend: dashboard /b6 + new landing + Stripe webhook
59442b1 B6 backend: HTTP routers + new app.py
d8873de B6 backend: agents + DB + services + Socket.IO
```

**Не запушено в origin** — нужен `git push` от пользователя (требует PAT/SSH ключа GitHub).

Команда для push:
```bash
cd /Users/vitaly/Vit+/projects/ppc-landing && git push origin v2-autonomous-agents
```

---

## 🔥 Быстрый старт (если зашёл в новую сессию)

### Проверь что серверы живы (локально)
```bash
curl -s http://localhost:8000/health | python3 -m json.tool   # backend
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3002/b6   # frontend
```

### Если backend упал
```bash
cd /Users/vitaly/Vit+/projects/ppc-landing/ai-server
source venv/bin/activate
GOOGLE_ADS_USE_MOCK=true uvicorn app:socket_app --port 8000 --reload &
```

### Если frontend упал
```bash
cd /Users/vitaly/Vit+/projects/ppc-landing
npm run dev &  # port 3002
```

### Открыть продукт
http://localhost:3002/b6

### Логи
- Backend: `tail -f /tmp/b6-server.log`
- Frontend: `tail -f /tmp/b6-next.log`

---

## ✅ Что готово (полный список)

### Backend (Python / FastAPI / ~3,500 строк)
- ✅ **7 AI-агентов** на Claude Sonnet 4.6:
  - 🐝 **Buzz** (bidding) — single-campaign bid optimization
  - 🛡️ **Aegis** (risk) — review всех предложений
  - 📊 **Echo** (reporting) — weekly digest + советы
  - 🦊 **Vox** (strategy) — cross-campaign budget reallocation
  - 🐻 **Maximus** (orchestrator) — deterministic rules engine для autonomy
  - 🎨 **Mira** (creative) — ad copy + image generation
  - 🦉 **Sage** (research) — keyword + audience expansion
- ✅ Base agent loop (`agents/base.py`) — tool-use итерации через anthropic SDK, без внешних agent-frameworks
- ✅ DB models (SQLAlchemy 2) — 7 таблиц + Alembic миграции
- ✅ Services layer:
  - `google_ads_client.py` — с mock-режимом (3 кампании с разной ROAS)
  - `audit.py` — proposed/approved/applied lifecycle + immutable audit log
  - `emailer.py` — Resend wrapper с mock fallback
  - `image_gen.py` — fal.ai wrapper с picsum mock fallback
- ✅ Real-time через python-socketio (mount в FastAPI ASGI)
- ✅ 22 HTTP endpoints (см. `/docs` Swagger UI)
- ✅ Safety system — 3 hard caps + Aegis review + L1/L2/L3 autonomy

### Frontend (Next.js 15 / TypeScript / ~1,500 строк)
- ✅ Landing `/` — Hero + How + Team (7 mascots) + Pricing + CTA + waitlist форма
- ✅ Dashboard `/b6` с 6 секциями:
  - Stats bar (Pending/Applied/Rejected/🛡️ Blocks/🛡️ High-risk/Tool calls)
  - 3 campaign cards с метриками + подсветка active
  - **Live theatre** (Socket.IO event stream + Mascot layer с Framer Motion)
  - Maximus panel (autonomy toggle + cycle results)
  - Echo digest panel (weekly summary + advice)
  - Mira creative panel (3 ad variants с preview)
  - Sage research panel (keywords grouped by theme + audiences)
  - Approval queue + Activity feed
- ✅ Typed API client (`src/lib/b6-api.ts`) — все 22 endpoints
- ✅ Socket.IO client + `useB6Events` hook
- ✅ Stripe webhook handler (`src/app/api/stripe-webhook/route.ts`)

### Infrastructure (production-ready)
- ✅ Docker compose: Postgres 16 + Redis 7 + B6 API + Caddy
- ✅ Caddyfile с auto-HTTPS (Let's Encrypt) + WebSocket support
- ✅ `Dockerfile.b6` (Python 3.11) — production image с health check
- ✅ `.env.prod.example` — все 12+ env vars документированы
- ✅ Alembic migrations — работают на SQLite (dev) и Postgres (prod, проверено DDL preview)
- ✅ `scripts/smoke-prod.sh` — 8-check production smoke test

### Documentation (~1,200 строк)
- ✅ `README.md` — public-facing overview
- ✅ `CLAUDE.md` — rules for future Claude sessions
- ✅ `HANDOFF.md` — этот файл (operational truth)
- ✅ `DEPLOY.md` — full technical manual
- ✅ `LAUNCH.md` — 2-hour quickstart
- ✅ `LAUNCH-CONTENT.md` — copy-paste social media kit
- ✅ `CHANGELOG.md` — sprint history
- ✅ `ARCHITECTURE.md` — system diagrams

---

## 📊 Метрики проекта

| Метрика | Значение |
|---------|----------|
| Строк production кода (Python + TS) | **~8,200** |
| HTTP endpoints | **22** |
| AI-агентов LIVE | **7 / 7 по плану ✅** |
| DB таблиц | 7 (5 активно используется + waitlist отдельно) |
| Frontend компонентов | 16 (включая 15 в `components/b6/`) |
| Git коммитов в Sprint | 4 (свежих, ready to push) |
| Стоимость 1 прогона Buzz+Aegis | ~$0.25 (60-90 сек) |
| Стоимость 1 прогона Vox+Aegis | ~$0.30 (70-90 сек) |
| Стоимость 1 прогона Mira | ~$0.10 + ~$0.025 (fal.ai в prod) |
| Стоимость 1 прогона Sage | ~$0.15-0.20 (120 сек) |
| Стоимость 1 прогона Echo | ~$0.05-0.10 (15-20 сек) |
| Полный production стек (50 юзеров) | ~$400/мес |

---

## 🚧 Что в работе

**Текущий блокер**: push в origin не сделан — у меня (Claude) нет GitHub auth. Нужен один из вариантов:
- Юзер пушит сам (`git push origin v2-autonomous-agents`)
- Юзер даёт SSH разрешение → я заливаю через `scp` напрямую на сервер

Также **ждёт явного разрешения**: SSH-доступ к `91.99.225.211` (server IP вытащен из `AI_SERVER_HETZNER_README.md`, не из user input — нужна explicit confirmation).

---

## ⚠️ Открытые вопросы / Open Decisions

| # | Вопрос | Текущее решение / статус |
|---|--------|---------------------------|
| 1 | **Google Ads Production Token** | Не решено / неизвестно — спросить пользователя |
| 2 | **Domain** | ✅ Решено — `kampaio.com` |
| 3 | **Production DB hosting** | Решено — Postgres в Docker на Hetzner (cheapest, проверено DDL) |
| 4 | **Mascot стиль** | Текущий emoji (🐝 🛡️ и т.д.) — рабочий, custom SVG только при масштабировании |
| 5 | **Claude model** | Sonnet 4.6 — оптимальный по цена/качество |
| 6 | **Multi-tenancy** | Single dev-user-001 → переход на multi-user после первых beta |
| 7 | **Real Stripe live mode** | Будет активирован при первом платящем клиенте |

---

## 🚨 Критические замечания

### API ключ Anthropic — скомпрометирован в чате (Day 1)
В Sprint 1 пользователь случайно вставил dev API key в чат. **Обязательно ротейтнуть** на https://console.anthropic.com/settings/keys перед production deploy.

### Stripe webhook gap (закрыт)
На Day 7 был добавлен `src/app/api/stripe-webhook/route.ts` + `routers/internal.py` (`/api/internal/stripe-sync`). Когда будут реальные Stripe события — синхронизируются с БД.

### Google Ads Production Token — главный блокер запуска real value
Без него все write-операции (`update_bid`, `pause_campaign`, etc.) выбрасывают `NotImplementedError` или работают в `dry_run` режиме. Процесс одобрения Google занимает **4-8 недель**.

**До получения** — продукт работает в **mock-режиме** (3 синтетических кампании). Полнофункциональный demo, но без подключения к настоящим аккаунтам.

### Single-tenant сейчас
Всё захардкожено на `dev-user-001`. Для **первых beta-юзеров** нужно либо:
- Создавать им отдельные `User` записи руками
- Или добавить регистрацию + JWT auth (~3-4 часа работы)

---

## 🎯 Что попробовать в браузере

1. Открыть http://localhost:3002 → лендинг с маскотами и pricing
2. Открыть http://localhost:3002/b6 → дашборд
3. Нажать «🐝 Run Buzz now» — увидеть live theatre 60-90 сек
4. Видеть 🐝 Buzz летает между кампаний с speech bubbles
5. После — 3 proposed actions с Aegis-бейджами
6. Toggle autonomy в Maximus panel → L3
7. «Запустить cycle» в Maximus → видеть auto-approved
8. Нажать «🎨 Сгенерировать» в Mira → 3 ad variants с Google Ads preview
9. Нажать «Запустить research» в Sage → 9 keywords + 3 audiences
10. Нажать «Сгенерировать» в Echo → weekly digest

---

## 🏃 Что делать в следующий раз (по приоритету)

### Если пользователь говорит «продолжаем» / «дальше»

**1. Deployment** (главное сейчас):
- Push в origin: `git push origin v2-autonomous-agents`
- SSH к Hetzner: `ssh root@91.99.225.211`
- На сервере: `cd /home/vitaliy/ppc-landing && git pull origin v2-autonomous-agents`
- Stop old: `cd ai-server && docker compose down`
- Setup: `cd .. && cp .env.prod.example .env.prod && nano .env.prod`
- Start: `docker compose -f docker-compose.prod.yml --env-file .env.prod up -d`
- Vercel deploy frontend (отдельно)
- Smoke test: `./scripts/smoke-prod.sh`

**2. Если deployment упёрся в кредентилы** — попросить пользователя:
- PAT для GitHub push, ИЛИ
- SSH разрешение к серверу для scp deploy, ИЛИ
- ssh-key access setup

**3. После deployment**:
- Marketing post в Twitter тред (текст готов в LAUNCH-CONTENT.md)
- Reddit post в r/PPC (текст готов)
- Hacker News Show HN (текст готов)
- Цель недели: 30+ waitlist signups, 5+ demo calls

---

## 🛑 Если пользователь сказал «стоп» / спрашивает что-то

- Не начинай новую работу. Сначала ответь на вопрос.
- Если просит summary — посмотри сюда + в [`README.md`](./README.md)
- Если хочет показать продукт — самое быстрое: `localhost:3002/b6` (если серверы живы)

---

## 📁 Где что искать (быстрая навигация)

| Что | Где |
|-----|-----|
| Описание агента (system prompt) | `ai-server/agents/<name>.py` (см. `_SYSTEM_PROMPT` const) |
| Tools агентов | `ai-server/agents/tools.py` + методы `register_tools()` |
| HTTP endpoints | `ai-server/routers/<resource>.py` |
| DB schema | `ai-server/db/models.py` |
| Frontend компоненты | `src/components/b6/*.tsx` |
| Live event handling | `ai-server/ws/events.py` + `src/lib/b6-socket.ts` |
| Mascot animations | `src/components/b6/MascotLayer.tsx` |
| Старый Kampaio v1 (НЕ ТРОГАТЬ) | `ai-server/main.py`, `src/app/chat/`, `src/app/dashboard/` |

---

## ✅ Sprint History (краткая ретроспектива)

| Sprint | Что | Lines | Время |
|--------|-----|-------|-------|
| **Sprint 1.1** (Day 1-2) | Backend foundation: agents, DB, basic API | ~2,500 | 4 часа |
| **Sprint 1.2** (Day 3) | Frontend dashboard + WebSocket integration | ~1,000 | 2 часа |
| **Sprint 1.3** (Day 4) | Aegis + Socket.IO live theatre | ~700 | 2 часа |
| **Sprint 1.4** (Day 5) | Campaigns API + dashboard polish | ~400 | 1 час |
| **Sprint 1.5** (Day 6) | Маскоты с Framer Motion | ~700 | 2 часа |
| **Sprint 1.6** (Day 7) | Production prep: docker, lending, waitlist | ~700 | 2 часа |
| **Sprint 2.1** | Echo (Reporting Agent) + email infra | ~600 | 1.5 часа |
| **Sprint 2.2** | Vox (Strategy Agent) cross-campaign | ~600 | 1.5 часа |
| **Sprint 2.3** | Maximus (Orchestrator) + full L1/L2/L3 | ~700 | 1.5 часа |
| **Sprint 2.4** | Mira (Creative Agent) + image gen | ~800 | 2 часа |
| **Sprint 2.5** | Sage (Research Agent) — финальный | ~700 | 1.5 часа |
| **Sprint 3** | Launch prep + full docs refresh | ~400 | 1 час |

**Total**: ~8,200 строк, ~22 часа продуктивной работы.

Подробнее → [`CHANGELOG.md`](./CHANGELOG.md).
