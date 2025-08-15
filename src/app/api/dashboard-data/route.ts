import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    console.log('=== DASHBOARD DATA API LOGGING ===');
    const { accessToken, refreshToken, customerId, dateRange } = await request.json();
    
    console.log('Received accessToken:', accessToken ? accessToken.substring(0, 20) + '...' : 'null');
    console.log('Received refreshToken:', refreshToken ? 'present' : 'null');
    console.log('Received customerId:', customerId);
    console.log('Received dateRange:', dateRange);

    if (!accessToken) {
      return NextResponse.json({ error: 'Access token required' }, { status: 400 });
    }

    const aiServerUrl = process.env.BACKEND_URL || 'http://91.99.225.211:8000';
    console.log('Proxying dashboard data request to AI server:', aiServerUrl);

    const aiResponse = await fetch(`${aiServerUrl}/dashboard-data`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ accessToken, refreshToken, customerId, dateRange }),
    });

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      console.error('Error from AI server:', aiResponse.status, errorText);
      return NextResponse.json({ 
        error: 'Failed to fetch dashboard data from AI server', 
        details: errorText 
      }, { status: aiResponse.status });
    }

    const data = await aiResponse.json();
    console.log('Successfully received dashboard data from AI server');
    return NextResponse.json(data);

  } catch (error) {
    console.error('Error in /api/dashboard-data proxy:', error);
    return NextResponse.json({ 
      error: 'Internal server error during proxying dashboard data request', 
      details: error instanceof Error ? error.message : String(error) 
    }, { status: 500 });
  }
}
