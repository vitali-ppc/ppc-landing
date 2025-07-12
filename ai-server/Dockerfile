# Використовуємо офіційний Python образ
FROM python:3.11-slim

# Встановлюємо системні залежності для Chromium
RUN apt-get update && apt-get install -y \
    wget \
    gnupg \
    ca-certificates \
    procps \
    libxss1 \
    && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
    && apt-get update \
    && apt-get install -y google-chrome-stable \
    && rm -rf /var/lib/apt/lists/*

# Встановлюємо робочу директорію
WORKDIR /app

# Копіюємо файли залежностей
COPY requirements.txt .

# Встановлюємо залежності
RUN pip install --no-cache-dir -r requirements.txt

# Встановлюємо Chromium для pyppeteer
RUN pyppeteer-install

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