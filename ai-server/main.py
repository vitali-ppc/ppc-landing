import os
import json
import hashlib
from fastapi.responses import StreamingResponse
from typing import Dict, Any
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from dotenv import load_dotenv
import openai
from datetime import datetime
import logging
import io
import csv
from openpyxl import Workbook
from openpyxl.styles import Font, Alignment

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

        # Формуємо сучасний англійський системний промпт 2025 року
        system_message = {
            "role": "system", 
            "content": "You are a Google Ads expert with cutting-edge knowledge of 2025 PPC strategies and AI-powered advertising tools. Your role is to provide professional, structured recommendations for Google Ads campaign optimization using the latest AI-driven approaches.\n\nRESPONSE STRUCTURE:\n1. **QUICK ANALYSIS** - main problems/opportunities considering current trends\n2. **STEP-BY-STEP PLAN** - specific actions with priorities (High/Medium/Low)\n3. **EXPECTED RESULTS** - metrics and KPIs for 2025\n4. **RECOMMENDATIONS** - detailed advice with numbers and modern tools\n5. **MONITORING** - what to track and how to analyze\n\nMODERN TOOLS 2025:\n🔥 **Performance Max (PMax)** - AI-optimized automated campaigns across all Google channels\n🎯 **Demand Gen** - demand generation through YouTube Shorts, Discover, Gmail\n🧠 **AI-powered bidding** - tCPA, tROAS, Maximize Conversions, Maximize Conversion Value\n👥 **Modern audiences** - Custom Segments, In-Market, Customer Match, Lookalike\n📝 **Adaptive ads** - RSA, RDA with automatic testing\n⚙️ **Automated strategies** - Auto Assets, DSA, Smart Bidding\n🔄 **Cross-channel optimization** - integration of all Google channels\n\nPRINCIPLES 2025:\n- Maximize AI usage: PMax, automated bidding, adaptive ads\n- Leverage 1st-party data: Customer Match, CRM integrations\n- Focus on creatives: video, interactive, UGC\n- GA4 + Enhanced Conversions - must-have\n- Test: A/B headlines, audiences, creatives\n- Automate but control: don't rely 100% on AI\n- Use Audience Signals for PMax\n- Segment campaigns by product type/sales cycle\n\nMETRICS 2025:\n- Conversion Value/Cost (ROAS) - most important for eCommerce\n- Engagement Rate (Demand Gen) - reach + interaction\n- Video View Rate - in video campaigns\n- New Customer Acquisition - new users\n- Ad Strength (RSA, RDA) - quality of adaptive ads\n- Data-driven Attribution (DDA) - attribution across all touchpoints\n\nEXPERTISE:\n- Performance Max campaigns and optimization\n- Demand Gen strategies and creatives\n- AI-powered bidding and automation\n- Modern audiences and segmentation\n- Adaptive ads and optimization\n- Cross-channel strategies\n- GA4 and Enhanced Conversions\n- 1st-party data and Customer Match\n- Google's automated strategies\n- Conversions and attribution 2025\n\nRESPONSE FORMAT:\n- Use markdown formatting for structure\n- Provide specific numbers and percentages\n- Include actionable recommendations\n- Always complete thoughts and give actionable advice\n- Use real Google Ads metrics (CTR, CPC, CR, ROAS)\n- Include expected results with timeframes\n- Use professional English terminology\n- Provide concrete examples and case studies\n- Include industry best practices and benchmarks\n- Focus on data-driven insights and measurable outcomes\n- When user says 'continue', 'carry on', 'more', 'expand' - continue the previous topic with additional details\n- Always assume context from previous conversation\n- Don't ask for clarification unless absolutely necessary"
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
                user_message["content"] = f"Analyze this image and answer the question: {question}\n[Image: {image_data[:100]}...]"
            except Exception as e:
                logger.warning(f"Failed to process image: {e}")

        # Викликаємо OpenAI API
        response = client.chat.completions.create(
            model="gpt-4-turbo",
            messages=[system_message, user_message],  # type: ignore
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
                "conversion_rate": 4.4,
                "revenue": 2800.0,
                "roas": 8.0,
                "demographics": {
                    "age_18_24": 15,
                    "age_25_34": 35,
                    "age_35_44": 30,
                    "age_45_54": 15,
                    "age_55_plus": 5,
                    "male": 45,
                    "female": 55
                }
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
                "conversion_rate": 2.9,
                "revenue": 2100.0,
                "roas": 5.0,
                "demographics": {
                    "age_18_24": 20,
                    "age_25_34": 40,
                    "age_35_44": 25,
                    "age_45_54": 10,
                    "age_55_plus": 5,
                    "male": 60,
                    "female": 40
                }
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
                "conversion_rate": 3.0,
                "revenue": 720.0,
                "roas": 4.0,
                "demographics": {
                    "age_18_24": 10,
                    "age_25_34": 30,
                    "age_35_44": 35,
                    "age_45_54": 20,
                    "age_55_plus": 5,
                    "male": 35,
                    "female": 65
                }
            }
        ],
        "total": {
            "cost": 950.0,
            "clicks": 2500,
            "impressions": 100000,
            "conversions": 87,
            "ctr": 2.5,
            "cpc": 0.38,
            "conversion_rate": 3.5,
            "revenue": 5620.0,
            "roas": 5.9,
            "roi": 491.6
        },
        "demographics": {
            "age_18_24": 16,
            "age_25_34": 36,
            "age_35_44": 29,
            "age_45_54": 14,
            "age_55_plus": 5,
            "male": 48,
            "female": 52
        },
        "keywords": [
            {
                "keyword": "brand name",
                "clicks": 450,
                "impressions": 12000,
                "cost": 175.0,
                "conversions": 20,
                "ctr": 3.75,
                "cpc": 0.39,
                "conversion_rate": 4.4,
                "quality_score": 8
            },
            {
                "keyword": "competitor name",
                "clicks": 600,
                "impressions": 20000,
                "cost": 210.0,
                "conversions": 18,
                "ctr": 3.0,
                "cpc": 0.35,
                "conversion_rate": 3.0,
                "quality_score": 6
            },
            {
                "keyword": "generic product",
                "clicks": 800,
                "impressions": 35000,
                "cost": 280.0,
                "conversions": 24,
                "ctr": 2.3,
                "cpc": 0.35,
                "conversion_rate": 3.0,
                "quality_score": 7
            },
            {
                "keyword": "long tail phrase",
                "clicks": 200,
                "impressions": 8000,
                "cost": 70.0,
                "conversions": 8,
                "ctr": 2.5,
                "cpc": 0.35,
                "conversion_rate": 4.0,
                "quality_score": 9
            },
            {
                "keyword": "low performing",
                "clicks": 450,
                "impressions": 25000,
                "cost": 215.0,
                "conversions": 17,
                "ctr": 1.8,
                "cpc": 0.48,
                "conversion_rate": 3.8,
                "quality_score": 4
            }
        ]
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
# Функції експорту
def parse_text_to_rows(text: str) -> list:
    """Парсинг тексту в рядки для експорту"""
    lines = text.split('\n')
    rows = []
    for line in lines:
        if line.strip():
            # Розбиваємо на клітинки по табуляції або подвійним пробілам
            cells = [cell.strip() for cell in line.split('\t') if cell.strip()]
            if not cells:
                cells = [line.strip()]
            rows.append(cells)
    return rows if rows else [["AI Response", text]]

@app.post("/export-txt")
async def export_txt(request: Request):
    """Експорт в TXT формат"""
    try:
        body = await request.json()
        text = body.get("text", "")
        
        if not text:
            return JSONResponse({"error": "Text is required"}, status_code=400)
        
        # Створюємо буфер з текстом
        buffer = io.BytesIO()
        buffer.write(text.encode('utf-8'))
        buffer.seek(0)
        
        # Генеруємо ім'я файлу
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        filename = f"chat_export_{timestamp}.txt"
        
        return StreamingResponse(
            buffer,
            media_type="text/plain; charset=utf-8",
            headers={"Content-Disposition": f"attachment; filename={filename}"}
        )
    except Exception as e:
        logger.error(f"TXT export error: {e}")
        return JSONResponse({"error": str(e)}, status_code=500)

@app.post("/export-csv")
async def export_csv(request: Request):
    """Експорт в CSV формат"""
    try:
        body = await request.json()
        rows = body.get("rows", [])
        
        if not rows:
            return JSONResponse({"error": "Rows data is required"}, status_code=400)
        
        # Створюємо CSV буфер
        buffer = io.StringIO()
        writer = csv.writer(buffer)
        writer.writerows(rows)
        
        # Конвертуємо в bytes
        csv_data = buffer.getvalue().encode('utf-8')
        buffer.close()
        
        # Створюємо bytes буфер
        bytes_buffer = io.BytesIO(csv_data)
        bytes_buffer.seek(0)
        
        # Генеруємо ім'я файлу
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        filename = f"chat_export_{timestamp}.csv"
        
        return StreamingResponse(
            bytes_buffer,
            media_type="text/csv; charset=utf-8",
            headers={"Content-Disposition": f"attachment; filename={filename}"}
        )
    except Exception as e:
        logger.error(f"CSV export error: {e}")
        return JSONResponse({"error": str(e)}, status_code=500)

@app.post("/export-xlsx")
async def export_xlsx(request: Request):
    """Експорт в XLSX формат"""
    try:
        body = await request.json()
        rows = body.get("rows", [])
        
        if not rows:
            return JSONResponse({"error": "Rows data is required"}, status_code=400)
        
        # Створюємо Excel файл
        workbook = Workbook()
        worksheet = workbook.active
        if worksheet:
            worksheet.title = "Chat Export"
            
            # Додаємо дані
            for i, row in enumerate(rows, 1):
                for j, cell_value in enumerate(row, 1):
                    cell = worksheet.cell(row=i, column=j, value=cell_value)
            
            # Стилізуємо заголовок
            if rows and worksheet[1]:
                for cell in worksheet[1]:
                    if cell:
                        cell.font = Font(bold=True)
                        cell.alignment = Alignment(horizontal='center')
        
        # Зберігаємо в буфер
        buffer = io.BytesIO()
        workbook.save(buffer)
        buffer.seek(0)
        
        # Генеруємо ім'я файлу
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        filename = f"chat_export_{timestamp}.xlsx"
        
        return StreamingResponse(
            buffer,
            media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            headers={"Content-Disposition": f"attachment; filename={filename}"}
        )
    except Exception as e:
        logger.error(f"XLSX export error: {e}")
        return JSONResponse({"error": str(e)}, status_code=500)

@app.post("/export-pdf")
async def export_pdf(request: Request):
    """Експорт в PDF формат (спрощена версія)"""
    try:
        body = await request.json()
        text = body.get("text", "")
        
        if not text:
            return JSONResponse({"error": "Text is required"}, status_code=400)
        
        # Створюємо простий HTML для PDF
        html_content = f"""
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <title>Chat Export</title>
            <style>
                body {{ font-family: Arial, sans-serif; margin: 40px; line-height: 1.6; }}
                h1 {{ color: #333; border-bottom: 2px solid #eee; padding-bottom: 10px; }}
                pre {{ background: #f5f5f5; padding: 15px; border-radius: 5px; overflow-x: auto; }}
                code {{ background: #f0f0f0; padding: 2px 4px; border-radius: 3px; }}
            </style>
        </head>
        <body>
            <h1>Chat Export</h1>
            <div>{text.replace(chr(10), '<br>')}</div>
        </body>
        </html>
        """ 
        # Конвертуємо в bytes
        buffer = io.BytesIO()
        buffer.write(html_content.encode('utf-8'))
        buffer.seek(0)
        
        # Генеруємо ім'я файлу
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        filename = f"chat_export_{timestamp}.html"
        
        return StreamingResponse(
            buffer,
            media_type="text/html; charset=utf-8",
            headers={"Content-Disposition": f"attachment; filename={filename}"}
        )
    except Exception as e:
        logger.error(f"PDF export error: {e}")
        return JSONResponse({"error": str(e)}, status_code=500)
if __name__ == "__main__":
    try:
        import uvicorn
        uvicorn.run(app, host="0.0.0.0", port=8002)  # Змінено порт на 8002
    except ImportError:
        print("Uvicorn not installed. Install with: pip install uvicorn")
        print("Or run with: python -m uvicorn main:app --host 0.0.0.0 --port 8002")
