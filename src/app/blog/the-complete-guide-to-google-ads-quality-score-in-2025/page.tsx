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
    "headline": "The Complete Guide to Google Ads Quality Score in 2025",
    "description": "Master the fundamentals of Quality Score and learn advanced techniques to improve your ad performance.",
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
    "datePublished": "2025-07-21T00:00:00.000Z",
    "dateModified": "2025-07-21T00:00:00.000Z",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://kampaio.com/blog/the-complete-guide-to-google-ads-quality-score-in-2025"
    },
    "keywords": "Google Ads Quality Score, Quality Score 2025, Google Ads optimization, ad performance, PPC tips, advanced PPC"
  };

  const tableOfContents = [
    { id: 'introduction', title: 'Introduction', level: 1 },
    { id: 'what-is-quality-score', title: 'What is Google Ads Quality Score?', level: 2 },
    { id: 'components', title: 'Key Components of Quality Score', level: 2 },
    { id: 'improving', title: 'How to Improve Your Quality Score', level: 2 },
    { id: 'advanced', title: 'Advanced Techniques for 2025', level: 2 },
    { id: 'practical-tips', title: 'Practical Tips & Common Mistakes', level: 2 },
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
              Google Ads
            </div>
            {/* Title */}
            <h1 style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: '800', color: '#1e293b', marginBottom: '24px', lineHeight: '1.2' }}>
            The Complete Guide to Google Ads Quality Score in 2025            </h1>
            {/* Subtitle */}
            <p style={{ fontSize: '20px', color: '#64748b', marginBottom: '32px', lineHeight: '1.6', fontWeight: '500' }}>
              Master the fundamentals of Quality Score and learn advanced techniques to improve your ad performance.
            </p>
            {/* Meta Info */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '40px', paddingBottom: '32px', borderBottom: '1px solid #e5e7eb' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: '600', fontSize: '16px' }}>
                  K
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '2px' }}>
                  <span style={{ color: '#64748b', fontSize: '16px', fontWeight: 600 }}>by Emily Carter</span>
                  <span style={{ color: '#64748b', fontSize: '15px' }}>Paid Media Strategist at Kampaio</span>
                  <span style={{ color: '#64748b', fontSize: '15px' }}>July 21, 2025 · 12 min read</span>
                </div>
              </div>
            </div>
            {/* Table of Contents Toggle */}
            <div style={{ background: '#f8fafc', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px', marginBottom: '40px' }}>
              <button
                onClick={() => setIsTableOfContentsOpen(!isTableOfContentsOpen)}
                style={{ background: 'none', border: 'none', fontSize: '18px', fontWeight: '600', color: '#1e293b', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', width: '100%', justifyContent: 'space-between' }}
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
                      style={{ padding: '8px 0', paddingLeft: `${(item.level - 1) * 20}px`, cursor: 'pointer', color: '#64748b', fontSize: '16px', lineHeight: '1.4', borderBottom: '1px solid transparent', transition: 'all 0.2s ease' }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = '#764ba2';
                        e.currentTarget.style.borderBottomColor = '#764ba2';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = '#64748b';
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
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' }}>
                Quality Score is one of the most important — and misunderstood — factors in Google Ads. In this comprehensive guide, you'll learn what Quality Score really is, how it's calculated, and the proven strategies top advertisers use to boost their scores and lower costs in 2025.
              </p>
            </section>
            {/* What is Quality Score */}
            <section id="what-is-quality-score">
              <h2 style={{ fontSize: '28px', fontWeight: '700', color: '#1e293b', marginBottom: '24px', marginTop: '48px' }}>
                What is Google Ads Quality Score?
              </h2>
              <p style={{ fontSize: '18px', color: '#1e293b', lineHeight: '1.8', marginBottom: '24px' }}>
                Quality Score is Google's rating of the relevance and quality of your keywords, ads, and landing pages. It's reported on a 1–10 scale and directly impacts your ad rank and cost per click (CPC).
              </p>
              {/* WOW Quality Score Diagram */}
              <div style={{ textAlign: 'center', margin: '32px 0' }}>
                <svg width="400" height="180" viewBox="0 0 400 180" style={{ maxWidth: '100%' }}>
                  <defs>
                    <linearGradient id="qscore-bg" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#667eea"/>
                      <stop offset="100%" stopColor="#764ba2"/>
                    </linearGradient>
                  </defs>
                  <ellipse cx="200" cy="80" rx="90" ry="40" fill="url(#qscore-bg)" />
                  <text x="200" y="90" textAnchor="middle" fontSize="24" fontWeight="bold" fill="#1e293b">Quality Score</text>
                  {/* CTR */}
                  <g>
                    <rect x="40" y="140" width="80" height="32" rx="10" fill="#e0e7ff" />
                    <text x="80" y="162" textAnchor="middle" fontSize="15" fill="#3730a3">CTR</text>
                    <circle cx="80" cy="135" r="12" fill="#764ba2" />
                    <text x="80" y="140" textAnchor="middle" fontSize="13" fill="white" fontWeight="bold">%</text>
                    <polyline points="80,135 80,120 200,120 200,120" fill="none" stroke="#764ba2" strokeWidth="2"/>
                  </g>
                  {/* Ad Relevance */}
                  <g>
                    <rect x="160" y="140" width="80" height="32" rx="10" fill="#e0e7ff" />
                    <text x="200" y="162" textAnchor="middle" fontSize="15" fill="#3730a3">Ad Relevance</text>
                    <rect x="200" y="135" width="16" height="16" rx="3" fill="#764ba2" />
                    <text x="208" y="147" textAnchor="middle" fontSize="13" fill="white" fontWeight="bold">Ad</text>
                    <polyline points="200,135 200,120" fill="none" stroke="#764ba2" strokeWidth="2"/>
                  </g>
                  {/* Landing Page */}
                  <g>
                    <rect x="280" y="140" width="80" height="32" rx="10" fill="#e0e7ff" />
                    <text x="320" y="162" textAnchor="middle" fontSize="15" fill="#3730a3">Landing Page</text>
                    <rect x="320" y="135" width="18" height="12" rx="2" fill="#764ba2" />
                    <rect x="322" y="137" width="14" height="8" rx="1" fill="white" />
                    <polyline points="320,135 320,120 200,120" fill="none" stroke="#764ba2" strokeWidth="2"/>
                  </g>
                </svg>
                <div style={{ fontSize: '14px', color: '#64748b', marginTop: '8px' }}>
                  Quality Score components: CTR, Ad Relevance, Landing Page Experience
                </div>
              </div>
            </section>
            {/* Components */}
            <section id="components">
              <h2 style={{ fontSize: '28px', fontWeight: '700', color: '#1e293b', marginBottom: '24px', marginTop: '48px' }}>
                Key Components of Quality Score
              </h2>
              <ul style={{ fontSize: '18px', color: '#1e293b', lineHeight: '1.8', paddingLeft: '24px', marginBottom: '32px' }}>
                <li style={{ marginBottom: '16px' }}><strong>Expected Click-Through Rate (CTR):</strong> How likely your ad is to be clicked when shown.</li>
                <li style={{ marginBottom: '16px' }}><strong>Ad Relevance:</strong> How closely your ad matches the intent behind a user’s search.</li>
                <li style={{ marginBottom: '16px' }}><strong>Landing Page Experience:</strong> How relevant and useful your landing page is to people who click your ad.</li>
              </ul>
              {/* Good vs Bad Ad Example (WOW) */}
              <div style={{ display: 'flex', justifyContent: 'center', gap: '32px', margin: '32px 0' }}>
                {/* Good Ad */}
                <div style={{ textAlign: 'center' }}>
                  <svg width="200" height="90" viewBox="0 0 200 90" style={{ maxWidth: '100%' }}>
                    <rect x="10" y="10" width="180" height="70" rx="12" fill="#d1fae5" />
                    <text x="100" y="35" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#047857">Good Ad</text>
                    <text x="100" y="55" textAnchor="middle" fontSize="13" fill="#047857">Buy PPC Software - Free Trial</text>
                    <text x="100" y="70" textAnchor="middle" fontSize="12" fill="#047857">Clear, relevant, strong CTA</text>
                    <circle cx="180" cy="20" r="10" fill="#10b981" />
                    <text x="180" y="25" textAnchor="middle" fontSize="16" fill="white" fontWeight="bold">✓</text>
                  </svg>
                  <div style={{ fontSize: '13px', color: '#047857', marginTop: '4px' }}>High QS</div>
                </div>
                {/* Bad Ad */}
                <div style={{ textAlign: 'center' }}>
                  <svg width="200" height="90" viewBox="0 0 200 90" style={{ maxWidth: '100%' }}>
                    <rect x="10" y="10" width="180" height="70" rx="12" fill="#fee2e2" />
                    <text x="100" y="35" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#b91c1c">Bad Ad</text>
                    <text x="100" y="55" textAnchor="middle" fontSize="13" fill="#b91c1c">Best Prices Online</text>
                    <text x="100" y="70" textAnchor="middle" fontSize="12" fill="#b91c1c">Generic, not relevant, weak CTA</text>
                    <circle cx="180" cy="20" r="10" fill="#ef4444" />
                    <text x="180" y="25" textAnchor="middle" fontSize="16" fill="white" fontWeight="bold">✗</text>
                  </svg>
                  <div style={{ fontSize: '13px', color: '#b91c1c', marginTop: '4px' }}>Low QS</div>
                </div>
              </div>
            </section>
            {/* Improving Quality Score */}
            <section id="improving">
              <h2 style={{ fontSize: '28px', fontWeight: '700', color: '#1e293b', marginBottom: '24px', marginTop: '48px' }}>
                How to Improve Your Quality Score
              </h2>
              <ul style={{ fontSize: '18px', color: '#1e293b', lineHeight: '1.8', paddingLeft: '24px', marginBottom: '32px' }}>
                <li style={{ marginBottom: '16px' }}><strong>Group keywords by theme:</strong> Create tightly themed ad groups for higher relevance.</li>
                <li style={{ marginBottom: '16px' }}><strong>Write compelling, relevant ads:</strong> Match ad copy to keywords and user intent.</li>
                <li style={{ marginBottom: '16px' }}><strong>Optimize landing pages:</strong> Ensure fast load times, mobile-friendliness, and clear calls to action.</li>
                <li style={{ marginBottom: '16px' }}><strong>Use all available ad extensions:</strong> Sitelinks, callouts, and structured snippets can boost CTR and relevance.</li>
                <li style={{ marginBottom: '16px' }}><strong>Monitor and test regularly:</strong> Track Quality Score changes and test new ideas to keep improving.</li>
              </ul>
            </section>
            {/* Advanced Techniques */}
            <section id="advanced">
              <h2 style={{ fontSize: '28px', fontWeight: '700', color: '#1e293b', marginBottom: '24px', marginTop: '48px' }}>
                Advanced Techniques for 2025
              </h2>
              <ul style={{ fontSize: '18px', color: '#1e293b', lineHeight: '1.8', paddingLeft: '24px', marginBottom: '32px' }}>
                <li style={{ marginBottom: '16px' }}><strong>Leverage AI for ad copy and landing page optimization:</strong> Use machine learning tools to personalize and test at scale.</li>
                <li style={{ marginBottom: '16px' }}><strong>Automate negative keyword management:</strong> Prevent irrelevant clicks and wasted spend.</li>
                <li style={{ marginBottom: '16px' }}><strong>Analyze competitor Quality Scores:</strong> Benchmark and find new opportunities.</li>
                <li style={{ marginBottom: '16px' }}><strong>Integrate offline conversion data:</strong> Give Google more signals for smarter bidding and relevance.</li>
              </ul>
            </section>
            {/* Practical Tips & Common Mistakes */}
            <section id="practical-tips">
              <h2 style={{ fontSize: '28px', fontWeight: '700', color: '#1e293b', marginBottom: '24px', marginTop: '48px' }}>
                Practical Tips & Common Mistakes
              </h2>
              <ul style={{ fontSize: '18px', color: '#1e293b', lineHeight: '1.8', paddingLeft: '24px', marginBottom: '40px' }}>
                <li style={{ marginBottom: '16px' }}><strong>Don’t chase 10/10 for every keyword:</strong> Focus on high-value terms and business impact.</li>
                <li style={{ marginBottom: '16px' }}><strong>Don’t ignore landing page experience:</strong> It’s often the biggest lever for improvement.</li>
                <li style={{ marginBottom: '16px' }}><strong>Don’t set and forget:</strong> Quality Score is dynamic — keep optimizing.</li>
              </ul>
            </section>
            {/* Conclusion */}
            <section id="conclusion">
              <h2 style={{ fontSize: '28px', fontWeight: '700', color: '#1e293b', marginBottom: '24px', marginTop: '48px' }}>
                Conclusion
              </h2>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#1e293b', marginBottom: '32px' }}>
                Mastering Quality Score is one of the fastest ways to lower costs and boost results in Google Ads. By applying the fundamentals and advanced techniques in this guide, you’ll be ahead of the competition in 2025 and beyond.
              </p>
              <div style={{
                background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
                borderRadius: '16px',
                padding: '40px',
                textAlign: 'center',
                marginTop: '60px',
                marginBottom: '40px'
              }}>
                <h3 style={{
                  fontSize: '22px',
                  fontWeight: '700',
                  color: '#1e293b',
                  marginBottom: '18px',
                  lineHeight: '1.3'
                }}>
                  Want to see how your Quality Score stacks up?
                </h3>
                <p style={{
                  fontSize: '17px',
                  color: '#64748b',
                  marginBottom: '28px',
                  lineHeight: '1.6',
                  fontWeight: '500',
                  opacity: 0.9
                }}>
                  Get a free AI-powered audit of your Google Ads account and discover actionable ways to improve your Quality Score and lower costs.
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
                  Get My Free Audit
                </a>
              </div>
            </section>
          </div>
        </div>
        <Footer compact={true} />
      </div>
    </>
  );
} 