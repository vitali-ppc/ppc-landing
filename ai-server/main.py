import os
import json
import hashlib
from fastapi.responses import StreamingResponse

import io
from typing import Dict, Any, Optional, List
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse, StreamingResponse
from dotenv import load_dotenv
import openai
from datetime import datetime
import logging
import io

import csv
from openpyxl import Workbook
from openpyxl.styles import Font, Alignment
import httpx

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

# Кеш для зберігання токенів користувачів (в продакшені використовуйте Redis або DB)
token_cache: Dict[str, Dict[str, Any]] = {}

# Глобальна змінна для уникнення помилки date_range
date_range = None


async def get_real_ads_data_with_date_range(
    access_token: str,
    refresh_token: Optional[str],
    customer_id_override: Optional[str] = None,
    date_range: Optional[Dict[str, Any]] = None,
) -> Dict[str, Any]:
    """Отримати реальні дані Google Ads. Повертає об'єкт з campaign'ами та total.

    Використовує ті самі змінні середовища, що і /ads-data-real.
    """
    print("=== ENTER get_real_ads_data_with_date_range ===")
    print(f"=== RECEIVED PARAMETERS ===")
    print(f"access_token: {'present' if access_token else 'None'}")
    print(f"refresh_token: {'present' if refresh_token else 'None'}")
    print(f"customer_id_override: {customer_id_override}")
    print(f"date_range: {date_range}")
    print(f"date_range type: {type(date_range)}")
    
    # Отримуємо дійсний access token (з автоматичним оновленням)
    valid_access_token = await get_valid_access_token(access_token, refresh_token or "")

    mcc_id = os.getenv("GOOGLE_ADS_CUSTOMER_ID")
    customer_id = customer_id_override or os.getenv("GOOGLE_ADS_CLIENT_CUSTOMER_ID")
    developer_token = os.getenv("GOOGLE_ADS_DEVELOPER_TOKEN")

    if not (valid_access_token and mcc_id and customer_id and developer_token):
        raise RuntimeError("Google Ads credentials or tokens are missing")

    child_account_id = customer_id.replace('-', '')

    # Обработка date_range параметра
    date_range_label = "Last 30 days"
    date_filter_clause = "segments.date DURING LAST_30_DAYS"
    
    if date_range and isinstance(date_range, dict):
        preset = date_range.get("preset", "").lower()
        print(f"=== PROCESSING DATE RANGE: {preset} ===")
        
        if preset == "last_7_days":
            date_range_label = "Last 7 days"
            date_filter_clause = "segments.date DURING LAST_7_DAYS"
        elif preset == "last_30_days":
            date_range_label = "Last 30 days"
            date_filter_clause = "segments.date DURING LAST_30_DAYS"
        elif preset == "last_90_days":
            date_range_label = "Last 90 days"
            date_filter_clause = "segments.date DURING LAST_90_DAYS"
        else:
            print(f"=== UNKNOWN PRESET: {preset}, USING DEFAULT 30 DAYS ===")
    
    print(f"=== FINAL DATE RANGE: {date_range_label} ===")
    print(f"=== FINAL FILTER: {date_filter_clause} ===")

    logger.info("Using date filter: {}".format(date_filter_clause))
    
    # Build final GAQL query
    gaql_query = f"""SELECT 
        campaign.id,
        campaign.name,
        campaign.status,
        metrics.impressions,
        metrics.clicks,
        metrics.cost_micros,
        metrics.conversions,
        metrics.average_cpc
    FROM campaign
    WHERE {date_filter_clause}"""
    
    print("=== GAQL FINAL ===")
    print("Query: " + repr(gaql_query))
    print("Query length: " + str(len(gaql_query)))
    print("Query contains '{': " + str('{' in gaql_query))
    print("Query contains '}': " + str('}' in gaql_query))
    print("date_filter_clause: " + repr(date_filter_clause))
    print("==================")

    print("=== BEFORE HTTP REQUEST ===")
    print(f"URL: https://googleads.googleapis.com/v20/customers/{child_account_id}/googleAds:searchStream")
    print(f"Headers: Authorization=Bearer {valid_access_token[:20]}..., developer-token={developer_token[:10]}..., login-customer-id={mcc_id.replace('-', '')}")
    print("JSON body: {'query': " + repr(gaql_query) + "}")
    print("==========================")
    
    async with httpx.AsyncClient() as http:
        campaigns_response = await http.post(
            f"https://googleads.googleapis.com/v20/customers/{child_account_id}/googleAds:searchStream",
            headers={
                "Authorization": f"Bearer {valid_access_token}",
                "developer-token": developer_token,
                "login-customer-id": mcc_id.replace('-', ''),
                "Content-Type": "application/json",
            },
            json={
                "query": gaql_query
            }
        )
        
        # ЛОГИРОВАНИЕ ПЕРЕД ПРОВЕРКОЙ СТАТУСА
        logger.info("=== GAQL QUERY EXECUTED ===")
        logger.info("Query: " + repr(gaql_query))
        logger.info("Query length: " + str(len(gaql_query)))
        logger.info("Query contains '{': " + str('{' in gaql_query))
        logger.info("Query contains '}': " + str('}' in gaql_query))
        logger.info("Response status: " + str(campaigns_response.status_code))
        logger.info("Response headers: " + str(dict(campaigns_response.headers)))
        logger.info("Response text: " + campaigns_response.text[:500] + "...")
        logger.info("Request content: " + str(campaigns_response.request.content))

    if campaigns_response.status_code != 200:
        raise RuntimeError(f"Google Ads API error: {campaigns_response.status_code} - {campaigns_response.text}")

    campaigns_data = campaigns_response.json()

    # Підтримка обох форматів відповіді: список чанків (searchStream) або один об'єкт
    results_rows: List[Dict[str, Any]] = []
    if isinstance(campaigns_data, list):
        for chunk in campaigns_data:
            results_rows.extend(chunk.get('results', []))
    elif isinstance(campaigns_data, dict):
        results_rows = campaigns_data.get('results', [])

    def to_int(value: Any) -> int:
        try:
            if value is None:
                return 0
            if isinstance(value, (int,)):
                return value
            if isinstance(value, float):
                return int(value)
            # strings like '381'
            return int(str(value).strip())
        except Exception:
            return 0

    def micros_to_currency(value: Any) -> float:
        try:
            return to_int(value) / 1_000_000
        except Exception:
            return 0.0

    campaigns: List[Dict[str, Any]] = []
    total_cost = 0.0
    total_clicks = 0
    total_impressions = 0
    total_conversions = 0

    for result in results_rows:
        try:
            campaign = result.get('campaign', {})
            metrics = result.get('metrics', {})

            # Поля можуть бути в різних кейсах: costMicros/averageCpc vs cost_micros/average_cpc
            cost_micros_raw = (
                metrics.get('cost_micros')
                or metrics.get('costMicros')
                or 0
            )
            avg_cpc_micros_raw = (
                metrics.get('average_cpc')
                or metrics.get('averageCpc')
                or 0
            )

            clicks = to_int(metrics.get('clicks', 0))
            impressions = to_int(metrics.get('impressions', 0))
            conversions = to_int(metrics.get('conversions', 0))

            cost = micros_to_currency(cost_micros_raw)
            avg_cpc_currency = micros_to_currency(avg_cpc_micros_raw)

            ctr = (clicks / impressions * 100) if impressions > 0 else 0
            cpc = avg_cpc_currency if clicks > 0 else 0
            conversion_rate = (conversions / clicks * 100) if clicks > 0 else 0

            campaigns.append({
                "name": campaign.get('name', 'Unknown'),
                "status": campaign.get('status', 'UNKNOWN'),
                "cost": round(cost, 2),
                "clicks": clicks,
                "impressions": impressions,
                "conversions": conversions,
                "ctr": round(ctr, 2),
                "cpc": round(cpc, 2),
                "conversion_rate": round(conversion_rate, 2)
            })

            total_cost += cost
            total_clicks += clicks
            total_impressions += impressions
            total_conversions += conversions
        except Exception as row_err:
            logger.warning("Skipping malformed row due to error: {}; row={}".format(row_err, result))
            continue

    total = {
        "cost": round(total_cost, 2),
        "clicks": total_clicks,
        "impressions": total_impressions,
        "conversions": total_conversions,
        "ctr": round((total_clicks / total_impressions * 100) if total_impressions else 0, 2),
        "cpc": round((total_cost / total_clicks) if total_clicks else 0, 2),
        "conversion_rate": round((total_conversions / total_clicks * 100) if total_clicks else 0, 2)
    }

    return {"account_id": child_account_id, "date_range": date_range_label, "campaigns": campaigns, "total": total}


def summarize_ads_data(ads_data: Dict[str, Any]) -> str:
    """Створює коротке резюме метрик для промпта."""
    if not ads_data or not isinstance(ads_data, dict):
        return ""

    total = ads_data.get("total") or {}
    campaigns = ads_data.get("campaigns") or []
    account_id = ads_data.get("account_id", "Unknown")

    # Топ-5 кампаній за кліками
    top = sorted(campaigns, key=lambda c: (c.get("clicks") or 0), reverse=True)[:5]
    range_label = ads_data.get("date_range") or "Last 30 days"
    
    lines = [
        "GOOGLE ADS DATA (" + range_label + "):",
        "Account ID: " + str(account_id),
        "TOTAL — cost: $" + str(total.get('cost', 0)) + ", clicks: " + str(total.get('clicks', 0)) + ", impressions: " + str(total.get('impressions', 0)) + ", conv: " + str(total.get('conversions', 0)) + ", CTR: " + str(total.get('ctr', 0)) + "%, CPC: $" + str(total.get('cpc', 0)) + ", CR: " + str(total.get('conversion_rate', 0)) + "%",
        "Top campaigns by clicks:"
    ]
    
    for c in top:
        campaign_line = "- " + str(c.get('name', 'Unknown')) + " [" + str(c.get('status', 'UNKNOWN')) + "] — cost $" + str(c.get('cost', 0)) + ", clicks " + str(c.get('clicks', 0)) + ", conv " + str(c.get('conversions', 0)) + ", CTR " + str(c.get('ctr', 0)) + "%, CPC $" + str(c.get('cpc', 0)) + ", CR " + str(c.get('conversion_rate', 0)) + "%"
        lines.append(campaign_line)
    
    return "\n".join(lines)

async def refresh_access_token(refresh_token: str) -> str:
    """Оновлення access token через refresh token"""
    try:
        client_id = os.getenv("GOOGLE_CLIENT_ID")
        client_secret = os.getenv("GOOGLE_CLIENT_SECRET")
        
        # Додаємо логування для діагностики
        logger.info("GOOGLE_CLIENT_ID: {}".format('present' if client_id else 'None'))
        logger.info("GOOGLE_CLIENT_SECRET: {}".format('present' if client_secret else 'None'))
        
        if not client_id or not client_secret:
            logger.error("Google OAuth credentials not configured")
            raise Exception("Google OAuth credentials not configured")
        
        async with httpx.AsyncClient() as client:
            response = await client.post(
                "https://oauth2.googleapis.com/token",
                data={
                    "client_id": client_id,
                    "client_secret": client_secret,
                    "refresh_token": refresh_token,
                    "grant_type": "refresh_token"
                }
            )
            
            if response.status_code == 200:
                token_data = response.json()
                new_access_token = token_data.get("access_token")
                if new_access_token:
                    logger.info("Successfully refreshed access token")
                    return new_access_token
                else:
                    raise Exception("No access_token in refresh response")
            else:
                logger.error("Failed to refresh token: {} - {}".format(response.status_code, response.text))
                raise Exception("Token refresh failed: {}".format(response.status_code))
                
    except Exception as e:
        logger.error("Error refreshing access token: {}".format(e))
        raise e

async def get_valid_access_token(access_token: str, refresh_token: str) -> str:
    """Отримання дійсного access token з автоматичним оновленням"""
    if not refresh_token:
        return access_token
    
    # Створюємо ключ для кешування токенів
    token_key = hashlib.md5(refresh_token.encode()).hexdigest()
    
    # Перевіряємо чи є збережений токен
    if token_key in token_cache:
        cached_token = token_cache[token_key]
        # Токен дійсний 1 годину, перевіряємо чи не прострочився
        if datetime.now().timestamp() - cached_token.get("timestamp", 0) < 3600:
            logger.info("Using cached access token")
            return cached_token["access_token"]
    
    # Якщо токен прострочився або відсутній, оновлюємо
    try:
        new_access_token = await refresh_access_token(refresh_token)
        token_cache[token_key] = {
            "access_token": new_access_token,
            "timestamp": datetime.now().timestamp()
        }
        logger.info("Stored new access token in cache")
        return new_access_token
    except Exception as e:
        logger.error("Failed to refresh token, using original: {}".format(e))
        return access_token

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
            "ads-data-real": "/ads-data-real",
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

        # Отримаємо контекст Google Ads (якщо є)
        access_token = body.get("accessToken")
        refresh_token = body.get("refreshToken")
        customer_id = body.get("customerId")
        date_range = body.get("dateRange")
        ads_data = body.get("adsData")

        ads_summary = ""
        try:
            logger.info("=== CHAT DATA PROCESSING ===")
            logger.info("ads_data present: " + ('yes' if ads_data else 'no'))
            logger.info("ads_data type: " + str(type(ads_data)))
            logger.info("access_token present: " + ('yes' if access_token else 'no'))
            logger.info("customer_id: " + str(customer_id))
            logger.info("date_range: " + str(date_range))
            
            if isinstance(ads_data, dict) and ads_data.get("campaigns"):
                logger.info("Using cached ads_data")
                ads_summary = summarize_ads_data(ads_data)
            elif access_token:
                logger.info("Fetching fresh data from Google Ads API")
                real_ads = await get_real_ads_data_with_date_range(
                    access_token, 
                    refresh_token,
                    customer_id_override=customer_id,
                    date_range=date_range
                )
                ads_summary = summarize_ads_data(real_ads)
            else:
                logger.info("No ads data available")
        except Exception as e:
            logger.warning("Failed to enrich with Google Ads data: " + str(e))
        finally:
            logger.info("Ads summary present: " + ('yes' if ads_summary else 'no'))

        # Створюємо ключ кешу (з урахуванням контексту)
        date_range_str = str(date_range) if date_range else ''
        cache_key = hashlib.md5(f"{question}{image or ''}{ads_summary}{customer_id or ''}{date_range_str}".encode()).hexdigest()
        timestamp = datetime.now().isoformat()

        # Перевіряємо кеш
        if cache_key in response_cache:
            cached_response = response_cache[cache_key]
            if (datetime.now() - datetime.fromisoformat(cached_response["timestamp"])).days < 1:
                logger.info("Cache hit for question: {}...".format(question[:50]))
                return cached_response

        # Формуємо сучасний англійський системний промпт 2025 року
        system_message = {
            "role": "system", 
            "content": "You are a Google Ads expert with cutting-edge knowledge of 2025 PPC strategies and AI-powered advertising tools. Your role is to provide professional, structured recommendations for Google Ads campaign optimization using the latest AI-driven approaches.\n\nRESPONSE STRUCTURE:\n1. **QUICK ANALYSIS** - main problems/opportunities considering current trends\n2. **STEP-BY-STEP PLAN** - specific actions with priorities (High/Medium/Low)\n3. **EXPECTED RESULTS** - metrics and KPIs for 2025\n4. **RECOMMENDATIONS** - detailed advice with numbers and modern tools\n5. **MONITORING** - what to track and how to analyze\n\nMODERN TOOLS 2025:\n🔥 **Performance Max (PMax)** - AI-optimized automated campaigns across all Google channels\n🎯 **Demand Gen** - demand generation through YouTube Shorts, Discover, Gmail\n🧠 **AI-powered bidding** - tCPA, tROAS, Maximize Conversions, Maximize Conversion Value\n👥 **Modern audiences** - Custom Segments, In-Market, Customer Match, Lookalike\n📝 **Adaptive ads** - RSA, RDA with automatic testing\n⚙️ **Automated strategies** - Auto Assets, DSA, Smart Bidding\n🔄 **Cross-channel optimization** - integration of all Google channels\n\nPRINCIPLES 2025:\n- Maximize AI usage: PMax, automated bidding, adaptive ads\n- Leverage 1st-party data: Customer Match, CRM integrations\n- Focus on creatives: video, interactive, UGC\n- GA4 + Enhanced Conversions - must-have\n- Test: A/B headlines, audiences, creatives\n- Automate but control: don't rely 100% on AI\n- Use Audience Signals for PMax\n- Segment campaigns by product type/sales cycle\n\nMETRICS 2025:\n- Conversion Value/Cost (ROAS) - most important for eCommerce\n- Engagement Rate (Demand Gen) - reach + interaction\n- Video View Rate - in video campaigns\n- New Customer Acquisition - new users\n- Ad Strength (RSA, RDA) - quality of adaptive ads\n- Data-driven Attribution (DDA) - attribution across all touchpoints\n\nEXPERTISE:\n- Performance Max campaigns and optimization\n- Demand Gen strategies and creatives\n- AI-powered bidding and automation\n- Modern audiences and segmentation\n- Adaptive ads and optimization\n- Cross-channel strategies\n- GA4 and Enhanced Conversions\n- 1st-party data and Customer Match\n- Google's automated strategies\n- Conversions and attribution 2025\n\nRESPONSE FORMAT:\n- Use markdown formatting for structure\n- Provide specific numbers and percentages\n- Include actionable recommendations\n- Always complete thoughts and give actionable advice\n- Use real Google Ads metrics (CTR, CPC, CR, ROAS)\n- Include expected results with timeframes\n- Use professional English terminology\n- Provide concrete examples and case studies\n- Include industry best practices and benchmarks\n- Focus on data-driven insights and measurable outcomes\n- When user says 'continue', 'carry on', 'more', 'expand' - continue the previous topic with additional details\n- Always assume context from previous conversation\n- Don't ask for clarification unless absolutely necessary\n\nIMPORTANT: When Google Ads data is provided, analyze the specific campaigns and metrics to give personalized recommendations based on the actual performance data."
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
                logger.warning("Failed to process image: {}".format(e))

        # Якщо є контекст Ads — додаємо його також у user_message для надійності
        if ads_summary:
            user_message["content"] = "CONTEXT - GOOGLE ADS DATA:\n" + ads_summary + "\n\nQUESTION:\n" + question

        # Базові повідомлення для LLM
        response = client.chat.completions.create(
            model="gpt-4-turbo",
            messages=[
                system_message,
                *( [{"role": "system", "content": ads_summary}] if ads_summary else [] ),
                user_message,
            ],  # type: ignore
            max_tokens=1200,  # Збільшено для повних відповідей
            temperature=0.3,
            timeout=60  # 60 секунд таймаут
        )

        answer = response.choices[0].message.content

        # Логуємо запит
        logger.info("Chat request processed - tokens used: {}".format(response.usage.total_tokens if response.usage else 'unknown'))

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
        logger.error("Unexpected error in chat endpoint: {}".format(e))
        return JSONResponse(
            status_code=500,
            content={"answer": "❌ **Помилка обробки запиту**\n\nСпробуйте ще раз або зверніться до підтримки.\n\n*Деталі: {}*".format(str(e))}
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

@app.post("/ads-data-real")
async def get_real_ads_data(request: Request):
    """Отримання реальних даних Google Ads через API"""
    try:
        logger.info("🚀 ВХОД В /ads-data-real")
        logger.info("Starting /ads-data-real request")
        
        # Отримуємо дані запиту
        body = await request.json()
        access_token = body.get("accessToken")
        refresh_token = body.get("refreshToken")
        customer_id_override = body.get("customerId")
        date_range = body.get("dateRange", None)  # { preset: 'last_30_days' } or { from: 'YYYY-MM-DD', to: 'YYYY-MM-DD' }
        
        logger.info("🚀 ВХОД В /ads-data-real С dateRange: {}".format(date_range))
        
        # ДЕТАЛЬНЕ ЛОГУВАННЯ
        logger.info("=== ДЕТАЛЬНЕ ЛОГУВАННЯ ===")
        logger.info("Full request body: {}".format(body))
        logger.info("Body keys: {}".format(list(body.keys())))
        logger.info("accessToken present: {}".format('yes' if body.get('accessToken') else 'no'))
        logger.info("refreshToken present: {}".format('yes' if body.get('refreshToken') else 'no'))
        logger.info("refreshToken value: {}".format(refresh_token))
        logger.info("refreshToken type: {}".format(type(refresh_token)))
        logger.info("refreshToken length: {}".format(len(refresh_token) if refresh_token else 'None'))
        logger.info("customerId override: {}".format(customer_id_override if customer_id_override else 'None'))
        logger.info("dateRange: {}".format(date_range if date_range else 'None'))
        
        logger.info("Received access token: {}...".format(access_token[:20] if access_token else 'None'))
        logger.info("Received refresh token: {}".format('present' if refresh_token else 'None'))
        
        if not access_token:
            logger.error("No access token provided")
            return JSONResponse(
                status_code=400,
                content={"error": "Access token required"}
            )
        
        # Отримуємо дійсний access token (з автоматичним оновленням)
        try:
            valid_access_token = await get_valid_access_token(access_token, refresh_token)
            logger.info("Using valid access token: {}...".format(valid_access_token[:20]))
        except Exception as e:
            logger.error("Failed to get valid access token: {}".format(e))
            return JSONResponse(
                status_code=401,
                content={"error": "Failed to validate access token"}
            )

        # Діагностичний запит: отримуємо список доступних акаунтів (ВИКОНУЄТЬСЯ ЗАВЖДИ)
        try:
            logger.info("=== ДІАГНОСТИКА: Отримання списку доступних акаунтів ===")
            async with httpx.AsyncClient() as diagnostic_client:
                accounts_response = await diagnostic_client.get(
                    "https://googleads.googleapis.com/v20/customers:listAccessibleCustomers",
                    headers={
                        "Authorization": f"Bearer {valid_access_token}",
                        "developer-token": os.getenv("GOOGLE_ADS_DEVELOPER_TOKEN", ""),
                        "Content-Type": "application/json",
                    }
                )
                
                logger.info("listAccessibleCustomers response status: {}".format(accounts_response.status_code))
                
                if accounts_response.status_code == 200:
                    accounts_data = accounts_response.json()
                    logger.info("Available accounts: {}".format(accounts_data))
                    
                    # Отримуємо resourceNames (список доступних акаунтів)
                    resource_names = accounts_data.get('resourceNames', [])
                    logger.info("Found {} accessible accounts:".format(len(resource_names)))
                    
                    for resource_name in resource_names:
                        if resource_name.startswith('customers/'):
                            account_id = resource_name.replace('customers/', '')
                            logger.info("  - Account ID: {}".format(account_id))
                else:
                    logger.error("Failed to get accessible customers: {} - {}".format(accounts_response.status_code, accounts_response.text))
                    
        except Exception as e:
            logger.error("Error getting accounts list: {}".format(e))

        # Отримуємо MCC ID (login_customer_id) та конкретний customer_id
        mcc_id = os.getenv("GOOGLE_ADS_CUSTOMER_ID")  # MCC ID
        customer_id = customer_id_override or os.getenv("GOOGLE_ADS_CLIENT_CUSTOMER_ID")  # Клієнтський акаунт
        developer_token = os.getenv("GOOGLE_ADS_DEVELOPER_TOKEN")
        
        logger.info("MCC ID (login_customer_id): {}".format(mcc_id))
        logger.info("Customer ID: {}".format(customer_id))
        logger.info("Developer Token: {}...".format(developer_token[:10] if developer_token else 'None'))
        
        if not mcc_id or not developer_token:
            logger.error("Google Ads credentials not configured")
            return JSONResponse(
                status_code=500,
                content={"error": "Google Ads credentials not configured"}
            )

        # Використовуємо конкретний customer_id замість спроби отримати список
        child_account_id = customer_id.replace('-', '')  # 7024764145
        logger.info("Using specific customer_id: {}".format(child_account_id))

        # Використовуємо уніфікований збирач, який уже правильно обробляє searchStream (списки чанків)
        try:
            logger.info("=== ПЕРЕД ВИКЛИКОМ get_real_ads_data_with_date_range ===")
            logger.info("=== ВИКЛИК get_real_ads_data_with_date_range ===")
            logger.info("Calling with date_range: {}".format(date_range))
            logger.info("Calling with customer_id_override: {}".format(customer_id))
            
            data = await get_real_ads_data_with_date_range(
                access_token,
                refresh_token,
                customer_id_override=customer_id,
                date_range=date_range,
            )
            
            logger.info("=== РЕЗУЛЬТАТ get_real_ads_data_with_date_range ===")
            logger.info("Returned data keys: {}".format(list(data.keys()) if isinstance(data, dict) else 'Not a dict'))
            logger.info("Returned date_range: {}".format(data.get('date_range') if isinstance(data, dict) else 'No date_range'))
            
            return data
        except Exception as e:
            logger.error("Error in get_real_ads_data_with_date_range: {}".format(e))
            return JSONResponse(
                status_code=500,
                content={
                    "error": "Failed to fetch campaign data",
                    "details": str(e)
                }
            )
        
    except Exception as e:
        logger.error("Error in get_real_ads_data: {}".format(e))
        logger.error("Error type: {}".format(type(e)))
        import traceback
        logger.error("Traceback: {}".format(traceback.format_exc()))
        return JSONResponse(
            status_code=500,
            content={
                "error": "Failed to fetch campaign data",
                "details": str(e)
            }
        )

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
        openai_status = "error: {}".format(str(e))

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
    logger.info("Cache cleared - removed {} entries".format(cache_size))
    return {
        "message": "Cache cleared successfully",
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

# Функції експорту
def generate_pdf_html(text: str) -> str:
    """Генерація HTML для PDF"""
    return f"""
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <title>Chat Export</title>
        <style>
            body {{ 
                font-family: Arial, sans-serif; 
                margin: 40px; 
                line-height: 1.6; 
                color: #333;
            }}
            h1 {{ 
                color: #23272f; 
                border-bottom: 2px solid #0ea5e9; 
                padding-bottom: 10px; 
                margin-bottom: 20px;
            }}
            .content {{ 
                white-space: pre-wrap; 
                background: #f8f9fa; 
                padding: 20px; 
                border-radius: 8px; 
                border-left: 4px solid #0ea5e9;
            }}
            .timestamp {{ 
                color: #666; 
                font-size: 14px; 
                margin-bottom: 20px; 
            }}
            .footer {{ 
                margin-top: 30px; 
                text-align: center; 
                color: #666; 
                font-size: 12px; 
                border-top: 1px solid #eee; 
                padding-top: 20px; 
            }}
        </style>
    </head>
    <body>
        <h1>Chat Export</h1>
        <div class="timestamp">Generated on: {datetime.now().strftime("%Y-%m-%d %H:%M:%S")}</div>
        <div class="content">{text.replace(chr(10), '<br>')}</div>
        <div class="footer">
            Generated by PPCSet AI Assistant<br>
            https://www.ppcset.com
        </div>
    </body>
    </html>
    """

def generate_pdf_with_reportlab(text: str) -> bytes:
    """Найпростіший PDF"""
    try:
        from reportlab.lib.pagesizes import A4
        from reportlab.platypus import SimpleDocTemplate, Paragraph
        from reportlab.lib.styles import getSampleStyleSheet
        from io import BytesIO

        buffer = BytesIO()
        doc = SimpleDocTemplate(buffer, pagesize=A4)
        story = []
        styles = getSampleStyleSheet()
        
        # Тільки текст
        story.append(Paragraph(text, styles['Normal']))
        
        doc.build(story)
        pdf_bytes = buffer.getvalue()
        buffer.close()
        return pdf_bytes
    except Exception as e:
        logger.error("PDF generation error: {}".format(str(e)))
        return "PDF generation failed: {}".format(str(e)).encode('utf-8')

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
        logger.error("TXT export error: {}".format(e))
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
        logger.error("CSV export error: {}".format(e))
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
        logger.error("XLSX export error: {}".format(e))
        return JSONResponse({"error": str(e)}, status_code=500)

@app.post("/export-json")
async def export_json(request: Request):
    """Експорт в JSON формат"""
    try:
        body = await request.json()
        text = body.get("text", "")
        
        if not text:
            return JSONResponse({"error": "Text is required"}, status_code=400)
        
        # Створюємо JSON структуру
        export_data = {
            "export_info": {
                "timestamp": datetime.now().isoformat(),
                "source": "PPCSet AI Assistant",
                "version": "1.0"
            },
            "content": text,
            "metadata": {
                "text_length": len(text),
                "lines_count": len(text.split('\n')),
                "export_format": "json"
            }
        }
        
        # Конвертуємо в JSON з правильним кодуванням
        json_data = json.dumps(export_data, ensure_ascii=False, indent=2)
        
        # Створюємо буфер
        buffer = io.BytesIO()
        buffer.write(json_data.encode('utf-8'))
        buffer.seek(0)
        
        # Генеруємо ім'я файлу
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        filename = f"chat_export_{timestamp}.json"
        
        return StreamingResponse(
            buffer,
            media_type="application/json; charset=utf-8",
            headers={"Content-Disposition": f"attachment; filename={filename}"}
        )
    except Exception as e:
        logger.error("JSON export error: {}".format(e))
        return JSONResponse({"error": str(e)}, status_code=500)

@app.post("/export-pdf")
async def export_pdf(request: Request):
    """Експорт в PDF формат"""
    try:
        body = await request.json()
        text = body.get("text", "")
        
        if not text:
            return JSONResponse({"error": "Text is required"}, status_code=400)
        
        # Генерація PDF за допомогою ReportLab
        pdf_bytes = generate_pdf_with_reportlab(text)
        
        # Створюємо буфер
        buffer = io.BytesIO(pdf_bytes)
        buffer.seek(0)
        
        # Генеруємо ім'я файлу
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        filename = f"chat_export_{timestamp}.pdf"
        
        return StreamingResponse(
            buffer,
            media_type="application/pdf",
            headers={"Content-Disposition": f"attachment; filename={filename}"}
        )
    except Exception as e:
        logger.error("PDF export error: {}".format(e))
        return JSONResponse({"error": str(e)}, status_code=500)

@app.post("/debug-call")
async def debug_call(request: Request):
    data = await request.json()
    print("=== DEBUG CALL ===")
    print("Data:", data)
    try:
        result = await get_real_ads_data_with_date_range(
            access_token=data.get("accessToken"), 
            refresh_token=data.get("refreshToken"),
            customer_id_override=data.get("customerId"), 
            date_range=data.get("dateRange") if data else None
        )
        return {"ok": True, "result_preview": str(result)[:200]}
    except Exception as e:
        return {"ok": False, "error": str(e)}

if __name__ == "__main__":
    try:
        import uvicorn
        uvicorn.run(app, host="0.0.0.0", port=8000)  # Порт 8000
    except ImportError:
        print("Uvicorn not installed. Install with: pip install uvicorn")
        print("Or run with: python -m uvicorn main:app --host 0.0.0.0 --port 8000")