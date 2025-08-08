import { NextRequest, NextResponse } from 'next/server';

// Простий кеш для Next.js
const cache = new Map<string, { data: any; timestamp: number }>();
const CACHE_TTL = 24 * 60 * 60 * 1000; // 24 години

export async function POST(req: NextRequest) {
  try {
    console.log("=== NEXT.JS API: Отримано запит ===");
    const body = await req.json();
    console.log("=== NEXT.JS API: Request body ===");
    console.log(JSON.stringify(body, null, 2));
    
    const { question, image, adsData, accessToken, refreshToken } = body;
    
    console.log("=== NEXT.JS API: Розпарсені дані ===");
    console.log("adsData present:", !!adsData);
    console.log("accessToken present:", !!accessToken);
    console.log("refreshToken present:", !!refreshToken);

    if (!question) {
      return NextResponse.json(
        { error: 'Question is required' },
        { status: 400 }
      );
    }

    // Перевіряємо кеш
    const cacheKey = `${question}${image || ''}${JSON.stringify(adsData) || ''}`;
    const cached = cache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
      return NextResponse.json(cached.data);
    }

    // Адреса Python AI-сервера (можна налаштувати через env)
    const aiServerUrl = process.env.AI_SERVER_URL || 'http://91.99.225.211:8000/chat';

    // Формуємо запит до AI-сервера з інструкцією про мову
    const requestBody = {
      question: `${question}\n\nIMPORTANT: Respond in the same language as the user's question. If the user writes in Russian, respond in Russian. If the user writes in English, respond in English.`,
      image: image || null, // Додаємо підтримку зображень
      adsData: adsData || null, // Додаємо adsData
      accessToken: accessToken || null, // Додаємо accessToken
      refreshToken: refreshToken || null, // Додаємо refreshToken
      timestamp: new Date().toISOString()
    };

    const aiRes = await fetch(aiServerUrl, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'User-Agent': 'Kampaio-AI-Client/1.0'
      },
      body: JSON.stringify(requestBody),
      // Timeout 30 секунд
      signal: AbortSignal.timeout(120000) // 2 хвилини замість 30 секунд
    });

    if (!aiRes.ok) {
      throw new Error(`AI server responded with status: ${aiRes.status}`);
    }

    const aiData = await aiRes.json();
    
    // Перевіряємо структуру відповіді
    if (!aiData.answer) {
      throw new Error('Invalid response format from AI server');
    }

    // Зберігаємо в кеш
    cache.set(cacheKey, { data: aiData, timestamp: Date.now() });

    return NextResponse.json(aiData);

  } catch (error: any) {
    console.error('Chat API error:', error);

    // Fallback відповідь якщо AI-сервер недоступний
    if (error.name === 'AbortError' || error.message.includes('fetch')) {
      return NextResponse.json({
        answer: `🔧 **AI-сервер тимчасово недоступний**

Наразі я не можу обробити ваш запит через технічні причини. Спробуйте:

1. **Перевірити підключення** до інтернету
2. **Повторити запит** через кілька хвилин
3. **Звернутися до підтримки** якщо проблема повторюється

*Помилка: ${error.message}*`
      });
    }

    return NextResponse.json({
      answer: `❌ **Помилка обробки запиту**

Виникла неочікувана помилка при обробці вашого запиту. Спробуйте:

1. **Переформулювати питання**
2. **Перевірити підключення**
3. **Повторити спробу**

*Деталі: ${error.message}*`
    }, { status: 500 });
  }
} 