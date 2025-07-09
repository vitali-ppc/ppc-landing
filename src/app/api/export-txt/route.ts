import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { text } = await req.json();
  return new NextResponse(text, {
    headers: {
      'Content-Type': 'text/plain',
      'Content-Disposition': 'attachment; filename="report.txt"',
    },
  });
} 