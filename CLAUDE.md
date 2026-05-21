# B6 — Autonomous PPC Cabinet (Claude Code Instructions)

> **Этот файл автоматически читается Claude Code на старте каждой сессии в этом проекте.**
> Это **постоянные правила**. Текущее состояние работы → [`HANDOFF.md`](./HANDOFF.md).
>
> **Связанные документы**:
> - [`README.md`](./README.md) — public overview
> - [`HANDOFF.md`](./HANDOFF.md) — operational truth (что сейчас работает)
> - [`ARCHITECTURE.md`](./ARCHITECTURE.md) — system diagrams + tech details
> - [`CHANGELOG.md`](./CHANGELOG.md) — sprint history
> - [`LAUNCH.md`](./LAUNCH.md) — 2-hour deployment quickstart
> - [`DEPLOY.md`](./DEPLOY.md) — full deployment manual
> - [`LAUNCH-CONTENT.md`](./LAUNCH-CONTENT.md) — social media launch kit
> - [`BRAND-BRIEF.md`](./BRAND-BRIEF.md) — brand voice, audience, style rules, taboos (system prompt source for content agents)
>
> Полный архитектурный план: [`/Users/vitaly/.claude/plans/noble-waddling-sparkle.md`](/Users/vitaly/.claude/plans/noble-waddling-sparkle.md)

---

## 🎯 Что это за проект

**B6** — это эволюция старого Kampaio (PPC AI chatbot) в **«AI-агентство в кабинете»**:
- Multi-agent система которая **автономно** управляет Google Ads клиента
- Не «AI даёт советы» (как Optmyzr / Madgicx), а **«AI делает работу + объясняет»**
- Целевая аудитория: SMB и e-com магазины с $3-50K/мес рекламного бюджета
- Цена: L1 $99 / L2 $199 / L3 $399 / мес — три уровня автономности

**Текущая команда AI-агентов** (8 агентов, Sprint 1-8 + 8.5 + 8.6 done на 2026-05-21):

| Маскот | Имя | Роль | Status |
|--------|-----|------|--------|
| 🐝 | Buzz | Bidding (single-campaign) | ✅ LIVE |
| 🛡️ | Aegis | Risk review (Class A mutating + Class B alerts) | ✅ LIVE |
| 📊 | Echo | Weekly digest + client PDF | ✅ LIVE |
| 🦊 | Vox | Strategy (cross-campaign budget) | ✅ LIVE |
| 🐻 | Maximus | Orchestrator (rules engine for autonomy) | ✅ LIVE |
| 🎨 | Mira | Creative — **type-aware** (Sprint 8.6): Search RSA (15h + 4d), PMax Asset Group (5+5+5+5), Display (5+1+5+5). Refuses Shopping/Video/Smart. | ✅ LIVE |
| 🦉 | Sage | Research (keywords + audiences + negatives) | ✅ LIVE |
| 🦇 | Vigil | 24/7 anomaly monitoring — Sprint 8.5 detector (yesterday + median + budget-aware) | ✅ **LIVE на проде**, scheduler тикает каждый час |

**Главное состояние сейчас (2026-05-21 mid-afternoon)**: 🚀 **LIVE В PRODUCTION** на https://www.kampaio.com + https://api.kampaio.com (Vercel + Hetzner CPX22 `178.104.124.150`). Multi-tenant JWT auth работает. 33 реальных Google Ads аккаунта через OAuth, активный `9673118921` (goodevas.fi). На Google Ads API v24. Real apply для 3 типов действий (`pause_campaign`, `apply_recommendation`, `add_negative_keyword`) с daily safety cap. **🦇 Vigil АКТИВЕН** (`VIGIL_ENABLED=true` на проде с 2026-05-20 19:13 UTC), тикает каждые 60 мин, тратит ~$1.14 за tick. **🎨 Mira type-aware** работает — генерит полные RSA-pack'и под Search-кампании, PMax asset groups под PMax-кампании. Полная сводка → [`HANDOFF.md`](./HANDOFF.md).

**API costs (наблюдаемые, не точные):**
- Mira Generate: ~$0.21 за прогон
- Vigil tick: ~$1.14 за прогон (33 accounts, dedup'd до 28, 0 alerts)
- Aegis review: ~$0.05 per action
- При VIGIL_INTERVAL_MINUTES=60 → ~$27/день только Vigil. Снизить до 240-480 мин для экономии до Sprint 9 / first paying customer.

---

## 👤 Про пользователя (Виталий)

- **Не-разработчик** в классическом смысле, но имеет несколько production-проектов (Sofia Content Factory работает в проде ежедневно)
- **Язык**: украинский + русский. **Отвечать по-русски** (см. глобальные memory rules)
- **Стиль работы**: маленькие шаги, частый поэтапный апрув, конкретные цифры экономии/выигрыша
- **Auto mode**: пользователь активно использует Auto mode → **меньше вопросов**, **больше action**
- **GitHub**: [`vitali-ppc`](https://github.com/vitali-ppc) — у него **PPC-бэкграунд** (важно для distribution когда придёт время)

---

## 🛡️ Жёсткие правила (не нарушать)

### 1. Безопасность API-ключей
- `.env` файл **в .gitignore** — никогда не коммитить
- Если юзер случайно вставил ключ в чат → **немедленно** напомнить ротейтнуть на https://console.anthropic.com/settings/keys
- **Никогда не помещать ключи в код**, комментарии, документацию

### 2. Не ломать существующее
- Старый `ai-server/main.py` (Kampaio v1, 1826 строк) **не трогать** — он на этой же ветке, остаётся как «hot backup»
- Новое B6-приложение в `ai-server/app.py` — **там вся новая работа**
- Архивная ветка: `archive/kampaio-v1` (снимок состояния перед v2)

### 3. Mock-режим vs real Google Ads
- **Local dev** (SQLite, `ai-server/.env`): `GOOGLE_ADS_USE_MOCK=true` → агенты работают на 3 синтетических кампаниях. Безопасно ломать.
- **Production** (Hetzner, `.env.prod`): `GOOGLE_ADS_USE_MOCK=false` → агенты читают реальные Google Ads campaigns через OAuth refresh_token из БД (`GoogleAdsAccount` table). На 2026-05-13 активный customer_id = `3133506664` (Goodevas It).
- Refresh_token берётся из БД по `customer_id` (см. `routers/campaigns.py` → `_get_access_token(customer_id)` и `agents/tools.py` → `_get_access_token_for(user_id, customer_id)`). Legacy `DEV_REFRESH_TOKEN` env var больше **не используется**.

### 4. Dry-run по умолчанию, real-apply только с явным флагом
- **Real apply** уже работает для 3 action_type: `pause_campaign` + `apply_recommendation` + `add_negative_keyword`. Активируется параметром `apply_to_google_ads=true` в `/api/actions/{id}/approve`.
- `update_bid` всё ещё в dry-run (Sprint 7.5 — нужен strategy-aware refactor агентов).
- Daily safety cap: 5 real applies / customer_id / 24h (см. `services/audit.py::count_real_applies_last_24h`).
- **Никогда** не разрешать default-true для apply без явного решения пользователя.
- В UI ApprovalQueue checkbox "Apply to Google Ads" + красная "⚠ Apply now" с `confirm()`.

### 5. Не добавлять фич которых юзер не просил
- Baseline — то, что в [`HANDOFF.md`](./HANDOFF.md) → roadmap
- Идеи беклогом — в HANDOFF, не в код

### 6. Чек-листы для задач 3+ шагов
- Использовать `TodoWrite` для отслеживания
- Обновлять статусы в реал-тайме

---

## 🏗️ Архитектура (high-level)

```
Frontend (Next.js 15 / TypeScript)              Backend (FastAPI / Python 3.9+)
├── src/app/b6/page.tsx       ← главная B6     ├── app.py                   ← B6 FastAPI + Vigil scheduler lifespan
├── src/app/dashboard/        ← legacy Kampaio  ├── main.py                  ← legacy Kampaio
├── src/components/b6/        ← B6 UI           ├── agents/                  ← 8 агентов
│   ├── CampaignCard                            │   ├── base.py              ← agent loop
│   ├── ActivityFeed                            │   ├── bidding_agent.py     ← Buzz
│   ├── ApprovalQueue                           │   ├── risk_agent.py        ← Aegis
│   ├── LiveEventStream                         │   ├── reporting_agent.py   ← Echo
│   ├── MascotLayer           ← Framer Motion   │   ├── strategy_agent.py    ← Vox
│   ├── DigestPanel                             │   ├── orchestrator.py      ← Maximus (rules engine)
│   ├── VigilPanel            ← Sprint 8        │   ├── creative_agent.py    ← Mira
│   └── AegisBadge                              │   ├── research_agent.py    ← Sage
├── src/lib/                                    │   ├── anomaly_agent.py     ← Vigil (Sprint 8)
│   ├── b6-api.ts             ← API client      │   └── tools.py
│   └── b6-socket.ts          ← Socket.IO       ├── services/
                                                │   ├── google_ads_client.py
                                                │   ├── audit.py
                                                │   ├── emailer.py
                                                │   ├── anomaly_detector.py  ← Sprint 8 pure-Python rules
                                                │   ├── vigil_scheduler.py   ← Sprint 8 APScheduler
                                                │   ├── vigil_notifier.py    ← Sprint 8 email digest
                                                │   └── vigil_settings.py    ← Sprint 8 per-user prefs
                                                ├── routers/
                                                │   ├── agents.py
                                                │   ├── actions.py
                                                │   ├── anomalies.py         ← Sprint 8 /api/anomalies/*
                                                │   ├── campaigns.py
                                                │   ├── auth.py
                                                │   └── digest.py
                                                ├── db/
                                                │   ├── models.py (7 таблиц)
                                                │   ├── session.py
                                                │   └── migrations/         ← Alembic
                                                ├── ws/events.py            ← Socket.IO
                                                └── b6_dev.db               ← SQLite (dev)
```

### Tech stack
- **Frontend**: Next.js 15.3 + React 19 + TypeScript 5.8 + Tailwind v4 + Framer Motion + socket.io-client
- **Backend**: FastAPI 0.104 + Python 3.9 + SQLAlchemy 2 + Alembic + python-socketio + anthropic SDK
- **LLM**: **Claude Sonnet 4.6** (модель по умолчанию)
- **DB**: SQLite в dev (`b6_dev.db`), Postgres в prod (планируется)
- **Real-time**: Socket.IO (REST + WS на одном порту 8000)
- **Hosting**: Vercel Hobby (frontend, `www.kampaio.com`) + **Hetzner CPX22** ($9.49/mo, `178.104.124.150`, Nuremberg, account `K0514922126`) для backend (`api.kampaio.com`)
- **SSL**: Caddy + Let's Encrypt prod (auto-renew, valid до 2026-08-10)
- **DNS**: GoDaddy (`api` A → Hetzner; `www` CNAME → Vercel)

---

## 🚀 Команды для работы

### Запустить всю систему локально
```bash
# Терминал 1 — Backend
cd /Users/vitaly/Vit+/projects/ppc-landing/ai-server
source venv/bin/activate
GOOGLE_ADS_USE_MOCK=true uvicorn app:socket_app --port 8000 --reload

# Терминал 2 — Frontend
cd /Users/vitaly/Vit+/projects/ppc-landing
npm run dev  # на порту 3002

# Открыть в браузере
open http://localhost:3002/b6
```

### Сидинг dev данных
```bash
cd ai-server && source venv/bin/activate && python scripts/seed_dev.py
```

### Сбросить БД
```bash
cd ai-server && rm -f b6_dev.db && alembic upgrade head && python scripts/seed_dev.py
```

### Smoke test одного агента
```bash
cd ai-server && GOOGLE_ADS_USE_MOCK=true python scripts/smoke_test_bidding_agent.py
```

### Прямой curl-тест полного цикла
```bash
# Запустить Buzz + Aegis
curl -X POST http://localhost:8000/api/agents/run \
  -H 'Content-Type: application/json' \
  -d '{"customer_id":"1234567890"}'

# Посмотреть proposed actions
curl 'http://localhost:8000/api/actions?status=proposed' | python3 -m json.tool

# Апрувнуть один
curl -X POST 'http://localhost:8000/api/actions/<id>/approve' \
  -H 'Content-Type: application/json' \
  -d '{"approver_user_id":"dev-user-001"}'
```

### Swagger UI
http://localhost:8000/docs

---

## 📁 Где что искать

| Что | Где |
|-----|-----|
| **Текущий план / следующие шаги** | [`HANDOFF.md`](./HANDOFF.md) |
| **Полный архитектурный план (исходный)** | `/Users/vitaly/.claude/plans/noble-waddling-sparkle.md` |
| **v24 migration план** | `/Users/vitaly/.claude/plans/b6-v24-migration.md` |
| **Sprint 8 (Vigil) план** | `/Users/vitaly/.claude/plans/b6-sprint-8-vigil.md` |
| **Описание агента (system prompt)** | `ai-server/agents/<name>.py` (см. `AEGIS_SYSTEM_PROMPT`, `BiddingAgent.system_prompt`, `VIGIL_SYSTEM_PROMPT`) |
| **Что агенты могут вызвать** | `ai-server/agents/tools.py` + методы `register_tools()` |
| **Google Ads интеграция** | `ai-server/services/google_ads_client.py` |
| **Anomaly detection rules** | `ai-server/services/anomaly_detector.py` |
| **24/7 scheduler** | `ai-server/services/vigil_scheduler.py` |
| **Vigil email digest** | `ai-server/services/vigil_notifier.py` |
| **Per-user Vigil settings** | `ai-server/services/vigil_settings.py` |
| **DB schema** | `ai-server/db/models.py` |
| **Дашборд UI** | `src/app/b6/B6Content.tsx` |
| **Vigil UI panel** | `src/components/b6/VigilPanel.tsx` |
| **Live event stream** | `src/components/b6/LiveEventStream.tsx` + `src/lib/b6-socket.ts` |
| **Маскоты (анимация)** | `src/components/b6/MascotLayer.tsx` (пока только Buzz+Aegis, refactor отложен) |
| **Старый Kampaio (не трогать)** | `ai-server/main.py`, `src/app/chat/`, `src/app/dashboard/` (старый) |

---

## ⚠️ Open Decisions (требуют решения от Виталия)

См. секцию «Open Decisions» в [`HANDOFF.md`](./HANDOFF.md).
Главные на 2026-05-21:
1. **Снизить VIGIL_INTERVAL_MINUTES** с 60 до 240-480 — текущий расход ~$27/день только Vigil. До платящих клиентов это слишком дорого. ~5 мин ops. Команда в HANDOFF §1.
2. **Resend setup** — `RESEND_API_KEY` пустой. Echo PDF + Vigil critical alerts сейчас mock-mode (UI честно показывает баннер). Реальной доставки нет. ~30 мин (DNS + verify + key).
3. **Gating Vigil по autonomy_level** — сейчас Vigil scheduler не привязан к tier'у (любой юзер с `VIGIL_ENABLED=true` global получает). Бизнес-решение: давать free trial или жёсткий paywall за L2+? 5 строк кода когда определишься.
4. **Sprint 9 — Maximus L3 aggressive auto-apply + auto-pause на critical anomaly** — замкнёт цикл "Vigil detects → Maximus acts". ~10ч.
5. **§J — Mira landing_url fallback на парсинг HTML** — сейчас Mira берёт `ad_group_ad.ad.final_urls` из Google Ads, но это даёт только URL без content. Можно опционально подтянуть `<title>` и meta description через WebFetch для более точного контекста. ~30 мин. Низкий приоритет.

---

## 🎨 Конвенции кода

### Python (backend)
- Стиль: PEP 8, async/await везде где возможно
- Imports: stdlib → third-party → local (внутри отделять пустой строкой)
- Type hints: `from __future__ import annotations` в новых файлах
- Логирование: `logger = logging.getLogger(__name__)`, не `print`
- Тесты: pytest (TODO — добавить tests/)

### TypeScript (frontend)
- `'use client'` для interactive компонентов
- Inline styles для скорости разработки (Tailwind config есть, но активно не используем в /b6/)
- Server-side rendering: страницы остаются client components пока нет SSR требования

### Naming
- Backend: snake_case
- TS: camelCase для функций, PascalCase для компонентов/типов
- DB: snake_case колонки, lowercase таблицы
- Endpoints: `/api/<resource>` (REST-style)

---

## 🎬 «Театр AI-агентов» — паттерн

**Главная фишка B6** — пользователь **видит** работу агентов через mascots + speech bubbles + live stream. Это не gimmick, это **trust-building механизм**.

Когда добавляешь нового агента:
1. Определи маскот (emoji + имя) — см. таблицу выше
2. В `BaseAgent` подкласс задай `mascot_emoji`, `mascot_name`
3. Передай `event_publisher` через конструктор → агент будет автоматически публиковать события
4. Frontend `MascotLayer.tsx` уже обрабатывает события — новый агент появится сам если `mascot` поле в событии распознано

---

## 💡 Стратегические заметки

### Почему мы выбрали такой подход (resume)
- **MCP-серверы как продукт** — мы рассмотрели и отказались, см. план
- **Sofia Content Factory** — отдельный проект, **не объединять с B6**
- **Цель года 1**: $10-30K MRR на 50-100 платящих клиентах
- **Главная угроза**: Synter (universal ad MCP, $199/мес) + большие игроки (Optmyzr/Madgicx) пивотят в ту же сторону. **Окно ~6-12 месяцев** чтобы захватить позицию

### Связанные проекты (sister projects)
- **SEO Agent Team** — `/Users/vitaly/Vit+/projects/seo-agent-team/` — отдельный pipeline на Claude Code Routines + Agent tool, который генерит SEO-статьи для блога B6. Output ложится в `src/app/blog/<slug>/page.tsx` обычными git-коммитами, Vercel автодеплоит. **Не часть B6 backend**, не объединяем.

  **Статус на 2026-05-16: 🟡 PAUSED** (Phase 2 complete, ждёт GSC данных 2-4 недели)

  **Что от него в этом репо:**
  - **14 blog articles** в `src/app/blog/<slug>/` — все с server+client split (page.tsx экспортирует metadata, ArticleContent.tsx — body).
  - **3 commercial JSON-LD schemas** добавлены 2026-05-16:
    - `src/app/HomeContent.tsx` → Organization + WebSite
    - `src/app/pricing/PricingContent.tsx` → SoftwareApplication + 3 Offer
    - `src/app/blog/page.tsx` → CollectionPage + ItemList
  - **6 T1 critical articles refreshed** 2026-05-16 (dateModified bumped, year refs 2025→2026)
  - `src/components/blog/MascotQuote.tsx` — React-компонент для inline-цитат маскотов в blog-статьях.
  - `src/app/sitemap.ts` — dynamic sitemap, auto-discovers blog articles.
  - `public/robots.txt` — Sitemap directive points to www.kampaio.com.
  - `public/og/*.png` — 17 OG images (14 blog + home + b6 + pricing + chat).
  - **pre-commit hook** в `.git/hooks/pre-commit` — 6 lint rules (blocks em-dash, auto-fit grid, mindmap, [B6_URL], missing metadata, missing internal links).

  **Автономный pipeline:**
  - 🪶 **Hermes** (Claude Code Routine `seo-autonomous-publisher`) — Mon-Fri 10:07 → keyword → brief → write → publish → git push. ~15 минут.
  - 🦅 **Argus 3.0** (Routine `argus-technical-auditor`) — Sun 11:37 → **17 audits** + 6 auto-fixes на 18 SEO pages. Phase 3 added DebugBear-aligned audits (redirect_chains, canonical_validation, soft_404, INP). ~76% DebugBear 2026 checklist coverage.

  **Что НЕ нужно делать в B6 контексте:**
  - НЕ трогать `src/app/blog/<slug>/` файлы — pipeline их пишет
  - НЕ трогать `src/components/blog/MascotQuote.tsx`
  - НЕ менять lint rules без понимания (см. `scripts/lint_visuals.sh` в SEO репо)

  Полный статус: [`/Users/vitaly/Vit+/projects/seo-agent-team/HANDOFF.md`](/Users/vitaly/Vit+/projects/seo-agent-team/HANDOFF.md)
  План: [`/Users/vitaly/.claude/plans/agile-crunching-donut.md`](/Users/vitaly/.claude/plans/agile-crunching-donut.md)

### Что делает нас отличными
1. **Multi-agent с visualization** (mascots + live stream) — у конкурентов нет
2. **Глубина по Google Ads** (vs Synter universal-but-shallow)
3. **Цена** — мы дешевле основных игроков
4. **Story**: «не AI-консультант, а AI-агентство в кабинете»

---

## 🆘 Если что-то идёт не так

1. **Backend не стартует** → проверь `.env` (особенно `ANTHROPIC_API_KEY`), `venv` активен, БД мигрирована
2. **Frontend не компилируется** → `rm -rf .next && npm run dev`
3. **Buzz/Aegis возвращают ошибки** → проверь Anthropic billing на console.anthropic.com
4. **Socket.IO не работает** → проверь что запущен `uvicorn app:socket_app`, а не `app:app`
5. **Aegis рапортует max_tokens** → слишком много pending actions, накопились → апрувнуть/отклонить старые

---

## 📞 Где обсуждается прогресс

- **Эта переписка**: `~/.claude/projects/-Users-vitaly-Vit-projects-ppc-landing/`
- Прошлые сессии можно найти через `mcp__ccd_session_mgmt__list_sessions`
- Архив дневных summaries: `B6_DAY1_SUMMARY.md`, `B6_DAY2_SUMMARY.md` (legacy, основной truth в `HANDOFF.md`)
