import React from 'react'
import type { Metadata } from 'next'
import Breadcrumbs from '@/components/Breadcrumbs'

export const metadata: Metadata = {
  title: 'Analytics Services | PPCSet',
  description: 'Professional analytics and reporting services. Get data-driven insights, automated reporting, and performance optimization for your business growth.',
  keywords: 'analytics, reporting, data insights, performance optimization, business intelligence, PPCSet',
  authors: [{ name: 'PPCSet' }],
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    url: 'https://ppcset.com/analytics',
    title: 'Analytics Services | PPCSet',
    description: 'Professional analytics and reporting services. Get data-driven insights, automated reporting, and performance optimization for your business growth.',
    images: [
      {
        url: 'https://ppcset.com/logo.png',
        width: 1200,
        height: 630,
        alt: 'PPCSet Logo',
      },
    ],
    siteName: 'PPCSet',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    url: 'https://ppcset.com/analytics',
    title: 'Analytics Services | PPCSet',
    description: 'Professional analytics and reporting services. Get data-driven insights, automated reporting, and performance optimization for your business growth.',
    images: ['https://ppcset.com/logo.png'],
  },
  alternates: {
    canonical: 'https://ppcset.com/analytics',
  },
}

export default function AnalyticsPage() {
  const scrollToContact = () => {
    const contactSection = document.getElementById('contact')
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <Breadcrumbs />
      
      <section className="professional-hero">
        <div className="container">
          <div className="professional-hero-grid">
            <div className="professional-hero-main">
              <h1 className="professional-hero-title">Data-Driven Business Growth</h1>
              <p className="professional-hero-subtitle">Transform your data into actionable insights and automated reporting</p>
              <div className="professional-btn-group">
                <button className="professional-btn premium-gradient-btn" onClick={scrollToContact}>
                  <svg className="btn-calendar-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ verticalAlign: 'middle', marginRight: '10px' }}>
                    <rect x="3" y="5" width="14" height="12" rx="3" fill="#23272f"/>
                    <path d="M3 8.5H17" stroke="#23272f" strokeWidth="1.5" strokeLinecap="round"/>
                    <rect x="7" y="11" width="2" height="2" rx="1" fill="#fff"/>
                    <rect x="11" y="11" width="2" height="2" rx="1" fill="#fff"/>
                  </svg>
                  Get Started
                </button>
              </div>
            </div>
            
            <div className="professional-hero-cards">
              <div className="professional-mini-card">
                <div className="professional-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 3V21H21" />
                    <path d="M9 9L12 6L16 10L21 5" />
                  </svg>
                </div>
                <h3>Performance Insights</h3>
                <p>Get clear, actionable insights from your data to drive business decisions</p>
              </div>
              <div className="professional-mini-card">
                <div className="professional-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" />
                  </svg>
                </div>
                <h3>Automated Reporting</h3>
                <p>Save time with automated reports that deliver insights when you need them</p>
              </div>
              <div className="professional-mini-card">
                <div className="professional-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="3"/>
                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-1.82-.33l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h.09a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51h.09a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82 1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
                  </svg>
                </div>
                <h3>Optimization</h3>
                <p>Continuously optimize your campaigns and strategies based on data insights</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Block */}
      <section id="services" className="professional-problems-section">
        <div className="container">
          <div className="professional-section-header">
            <h2>Analytics Services for Business Growth</h2>
            <p>Transform your data into actionable insights and automated reporting solutions</p>
          </div>
          <div className="professional-problems-grid">
            <div className="professional-problem-card">
              <div className="professional-problem-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 3V21H21" />
                  <path d="M9 9L12 6L16 10L21 5" />
                </svg>
              </div>
              <h3>Performance Analytics</h3>
              <p>Track and analyze your business performance with comprehensive reporting</p>
            </div>
            <div className="professional-problem-card">
              <div className="professional-problem-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" />
                </svg>
              </div>
              <h3>Automated Reporting</h3>
              <p>Save time with automated reports that deliver insights when you need them</p>
            </div>
            <div className="professional-problem-card">
              <div className="professional-problem-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="3"/>
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-1.82-.33l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h.09a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51h.09a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82 1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
                </svg>
              </div>
              <h3>Data Optimization</h3>
              <p>Optimize your campaigns and strategies based on comprehensive data analysis</p>
            </div>
            <div className="professional-problem-card">
              <div className="professional-problem-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <ellipse cx="12" cy="5" rx="9" ry="3"/>
                  <path d="M3 5v14a9 3 0 0 0 18 0V5"/>
                  <path d="M3 12a9 3 0 0 0 18 0"/>
                </svg>
              </div>
              <h3>Data Integration</h3>
              <p>Connect and unify data from multiple sources for comprehensive insights</p>
            </div>
            <div className="professional-problem-card">
              <div className="professional-problem-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="6" cy="6" r="3"/>
                  <circle cx="6" cy="18" r="3"/>
                  <circle cx="18" cy="12" r="3"/>
                  <path d="M6 9v6a6 6 0 0 0 6 6h0a6 6 0 0 0 6-6V9"/>
                </svg>
              </div>
              <h3>Custom Dashboards</h3>
              <p>Get personalized dashboards that show exactly what matters to your business</p>
            </div>
          </div>
        </div>
      </section>

      {/* Schema.org Service */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Analytics Services by PPCSet",
            "description": "Professional analytics and reporting services. Get data-driven insights, automated reporting, and performance optimization for your business growth.",
            "url": "https://ppcset.com/analytics",
            "provider": {
              "@type": "Organization",
              "name": "PPCSet",
              "url": "https://ppcset.com",
              "logo": "https://ppcset.com/logo.png"
            },
            "serviceType": "Analytics and Reporting",
            "areaServed": "Worldwide",
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Analytics Services",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Performance Analytics"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Automated Reporting"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Data Optimization"
                  }
                }
              ]
            }
          })
        }}
      />
    </>
  )
} 