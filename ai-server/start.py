#!/usr/bin/env python3
"""
Скрипт для запуску PPCSet AI Server
"""

import os
import sys
import uvicorn
from dotenv import load_dotenv

def main():
    # Завантажуємо змінні середовища
    load_dotenv()
    
    # Перевіряємо наявність OpenAI API ключа
    if not os.getenv("OPENAI_API_KEY"):
        print("❌ Помилка: OPENAI_API_KEY не знайдено в змінних середовища")
        print("Створіть файл .env з OPENAI_API_KEY=ваш_ключ")
        sys.exit(1)
    
    # Налаштування сервера
    host = os.getenv("AI_SERVER_HOST", "0.0.0.0")
    port = int(os.getenv("AI_SERVER_PORT", "8000"))
    reload = os.getenv("AI_SERVER_RELOAD", "true").lower() == "true"
    
    print(f"🚀 Запуск PPCSet AI Server...")
    print(f"📍 Адреса: http://{host}:{port}")
    print(f"🔄 Автоперезавантаження: {'Увімкнено' if reload else 'Вимкнено'}")
    print(f"🔑 OpenAI API: {'✅ Налаштовано' if os.getenv('OPENAI_API_KEY') else '❌ Відсутній'}")
    print("-" * 50)
    
    try:
        uvicorn.run(
            "main:app",
            host=host,
            port=port,
            reload=reload,
            log_level="info"
        )
    except KeyboardInterrupt:
        print("\n👋 Сервер зупинено")
    except Exception as e:
        print(f"❌ Помилка запуску: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main() 