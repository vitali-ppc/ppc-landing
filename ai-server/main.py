import os
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import openai

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

client = openai.OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

@app.post("/chat")
async def chat(request: Request):
    data = await request.json()
    question = data.get("question", "")
    try:
        response = client.chat.completions.create(
            model="gpt-4-turbo",
            messages=[
                {"role": "system", "content": "Ти професійний AI-асистент для Google Ads аналітики. Відповідай стисло, структуровано, з прикладами у markdown."},
                {"role": "user", "content": question}
            ],
            max_tokens=600,
            temperature=0.3,
        )
        answer = response.choices[0].message.content
        return {"answer": answer}
    except Exception as e:
        return {"answer": f"Помилка AI: {str(e)}"}

@app.get("/ads-data")
def get_ads_data():
    # Mock-дані Google Ads для тестування
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