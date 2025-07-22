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
  saas: 'AI-Powered Local Google Ads for SaaS Companies',
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
  saas: 'Discover how AI-powered Google Ads help SaaS companies attract more local customers and grow revenue. Get expert PPC strategies and local optimization tips tailored for SaaS services.',
  // В будущем можно добавить lawyer, real-estate и т.д.
};

// Кастомные подзаголовки для ключевых ниш
export const customSubheadings: Record<string, string> = {
  dentist: 'Discover AI-optimized, data-driven ad strategies to help dentists attract more local patients. Choose your city to explore tailored insights and proven campaign examples.',
  lawyer: 'Discover AI-optimized, data-driven ad strategies to help lawyers attract more local clients. Choose your city to explore tailored insights and proven campaign examples.',
  'real-estate': 'Discover AI-optimized, data-driven ad strategies to help real estate agents attract more local clients. Choose your city to explore tailored insights and proven campaign examples.',
  'car-dealer': 'Discover AI-optimized, data-driven ad strategies to help car dealerships attract more local customers. Choose your city to explore tailored insights and proven campaign examples.',
  'plumber': 'Discover AI-optimized, data-driven ad strategies to help plumbers attract more local customers. Choose your city to explore tailored insights and proven campaign examples.',
  'electrician': 'Discover AI-optimized, data-driven ad strategies to help electricians attract more local customers. Choose your city to explore tailored insights and proven campaign examples.',
  'roofer': 'Discover AI-optimized, data-driven ad strategies to help roofers attract more local customers. Choose your city to explore tailored insights and proven campaign examples.',
  'contractor': 'Discover AI-optimized, data-driven ad strategies to help contractors attract more local customers. Choose your city to explore tailored insights and proven campaign examples.',
  'restaurant': 'Discover AI-optimized, data-driven ad strategies to help restaurants attract more local customers. Choose your city to explore tailored insights and proven campaign examples.',
  'gym': 'Discover AI-optimized, data-driven ad strategies to help gyms attract more local members. Choose your city to explore tailored insights and proven campaign examples.',
  'salon': 'Discover AI-optimized, data-driven ad strategies to help salons attract more local customers. Choose your city to explore tailored insights and proven campaign examples.',
  'chiropractor': 'Discover AI-optimized, data-driven ad strategies to help chiropractors attract more local patients. Choose your city to explore tailored insights and proven campaign examples.',
  saas: 'Discover AI-optimized, data-driven ad strategies to help SaaS companies attract more local customers. Choose your city to explore tailored insights and proven campaign examples.',
};

// Автоматическое форматирование ниши
export function formatNiche(niche: string) {
  // Специальные случаи для аббревиатур
  if (niche.toLowerCase() === 'saas') {
    return 'SaaS';
  }
  
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
    return 'Discover AI-optimized, data-driven ad strategies to help your business attract more local customers. Choose your city to explore tailored insights and proven campaign examples.';
  }
  const formattedNiche = formatNiche(normalizedNiche);
  return `Discover AI-optimized, data-driven ad strategies to help ${formattedNiche.toLowerCase()} businesses attract more local customers. Choose your city to explore tailored insights and proven campaign examples.`;
} 

// Словарь для множественного числа (plural) и профессионала (professional) по нишам
export const nichePlurals: Record<string, string> = {
  dentist: 'dental clinics',
  lawyer: 'law firms',
  'real-estate': 'real estate agencies',
  'car-dealer': 'car dealerships',
  'plumber': 'plumbing companies',
  'electrician': 'electrical companies',
  'roofer': 'roofing companies',
  'contractor': 'contractor businesses',
  'restaurant': 'restaurants',
  'gym': 'gyms',
  'salon': 'salons',
  'chiropractor': 'chiropractic clinics',
  saas: 'SaaS companies',
};

export const nicheProfessionals: Record<string, string> = {
  dentist: 'dentist',
  lawyer: 'lawyer',
  'real-estate': 'real estate agent',
  'car-dealer': 'car dealership owner',
  'plumber': 'plumber',
  'electrician': 'electrician',
  'roofer': 'roofer',
  'contractor': 'contractor',
  'restaurant': 'restaurant owner',
  'gym': 'gym owner',
  'salon': 'salon owner',
  'chiropractor': 'chiropractor',
  saas: 'SaaS founder',
};

// Генерация SEO-параграфа для хаба
export function generateSEOParagraph(niche: string): string {
  const normalizedNiche = normalizeNiche(niche);
  const plural = nichePlurals[normalizedNiche] || `${formatNiche(normalizedNiche)} businesses`;
  const professional = nicheProfessionals[normalizedNiche] || `${formatNiche(normalizedNiche)} professional`;
  return `On this page, you'll find AI-powered Google Ads strategies and real-world examples designed specifically for ${plural} in cities across the U.S., Canada, Europe, and beyond — from Chicago to Berlin. Whether you're a ${professional} or a digital marketing professional, our resources provide localized PPC campaign insights that help you connect with the right audience, reduce advertising costs, and increase customer acquisition efficiently.`;
} 