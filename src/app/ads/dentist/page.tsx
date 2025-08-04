'use client';

import Link from 'next/link';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import Breadcrumbs from '../../../components/Breadcrumbs';
import { generateTitle, generateSEOTitle, generateSEODescription, generateSubheading, generateSEOParagraph } from '../../../../utils/seo';
import { useState } from 'react';
import NichePromoBlock from '../../../components/NichePromoBlock';

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
  { slug: 'chicago', name: 'Chicago', hasPage: true },
  { slug: 'miami', name: 'Miami', hasPage: true },
  { slug: 'austin', name: 'Austin', hasPage: true },
  { slug: 'phoenix', name: 'Phoenix', hasPage: false },
  { slug: 'san-diego', name: 'San Diego', hasPage: false },
];

export default function DentistAdsHubPage() {
  const niche = 'dentist'; // В будущем это будет приходить как параметр
  const title = generateTitle(niche);
  const titleParts = title.split(' for ');
  // SEO-метаданные (пример использования)
  const seoTitle = generateSEOTitle(niche);
  const seoDescription = generateSEODescription(niche);
  const subheading = generateSubheading(niche);
  const seoParagraph = generateSEOParagraph(niche);

  // Состояние для поиска
  const [searchQuery, setSearchQuery] = useState('');
  const [showAllCities, setShowAllCities] = useState(false);

  // Фильтрация городов по поиску
  const filteredCities = cities.filter(city =>
    city.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const visibleCities = showAllCities ? filteredCities : filteredCities.slice(0, 4);

  // Для демонстрации (можно удалить):
  console.log('SEO Title:', seoTitle);
  console.log('SEO Description:', seoDescription);

  return (
    <>
      <Header />
      <Breadcrumbs />
      <main style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)', padding: '48px 16px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center', marginBottom: 48 }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#1e293b', marginBottom: 16 }}>
            {titleParts[0]} <br />
            for {titleParts[1]}
          </h1>
          <p style={{ fontSize: '1.15rem', color: '#64748b', fontWeight: 400, marginBottom: 24 }}>
            Discover AI-optimized, data-driven ad strategies to help dentists attract more local patients. Choose your city to explore tailored insights and proven campaign examples.
          </p>
        </div>
        
        {/* Поиск по городам */}
        <div style={{ maxWidth: 600, margin: '0 auto 48px auto' }}>
          <div style={{
            position: 'relative',
            background: 'white',
            borderRadius: '16px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
            border: '1px solid #e2e8f0',
            overflow: 'hidden'
          }}>
            <input
              type="text"
              placeholder="Search cities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '16px 20px',
                border: 'none',
                outline: 'none',
                fontSize: '16px',
                background: 'transparent',
                color: '#1e293b'
              }}
            />
            <div style={{
              position: 'absolute',
              right: '16px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#64748b'
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.35-4.35"/>
              </svg>
            </div>
          </div>
          {searchQuery && (
            <div style={{
              textAlign: 'center',
              marginTop: '12px',
              fontSize: '14px',
              color: '#64748b'
            }}>
              {filteredCities.length} city{filteredCities.length !== 1 ? 'ies' : 'y'} found
            </div>
          )}
        </div>

        <section style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(4, 1fr)', 
            gap: 32
          }}>
            {visibleCities.map((city, index) => {
              // Разные стили для каждой карточки
              const cardStyles = [
                // 1. Phoenix - Интерактивный (Framer)
                {
                  background: 'white',
                  border: '2px solid #667eea',
                  boxShadow: '0 8px 32px rgba(102,126,234,0.3)',
                  borderRadius: '16px',
                  padding: '30px',
                  transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                },
                // 2. Phoenix - Интерактивный (Framer)
                {
                  background: 'white',
                  border: '2px solid #667eea',
                  boxShadow: '0 8px 32px rgba(102,126,234,0.3)',
                  borderRadius: '16px',
                  padding: '30px',
                  transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                },
                // 3. Phoenix - Интерактивный (Framer)
                {
                  background: 'white',
                  border: '2px solid #667eea',
                  boxShadow: '0 8px 32px rgba(102,126,234,0.3)',
                  borderRadius: '16px',
                  padding: '30px',
                  transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                },
                // 4. Phoenix - Интерактивный (Framer)
                {
                  background: 'white',
                  border: '2px solid #667eea',
                  boxShadow: '0 8px 32px rgba(102,126,234,0.3)',
                  borderRadius: '16px',
                  padding: '30px',
                  transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                },
                // 5. Phoenix - Интерактивный (Framer)
                {
                  background: 'white',
                  border: '2px solid #667eea',
                  boxShadow: '0 8px 32px rgba(102,126,234,0.3)',
                  borderRadius: '16px',
                  padding: '30px',
                  transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                }
              ];

              const textColors = [
                '#1e293b', // Phoenix - темный
                '#1e293b', // Phoenix - темный
                '#1e293b', // Phoenix - темный
                '#1e293b', // Phoenix - темный
                '#1e293b'  // Phoenix - темный
              ];

              const buttonStyles = [
                // Phoenix - градиентная кнопка
                {
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  border: 'none',
                  boxShadow: '0 4px 16px rgba(102,126,234,0.3)'
                },
                // Phoenix - градиентная кнопка
                {
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  border: 'none',
                  boxShadow: '0 4px 16px rgba(102,126,234,0.3)'
                },
                // Phoenix - градиентная кнопка
                {
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  border: 'none',
                  boxShadow: '0 4px 16px rgba(102,126,234,0.3)'
                },
                // Phoenix - градиентная кнопка
                {
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  border: 'none',
                  boxShadow: '0 4px 16px rgba(102,126,234,0.3)'
                },
                // Phoenix - градиентная кнопка
                {
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  border: 'none',
                  boxShadow: '0 4px 16px rgba(102,126,234,0.3)'
                }
              ];

              const currentStyle = cardStyles[index] || cardStyles[0];
              const currentTextColor = textColors[index] || textColors[0];
              const currentButtonStyle = buttonStyles[index] || buttonStyles[0];

                            return city.hasPage ? (
                <Link
                  key={city.slug}
                  href={`/ads/dentist/${city.slug}`}
                  style={{
                    ...currentStyle,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    minHeight: 220,
                    maxHeight: 220,
                    width: '100%',
                    position: 'relative',
                    textDecoration: 'none',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={e => {
                    const target = e.currentTarget as HTMLElement;
                    // Все карточки Phoenix - интерактивный hover
                    target.style.transform = 'translateY(-8px) scale(1.05) rotate(1deg)';
                    target.style.boxShadow = '0 16px 40px rgba(102,126,234,0.4)';
                  }}
                  onMouseLeave={e => {
                    const target = e.currentTarget as HTMLElement;
                    target.style.transform = 'translateY(0) scale(1) rotate(0deg)';
                    target.style.boxShadow = currentStyle.boxShadow;
                    target.style.background = currentStyle.background;
                  }}
                >
                  <div>
                    <h3 style={{ 
                      fontSize: '1.25rem', 
                      fontWeight: 600, 
                      color: currentTextColor, 
                      marginBottom: 8 
                    }}>
                      {city.name}
                    </h3>
 
                  </div>
                  <div
                    style={{
                      display: 'inline-block',
                      marginTop: 'auto',
                      padding: '12px 28px',
                      borderRadius: 12,
                      ...currentButtonStyle,
                      fontWeight: 700,
                      fontSize: '1rem',
                      textAlign: 'center',
                      transition: 'all 0.2s',
                    }}
                  >
                    Explore
                  </div>
                </Link>
              ) : (
                <div
                  key={city.slug}
                  style={{
                    ...currentStyle,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    minHeight: 220,
                    maxHeight: 220,
                    width: '100%',
                    position: 'relative',
                    opacity: 0.6,
                    cursor: 'default',
                    background: '#f8fafc',
                    border: '2px solid #e2e8f0'
                  }}
                >
                  <div>
                    <h3 style={{ 
                      fontSize: '1.25rem', 
                      fontWeight: 600, 
                      color: '#64748b', 
                      marginBottom: 8 
                    }}>
                      {city.name}
                    </h3>
 
                  </div>
                  <div
                    style={{
                      display: 'inline-block',
                      marginTop: 'auto',
                      padding: '12px 28px',
                      borderRadius: 12,
                      background: '#cbd5e1',
                      color: 'white',
                      border: 'none',
                      fontWeight: 700,
                      fontSize: '1rem',
                      textAlign: 'center',
                      transition: 'all 0.2s',
                      cursor: 'default',
                      boxShadow: 'none'
                    }}
                  >
                    Coming Soon
                  </div>
                </div>
              );
            })}
          </div>
          {filteredCities.length > 4 && (
            <div style={{ textAlign: 'center', marginTop: 32 }}>
              <button
                onClick={() => setShowAllCities(v => !v)}
                style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  border: 'none',
                  padding: '12px 32px',
                  borderRadius: 8,
                  fontWeight: 700,
                  fontSize: '1rem',
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px rgba(127,156,245,0.10)',
                  transition: 'background 0.2s',
                }}
              >
                {showAllCities ? 'Hide cities' : 'Show all cities'}
              </button>
            </div>
          )}
          
          {/* Сообщение, если ничего не найдено */}
          {filteredCities.length === 0 && searchQuery && (
            <div style={{
              textAlign: 'center',
              padding: '48px 24px',
              color: '#64748b',
              fontSize: '16px'
            }}>
              No cities found for "{searchQuery}". Try a different search term.
            </div>
          )}
        </section>

        {/* SEO-параграф */}
        <section style={{ maxWidth: 800, margin: '48px auto', padding: '0 16px' }}>
          <p style={{
            fontSize: '1rem',
            lineHeight: '1.6',
            color: '#64748b',
            textAlign: 'center',
            margin: 0
          }}>
            {seoParagraph}
          </p>
        </section>
        <NichePromoBlock niche="dentist" />
      </main>
      <Footer compact={true} />
    </>
  );
}