# B6 — Day 1 Summary

**Дата**: 2026-05-12
**Ветка**: `v2-autonomous-agents` (от `main`)
**Архив старого Kampaio**: ветка `archive/kampaio-v1`

## Что сделано

### 1. Инфраструктура и git
- Создана ветка `archive/kampaio-v1` — снимок Kampaio v1 на случай отката
- Создана рабочая ветка `v2-autonomous-agents`
- Venv `ai-server/venv/` с Python 3.9
- 17 Python пакетов установлено (anthropic 0.101, sqlalchemy 2.0, alembic 1.16, fastapi 0.104, python-socketio, google-ads, и др.)

### 2. Database layer
- [ai-server/db/session.py](ai-server/db/session.py) — async + sync engines, поддержка SQLite (dev) и Postgres (prod)
- [ai-server/db/models.py](ai-server/db/models.py) — 7 SQLAlchemy моделей: User, GoogleAdsAccount, Agent, AgentAction, AuditLog, SafetyCap, ActivityEvent
- Alembic инициализирован в [ai-server/db/migrations/](ai-server/db/migrations/)
- Первая миграция сгенерирована: [ai-server/db/migrations/versions/84cf759d7c69_initial_b6_schema.py](ai-server/db/migrations/versions/84cf759d7c69_initial_b6_schema.py)
- SQLite БД `ai-server/b6_dev.db` создана и наполнена схемой

### 3. Google Ads service
- [ai-server/services/google_ads_client.py](ai-server/services/google_ads_client.py) — извлечён и модернизирован из main.py
- Функции: `get_account_info`, `list_campaigns`, `get_campaign_metrics`, `get_keyword_metrics`, `update_bid` (dry_run), `pause_campaign` (dry_run), token refresh
- **Mock-режим**: `GOOGLE_ADS_USE_MOCK=true` → синтетические данные (3 кампании, варьируемые метрики) — позволяет тестировать без production token

### 4. Agent layer
- [ai-server/agents/base.py](ai-server/agents/base.py) — BaseAgent с tool_use loop (Anthropic Messages API + tools)
- [ai-server/agents/tools.py](ai-server/agents/tools.py) — 6 tool-функций для агентов
- [ai-server/agents/bidding_agent.py](ai-server/agents/bidding_agent.py) — Bidding Agent (Buzz 🐝) с system prompt и tool registration

### 5. Тестирование
- [ai-server/scripts/structural_test.py](ai-server/scripts/structural_test.py) — **ВСЕ 4 проверки прошли** без LLM-вызова
- [ai-server/scripts/smoke_test_bidding_agent.py](ai-server/scripts/smoke_test_bidding_agent.py) — готов к запуску, нужен ANTHROPIC_API_KEY

### 6. Production setup
- [docker-compose.yml](docker-compose.yml) — Postgres + Redis + ai-server для Hetzner deploy

## Структура файлов

```
ppc-landing/
├── docker-compose.yml             [новый, для Day 7 deploy]
├── B6_DAY1_SUMMARY.md            [этот файл]
└── ai-server/
    ├── venv/                      [новый, не в git]
    ├── b6_dev.db                  [новый, не в git — добавить в .gitignore]
    ├── env.example                [обновлён]
    ├── .env                       [новый, скопирован из env.example]
    ├── requirements.txt           [обновлён]
    ├── alembic.ini                [новый]
    ├── main.py                    [НЕ ИЗМЕНЁН — рефакторинг на Day 2]
    ├── agents/                    [новая папка]
    │   ├── __init__.py
    │   ├── base.py                [BaseAgent + tool_use loop]
    │   ├── tools.py               [6 tool-функций]
    │   └── bidding_agent.py       [Buzz]
    ├── services/                  [новая папка]
    │   ├── __init__.py
    │   └── google_ads_client.py   [извлечено + расширено]
    ├── db/                        [новая папка]
    │   ├── __init__.py
    │   ├── session.py             [Base + engines]
    │   ├── models.py              [7 моделей]
    │   └── migrations/
    │       ├── alembic.ini → ../alembic.ini
    │       ├── env.py
    │       └── versions/
    │           └── 84cf759d7c69_initial_b6_schema.py
    └── scripts/                   [новая папка]
        ├── structural_test.py     [✅ прошёл]
        └── smoke_test_bidding_agent.py
```

## ⚠️ Что НЕ сделано (отложено / нужно от тебя)

### Блокеры для запуска агента с реальным Claude
1. **ANTHROPIC_API_KEY** — нужен реальный ключ от https://console.anthropic.com
   - Положить в `ai-server/.env`: `ANTHROPIC_API_KEY=sk-ant-...`
   - После этого: `python scripts/smoke_test_bidding_agent.py`
   - Стоимость одного прогона smoke test: ~$0.01-0.03 на Sonnet 4.6

### Блокеры для подключения реальных Google Ads
2. **Google Ads Production Token** — статус всё ещё нужно прояснить
   - Сейчас работаем в `GOOGLE_ADS_USE_MOCK=true` режиме
   - Когда токен будет — переключим в `.env`

### Прерогативные системные установки (когда захочешь)
3. **Python 3.11+** — на Day 1 работаем на 3.9, но claude-agent-sdk и некоторые best-practice пакеты требуют 3.10+
   - Опция: `pyenv install 3.11.9 && pyenv local 3.11.9` (потребует установки pyenv)
   - Или скачать installer с python.org
4. **Docker Desktop** — нужен для прод-деплоя на Hetzner с Postgres+Redis
   - Не критично для Day 1-3 разработки

## Как запустить smoke test (когда будет API ключ)

```bash
cd /Users/vitaly/Vit+/projects/ppc-landing/ai-server
source venv/bin/activate

# 1. Поставь свой ключ в .env (или экспортируй):
export ANTHROPIC_API_KEY=sk-ant-...

# 2. Mock режим (без реального Google Ads):
export GOOGLE_ADS_USE_MOCK=true

# 3. Запуск Buzz:
python scripts/smoke_test_bidding_agent.py
```

Что ты увидишь:
- 🐝 Buzz starting analysis
- Calling tool: list_campaigns → 3 campaigns
- Calling tool: get_campaign_metrics для каждой
- Calling tool: check_safety_cap
- Calling tool: propose_bid_change / propose_pause_campaign
- Финальный summary от Buzz

## Что планируется на Day 2

1. **Рефакторинг ai-server/main.py**
   - Вынести оставшиеся Google Ads endpoint'ы в `routers/google_ads.py`
   - Удалить OpenAI `/chat` endpoint (архивируем в `archive/kampaio-v1` ветку)
   - Добавить `/api/agents/run` endpoint для запуска агента из frontend
   - Добавить `/api/audit/...` endpoints
2. **Safety + audit persistence**
   - Тулы `check_safety_cap` и `propose_*` будут писать в БД
   - `audit_log` начинает наполняться реальными записями
3. **Risk Agent** — первая версия (anomaly detection placeholder)
4. **Реальный прогон Bidding Agent** end-to-end (когда будет ANTHROPIC_API_KEY)

## Открытые вопросы (re-asked для финального решения)

1. **Google Ads Production Token** — статус?
2. **Domain** — оставляем kampaio.com или новый?
3. **Mascot стиль** — пчёлка 🐝 / мишка 🐻 / робот?
4. **Test Google Ads аккаунт** — твой реальный, sandbox, или создать новый с $50/мес?
5. **Production DB hosting** — Hetzner Postgres / Supabase / self-hosted?

Ответы на эти вопросы становятся важны со Дня 2-3, **не блокируют Day 1**.
