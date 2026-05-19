# B6 — Autonomous PPC Cabinet

> 🐝🛡️📊🦊🐻🎨🦉🦇
> **Your PPC agency. In a cabinet.**
> AI agents that manage your Google Ads autonomously — bidding, budget, creative, reporting, **and 24/7 anomaly monitoring**.

[![Built with Claude](https://img.shields.io/badge/Built%20with-Claude%20Sonnet%204.6-FF8E53)](https://www.anthropic.com)
[![Next.js](https://img.shields.io/badge/Next.js-15.5-black)](https://nextjs.org)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.104-009688)](https://fastapi.tiangolo.com)
[![Status](https://img.shields.io/badge/Status-Live%20in%20Production-brightgreen)](https://www.kampaio.com)

🌍 **Live at**: [https://www.kampaio.com](https://www.kampaio.com) · API: `https://api.kampaio.com`

---

## 🚀 Что это

B6 — это **multi-agent AI-агентство** для управления Google Ads кампаниями. Вместо одного generic AI-чата у нас **команда из 8 специалистов**, каждый со своей ролью, маскотом и логикой принятия решений. Семь из них работают по запросу пользователя, восьмой (🦇 Vigil) — круглосуточно сам, без участия юзера.

Пользователь подключает Google Ads, выбирает уровень автономности (L1 Co-pilot / L2 Approval / L3 Autonomous), и наблюдает в **real-time** как агенты работают — с маскотами, speech bubbles, и audit trail.

### Цена
- **L1 Co-pilot** — $99/мес — AI предлагает, ты апруваешь каждое действие
- **L2 Approval** — $199/мес — auto-apply безопасных + **24/7 Vigil monitoring + email alerts**
- **L3 Autonomous** — $399/мес — полная автономия, эскалация только рисков

---

## 🤖 Команда AI-агентов

| Маскот | Имя | Роль |
|--------|-----|------|
| 🐝 | **Buzz** | Bidding — корректирует ставки + применяет Google recommendations |
| 🛡️ | **Aegis** | Risk review — ревьюит Buzz/Vox/Sage/Vigil, блокирует опасные решения и false-positive алерты |
| 📊 | **Echo** | Reporting — weekly digest + клиентский PDF + email |
| 🦊 | **Vox** | Strategy — cross-campaign budget reallocation |
| 🐻 | **Maximus** | Orchestrator — auto-approve по правилам autonomy level (L1/L2/L3) |
| 🎨 | **Mira** | Creative — генерация ad copy + image prompts |
| 🦉 | **Sage** | Research — поиск новых ключей, аудиторий и junk search terms → negative keywords |
| 🦇 | **Vigil** | **24/7 anomaly monitoring** — APScheduler каждые 60 мин сам сканирует все аккаунты, 5 типов аномалий (spend spike / conversion drop / CTR collapse / ROAS drop / zero conversions), email digest на critical |

Каждый агент построен на **Claude Sonnet 4.6** через нативный `anthropic` SDK с custom tool-use loop. **Vigil** — hybrid Python + LLM: детекция через детерминированные ratio'ы и пороги (быстро, бесплатно), LLM-судья только для классификации severity в контексте и текста алерта. Все решения логируются в immutable audit log с reasoning.

---

## 🏗️ Архитектура

```
┌──────────────────────────┐     ┌──────────────────────────┐
│ Frontend (Vercel)        │     │ Backend (Hetzner)        │
│ Next.js 15 + TypeScript  │◄───►│ FastAPI + Socket.IO      │
│ Framer Motion (mascots)  │ WS  │ Claude API (agents)      │
│ Tailwind v4              │     │ Postgres + Redis         │
└──────────────────────────┘     │ Caddy (auto-HTTPS)       │
                                 └──────────────────────────┘
       kampaio.com                   api.kampaio.com
```

### Stack details
- **Frontend**: Next.js 15 / React 19 / TypeScript 5.8 / Tailwind v4 / Framer Motion 12 / socket.io-client
- **Backend**: FastAPI 0.104 / Python 3.9+ / SQLAlchemy 2 / Alembic / python-socketio / anthropic SDK
- **LLM**: Claude Sonnet 4.6 (по умолчанию, переключаемо)
- **Database**: SQLite в dev / Postgres 16 в prod
- **Cache**: Redis 7 (для будущего Celery)
- **Real-time**: Socket.IO (REST + WS на одном порту)
- **Payments**: Stripe (subscriptions L1/L2/L3)
- **Email**: Resend (welcome + weekly digest)
- **Image gen** (Mira): fal.ai / Flux
- **Hosting**: Vercel Hobby (`www.kampaio.com`) + Hetzner CPX22 ($9.49/mo, Nuremberg, Ubuntu 24.04) для `api.kampaio.com`
- **Container**: Docker compose с Postgres + Redis + B6 API + Caddy
- **CI**: Pre-commit checks через standard tooling

---

## 📦 Структура проекта

```
ppc-landing/
├── ai-server/                  # Python backend
│   ├── agents/                 # 8 AI агентов
│   │   ├── base.py             # base agent loop (tool_use)
│   │   ├── bidding_agent.py    # 🐝 Buzz
│   │   ├── risk_agent.py       # 🛡️ Aegis
│   │   ├── reporting_agent.py  # 📊 Echo
│   │   ├── strategy_agent.py   # 🦊 Vox
│   │   ├── orchestrator.py     # 🐻 Maximus (rules engine)
│   │   ├── creative_agent.py   # 🎨 Mira
│   │   ├── research_agent.py   # 🦉 Sage
│   │   ├── anomaly_agent.py    # 🦇 Vigil (Sprint 8)
│   │   └── tools.py            # shared tool definitions
│   ├── services/               # внешние интеграции + background workers
│   │   ├── google_ads_client.py
│   │   ├── audit.py
│   │   ├── emailer.py          # Resend wrapper
│   │   ├── image_gen.py        # fal.ai wrapper
│   │   ├── anomaly_detector.py # Sprint 8 — pure-Python 5 detection rules
│   │   ├── vigil_scheduler.py  # Sprint 8 — APScheduler 24/7 cron
│   │   ├── vigil_notifier.py   # Sprint 8 — critical email digest
│   │   └── vigil_settings.py   # Sprint 8 — per-user enable + min_severity
│   ├── routers/                # HTTP routes (FastAPI)
│   │   ├── agents.py
│   │   ├── actions.py
│   │   ├── anomalies.py        # Sprint 8 — /api/anomalies/{recent,ack,dismiss,settings}
│   │   ├── auth.py
│   │   ├── campaigns.py
│   │   ├── digest.py
│   │   ├── google_ads.py
│   │   ├── internal.py
│   │   ├── orchestrator.py
│   │   └── waitlist.py
│   ├── db/                     # SQLAlchemy models + Alembic migrations
│   ├── ws/                     # Socket.IO server
│   ├── app.py                  # B6 FastAPI + lifespan handler для Vigil scheduler
│   ├── main.py                 # legacy Kampaio v1 (preserved)
│   ├── scripts/smoke_test_vigil.py  # Sprint 8 — 3-layer smoke
│   └── Dockerfile.b6           # production image
├── src/                        # Next.js frontend
│   ├── app/
│   │   ├── b6/                 # main dashboard (B6Content.tsx)
│   │   ├── page.tsx            # landing
│   │   └── api/                # Next.js API routes (incl. stripe-webhook)
│   ├── components/b6/          # 16 B6 components (incl. VigilPanel)
│   └── lib/
│       ├── b6-api.ts           # typed API client
│       └── b6-socket.ts        # Socket.IO client + hook
├── docker-compose.prod.yml     # full production stack
├── Caddyfile                   # reverse proxy + auto-HTTPS
├── .env.prod.example           # production env template
├── scripts/smoke-prod.sh       # 8-check production smoke test
├── CLAUDE.md                   # rules for Claude Code sessions
├── HANDOFF.md                  # current state + roadmap
├── DEPLOY.md                   # full deployment guide
├── LAUNCH.md                   # 2-hour quickstart
└── LAUNCH-CONTENT.md           # social media launch kit
```

---

## 🛠️ Локальная разработка

### Prerequisites
- Python 3.9+ (3.11 рекомендуется для prod-совместимости)
- Node.js 18+
- (Опционально) Docker + Docker Compose для full stack

### Backend setup
```bash
cd ai-server
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# Создай .env с минимальным:
echo "ANTHROPIC_API_KEY=sk-ant-..." > .env
echo "GOOGLE_ADS_USE_MOCK=true" >> .env
echo "DATABASE_URL=sqlite:///./b6_dev.db" >> .env

# Применить миграции
alembic upgrade head

# Сидинг dev-юзера
python scripts/seed_dev.py

# Запуск
uvicorn app:socket_app --port 8000 --reload
```

### Frontend setup
```bash
npm install
npm run dev  # порт 3002
```

### Открой
- Landing: http://localhost:3002
- Dashboard: http://localhost:3002/b6
- API docs: http://localhost:8000/docs

### Smoke test одного агента (без UI)
```bash
cd ai-server
GOOGLE_ADS_USE_MOCK=true python scripts/smoke_test_bidding_agent.py
```

---

## 🚀 Production deployment

См. [`LAUNCH.md`](./LAUNCH.md) — 2-часовая инструкция шаг за шагом.

Полный технический мануал → [`DEPLOY.md`](./DEPLOY.md).

```bash
# На Hetzner VPS:
git clone https://github.com/vitali-ppc/ppc-landing.git
cd ppc-landing && git checkout v2-autonomous-agents
cp .env.prod.example .env.prod
nano .env.prod  # заполни секреты
docker compose -f docker-compose.prod.yml --env-file .env.prod up -d

# Smoke test после deploy:
API_BASE=https://api.kampaio.com FRONTEND=https://kampaio.com \
  ./scripts/smoke-prod.sh
```

---

## 📊 HTTP API (30+ endpoints)

Основные:
- `GET /health` — health check (включая `vigil.scheduler_status`)
- `POST /api/auth/{register,login}` + `GET /api/auth/me` — JWT auth (Sprint 6)
- `POST /api/agents/run` — запустить агента (`bidding | strategy | creative | research | anomaly`)
- `GET /api/agents` — список агентов пользователя
- `GET /api/actions?status=proposed` — pending actions
- `POST /api/actions/{id}/approve` — апрув + опциональный `apply_to_google_ads=true` (Sprint 7)
- `POST /api/actions/{id}/reject`
- `GET /api/campaigns?customer_id=X` — кампании с метриками
- `POST /api/orchestrator/cycle` — Maximus autonomy cycle
- `POST /api/digest/run` + `GET /api/digest/latest/pdf` + `POST /api/digest/latest/email` — Echo client report
- **Sprint 8**: `GET /api/anomalies/recent` — Vigil alert feed
- **Sprint 8**: `POST /api/anomalies/{id}/{acknowledge,dismiss}`
- **Sprint 8**: `GET/PATCH /api/anomalies/settings` — per-user Vigil prefs
- **Sprint 8**: `POST /api/internal/vigil/tick` — manual scheduler tick (ops)
- `GET /api/google-ads/oauth/start` + `/callback` — OAuth onboarding
- `GET /api/google-ads/accounts` + `DELETE /api/google-ads/accounts/{id}` — connection management
- `POST /api/waitlist/signup` — waitlist + welcome email
- Socket.IO `/socket.io/` — real-time events stream (JWT-authenticated, per-user room)

Full OpenAPI spec → `http://localhost:8000/docs` после запуска.

---

## 🎬 Live theatre — фирменная фича

В `/b6` дашборде маскоты **физически двигаются** по экрану в зависимости от того что делает агент:

- Когда Buzz зовёт `get_campaign_metrics(campaign_id=100001)` → 🐝 **летит к карточке** этой кампании
- Speech bubble показывает текущее действие («читаю метрики», «предлагаю поднять ставку»)
- При `agent.done` → маскот отлетает в idle с лёгким bounce

Это **не gimmick** — это **trust-building механизм**. Юзер видит **что** AI делает и **почему**, не пустой spinning loader.

Реализовано через `MascotLayer.tsx` + Framer Motion spring physics + DOM positioning через `[data-campaign-id]` атрибуты.

---

## 🔐 Безопасность

- `.env` файлы **в .gitignore** — секреты никогда не в репо
- **Aegis review** — двухуровневая проверка перед auto-apply
- **Safety caps** в БД — hard limits на bid changes / daily spend / actions per hour
- **Audit log** — immutable trail каждого решения
- **Dry-run by default** для всех write-операций в Google Ads
- **L1 mode по умолчанию** для новых юзеров — никаких авто-действий пока юзер не разрешит

---

## 📚 Документация

| Файл | Для чего |
|------|----------|
| [`README.md`](./README.md) | Этот файл — общий обзор |
| [`CLAUDE.md`](./CLAUDE.md) | Правила проекта для Claude Code сессий |
| [`HANDOFF.md`](./HANDOFF.md) | Текущее состояние, что сделано, что в работе |
| [`LAUNCH.md`](./LAUNCH.md) | 2-часовая инструкция запуска в production |
| [`DEPLOY.md`](./DEPLOY.md) | Полный технический deployment manual |
| [`LAUNCH-CONTENT.md`](./LAUNCH-CONTENT.md) | Готовые тексты для Twitter/Reddit/HN/LinkedIn |
| [`CHANGELOG.md`](./CHANGELOG.md) | История версий и Sprint'ов |
| [`ARCHITECTURE.md`](./ARCHITECTURE.md) | Подробная архитектура системы |

---

## 🎯 Roadmap

Текущий статус: **🚀 Live в production**, Sprint 1-8 done, готов к первому платящему L2/L3.

Что закрыто:
- ✅ Production deploy (Vercel + Hetzner CPX22)
- ✅ Google Ads OAuth flow → 33 реальных аккаунта подключены
- ✅ Backend читает реальные campaigns (GOOGLE_ADS_USE_MOCK=false)
- ✅ **Live validation**: Buzz 5 итераций / 9 tool calls на реальных Goodevas данных, Aegis BLOCK 2 actions на risk_score 82
- ✅ **Sprint 6** — Multi-tenancy + JWT auth (bcrypt + HS256, 7-day TTL), все 6 protected routers переведены с hardcoded user
- ✅ **Sprint 7** — Real apply для `pause_campaign` через `campaigns:mutate`, daily safety cap 5 applies/customer/24h, UI checkbox + confirm dialog
- ✅ **v24 migration Phase 1/2/3/8** — Google Ads API v20 → v24, RecommendationService (Buzz/Vox потребляют Google's own recs), SearchTermView → negative keywords (Sage), Echo client-facing PDF + email
- ✅ **Sprint 8 — Vigil 🦇 24/7 anomaly monitoring** — APScheduler + 5 detection rules + Aegis review для anomaly_alerts + UI panel + per-user settings + email digest (mock-mode)

Следующие вехи:
- ⏳ **Enable Vigil on prod** (~10 мин ops): `git push` + SSH + `VIGIL_ENABLED=true`
- ⏳ **Resend setup** (~30 мин): DNS + verify + API key → реальная доставка PDF + critical alerts
- ⏳ **Sprint 9 — Maximus L3 aggressive auto-apply + auto-pause на critical anomaly** (~15ч) — замыкает цикл "Vigil detects → Maximus acts"
- ⏳ **First 30 beta users** через waitlist
- ⏳ Real Stripe billing (test mode → live при первом платящем)
- ⏳ Google Ads Standard Access (запросить когда дорастём до 100+ юзеров, сейчас Basic = 15K ops/day)

---

## 🤝 Built with

Built solo by [vitali-ppc](https://github.com/vitali-ppc) using **Claude Code** через Sprint 1 → 8.

**~12,000+ строк production кода**. **30+ HTTP endpoints**. **8 AI-агентов** включая 24/7 anomaly monitor. OAuth интеграция с Google Ads. Multi-tenant JWT auth. Real Google Ads writes для 3 типов действий с safety caps. Live validated на реальном клиентском аккаунте.

---

## 📝 License

Private project. Copyright © 2026 vitali-ppc. All rights reserved.

В будущем — рассматривается open-sourcing agent framework как separate package.
