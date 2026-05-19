# B6 — HANDOFF (текущее состояние)

> **Если ты новый Claude в этой сессии**: прочитай **сначала** [`CLAUDE.md`](./CLAUDE.md) для контекста проекта, **потом** этот файл для текущего состояния.
> Полный архитектурный план: [`/Users/vitaly/.claude/plans/noble-waddling-sparkle.md`](/Users/vitaly/.claude/plans/noble-waddling-sparkle.md)
> Архитектура системы: [`ARCHITECTURE.md`](./ARCHITECTURE.md)
> История изменений: [`CHANGELOG.md`](./CHANGELOG.md)

**Дата последнего обновления**: 2026-05-19 evening (v24 migration + Sprint 6/7 closed + Phase 1/2/3/8 done)
**Текущая ветка**: `v2-autonomous-agents`
**Прогресс кода**: Sprint 1-7 ✅ done, v24 migration Phase 1/2/3/8 ✅ done, Phase 5/6/7 deferred.
**Статус**: ✅ LIVE В PRODUCTION на **multi-tenant JWT auth**, на Google Ads API **v24**, real apply для pause_campaign + apply_recommendation + add_negative_keyword. Готов к **первому платящему**.

---

## 🎯 ЧТО ДЕЛАТЬ ДАЛЬШЕ (приоритеты на 2026-05-20+)

```
1. (~30 мин)  Resend setup — RESEND_API_KEY пустой в .env.prod, email
              сейчас в mock-mode (см. v24 plan §10.A).
              UI честно показывает "⚠️ Mock mode" баннер.
2. (~20 ч)    Sprint 8 — Anomaly Agent + 24/7 cron monitoring.
              Это превращает продукт из "жми Run" в "AI сам мониторит".
              Без него мы не L2/L3.
3. (~15 ч)    Sprint 9 — Maximus L3 aggressive auto-apply policy +
              client-facing Echo improvements (charts, branding).
4. (sales)    Tristan (Goodevas) demo — есть конкретные цифры:
              - $900/мес junk traffic найдено на 13 аккаунтах
              - 15 customers с active Google recommendations
              - PDF client report готов к показу
```

**Полный v24 plan + operational follow-ups**: [`/Users/vitaly/.claude/plans/b6-v24-migration.md`](/Users/vitaly/.claude/plans/b6-v24-migration.md). Там Phase-by-Phase статус + 6 операционных задач:
- §10.A — Resend setup (DNS + API key + .env.prod update)
- §10.B — Sprint 7.5 (strategy-aware bidding для automated bid strategies)
- §10.C — Sage CPA threshold (target_cpa-aware, не hardcoded $5)
- §10.D — Aegis prompt update (новые action types)
- §10.E — ChangeStatus в Echo (показывать non-B6 manual changes)
- §10.F — PDF branding (логотип, графики)

---

## ⚡ Что сделано в марафон 2026-05-18 → 2026-05-19

```
Sprint 6        ✅ JWT auth + multi-tenancy + i18n + migrate dev-user-001
                  → твой реальный аккаунт. 33 Google Ads + 23 descriptive_names.
Sprint 7        ✅ Real apply для pause_campaign (campaigns:mutate с PAUSED).
                  Daily safety cap 5 real applies/customer/24h.
                  UI Apply-to-Google-Ads checkbox + "⚠ Apply now" confirm.
UI polish       ✅ Account dropdown (поиск по 33 акк.), Date range picker как
                  в Google Ads, Collapse/expand секций, Stop-on-hover для
                  Buzz/Vox, eye-toggle паролей.
Bug fix Buzz    ✅ Запрет propose_bid_change на non-MANUAL_CPC strategies
                  (3 слоя защиты: prompt + tool desc + handler).
v24 Phase 1     ✅ API base v20 → v24. Никаких регрессий.
v24 Phase 2     ✅ RecommendationService: Buzz/Vox читают Google's own recs,
                  предлагают apply_recommendation. На проде 15/33 customers
                  имеют active recs.
v24 Phase 3     ✅ Sage чистит junk search terms → add_negative_keyword.
                  77 junk queries найдено = ~$900/мес wasted spend.
v24 Phase 8     ✅ Echo переписан client-facing tone, PDF generator
                  (reportlab), endpoints /digest/pdf + /digest/email,
                  inline email form вместо native popup.
                  Honest mock-mode banner когда RESEND_API_KEY пустой.
```

Полный список commits: см. `git log v2-autonomous-agents` (от `73f0e78` до `50b2baf`, ~25+ коммитов).

---

## 📦 Sister project status (2026-05-16)

**SEO Agent Team** — 🟡 **PAUSED**. Phase 2 complete, ждёт GSC данных 2-4 недели.

Pipeline работает АВТОНОМНО:
- Hermes (Mon-Fri 10:07) → пишет новые статьи
- Argus 2.0 (Sun 11:37) → 14 audits + 6 auto-fixes

**Что было сделано в ppc-landing 2026-05-16 от SEO работы:**
- 3 commercial JSON-LD schemas (home + pricing + blog index)
- 6 T1 critical blog articles refreshed (dateModified bumped, year 2025→2026)
- TypeScript clean, deployed via Vercel auto-deploy

Подробнее: [`/Users/vitaly/Vit+/projects/seo-agent-team/HANDOFF.md`](/Users/vitaly/Vit+/projects/seo-agent-team/HANDOFF.md)

---

## 🌍 Production URLs

| | URL | Статус |
|---|---|---|
| **Лендинг** | https://www.kampaio.com | ✅ HTTP 200 |
| **Dashboard** | https://www.kampaio.com/b6 | ✅ HTTP 200, отображает реальные Google Ads данные |
| **Backend API** | https://api.kampaio.com | ✅ HTTPS, valid LE cert (until Aug 10 2026) |
| **Health** | https://api.kampaio.com/health | ✅ `{"status":"ok","mock_mode":"false","model":"claude-sonnet-4-6","socketio":true}` |
| **Swagger UI** | https://api.kampaio.com/docs | ✅ 26 endpoints (22 + 4 OAuth) |
| **Socket.IO** | wss://api.kampaio.com/socket.io/ | ✅ Handshake OK |

## 🔌 Google Ads OAuth + Live Validation (2026-05-13)

| | |
|---|---|
| Developer Token | ✅ Basic Access (15K ops/day лимит) — Hetzner Customer ID K0514922126 |
| OAuth Client | ✅ `Kampaio OAuth Client` (Google Cloud project `Pyton`) |
| Redirect URIs | `https://api.kampaio.com/api/google-ads/oauth/callback` + `http://localhost:8000/...` для dev |
| Подключено аккаунтов | **33** (Vitaly's PPC client portfolio) |
| Активный для тестов | **`3133506664`** (Goodevas It — итальянский рынок) |
| Реальных кампаний видно | **10** (Pmax_Goodevas_It_*, SN_Goodevas_It_Brand, etc) |
| **Buzz live test** | ✅ **5 итераций, 9 tool calls** — list_campaigns + get_campaign_metrics + get_keyword_metrics + check_safety_cap + propose_pause_campaign |
| **Aegis live test** | ✅ **8 risk reviews, BLOCK 2 actions** на risk_score 82/100 (brand_campaign_pause + zero_roas_tracking_suspicion) |
| **Proposed actions в DB** | 5 реальных (по 22932954882 и 22934756086) + 3 rejected (2 старых mock + 1 user-rejected) |
| **Live theatre** | ✅ Socket.IO события визуально показывают каждый tool call в `/b6` |

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
| Что есть | 7 AI-агентов + multi-tier autonomy + live theatre + 26 endpoints + Docker prod stack + **Google Ads OAuth с реальными данными** + **Buzz/Aegis validated end-to-end на real client account** |
| Что НЕ сделано **в коде** | Multi-tenancy auth (single dev-user `dev-user-001`), live testing для Vox/Echo/Sage/Mira (по коду готовы), real Stripe live mode |
| Credentials в .env.prod | ✅ ANTHROPIC_API_KEY, ✅ GOOGLE_ADS_DEVELOPER_TOKEN, ✅ GOOGLE_CLIENT_ID, ✅ GOOGLE_CLIENT_SECRET |
| Mock-режим | ✅ `GOOGLE_ADS_USE_MOCK=false` — реальные Google Ads API calls |
| Vercel Production Branch | ✅ **Fixed** — теперь `v2-autonomous-agents` (был `main`). Auto-deploy на каждый push работает. |
| **Главный блокер value** | **Multi-tenancy** — 1 захардкоженный юзер `dev-user-001`. Нельзя онбордить реальных клиентов без ручного `INSERT INTO users`. |

---

## 📦 Состояние Git

**Ветка `v2-autonomous-agents` запушена в `origin`** (это production-ветка Vercel'а).

История Sprint 5 — Google Ads OAuth + Live Validation (~4 часа работы 2026-05-13):

```
beeb36d chore: trigger Vercel redeploy (latest commits queued)
580a6bd B6 docs: Sprint 5 refresh — Google Ads OAuth + real data
1f65c98 B6 fix: dashboard header — proper MOCK_CUSTOMER_ID name + dynamic mode label
86057b8 B6 feat: load Google Ads refresh_token from DB (not env var)
728d05f B6 feat: dashboard uses dynamic customer_id from connected accounts
f84e854 B6 fix: list_accessible_customers always calls real Google API
f9ae0f1 B6 feat: Google Ads OAuth flow (backend + frontend)
```

**Operational changes (not in git):**
- Hetzner server: `GOOGLE_ADS_USE_MOCK` flipped `true → false` в `.env.prod`
- Server DB: 33 GoogleAdsAccount rows inserted (via OAuth flow), 32 marked is_active=false, only `3133506664` is_active=true
- Server DB: 2 mock-leftover proposed actions marked as `rejected` (status update, not delete — audit_log FK preserved)
- Vercel: Production Branch changed from `main` → `v2-autonomous-agents`

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

Sprint 5 закрыт с live validation. Активные хвосты:

1. **Multi-tenancy + JWT auth** (1-2 дня) — главный блокер для платящих клиентов. Сейчас всё на `dev-user-001`. Без этого нельзя онбордить второго юзера без `INSERT INTO users` руками.

2. **Live test остальных агентов** (30-60 мин):
   - **Vox** (cross-campaign strategy) — посмотрит на все 10 Goodevas кампаний и переразложит бюджеты
   - **Echo** (weekly digest) — сгенерит саммари по реальным данным
   - **Sage** (research) — поищет новые keywords и аудитории для Pmax_Goodevas_It_All-Products
   - **Mira** (creative) — сгенерит 3 ad variants под одну реальную кампанию

3. **Старый долг Hetzner $5.09** на cancelled аккаунте `K0742311825`. Bank transfer на `IBAN DE47 7655 1540 0000 1758 02` (`BIC BYLADEM1GUN`). Не блокирует prod (новый аккаунт `K0514922126` отдельный), но если не закрыть — уйдёт в коллекторов.

4. **Косметические хвосты**: `<title>` в `src/app/layout.tsx` остался `"Kampaio - Digital Ecosystem"` от старого Kampaio v1 — нужно сменить.

---

## ⚠️ Открытые вопросы / Open Decisions

| # | Вопрос | Текущее решение / статус |
|---|--------|---------------------------|
| 1 | **Google Ads Developer Token** | ✅ Получен — Basic Access (15K ops/day), активен. Юзер может подключать любой реальный Google Ads аккаунт. |
| 2 | **Domain** | ✅ Решено — `kampaio.com` |
| 3 | **Production DB hosting** | ✅ Postgres 16-alpine в Docker на Hetzner CPX22 |
| 4 | **Mascot стиль** | Текущий emoji (🐝 🛡️ и т.д.) — рабочий, custom SVG только при масштабировании |
| 5 | **Claude model** | Sonnet 4.6 — оптимальный по цена/качество |
| 6 | **Multi-tenancy** | ⏳ Single dev-user-001. Sprint 6 = JWT auth + registration. |
| 7 | **Real Stripe live mode** | ⏳ Активируем при первом платящем клиенте |
| 8 | **Write operations в Google Ads** | ⏳ Сейчас все `update_bid`, `pause_campaign` идут в `dry_run=True`. Реальный apply активируется через explicit `apply_to_google_ads=true` параметр в `/api/actions/{id}/approve`. До Sprint 7 — не включаем. |

---

## 🚨 Критические замечания

### Anthropic API key (Sprint 1 leak — уже не актуально для prod)
В Sprint 1 пользователь случайно вставил dev Anthropic API key в чат. Этот же ключ сейчас в prod `.env.prod` (через SSH stdin transfer). В долгосрочной перспективе — ротейтнуть на чистый production-only ключ на https://console.anthropic.com/settings/keys.

### Google Ads Developer Token (Sprint 5 leak)
Developer token `N3foJOv65_q8B_rt0JsZiQ` был засвечен в чате когда юзер прислал скрин ads.google.com/aw/apicenter. Юзер сознательно решил не ротейтить — риск низкий (developer token бесполезен без OAuth refresh_token конкретного юзера). При желании можно сбросить через «Сбросить идентификатор» на той же странице, потом обновить значение в .env.prod через SSH stdin.

### Write operations dry_run by default
Все Buzz/Aegis предложения сейчас идут с `dry_run=True`. `update_bid` и `pause_campaign` в `services/google_ads_client.py` имеют `if use_mock() or dry_run: return mock` гард. Реальный apply требует explicit `apply_to_google_ads=true` параметр в `/api/actions/{id}/approve` endpoint — **никогда не делать default-true**.

### Single-tenant сейчас (главный блокер платящих клиентов)
Всё захардкожено на `dev-user-001`. Для **первых beta-юзеров** нужно либо:
- Создавать им отдельные `User` записи руками (`INSERT INTO users`)
- Или Sprint 6: JWT auth + registration UI (~1-2 дня работы)

---

## 🎯 Что попробовать в браузере

**В продакшене** (`https://www.kampaio.com`):
1. Открой лендинг — маскоты, pricing, waitlist
2. Submit свой email в waitlist → `Got you, position #N`
3. Открой `/b6` → dashboard загружает реальный Goodevas It аккаунт (3133506664):
   - Header: `Customer 3133506664 · prod data · N агентов · последний запуск: HH:MM:SS`
   - Google Ads подключён (1 аккаунт): 313-350-6664 USD (+ можно «Добавить ещё»)
   - 10 реальных кампаний (Pmax_Goodevas_It_*, SN_Goodevas_It_*, GDN_IT_REM_24-04)
   - 5 pending proposed actions с Aegis-бейджами (BLOCK 2, REVIEW 3)
4. Нажми **«🐝 Run Buzz now»** → live theatre показывает каждый tool call (list_campaigns, get_metrics, check_safety_cap, propose_*); после Buzz авто-запускается Aegis с risk reviews. ~90 секунд цикл.
5. В Approval Queue — посмотри Aegis flags: brand_campaign_pause, low_budget_vulnerability, conflicting_actions, zero_roas_tracking_suspicion (это уровень senior PPC analyst)
6. **НЕ нажимай Approve** без понимания — apply сейчас в dry_run, но при `apply_to_google_ads=true` пойдёт в реальный аккаунт клиента

**Локально (для разработки)**: см. секцию «Запустить локально (dev режим)» выше. Использует SQLite + GOOGLE_ADS_USE_MOCK=true.

---

## 🏃 Что делать в следующий раз (по приоритету)

### Если пользователь говорит «продолжаем» / «дальше»

**1. Sprint 6 — Multi-tenancy + JWT auth** (1-2 дня): главный блокер платящих клиентов.
- DB migration: `password_hash` уже есть в `User` model (col существует, но никто его не использует). Добавить email validation если нет.
- Backend endpoints: `POST /api/auth/register`, `POST /api/auth/login`, `GET /api/auth/me`. JWT middleware на все защищённые routes (`/api/agents/*`, `/api/google-ads/*`, etc.) — извлекает `user_id` из токена, заменяет hardcoded default `dev-user-001`.
- Frontend: `/register`, `/login` страницы + auth context + protected `/b6` route. Token в localStorage или httpOnly cookie.
- Data isolation: каждый юзер видит **только свои** GoogleAdsAccount / agent_actions / etc. — все queries фильтруют по `user_id` из JWT.

**2. Live test остальных агентов** (30-60 мин на каждый):
- **Vox**: `POST /api/agents/run` с `agent_type: "strategy"` — посмотрит на все 10 Goodevas кампаний, предложит budget reallocation
- **Echo**: `POST /api/digest/run` — weekly digest по реальным данным
- **Sage**: с `agent_type: "research"` + campaign_id 22932954882 — поищет keywords
- **Mira**: с `agent_type: "creative"` + campaign_id 22932954882 — сгенерит ad copy

**3. Marketing** (тексты готовы в [`LAUNCH-CONTENT.md`](./LAUNCH-CONTENT.md)):
- Twitter тред + Reddit r/PPC + LinkedIn + HN Show HN
- Сейчас есть **что показать** (скрины dashboard'а с real Goodevas данными)

**4. Финансовые/косметические хвосты**:
- Bank transfer $5.09 на IBAN `DE47 7655 1540 0000 1758 02` (Hetzner debt)
- Сменить `<title>` в `src/app/layout.tsx` (старый Kampaio брендинг)
- `npm audit fix` (18 уязвимостей в frontend deps)
- Monitoring (UptimeRobot бесплатно)

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
| **Sprint 5** (2026-05-13) | Google Ads OAuth flow + real API integration + live validation на Goodevas It | ~700 | ~4 часа |

**Total**: ~9,200 строк, ~29 часов продуктивной работы. **B6 — реальный SaaS продукт на реальных Google Ads данных.**

Подробнее → [`CHANGELOG.md`](./CHANGELOG.md).
