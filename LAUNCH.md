# 🚀 B6 — Launch Day Quickstart

Цель: за **2 часа** получить рабочий `https://kampaio.com` в интернете с beta-доступом.

> Полный технический мануал → [`DEPLOY.md`](./DEPLOY.md)
> Текущий статус проекта → [`HANDOFF.md`](./HANDOFF.md)

## ✅ Что у тебя уже есть (код)

- 7 AI-агентов работают
- Лендинг с waitlist
- Dashboard `/b6` с маскотами
- Production Docker stack
- Backend + Frontend компилируются в production-режиме (только что проверено)

## 🚧 Что нужно сделать **руками** (по порядку)

### Шаг 1 — Купить/настроить домен (15 мин)

Если **kampaio.com** твой:
- В Cloudflare/Namecheap → DNS:
  - `kampaio.com` A → IP Vercel (Vercel даст после deploy)
  - `api.kampaio.com` A → IP Hetzner VPS (создашь в шаге 2)
  - `www.kampaio.com` CNAME → kampaio.com

Если **не твой** — варианты:
- Купить через Namecheap ($12/год) — рекомендую
- Использовать другой домен из твоего арсенала

### Шаг 2 — Hetzner VPS (15 мин)

1. **hetzner.com → Cloud → Create Server**:
   - Локация: Falkenstein (Германия) или Helsinki
   - Image: Ubuntu 22.04
   - Type: **CX22** ($6/мес — хватает для start)
   - SSH key: добавь свой
2. **Получил IP** → впиши в DNS `api.kampaio.com`
3. **SSH туда** + установи Docker:
   ```bash
   ssh root@TVOY_IP
   curl -fsSL https://get.docker.com | sh
   ```

### Шаг 3 — Получить API-ключи (30 мин)

**Anthropic** (https://console.anthropic.com):
- Account → API Keys → Create Key → `B6 Production`
- Скопируй `sk-ant-...`

**Stripe** (https://dashboard.stripe.com):
1. Products → Create:
   - **L1 Co-pilot** $99/мес (recurring) → запиши `price_...`
   - **L2 Approval** $199/мес → запиши `price_...`
   - **L3 Autonomous** $399/мес → запиши `price_...`
2. Developers → API keys → скопируй `sk_live_...`
3. Webhooks → Add endpoint:
   - URL: `https://kampaio.com/api/stripe-webhook`
   - Events: `checkout.session.completed`, `customer.subscription.created/updated/deleted`
   - Скопируй `whsec_...`

**Resend** (https://resend.com — для email):
- Sign up → API Keys → Create → `re_...`

**Google Ads** (https://ads.google.com/aw/apicenter):
- Developer Token: **подай заявку сейчас** (4-8 недель approval)
- До approval — работаем в `GOOGLE_ADS_USE_MOCK=true`

### Шаг 4 — Клонировать репо на VPS + deploy (20 мин)

```bash
# На сервере
ssh root@TVOY_IP

# Клон
git clone https://github.com/vitali-ppc/ppc-landing.git
cd ppc-landing
git checkout v2-autonomous-agents

# Создаём .env.prod
cp .env.prod.example .env.prod
nano .env.prod
# (вставь все ключи из шага 3)

# Сгенерируй секреты для DB и internal API
echo "POSTGRES_PASSWORD=$(openssl rand -base64 32)" >> .env.prod
echo "B6_INTERNAL_SECRET=$(openssl rand -hex 32)" >> .env.prod

# Запуск
docker compose -f docker-compose.prod.yml --env-file .env.prod up -d

# Проверка
docker compose -f docker-compose.prod.yml logs -f b6-api
# Дождись "Application startup complete"
```

### Шаг 5 — Caddy SSL автоматически (5 мин)

Caddy уже в docker-compose. Он сам получит SSL от Let's Encrypt через 30-60 секунд после первого запроса к `api.kampaio.com`.

Проверь:
```bash
curl https://api.kampaio.com/health
# Должно вернуть {"status":"ok",...}
```

Если SSL не работает — в Cloudflare убедись что **proxy off** (orange cloud → grey cloud).

### Шаг 6 — Frontend на Vercel (15 мин)

Локально на твоём ноуте (не на сервере):
```bash
cd /Users/vitaly/Vit+/projects/ppc-landing
npm i -g vercel
vercel login
vercel link

# Env vars
vercel env add NEXT_PUBLIC_B6_API_BASE production
# Значение: https://api.kampaio.com

vercel env add B6_API_BASE production
# Значение: https://api.kampaio.com

vercel env add STRIPE_WEBHOOK_SECRET production
# Значение: whsec_... из шага 3

# Deploy
vercel --prod
```

### Шаг 7 — Smoke test (5 мин)

Из любой машины:
```bash
cd /Users/vitaly/Vit+/projects/ppc-landing
API_BASE=https://api.kampaio.com FRONTEND=https://kampaio.com ./scripts/smoke-prod.sh
```

Скрипт проверит 8 критических вещей. Если всё ✅ — продукт **онлайн**.

### Шаг 8 — Открыть и показать (5 мин)

1. Открой https://kampaio.com → должен загрузиться лендинг с маскотами
2. Submit свой email в waitlist → должен прийти welcome через Resend
3. Открой https://kampaio.com/b6 → dashboard
4. Нажми «🐝 Run Buzz» → агенты заработают на mock-данных
5. **Сделай скриншот** и **отправь себе** в Telegram «Я только что задеплоил Sprint 1 MVP B6»

---

## 🎯 После запуска (Week 1-2)

### Day 1 — твоя личная демонстрация

- Открой [http://kampaio.com](https://kampaio.com) в браузере на телефоне
- Покажи **одному** знакомому PPC-специалисту / агентству
- Спроси: «выглядит ли это понятно? что не ясно?»
- Запиши его реакцию (literally)

### Day 2-3 — пост в соц-сети

Используй [`LAUNCH-CONTENT.md`](./LAUNCH-CONTENT.md) — там готовые тексты для:
- Twitter тред
- Reddit (r/PPC, r/SmallBusiness)
- LinkedIn post
- Hacker News «Show HN»

### Day 4-7 — первые beta-юзеры

- Цель: **5 человек** в waitlist
- Каждому: 30-минутный звонок, спроси про их Google Ads pain
- Дай бесплатный L1 на 60 дней в обмен на еженедельный фидбек

### Week 2 — итерации по фидбеку

- Что они спрашивали что неясно? → Лендинг переписать
- Что пытались сделать но не получалось? → UX fix
- За что бы они платили $99? → Pricing-page переписать под их слова

### Week 3-4 — первый платящий

Когда 1-2 beta-юзера говорят «я бы заплатил» — снимаешь L1 с free, активируешь Stripe.

**Первый $99 = product-market signal.** Это **сильнее** чем 100 лайков на Twitter.

---

## 💰 Расходы — первый месяц

| Статья | $/мес |
|--------|-------|
| Hetzner CX22 | $6 |
| Domain (если новый) | $1 |
| Anthropic API (на твои демо + 5 beta-юзеров × ~10 прогонов) | $20-50 |
| Resend (free tier 3K/mo) | $0 |
| Vercel hobby | $0 |
| Stripe (per-transaction) | $0 если не плати |
| **ИТОГО первый месяц** | **~$30-60** |

---

## 🆘 Если что-то идёт не так

| Проблема | Решение |
|----------|---------|
| Caddy не получает SSL | Cloudflare proxy OFF, DNS пропагирует 5-10 мин |
| `/health` не отвечает | `docker compose ps`, проверь b6-api healthy |
| Buzz возвращает error | `docker compose exec b6-api env \| grep ANTHROPIC` — ключ установлен? |
| Vercel build fail | Локально проверь `npm run build` — должен пройти (мы только что тестили) |
| Postgres миграции не применились | `docker compose exec b6-api alembic upgrade head` вручную |
| Email не приходят | Resend → Domains → подтверди DNS-записи для `kampaio.com` |

---

## 🎉 Когда всё работает

Ты — основатель работающего AI-startup с реальным production-стеком.

**Что у тебя есть** (объективно):
- 7 AI-агентов на Claude API
- Real-time дашборд с visualization
- Multi-tier pricing с реальным functional gap
- Production infrastructure (Hetzner + Vercel + Caddy + Postgres + Redis)
- Email + waitlist
- Documentation

**Чего нет** (объективно):
- Пользователей
- Дохода
- Distribution

Эти три — задача **тебя**, не кода. Удачи 🐝🛡️📊🦊🐻🎨🦉
