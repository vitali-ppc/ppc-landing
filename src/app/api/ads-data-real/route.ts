import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { accessToken } = await request.json();

    if (!accessToken) {
      return NextResponse.json({ error: 'Access token required' }, { status: 400 });
    }

    // Отримуємо список акаунтів Google Ads
    const accountsResponse = await fetch(
      'https://googleads.googleapis.com/v14/customers',
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'developer-token': process.env.GOOGLE_ADS_DEVELOPER_TOKEN || '',
        },
      }
    );

    if (!accountsResponse.ok) {
      console.error('Failed to fetch accounts:', await accountsResponse.text());
      return NextResponse.json({ error: 'Failed to fetch Google Ads accounts' }, { status: 500 });
    }

    const accountsData = await accountsResponse.json();
    
    if (!accountsData.results || accountsData.results.length === 0) {
      return NextResponse.json({ error: 'No Google Ads accounts found' }, { status: 404 });
    }

    // Використовуємо перший акаунт
    const customerId = accountsData.results[0].customer.id;

    // Отримуємо дані кампаній
    const campaignsResponse = await fetch(
      `https://googleads.googleapis.com/v14/customers/${customerId}/googleAds:searchStream`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'developer-token': process.env.GOOGLE_ADS_DEVELOPER_TOKEN || '',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `
            SELECT 
              campaign.id,
              campaign.name,
              campaign.status,
              metrics.impressions,
              metrics.clicks,
              metrics.cost_micros,
              metrics.conversions,
              metrics.average_cpc
            FROM campaign 
            WHERE segments.date DURING LAST_30_DAYS
          `
        }),
      }
    );

    if (!campaignsResponse.ok) {
      console.error('Failed to fetch campaigns:', await campaignsResponse.text());
      return NextResponse.json({ error: 'Failed to fetch campaign data' }, { status: 500 });
    }

    const campaignsData = await campaignsResponse.json();
    
    // Форматуємо дані для фронтенду
    const campaigns = campaignsData.results?.map((result: any) => ({
      id: result.campaign.id,
      name: result.campaign.name,
      status: result.campaign.status,
      impressions: parseInt(result.metrics.impressions) || 0,
      clicks: parseInt(result.metrics.clicks) || 0,
      cost: (parseInt(result.metrics.cost_micros) / 1000000) || 0,
      conversions: parseFloat(result.metrics.conversions) || 0,
      cpc: (parseInt(result.metrics.average_cpc) / 1000000) || 0,
      ctr: result.metrics.impressions > 0 ? (result.metrics.clicks / result.metrics.impressions * 100) : 0,
      conversion_rate: result.metrics.clicks > 0 ? (result.metrics.conversions / result.metrics.clicks * 100) : 0,
    })) || [];

    // Розраховуємо загальні показники
    const total = campaigns.reduce((acc: any, campaign: any) => ({
      impressions: acc.impressions + campaign.impressions,
      clicks: acc.clicks + campaign.clicks,
      cost: acc.cost + campaign.cost,
      conversions: acc.conversions + campaign.conversions,
    }), { impressions: 0, clicks: 0, cost: 0, conversions: 0 });

    total.ctr = total.impressions > 0 ? (total.clicks / total.impressions * 100) : 0;
    total.cpc = total.clicks > 0 ? (total.cost / total.clicks) : 0;
    total.conversion_rate = total.clicks > 0 ? (total.conversions / total.clicks * 100) : 0;

    return NextResponse.json({
      date_range: 'Last 30 days',
      total,
      campaigns,
      source: 'real_google_ads'
    });

  } catch (error) {
    console.error('Error fetching real Google Ads data:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 