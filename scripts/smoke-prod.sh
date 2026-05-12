#!/bin/bash
# B6 Production Smoke Test
# Запуск: API_BASE=https://api.kampaio.com FRONTEND=https://kampaio.com ./scripts/smoke-prod.sh
#
# Проверяет все критические пути после deploy. Выходит с ошибкой если что-то не работает.

set -e

API_BASE="${API_BASE:-https://api.kampaio.com}"
FRONTEND="${FRONTEND:-https://kampaio.com}"
RED='\033[0;31m'; GREEN='\033[0;32m'; YELLOW='\033[1;33m'; NC='\033[0m'

pass() { echo -e "  ${GREEN}✅${NC} $1"; }
fail() { echo -e "  ${RED}❌${NC} $1"; exit 1; }
warn() { echo -e "  ${YELLOW}⚠️${NC} $1"; }
section() { echo ""; echo -e "${YELLOW}═══ $1 ═══${NC}"; }

# ─────────────────────────────────────────────────────────────────
section "1. Backend health"
HEALTH=$(curl -sf "$API_BASE/health" 2>&1) || fail "Backend $API_BASE недоступен"
echo "$HEALTH" | grep -q '"status":"ok"' && pass "API живой" || fail "Health endpoint вернул не ok: $HEALTH"

MOCK=$(echo "$HEALTH" | python3 -c "import sys, json; print(json.load(sys.stdin).get('mock_mode'))")
if [ "$MOCK" = "true" ]; then
  warn "GOOGLE_ADS_USE_MOCK=true — production должен быть false когда есть Google Ads token"
else
  pass "Google Ads mock mode выключен"
fi

# ─────────────────────────────────────────────────────────────────
section "2. Frontend"
FRONT_CODE=$(curl -sf -o /dev/null -w "%{http_code}" "$FRONTEND/") || fail "Лендинг $FRONTEND недоступен"
[ "$FRONT_CODE" = "200" ] && pass "Лендинг (/) отвечает 200" || fail "Лендинг вернул $FRONT_CODE"

DASH_CODE=$(curl -sf -o /dev/null -w "%{http_code}" "$FRONTEND/b6") || fail "Dashboard /b6 недоступен"
[ "$DASH_CODE" = "200" ] && pass "Dashboard (/b6) отвечает 200" || fail "/b6 вернул $DASH_CODE"

# ─────────────────────────────────────────────────────────────────
section "3. Waitlist (signup + dedup)"
TEST_EMAIL="smoke+$(date +%s)@kampaio.com"

R1=$(curl -sf -X POST "$API_BASE/api/waitlist/signup" \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"$TEST_EMAIL\",\"source\":\"smoke-test\"}")
echo "$R1" | grep -q '"success":true' && pass "Signup создан" || fail "Signup упал: $R1"

R2=$(curl -sf -X POST "$API_BASE/api/waitlist/signup" \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"$TEST_EMAIL\",\"source\":\"smoke-test\"}")
echo "$R2" | grep -q 'Already on the list' && pass "Дедуп работает" || warn "Дедуп не сработал: $R2"

# ─────────────────────────────────────────────────────────────────
section "4. Socket.IO handshake"
WS=$(curl -sf -o /dev/null -w "%{http_code}" "$API_BASE/socket.io/?EIO=4&transport=polling") || fail "Socket.IO endpoint недоступен"
[ "$WS" = "200" ] && pass "Socket.IO handshake 200" || fail "Socket.IO вернул $WS"

# ─────────────────────────────────────────────────────────────────
section "5. OpenAPI docs"
DOCS=$(curl -sf -o /dev/null -w "%{http_code}" "$API_BASE/docs") || fail "/docs недоступен"
[ "$DOCS" = "200" ] && pass "/docs отдаёт Swagger UI" || fail "/docs вернул $DOCS"

ENDPOINTS=$(curl -sf "$API_BASE/openapi.json" | python3 -c "import sys, json; print(len(json.load(sys.stdin).get('paths', {})))")
[ "$ENDPOINTS" -ge "20" ] && pass "$ENDPOINTS endpoints зарегистрировано" || warn "Только $ENDPOINTS endpoints — что-то отвалилось?"

# ─────────────────────────────────────────────────────────────────
section "6. SSL certificate"
DOMAIN=$(echo "$API_BASE" | sed 's|^https://||')
SSL=$(echo | openssl s_client -servername "$DOMAIN" -connect "$DOMAIN:443" 2>/dev/null | openssl x509 -noout -dates 2>&1)
echo "$SSL" | grep -q "notAfter" && pass "SSL cert валиден" || warn "SSL check не сработал (может быть OK на Caddy)"

# ─────────────────────────────────────────────────────────────────
section "7. Stripe webhook endpoint доступен"
WEBHOOK_CODE=$(curl -sf -o /dev/null -w "%{http_code}" "$FRONTEND/api/stripe-webhook" -X POST -d '{}' -H "Content-Type: application/json" -H "stripe-signature: test")
if [ "$WEBHOOK_CODE" = "400" ] || [ "$WEBHOOK_CODE" = "200" ]; then
  pass "Stripe webhook endpoint отвечает ($WEBHOOK_CODE — ожидаемо)"
else
  warn "Stripe webhook вернул $WEBHOOK_CODE"
fi

# ─────────────────────────────────────────────────────────────────
section "8. Agent (только если Anthropic ключ настроен)"
echo "Запустить полный test-run агента? Это потратит ~$0.25 на API. [y/N]"
read -r RESPONSE
if [ "$RESPONSE" = "y" ] || [ "$RESPONSE" = "Y" ]; then
  echo "Запуск Buzz + Aegis (60-90 секунд)..."
  RUN_RESULT=$(curl -sf --max-time 180 -X POST "$API_BASE/api/agents/run" \
    -H "Content-Type: application/json" \
    -d '{"customer_id":"smoke-test","agent_type":"bidding"}' || echo "FAIL")
  if echo "$RUN_RESULT" | grep -q '"success":true'; then
    pass "Buzz + Aegis отработали"
  elif echo "$RUN_RESULT" | grep -q '"success":false'; then
    warn "Агент вернул error (возможно нет ANTHROPIC_API_KEY или customer_id невалиден)"
  else
    fail "Agent run упал"
  fi
else
  warn "Agent test пропущен (skipped)"
fi

echo ""
echo -e "${GREEN}═══ SMOKE TEST ЗАВЕРШЁН ═══${NC}"
echo ""
echo "Что проверить дополнительно вручную:"
echo "  1. Открыть $FRONTEND в браузере — лендинг должен загружаться"
echo "  2. Submit waitlist форму — должна показать success"
echo "  3. Открыть $FRONTEND/b6 — dashboard должен открыться"
echo "  4. Нажать 'Run Buzz' — должен запуститься (если есть Anthropic key)"
echo "  5. Проверить console.anthropic.com → Usage — нет ли неожиданных расходов"
