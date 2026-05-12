# B6 — Day 2 Summary

**Дата**: 2026-05-12
**Ветка**: `v2-autonomous-agents`
**Что закрыто**: persistence + HTTP API + approval flow

## Что сделано

### 1. Persistence agent actions
- [ai-server/services/audit.py](ai-server/services/audit.py) — слой для записи/чтения action'ов
- `write_proposed_action()` — создаёт запись в `agent_actions` + immutable в `audit_log`
- `update_action_status()` — переход proposed → approved → applied / rejected
- `list_actions()`, `get_action()` — чтение для UI
- `_ensure_agent()` — автоматически создаёт Agent при первом действии, mascot-mapping

### 2. Buzz пишет в БД
- [ai-server/agents/tools.py](ai-server/agents/tools.py) — `propose_bid_change_tool` и `propose_pause_campaign_tool` теперь персистят action_id
- Buzz возвращает action_id в каждом proposal — UI/curl могут потом апрувнуть конкретное действие

### 3. Dev seed
- [ai-server/scripts/seed_dev.py](ai-server/scripts/seed_dev.py) — создаёт dev-юзера `dev-user-001` + safety_caps
- Запуск: `python scripts/seed_dev.py`

### 4. HTTP API
Новое FastAPI приложение [ai-server/app.py](ai-server/app.py) (рядом со старым `main.py`):

| Endpoint | Метод | Что делает |
|----------|-------|------------|
| `/health` | GET | Status + конфиг |
| `/api/agents/run` | POST | Запустить Buzz, вернуть результат + action_ids |
| `/api/agents` | GET | Список агентов юзера |
| `/api/agents/{type}/pause` | POST | Поставить агента на паузу |
| `/api/agents/{type}/resume` | POST | Возобновить |
| `/api/actions` | GET | Список действий (фильтр по status) |
| `/api/actions/{id}` | GET | Деталь действия |
| `/api/actions/{id}/approve` | POST | Апрув + (dry-run) применение |
| `/api/actions/{id}/reject` | POST | Отклонить |

Старый `main.py` пока не трогали — рефакторинг отложен на Day 3-4 (нет блокеров для дальнейшей работы).

### 5. End-to-End тест ✅ ПРОЙДЕН

Запустил FastAPI сервер и через curl сделал полный сценарий:

```
1. POST /api/agents/run customer=1234567890
   → Buzz сделал 5 итераций, 8 tool calls, 3 proposed actions

2. GET /api/actions?status=proposed
   → Получил 3 actions с короткими ID

3. POST /api/actions/{id1}/approve  → status: applied (dry_run в Google Ads)
4. POST /api/actions/{id2}/reject   → status: rejected (с причиной)
5. {id3} остался в proposed

6. GET /api/actions
   → 1 applied, 1 rejected, 1 proposed ✅
```

**Полный approval flow работает.**

## Файлы (Day 2 добавил)

```
ai-server/
├── app.py                     [NEW — новое FastAPI приложение для B6]
├── routers/
│   ├── __init__.py
│   ├── agents.py             [NEW — POST/GET /api/agents]
│   └── actions.py            [NEW — POST/GET /api/actions]
├── services/
│   └── audit.py              [NEW — persistence слой]
└── scripts/
    └── seed_dev.py           [NEW — dev seed]
```

## Стоимость прогона

Один прогон `/api/agents/run` на mock-данных = **~$0.10-0.15** в Claude API (Sonnet 4.6, 5 итераций × ~3-5k tokens каждая).

При $99/мес L1 subscription у пользователя — это легко окупает 600-1000 прогонов в месяц = более чем 20 прогонов в день. Маржа ~70%+, согласно плану.

## Как запустить локально

```bash
cd /Users/vitaly/Vit+/projects/ppc-landing/ai-server
source venv/bin/activate

# Один раз: seed
python scripts/seed_dev.py

# Запуск сервера
GOOGLE_ADS_USE_MOCK=true uvicorn app:app --reload --port 8000

# В другом терминале:
curl -X POST http://localhost:8000/api/agents/run \
  -H "Content-Type: application/json" \
  -d '{"customer_id": "1234567890"}'

curl 'http://localhost:8000/api/actions?status=proposed' | python3 -m json.tool

# По OpenAPI документации:
open http://localhost:8000/docs
```

## Что готово для Day 3

- **Backend полностью функциональный** для одного агента (Buzz)
- **DB persistence + audit trail** работают
- **Approval flow** через HTTP — готов к подключению фронтенда
- **Сервер запускается** через uvicorn локально

## План Day 3 — два варианта

### Вариант A: Frontend подключение (быстрый wow)
- Создать `src/app/dashboard/page.tsx` в Next.js
- Подключить к `/api/agents/run` и `/api/actions/*`
- Простой dashboard: список кампаний + Activity Feed + Approval Queue
- Без маскота пока (это Day 6 по плану)
- К концу дня: можно открыть `localhost:3002/dashboard` и видеть Buzz в работе

### Вариант B: Backend deep (Risk Agent + WebSocket)
- Risk Agent (anomaly detection placeholder)
- Socket.IO server integration в `app.py`
- События публикуются на каждый step Buzz
- К концу дня: можно подписаться на WebSocket и видеть event stream

**Моя рекомендация**: Вариант A. Wow-эффект для тебя самого — увидеть свой кабинет в браузере. WebSocket добавим на Day 4. Маскота на Day 6.

## Открытые вопросы (без изменений с Day 1)

1. Google Ads Production Token — статус?
2. Domain — kampaio.com или новый?
3. Mascot стиль — пчёлка / мишка / робот?
4. Production DB hosting — Hetzner / Supabase?

⚠️ **API key из чата — РОТЕЙТ обязательно** (https://console.anthropic.com → settings/keys → Revoke + Rotate). Лог чата сохраняется.
