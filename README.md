# B6 — Autonomous PPC Cabinet

> 🐝🛡️📊🦊🐻🎨🦉
> **Your PPC agency. In a cabinet.**
> AI agents that manage your Google Ads autonomously — bidding, budget, creative, reporting.

[![Built with Claude](https://img.shields.io/badge/Built%20with-Claude%20Sonnet%204.6-FF8E53)](https://www.anthropic.com)
[![Next.js](https://img.shields.io/badge/Next.js-15.5-black)](https://nextjs.org)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.104-009688)](https://fastapi.tiangolo.com)
[![Status](https://img.shields.io/badge/Status-Live%20in%20Production-brightgreen)](https://www.kampaio.com)

🌍 **Live at**: [https://www.kampaio.com](https://www.kampaio.com) · API: `https://api.kampaio.com`

---

## 🚀 Что это

B6 — это **multi-agent AI-агентство** для управления Google Ads кампаниями. Вместо одного generic AI-чата у нас **команда из 7 специалистов**, каждый со своей ролью, маскотом и логикой принятия решений.

Пользователь подключает Google Ads, выбирает уровень автономности (L1 Co-pilot / L2 Approval / L3 Autonomous), и наблюдает в **real-time** как агенты работают — с маскотами, speech bubbles, и audit trail.

### Цена
- **L1 Co-pilot** — $99/мес — AI предлагает, ты апруваешь каждое действие
- **L2 Approval** — $199/мес — auto-apply безопасных, апрув на крупные
- **L3 Autonomous** — $399/мес — полная автономия, эскалация только рисков

---

## 🤖 Команда AI-агентов

| Маскот | Имя | Роль |
|--------|-----|------|
| 🐝 | **Buzz** | Bidding — корректирует ставки по перформансу |
| 🛡️ | **Aegis** | Risk review — ревьюит Buzz и блокирует опасные решения |
| 📊 | **Echo** | Reporting — weekly digest с конкретными советами |
| 🦊 | **Vox** | Strategy — cross-campaign budget reallocation |
| 🐻 | **Maximus** | Orchestrator — auto-approve по правилам autonomy level |
| 🎨 | **Mira** | Creative — генерация ad copy + image prompts |
| 🦉 | **Sage** | Research — поиск новых ключей и аудиторий |

Каждый агент построен на **Claude Sonnet 4.6** через нативный `anthropic` SDK с custom tool-use loop. Все решения логируются в immutable audit log с reasoning.

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
│   ├── agents/                 # 7 AI агентов
│   │   ├── base.py             # base agent loop (tool_use)
│   │   ├── bidding_agent.py    # 🐝 Buzz
│   │   ├── risk_agent.py       # 🛡️ Aegis
│   │   ├── reporting_agent.py  # 📊 Echo
│   │   ├── strategy_agent.py   # 🦊 Vox
│   │   ├── orchestrator.py     # 🐻 Maximus (rules engine)
│   │   ├── creative_agent.py   # 🎨 Mira
│   │   ├── research_agent.py   # 🦉 Sage
│   │   └── tools.py            # shared tool definitions
│   ├── services/               # внешние интеграции
│   │   ├── google_ads_client.py
│   │   ├── audit.py
│   │   ├── emailer.py          # Resend wrapper
│   │   └── image_gen.py        # fal.ai wrapper
│   ├── routers/                # HTTP routes (FastAPI)
│   ├── db/                     # SQLAlchemy models + migrations
│   ├── ws/                     # Socket.IO server
│   ├── app.py                  # B6 FastAPI app
│   ├── main.py                 # legacy Kampaio v1 (preserved)
│   └── Dockerfile.b6           # production image
├── src/                        # Next.js frontend
│   ├── app/
│   │   ├── b6/page.tsx         # main dashboard
│   │   ├── page.tsx            # landing
│   │   └── api/                # Next.js API routes (incl. stripe-webhook)
│   ├── components/b6/          # 15 B6 components
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

## 📊 HTTP API (22 endpoints)

Основные:
- `GET /health` — health check
- `POST /api/agents/run` — запустить агента (bidding | strategy | creative | research)
- `GET /api/agents` — список агентов пользователя
- `GET /api/actions?status=proposed` — pending actions
- `POST /api/actions/{id}/approve` — апрув + dry-run apply
- `POST /api/actions/{id}/reject` — отклонение
- `GET /api/campaigns?customer_id=X` — кампании с метриками
- `POST /api/orchestrator/cycle` — Maximus autonomy cycle
- `POST /api/digest/run` — Echo weekly digest
- `POST /api/waitlist/signup` — waitlist + welcome email
- Socket.IO `/socket.io/` — real-time events stream

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

Текущий статус: **🚀 Live в production с реальными Google Ads данными** на [https://www.kampaio.com](https://www.kampaio.com).

Что закрыто:
- ✅ Production deploy (Vercel + Hetzner CPX22)
- ✅ ANTHROPIC_API_KEY активирован → AI-агенты отвечают
- ✅ **Google Ads OAuth flow построен** → 33 реальных аккаунта подключены, GOOGLE_ADS_USE_MOCK=false
- ✅ Backend читает реальные campaigns из Google Ads API

Следующие вехи:
- ⏳ **Тестирование Buzz/Aegis** на реальном аккаунте (готовы по коду, ждут безопасный тест)
- ⏳ **Multi-tenancy + auth** — сейчас single dev-user-001, нельзя онбордить клиентов без ручного INSERT
- ⏳ **First 30 beta users** через waitlist
- ⏳ **Google Ads Standard Access** (запросить когда дорастём до 100+ юзеров, сейчас Basic = 15K ops/day)
- ⏳ **Real Stripe billing** (test mode → live при первом платящем)

---

## 🤝 Built with

Built solo by [vitali-ppc](https://github.com/vitali-ppc) using **Claude Code** за ~28 часов работы (Sprint 1 → 5).

~9,000 строк production кода. 26 HTTP endpoints. 7 AI-агентов. OAuth интеграция с Google Ads. Docker production stack live на Hetzner + Vercel.

---

## 📝 License

Private project. Copyright © 2026 vitali-ppc. All rights reserved.

В будущем — рассматривается open-sourcing agent framework как separate package.
