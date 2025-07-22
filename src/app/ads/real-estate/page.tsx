'use client';

import Link from 'next/link';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import { generateTitle, generateSEOTitle, generateSEODescription, generateSubheading, generateSEOParagraph } from '../../../../utils/seo';
import { useState } from 'react';
import NichePromoBlock from '../../../components/NichePromoBlock';

const cities = [
  { slug: 'chicago', name: 'Chicago' },
  { slug: 'miami', name: 'Miami' },
  { slug: 'austin', name: 'Austin' },
  { slug: 'phoenix', name: 'Phoenix' },
  { slug: 'san-diego', name: 'San Diego' },
];

export default function RealEstateAdsHubPage() {
  const niche = 'real-estate';
  const title = generateTitle(niche);
  const titleParts = title.split(' for ');
  const seoTitle = generateSEOTitle(niche);
  const seoDescription = generateSEODescription(niche);
  const subheading = generateSubheading(niche);
  const seoParagraph = generateSEOParagraph(niche);

  const [searchQuery, setSearchQuery] = useState('');
  const [showAllCities, setShowAllCities] = useState(false);

  const filteredCities = cities.filter(city =>
    city.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const visibleCities = showAllCities ? filteredCities : filteredCities.slice(0, 4);

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
        <div style={{ maxWidth: 600, margin: '0 auto 48px auto' }}>
          <div style={{
            position: 'relative',
            background: 'white',
            borderRadius: '16px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
            border: '1px solid #e5e7eb',
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
                color: '#1a1a1a'
              }}
            />
            <div style={{
              position: 'absolute',
              right: '16px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#A0A0A0'
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
              color: '#A0A0A0'
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
              const cardStyles = [
                {
                  background: 'white',
                  border: '2px solid #667eea',
                  boxShadow: '0 8px 32px rgba(102,126,234,0.3)',
                  borderRadius: '16px',
                  padding: '30px',
                  transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                },
                {
                  background: 'white',
                  border: '2px solid #667eea',
                  boxShadow: '0 8px 32px rgba(102,126,234,0.3)',
                  borderRadius: '16px',
                  padding: '30px',
                  transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                },
                {
                  background: 'white',
                  border: '2px solid #667eea',
                  boxShadow: '0 8px 32px rgba(102,126,234,0.3)',
                  borderRadius: '16px',
                  padding: '30px',
                  transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                },
                {
                  background: 'white',
                  border: '2px solid #667eea',
                  boxShadow: '0 8px 32px rgba(102,126,234,0.3)',
                  borderRadius: '16px',
                  padding: '30px',
                  transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                },
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
                '#1a1a1a',
                '#1a1a1a',
                '#1a1a1a',
                '#1a1a1a',
                '#1a1a1a'
              ];
              const buttonStyles = [
                {
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  border: 'none',
                  boxShadow: '0 4px 16px rgba(102,126,234,0.3)'
                },
                {
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  border: 'none',
                  boxShadow: '0 4px 16px rgba(102,126,234,0.3)'
                },
                {
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  border: 'none',
                  boxShadow: '0 4px 16px rgba(102,126,234,0.3)'
                },
                {
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  border: 'none',
                  boxShadow: '0 4px 16px rgba(102,126,234,0.3)'
                },
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
              return (
                <Link
                  key={city.slug}
                  href={`/ads/real-estate/${city.slug}`}
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
          {filteredCities.length === 0 && searchQuery && (
            <div style={{
              textAlign: 'center',
              padding: '48px 24px',
              color: '#A0A0A0',
              fontSize: '16px'
            }}>
              No cities found for "{searchQuery}". Try a different search term.
            </div>
          )}
        </section>
        <section style={{ maxWidth: 800, margin: '48px auto', padding: '0 16px' }}>
          <p style={{
            fontSize: '1rem',
            lineHeight: '1.6',
            color: '#6b7280',
            textAlign: 'center',
            margin: 0
          }}>
            {seoParagraph}
          </p>
        </section>
        <NichePromoBlock niche="real-estate" />
      </main>
      <Footer compact={true} />
    </>
  );
} 