import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // Получаем accessToken и refreshToken из тела запроса
    const { accessToken, refreshToken } = await request.json();

    // ДЕТАЛЬНЕ ЛОГУВАННЯ
    console.log('=== ПРОКСІ ЛОГУВАННЯ ===');
    console.log('Received accessToken:', accessToken ? accessToken.substring(0, 20) + '...' : 'null');
    console.log('Received refreshToken:', refreshToken ? 'present' : 'null');
    console.log('refreshToken type:', typeof refreshToken);
    console.log('refreshToken length:', refreshToken ? refreshToken.length : 'null');

    if (!accessToken) {
      return NextResponse.json({ error: 'Access token required' }, { status: 400 });
    }

    // URL AI сервера
    const aiServerUrl = process.env.BACKEND_URL || 'http://91.99.225.211:8000';

    console.log('Proxying request to AI server:', aiServerUrl);
    console.log('Sending accessToken and refreshToken to AI server');
    console.log('Sending body:', JSON.stringify({ 
      accessToken: accessToken ? accessToken.substring(0, 20) + '...' : 'null',
      refreshToken: refreshToken ? 'present' : 'null'
    }));

    // Проксируем запрос к AI серверу с refresh token
    const aiResponse = await fetch(`${aiServerUrl}/ads-data-real`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        accessToken,
        refreshToken // Добавляем refresh token
      }),
    });

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      console.error('Error from AI server:', aiResponse.status, errorText);
      return NextResponse.json({ 
        error: 'Failed to fetch campaign data from AI server', 
        details: errorText 
      }, { status: aiResponse.status });
    }

    const data = await aiResponse.json();
    console.log('Successfully received data from AI server');
    return NextResponse.json(data);

  } catch (error) {
    console.error('Error in /api/ads-data-real proxy:', error);
    return NextResponse.json({ 
      error: 'Internal server error during proxying ads-data-real request', 
      details: error instanceof Error ? error.message : String(error) 
    }, { status: 500 });
  }
} 