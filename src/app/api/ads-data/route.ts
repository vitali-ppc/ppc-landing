import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const res = await fetch(process.env.ADS_DATA_URL || 'http://91.99.225.211:8000/ads-data');
    if (!res.ok) {
      return NextResponse.json({ error: 'Помилка отримання даних з AI-сервера' }, { status: 500 });
    }
    const data = await res.json();
    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json({ error: 'AI-сервер недоступний' }, { status: 500 });
  }
} 