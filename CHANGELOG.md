# Changelog

История изменений B6 — Autonomous PPC Cabinet.

Формат: версии по Sprint'ам. Каждая запись — что добавлено/изменено/исправлено.

---

## [Sprint 3] — 2026-05-12 — Launch prep + documentation refresh

### Added
- `LAUNCH.md` — 2-часовая инструкция деплоя (Hetzner + DNS + Stripe + Resend + Vercel)
- `LAUNCH-CONTENT.md` — готовые тексты для соцсетей (Twitter тред, Reddit, LinkedIn, HN, Product Hunt)
- `scripts/smoke-prod.sh` — 8-check production smoke test
- `CHANGELOG.md` — этот файл
- `ARCHITECTURE.md` — system diagrams + tech stack
- Полный rewrite `README.md` — B6-focused public overview

### Changed
- `HANDOFF.md` — полное обновление с текущим состоянием (4 коммита локально, 7 агентов LIVE)
- `CLAUDE.md` — refresh под finalized stack
- Лazy-init Resend в `src/app/api/register/route.ts` и `send-reset-email/route.ts` — иначе production build падал без `RESEND_API_KEY`

### Fixed
- Duplicate import `CampaignFromAPI` в `src/app/b6/page.tsx` — блокировал `npm run build`
- `.gitignore` теперь исключает `.claude/`, `.env.prod`, dev DBs, sent_emails.jsonl

### Verified
- ✅ `npm run build` — production frontend компилируется чисто (22 routes + 1000+ programmatic blog pages)
- ✅ Postgres compatibility — `_to_async_url()` корректно конвертирует SQLite/Postgres URLs
- ✅ DDL preview для Postgres dialect валиден для всех 7 таблиц

### Git
- 4 чистых коммита в `v2-autonomous-agents`:
  - `d8873de` — B6 backend: agents + DB + services + Socket.IO
  - `59442b1` — B6 backend: HTTP routers + new app.py
  - `c22bcdf` — B6 frontend: dashboard /b6 + new landing + Stripe webhook
  - `528590f` — B6 production prep: Docker + Caddy + docs + launch kit

---

## [Sprint 2.5] — 2026-05-12 — Sage (Research Agent)

### Added
- 🦉 **Sage** — 7-й (финальный по плану) AI-агент
- `agents/research_agent.py` — keyword + audience research
  - Tools: `propose_keyword`, `propose_audience`, `finalize_research`
  - Группирует ключи по themes (product-feature / urgency / lifestyle / informational)
  - Указывает match_type (EXACT/PHRASE/BROAD) + estimated_intent (commercial/info/nav)
- `routers/agents.py` — поддержка `agent_type: "research"` (требует `campaign_id`)
- `src/components/b6/SagePanel.tsx` — UI:
  - Селектор кампании
  - 2-колоночный layout: keywords (grouped by theme) + audiences
  - Цвет border по match_type (EXACT=teal, PHRASE=blue, BROAD=orange)
  - Иконки по intent (💰/📚/🎯)

### Verified
- E2E: Sage предложил **9 ключей** + **3 аудитории** за 127с для Winter Shoes Promo кампании
- Особенно умное наблюдение: «закрыть мужской сегмент `snow boots men waterproof`»

---

## [Sprint 2.4] — 2026-05-12 — Mira (Creative Agent)

### Added
- 🎨 **Mira** — 6-й AI-агент
- `services/image_gen.py` — fal.ai (Flux model) wrapper с picsum fallback в dev
- `agents/creative_agent.py` — генерация 3 вариантов ad copy:
  - Headline 1 (≤30 символов) + Headline 2 (≤30 символов) + Description (≤90 символов)
  - Image prompt для display ad
  - Rationale на основе данных кампании (ключи, ROAS, стратегия)
- `routers/agents.py` — поддержка `agent_type: "creative"`
- `src/components/b6/MiraPanel.tsx` — UI:
  - Селектор кампании
  - 3 карточки с Google Ads-style preview
  - Image + Headline + Description + Why

### Verified
- E2E: Mira создала 3 разных угла (Warmth & Function / Urgency & Season / Premium Value) с reasoning на основе ROAS+keywords за 60 сек

---

## [Sprint 2.3] — 2026-05-12 — Maximus (Orchestrator)

### Added
- 🐻 **Maximus** — 5-й AI-агент (deterministic rules engine, не Claude-агент)
- `agents/orchestrator.py` — применяет правила autonomy:
  - **L0/L1**: 0 auto-approve (всё через ручной апрув)
  - **L2**: auto-approve если Aegis="approve" + confidence ≥ 0.8
  - **L3**: auto-approve если Aegis ∈ {"approve","review"} + confidence ≥ 0.85
  - **block** от Aegis — никогда не апрувим даже на L3
- `routers/orchestrator.py` — 3 endpoints:
  - `POST /api/orchestrator/cycle` — запустить cycle
  - `GET /api/orchestrator/latest` — последний результат
  - `POST /api/orchestrator/autonomy` — сменить уровень
- `src/components/b6/MaximusPanel.tsx` — UI с 4 кнопками L0/L1/L2/L3 + результат

### Changed
- Pricing tiers теперь имеют **функциональное** отличие, а не просто разные цены

### Verified
- E2E проверен на L1/L2/L3: 0 / 0 / 1 auto-approve (correct по правилам)

---

## [Sprint 2.2] — 2026-05-12 — Vox (Strategy Agent)

### Added
- 🦊 **Vox** — 4-й AI-агент (cross-campaign budget reallocation)
- `agents/strategy_agent.py`:
  - Видит **все кампании** одновременно (vs Buzz — одну)
  - Tool `propose_budget_shift` с zero-sum check (delta_micros)
  - Tool `submit_no_action` если ничего менять не нужно
- `routers/agents.py` — поддержка `agent_type: "strategy"`

### Changed
- `services/google_ads_client.py` mock-данные обновлены — теперь **разная ROAS** (5.88 / 2.10 / 1.40) — чтобы Vox имел что перераспределять

### Verified
- E2E: Vox сделал zero-sum реалокацию ($+10 / -$4 / -$6 = 0), Aegis отревьюил включая overspend warning

---

## [Sprint 2.1] — 2026-05-12 — Echo (Reporting Agent) + Email infra

### Added
- 📊 **Echo** — 3-й AI-агент (weekly digest)
- `services/emailer.py` — Resend wrapper с mock-режимом
- `agents/reporting_agent.py`:
  - Анализирует agent_actions + audit_log за период
  - Tools: `submit_digest` (один раз с полным summary)
  - Output: summary_text + top_decisions + advice
- `routers/digest.py` — `POST /api/digest/run` + `GET /api/digest/latest`
- Welcome email в `routers/waitlist.py` при signup (auto-send via Resend)
- `src/components/b6/DigestPanel.tsx` — UI с кнопкой Generate + советом

### Notes
- В dev `RESEND_API_KEY` placeholder → emails логируются в `sent_emails.jsonl`
- Real Resend активируется при production key (`re_...` >20 символов)

---

## [Sprint 1.6 / Day 7] — 2026-05-12 — Production prep

### Added
- `docker-compose.prod.yml` — Postgres 16 + Redis 7 + B6 API + Caddy
- `ai-server/Dockerfile.b6` — Python 3.11 production image, non-root, healthcheck
- `Caddyfile` — auto-HTTPS + WebSocket upgrade support
- `.env.prod.example` — все production env vars
- `routers/waitlist.py` — `/api/waitlist/signup` + `/stats` (отдельная SQLite БД)
- `routers/internal.py` — `/api/internal/stripe-sync` для server-to-server
- `src/app/api/stripe-webhook/route.ts` — handler для Stripe events
- New `src/app/page.tsx` — landing (Hero + How + Team + Pricing + CTA + Footer)
- Legacy preserved as `src/app/page.kampaio-legacy.tsx.bak`

---

## [Sprint 1.5 / Day 6] — 2026-05-12 — Mascot animations

### Added
- `src/components/b6/MascotLayer.tsx` — overlay с маскотами
- Framer Motion spring physics для smooth transitions
- DOM position tracking через `[data-campaign-id]` атрибуты
- Speech bubbles с текущим действием агента

### Changed
- `CampaignCard.tsx` — добавлен `data-campaign-id` + glow при highlighted
- `BaseAgent.max_tokens`: 4096 → 8192 (фикс Aegis при множестве pending actions)

---

## [Sprint 1.4 / Day 5] — 2026-05-12 — Campaigns API + dashboard polish

### Added
- `routers/campaigns.py` — `GET /api/campaigns?customer_id=X` (с 30с кешем)
- `listCampaigns()` в API client
- **Active campaign highlight** — карточка светится cyan когда Buzz её обрабатывает (DOM ↔ live event integration)
- Stats bar расширен до 6 ячеек (+ 🛡️ Blocks + 🛡️ High-risk)

### Changed
- Dashboard тянет кампании из backend (вместо hardcoded `MOCK_CAMPAIGNS`)

---

## [Sprint 1.3 / Day 4] — 2026-05-12 — Aegis + Socket.IO

### Added
- 🛡️ **Aegis** — 2-й AI-агент (risk review)
- `agents/risk_agent.py` — рецензирует proposed actions от других агентов
- Auto-run Aegis после Buzz/Vox в `/api/agents/run`
- `ws/events.py` — Socket.IO ASGI server, mount в FastAPI
- `socket_app` (вместо `app`) как entry point
- `src/lib/b6-socket.ts` — socket.io-client + `useB6Events` hook
- `src/components/b6/LiveEventStream.tsx` — real-time event log
- `src/components/b6/AegisBadge.tsx` — risk score UI

---

## [Sprint 1.2 / Day 3] — 2026-05-12 — Frontend dashboard

### Added
- `src/lib/b6-api.ts` — typed API client
- `src/app/b6/page.tsx` — главный dashboard (route `/b6`)
- 4 базовых компонента:
  - `CampaignCard.tsx`
  - `ActivityFeed.tsx`
  - `ApprovalQueue.tsx`
  - `RunBuzzButton.tsx`

### Setup
- `npm install` — добавлен socket.io-client
- CORS настроен (frontend localhost:3002 → backend localhost:8000)

---

## [Sprint 1.1 / Day 2] — 2026-05-12 — Persistence + HTTP API

### Added
- `services/audit.py` — proposed/approved/applied lifecycle + immutable audit log
- `scripts/seed_dev.py` — создаёт `dev-user-001` + safety_caps по умолчанию
- `routers/agents.py` — `POST /api/agents/run`, `GET /api/agents`, pause/resume
- `routers/actions.py` — GET list, GET single, POST approve/reject
- `app.py` — новое FastAPI приложение (отдельно от legacy `main.py`)

### Verified
- E2E test через curl: run → list → approve → reject

---

## [Sprint 1.0 / Day 1] — 2026-05-12 — Buzz foundation

### Added
- 🐝 **Buzz** — первый AI-агент (bidding)
- Python venv setup, SDK installs (anthropic, sqlalchemy, alembic, python-socketio, greenlet)
- SQLAlchemy модели (7 таблиц): users, google_ads_accounts, agents, agent_actions, audit_log, safety_caps, activity_events
- Alembic migrations
- `services/google_ads_client.py` — Google Ads API client с mock-режимом
- `agents/base.py` — base agent loop (anthropic Messages API + tool_use)
- `agents/bidding_agent.py` — Buzz
- `agents/tools.py` — Python функции для агентов

### Verified
- Smoke test: Buzz сделал 5 итераций, предложил 3 действия за ~12 сек

---

## Pre-Sprint — Discovery

### Context
- Старый Kampaio v1 (AI chatbot for Google Ads) был на ветке `main`
- Решение: эволюция в **multi-agent AI agency** (B6) вместо очередного chat-tool
- Создана архивная ветка `archive/kampaio-v1` со снимком старого
- Создана рабочая ветка `v2-autonomous-agents`
- План: `/Users/vitaly/.claude/plans/noble-waddling-sparkle.md`
