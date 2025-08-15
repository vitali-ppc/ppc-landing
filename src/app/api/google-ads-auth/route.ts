import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    console.log('=== GOOGLE ADS AUTH API ===');
    
    // Отримуємо URL для OAuth2 авторизації з Python сервера
    const aiServerUrl = process.env.BACKEND_URL || 'http://91.99.225.211:8000';
    
    try {
      const response = await fetch(`${aiServerUrl}/auth-url`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Auth URL generated successfully');
        
        return NextResponse.json({
          authUrl: data.authUrl
        });
      } else {
        console.error('Failed to generate auth URL');
        return NextResponse.json({ 
          error: 'Failed to generate authorization URL' 
        }, { status: 500 });
      }
    } catch (error) {
      console.error('Error generating auth URL:', error);
      return NextResponse.json({ 
        error: 'Internal server error',
        details: error instanceof Error ? error.message : String(error)
      }, { status: 500 });
    }

  } catch (error) {
    console.error('Error in /api/google-ads-auth:', error);
    return NextResponse.json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}
