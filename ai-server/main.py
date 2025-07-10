import os
import json
import hashlib
from typing import Dict, Any
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from dotenv import load_dotenv
import openai
from datetime import datetime
import logging

# Налаштування логування
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

load_dotenv()

app = FastAPI(
    title="PPCSet AI Server",
    description="AI-сервер для аналітики Google Ads",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Ініціалізація OpenAI клієнта
client = openai.OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# Простий кеш для зберігання відповідей
response_cache: Dict[str, Dict[str, Any]] = {}

@app.get("/")
async def root():
    """Кореневий endpoint"""
    return {
        "message": "PPCSet AI Server is running!",
        "version": "1.0.0",
        "endpoints": {
            "chat": "/chat",
            "health": "/health",
            "ads-data": "/ads-data",
            "cache": "/cache/stats"
        }
    }

@app.post("/chat")
async def chat(request: Request):
    """Обробка чат-запитів з AI"""
    try:
        # Отримуємо дані запиту
        body = await request.json()
        question = body.get("question", "")
        image = body.get("image", None)
        
        if not question:
            return JSONResponse(
                status_code=400,
                content={"answer": "❌ **Помилка**: Питання не може бути порожнім"}
            )

        # Створюємо ключ кешу
        cache_key = hashlib.md5(f"{question}{image or ''}".encode()).hexdigest()
        timestamp = datetime.now().isoformat()

        # Перевіряємо кеш
        if cache_key in response_cache:
            cached_response = response_cache[cache_key]
            if (datetime.now() - datetime.fromisoformat(cached_response["timestamp"])).days < 1:
                logger.info(f"Cache hit for question: {question[:50]}...")
                return cached_response

        # Формуємо промпт (спрощений)
        system_message = {
            "role": "system", 
            "content": "Ти експерт Google Ads з 10+ роками досвіду. Давай конкретні рекомендації з цифрами, поетапні плани та очікувані результати. Завжди завершуй думку."
        }

        user_message = {
            "role": "user",
            "content": question
        }

        # Додаємо зображення до промпту якщо є
        if image:
            try:
                if image.startswith('data:image'):
                    image_data = image.split(',')[1]
                else:
                    image_data = image
                user_message["content"] = f"Проаналізуй це зображення та відповідай на питання: {question}\n[Зображення: {image_data[:100]}...]"
            except Exception as e:
                logger.warning(f"Failed to process image: {e}")

        # Викликаємо OpenAI API
        response = client.chat.completions.create(
            model="gpt-4-turbo",
            messages=[system_message, user_message],
            max_tokens=1200,  # Збільшено для повних відповідей
            temperature=0.3,
            timeout=60  # 60 секунд таймаут
        )

        answer = response.choices[0].message.content

        # Логуємо запит
        logger.info(f"Chat request processed - tokens used: {response.usage.total_tokens if response.usage else 'unknown'}")

        # Зберігаємо в кеш
        response_data = {
            "answer": answer,
            "timestamp": timestamp,
            "model": "gpt-4-turbo",
            "tokens_used": response.usage.total_tokens if response.usage else None
        }
        response_cache[cache_key] = response_data

        return response_data

    except openai.AuthenticationError:
        logger.error("OpenAI authentication failed")
        return JSONResponse(
            status_code=500,
            content={"answer": "❌ **Помилка авторизації AI-сервісу**\n\nПеревірте налаштування API ключа."}
        )
    except openai.RateLimitError:
        logger.error("OpenAI rate limit exceeded")
        return JSONResponse(
            status_code=429,
            content={"answer": "⏳ **Перевищено ліміт запитів**\n\nСпробуйте через кілька хвилин."}
        )
    except Exception as e:
        logger.error(f"Unexpected error in chat endpoint: {e}")
        return JSONResponse(
            status_code=500,
            content={"answer": f"❌ **Помилка обробки запиту**\n\nСпробуйте ще раз або зверніться до підтримки.\n\n*Деталі: {str(e)}*"}
        )

@app.get("/ads-data")
def get_ads_data():
    """Mock-дані Google Ads для тестування"""
    return {
        "account_id": "123-456-7890",
        "date_range": "2024-05-01 — 2024-05-31",
        "campaigns": [
            {
                "name": "Brand Search",
                "status": "ENABLED",
                "cost": 350.0,
                "clicks": 900,
                "impressions": 25000,
                "conversions": 40,
                "ctr": 3.6,
                "cpc": 0.39,
                "conversion_rate": 4.4
            },
            {
                "name": "Competitor Bidding",
                "status": "ENABLED",
                "cost": 420.0,
                "clicks": 1200,
                "impressions": 40000,
                "conversions": 35,
                "ctr": 3.0,
                "cpc": 0.35,
                "conversion_rate": 2.9
            },
            {
                "name": "Display Remarketing",
                "status": "PAUSED",
                "cost": 180.0,
                "clicks": 400,
                "impressions": 35000,
                "conversions": 12,
                "ctr": 1.1,
                "cpc": 0.45,
                "conversion_rate": 3.0
            }
        ],
        "total": {
            "cost": 950.0,
            "clicks": 2500,
            "impressions": 100000,
            "conversions": 87,
            "ctr": 2.5,
            "cpc": 0.38,
            "conversion_rate": 3.5
        }
    }

@app.get("/health")
async def health_check():
    """Детальна перевірка здоров'я сервера"""
    try:
        # Перевіряємо OpenAI підключення
        test_response = client.chat.completions.create(
            model="gpt-4-turbo",
            messages=[{"role": "user", "content": "test"}],
            max_tokens=5
        )
        openai_status = "healthy"
    except Exception as e:
        openai_status = f"error: {str(e)}"

    return {
        "status": "healthy",
        "timestamp": datetime.now().isoformat(),
        "services": {
            "openai": openai_status,
            "database": "not_implemented",
            "vector_store": "not_implemented"
        },
        "cache": {
            "size": len(response_cache),
            "status": "active"
        },
        "version": "1.0.0"
    }

@app.delete("/cache")
async def clear_cache():
    """Очищення кешу"""
    global response_cache
    cache_size = len(response_cache)
    response_cache.clear()
    logger.info(f"Cache cleared - removed {cache_size} entries")
    return {
        "message": f"Cache cleared successfully",
        "removed_entries": cache_size,
        "timestamp": datetime.now().isoformat()
    }

@app.get("/cache/stats")
async def cache_stats():
    """Статистика кешу"""
    return {
        "cache_size": len(response_cache),
        "cache_keys": list(response_cache.keys())[:10],
        "timestamp": datetime.now().isoformat()
    }

if __name__ == "__main__":
    try:
        import uvicorn
        uvicorn.run(app, host="0.0.0.0", port=8002)  # Змінено порт на 8002
    except ImportError:
        print("Uvicorn not installed. Install with: pip install uvicorn")
        print("Or run with: python -m uvicorn main:app --host 0.0.0.0 --port 8002")