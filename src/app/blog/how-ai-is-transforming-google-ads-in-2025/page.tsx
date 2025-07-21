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
    "headline": "How AI is Transforming Google Ads in 2025",
    "description": "Discover the new rules of PPC: smarter bidding, better targeting, and automated creativity. Learn the 5 biggest AI-driven changes in Google Ads for 2025 and how to stay ahead.",
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
    "datePublished": "2025-07-24T00:00:00.000Z",
    "dateModified": "2025-07-24T00:00:00.000Z",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://kampaio.com/blog/how-ai-is-transforming-google-ads-in-2025"
    },
    "keywords": "AI Google Ads, PPC automation, Performance Max, Smart Bidding, Responsive Search Ads, Audience Signals, Automated Insights, Google Ads 2025"
  };

  const tableOfContents = [
    { id: 'introduction', title: 'Introduction', level: 1 },
    { id: 'change-1', title: '1. Performance Max: The AI-First Campaign', level: 2 },
    { id: 'change-2', title: '2. Smart Bidding Gets Smarter', level: 2 },
    { id: 'change-3', title: '3. Responsive Search Ads & Automated Creativity', level: 2 },
    { id: 'change-4', title: '4. Audience Signals & Predictive Targeting', level: 2 },
    { id: 'change-5', title: '5. Automated Insights & Recommendations', level: 2 },
    { id: 'practical-tips', title: 'Practical Tips for Winning with AI', level: 1 },
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
              AI & Google Ads
            </div>
            {/* Title */}
            <h1 style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: '800', color: '#1a1a1a', marginBottom: '24px', lineHeight: '1.2' }}>
              How AI is Transforming Google Ads in 2025
            </h1>
            {/* Subtitle */}
            <p style={{ fontSize: '20px', color: '#666', marginBottom: '32px', lineHeight: '1.6', fontWeight: '500' }}>
              The New Rules of PPC: Smarter Bidding, Better Targeting, and Automated Creativity
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
                  <span style={{ color: '#888', fontSize: '15px' }}>July 24, 2025 · 10 min read</span>
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
                Artificial intelligence is no longer a buzzword in Google Ads — it’s the new reality. In 2025, every part of your PPC workflow is touched by AI: from campaign setup to bidding, targeting, and even creative. <strong>Google Ads automation</strong> is now essential for staying competitive. But what does this mean for advertisers, and how can you stay ahead with <strong>AI PPC strategies</strong>?
                <br /><br />
                In this article, we’ll break down the 5 biggest ways AI is transforming Google Ads, give you practical tips to win in the new era of automation, and share <strong>Performance Max examples</strong> to illustrate what’s working now.
              </p>
            </section>
            {/* 5 AI-Driven Changes */}
            <section>
              <h2 style={{ fontSize: '32px', fontWeight: '700', color: '#1a1a1a', marginBottom: '32px', marginTop: '48px' }}>
                5 Ways AI is Changing Google Ads in 2025
              </h2>
              <ol style={{ fontSize: '18px', color: '#374151', lineHeight: '1.8', paddingLeft: '24px', marginBottom: '40px' }}>
                <li id="change-1" style={{ marginBottom: '24px' }}><strong>Performance Max: The AI-First Campaign:</strong> Google’s flagship campaign type is now fully AI-driven, combining search, display, video, and more — all optimized by machine learning. <strong>Performance Max examples</strong> show how automation can drive results, but only with the right data and strategy.</li>
                <li id="change-2" style={{ marginBottom: '24px' }}><strong>Smart Bidding Gets Smarter:</strong> Automated bidding strategies now use more signals than ever, adapting in real time to maximize conversions or value.</li>
                <li id="change-3" style={{ marginBottom: '24px' }}><strong>Responsive Search Ads & Automated Creativity:</strong> AI now writes, tests, and optimizes your ad copy and assets — freeing you to focus on strategy.</li>
                <li id="change-4" style={{ marginBottom: '24px' }}><strong>Audience Signals & Predictive Targeting:</strong> Google’s AI predicts who’s most likely to convert, using your data and its own vast signals to target the right users at the right time.</li>
                <li id="change-5" style={{ marginBottom: '24px' }}><strong>Automated Insights & Recommendations:</strong> From budget suggestions to creative tweaks, Google’s AI now surfaces actionable insights — and even auto-applies changes if you let it.</li>
              </ol>
            </section>
            {/* Practical Tips */}
            <section id="practical-tips">
              <h2 style={{ fontSize: '28px', fontWeight: '700', color: '#1a1a1a', marginBottom: '24px', marginTop: '48px' }}>
                Practical Tips for Winning with AI
              </h2>
              <ul style={{ fontSize: '18px', color: '#374151', lineHeight: '1.8', paddingLeft: '24px', marginBottom: '40px' }}>
                <li style={{ marginBottom: '16px' }}><strong>Embrace automation, but monitor results:</strong> Don’t set and forget — review AI-driven changes weekly. <strong>Google Ads automation</strong> can save time, but human oversight is still key.</li>
                <li style={{ marginBottom: '16px' }}><strong>Feed the machine with quality data:</strong> The better your conversion tracking and audience signals, the smarter Google’s AI becomes. <strong>AI PPC strategies</strong> start with clean, actionable data.</li>
                <li style={{ marginBottom: '16px' }}><strong>Test new features early:</strong> Be a first-mover on new AI tools to gain a competitive edge.</li>
                <li style={{ marginBottom: '16px' }}><strong>Keep learning:</strong> AI in Google Ads evolves fast — stay updated with Google’s announcements and industry news.</li>
              </ul>
            </section>
            {/* Conclusion */}
            <section id="conclusion">
              <h2 style={{ fontSize: '28px', fontWeight: '700', color: '#1a1a1a', marginBottom: '24px', marginTop: '48px' }}>
                Conclusion
              </h2>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#374151', marginBottom: '32px' }}>
                AI is no longer optional in Google Ads — it’s essential. The advertisers who win in 2025 will be those who embrace automation, feed the machine with quality data, and never stop learning. Use these tips to stay ahead and turn Google’s AI into your competitive advantage.
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
                  Want to see AI in action on your account?
                </h3>
                <p style={{
                  fontSize: '17px',
                  color: 'white',
                  marginBottom: '28px',
                  lineHeight: '1.6',
                  fontWeight: '500',
                  opacity: 0.9
                }}>
                  Chat with our smart assistant — and get instant, personalized insights for your campaigns.
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
                  Run My AI Audit
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