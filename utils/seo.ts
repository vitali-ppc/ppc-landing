// utils/seo.ts

// Премиум заголовки для ключевых ниш
export const premiumTitles: Record<string, string> = {
  dentist: 'AI-Powered Local Google Ads for Dentists',
  lawyer: 'AI-Powered Local Google Ads for Lawyers & Law Firms',
  'real-estate': 'AI-Powered Local Google Ads for Real Estate Agents',
  'car-dealer': 'AI-Powered Local Google Ads for Car Dealerships',
  'plumber': 'AI-Powered Local Google Ads for Plumbing Services',
  'electrician': 'AI-Powered Local Google Ads for Electrical Services',
  'roofer': 'AI-Powered Local Google Ads for Roofing Companies',
  'contractor': 'AI-Powered Local Google Ads for General Contractors',
  'restaurant': 'AI-Powered Local Google Ads for Restaurants',
  'gym': 'AI-Powered Local Google Ads for Gyms & Fitness Centers',
  'salon': 'AI-Powered Local Google Ads for Hair Salons & Spas',
  'chiropractor': 'AI-Powered Local Google Ads for Chiropractors',
};

// Словарь синонимов для ниш
export const nicheSynonyms: Record<string, string> = {
  'attorney': 'lawyer',
  'law-firm': 'lawyer',
  'real-estate-agent': 'real-estate',
  'realtor': 'real-estate',
  'car-dealership': 'car-dealer',
  'auto-dealer': 'car-dealer',
  'plumbing': 'plumber',
  'electrical': 'electrician',
  'roofing': 'roofer',
  'general-contractor': 'contractor',
  'construction': 'contractor',
  'fitness': 'gym',
  'fitness-center': 'gym',
  'hair-salon': 'salon',
  'spa': 'salon',
  'beauty-salon': 'salon',
  'chiropractic': 'chiropractor',
  'dental': 'dentist',
  'dental-clinic': 'dentist',
  'dental-practice': 'dentist',
};

// Кастомные SEO description для ключевых ниш
export const customDescriptions: Record<string, string> = {
  dentist: 'Discover how AI-powered Google Ads help dentists attract more local customers and grow revenue. Get expert PPC strategies and local optimization tips tailored for dental services.',
  // В будущем можно добавить lawyer, real-estate и т.д.
};

// Кастомные подзаголовки для ключевых ниш
export const customSubheadings: Record<string, string> = {
  dentist: 'Unlock targeted, data-driven Google Ads campaigns designed specifically for dentists — increase local leads and grow your practice faster.',
  lawyer: 'Unlock data-driven Google Ads campaigns tailored for lawyers — get more local clients and grow your law practice.',
  'real-estate': 'Unlock Google Ads strategies for real estate agents — attract more buyers and sellers in your area.',
  // ... другие ключевые ниши
};

// Автоматическое форматирование ниши
export function formatNiche(niche: string) {
  return niche
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// Нормализация ниши (проверка синонимов)
export function normalizeNiche(niche: string): string {
  const normalized = niche.toLowerCase().trim();
  if (nicheSynonyms[normalized]) {
    return nicheSynonyms[normalized];
  }
  return normalized;
}

// Генерация заголовка для UI (с переносами строк)
export function generateTitle(niche: string): string {
  const normalizedNiche = normalizeNiche(niche);
  if (premiumTitles[normalizedNiche]) {
    return premiumTitles[normalizedNiche];
  }
  if (!normalizedNiche || normalizedNiche === 'unknown' || normalizedNiche === '') {
    return 'AI-Powered Local Google Ads for Your Business';
  }
  const formattedNiche = formatNiche(normalizedNiche);
  return `AI-Powered Local Google Ads for ${formattedNiche}`;
}

// Генерация SEO-заголовка (без переносов строк)
export function generateSEOTitle(niche: string): string {
  const normalizedNiche = normalizeNiche(niche);
  if (normalizedNiche === 'dentist') {
    return 'AI-Powered Local Google Ads for Dentists | Boost Your City PPC Results';
  }
  if (premiumTitles[normalizedNiche]) {
    return premiumTitles[normalizedNiche];
  }
  if (!normalizedNiche || normalizedNiche === 'unknown' || normalizedNiche === '') {
    return 'AI-Powered Local Google Ads for Your Business | Local PPC Strategies';
  }
  const formattedNiche = formatNiche(normalizedNiche);
  return `AI-Powered Local Google Ads for ${formattedNiche} | Boost Your City PPC Results`;
}

// Генерация SEO-описания
export function generateSEODescription(niche: string): string {
  const normalizedNiche = normalizeNiche(niche);
  // Если есть кастомный description — используем его
  if (customDescriptions[normalizedNiche]) {
    return customDescriptions[normalizedNiche];
  }
  if (!normalizedNiche || normalizedNiche === 'unknown' || normalizedNiche === '') {
    return 'Discover how AI-powered Google Ads can help your business attract more local customers and grow your revenue. Expert PPC strategies and local optimization tips.';
  }
  const formattedNiche = formatNiche(normalizedNiche);
  return `Discover how AI-powered Google Ads can help ${formattedNiche.toLowerCase()} businesses attract more local customers and grow revenue. Expert PPC strategies and local optimization tips for ${formattedNiche.toLowerCase()} services.`;
}

// Генерация подзаголовка для UI
export function generateSubheading(niche: string): string {
  const normalizedNiche = normalizeNiche(niche);
  if (customSubheadings[normalizedNiche]) {
    return customSubheadings[normalizedNiche];
  }
  if (!normalizedNiche || normalizedNiche === 'unknown' || normalizedNiche === '') {
    return 'Unlock targeted, data-driven Google Ads campaigns for your business — increase local leads and grow faster.';
  }
  const formattedNiche = formatNiche(normalizedNiche);
  return `Unlock targeted, data-driven Google Ads campaigns designed specifically for ${formattedNiche.toLowerCase()} — increase local leads and grow your business faster.`;
} 