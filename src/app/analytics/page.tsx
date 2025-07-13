import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Breadcrumbs from '@/components/Breadcrumbs'
import ProfessionalContactSection from '@/components/ProfessionalContactSection'
import ScrollToTop from '@/components/ScrollToTop'

export const metadata: Metadata = {
  title: 'New Analytics for PPC — Enhanced Data & Reporting | PPCSet',
  description: 'Next-generation PPC analytics: enhanced data, custom dashboards, and actionable reporting for advertisers. Unlock deeper insights with PPCSet.',
  keywords: 'new PPC analytics, enhanced PPC data, custom dashboards, PPC reporting, advertising insights, PPCSet',
  authors: [{ name: 'PPCSet' }],
  robots: 'index, follow',
  alternates: {
    canonical: 'https://ppcset.com/analytics'
  },
  openGraph: {
    type: 'website',
    url: 'https://ppcset.com/analytics',
    title: 'New Analytics for PPC — Enhanced Data & Reporting | PPCSet',
    description: 'Next-generation PPC analytics: enhanced data, custom dashboards, and actionable reporting for advertisers. Unlock deeper insights with PPCSet.',
    images: ['https://ppcset.com/logo.png'],
    siteName: 'PPCSet',
    locale: 'en_US'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'New Analytics for PPC — Enhanced Data & Reporting | PPCSet',
    description: 'Next-generation PPC analytics: enhanced data, custom dashboards, and actionable reporting for advertisers. Unlock deeper insights with PPCSet.',
    images: ['https://ppcset.com/logo.png']
  }
}

export default function AnalyticsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "PPCSet Analytics Dashboard",
            "description": "Advanced campaign analytics and AI-powered insights for data-driven PPC optimization",
            "url": "https://ppcset.com/analytics",
            "applicationCategory": "BusinessApplication",
            "operatingSystem": "Web",
            "offers": {
              "@type": "Offer",
              "availability": "PreOrder",
              "price": "0",
              "priceCurrency": "USD"
            },
            "provider": {
              "@type": "Organization",
              "name": "PPCSet",
              "url": "https://ppcset.com",
              "logo": "https://ppcset.com/logo.png",
              "sameAs": [
                "https://www.linkedin.com/in/vitali-ppc%E2%9C%94-26b294b4/"
              ]
            },
            "featureList": [
              "Real-time Analytics",
              "AI Insights",
              "Multi-Platform Integration",
              "Google Ads Analytics",
              "Meta Ads Analytics",
              "LinkedIn Ads Analytics",
              "TikTok Ads Analytics"
            ]
          })
        }}
      />
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "PPCSet",
            "url": "https://ppcset.com",
            "logo": "https://ppcset.com/logo.png",
            "description": "Professional PPC campaign management and analytics for enterprise-level results",
            "foundingDate": "2024",
            "contactPoint": {
              "@type": "ContactPoint",
              "contactType": "customer service",
              "email": "info@ppcset.com"
            },
            "sameAs": [
              "https://www.linkedin.com/in/vitali-ppc%E2%9C%94-26b294b4/"
            ]
          })
        }}
      />
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "serviceType": "New PPC Analytics",
            "provider": {
              "@type": "Organization",
              "name": "PPCSet"
            },
            "areaServed": "Worldwide",
            "description": "Next-generation PPC analytics: enhanced data, custom dashboards, and actionable reporting for advertisers."
          })
        }}
      />
      
      <Header />
      <Breadcrumbs />
      
      {/* Coming Soon Hero Section */}
      <section className="professional-hero">
        <div className="container">
          <div className="professional-hero-grid">
            <div className="professional-hero-main">
              {/* Мінімалістичний сірий варіант */}
              <div className="coming-soon-badge-minimal">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>Coming Soon</span>
              </div>

              <h1 className="professional-hero-title">Analytics Dashboard</h1>
              <p className="professional-hero-subtitle">Advanced campaign analytics and AI-powered insights for data-driven PPC optimization</p>
              <div className="professional-btn-group">
                <a href="#contact" className="professional-btn">Get Early Access</a>
              </div>
            </div>
            
            <div className="professional-hero-cards">
              <div className="professional-mini-card">
                <div className="professional-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 3V21H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M9 9L12 6L16 10L21 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3>Real-time Analytics</h3>
                <p>Live campaign performance monitoring with instant updates</p>
              </div>
              <div className="professional-mini-card">
                <div className="professional-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-7.73A2 2 0 1 1 19 12H2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3>AI Insights</h3>
                <p>Machine learning recommendations for campaign optimization</p>
              </div>
              <div className="professional-mini-card">
                <div className="professional-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3>Multi-Platform</h3>
                <p>Google Ads, Meta, LinkedIn, and TikTok integration</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <ProfessionalContactSection 
        title="Get Early Access"
        description="Be among the first to experience our advanced analytics platform"
      />
      
      <Footer compact={true} />
      
      <ScrollToTop />
    </>
  )
} 