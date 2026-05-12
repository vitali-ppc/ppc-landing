# B6 — HANDOFF (текущее состояние)

> **Если ты новый Claude в этой сессии**: прочитай **сначала** [`CLAUDE.md`](./CLAUDE.md) для контекста проекта, **потом** этот файл для текущего состояния.
> Полный архитектурный план: [`/Users/vitaly/.claude/plans/noble-waddling-sparkle.md`](/Users/vitaly/.claude/plans/noble-waddling-sparkle.md)
> Архитектура системы: [`ARCHITECTURE.md`](./ARCHITECTURE.md)
> История изменений: [`CHANGELOG.md`](./CHANGELOG.md)

**Дата последнего обновления**: 2026-05-12 (🚀 LAUNCH DAY)
**Текущая ветка**: `v2-autonomous-agents`
**Прогресс кода**: **100%** (все 7 агентов работают, production stack готов)
**Статус**: ✅ **LIVE В PRODUCTION**

## 🌍 Production URLs

| | URL | Статус |
|---|---|---|
| **Лендинг** | https://www.kampaio.com | ✅ HTTP 200 |
| **Dashboard** | https://www.kampaio.com/b6 | ✅ HTTP 200 |
| **Backend API** | https://api.kampaio.com | ✅ HTTPS, valid LE cert (until Aug 10 2026) |
| **Health** | https://api.kampaio.com/health | ✅ `{"status":"ok","mock_mode":"true","model":"claude-sonnet-4-6","socketio":true}` |
| **Swagger UI** | https://api.kampaio.com/docs | ✅ 22 endpoints |
| **Socket.IO** | wss://api.kampaio.com/socket.io/ | ✅ Handshake OK |

**Infrastructure:**
- Frontend: Vercel (Hobby tier, free) — project `ppc-landing`, deployed from `v2-autonomous-agents` branch
- Backend: **Hetzner CPX22** ($9.49/mo) — Nuremberg, Ubuntu 24.04, IP `178.104.124.150`
- DNS: GoDaddy — `kampaio.com` apex + `www` CNAME → Vercel, `api` A → Hetzner
- SSL: Let's Encrypt via Caddy (auto-renew)
- Stack: Docker compose (Postgres 16 + Redis 7 + b6-api FastAPI + Caddy)
- Hetzner account: **K0514922126** (new, after old K0742311825 was cancelled 02/2025 for unpaid $5.09)

---

## ⚡ Быстрая сводка (TL;DR)

| | |
|---|---|
| Что есть | 7 AI-агентов + multi-tier autonomy + live theatre UI + 22 endpoints + Docker prod stack, **всё в проде** |
| Что не сделано **в коде** | Multi-tenancy auth (single dev-user), real Stripe live mode, Google Ads write ops |
| Что осталось из deployment | `ANTHROPIC_API_KEY` не вставлен в `.env.prod` (агенты молчат пока) |
| **Главный блокер реального value** | Google Ads production token — 4-8 недель approval. Пока работаем в `GOOGLE_ADS_USE_MOCK=true` |
| Второй блокер | `ANTHROPIC_API_KEY` ротейтнуть и `sed`-вставить через SSH |

---

## 📦 Состояние Git

**Ветка `v2-autonomous-agents` запушена в `origin`** (это production-ветка Vercel'а).

История launch day (~3 часа работы 2026-05-12):

```
30d6b8a B6 LAUNCH: production live on kampaio.com
5bb3afe B6 fix: upgrade Next.js 15.3.5 → 15.5.18 (security patches)
181efe6 B6 fix: add psycopg2-binary for Postgres in production
f547a2d B6 brand: add BRAND-BRIEF.md + update Hetzner status
9e35766 B6 docs: full documentation refresh (Sprint 3 final)
528590f B6 production prep: Docker + Caddy + docs + launch kit
c22bcdf B6 frontend: dashboard /b6 + new landing + Stripe webhook
59442b1 B6 backend: HTTP routers + new app.py
d8873de B6 backend: agents + DB + services + Socket.IO
```

GitHub auth настроена через PAT в macOS Keychain — `git push` работает без интерактивного логина.

---

## 🔥 Быстрый старт (если зашёл в новую сессию)

### Проверь что прод жив
```bash
curl -s https://api.kampaio.com/health | python3 -m json.tool        # backend
curl -s -o /dev/null -w "%{http_code}\n" https://www.kampaio.com/    # landing
curl -s -o /dev/null -w "%{http_code}\n" https://www.kampaio.com/b6  # dashboard
```

Ожидаем 200/JSON OK на всех трёх.

### SSH к prod backend (Hetzner)
```bash
ssh -i ~/.ssh/id_ed25519 root@178.104.124.150
cd ~/ppc-landing
docker compose -f docker-compose.prod.yml --env-file .env.prod ps        # статус контейнеров
docker compose -f docker-compose.prod.yml --env-file .env.prod logs b6-api --tail=50  # логи
```

### Запустить локально (dev режим)
```bash
# Backend (Терминал 1)
cd /Users/vitaly/Vit+/projects/ppc-landing/ai-server
source venv/bin/activate
GOOGLE_ADS_USE_MOCK=true uvicorn app:socket_app --port 8000 --reload &

# Frontend (Терминал 2)
cd /Users/vitaly/Vit+/projects/ppc-landing
npm run dev &  # port 3002

# Открыть: http://localhost:3002/b6
```

### Логи (локально)
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

Launch завершён. Активные хвосты:

1. **`ANTHROPIC_API_KEY` пустой в `.env.prod`** — backend работает, /health отдаёт OK, но любая попытка запустить агента (Buzz/Aegis/etc) вернёт ошибку. Когда юзер ротейтнет ключ в console.anthropic.com — один SSH-вход + `nano` + `docker compose restart b6-api` и агенты оживут.

2. **Старый долг Hetzner $5.09** на cancelled аккаунте `K0742311825`. Bank transfer на `IBAN DE47 7655 1540 0000 1758 02` (`BIC BYLADEM1GUN`). Не блокирует prod (новый аккаунт `K0514922126` отдельный), но если не закрыть — уйдёт в коллекторов.

3. **Косметические хвосты**: `<title>` в `src/app/layout.tsx` остался `"Kampaio - Digital Ecosystem"` от старого Kampaio v1 — нужно сменить на B6-релевантный (e.g. `"B6 — Your PPC Agency in a Cabinet"`).

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

**В продакшене** (`https://www.kampaio.com`):
1. Открой лендинг — маскоты, pricing, waitlist
2. Submit свой email в waitlist → `Got you, position #N`
3. Открой `/b6` → dashboard загружается, видишь 3 кампании, Stats bar, панели Maximus/Echo/Mira/Sage
4. ⚠️ **Кнопки агентов пока не работают** — нужен `ANTHROPIC_API_KEY` в `.env.prod`

**Локально (full flow с агентами)**: см. секцию выше «Запустить локально (dev режим)». В dev .env Anthropic ключ установлен, поэтому Buzz/Aegis/Mira/Sage/Echo отрабатывают полностью.

---

## 🏃 Что делать в следующий раз (по приоритету)

### Если пользователь говорит «продолжаем» / «дальше»

**1. Активировать AI-агентов** (5 минут):
- Ротейтнуть `ANTHROPIC_API_KEY` на https://console.anthropic.com/settings/keys
- SSH к prod: `ssh -i ~/.ssh/id_ed25519 root@178.104.124.150`
- Открыть редактор: `nano ~/ppc-landing/.env.prod`
- Заменить `ANTHROPIC_API_KEY=` на `ANTHROPIC_API_KEY=sk-ant-...`
- Перезапустить: `cd ~/ppc-landing && docker compose -f docker-compose.prod.yml --env-file .env.prod restart b6-api`
- Проверить: `curl https://api.kampaio.com/health` всё ещё 200; зайти в `https://www.kampaio.com/b6` и нажать «Run Buzz»

**2. Marketing** (тексты готовы в [`LAUNCH-CONTENT.md`](./LAUNCH-CONTENT.md)):
- Twitter тред
- Reddit r/PPC, r/SmallBusiness
- LinkedIn post
- Hacker News «Show HN»
- Цель недели: 30+ waitlist signups, 5+ demo calls

**3. Старый долг Hetzner $5.09**: bank transfer на IBAN `DE47 7655 1540 0000 1758 02` чтобы не уйти в коллекторов.

**4. Косметика**: `<title>` в `src/app/layout.tsx` сменить с `"Kampaio - Digital Ecosystem"` на B6-релевантное.

---

## 🛑 Если пользователь сказал «стоп» / спрашивает что-то

- Не начинай новую работу. Сначала ответь на вопрос.
- Если просит summary — посмотри сюда + в [`README.md`](./README.md)
- Если хочет показать продукт — `https://www.kampaio.com/b6` (или локально `localhost:3002/b6` если серверы запущены).

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
| **Sprint 3.5** | BRAND-BRIEF.md (audience, voice, AI visibility rules, taboos) | ~300 | 1.5 часа |
| **Launch Day** (2026-05-12) | Hetzner CPX22 + DNS + Caddy SSL + Vercel deploy + smoke 8/8 ✅ | ~30 (только фиксы: psycopg2 + Next.js bump) | ~3 часа |

**Total**: ~8,500 строк, ~25 часов продуктивной работы.

Подробнее → [`CHANGELOG.md`](./CHANGELOG.md).
