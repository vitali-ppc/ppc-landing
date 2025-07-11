import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { text, title = 'Chat Export', metadata = {} } = await request.json();
    
    if (!text) {
      return NextResponse.json({ error: 'Text is required' }, { status: 400 });
    }

    // Створюємо структурований JSON об'єкт
    const exportData = {
      metadata: {
        title: title,
        generatedAt: new Date().toISOString(),
        source: 'PPCSet AI Assistant',
        version: '1.0',
        ...metadata
      },
      content: {
        text: text,
        length: text.length,
        wordCount: text.split(/\s+/).length,
        characterCount: text.length
      },
      export: {
        format: 'JSON',
        timestamp: new Date().toISOString()
      }
    };

    // Create filename with timestamp
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `chat-export-${timestamp}.json`;

    // Set headers for file download
    const headers = new Headers();
    headers.set('Content-Type', 'application/json; charset=utf-8');
    headers.set('Content-Disposition', `attachment; filename="${filename}"`);

    return new NextResponse(JSON.stringify(exportData, null, 2), {
      status: 200,
      headers
    });

  } catch (error) {
    console.error('Export JSON error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 