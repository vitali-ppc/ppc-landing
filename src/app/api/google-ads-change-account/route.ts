import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    console.log('=== GOOGLE ADS CHANGE ACCOUNT API ===');
    const { accountId } = await request.json();
    
    console.log('Changing to account ID:', accountId);

    if (!accountId) {
      return NextResponse.json({ 
        error: 'Account ID is required' 
      }, { status: 400 });
    }

    // Зберігаємо вибраний аккаунт в localStorage (через response headers)
    const response = NextResponse.json({ 
      success: true,
      message: 'Account changed successfully'
    });

    // Встановлюємо cookie з ID аккаунта
    response.cookies.set('currentGoogleAdsAccountId', accountId, {
      httpOnly: false, // Потрібен доступ з JavaScript
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 30 * 24 * 60 * 60 // 30 днів
    });

    console.log('Account changed successfully to:', accountId);

    return response;

  } catch (error) {
    console.error('Error in /api/google-ads-change-account:', error);
    return NextResponse.json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}
