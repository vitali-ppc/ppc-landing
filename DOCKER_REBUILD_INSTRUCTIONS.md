# Инструкция по пересборке Docker контейнера с исправлениями

## 🎯 Цель
Пересобрать Docker контейнер с исправленными f-string проблемами в GAQL запросе для решения проблемы передачи данных из Google Ads в чат.

## ✅ Исправления, внесенные в код

### 1. Исправлены f-string проблемы в логах
- Заменены все f-string конструкции на обычную конкатенацию строк
- Устранены проблемы с символами `{` и `}` в логах
- Исправлены ошибки `BAD_FIELD_NAME` в Google Ads API

### 2. Улучшена функция `summarize_ads_data`
- Добавлен Account ID в резюме данных
- Улучшена обработка ошибок
- Более детальная информация о кампаниях

### 3. Улучшен системный промпт
- Добавлена инструкция анализировать конкретные данные Google Ads
- Лучшая персонализация рекомендаций

## 🐳 Команды для пересборки

### Шаг 1: Подключение к серверу
```bash
ssh root@91.99.225.211
```

### Шаг 2: Переход в директорию проекта
```bash
cd /home/vitaliy/ppc-landing/ai-server
```

### Шаг 3: Остановка текущего контейнера
```bash
docker-compose down
```

### Шаг 4: Очистка Docker кеша (КРИТИЧНО!)
```bash
# Удаляем старые образы
docker rmi ai-server_ai-server

# Полная очистка кеша
docker system prune -f
```

### Шаг 5: Пересборка с отключением кеша
```bash
docker-compose build --no-cache
```

### Шаг 6: Запуск нового контейнера
```bash
docker-compose up -d
```

### Шаг 7: Проверка статуса
```bash
docker-compose ps
docker-compose logs -f
```

## 🔍 Проверка исправлений

### Проверка содержимого файла в контейнере
```bash
docker exec -it ai-server_ai-server_1 cat /app/main.py | grep -A 5 -B 5 "GAQL QUERY EXECUTED"
```

### Тест получения данных Google Ads
```bash
curl -X POST http://localhost:8000/ads-data-real \
  -H "Content-Type: application/json" \
  -d '{"accessToken": "test", "refreshToken": "test"}'
```

### Тест чата с данными
```bash
curl -X POST http://localhost:8000/chat \
  -H "Content-Type: application/json" \
  -d '{"question": "Analyze my Google Ads performance", "accessToken": "test", "refreshToken": "test"}'
```

## 📋 Ожидаемые результаты

### После успешной пересборки:
1. ✅ Docker контейнер запускается без ошибок
2. ✅ GAQL запросы выполняются без `BAD_FIELD_NAME` ошибок
3. ✅ Данные Google Ads передаются в чат корректно
4. ✅ AI анализирует реальные данные кампаний
5. ✅ Персонализированные рекомендации на основе данных

### Логи должны показывать:
```
=== GAQL QUERY EXECUTED ===
Query: SELECT campaign.id, campaign.name, campaign.status, metrics.impressions, metrics.clicks, metrics.cost_micros, metrics.conversions, metrics.average_cpc FROM campaign WHERE segments.date DURING LAST_30_DAYS
Response status: 200
```

## ⚠️ Возможные проблемы

### Если контейнер не запускается:
```bash
# Проверка логов
docker-compose logs

# Проверка синтаксиса Python
docker exec -it ai-server_ai-server_1 python -m py_compile /app/main.py
```

### Если старый код все еще используется:
```bash
# Принудительная пересборка
docker-compose down
docker system prune -a -f
docker-compose build --no-cache --pull
docker-compose up -d
```

## 🎯 Следующие шаги

После успешной пересборки:
1. Протестировать получение реальных данных Google Ads
2. Проверить передачу данных в чат
3. Убедиться в корректной работе AI анализа
4. Протестировать различные диапазоны дат (7, 30, 90 дней)

## 📞 Поддержка

Если возникнут проблемы:
1. Проверить логи: `docker-compose logs -f`
2. Проверить статус контейнера: `docker-compose ps`
3. Проверить содержимое файлов: `docker exec -it ai-server_ai-server_1 ls -la /app/`

---

**Дата создания:** 2025-01-06  
**Статус:** Готово к выполнению  
**Приоритет:** Критический 