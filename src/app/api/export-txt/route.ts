import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { text } = await request.json();
    
    if (!text) {
      return NextResponse.json({ error: 'Text is required' }, { status: 400 });
    }

    // Create filename with timestamp
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `chat-export-${timestamp}.txt`;

    // Set headers for file download
    const headers = new Headers();
    headers.set('Content-Type', 'text/plain; charset=utf-8');
    headers.set('Content-Disposition', `attachment; filename="${filename}"`);

    return new NextResponse(text, {
      status: 200,
      headers
    });

  } catch (error) {
    console.error('Export TXT error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 