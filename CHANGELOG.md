# Changelog

История изменений B6 — Autonomous PPC Cabinet.

Формат: версии по Sprint'ам. Каждая запись — что добавлено/изменено/исправлено.

---

## [Sprint 8.6 — DONE] — 2026-05-21 — Mira type-aware creative generation

**Статус**: ✅ DONE на проде (commit `8173c96` + UI polish + deploy 2026-05-21 ~19:13 UTC).

Реальная проблема, которую Mira до Sprint 8.6 имела: она генерила 3 коротких варианта (1 headline + 1 description каждый) **независимо от типа кампании**. Это не подходит ни одному реальному use-case:
- Search Campaigns требуют 15 headlines + 4 descriptions для одного RSA
- Performance Max требует Asset Group с 5 short + 5 long + 5 descriptions + 5 image prompts
- Shopping/Video вообще не принимают custom creatives

Плюс Mira не знала **что рекламируется** — только campaign name → галлюцинировала контекст (Brand / FI → "финансовые услуги" вместо e-commerce GoodEvas).

### Что починили

**Backend `services/google_ads_client.py`**:
- `list_campaigns()` теперь SELECTs `campaign.advertising_channel_type`
- Новая функция `get_campaign_landing_urls(customer_id, campaign_id)` — GAQL по `ad_group_ad.ad.final_urls` + fallback на `asset_group.final_urls` (PMax)

**Backend `agents/creative_agent.py`**:
- `CHANNEL_SPECS` table — single source of truth для format'ов:
  - `SEARCH`: 15 short headlines (30 chars) + 4 descriptions (90), no images
  - `PERFORMANCE_MAX`: 5 short + 5 long (90 chars) + 5 descriptions + 5 image prompts
  - `DISPLAY`: 5 short + 1 long + 5 descriptions + 5 image prompts
- `UNSUPPORTED_CHANNELS` (SHOPPING / VIDEO / SMART) — Mira отказывается early с одной строкой объяснения, не жжёт токены на lost-cause запросы
- System prompt переписан: must derive offering from landing URL (not campaign name), must produce EXACT counts, distinct items only
- Tool schema **динамически билдится** per channel — JSON Schema enforces `minItems`/`maxItems` = exact count чтобы LLM получал validation feedback если under-delivers
- Image generation: только first prompt рендерится как preview (rest сохраняются text-only), полная multi-image gen deferred до Sprint 11 pMax pipeline

**Frontend `components/b6/MiraPanel.tsx`**:
- `VariantCard` переписан: numbered headlines list + per-item char counter (красный если over limit), descriptions list, image prompts только если `needs_images=true`
- Channel-type badge на каждой карточке ("Search RSA (Responsive Search Ad)")
- "📋 Copy all to clipboard" button — paste прямо в Google Ads UI
- Сохранение backwards compatibility: старые записи `headline_1` + `headline_2` рендерятся пустыми (не падают)

### Реальный prod test

Brand / FI campaign (Search):
- Mira прошла landing_url → `goodevas.fi` → корректно поняла что это финский e-com магазин
- Сгенерила 3 angle variants × (15 short headlines + 4 descriptions) = **57 элементов**
- Контекстуально корректные заголовки: "Official GoodEvas Store", "Trusted Finnish Retailer", "EU Consumer Rights Apply", "Limited-Time Offers Live"
- ~$0.21 за прогон (Sonnet 4.6, наблюдаемая стоимость)
- ⚠️ Все 4 descriptions переборщили 90 char limit (LLM weakness на жёстких char-constraints) — пометка красным в UI, юзер видит и поправит при копировании

### Что НЕ сделано (backlog)

- Auto-upload в Google Ads через AssetGroupService API — оператор копирует руками
- Post-processing descriptions до 90 chars (truncate by word)
- Real image generation (5 images через fal.ai) для pMax — пока только 1 preview
- Filter UI: показывать только новые варианты с непустыми массивами (старые рендерятся empty)

---

## [Sprint 8.5 — DONE] — 2026-05-21 (deployed 2026-05-20 19:13 UTC) — Detector rewrite + first-tick fix

**Статус**: ✅ DONE на проде. Триггер: первый prod tick Vigil на 33 Goodevas-аккаунтах показал систематические false positives.

### Что меняли

**`services/anomaly_detector.py`** (commit `79fc8e0`):
1. **Reference day = вчера**, не сегодня. До этого Vigil сравнивал partial-today данные с baseline — каждый вечер генерил false `zero_conversions` / `conversion_drop` алерты потому что Google attribution дотягивает 1-7 дней.
2. **Baseline = median(28 дней)**, не mean(7). До этого ручные изменения бюджета (например Shopping DE раскачали $77 → $400) уплыли в average, маскируя реальные аномалии.
3. **spend_spike → budget-aware**: требует BOTH `spend > 1.3× daily_budget` AND `spend > 1.5× median`. Operator's intentional budget bumps больше не fire'ят.
4. Detector принимает новое поле `daily_budget_micros` per campaign (Mira/Vigil reuse это для смысловой оценки).

**`services/google_ads_client.py::list_campaigns_with_daily_metrics`**:
- GAQL extended с `campaign_budget.amount_micros` чтобы детектор имел budget context

**`services/vigil_scheduler.py`** (commit `6f132c5`):
- First tick delay: `now() + interval_minutes` вместо `now() + 30s`. До этого каждый рестарт триггерил immediate full scan через 30 сек, забивая event loop и блокируя login.

**Default bump**: `VIGIL_DAYS_WINDOW` 14 → 30 (нужно для median(28)) — синхронизировано в `vigil_scheduler.py`, `creative_agent.py`, `agents/tools.py`, `docker-compose.prod.yml` (commits `79fc8e0` + `897a774`).

**`agents/risk_agent.py`** (commit `947d689`):
- Aegis FK guard: validate action_id ownership before audit_log insert (защита от LLM hallucinations)

**`services/google_ads_client.py::_search_stream`** (commit `8771a48`):
- Timeout 30s → 90s/180s; graceful return `[]` на `httpx.ReadError / ConnectError / TimeoutException`
- Без этого первый prod scan имел ~30% timeout-failure rate на crowded Goodevas-аккаунтах

### Verification (smoke test 3-layer)

Layer 1 (pure Python detector с synthetic data):
- 6 campaigns: 4 anomaly + 1 quiet + 1 "intentional budget bump"
- ✅ Все 4 правила fire (spend_spike, conversion_drop, ctr_collapse, roas_drop, zero_conversions)
- ✅ Quiet campaign — 0 alerts
- ✅ **Intentional bump** ($18 budget → $100 with $95 spent) — 0 alerts ✅ budget-aware logic работает

Layer 2 (tool wrapper с mock Google Ads): 5 candidates на 3 mock campaigns
Layer 3 (full VigilAgent с LLM): dedup-логика корректно скипает known alerts

### Real prod impact

До Sprint 8.5: first scan на 33 accounts дал **29 алертов** (включая шум типа "0 conversions today" вечером)
После Sprint 8.5: scans дают **0-4 алерта** (только реальные ROAS drops + zero conversion events на yesterday's settled data)

---

## [UI polish — DONE] — 2026-05-21 — Collapsible панели

**Статус**: ✅ DONE — последовательная UI consistency.

После Sprint 8 на дашборде стало много визуального шума (Aegis flags на каждой Vigil-карточке, длинные списки Maximus, Echo Weekly Digest). Применили pattern "▸ Show / ▾ Hide" к четырём блокам:

- **Aegis flags в VigilPanel** (commit `453f2db`) — collapsed by default
- **Aegis flags + note в ApprovalQueue** через `AegisBadge` (453f2db)
- **Maximus Kept/Blocked lists в MaximusPanel** (commit `6477a67`) — collapsed; Auto-approved остаётся open by default
- **Echo Weekly Digest** (commit `7c1d039`) — весь блок collapsible, localStorage key `b6_echo_open`, PDF/Email/Refresh остаются доступны даже когда свёрнуто

Все паттерны консистентны с уже-существующими collapsible (Vigil panel, Campaigns, Live agent stream).

---

## [Sprint 8 — DONE] — 2026-05-19 — Vigil 🦇: 24/7 autonomous anomaly monitoring

**Статус**: ✅ DONE. Превращает продукт из «юзер жмёт Run» в «AI сам сторожит 24/7». Гейтинговый sprint для L2/L3 pricing — без 24/7 monitoring уровни автономности не отличались бы друг от друга.

**Полный план**: [`~/.claude/plans/b6-sprint-8-vigil.md`](/Users/vitaly/.claude/plans/b6-sprint-8-vigil.md) (6 фаз, ~20ч).

### Phase 1 — Vigil agent + deterministic detector

- `services/anomaly_detector.py` — pure Python, 5 правил (spend_spike, conversion_drop, ctr_collapse, roas_drop, zero_conversions) с tunable thresholds на module level
- `services/google_ads_client.py::list_campaigns_with_daily_metrics` — GAQL `segments.date` per-campaign daily breakdown + детерминированный mock fixture (3 кампании, по 1 аномалии каждого типа)
- `agents/anomaly_agent.py` — `VigilAgent` (BaseAgent subclass), mascot 🦇. Hybrid design: Python детектит candidates → LLM судит severity в контексте + пишет alert текст + дедупит против последних 24h
- `agents/tools.py` — `detect_anomalies_tool`, `propose_anomaly_alert_tool` (action_type='anomaly_alert')
- `routers/agents.py` — 'anomaly' в allowed agent_type, маршрутизация на VigilAgent
- `scripts/smoke_test_vigil.py` — 3-layer test (pure detector / tool wrapper / full agent). Все три проходят.

### Phase 2 — APScheduler 24/7 cron

- `services/vigil_scheduler.py` — `AsyncIOScheduler` в FastAPI lifespan handler. Job каждые `VIGIL_INTERVAL_MINUTES` (default 60), скан всех (user, customer) пар, dedup через `vigil.scan` AuditLog в window `VIGIL_DEDUP_MINUTES` (default 45), max concurrent `VIGIL_MAX_CONCURRENT` (default 3) через `asyncio.Semaphore`
- Hard gate: `VIGIL_ENABLED=true` (default false) — explicit opt-in required в проде
- `app.py` — lifespan handler стартует/стопит scheduler, `/health` показывает scheduler_status (next_run, interval, etc.)
- `routers/internal.py::trigger_vigil_tick` — manual tick для ops через POST /api/internal/vigil/tick
- Verified end-to-end: scheduler сам fired на 20:42:55 (interval=1min), нашёл 1 target, на следующий tick через 60s показал `skipped=1` (dedup ✅), zero Anthropic calls в dedup-tick'е

### Phase 3 — Aegis review of anomaly alerts

- `agents/risk_agent.py::AEGIS_SYSTEM_PROMPT` — расширен на 2 класса actions:
  - **Class A** (mutating: update_bid / pause_campaign / apply_recommendation / add_negative_keyword) — старая логика, approve=safe / review=needs_attention / block=dangerous
  - **Class B** (anomaly_alert) — новые семантики: approve=valid, review=borderline_noise, block=false_positive_hide_from_UI. risk_score переинтерпретирован как «urgency to operator», не «risk to apply»
- `build_initial_prompt` — type-aware listing: для каждого action_type показывает релевантные поля target
- Verified: Aegis правильно даёт score 85-88 для critical anomaly_alerts, замечает compound signals (3 anomalies на одной кампании → escalate), детектит duplicate signals

### Phase 4 — UI Vigil panel + API endpoints

- `routers/anomalies.py` — `GET /api/anomalies/recent?days=N&include_hidden=false`, `POST /api/anomalies/{id}/acknowledge`, `POST /api/anomalies/{id}/dismiss`. По умолчанию скрывает Aegis-blocked + user-dismissed alerts.
- `src/components/b6/VigilPanel.tsx` — секция между live stream и Maximus/Echo. Группировка по severity (🚨 critical / ⚠️ warning / ℹ️ info), per-alert Acknowledge/Dismiss buttons, Aegis score badge, last-scan-Xm-ago label
- `src/lib/b6-api.ts` — `AnomalyAlert` type + `listRecentAnomalies` + acknowledge/dismiss
- `src/app/b6/B6Content.tsx` — stat box «🦇 Alerts (24h)» в stats bar (теперь 7 columns)
- `src/components/b6/LiveEventStream.tsx` — mascot map расширен (Echo/Vox/Maximus/Mira/Sage/Vigil все теперь нативно рендерятся)

### Phase 5 — Email notifications (mock-mode honest)

- `services/vigil_notifier.py` — после каждого Vigil run на (user, customer): digest email критических alerts. Multi-layer фильтрация: min_severity порог, Aegis recommendation == 'block' исключает, per-alert dedupe через `vigil.alert_emailed` AuditLog, per-(user, customer) daily cap `VIGIL_EMAIL_DAILY_CAP` (default 3)
- Reuses `services/emailer.py` (Resend + mock fallback). Subject `[Kampaio] 🦇 N critical alert(s) on customer X`
- Audit-log пишет `vigil.email` + `vigil.alert_emailed` для transparency + dedupe
- Verified: первый вызов отправил mock email с 2 critical alerts, второй вернул `all_already_emailed` ✅

### Phase 6 — Per-user settings (enable/disable + severity threshold)

- `services/vigil_settings.py` — хранение в existing `safety_caps` таблице через cap_types `vigil_enabled` (0/1) и `vigil_min_severity` (0/1/2). Defaults: enabled=true + critical-only emails
- `routers/anomalies.py` — GET/PATCH `/api/anomalies/settings`
- `services/vigil_scheduler.py::_list_scan_targets` — фильтрует disabled users, не тратит токены
- `services/vigil_notifier.py` — filter с per-user `min_severity` (вместо hardcoded 'critical')
- Frontend: ⚙ кнопка в VigilPanel header → inline panel с toggle + severity dropdown. Auto-save через PATCH

### Infrastructure / deps

- `requirements.txt` — добавлен `apscheduler>=3.10.0`
- `app.py` — версия `0.3.0-day4` → **`0.4.0-sprint8`**
- `db/models.py::AgentAction.action_type` — добавлен `anomaly_alert` (string column, миграция не нужна)
- `services/audit.py::_ensure_agent` — mascot_map['anomaly'] = 'Vigil'

### Env vars (Sprint 8 specific)

| Var | Default | Purpose |
|-----|---------|---------|
| `VIGIL_ENABLED` | false | Master kill-switch для scheduler |
| `VIGIL_INTERVAL_MINUTES` | 60 | Scheduler tick frequency |
| `VIGIL_DEDUP_MINUTES` | 45 | Skip rescan window per (user, customer) |
| `VIGIL_MAX_CONCURRENT` | 3 | Max parallel Vigil runs per tick |
| `VIGIL_DAYS_WINDOW` | 14 | Detector lookback window |
| `VIGIL_EMAIL_ENABLED` | true | Allow email notifications when scheduler runs |
| `VIGIL_EMAIL_DAILY_CAP` | 3 | Max emails / (user, customer) / 24h |
| `VIGIL_DASHBOARD_URL` | https://www.kampaio.com/b6 | Link target in email body |

### Что НЕ вошло в Sprint 8 (deferred)

- MascotLayer extension для 🦇 (Vigil появляется в LiveEventStream feed, но не как animated mascot — hardcoded Buzz+Aegis slots нужно рефакторить на generic mascot manager). Sprint 8.5+.
- ML-based anomaly detection (ARIMA/isolation forest) — overengineering для MVP
- Predictive alerts («spend likely to overshoot budget by Friday»)
- Auto-pause на critical anomaly — L3 policy decision, Sprint 9
- Web push notifications — defer until first paying customer asks

---

## [v24 migration + Sprint 6/7 — DONE] — 2026-05-19 — Multi-tenancy + Real Apply + Google Ads API v24

**Статус**: ✅ DONE — продукт готов к первому платящему. Сводка марафона 2026-05-18 → 2026-05-19 (~27 коммитов от `73f0e78` до `50b2baf`).

### Sprint 6 — Multi-tenancy + JWT auth

- `services/auth.py` + `dependencies.py` + `routers/auth.py` — bcrypt + HS256 JWT (7-day TTL), `POST /api/auth/{register,login}` + `GET /me`
- Все 6 protected routers переведены с `dev-user-001` defaults на `Depends(get_current_user)`
- 3 multi-tenant дыры закрыты: `/api/campaigns` filter by user_id, `tools.py::_get_access_token_for` enforces ownership, `/api/actions/.../approve` checks owner
- Socket.IO connect требует JWT, события scoped по `user:<id>` room
- CORS заблокирован с `*` на explicit list
- Alembic migration `a1b2c3d4e5f6` — `User.is_active` + `email_verified`
- `scripts/migrate_dev_user.py` — перенос всех 33 GoogleAdsAccount + 8 actions + audit_log с dev-user-001 на реального юзера

### Sprint 7 — Real apply для pause_campaign

- `services/google_ads_client.py::pause_campaign` — реальный mutate через `customers/{cid}/campaigns:mutate` с PAUSED, before_status через GAQL search
- Daily safety cap: 5 real applies / customer / 24h
- `routers/actions.py::approve_action` — резолвит access_token через ownership-aware `_get_access_token_for`, ловит RuntimeError → after_state.error
- Frontend `ApprovalQueue.tsx` — checkbox «Apply to Google Ads» + красная "⚠ Apply now" с `confirm()`
- `update_bid` real apply отложен в Sprint 7.5 (нужен strategy-aware refactor)

### UI polish batch

- Campaign filter: `All / Active / Paused` tabs
- Account dropdown с поиском по 33 connected accounts, `descriptive_name` (`goodevas.it` вместо `313-350-6664`)
- `scripts/backfill_account_names.py` — backfill 23 existing descriptive_names через GAQL `customer.descriptive_name`
- DateRangePicker как в Google Ads (8 presets + custom range)
- Collapse/expand для Campaigns + Live stream с localStorage persistence
- Stop-on-hover для Buzz/Vox (AbortController)
- Eye-toggle для password полей
- i18n: весь UI + 7 agent prompts на английский, locale `en-US`
- `RunVoxButton.tsx` — фиолетовая Vox кнопка рядом с бирюзовой Buzz

### Bug fix: Buzz и automated bid strategies

- Buzz годами генерил **фантомные `propose_bid_change`** на Pmax/Brand/TARGET_ROAS — где manual CPC не существует
- 3 слоя защиты:
  1. System prompt — явный whitelist `MANUAL_CPC` / `ENHANCED_CPC`
  2. Tool description — дублируется
  3. Handler `propose_bid_change_tool` — required `bid_strategy` param, rejects non-manual с `rejected_reason: "incompatible_bid_strategy"`
- Sprint 7.5 (strategy-aware bidding с target_roas/target_cpa/IS% tools) — отложен

### Google Ads API v20 → v24 migration

**Phase 1** — endpoint upgrade. No breaking changes.

**Phase 2** — `RecommendationService` integration:
- Buzz/Vox теперь вызывают `list_recommendations` ПЕРЕД своими reasoning
- New `action_type='apply_recommendation'` с real mutate через `recommendations:apply`
- UI: blue `📍 GOOGLE` badge на recommendation-sourced proposals
- GAQL quirks: `WHERE recommendation.dismissed = FALSE` silently returns 0 rows (filter в Python); `recommendation.impact.*` nested raises INVALID_ARGUMENT (impact dropped)
- **Validated**: 15 из 33 customers имеют active Google recs (FORECASTING_CAMPAIGN_BUDGET, SET_TARGET_ROAS, SHOPPING_TARGET_ALL_OFFERS, RESPONSIVE_SEARCH_AD, ...)

**Phase 3** — `SearchTermView` → Sage auto-negative keywords:
- New tools `list_search_terms_tool` + `propose_negative_keyword_tool`
- Filter: `cost_micros > $5M AND conversions = 0` за `LAST_30_DAYS`
- New `action_type='add_negative_keyword'` с real mutate через `campaignCriteria:mutate` (negative=true, EXACT default)
- UI: orange `🚫 NEGATIVE` badge + `🦉 Sage proposes:` header
- GAQL quirks: `metrics.conversions <= 0` rejects with OPERATOR_FIELD_MISMATCH (use `= 0`)
- **Validated**: 77 junk queries найдено на 13 accounts, ~$900/мес wasted spend. Top: goodevas.it ($247/18), goodevas.com ($217/14), goodevas.de ($215/22)
- Known limitation: hardcoded `min_cost_usd = $5` не учитывает target CPA (отложено)

**Phase 4** — BenchmarksService — SKIPPED (только YouTube clients).

**Phase 5/6/7** — AudienceInsights / AssetGeneration / ExperimentService — DEFERRED.

**Phase 8** — Client-facing weekly PDF report:
- Echo system prompt полностью переписан под client audience (business English, outcomes-first, under 200 слов)
- `services/digest_pdf.py` — single-page branded PDF (reportlab, Helvetica, brand colors)
- Endpoints: `GET /api/digest/latest/pdf` (download), `POST /api/digest/latest/email` (Resend + attachment + optional note)
- Frontend: `📄 PDF` + `✉️ Email` buttons в DigestPanel + inline email form (вместо native window.prompt)
- Honest UI banner: orange `⚠️ Mock mode — saved to server log, NOT actually delivered` когда RESEND_API_KEY пустой
- `services/emailer.py::send_email` теперь принимает `attachments=[{filename, content base64, type}]`
- `services/google_ads_client.py::list_change_status` готов для future ChangeStatus integration в Echo

### Operational follow-ups (см. plan `/Users/vitaly/.claude/plans/b6-v24-migration.md` §10)

1. **§10.A** Resend setup — RESEND_API_KEY пустой → email в mock-mode. Нужно DNS verify + API key + .env.prod update (~30 мин).
2. **§10.B** Sprint 7.5 — strategy-aware bidding.
3. **§10.C** Sage CPA threshold — fetch `campaign.target_cpa`, заменить hardcoded $5 на `2× target_cpa`.
4. **§10.D** Aegis prompt update для новых action types.
5. **§10.E** ChangeStatus в Echo — показывать non-B6 manual changes.
6. **§10.F** PDF branding — логотип + графики.

### Metrics

- **27 коммитов**, +5000 / -800 строк
- **Real value найдено в проде**: $900/мес junk spend (Phase 3) + 15 customers с active Google recs (Phase 2)
- **Готово к pitch'у** Tristan/Goodevas

---

## [Sprint 6 — starting] — 2026-05-16 — Multi-tenancy + JWT auth

**Статус**: 🚧 IN PROGRESS — главный блокер платящих клиентов.

### Scope (план)

- **Backend**: 3 auth endpoints (`/api/auth/register`, `/login`, `/me`) + JWT middleware + replace hardcoded `dev-user-001`
- **Frontend**: `/register` + `/login` pages с server+client split, auth context, protected `/b6` route
- **Data isolation**: все queries фильтруют по `user_id` из JWT (GoogleAdsAccount, AgentAction, AuditLog)
- **Tests**: 2 users — каждый видит только свои данные

### Зачем

Сейчас захардкожен `dev-user-001`. Нельзя онбордить реальных клиентов без ручного `INSERT INTO users`. После Sprint 6 — beta-юзеры регистрируются сами.

### Estimate

4-6 часов работы. После — Stripe integration + marketing kit.

---

## [SEO sister-project contributions] — 2026-05-16 — Commercial schemas + T1 refreshes

В этот день в `ppc-landing` repo попали изменения от **SEO Agent Team** sister project (который сам на паузе после Phase 2 complete):

### Added — Commercial JSON-LD schemas (3 pages)

Argus `schema_completeness.mjs` обнаружил что 3 marketing страницы вообще без JSON-LD. Добавили:

- `src/app/HomeContent.tsx` → **Organization + WebSite** schema (с SearchAction для sitelinks search box)
- `src/app/pricing/PricingContent.tsx` → **SoftwareApplication + 3 Offer** (Free, Pro $49, Business $149)
- `src/app/blog/page.tsx` → **CollectionPage + ItemList** of all blog posts

Skipped: `/chat` (noindex via layout), `/b6` (auth-gated dashboard).

### Refreshed — 6 T1 critical blog articles

Argus `refresh_scheduler.mjs` флагнул 6 articles >1 year old с dated content. Refresh (cosmetic tier — года 2025→2026, dateModified bumped, "Updated May 15, 2026" indicator):

- `the-complete-guide-to-google-ads-quality-score-in-2025` (slug preserved)
- `10-ai-powered-ppc-optimization-strategies`
- `5-tips-for-working-with-ai-ppc-tools`
- `how-ai-is-transforming-google-ads-in-2025` (title 2025→2026 в metadata)
- `performance-max-problems-b2b-marketing`
- `what-ceos-want-google-ads-reports`

Slug preserved (permanent URL — не ломаем backlinks). Effect: Google `dateModified` freshness signal + visible "Updated" CTR boost.

### SEO project status

🟡 **PAUSED** на 2026-05-16. Phase 2 complete (Hermes 9 sub-agents с topic-architect + intent classifier + KD filter + cannibalization defense; Argus 14 audits + 6 auto-fixes + desktop+mobile lighthouse). Pipeline работает автономно — Hermes Mon-Fri 10:07, Argus Sun 11:37. Resume через 2-4 недели когда GSC накопит данные.

Подробнее: [`/Users/vitaly/Vit+/projects/seo-agent-team/HANDOFF.md`](/Users/vitaly/Vit+/projects/seo-agent-team/HANDOFF.md)

### Commits

- `4358a14` — feat(seo): add JSON-LD schema to 3 commercial pages
- `fc9f31d` — refresh(blog): T1 critical refresh — Quality Score guide 2025→2026
- `0cfa898` — refresh(blog): T1 critical batch — 5 articles dateModified + Updated badge

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
