import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // Получаем accessToken из тела запроса
    const { accessToken } = await request.json();

    if (!accessToken) {
      return NextResponse.json({ error: 'Access token required' }, { status: 400 });
    }

    // Получаем customer_id из переменных окружения
    const customerId = process.env.GOOGLE_ADS_CUSTOMER_ID;
    if (!customerId) {
      return NextResponse.json({ error: 'Google Ads customer ID not configured' }, { status: 500 });
    }

    let campaignsResponse;
    try {
      // Запрос к Google Ads API для получения данных по кампаниям
      campaignsResponse = await fetch(
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
    } catch (fetchError) {
      // Логируем ошибку запроса к Google Ads API
      console.error('Fetch error:', fetchError);
      return NextResponse.json({ error: 'Fetch error', details: String(fetchError) }, { status: 500 });
    }

    if (!campaignsResponse.ok) {
      // Логируем ошибку ответа от Google Ads API
      const errorText = await campaignsResponse.text();
      console.error('Failed to fetch campaigns:', errorText);
      return NextResponse.json({ error: 'Failed to fetch campaign data', details: errorText }, { status: 500 });
    }

    let campaignsData;
    try {
      campaignsData = await campaignsResponse.json();
    } catch (jsonError) {
      // Логируем ошибку парсинга JSON
      console.error('JSON parse error:', jsonError);
      return NextResponse.json({ error: 'JSON parse error', details: String(jsonError) }, { status: 500 });
    }
    
    // Формируем массив кампаний для фронтенда
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

    // Считаем общие показатели по всем кампаниям
    const total = campaigns.reduce((acc: any, campaign: any) => ({
      impressions: acc.impressions + campaign.impressions,
      clicks: acc.clicks + campaign.clicks,
      cost: acc.cost + campaign.cost,
      conversions: acc.conversions + campaign.conversions,
    }), { impressions: 0, clicks: 0, cost: 0, conversions: 0 });

    total.ctr = total.impressions > 0 ? (total.clicks / total.impressions * 100) : 0;
    total.cpc = total.clicks > 0 ? (total.cost / total.clicks) : 0;
    total.conversion_rate = total.clicks > 0 ? (total.conversions / total.clicks * 100) : 0;

    // Возвращаем результат
    return NextResponse.json({
      date_range: 'Last 30 days',
      total,
      campaigns,
      source: 'real_google_ads'
    });

  } catch (error) {
    // Логируем критическую ошибку
    console.error('Error fetching real Google Ads data:', error);
    return NextResponse.json({ error: 'Internal server error', details: String(error) }, { status: 500 });
  }
} 