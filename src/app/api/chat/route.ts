import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json();

  // Адреса вашого Python AI-сервера
  const aiServerUrl = 'http://127.0.0.1:8000/chat';

  const aiRes = await fetch(aiServerUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  const aiData = await aiRes.json();

  return NextResponse.json(aiData);
} 