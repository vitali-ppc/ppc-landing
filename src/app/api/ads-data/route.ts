import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const res = await fetch('http://127.0.0.1:8000/ads-data');
    if (!res.ok) {
      return NextResponse.json({ error: 'Помилка отримання даних з AI-сервера' }, { status: 500 });
    }
    const data = await res.json();
    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json({ error: 'AI-сервер недоступний' }, { status: 500 });
  }
} 