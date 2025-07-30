'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { formatNiche } from '../../../utils/seo';
import React from 'react';

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

// 2. IconLawyer как отдельный компонент
const IconLawyer = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true">
    <rect x="6" y="16" width="24" height="4" rx="2" fill="#667eea" />
    <rect x="16" y="6" width="4" height="24" rx="2" fill="#667eea" />
    <circle cx="18" cy="18" r="17" stroke="#764ba2" strokeWidth="2" fill="none" />
  </svg>
);

// 3. IconRealEstate как переменная (имитация импорта)
const IconRealEstate = (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true">
    <rect x="8" y="18" width="20" height="10" rx="2" fill="#764ba2" />
    <polygon points="18,8 6,18 30,18" fill="#667eea" />
    <rect x="15" y="23" width="6" height="5" rx="1" fill="#fff" />
  </svg>
);

export default function AdsMainHubPage() {
  const title = 'Your AI Assistant for Google Ads. Tailored to Your Industry.';
  const subheading = 'Instantly generate tailored reports, strategic insights, and PPC audits — all customized for your industry.';
  const seoParagraph = "Whether you’re running campaigns in eCommerce, SaaS, law, or local business, Kampaio analyzes your Google Ads data and delivers clear, industry-tailored insights. Join over 1,000 businesses who’ve uncovered hidden growth opportunities, simplified audits, and lowered costs — all without hiring an agency or drowning in complex reports. Stop guessing and start growing with AI-driven recommendations built for your niche.";

  const [searchQuery, setSearchQuery] = useState('');
  const [showAllNiches, setShowAllNiches] = useState(false);
  const filteredNiches = niches.filter(niche =>
    formatNiche(niche.name).toLowerCase().includes(searchQuery.toLowerCase())
  );
  const visibleNiches = showAllNiches ? filteredNiches : filteredNiches.slice(0, 4);

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
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#1e293b', marginBottom: 16 }}>
            {title}
          </h1>
          <p style={{ fontSize: '1.15rem', color: '#64748b', fontWeight: 400, marginBottom: 24 }}>
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
            border: '1px solid #e2e8f0',
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
              {filteredNiches.length} niche{filteredNiches.length !== 1 ? 's' : ''} found
            </div>
          )}
        </div>
        <section style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 32,
            maxWidth: 1200,
            margin: '0 auto',
            marginBottom: 40,
          }}>
            {visibleNiches.map((niche, index) => {
              // icon = null для всех карточек
              return (
                <Link
                  key={niche.slug}
                  href={`/ads/${niche.slug}`}
                  style={{ ...cardStyle }}
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
                  {/* Все иконки убраны */}
                  <div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#1e293b', marginBottom: 8 }}>
                      {niche.name}
                    </h3>
                  </div>
                  <div style={buttonStyle}>Explore</div>
                </Link>
              );
            })}
          </div>
          {filteredNiches.length > 4 && (
            <div style={{ textAlign: 'center', marginTop: 32 }}>
              <button
                onClick={() => setShowAllNiches(v => !v)}
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
                {showAllNiches ? 'Hide niches' : 'Show all niches'}
              </button>
            </div>
          )}
        </section>
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
        <section style={{
          background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%)',
          borderRadius: '16px',
          padding: '40px',
          textAlign: 'center',
          marginTop: '60px',
          marginBottom: '40px',
          maxWidth: 800,
          marginLeft: 'auto',
          marginRight: 'auto',
        }}>
          <h2 style={{
            fontSize: '2rem',
            fontWeight: 700,
            color: '#1e293b',
            marginBottom: '18px',
            lineHeight: '1.3'
          }}>
            AI Assistant for Google Ads
          </h2>
          <p style={{
            fontSize: '17px',
            color: '#64748b',
            marginBottom: '28px',
            lineHeight: '1.6',
            fontWeight: '500',
            opacity: 0.9
          }}>
            Get tailored suggestions and audits for your business type or location.
          </p>
          <a
            href="/chat"
            className="btn"
            style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              border: 'none',
              padding: '16px 32px',
              borderRadius: '10px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              display: 'inline-block',
              boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
              textDecoration: 'none',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.4)';
              (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.3)';
              (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)';
            }}
          >
            Try for Free
          </a>
        </section>
      </main>
      <Footer compact={true} />
    </>
  );
} 