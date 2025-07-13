import { ExportFormat, GoogleAdsData } from './types';
import { EXPORT_ENDPOINTS } from './types';

// Универсальная функция экспорта
export const exportData = async (format: ExportFormat, data: any, filename?: string): Promise<boolean> => {
  try {
    const endpoint = EXPORT_ENDPOINTS[format];
    const body = format === 'txt' || format === 'pdf' 
      ? { text: data } 
      : { rows: data };

    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename || `chat-export-${new Date().toISOString().replace(/[:.]/g, '-')}.${format}`;
    a.style.display = 'none';
    
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
    
    return true;
  } catch (error) {
    console.error(`Export ${format.toUpperCase()} error:`, error);
    alert(`Помилка при експорті ${format.toUpperCase()} файлу: ${error instanceof Error ? error.message : String(error)}`);
    return false;
  }
};

// Утилиты для работы с Google Ads данными
export const formatGoogleAdsData = (data: GoogleAdsData, isRealData: boolean): string => {
  const total = data.total;
  const campaigns = data.campaigns.map((c) => {
    let campaignInfo = `- ${c.name} (${c.status}): витрати $${c.cost}, кліки ${c.clicks}, покази ${c.impressions}, конверсії ${c.conversions}, CTR ${c.ctr}%, CPC $${c.cpc}, CR ${c.conversion_rate}%`;
    
    if (c.revenue) campaignInfo += `, дохід $${c.revenue}`;
    if (c.roas) campaignInfo += `, ROAS ${c.roas}`;
    if (c.roi) campaignInfo += `, ROI ${c.roi}%`;
    
    return campaignInfo;
  }).join('\n');

  const dataSource = isRealData ? 'реальними даними з вашого Google Ads акаунту' : 'тестовими даними';
  let summary = `У моєму акаунті Google Ads за ${data.date_range} (${dataSource}):
Всього витрати: $${total.cost}, кліки: ${total.clicks}, покази: ${total.impressions}, конверсії: ${total.conversions}, CTR: ${total.ctr}%, CPC: $${total.cpc}, CR: ${total.conversion_rate}%`;

  if (total.revenue) summary += `, загальний дохід: $${total.revenue}`;
  if (total.roas) summary += `, загальний ROAS: ${total.roas}`;
  if (total.roi) summary += `, загальний ROI: ${total.roi}%`;

  summary += `\nКампанії:\n${campaigns}`;

  if (data.demographics && data.demographics.length > 0) {
    summary += `\n\nДемографічні дані:\n${data.demographics.map((d) => 
      `- ${d.age_group} (${d.gender}): кліки ${d.clicks}, витрати $${d.cost}, конверсії ${d.conversions}`
    ).join('\n')}`;
  }

  return summary;
}; 