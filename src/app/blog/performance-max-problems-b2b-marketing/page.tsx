'use client';

import { useState } from 'react';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import Breadcrumbs from '../../../components/Breadcrumbs';

export default function BlogPostPage() {
  const [isTableOfContentsOpen, setIsTableOfContentsOpen] = useState(false);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Why Performance Max Fails in B2B Marketing",
    "description": "The dirty secret Google won't tell you: Performance Max is built for B2C, not B2B. Learn why it fails and get the alternative strategy that actually works.",
    "image": "https://kampaio.com/logo.png",
    "author": {
      "@type": "Person",
      "name": "Emily Carter",
      "jobTitle": "Paid Media Strategist at Kampaio"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Kampaio",
      "logo": {
        "@type": "ImageObject",
        "url": "https://kampaio.com/logo.png"
      }
    },
    "datePublished": "2025-07-23T00:00:00.000Z",
    "dateModified": "2025-07-23T00:00:00.000Z",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://kampaio.com/blog/performance-max-problems-b2b-marketing"
    },
    "keywords": "Performance Max, Google Ads, B2B, PPC, lead quality, sales cycle, conversion tracking, audience signals, budget waste, automation"
  };

  const tableOfContents = [
    { id: 'introduction', title: 'Introduction', level: 1 },
    { id: 'problem-1', title: '1. Poor Lead Quality', level: 2 },
    { id: 'problem-2', title: '2. Long & Complex Sales Cycles', level: 2 },
    { id: 'problem-3', title: '3. Broken Conversion Tracking', level: 2 },
    { id: 'problem-4', title: '4. Weak Audience Signals', level: 2 },
    { id: 'problem-5', title: '5. Budget Waste & Lack of Control', level: 2 },
    { id: 'solutions', title: 'How to Fix Performance Max for B2B', level: 1 },
    { id: 'conclusion', title: 'Conclusion', level: 1 }
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div style={{ minHeight: '100vh', background: 'white' }}>
        <Header />
        {/* Breadcrumbs */}
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px 24px 0' }}>
          <Breadcrumbs />
        </div>
        {/* Article Header */}
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 24px 60px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            {/* Category Badge */}
            <div style={{ display: 'inline-block', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', padding: '8px 16px', borderRadius: '20px', fontSize: '14px', fontWeight: '600', marginBottom: '20px' }}>
              Google Ads · B2B
            </div>
            {/* Title */}
            <h1 style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: '800', color: '#1a1a1a', marginBottom: '24px', lineHeight: '1.2' }}>
              Why Performance Max Fails in B2B Marketing
            </h1>
            {/* Subtitle */}
            <p style={{ fontSize: '20px', color: '#666', marginBottom: '32px', lineHeight: '1.6', fontWeight: '500' }}>
              Why Google’s Most Automated Campaign Type Fails for B2B — and What to Do Instead
            </p>
            {/* Meta Info */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '40px', paddingBottom: '32px', borderBottom: '1px solid #e5e7eb' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: '600', fontSize: '16px' }}>
                  K
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '2px' }}>
                  <span style={{ color: '#666', fontSize: '16px', fontWeight: 600 }}>by Emily Carter</span>
                  <span style={{ color: '#888', fontSize: '15px' }}>Paid Media Strategist at Kampaio</span>
                  <span style={{ color: '#888', fontSize: '15px' }}>July 23, 2025 · 9 min read</span>
                </div>
              </div>
            </div>
            {/* Table of Contents Toggle */}
            <div style={{ background: '#f8fafc', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px', marginBottom: '40px' }}>
              <button
                onClick={() => setIsTableOfContentsOpen(!isTableOfContentsOpen)}
                style={{ background: 'none', border: 'none', fontSize: '18px', fontWeight: '600', color: '#1a1a1a', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', width: '100%', justifyContent: 'space-between' }}
              >
                Table of Contents
                <span style={{ transform: isTableOfContentsOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease' }}>▼</span>
              </button>
              {isTableOfContentsOpen && (
                <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #e5e7eb' }}>
                  {tableOfContents.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      style={{ padding: '8px 0', paddingLeft: `${(item.level - 1) * 20}px`, cursor: 'pointer', color: '#666', fontSize: '16px', lineHeight: '1.4', borderBottom: '1px solid transparent', transition: 'all 0.2s ease' }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = '#667eea';
                        e.currentTarget.style.borderBottomColor = '#667eea';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = '#666';
                        e.currentTarget.style.borderBottomColor = 'transparent';
                      }}
                    >
                      {item.title}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        {/* Article Content */}
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px 80px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            {/* Introduction */}
            <section id="introduction">
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#374151', marginBottom: '32px' }}>
                Performance Max (PMax) is Google’s most automated campaign type — and it’s revolutionized e-commerce and lead gen for many businesses. But for B2B marketers, it’s often a source of frustration: poor lead quality, wasted budget, and a black box that’s hard to control.<br /><br />
                In this article, we’ll break down the 5 biggest reasons why Performance Max fails for B2B, and show you how to fix them (or when to avoid PMax entirely).
              </p>
            </section>
            {/* 5 Problems */}
            <section>
              <h2 style={{ fontSize: '32px', fontWeight: '700', color: '#1a1a1a', marginBottom: '32px', marginTop: '48px' }}>
                5 Reasons Performance Max Fails for B2B
              </h2>
              <ol style={{ fontSize: '18px', color: '#374151', lineHeight: '1.8', paddingLeft: '24px', marginBottom: '40px' }}>
                <li id="problem-1" style={{ marginBottom: '24px' }}><strong>Poor Lead Quality:</strong> PMax optimizes for volume, not quality. In B2B, this means lots of irrelevant demo requests, job seekers, or spam — not real buyers.</li>
                <li id="problem-2" style={{ marginBottom: '24px' }}><strong>Long & Complex Sales Cycles:</strong> PMax can’t see your true sales funnel. It optimizes for quick conversions, not the months-long journeys typical in B2B.</li>
                <li id="problem-3" style={{ marginBottom: '24px' }}><strong>Broken Conversion Tracking:</strong> If your tracking isn’t perfect, PMax will optimize for the wrong actions (or nothing at all). B2B tracking is notoriously tricky — think phone calls, offline sales, or multi-touch journeys.</li>
                <li id="problem-4" style={{ marginBottom: '24px' }}><strong>Weak Audience Signals:</strong> PMax relies on strong audience signals (lists, custom segments, CRM data). Most B2B accounts don’t have enough data, so Google’s AI guesses — and often gets it wrong.</li>
                <li id="problem-5" style={{ marginBottom: '24px' }}><strong>Budget Waste & Lack of Control:</strong> PMax spends aggressively and gives you little control over placements, search terms, or creative. In B2B, this means wasted spend on irrelevant clicks and channels.</li>
              </ol>
            </section>
            {/* Solutions */}
            <section id="solutions">
              <h2 style={{ fontSize: '28px', fontWeight: '700', color: '#1a1a1a', marginBottom: '24px', marginTop: '48px' }}>
                How to Fix Performance Max for B2B
              </h2>
              <ul style={{ fontSize: '18px', color: '#374151', lineHeight: '1.8', paddingLeft: '24px', marginBottom: '40px' }}>
                <li style={{ marginBottom: '16px' }}><strong>Start with Search & Display:</strong> Use manual or semi-automated campaigns to build quality data before launching PMax.</li>
                <li style={{ marginBottom: '16px' }}><strong>Feed PMax with CRM Data:</strong> Import offline conversions and use Customer Match lists to improve targeting.</li>
                <li style={{ marginBottom: '16px' }}><strong>Set Up Robust Tracking:</strong> Track every meaningful action (form fills, calls, meetings booked) and import them into Google Ads.</li>
                <li style={{ marginBottom: '16px' }}><strong>Monitor Lead Quality Weekly:</strong> Don’t just look at conversion volume — check if leads are real, qualified, and sales-ready.</li>
                <li style={{ marginBottom: '16px' }}><strong>Don’t Be Afraid to Pause PMax:</strong> If you can’t get quality or control, switch back to Search/Display until you have better data.</li>
              </ul>
            </section>
            {/* Conclusion */}
            <section id="conclusion">
              <h2 style={{ fontSize: '28px', fontWeight: '700', color: '#1a1a1a', marginBottom: '24px', marginTop: '48px' }}>
                Conclusion
              </h2>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#374151', marginBottom: '32px' }}>
                Performance Max is powerful — but it’s not a magic bullet for B2B. If you want real pipeline, not just conversions, you need to control your data, signals, and strategy. Use PMax as a tool, not a default, and always optimize for quality over quantity.
              </p>
              <div style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                borderRadius: '16px',
                padding: '40px',
                textAlign: 'center',
                marginTop: '60px',
                marginBottom: '40px'
              }}>
                <h3 style={{
                  fontSize: '22px',
                  fontWeight: '700',
                  color: 'white',
                  marginBottom: '18px',
                  lineHeight: '1.3'
                }}>
                  Want a real B2B strategy?
                </h3>
                <p style={{
                  fontSize: '17px',
                  color: 'white',
                  marginBottom: '28px',
                  lineHeight: '1.6',
                  fontWeight: '500',
                  opacity: 0.9
                }}>
                  Let our AI analyze your account and show how to build a pipeline — not just drive clicks.
                </p>
                <button
                  style={{
                    background: 'linear-gradient(45deg, #00FFE7, #00BFAE)',
                    color: '#1A1A1A',
                    border: 'none',
                    padding: '16px 32px',
                    borderRadius: '10px',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    display: 'inline-block',
                    boxShadow: 'none',
                  }}
                  onClick={() => { window.location.href = '/chat'; }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,191,174,0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  Get My B2B Audit
                </button>
              </div>
            </section>
          </div>
        </div>
        <Footer compact={true} />
      </div>
    </>
  );
} 