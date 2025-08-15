import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    console.log('=== GOOGLE ADS STATUS API ===');
    const { accessToken, refreshToken } = await request.json();
    
    console.log('Checking Google Ads status...');
    console.log('Access token present:', !!accessToken);
    console.log('Refresh token present:', !!refreshToken);

    if (!accessToken || !refreshToken) {
      return NextResponse.json({
        connected: false,
        accounts: [],
        currentAccount: null
      });
    }

    // Перевіряємо валідність токенів через Python сервер
    const aiServerUrl = process.env.BACKEND_URL || 'http://91.99.225.211:8000';
    
    try {
      // Спроба отримати список аккаунтів для перевірки валідності токенів
      const response = await fetch(`${aiServerUrl}/accounts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ accessToken, refreshToken }),
      });

      if (response.ok) {
        const data = await response.json();
        
        // Трансформуємо дані аккаунтів
        const accounts = data.accounts?.map((account: any, index: number) => ({
          id: account.customerId || `account-${index}`,
          name: account.descriptiveName || account.name || `Account ${index + 1}`,
          customerId: account.customerId || `CID-${index + 1}`
        })) || [];

        // Визначаємо поточний аккаунт (перший в списку або з localStorage)
        const currentAccountId = localStorage.getItem('currentGoogleAdsAccountId');
        const currentAccount = currentAccountId 
          ? accounts.find(acc => acc.id === currentAccountId) || accounts[0]
          : accounts[0];

        console.log('Google Ads connected successfully');
        console.log('Accounts found:', accounts.length);
        console.log('Current account:', currentAccount?.name);

        return NextResponse.json({
          connected: true,
          accounts,
          currentAccount
        });
      } else {
        console.log('Google Ads tokens invalid');
        return NextResponse.json({
          connected: false,
          accounts: [],
          currentAccount: null
        });
      }
    } catch (error) {
      console.error('Error checking Google Ads status:', error);
      return NextResponse.json({
        connected: false,
        accounts: [],
        currentAccount: null
      });
    }

  } catch (error) {
    console.error('Error in /api/google-ads-status:', error);
    return NextResponse.json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}
