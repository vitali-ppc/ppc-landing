# B6 — Architecture

Подробный технический разбор системы. Полезно когда: новый разработчик заходит, или Claude возвращается через 3 недели и хочет вспомнить «как тут всё устроено».

## High-level картина

```
┌─────────────────────────────────────────────────────────────────────┐
│                          USER                                       │
│                            │                                        │
│                            ▼                                        │
│              ┌───────────────────────────┐                          │
│              │   https://www.kampaio.com │                          │
│              │   (Vercel, Next.js 15.5)  │                          │
│              └─────────────┬─────────────┘                          │
│                            │  HTTPS + WSS (Socket.IO)               │
│                            ▼                                        │
│         ┌────────────────────────────────────┐                      │
│         │  https://api.kampaio.com           │                      │
│         │  (Caddy reverse proxy + Let's Enc) │                      │
│         └─────────────┬──────────────────────┘                      │
│                       │                                             │
│                       ▼ HTTP                                        │
│        ┌──────────────────────────────────────┐                     │
│        │  Hetzner CPX22 (178.104.124.150)      │                    │
│        │  Ubuntu 24.04, Nuremberg              │                    │
│        │                                       │                    │
│        │   ┌──────────────────────────────┐    │                    │
│        │   │     b6-api (FastAPI)         │◄───┼─── Socket.IO       │
│        │   │     Python 3.11              │    │                    │
│        │   │     uvicorn:8000             │    │                    │
│        │   └────┬─────────────┬───────────┘    │                    │
│        │        │             │                │                    │
│        │        ▼             ▼                │                    │
│        │   ┌──────────┐  ┌──────────┐          │                    │
│        │   │ Postgres │  │  Redis   │          │                    │
│        │   │   :5432  │  │   :6379  │          │                    │
│        │   └──────────┘  └──────────┘          │                    │
│        └──────────────────────────────────────┘                     │
│                       │                                             │
│                       │ (исходящие запросы)                         │
│                       ▼                                             │
│      ┌──────────────────────────────────────┐                       │
│      │  External APIs                       │                       │
│      │  • Anthropic Claude API              │                       │
│      │  • Google Ads API v20                │                       │
│      │  • fal.ai (Flux image gen)           │                       │
│      │  • Resend (email)                    │                       │
│      │  • Stripe (subscriptions)            │                       │
│      └──────────────────────────────────────┘                       │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Frontend (Next.js 15 on Vercel)

### Routes
- `/` — публичный landing (`src/app/page.tsx`)
  - Hero + How it works + Meet the team + Pricing + CTA + Footer
  - Waitlist form → POST к backend `/api/waitlist/signup`
- `/b6` — main dashboard (`src/app/b6/page.tsx`)
  - **Только для авторизованных** (пока — все идут на dev-user-001)
- `/login`, `/register`, `/reset-password` — legacy Kampaio v1 auth (работает, ждёт интеграции с B6 multi-tenancy)
- `/chat`, `/dashboard` — legacy v1 (preserved, не используется в B6 UI)
- `/blog/*` — 1000+ programmatic SEO страниц (от v1, можно перенацелить под B6 keywords)
- `/api/stripe-webhook` — handler для Stripe events → forward в backend
- `/api/auth/*`, `/api/users.json` — legacy auth (file-based)

### B6 компоненты (`src/components/b6/`)
| Компонент | Назначение | Размер |
|-----------|------------|--------|
| `CampaignCard.tsx` | Карточка кампании с метриками + glow при highlighted | 90 строк |
| `ActivityFeed.tsx` | Historical actions log (REST polling каждые 5с) | 100 строк |
| `ApprovalQueue.tsx` | Pending actions с Approve/Reject + Aegis-badge | 130 строк |
| `RunBuzzButton.tsx` | Главная кнопка запуска Buzz | 55 строк |
| `LiveEventStream.tsx` | Real-time event log из Socket.IO (с авто-скроллом) | 110 строк |
| `MascotLayer.tsx` | Overlay с маскотами Buzz + Aegis (Framer Motion) | 240 строк |
| `AegisBadge.tsx` | Risk score UI badge для Aegis-обзоров | 80 строк |
| `DigestPanel.tsx` | Echo digest viewer + generate button | 180 строк |
| `MaximusPanel.tsx` | Autonomy toggle (L0/L1/L2/L3) + cycle results | 230 строк |
| `MiraPanel.tsx` | Creative variants (3 ad copies + images) | 270 строк |
| `SagePanel.tsx` | Research output (keywords by theme + audiences) | 250 строк |

### Lib
- `src/lib/b6-api.ts` — typed API client (все 22 endpoints + interfaces)
- `src/lib/b6-socket.ts` — Socket.IO client + `useB6Events` React hook

### Design system
- **Background**: `#15181D` (dark), `#1F232B` (surface)
- **Accent primary**: `#00FFE7` → `#00BFAE` (cyan gradient)
- **Status colors**:
  - Success `#4ECDC4` (teal)
  - Warning `#FFA726` (orange)
  - Error `#FF6B6B` (red)
  - Info `#7F9CF5` (blue)
- **Mascot glow colors**: per agent (Buzz=orange, Aegis=blue, etc.)
- **Inline styles** (без CSS modules) — для скорости разработки B6

---

## Backend (FastAPI + Python)

### App structure (`ai-server/`)
```
ai-server/
├── app.py              # New B6 FastAPI app
├── main.py             # Legacy Kampaio v1 (preserved, not used in B6)
├── start_b6.py         # Entry point for production
├── Dockerfile.b6       # Production image
├── agents/             # 7 AI agents
│   ├── base.py         # BaseAgent class (tool-use loop)
│   ├── bidding_agent.py    # Buzz
│   ├── risk_agent.py       # Aegis
│   ├── reporting_agent.py  # Echo
│   ├── strategy_agent.py   # Vox
│   ├── orchestrator.py     # Maximus (rules engine)
│   ├── creative_agent.py   # Mira
│   ├── research_agent.py   # Sage
│   └── tools.py            # Shared tool functions
├── services/           # External integrations
│   ├── google_ads_client.py    # Google Ads + mock mode
│   ├── audit.py                # Action lifecycle
│   ├── emailer.py              # Resend + mock fallback
│   └── image_gen.py            # fal.ai + mock fallback
├── routers/            # HTTP routes
│   ├── agents.py
│   ├── actions.py
│   ├── campaigns.py
│   ├── orchestrator.py
│   ├── digest.py
│   ├── waitlist.py
│   └── internal.py
├── ws/                 # Socket.IO server
│   └── events.py
├── db/                 # SQLAlchemy + Alembic
│   ├── models.py       # 7 таблиц
│   ├── session.py      # async + sync session factories
│   └── migrations/     # Alembic
└── scripts/            # Helpers
    ├── seed_dev.py
    ├── smoke_test_bidding_agent.py
    └── structural_test.py
```

### HTTP API (22 endpoints)

#### Health & meta
- `GET /` — root info
- `GET /health` — health check + flags
- `GET /docs` — Swagger UI
- `GET /openapi.json`

#### Agents
- `POST /api/agents/run` — запустить агента (bidding|strategy|creative|research)
- `GET /api/agents` — список агентов пользователя
- `POST /api/agents/{type}/pause`
- `POST /api/agents/{type}/resume`

#### Actions
- `GET /api/actions` — список (фильтр по status)
- `GET /api/actions/{id}` — деталь + risk_review
- `GET /api/actions/{id}/review` — только risk_review
- `POST /api/actions/{id}/approve`
- `POST /api/actions/{id}/reject`

#### Campaigns
- `GET /api/campaigns?customer_id=X` — кампании с метриками (cached 30s)
- `GET /api/campaigns/{campaign_id}/metrics`
- `DELETE /api/campaigns/cache` — clear cache

#### Orchestrator (Maximus)
- `POST /api/orchestrator/cycle` — apply rules + auto-approve
- `GET /api/orchestrator/latest`
- `POST /api/orchestrator/autonomy` — change L0/L1/L2/L3

#### Digest (Echo)
- `POST /api/digest/run` — generate + (optional) email
- `GET /api/digest/latest`

#### Waitlist
- `POST /api/waitlist/signup` — добавить + welcome email
- `GET /api/waitlist/stats`

#### Internal (server-to-server)
- `POST /api/internal/stripe-sync` — для Stripe webhook handler в Next.js

#### Socket.IO
- `/socket.io/` — WebSocket transport
- Events: `agent.thinking`, `agent.calling_tool`, `agent.done`, `agent.error`, `session.start`, `session.complete`

---

## Agent architecture

### BaseAgent (`agents/base.py`)

Все агенты (кроме Maximus) — наследники `BaseAgent`. Класс реализует **tool-use loop** через нативный `anthropic` SDK:

```python
class BaseAgent:
    name = "base"
    mascot_emoji = "🤖"
    mascot_name = "Bot"
    system_prompt = "..."
    model = "claude-sonnet-4-6"

    async def run(self) -> AgentRunResult:
        # 1. Build initial prompt (override per agent)
        # 2. Loop max 8 iterations:
        #    a. Send to Claude API with tools
        #    b. Parse response
        #    c. If stop_reason="end_turn" → done
        #    d. If stop_reason="tool_use" → execute tool, append result, repeat
        # 3. Return AgentRunResult (iterations, tool_calls, final_text, error)
```

### Per-agent specialization

| Агент | Реализация | Особенность |
|-------|------------|-------------|
| **Buzz** | Claude + 6 tools | Single-campaign bidding |
| **Aegis** | Claude + 1 tool (`submit_review`) | Бычит проподаются bulk-review всех pending |
| **Echo** | Claude + 1 tool (`submit_digest`) | Read-only — не call API, только history |
| **Vox** | Claude + 2 tools | Сразу видит ВСЕ кампании |
| **Maximus** | **Deterministic Python** (НЕ Claude) | Rules engine — предсказуемость > LLM-творчество |
| **Mira** | Claude + 1 tool (`propose_creative_set`) | Опционально вызывает image_gen после propose |
| **Sage** | Claude + 3 tools (one-by-one) | Много мелких propose calls + finalize |

### Tool use pattern
```python
# В agents/tools.py или в register_tools() агента:
ToolSpec(
    name="propose_bid_change",
    description="...",
    input_schema={"type": "object", "properties": {...}},
    handler=propose_bid_change_tool,  # async Python function
)
```

Tool handler:
1. Receives Claude's structured input
2. Validates
3. Persists action to DB via `audit.write_proposed_action()`
4. Returns serializable dict back to Claude

### Event publishing
Each agent receives optional `event_publisher` callable. На каждом шаге публикуются события через Socket.IO в `user:{id}` room:

- `agent.thinking` — начало работы
- `agent.calling_tool` — конкретный tool вызов
- `agent.done` — завершение
- `agent.error` — ошибка

Frontend хук `useB6Events` слушает эти события и обновляет UI.

---

## Database schema

7 таблиц в `b6` database (SQLite в dev, Postgres в prod).

### Diagram
```
users ─────┬─── google_ads_accounts
           │
           ├─── agents ─────── agent_actions ──── audit_log
           │
           ├─── safety_caps
           │
           └─── activity_events
```

### Tables (`db/models.py`)

#### `users`
- `id` (UUID PK)
- `email` (unique)
- `password_hash`
- `subscription_tier` — `l1` | `l2` | `l3` | null
- `autonomy_level` — `l0` | `l1` | `l2` | `l3` (текущий выбор юзера)
- `stripe_customer_id`

#### `google_ads_accounts`
- `id`, `user_id`, `google_customer_id`, `oauth_refresh_token`, `timezone`, `currency`

#### `agents`
- `id`, `user_id`, `type` (bidding/risk/...), `status` (active/paused/disabled)
- `mascot_name`, `config` (JSON), `last_run_at`

#### `agent_actions`
- `id`, `agent_id`, `user_id`
- `action_type` (update_bid / pause_campaign / adjust_budget / create_ad_variant / add_keyword / add_audience)
- `target` (JSON — campaign_id, new_bid_usd, etc.)
- `before_state` / `after_state` (JSON)
- `reasoning` (text — что объяснил Claude)
- `confidence` (0.00-1.00)
- `status` — proposed / pending_approval / approved / applied / rejected / reverted / blocked_by_safety
- `approved_by` (user_id или `maximus:user_id`)
- `created_at`, `applied_at`

#### `audit_log` (immutable)
- `id`, `action_id`, `user_id`, `event_type`, `payload` (JSON)
- Events: `action.proposed`, `action.approved`, `action.applied`, `action.rejected`, `risk.review`, `orchestration.cycle`, `echo.digest`

#### `safety_caps`
- `id`, `user_id`, `cap_type`, `limit_value`, `current_value`, `reset_at`
- Каждый юзер получает 3 default caps при регистрации:
  - `daily_spend_pct_max` = 110%
  - `bid_change_pct_max` = 30%
  - `actions_per_hour_max` = 10

#### `activity_events`
- For real-time stream replay (если когда-то понадобится показать prior session events)

### Separate DBs
- `waitlist.db` (SQLite) — email signups. Отдельно потому что не связано с user system.

---

## Real-time architecture

### Socket.IO setup
```python
# ai-server/ws/events.py
sio = socketio.AsyncServer(async_mode="asgi", cors_allowed_origins="*")

# Mount в FastAPI ASGI:
# ai-server/app.py
socket_app = socketio.ASGIApp(sio, other_asgi_app=app, socketio_path="/socket.io")

# Run: uvicorn app:socket_app
```

### Event flow
```
1. User clicks "Run Buzz" в UI
2. Frontend: POST /api/agents/run
3. Backend creates BiddingAgent с event_publisher=make_publisher(user_id)
4. BaseAgent._emit("thinking", {...}) → publish_event(user_id, "agent.thinking", {...})
5. socketio.emit() в room "user:{id}"
6. Frontend useB6Events hook получает event
7. State update в React → UI меняется (mascot moves, event log appends)
```

### Per-step events
- `session.start` — начало run
- `agent.thinking` — агент в очередной итерации
- `agent.calling_tool` — каждый tool call
- `agent.done` — finalized
- `agent.error` — ошибка LLM или tool
- `session.complete` — после Aegis review

---

## Safety architecture

Три слоя защиты от опасных AI-действий:

### Layer 1: Hard caps (deterministic)
- `safety_caps` table в БД
- Перед каждым action — `check_safety_cap(user_id, cap_type, amount)`
- Если превышено → action blocked (status: `blocked_by_safety`)

### Layer 2: Aegis review (LLM)
- После Buzz/Vox создания proposed actions
- Aegis анализирует каждое + историю + контекст кампании
- Возвращает: `risk_score` (0-100), `recommendation` (approve/review/block), `flags`
- Пример: «Brand campaign + low budget + >25% bid change → block»

### Layer 3: Maximus autonomy enforcement
- На основе `user.autonomy_level` решает что **авто-апрувить**
- Block-recommendation от Aegis — **никогда не апрувим** даже на L3
- L1 — 0 auto-approve (всё через пользователя)

### Layer 4 (data layer): Audit log immutable
- Каждое решение → запись в `audit_log`
- Можно посмотреть **что AI делал** в любой момент в прошлом
- Юзер может revert action в течение 24 часов

---

## Production stack (Docker)

### `docker-compose.prod.yml`
```yaml
services:
  postgres: postgres:16-alpine, with healthcheck
  redis:    redis:7-alpine, with healthcheck
  b6-api:   build from Dockerfile.b6, depends on postgres+redis
  caddy:    caddy:2-alpine, reverse proxy with auto-HTTPS
```

### `Dockerfile.b6`
- Base: `python:3.11-slim`
- System deps: `libpq-dev` (для psycopg)
- App deps from `requirements.txt` + production extras
- Non-root user (`b6`)
- Health check на port 8000
- Run: `uvicorn app:socket_app --host 0.0.0.0 --port 8000`

### `Caddyfile`
- Auto Let's Encrypt SSL
- WebSocket upgrade support (для Socket.IO)
- Security headers
- Reverse proxy to `b6-api:8000`

---

## Cost model

### Per request (one full Buzz + Aegis cycle)
- Buzz: 5 iterations × ~3K tokens each = ~15K input + 5K output = ~$0.12
- Aegis: 2 iterations × ~3K tokens = ~6K input + 3K output = ~$0.06
- **Total: ~$0.20-0.30 per Buzz+Aegis run**

### Per user/month (active)
- ~30 Buzz+Aegis runs × $0.25 = $7.50
- ~4 Echo digests × $0.10 = $0.40
- ~1 Vox + 1 Sage + 1 Mira per week × $0.50 = $2.00
- **Total: ~$10 LLM API cost per active user/month**

### Infrastructure (fixed costs, реальные на 2026-05-12)
- Hetzner **CPX22**: **$9.49/mo** (4 GB RAM, 2 vCPU AMD, 80 GB SSD — нужно для Docker stack с Postgres + Redis + FastAPI + Caddy)
- Vercel Hobby: $0
- Domain: $1/mo amortized
- Resend: $0 (free tier 3K emails)
- **Total infra: ~$11/mo**

### При 50 paying users
- LLM: $500/mo
- Infra: $7/mo
- Stripe fees: $144 (2.9% × $4,950)
- **Net cost: ~$650/mo**
- **Revenue (50 × $99 = $4,950)**
- **Gross margin: ~87%**

---

## Future architecture decisions

### Multi-tenancy (Sprint 4+)
- Сейчас: single `dev-user-001` хардкод
- Нужно: JWT auth + per-user data isolation
- Existing routes уже принимают `user_id` параметр — нужно extract его из token

### Background tasks (Celery)
- Сейчас: всё запускается синхронно через `/api/*` calls
- Нужно: Celery workers для scheduled runs (daily Maximus cycle, weekly Echo digest)
- Redis уже в docker-compose готов как broker

### Production write operations
- Сейчас: все write tools (`update_bid`, `pause_campaign`) в `dry_run` mode
- Нужно: после Google Ads Production Token — `apply_to_google_ads=true` path

### Multi-platform expansion
- Сейчас: только Google Ads
- Roadmap: Meta Ads (Q2 2026) → TikTok Ads (Q3) → LinkedIn Ads (Q4)
- Архитектурно: `services/google_ads_client.py` → абстракция `services/ads_platform_client.py` с per-platform implementations

---

## TL;DR

- **Status**: 🚀 LIVE на https://www.kampaio.com + https://api.kampaio.com
- **Frontend**: Next.js 15.5 на Vercel Hobby
- **Backend**: FastAPI + Socket.IO в Docker на Hetzner CPX22 (`178.104.124.150`, Nuremberg)
- **DNS**: GoDaddy (`api` A → Hetzner, `www` CNAME → Vercel)
- **SSL**: Caddy + Let's Encrypt prod (auto-renew, until 2026-08-10)
- **Agents**: 7 шт. на Claude Sonnet 4.6 через нативный SDK
- **DB**: SQLite (dev) / Postgres 16 (prod)
- **Real-time**: Socket.IO одним endpoint'ом
- **Safety**: 4 layers (caps + Aegis + Maximus + audit)
- **Cost**: ~$10/mo infra + ~$10/mo LLM на активного юзера = ~85% margin на L1 $99 tier
