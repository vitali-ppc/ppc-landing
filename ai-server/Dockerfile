# Використовуємо офіційний Python образ
FROM python:3.11-slim

# Встановлюємо робочу директорію
WORKDIR /app

# Копіюємо файли залежностей
COPY requirements.txt .

# Встановлюємо залежності
RUN pip install --no-cache-dir -r requirements.txt

# Копіюємо код додатку
COPY . .

# Відкриваємо порт
EXPOSE 8000

# Змінні середовища за замовчуванням
ENV AI_SERVER_HOST=0.0.0.0
ENV AI_SERVER_PORT=8000
ENV AI_SERVER_RELOAD=false

# Команда запуску
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"] 