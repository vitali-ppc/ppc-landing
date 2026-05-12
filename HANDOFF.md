# B6 — HANDOFF (текущее состояние)

> **Если ты новый Claude в этой сессии**: прочитай **сначала** [`CLAUDE.md`](./CLAUDE.md) для контекста проекта, **потом** этот файл для текущего состояния.
> Архитектурный план: [`/Users/vitaly/.claude/plans/noble-waddling-sparkle.md`](/Users/vitaly/.claude/plans/noble-waddling-sparkle.md)

**Дата последнего обновления**: 2026-05-12 (Sprint 3 prep — LAUNCH ready)
**Текущая ветка**: `v2-autonomous-agents`
**Прогресс**: **100% кода + production prep готово**
**AI-агентов**: **7/7** (все из плана работают)
**Статус продукта**: 🚀 **LAUNCH READY** — производственная сборка проверена, остался только actual deployment

### ⚡ Что делать дальше → читай [`LAUNCH.md`](./LAUNCH.md)

---

## 🔥 Быстрый старт (если зашёл в новую сессию)

### 1. Проверь что серверы живы
```bash
curl -s http://localhost:8000/health | python3 -m json.tool   # backend (B6 API + Socket.IO)
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3002/b6   # frontend
```

### 2. Если backend упал
```bash
cd /Users/vitaly/Vit+/projects/ppc-landing/ai-server
source venv/bin/activate
GOOGLE_ADS_USE_MOCK=true uvicorn app:socket_app --port 8000 --reload &
```

### 3. Если frontend упал
```bash
cd /Users/vitaly/Vit+/projects/ppc-landing
npm run dev &  # port 3002
```

### 4. Открыть продукт
http://localhost:3002/b6

### 5. Логи
- Backend: `tail -f /tmp/b6-server.log`
- Frontend: `tail -f /tmp/b6-next.log`

---

## ✅ Что готово (Day 1-6)

### Day 1 — Foundation (Bidding Agent)
- ✅ Python venv + anthropic SDK + sqlalchemy + alembic + python-socketio + greenlet
- ✅ SQLAlchemy модели (7 таблиц): users, google_ads_accounts, agents, agent_actions, audit_log, safety_caps, activity_events
- ✅ Alembic migrations
- ✅ `services/google_ads_client.py` — Google Ads API клиент с mock-режимом
- ✅ `agents/base.py` — base agent loop (anthropic Messages API + tool_use)
- ✅ `agents/bidding_agent.py` — Buzz 🐝 (Bidding Agent)
- ✅ `agents/tools.py` — Python функции для агентов (list_campaigns, get_metrics, propose_bid_change, etc.)
- ✅ Smoke test: `python scripts/smoke_test_bidding_agent.py` — Buzz делает 5 итераций, предлагает 3 действия

### Day 2 — Persistence + HTTP API
- ✅ `services/audit.py` — write_proposed_action, update_action_status, list_actions, get_action
- ✅ `seed_dev.py` — создаёт `dev-user-001` + safety_caps по умолчанию
- ✅ `routers/agents.py` — POST `/api/agents/run`, GET `/api/agents`, pause/resume
- ✅ `routers/actions.py` — GET list, GET single, POST approve/reject
- ✅ `app.py` — новое FastAPI приложение (отдельно от старого `main.py`)
- ✅ End-to-end test через curl: run → list → approve → reject

### Day 3 — Frontend Dashboard
- ✅ `src/lib/b6-api.ts` — typed API client (listAgents, runAgent, listActions, approve, reject)
- ✅ `src/components/b6/`:
  - `CampaignCard.tsx` — карточка кампании с метриками
  - `ActivityFeed.tsx` — лог действий
  - `ApprovalQueue.tsx` — список pending actions с Approve/Reject
  - `RunBuzzButton.tsx` — главная кнопка
- ✅ `src/app/b6/page.tsx` — главный дашборд (`/b6` route)
- ✅ Polling каждые 3 секунды (заменён на WS на Day 4)
- ✅ Frontend подключён к backend, CORS работает

### Day 4 — Aegis (Risk Agent) + Socket.IO Live Theatre
- ✅ `agents/risk_agent.py` — Aegis 🛡️ (Risk Agent)
- ✅ `/api/agents/run` теперь **автоматически** запускает Aegis после Buzz
- ✅ `get_risk_review()` + risk_review в list_actions
- ✅ `routers/actions.py` — `/api/actions/{id}/review` endpoint
- ✅ `src/components/b6/AegisBadge.tsx` — UI бейдж с risk score + flags
- ✅ ApprovalQueue показывает Aegis-обзор для каждого pending action
- ✅ `ws/events.py` — Socket.IO ASGI server, mounted в FastAPI
- ✅ `socket_app` (вместо `app`) — entry point с WS
- ✅ `src/lib/b6-socket.ts` — socket.io-client + useB6Events hook
- ✅ `src/components/b6/LiveEventStream.tsx` — real-time event log с авто-скроллом + indicator

### Day 5 — Campaigns API + Dashboard polish
- ✅ `routers/campaigns.py` — GET `/api/campaigns?customer_id=X` (с 30с in-memory кешем), GET `/api/campaigns/{id}/metrics`
- ✅ Frontend `listCampaigns()` функция в `b6-api.ts`
- ✅ Дашборд тянет кампании из backend (вместо hardcoded MOCK_CAMPAIGNS)
- ✅ **Подсветка active campaign** при live event (когда Buzz зовёт `get_campaign_metrics` для X — карточка X светится cyan)
- ✅ Stats bar расширен до 6 ячеек: + 🛡️ Blocks + 🛡️ High-risk

### Day 6 — Маскоты с анимацией Framer Motion
- ✅ `src/components/b6/MascotLayer.tsx` — overlay с маскотами:
  - **Buzz 🐝** идёт на карточку кампании когда Buzz её обрабатывает (через `[data-campaign-id]` DOM lookup)
  - **Aegis 🛡️** появляется во время ревью
  - Speech bubble с текущим действием («читаю метрики», «предлагаю поднять ставку», «ревьюю»)
  - Spring physics + idle покачивание + smooth transitions
- ✅ `CampaignCard.tsx` обновлён с `data-campaign-id` + glow box-shadow при highlighted
- ✅ `BaseAgent.max_tokens: 4096 → 8192` (фикс Aegis при множестве pending actions)

### Sprint 3 — Production prep + Launch kit
- ✅ `npm run build` — production frontend сборка проходит чисто (только что проверено)
  - Все 22 API routes собрались
  - /b6 dashboard: 64.4 kB первой загрузки
  - 1000+ programmatic blog страниц (от Kampaio v1)
- ✅ Postgres compatibility verified — наш `_to_async_url()` правильно конвертирует `postgresql://` → `postgresql+psycopg://`. DDL preview для Postgres dialect валиден.
- ✅ Lazy-init Resend в старых Kampaio API routes (`/api/register`, `/api/send-reset-email`) — иначе build падал без `RESEND_API_KEY`
- ✅ `scripts/smoke-prod.sh` — 8-checks production smoke test (health, frontend, waitlist, Socket.IO, OpenAPI, SSL, Stripe webhook, agent run)
- ✅ `LAUNCH.md` — 2-часовая инструкция запуска (Hetzner + DNS + Stripe + Resend + Vercel)
- ✅ `LAUNCH-CONTENT.md` — готовые тексты для:
  - Twitter тред (7 твитов)
  - Reddit r/PPC, r/SmallBusiness, r/AskMarketing
  - LinkedIn post
  - Hacker News «Show HN»
  - Product Hunt launch
- ✅ Удалён duplicate import `CampaignFromAPI` в `b6/page.tsx`

### Sprint 2.5 — Sage (Research Agent) — keyword + audience expansion
- ✅ `agents/research_agent.py` — Sage 🦉 (7-й агент, **финальный по плану**)
  - Анализирует текущие ключи и метрики
  - Tools: `propose_keyword`, `propose_audience`, `finalize_research`
  - Группирует ключи по themes (product-feature / urgency / lifestyle / informational)
  - Указывает match_type (EXACT/PHRASE/BROAD) + intent (commercial/informational/navigational)
  - Audiences: in-market / affinity / custom_intent / lookalike / demographic
  - Стоимость прогона: ~$0.15-0.20, время ~125с (много tool calls)
- ✅ `routers/agents.py` — поддержка `agent_type: "research"` (требует campaign_id как Mira)
- ✅ `src/components/b6/SagePanel.tsx` — UI:
  - Селектор кампании
  - 2-колоночный layout: keywords (grouped by theme) + audiences
  - Цвет по match_type (EXACT=teal, PHRASE=blue, BROAD=orange)
  - Иконки по intent (💰/📚/🎯)
- ✅ E2E: Sage предложил 9 ключей + 3 аудитории + competitor angle за 127с

### Sprint 2.4 — Mira (Creative Agent) — генерация ad copy + картинок
- ✅ `services/image_gen.py` — fal.ai wrapper (Flux model) с mock-fallback (picsum placeholders в dev)
- ✅ `agents/creative_agent.py` — Mira 🎨 (6-й агент)
  - Читает контекст кампании (метрики + ключи)
  - Генерит **3 варианта** ad copy в одном tool-call:
    - Headline 1 (≤30 символов)
    - Headline 2 (≤30 символов)
    - Description (≤90 символов)
    - Image prompt для display ad
    - Rationale почему такой угол
  - Опционально вызывает `image_gen.generate_image()` для каждого варианта
  - Стоимость прогона: ~$0.10, время ~60с
- ✅ `routers/agents.py` — поддержка `agent_type: "creative"` + обязательный `campaign_id`
- ✅ `src/components/b6/MiraPanel.tsx` — UI:
  - Селектор кампании
  - Кнопка «Сгенерировать»
  - Для каждого варианта — image + Google Ads style preview (как в реальной выдаче) + Why
- ✅ E2E: Mira создала 3 разных угла (Warmth & Function / Urgency & Season / Premium Value) с reasoning на основе ROAS+keywords
- ✅ Frontend полностью wired — `rawCampaigns` идёт в MiraPanel

### Sprint 2.3 — Maximus (Orchestrator) + full autonomy L1/L2/L3
- ✅ `agents/orchestrator.py` — Maximus 🐻 (5-й агент)
  - **Не Claude-агент**, а deterministic rules engine (предсказуемость > творчество)
  - Применяет правила к pending actions на основе `user.autonomy_level`:
    - **L0/L1**: 0 auto-approve (всё через ручной апрув)
    - **L2**: auto-approve если Aegis="approve" + confidence ≥ 0.8
    - **L3**: auto-approve если Aegis ∈ {"approve","review"} + confidence ≥ 0.85
    - **block** от Aegis — никогда не апрувим даже на L3
- ✅ `routers/orchestrator.py` — endpoints:
  - `POST /api/orchestrator/cycle` — запустить cycle (опц. override autonomy)
  - `GET /api/orchestrator/latest` — последний cycle (для frontend)
  - `POST /api/orchestrator/autonomy` — поменять уровень юзера
- ✅ `src/components/b6/MaximusPanel.tsx` — UI:
  - 4 кнопки autonomy level (L0/L1/L2/L3) с прайсом
  - Кнопка «Запустить cycle» + последний результат
  - Stat-боксы (auto-approved / pending / blocked)
  - Детальный список с reasoning по каждому action
- ✅ E2E проверен на L1/L2/L3: 0 / 0 / 1 auto-approve (correct по правилам)
- ✅ Pricing tiers теперь имеют **реальное** функциональное отличие, а не просто цена

### Sprint 2.2 — Vox (Strategy Agent) — cross-campaign budget reallocation
- ✅ `agents/strategy_agent.py` — Vox 🦊 (4-й живой агент)
  - Видит **все кампании** одновременно (vs Buzz который смотрит одну)
  - Принимает **cross-campaign** решения: shift бюджета от плохого к хорошему
  - Tool `propose_budget_shift` с zero-sum check
  - Tool `submit_no_action` если ничего менять не нужно
- ✅ `/api/agents/run` теперь поддерживает `agent_type: "strategy"` (не только "bidding")
- ✅ После Vox — auto-run Aegis (так же как с Buzz)
- ✅ Mock-данные в `google_ads_client.py` обновлены: 3 кампании с **разной** ROAS (5.88, 2.10, 1.40) — чтобы у Vox было что перераспределять
- ✅ End-to-end проверен: Vox сделал zero-sum реалокацию ($+10 / -$4 / -$6 = 0), Aegis отревьюил включая overspend warning

### Sprint 2.1 — Echo (Reporting Agent) + email infrastructure
- ✅ `services/emailer.py` — Resend wrapper с mock-fallback (когда нет real API key → пишет в `sent_emails.jsonl`)
- ✅ `agents/reporting_agent.py` — Echo 📊 (3-й живой агент)
  - Анализирует `agent_actions` + `audit_log` за период
  - Генерит структурированный digest (summary, top_decisions, advice)
  - Не зовёт Google Ads API (read-only, дешевле)
  - Стоимость прогона: ~$0.05-0.10, время ~15-20с
- ✅ `routers/digest.py` — `POST /api/digest/run` + `GET /api/digest/latest`
- ✅ `welcome email` встроен в waitlist signup (mock-режим в dev)
- ✅ `DigestPanel.tsx` — компонент на дашборде с кнопкой «Сгенерировать» + советом от Echo
- ✅ Frontend `getLatestDigest()` + `runDigest()` в API client

### Day 7 — Production prep (landing + waitlist + Stripe + Docker)
- ✅ `ai-server/routers/waitlist.py` — `/api/waitlist/signup` + `/api/waitlist/stats` (отдельная SQLite БД)
- ✅ `ai-server/routers/internal.py` — `/api/internal/stripe-sync` для server-to-server sync от Next.js webhook
- ✅ `src/app/page.tsx` — **полностью переписан** под B6 (Hero + 3-step How + Meet The Team + 3-tier Pricing + CTA + Footer)
  - Старый сохранён как `src/app/page.kampaio-legacy.tsx.bak`
- ✅ `src/app/api/stripe-webhook/route.ts` — Next.js webhook handler (checkout/subscription events)
- ✅ `ai-server/Dockerfile.b6` — production-ready Docker image (Python 3.11 + Postgres driver)
- ✅ `docker-compose.prod.yml` — full stack (Postgres + Redis + B6 API + Caddy)
- ✅ `Caddyfile` — auto-HTTPS reverse proxy для Hetzner
- ✅ `.env.prod.example` — production environment template
- ✅ `DEPLOY.md` — пошаговая инструкция (~25K, всё что нужно для запуска)

---

## 📊 Метрики проекта

| Метрика | Значение |
|---------|----------|
| Строк кода (Python + TS) | **~8,200** |
| HTTP endpoints | **22** |
| AI-агентов работают | **7 из 7 по плану ✅** |
| DB таблиц активно используется | 5 (+ waitlist.db, + sent_emails.jsonl) |
| Frontend компонентов | 13 (включая landing + DigestPanel) |
| Стоимость 1 прогона Buzz+Aegis+Echo | ~$0.30-0.40 |
| Время прогона | ~80-100 секунд |
| Production infra | Docker compose готов, Caddyfile готов, DEPLOY.md есть |
| Email infra | Resend wrapper готов (mock в dev, real в prod) |

---

## 🚧 Что в работе / следующий шаг

**Sprint 1 — КОД ЗАВЕРШЁН.** Все 7 дней закрыты. Дальше нужно фактический deploy с реальными credentials.

### Что ещё **руками** должен сделать Виталий (Sprint 1 finalization):

- [ ] Создать Hetzner VPS (CX22) — см. [`DEPLOY.md`](./DEPLOY.md) шаг 1
- [ ] Купить/настроить DNS `api.kampaio.com` → IP VPS (proxy off)
- [ ] Создать 3 Stripe продукта (L1 $99 / L2 $199 / L3 $399) + webhook endpoint
- [ ] Получить **Anthropic production API key** (отдельно от dev)
- [ ] Получить **Google Ads Developer Token** (если ещё нет) + OAuth credentials
- [ ] Зарегистрироваться на Resend (3K emails free)
- [ ] Заполнить `.env.prod` всеми секретами
- [ ] `docker compose -f docker-compose.prod.yml --env-file .env.prod up -d`
- [ ] Deploy frontend на Vercel с env переменной `NEXT_PUBLIC_B6_API_BASE=https://api.kampaio.com`
- [ ] Smoke test: лендинг → waitlist signup → демо `/b6`
- [ ] Запись 60-сек видео маскотов в действии (для маркетинга)
- [ ] Postинг анонса в r/PPC, r/AskMarketing, r/SmallBusiness, Hacker News, Indie Hackers, Twitter, LinkedIn

### Sprint 2 — рост до первых платящих (Week 2-4 после launch):
- [ ] Email авторизация для реальных юзеров (сейчас single dev-user)
- [ ] Onboarding flow: register → connect Google Ads → choose tier
- [ ] Email-уведомления через Resend (welcome, weekly digest, alerts)
- [ ] Первые 5 beta-юзеров — бесплатный L1 в обмен на 30-минут call раз в неделю
- [ ] Iterate на основе фидбека
- [ ] Конвертить в первого платящего

---

## ⚠️ Open Decisions (требуют решения Виталия)

1. **Google Ads Production Token**:
   - (a) Активный → стартуем real campaigns
   - (b) Expired / revoked → ресубмишн (4-8 нед review), параллельно sandbox
   - (c) Никогда не получали → first submit
   - **Текущий статус: НЕИЗВЕСТНО — спросить пользователя**

2. **Domain**:
   - (a) Оставить `kampaio.com` (existing — экономия + SEO)
   - (b) Новый под autonomous angle (`aipilot.run`, `autopilotads.com`)
   - **Текущая рекомендация: оставить kampaio.com**

3. **Production DB hosting**:
   - (a) Managed Postgres на Hetzner
   - (b) Supabase (managed, auth bundled, free tier есть)
   - (c) Self-hosted Postgres на том же VPS
   - **Текущая рекомендация: Supabase для скорости запуска**

4. **Маскоты — стиль**:
   - (a) Текущие emoji (🐝 🛡️) — простой, рабочий
   - (b) Custom SVG sprites (более premium)
   - **Текущая рекомендация: emoji на MVP, custom SVG потом**

5. **Default Claude model**:
   - (a) Sonnet 4.6 — текущий выбор (~$0.20 за прогон)
   - (b) Opus 4.7 — лучше но в 4-5× дороже
   - (c) Mix — Sonnet для рутины + Opus для Risk
   - **Текущий выбор: Sonnet 4.6**

---

## 🚨 Критические замечания

### API ключ Anthropic скомпрометирован
В предыдущей сессии (Day 1) пользователь вставил API ключ в чат. Лог сохраняется → **ключ обязан быть ротейтнут**.
- Где: https://console.anthropic.com/settings/keys
- Если не ротейтнут — кто-то может списывать с счёта

### Google Ads Production Token — главный блокер
Без него мы можем запускать только **mock-демо**. Реальные write-операции (`update_bid`, `pause_campaign`) **выбрасывают NotImplementedError** в production режиме до получения token.

**Подача**: https://ads.google.com/aw/apicenter — обычно 4-8 недель review.

### Stripe webhook gap
Сейчас `src/app/checkout/page.tsx` принимает оплату, но **нет** обработчика webhook'ов. Если кто-то купит — у него не будет подписки в БД до ручной синхронизации. **Day 7 priority**.

### Single-tenant сейчас
Всё захардкожено на `dev-user-001`. Multi-tenancy в roadmap (Week 3-4).

---

## 🎯 Что попробовать в браузере (если ты Виталий и зашёл свежим)

1. Открыть http://localhost:3002/b6
2. Подождать 2 секунды → 3 кампании загрузятся
3. Нажать «🐝 Run Buzz now»
4. Смотреть live theatre:
   - 🐝 Buzz в центре «думает»
   - 🐝 летит на карточку Winter Shoes Promo → «читаю метрики»
   - 🐝 перелетает на Summer Sale → Brand Defense
   - 🐝 «проверяю лимиты» → «предлагаю поднять ставку»
   - 🐝 «закончил» → исчезает
   - 🛡️ Aegis появляется «анализирует...»
   - 🛡️ облетает карточки которые ревьюит
   - 🛡️ «закончил»
5. Видишь 3 proposed actions с Aegis-бейджами (зелёный/оранжевый/красный по risk)
6. Можешь Approve/Reject — изменения сразу в Activity Feed

---

## 📁 Файлы которые могут потребоваться

| Файл | Размер | Содержит |
|------|--------|----------|
| [`CLAUDE.md`](./CLAUDE.md) | ~10K | Постоянные правила, конвенции, команды |
| [`HANDOFF.md`](./HANDOFF.md) | этот файл | Текущее состояние, roadmap |
| [`/Users/vitaly/.claude/plans/noble-waddling-sparkle.md`](/Users/vitaly/.claude/plans/noble-waddling-sparkle.md) | ~50K | Полный архитектурный план |
| `B6_DAY1_SUMMARY.md` | legacy | Day 1 итог (информация теперь в HANDOFF) |
| `B6_DAY2_SUMMARY.md` | legacy | Day 2 итог (информация теперь в HANDOFF) |
| `README.md` | старый | Kampaio v1 description (можно обновить под B6 на Day 7) |

---

## 🏃 Если пользователь сказал «продолжаем» / «идем дальше»

Скорее всего хочет переходить к **Day 7** (deployment). Спросить **не нужно**, потому что:
- Auto mode активен
- В предыдущем сообщении предлагался Day 7
- User паттерн: продолжать не останавливаясь

**Первый шаг Day 7**: написать `docker-compose.yml` для prod stack (FastAPI + Postgres + Redis) и обсудить Hetzner credentials.

## 🛑 Если пользователь сказал «стоп» / спрашивает что-то

- Не начинай новую работу. Сначала ответь на вопрос.
- Если просит summary — посмотри сюда и в [`CLAUDE.md`](./CLAUDE.md)
- Если хочет показать другу — самое быстрое: дай ему открыть `http://localhost:3002/b6` (если серверы живы)
