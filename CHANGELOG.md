# Changelog

История изменений B6 — Autonomous PPC Cabinet.

Формат: версии по Sprint'ам. Каждая запись — что добавлено/изменено/исправлено.

---

## [Sprint 5 close — Live Validation] — 2026-05-13 — Buzz/Aegis протестированы на реальном клиентском аккаунте

После того как OAuth flow собрался и backend стал читать реальные данные, оставалось доказать end-to-end что **AI-агенты реально работают на production-данных**. Этот sub-sprint закрыл этот gap.

### Live test #1 — Buzz + Aegis на Goodevas It (3133506664)

Curl trigger:
```bash
curl -X POST https://api.kampaio.com/api/agents/run \
  -d '{"user_id":"dev-user-001","agent_type":"bidding","customer_id":"3133506664"}'
```

Результат за 87 секунд:
- **Buzz**: 5 iterations, 9 tool_calls (list_campaigns → get_campaign_metrics × 2 → get_keyword_metrics × 2 → check_safety_cap × 2 → propose_pause_campaign × 2)
- **Aegis**: 2 iterations, 8 risk_reviews
- **Proposed actions**: 2 stored in DB (pause Pmax_Goodevas_It_All-Products, bid_decrease SN_Goodevas_It_Brand)
- **Aegis flags обнаружены**: brand_campaign_pause, low_budget_vulnerability, conflicting_action (обнаружил конкурирующий action на одну кампанию!), zero_roas_brand_suspicion, bid_change_28pct
- **Risk score range**: 35 → 82 (BLOCK threshold 75+)
- **2 действия BLOCKED** на risk_score 82 (brand pause без верификации tracking)

Это уровень senior PPC analyst. Buzz нашёл реальную проблему (ROAS 0.07 в Pmax с $838 spend за 7 дней), Aegis грамотно отметил что nil-conversion на бренд-кампании скорее всего сломанный tracking, а не реальная неэффективность.

### Live theatre validated

Socket.IO события визуально показывают каждый tool call в `/b6 → Live от агентов` секции в real-time:
```
11:39:24  🐝 calling list_campaigns(3133506664)
11:39:29  🐝 calling get_campaign_metrics(22932954882, days=7)
11:39:34  🐝 calling get_keyword_metrics(22932954882)
11:39:34  🐝 calling check_safety_cap(bid_change_pct_max, 50)
11:39:52  🐝 calling propose_pause_campaign(22932954882)
11:40:51  🛡️ calling submit_review(risk_score=82)
11:41:05  ✓ Session complete — 2 proposed, 8 reviewed
```

### Vercel Production Branch fix

Все commit'ы Sprint 5 деплоились как **Preview**, не Production. Причина: Production Branch в Vercel project settings был `main`, а наша работа на `v2-autonomous-agents`. Промоут руками работал, но auto-deploy ломался.

**Фикс**: Vercel → Settings → Environments → Production → Branch Tracking: `main → v2-autonomous-agents`. Save. После этого все push'и в `v2-autonomous-agents` идут в Production автоматически без ручного Promote.

### Database cleanup

После переключения на real data в БД остались 2 leftover proposed_actions с mock customer_id (`1234567890`) и mock campaign_ids (`100001`, `100002`, `100003`). DELETE не работает из-за FK constraint от `audit_log`, поэтому помечены как `rejected` (status update). Audit trail сохранён.

```sql
UPDATE agent_actions SET status = 'rejected'
WHERE status = 'proposed'
  AND (target->>'customer_id' = '1234567890'
       OR target->>'campaign_id' IN ('100001', '100002', '100003'));
-- UPDATE 2
```

### Verified end-to-end на проде

- ✅ Frontend `/b6` показывает header `Customer 3133506664 · prod data`
- ✅ 10 реальных Goodevas кампаний отображаются с правильными цветами (ROAS 0.07 = красный, CTR 24% = cyan)
- ✅ Stats bar: Pending 5, Rejected 3, Blocks 3, High-risk 3, Tool calls 9
- ✅ Live от агентов показывает Socket.IO события в реальном времени
- ✅ Approval Queue содержит 5 реальных предложений с Aegis-бейджами (risk_score 45-82)
- ✅ Mira / Sage dropdowns показывают реальные campaign имена (Pmax_Goodevas_It_All-Products)

### Git (Sprint 5 close commits)

- `beeb36d` — chore: trigger Vercel redeploy (latest commits queued)
- `580a6bd` — B6 docs: Sprint 5 refresh — Google Ads OAuth + real data

### Operational changes (not in git)

- `.env.prod`: `GOOGLE_ADS_USE_MOCK=true → false`
- DB: 33 GoogleAdsAccount rows, 32 marked is_active=false, only `3133506664` is_active=true
- DB: 2 mock-leftover actions marked `rejected`
- Vercel: Production Branch `main → v2-autonomous-agents`

### Sprint 5 = ОФИЦИАЛЬНО ЗАКРЫТ

B6 теперь не demo / mock / launch-ready. **Это работающий SaaS продукт на реальных клиентских данных**.

---

## [Sprint 5] — 2026-05-13 — Google Ads OAuth + real data integration

После launch'а агенты в проде работали на mock-кампаниях. Этот sprint подключил **реальный Google Ads API** через OAuth flow.

### Что построено

**Backend (`ai-server/`):**
- `routers/google_ads.py` (новый, ~280 строк) — 4 endpoint'а:
  - `GET /api/google-ads/oauth/start` — генерирует Google OAuth URL с CSRF state token, TTL 10 мин
  - `GET /api/google-ads/oauth/callback` — exchange code → refresh_token → list accessible customers → save в DB
  - `GET /api/google-ads/accounts` — list connected accounts для юзера
  - `DELETE /api/google-ads/accounts/{id}` — soft disconnect (is_active=false)
- `services/google_ads_client.py`: добавлены helpers
  - `exchange_code_for_tokens(code, redirect_uri)` — initial OAuth code exchange (one-time, gets refresh_token)
  - `list_accessible_customers(refresh_token)` — fetch user's Google Ads customer IDs через `listAccessibleCustomers` API
- `routers/campaigns.py` + `agents/tools.py`: `_get_access_token()` больше не читает `DEV_REFRESH_TOKEN` env var, а делает SQLAlchemy lookup в `google_ads_accounts` table по `customer_id` (или `user_id` fallback)
- `agents/research_agent.py` + `agents/creative_agent.py`: используют `_get_access_token_for` из tools.py (DB-based) вместо легаси env var

**Frontend (`src/`):**
- `components/b6/GoogleAdsConnect.tsx` (новый, ~256 строк) — UI блок на дашборде:
  - 0 connections → большая CTA «🔗 Connect Google Ads» с описанием value
  - ≥1 connection → compact status «✅ Google Ads подключён» + список первых 3 ID + «+ Добавить ещё» button
  - Picks up `?google_ads_connected=N` / `?google_ads_error=...` из URL после OAuth callback, показывает баннер, scrubs query params
- `lib/b6-api.ts`: добавлены `startGoogleAdsOAuth()`, `listConnectedAccounts()`, `disconnectGoogleAdsAccount()` typed client methods
- `app/b6/page.tsx`:
  - Заменён hardcoded `CUSTOMER_ID = "1234567890"` на динамический `activeCustomerId` state
  - На mount fetches `listConnectedAccounts()` → выбирает первую `is_active=true` connection → её customer_id используется во всех API calls (`listCampaigns`, `runAgent`, etc.)
  - Header показывает `Customer XXX · prod data` или `· mock mode` (динамически)

### Production setup

- **Google Ads Developer Token**: `Basic Access` (15K ops/day) — у юзера на customer K0514922126
- **OAuth Client `Kampaio OAuth Client`**: project `Pyton` на Google Cloud, redirect URIs обновлены (добавлены `https://api.kampaio.com/api/google-ads/oauth/callback` и `http://localhost:8000/...`)
- **.env.prod на сервере**: добавлены ANTHROPIC_API_KEY, GOOGLE_ADS_DEVELOPER_TOKEN, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET (передавались через SSH stdin, не через chat). `GOOGLE_ADS_USE_MOCK=true → false`.
- **dev-user-001** seeded в prod DB через `scripts/seed_dev.py`.

### Что подключилось

После OAuth flow юзера (PPC специалиста) **`listAccessibleCustomers` вернул 33 реальных Google Ads аккаунта** (client portfolio + own). Все 33 записаны в `google_ads_accounts` таблицу с одним общим refresh_token. Один marked `is_active=true` для тестов — **`3133506664`** (Goodevas It, итальянский рынок).

API `GET /api/campaigns?customer_id=3133506664` возвращает **10 реальных кампаний**: Pmax_Goodevas_It_All-Products, SN_Goodevas_It_Brand, Pmax_Goodevas_It_Top-Products-1, etc.

### Bugs found and fixed mid-sprint

- **`list_accessible_customers` тоже возвращал mock** когда `GOOGLE_ADS_USE_MOCK=true`. Первый OAuth flow создал в DB connection с фейковым customer_id `1234567890`. Фикс: account-listing **всегда** идёт в real API (flag должен влиять только на campaign-data queries). Запустил Python helper script на сервере чтобы delete-all + re-insert 33 real connections.

### Open issues для следующего sprint

- **Buzz/Aegis не тестированы на реальном аккаунте**. По коду готовы, но live test = «нажать Run Buzz на /b6» с реальными $114/day кампаниями — рискованно (даже в dry_run). Безопаснее: dedicated test account или explicit подтверждение от юзера.
- **Vercel deploy queue lag**: 3 коммита (728d05f → 1f65c98) задеплоились с задержкой. Production Branch требует проверки.
- **Multi-tenancy still pending**. Всё на `dev-user-001`. Когда придёт второй юзер — `INSERT INTO users` руками.
- **33 connections shared one refresh_token**. Корректно (один OAuth grant), но если юзер revokes доступ в Google Account settings — все 33 connections разом перестанут работать.

### Git (Sprint 5 commits)

- `f9ae0f1` — feat: Google Ads OAuth flow (backend + frontend)
- `f84e854` — fix: list_accessible_customers always calls real Google API
- `728d05f` — feat: dashboard uses dynamic customer_id from connected accounts
- `86057b8` — feat: load Google Ads refresh_token from DB (not env var)
- `1f65c98` — fix: dashboard header — proper MOCK_CUSTOMER_ID name + dynamic mode label

---

## [SEO sister-project integration] — 2026-05-13 — Sitemap, blog component, 3rd article

> Контекст: `/Users/vitaly/Vit+/projects/seo-agent-team/` — отдельный pipeline для контент-маркетинга B6. Sister project (см. `CLAUDE.md` → «Связанные проекты»). За этот sprint добавлен infrastructure-код в `ppc-landing/` для поддержки auto-publish из sister project.

### Added in `ppc-landing/`
- **`src/components/blog/MascotQuote.tsx`** — React-компонент для inline-цитат маскотов (Buzz/Aegis/Echo/Vox/Maximus/Mira/Sage) внутри blog-статей. Стилизованные блок-цитаты с цветной полосой слева на бренд-цвет каждого маскота. Используется только в `/blog/`.
- **`src/app/sitemap.ts`** — dynamic sitemap для kampaio.com. Auto-discovers blog articles из filesystem (`src/app/blog/<slug>/`), читает `datePublished`/`dateModified` из JSON-LD каждой статьи. Заменяет статический `public/sitemap.xml`. При публикации новой статьи sitemap обновляется автоматически на следующем Vercel build — без manual maintenance.
- **`src/app/blog/google-ads-without-agency/page.tsx`** — 3-я auto-published статья (agency-burnt persona, 36KB TSX). Commit `5eaad93`.

### Fixed
- **`public/robots.txt`**: Sitemap directive указывал на старый домен `https://ppcset.com/sitemap.xml`. Исправлено на `https://www.kampaio.com/sitemap.xml`.
- **`public/sitemap.xml`**: удалён (replaced by dynamic).

### Side effect — blog index расширен
`src/app/blog/page.tsx` теперь содержит 3 entries id=8,9,10 для auto-published статей. Поддерживается тем же SEO Agent Team publisher автоматически.

### Open blockers (для sister project L3)
- **Gap #1: Vercel production deploy не автоматический.** Push в `v2-autonomous-agents` помечается как `env=Preview` в GitHub API; `kampaio.com` обслуживается через alias к конкретному preview deployment. Чтобы SEO Agent Team L3 cron мог сам публиковать статьи — нужно решить: смена **Production Branch** в Vercel UI с `main` на `v2-autonomous-agents`, либо merge `v2-autonomous-agents` → `main` после каждой статьи, либо `vercel promote` в publisher.
- **Gap #2: `claude -p` зависает после успешного git push.** Sister project quick fix — `timeout 1200` в scheduler.sh.

### Commits (all in origin)
- `482e8ce` blog: dynamic sitemap.ts + robots.txt domain fix
- `5eaad93` blog: add google-ads-without-agency
- `73e8cc7` blog: strip em-dashes from auto-generated articles

---

## [🚀 Launch Day] — 2026-05-12 — Production live на kampaio.com

После долгого пути из «launch-ready» в реально-в-проде. ~3 часа работы.

### Production stack
- **Frontend**: Vercel Hobby tier, `www.kampaio.com`, branch `v2-autonomous-agents`. Env vars `NEXT_PUBLIC_B6_API_BASE` + `B6_API_BASE` = `https://api.kampaio.com`.
- **Backend**: Hetzner CPX22 ($9.49/mo, 2 vCPU AMD, 4 GB RAM, Nuremberg, Ubuntu 24.04), IP `178.104.124.150`, account `K0514922126` (новый, после cancellation старого `K0742311825`).
- **DNS**: GoDaddy — `api.kampaio.com` A → Hetzner IP; `www.kampaio.com` CNAME → Vercel.
- **SSL**: Caddy 2 + Let's Encrypt production cert (E8 issuer). Valid 2026-05-12 → 2026-08-10. Auto-renew enabled.
- **Stack**: Docker compose prod — Postgres 16-alpine + Redis 7-alpine + b6-api (FastAPI + Socket.IO) + Caddy.

### Process highlights
- Создан новый Hetzner аккаунт после того как старый был cancelled 02/2025 за неоплаченный invoice $5.09. KYC verification прошла за ~5 минут.
- GitHub Personal Access Token настроен в macOS Keychain → `git push` теперь без интерактивного ввода.
- `.env.prod` сгенерирован на сервере (POSTGRES_PASSWORD + B6_INTERNAL_SECRET через `openssl rand`) — секреты не попали в чат и не покинули сервер.

### Smoke test results (8/8 ✅)
- Backend `/health` → `{"status":"ok","mock_mode":"true","model":"claude-sonnet-4-6","socketio":true}`
- Frontend `/` + `/b6` → HTTP 200
- Waitlist signup + dedup работает
- Socket.IO handshake OK
- `/docs` Swagger UI → 22 endpoints зарегистрировано
- SSL cert валидный (до 2026-08-10)

### Fixed (live deploy revealed)
- `ai-server/requirements.txt`: добавлен `psycopg2-binary>=2.9.9`. Был закомментирован «не нужен на dev» — но в проде с Postgres URL `postgresql://` SQLAlchemy требует psycopg2.
- `package.json`: bumped `next` `15.3.5 → 15.5.18` — Vercel блокирует деплои уязвимых версий Next.js, build шёл но deployment failed на security check.

### Tail (после launch — не критично)
- `ANTHROPIC_API_KEY` в `.env.prod` пустой — backend стартует, /health OK, но любая попытка запустить агента вернёт ошибку. Ротация ключа + `sed` через SSH — задача 5 минут когда юзер готов.
- `<title>` в `src/app/layout.tsx` остался `"Kampaio - Digital Ecosystem"` от старого Kampaio v1 — cosmetic, заменить на B6-релевантное.
- Старый долг Hetzner $5.09 на `K0742311825` — bank transfer на IBAN `DE47 7655 1540 0000 1758 02` чтобы не уйти в коллекторов.

### Git (Launch Day commits)
- `f547a2d` — B6 brand: add BRAND-BRIEF.md + update Hetzner status
- `181efe6` — B6 fix: add psycopg2-binary for Postgres in production
- `5bb3afe` — B6 fix: upgrade Next.js 15.3.5 → 15.5.18 (security patches)
- `30d6b8a` — B6 LAUNCH: production live on kampaio.com

---

## [Sprint 3.5] — 2026-05-12 — Brand voice playbook

### Added
- `BRAND-BRIEF.md` (276 lines) — 7-block playbook собранный в коллаборации:
  - Mission & Voice (прямой / эксперт / разговорный через маскотов)
  - Audience (3 персоны: panicked DIY / tool-shopper / agency-burnt, tech-level 3.5)
  - Writing style (1200-1800 слов default, scannable, hybrid persona с mascot speech bubbles)
  - AI Visibility rules (front-load, flexible H2, definitive "X is Y", aggressive entity richness, analyst voice ≈0.47)
  - References (Patio11, Julian Shapiro, Backlinko, Aleyda Solis, PPC Mastery)
  - Hard rules / Taboos (запретные темы, competitor engagement, format rules, cringe-flags)
  - 12-point Quick-Reference Checklist для прогона перед публикацией

Designed as system prompt source для Mira (Creative Agent) и future blog-writer agent.

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
