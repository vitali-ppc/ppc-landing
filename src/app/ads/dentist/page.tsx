'use client';

import Link from 'next/link';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import { generateTitle, generateSEOTitle, generateSEODescription, generateSubheading } from '../../../../utils/seo';

// Премиум заголовки для ключевых ниш
const premiumTitles: Record<string, string> = {
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
const nicheSynonyms: Record<string, string> = {
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

// Автоматическое форматирование ниши
function formatNiche(niche: string) {
  return niche
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// Нормализация ниши (проверка синонимов)
function normalizeNiche(niche: string): string {
  const normalized = niche.toLowerCase().trim();
  
  // Сначала проверяем синонимы
  if (nicheSynonyms[normalized]) {
    return nicheSynonyms[normalized];
  }
  
  // Если нет синонима, возвращаем как есть
  return normalized;
}

const cities = [
  { slug: 'chicago', name: 'Chicago', desc: 'Grow your dental practice in Chicago with targeted Google Ads and local PPC strategies.' },
  { slug: 'miami', name: 'Miami', desc: 'Attract more patients in Miami with expert Google Ads management for dentists.' },
  { slug: 'austin', name: 'Austin', desc: 'Boost your Austin dental clinic with high-converting PPC campaigns.' },
  { slug: 'phoenix', name: 'Phoenix', desc: 'Drive more appointments in Phoenix with local PPC for dentists.' },
  { slug: 'san-diego', name: 'San Diego', desc: 'Get more dental leads in San Diego with city-focused Google Ads.' },
];

export default function DentistAdsHubPage() {
  const niche = 'dentist'; // В будущем это будет приходить как параметр
  const title = generateTitle(niche);
  const titleParts = title.split(' for ');
  // SEO-метаданные (пример использования)
  const seoTitle = generateSEOTitle(niche);
  const seoDescription = generateSEODescription(niche);
  const subheading = generateSubheading(niche);

  // Для демонстрации (можно удалить):
  console.log('SEO Title:', seoTitle);
  console.log('SEO Description:', seoDescription);

  return (
    <>
      <Header />
      <main style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)', padding: '48px 16px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center', marginBottom: 48 }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#1a1a1a', marginBottom: 16 }}>
            {titleParts[0]} <br />
            for {titleParts[1]}
          </h1>
          <p style={{ fontSize: '1.15rem', color: '#374151', fontWeight: 400, marginBottom: 24 }}>
            {subheading}
          </p>
        </div>
        <section style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 32 }}>
            {cities.map(city => (
              <div
                key={city.slug}
                style={{
                  background: 'white',
                  borderRadius: 20,
                  boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
                  padding: 32,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transition: 'box-shadow 0.3s',
                  minHeight: 220,
                  border: '1px solid #e5e7eb',
                  position: 'relative',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 16px 40px rgba(0,0,0,0.12)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 32px rgba(0,0,0,0.08)';
                }}
              >
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#2563eb', marginBottom: 8 }}>{city.name}</h3>
                  <p style={{ color: '#6b7280', marginBottom: 16 }}>{city.desc}</p>
                </div>
                <Link
                  href={`/ads/dentist/${city.slug}`}
                  style={{
                    display: 'inline-block',
                    marginTop: 'auto',
                    padding: '12px 28px',
                    borderRadius: 12,
                    background: 'linear-gradient(90deg, #2563eb 0%, #06b6d4 100%)',
                    color: 'white',
                    fontWeight: 700,
                    fontSize: '1rem',
                    boxShadow: '0 4px 16px rgba(37,99,235,0.12)',
                    textDecoration: 'none',
                    transition: 'background 0.2s',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.background = 'linear-gradient(90deg, #1d4ed8 0%, #0891b2 100%)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.background = 'linear-gradient(90deg, #2563eb 0%, #06b6d4 100%)';
                  }}
                >
                  Explore
                </Link>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer compact={true} />
    </>
  );
} 