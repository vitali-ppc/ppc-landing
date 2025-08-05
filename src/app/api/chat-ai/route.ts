import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { messages } = body;

    if (!messages || messages.length === 0) {
      return NextResponse.json(
        { error: 'Messages are required' },
        { status: 400 }
      );
    }

    // Беремо останнє повідомлення користувача
    const lastUserMessage = messages[messages.length - 1];
    const question = lastUserMessage.content;

    // Адреса нашого Python AI-сервера
    const aiServerUrl = process.env.AI_SERVER_URL || 'http://91.99.225.211:8000/chat';

    const requestBody = {
      question: question,
      timestamp: new Date().toISOString()
    };

    const aiRes = await fetch(aiServerUrl, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'User-Agent': 'Kampaio-AI-Client/1.0'
      },
      body: JSON.stringify(requestBody),
      signal: AbortSignal.timeout(120000)
    });

    if (!aiRes.ok) {
      throw new Error(`AI server responded with status: ${aiRes.status}`);
    }

    const aiData = await aiRes.json();
    
    if (!aiData.answer) {
      throw new Error('Invalid response format from AI server');
    }

    // Повертаємо відповідь у форматі, який очікує Vercel AI SDK
    return NextResponse.json({
      id: Date.now().toString(),
      role: 'assistant',
      content: aiData.answer
    });

  } catch (error: any) {
    console.error('Error in chat-ai route:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
} 