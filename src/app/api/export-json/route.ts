import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Добавляем логирование для отладки
    console.log('Export JSON request body:', body);
    
    // Преобразуем rows в text для совместимости с бэкендом
    const requestBody = {
      text: body.rows || body.text || ''
    };
    
    const response = await fetch('http://91.99.225.211:8000/export-json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI server response:', response.status, errorText);
      throw new Error(`HTTP error! status: ${response.status}: ${errorText}`);
    }

    const data = await response.blob();
    
    return new NextResponse(data, {
      headers: {
        'Content-Type': 'application/json',
        'Content-Disposition': response.headers.get('Content-Disposition') || 'attachment; filename=chat_export.json'
      }
    });
  } catch (error) {
    console.error('Export JSON error:', error);
    return NextResponse.json({
      error: 'Export failed'
    }, {
      status: 500
    });
  }
} 