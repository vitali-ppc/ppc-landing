'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { formatNiche } from '../../../utils/seo';

const niches = [
  { slug: 'dentist', name: 'Dentist' },
  { slug: 'lawyer', name: 'Lawyers' },
  { slug: 'real-estate', name: 'Real Estate' },
  { slug: 'saas', name: 'SaaS' },
  { slug: 'plumber', name: 'Plumbers' },
  { slug: 'roofer', name: 'Roofers' },
  { slug: 'electrician', name: 'Electricians' },
  { slug: 'gym', name: 'Gyms & Fitness Studios' },
  { slug: 'therapist', name: 'Therapists & Counselors' },
  { slug: 'ecommerce', name: 'Ecommerce Stores' },
  { slug: 'wedding-photographer', name: 'Wedding Photographers' },
  { slug: 'home-cleaning', name: 'Home Cleaning Services' },
  { slug: 'digital-agency', name: 'Digital Agencies' },
  { slug: 'auto-repair', name: 'Auto Repair Shops' },
  { slug: 'pet-services', name: 'Pet Services' },
  { slug: 'education-courses', name: 'Education Courses' },
  { slug: 'cosmetic-clinic', name: 'Cosmetic Clinics' },
  { slug: 'moving-company', name: 'Moving Companies' },
  { slug: 'hvac', name: 'HVAC Services' },
  { slug: 'chiropractor', name: 'Chiropractors' },
];

export default function AdsMainHubPage() {
  const title = 'AI-Powered Local Google Ads Niches';
  const subheading = 'Choose your business niche to explore city-specific Google Ads strategies, real-world PPC examples, and actionable insights for local growth.';
  const seoParagraph = 'Browse our collection of AI-optimized Google Ads strategies and examples for top business niches — from dentists to SaaS. Each hub provides localized PPC campaign ideas, expert tips, and proven tactics to help you attract more local customers.';

  const [searchQuery, setSearchQuery] = useState('');
  const filteredNiches = niches.filter(niche =>
    formatNiche(niche.name).toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Стили карточек и кнопок как в SILO-хабах
  const cardStyle = {
    background: 'white',
    border: '2px solid #667eea',
    boxShadow: '0 8px 32px rgba(102,126,234,0.3)',
    borderRadius: 16,
    padding: '30px',
    transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    minHeight: 220,
    maxHeight: 220,
    width: '100%',
    position: 'relative',
    textDecoration: 'none',
    cursor: 'pointer',
  };
  const buttonStyle = {
    display: 'inline-block',
    marginTop: 'auto',
    padding: '12px 28px',
    borderRadius: 12,
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    border: 'none',
    boxShadow: '0 4px 16px rgba(102,126,234,0.3)',
    fontWeight: 700,
    fontSize: '1rem',
    textAlign: 'center' as const,
    transition: 'all 0.2s',
  };

  return (
    <>
      <Header />
      <main style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)', padding: '48px 16px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center', marginBottom: 48 }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#1a1a1a', marginBottom: 16 }}>
            {title}
          </h1>
          <p style={{ fontSize: '1.15rem', color: '#374151', fontWeight: 400, marginBottom: 24 }}>
            {subheading}
          </p>
        </div>
        {/* Поиск по нишам */}
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
              placeholder="Search niches..."
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
              {filteredNiches.length} niche{filteredNiches.length !== 1 ? 's' : ''} found
            </div>
          )}
        </div>
        <section style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(3, 1fr)', 
            gap: 32,
            minHeight: '300px'
          }}>
            {filteredNiches.map((niche, index) => (
              <Link
                key={niche.slug}
                href={`/ads/${niche.slug}`}
                style={cardStyle}
                onMouseEnter={e => {
                  const target = e.currentTarget as HTMLElement;
                  target.style.transform = 'translateY(-8px) scale(1.05) rotate(1deg)';
                  target.style.boxShadow = '0 16px 40px rgba(102,126,234,0.4)';
                }}
                onMouseLeave={e => {
                  const target = e.currentTarget as HTMLElement;
                  target.style.transform = 'translateY(0) scale(1) rotate(0deg)';
                  target.style.boxShadow = cardStyle.boxShadow;
                  target.style.background = cardStyle.background;
                }}
              >
                <div>
                  <h3 style={{
                    fontSize: '1.25rem',
                    fontWeight: 600,
                    color: '#1a1a1a',
                    marginBottom: 8
                  }}>{formatNiche(niche.name)}</h3>
                </div>
                <div style={buttonStyle}>Explore</div>
              </Link>
            ))}
          </div>
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
      </main>
      <Footer compact={true} />
    </>
  );
} 