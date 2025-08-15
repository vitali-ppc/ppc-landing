import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    console.log('=== GOOGLE ADS DISCONNECT API ===');
    
    // Очищаємо всі cookies пов'язані з Google Ads
    const response = NextResponse.json({ 
      success: true,
      message: 'Google Ads disconnected successfully'
    });

    // Видаляємо cookies
    response.cookies.delete('googleAccessToken');
    response.cookies.delete('googleRefreshToken');
    response.cookies.delete('currentGoogleAdsAccountId');
    response.cookies.delete('oauth_state');

    console.log('Google Ads disconnected successfully');

    return response;

  } catch (error) {
    console.error('Error in /api/google-ads-disconnect:', error);
    return NextResponse.json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}
