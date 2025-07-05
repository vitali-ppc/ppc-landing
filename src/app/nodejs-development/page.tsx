import React from 'react'
import type { Metadata } from 'next'
import Breadcrumbs from '@/components/Breadcrumbs'

export const metadata: Metadata = {
  title: 'Node.js Development Services | PPCSet',
  description: 'Professional Node.js development services: full-stack web apps, APIs, real-time solutions, and scalable business platforms. Get expert Node.js consulting and agile delivery from PPCSet.',
  keywords: 'Node.js development, Node.js services, web app development, API development, real-time apps, scalable solutions, JavaScript, PPCSet',
  authors: [{ name: 'PPCSet' }],
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    url: 'https://ppcset.com/nodejs-development',
    title: 'Node.js Development Services | PPCSet',
    description: 'Professional Node.js development services: full-stack web apps, APIs, real-time solutions, and scalable business platforms. Get expert Node.js consulting and agile delivery from PPCSet.',
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
    url: 'https://ppcset.com/nodejs-development',
    title: 'Node.js Development Services | PPCSet',
    description: 'Professional Node.js development services: full-stack web apps, APIs, real-time solutions, and scalable business platforms. Get expert Node.js consulting and agile delivery from PPCSet.',
    images: ['https://ppcset.com/logo.png'],
  },
  alternates: {
    canonical: 'https://ppcset.com/nodejs-development',
  },
}

export default function NodeJsDevelopmentPage() {
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
              <h1 className="professional-hero-title">Business-Driven Node.js Solutions</h1>
              <p className="professional-hero-subtitle">Build fast, scalable, and future-ready products with Node.js</p>
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
                    <path d="M3 17V21H21" />
                    <rect x="7" y="13" width="3" height="5" />
                    <rect x="12" y="9" width="3" height="9" />
                    <rect x="17" y="5" width="3" height="13" />
                  </svg>
                </div>
                <h3>Scalable Design</h3>
                <p>Easily grow from MVP to enterprise — Node.js adapts as your business expands</p>
              </div>
              <div className="professional-mini-card">
                <div className="professional-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="4"/>
                    <line x1="12" y1="2" x2="12" y2="8"/>
                    <line x1="12" y1="16" x2="12" y2="22"/>
                    <line x1="2" y1="12" x2="8" y2="12"/>
                    <line x1="16" y1="12" x2="22" y2="12"/>
                    <line x1="4.93" y1="4.93" x2="9.17" y2="9.17"/>
                    <line x1="14.83" y1="14.83" x2="19.07" y2="19.07"/>
                    <line x1="14.83" y1="9.17" x2="19.07" y2="4.93"/>
                    <line x1="4.93" y1="19.07" x2="9.17" y2="14.83"/>
                  </svg>
                </div>
                <h3>Universal Platform</h3>
                <p>Build web apps, APIs, automation, and more — all in one stack</p>
              </div>
              <div className="professional-mini-card">
                <div className="professional-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10 13a5 5 0 0 1 7 7l-3 3a5 5 0 0 1-7-7"/>
                    <path d="M14 11a5 5 0 0 0-7-7l-3 3a5 5 0 0 0 7 7"/>
                  </svg>
                </div>
                <h3>Seamless Integration</h3>
                <p>Connect your apps, data, and cloud services for a unified workflow</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Block */}
      <section id="services" className="professional-problems-section">
        <div className="container">
          <div className="professional-section-header">
            <h2>Node.js Services for Business Growth</h2>
            <p>Unlock new opportunities with flexible, scalable, and integrated Node.js solutions</p>
          </div>
          <div className="professional-problems-grid">
            <div className="professional-problem-card">
              <div className="professional-problem-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 18h6"/>
                  <path d="M10 22h4"/>
                  <path d="M12 2a7 7 0 0 1 7 7c0 3.5-2.5 6-4 7.5a2 2 0 0 1-6 0C7.5 15 5 12.5 5 9a7 7 0 0 1 7-7z"/>
                </svg>
              </div>
              <h3>Custom Web Solutions</h3>
              <p>Transform your ideas into powerful digital products that drive growth and engagement</p>
            </div>
            <div className="professional-problem-card">
              <div className="professional-problem-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="13 2 13 13 17 13 7 22 11 11 7 11 13 2"/>
                </svg>
              </div>
              <h3>Real-Time Experiences</h3>
              <p>Deliver instant updates, live collaboration, and interactive features for your users</p>
            </div>
            <div className="professional-problem-card">
              <div className="professional-problem-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="3"/>
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-1.82-.33l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h.09a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51h.09a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82 1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
                </svg>
              </div>
              <h3>Automation & Efficiency</h3>
              <p>Streamline operations and save time with smart automation powered by Node.js</p>
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
              <p>Unify your business data with seamless connections to modern databases and cloud storage</p>
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
              <h3>API & Integration</h3>
              <p>Connect your business systems and automate workflows with secure, scalable APIs</p>
            </div>
          </div>
        </div>
      </section>

      {/* Schema.org SoftwareApplication */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Node.js Development Services by PPCSet",
            "description": "Professional Node.js development services: full-stack web apps, APIs, real-time solutions, and scalable business platforms.",
            "url": "https://ppcset.com/nodejs-development",
            "applicationCategory": "BusinessApplication",
            "operatingSystem": "Web",
            "provider": {
              "@type": "Organization",
              "name": "PPCSet",
              "url": "https://ppcset.com",
              "logo": "https://ppcset.com/logo.png"
            },
            "featureList": [
              "Full-stack Node.js web apps",
              "RESTful API development",
              "Real-time applications",
              "Scalable business solutions",
              "Agile delivery"
            ]
          })
        }}
      />
    </>
  )
} 