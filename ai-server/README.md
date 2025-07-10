# PPCSet AI Server

AI-сервер для аналітики Google Ads на базі FastAPI та OpenAI GPT-4.

## 🚀 Швидкий старт

### 1. Встановлення залежностей

```bash
pip install -r requirements.txt
```

### 2. Налаштування змінних середовища

Скопіюйте `env.example` в `.env` та налаштуйте:

```bash
cp env.example .env
```

Відредагуйте `.env`:
```env
OPENAI_API_KEY=your_openai_api_key_here
AI_SERVER_HOST=0.0.0.0
AI_SERVER_PORT=8000
```

### 3. Запуск сервера

```bash
# Використовуючи скрипт
python start.py

# Або напряму
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

## 🐳 Docker

### Локальний запуск з Docker

```bash
# Збірка та запуск
docker-compose up --build

# Або без docker-compose
docker build -t ppcset-ai-server .
docker run -p 8002:8000 -e OPENAI_API_KEY=your_key ppcset-ai-server
```

### Деплой на Render

1. **Створіть новий Web Service** на [Render](https://render.com)
2. **Підключіть GitHub репозиторій**
3. **Налаштування:**
   - **Build Command:** `pip install -r requirements.txt`
   - **Start Command:** `uvicorn main:app --host 0.0.0.0 --port $PORT`
   - **Environment Variables:**
     - `OPENAI_API_KEY`: ваш OpenAI API ключ
     - `AI_SERVER_HOST`: `0.0.0.0`
     - `AI_SERVER_PORT`: `$PORT`

### Деплой на Railway

1. **Підключіть GitHub репозиторій** до [Railway](https://railway.app)
2. **Додайте змінні середовища:**
   - `OPENAI_API_KEY`: ваш OpenAI API ключ
3. **Railway автоматично визначить Python додаток**

### Деплой на VPS

```bash
# На VPS сервері
git clone your-repo
cd ai-server
docker build -t ppcset-ai-server .
docker run -d -p 8000:8000 --name ai-server -e OPENAI_API_KEY=your_key ppcset-ai-server
```

## 📡 API Endpoints

### POST /chat
Основний endpoint для чату з AI.

**Запит:**
```json
{
  "question": "Як покращити мою кампанію Google Ads?",
  "image": "data:image/jpeg;base64,...", // опціонально
  "timestamp": "2024-01-01T12:00:00Z"
}
```

**Відповідь:**
```json
{
  "answer": "Відповідь AI...",
  "timestamp": "2024-01-01T12:00:00Z",
  "model": "gpt-4-turbo",
  "tokens_used": 150
}
```

### GET /ads-data
Mock-дані Google Ads для тестування.

### GET /health
Перевірка здоров'я сервера.

### GET /
Кореневий endpoint з інформацією про сервер.

## 🔧 Налаштування

### Змінні середовища

| Змінна | Опис | За замовчуванням |
|--------|------|------------------|
| `OPENAI_API_KEY` | API ключ OpenAI | - |
| `AI_SERVER_HOST` | Хост сервера | `0.0.0.0` |
| `AI_SERVER_PORT` | Порт сервера | `8000` |
| `AI_SERVER_RELOAD` | Автоперезавантаження | `true` |

### Моделі OpenAI

За замовчуванням використовується `gpt-4-turbo`. Можна змінити в `main.py`.

## 🛠 Розробка

### Структура проєкту

```
ai-server/
├── main.py          # Основний файл FastAPI додатку
├── start.py         # Скрипт запуску
├── requirements.txt # Залежності Python
├── Dockerfile       # Docker конфігурація
├── docker-compose.yml # Docker Compose
├── env.example      # Приклад конфігурації
└── README.md        # Ця документація
```

### Додавання нових endpoints

1. Додайте новий endpoint в `main.py`
2. Додайте документацію в цей README
3. Протестуйте через Swagger UI: `http://localhost:8000/docs`

## 🚀 Деплой

### Локальний запуск
```bash
python start.py
```

### Docker (для майбутнього)
```bash
docker build -t ppcset-ai-server .
docker run -p 8000:8000 ppcset-ai-server
```

### Vercel/Heroku (для майбутнього)
Налаштуйте змінні середовища та деплойте як Python додаток.

## 🔍 Моніторинг

### Логи
Сервер автоматично логує:
- Запити до API
- Помилки OpenAI
- Використання токенів

### Health Check
```bash
curl http://localhost:8000/health
```

## 🐛 Troubleshooting

### Помилка "OPENAI_API_KEY not found"
- Перевірте файл `.env`
- Переконайтеся, що ключ правильний

### Помилка "Rate limit exceeded"
- Дочекайтеся кілька хвилин
- Перевірте ліміти OpenAI

### Сервер не запускається
- Перевірте порт 8000
- Переконайтеся, що всі залежності встановлені

### Docker помилки
- Перевірте, чи встановлений Docker
- Переконайтеся, що порт 8002 вільний
- Перевірте змінні середовища

## 📈 Майбутні покращення

- [ ] Інтеграція з Google Ads API
- [ ] Векторна база даних (Pinecone/Weaviate)
- [ ] Аналіз зображень через Vision API
- [ ] Кешування відповідей
- [ ] Аутентифікація користувачів
- [ ] Метрики та аналітика 