# B6 — Deployment Guide

> ✅ **Развёрнуто 2026-05-12** на следующей конкретной конфигурации:
> - **Frontend**: Vercel (`www.kampaio.com`, project `ppc-landing`, branch `v2-autonomous-agents`)
> - **Backend**: Hetzner CPX22 (`178.104.124.150`, Nuremberg, Ubuntu 24.04)
> - **Account**: Hetzner `K0514922126` (новый, старый K0742311825 cancelled 02/2025)
> - **SSL**: Caddy + Let's Encrypt prod (auto-renew, until 2026-08-10)
>
> Этот документ — **исторический референс** + чек-лист для повторного развёртывания на новом сервере.

Этот документ — **пошаговая инструкция** деплоя B6 в production. Все файлы уже подготовлены ([`docker-compose.prod.yml`](./docker-compose.prod.yml), [`Caddyfile`](./Caddyfile), [`ai-server/Dockerfile.b6`](./ai-server/Dockerfile.b6), [`.env.prod.example`](./.env.prod.example)).

## Архитектура production

```
[ Vercel (Frontend) ]          [ Hetzner CPX22 (Backend) ]
       │                              │
       ▼                              ▼
  www.kampaio.com    ◄─HTTPS─►  api.kampaio.com (178.104.124.150)
  (Next.js 15.5)                    (Caddy → FastAPI :8000)
                                      │
                                      ├── Postgres 16 :5432
                                      └── Redis 7 :6379
```

## Gotchas замеченные в реальном launch

1. **Vercel блокирует уязвимые версии Next.js** — `15.3.5` в момент деплоя был помечен vulnerable, и Vercel задеплоить отказывался («Vulnerable version of Next.js detected, please update immediately»). Билд при этом компилировался. Фикс: bump до последней stable в 15.x line (на момент launch — `15.5.18`).

2. **`psycopg2-binary` обязателен в проде** — в `requirements.txt` строка была закомментирована «не нужен на dev» (SQLite). В проде с Postgres URL `postgresql://...` SQLAlchemy автоматически пытается импортировать `psycopg2`, контейнер крашится при старте на миграциях.

3. **Vercel env vars баст в build-time** — после добавления `NEXT_PUBLIC_*` нужно **триггернуть Redeploy**, иначе старый билд продолжает использовать дефолтное значение из кода (`localhost:8000`).

4. **Hetzner verification для новых аккаунтов** обычно ~часы-сутки, но в этот раз прошла за ~5 минут (после регистрации и подтверждения email).

5. **Caddy fall-back на staging Let's Encrypt** если первые попытки получить prod cert провалились (5+ failed retries на NXDOMAIN). Лечится `docker compose restart caddy` после того как DNS пропагирован.

## Чек-лист подготовки (~1 час)

### 1. Hetzner VPS

- [ ] Создать CX22 или CX32 (4 vCPU, 8GB RAM) в Hetzner Cloud
- [ ] OS: Ubuntu 22.04 LTS
- [ ] SSH key: добавить твой публичный ключ
- [ ] Снэпшот IP-адреса → `XX.XX.XX.XX`

### 2. DNS

В Cloudflare (или своём DNS-провайдере):
- [ ] `api.kampaio.com` → A-запись на `XX.XX.XX.XX` (Hetzner IP), **proxy off** (важно для WebSocket)
- [ ] `kampaio.com` → CNAME на `cname.vercel-dns.com` (после деплоя на Vercel)
- [ ] `www.kampaio.com` → CNAME на `kampaio.com`

### 3. Stripe

В [Stripe Dashboard](https://dashboard.stripe.com):
- [ ] Создать 3 продукта (recurring monthly): **L1 $99**, **L2 $199**, **L3 $399**
- [ ] Скопировать `price_...` ID каждого → в `.env.prod` как `STRIPE_PRICE_L1/L2/L3`
- [ ] Webhooks → Add endpoint: `https://kampaio.com/api/stripe-webhook`
- [ ] Events: `checkout.session.completed`, `customer.subscription.created/updated/deleted`
- [ ] Скопировать **Signing secret** (`whsec_...`) → `STRIPE_WEBHOOK_SECRET`
- [ ] Скопировать `sk_live_...` → `STRIPE_SECRET_KEY`

### 4. Anthropic

- [ ] Console → создать **production** API key (отдельный от dev)
- [ ] Скопировать в `ANTHROPIC_API_KEY`

### 5. Google Ads

- [ ] Получить Developer Token (если ещё нет) — ads.google.com/aw/apicenter
- [ ] OAuth2 Client ID + Secret в Google Cloud Console
- [ ] Заполнить в `.env.prod`

### 6. Resend (email)

- [ ] resend.com → API key → `RESEND_API_KEY`

---

## Deploy backend (Hetzner)

### Шаг 1. Подготовка сервера

```bash
ssh root@XX.XX.XX.XX

# Установить Docker
curl -fsSL https://get.docker.com | sh

# Создать non-root юзера (опционально, но безопаснее)
adduser b6
usermod -aG docker b6
su - b6
```

### Шаг 2. Клон + конфиг

```bash
git clone https://github.com/vitali-ppc/ppc-landing.git
cd ppc-landing
git checkout v2-autonomous-agents

# Скопировать env-шаблон и заполнить
cp .env.prod.example .env.prod
nano .env.prod
# (заполнить все секреты)
```

### Шаг 3. Запуск

```bash
docker compose -f docker-compose.prod.yml --env-file .env.prod up -d
```

### Шаг 4. Проверка

```bash
# Логи
docker compose -f docker-compose.prod.yml logs -f b6-api

# Health
curl https://api.kampaio.com/health

# Caddy получает SSL автоматически (через Let's Encrypt) при первом запросе
```

### Шаг 5. Сидинг

```bash
# Запустить seed-script внутри контейнера (только для testing — не для production)
docker compose -f docker-compose.prod.yml exec b6-api python scripts/seed_dev.py
```

---

## Deploy frontend (Vercel)

### Через CLI (рекомендую)

```bash
npm i -g vercel
cd /path/to/ppc-landing  # локально
vercel login
vercel link
vercel env add NEXT_PUBLIC_B6_API_BASE production
# Значение: https://api.kampaio.com
vercel env add B6_API_BASE production
# Значение: https://api.kampaio.com
vercel env add STRIPE_WEBHOOK_SECRET production
# Значение из Stripe Dashboard
vercel --prod
```

### Через Vercel UI

- vercel.com → Import Git Repository → ppc-landing
- Branch: `v2-autonomous-agents`
- Build command: `npm run build` (default)
- Output: `.next` (default)
- Environment Variables:
  - `NEXT_PUBLIC_B6_API_BASE` = `https://api.kampaio.com`
  - `B6_API_BASE` = `https://api.kampaio.com`
  - `STRIPE_WEBHOOK_SECRET` = `whsec_...`

### Проверка
- https://kampaio.com → landing
- https://kampaio.com/b6 → dashboard
- Submit waitlist form → должен записать в БД на Hetzner

---

## Smoke test после деплоя

### 1. Backend жив
```bash
curl https://api.kampaio.com/health
# Ожидаем: {"status":"ok","mock_mode":"false","model":"claude-sonnet-4-6","socketio":true}
```

### 2. Waitlist работает
```bash
curl -X POST https://api.kampaio.com/api/waitlist/signup \
  -H 'Content-Type: application/json' \
  -d '{"email":"test+deploy@kampaio.com","source":"smoke"}'
```

### 3. Frontend подключается к backend
- Открыть https://kampaio.com → submit waitlist → проверить что пришла запись:
```bash
ssh root@XX.XX.XX.XX
docker compose -f docker-compose.prod.yml exec postgres psql -U b6 -d b6 -c "SELECT * FROM ..."  # placeholder
```

Или через API:
```bash
curl https://api.kampaio.com/api/waitlist/stats
```

### 4. Демо /b6 работает с моком
- Открыть https://kampaio.com/b6
- Нажать «Run Buzz» — должен запустить агента (mock_mode=true пока Google Ads token не получен)
- Если mock_mode=false и нет token → 503 error

### 5. Socket.IO работает
- В DevTools → Network → WS → должен быть установлен ws/wss соединение с `api.kampaio.com/socket.io`

---

## После запуска — что мониторить

| | Что | Куда смотреть |
|---|------|---------------|
| 1 | Health endpoint | UptimeRobot или Better Stack — пинговать `/health` каждые 60с |
| 2 | Server logs | `docker compose logs -f b6-api` или Logtail/Loki |
| 3 | Anthropic spend | console.anthropic.com → Usage |
| 4 | Stripe events | Stripe Dashboard → Events |
| 5 | Waitlist signups | `curl https://api.kampaio.com/api/waitlist/stats` |
| 6 | Postgres backup | `docker compose exec postgres pg_dump -U b6 b6 > backup.sql` (хотя бы раз в день) |

---

## Расходы (приблизительно)

| Статья | $/мес |
|--------|-------|
| Hetzner CX22 (backend + DB + Redis) | $6 |
| Vercel (Frontend hobby) | $0 (бесплатно до Pro лимитов) |
| Cloudflare DNS | $0 |
| Domain kampaio.com (renew) | $1 ($12/год) |
| Stripe (per-transaction 2.9% + 30¢, но fixed = $0) | $0 |
| Resend (3K emails/мес) | $0 (free) |
| Anthropic API (на 50 юзеров × 30 прогонов × $0.25) | ~$375 |
| **ИТОГО при 50 юзерах** | **~$382/мес** |

При **50 юзеров × $99 = $4950 выручки** → **net ~$4568/мес**, **маржа ~92%**.

---

## Troubleshooting

### Caddy не получает SSL
- Проверь что DNS A-запись `api.kampaio.com` указывает на IP **до** запуска контейнеров
- В Cloudflare: **proxy off** (orange cloud → grey cloud) — Let's Encrypt не работает через CF proxy
- `docker compose logs caddy`

### CORS errors на frontend
- В `.env.prod` проверить `CORS_ORIGINS` содержит `https://kampaio.com,https://www.kampaio.com`
- Перезапустить b6-api: `docker compose -f docker-compose.prod.yml restart b6-api`

### Postgres connection refused
- `docker compose ps` — проверить что postgres healthy
- `docker compose logs postgres` — посмотреть startup

### Buzz не работает в production
- Проверить `ANTHROPIC_API_KEY` через `docker compose exec b6-api env | grep ANTHROPIC`
- Проверить billing на console.anthropic.com — есть ли деньги
- Проверить `GOOGLE_ADS_USE_MOCK` — если `true` → агенты работают на синтетике, реальные кампании не трогаются (это OK для демо)

---

## Что после первого запуска

См. [`HANDOFF.md`](./HANDOFF.md) → план Sprint 2-3:
- Week 2-3: первые 5 beta-юзеров (бесплатно, в обмен на фидбек)
- Week 4-6: первые 1-3 платящих L1
- Month 2-3: остальные агенты (Strategy, Creative, Research, Reporting)
- Month 4-6: Meta Ads + TikTok Ads платформы
