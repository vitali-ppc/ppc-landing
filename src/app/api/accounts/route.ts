import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // Получаем accessToken и refreshToken из тела запроса
    const { accessToken, refreshToken } = await request.json();

    console.log('=== ACCOUNTS API LOGGING ===');
    console.log('Received accessToken:', accessToken ? accessToken.substring(0, 20) + '...' : 'null');
    console.log('Received refreshToken:', refreshToken ? 'present' : 'null');

    if (!accessToken) {
      return NextResponse.json({ error: 'Access token required' }, { status: 400 });
    }

    // URL AI сервера
    const aiServerUrl = process.env.BACKEND_URL || 'http://91.99.225.211:8000';

    console.log('Proxying accounts request to AI server:', aiServerUrl);

    // Проксируем запрос к AI серверу для получения аккаунтов
    const aiResponse = await fetch(`${aiServerUrl}/accounts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        accessToken,
        refreshToken
      }),
    });

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      console.error('Error from AI server:', aiResponse.status, errorText);
      return NextResponse.json({ 
        error: 'Failed to fetch accounts from AI server', 
        details: errorText 
      }, { status: aiResponse.status });
    }

    const data = await aiResponse.json();
    console.log('Successfully received accounts from AI server');
    return NextResponse.json(data);

  } catch (error) {
    console.error('Error in /api/accounts proxy:', error);
    return NextResponse.json({ 
      error: 'Internal server error during proxying accounts request', 
      details: error instanceof Error ? error.message : String(error) 
    }, { status: 500 });
  }
}
