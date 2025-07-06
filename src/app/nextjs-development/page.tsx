import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ContactForm from '@/components/ContactForm'

export const metadata: Metadata = {
  title: 'Next.js Development Services | PPCSet',
  description: 'Professional Next.js development services: full-stack web apps, e-commerce, API routes, PWA, and SEO-optimized solutions. Get expert Next.js consulting and agile delivery from PPCSet.',
  keywords: 'Next.js development, Next.js services, web app development, e-commerce, PWA, API routes, SEO optimization, React, PPCSet',
  authors: [{ name: 'PPCSet' }],
  robots: 'index, follow',
  alternates: {
    canonical: 'https://ppcset.com/nextjs-development'
  },
  openGraph: {
    type: 'website',
    url: 'https://ppcset.com/nextjs-development',
    title: 'Next.js Development Services | PPCSet',
    description: 'Professional Next.js development services: full-stack web apps, e-commerce, API routes, PWA, and SEO-optimized solutions. Get expert Next.js consulting and agile delivery from PPCSet.',
    images: ['https://ppcset.com/logo.png'],
    siteName: 'PPCSet',
    locale: 'en_US'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Next.js Development Services | PPCSet',
    description: 'Professional Next.js development services: full-stack web apps, e-commerce, API routes, PWA, and SEO-optimized solutions. Get expert Next.js consulting and agile delivery from PPCSet.',
    images: ['https://ppcset.com/logo.png']
  }
}

export default function NextJsDevelopmentPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Next.js Development Services by PPCSet",
            "description": "Professional Next.js development services: full-stack web apps, e-commerce, API routes, PWA, and SEO-optimized solutions.",
            "url": "https://ppcset.com/nextjs-development",
            "applicationCategory": "BusinessApplication",
            "operatingSystem": "Web",
            "provider": {
              "@type": "Organization",
              "name": "PPCSet",
              "url": "https://ppcset.com",
              "logo": "https://ppcset.com/logo.png"
            },
            "featureList": [
              "Full-stack Next.js web apps",
              "E-commerce platforms",
              "API routes",
              "Progressive Web Apps (PWA)",
              "SEO optimization",
              "Agile delivery"
            ]
          })
        }}
      />
      
      <Header />
      
      {/* Hero Section */}
      <section className="professional-hero">
        <div className="container">
          <div className="professional-hero-grid">
            <div className="professional-hero-main">
              <h1 className="professional-hero-title">Business-Driven Next.js Solutions</h1>
              <p className="professional-hero-subtitle">Build lightning-fast, SEO-optimized, and scalable web products with Next.js</p>
              <div className="professional-btn-group">
                <a href="#contact" className="professional-btn premium-gradient-btn">
                  <svg className="btn-calendar-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" style={{verticalAlign: 'middle', marginRight: '10px'}} aria-hidden="true" focusable="false">
                    <rect x="3" y="5" width="14" height="12" rx="3" fill="#23272f"/>
                    <path d="M3 8.5H17" stroke="#23272f" strokeWidth="1.5" strokeLinecap="round"/>
                    <rect x="7" y="11" width="2" height="2" rx="1" fill="#fff"/>
                    <rect x="11" y="11" width="2" height="2" rx="1" fill="#fff"/>
                  </svg>
                  Get Started
                </a>
              </div>
            </div>
            
            <div className="professional-hero-cards">
              <div className="professional-mini-card">
                <div className="professional-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
                    <polygon points="13 2 2 14 12 14 11 22 22 10 12 10 13 2"/>
                  </svg>
                </div>
                <h3>Blazing Performance</h3>
                <p>Deliver instant load times and smooth user experiences for every device</p>
              </div>
              <div className="professional-mini-card">
                <div className="professional-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
                    <path d="M3 17L9 11 13 15 21 7"/>
                    <path d="M14 7h7v7"/>
                  </svg>
                </div>
                <h3>SEO & Visibility</h3>
                <p>Outrank competitors with server-side rendering and advanced SEO features</p>
              </div>
              <div className="professional-mini-card">
                <div className="professional-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
                    <circle cx="12" cy="12" r="3"/>
                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h.09a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51h.09a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82 1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
                  </svg>
                </div>
                <h3>Seamless Integrations</h3>
                <p>Connect APIs, headless CMS, and cloud services for a unified digital platform</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="professional-problems-section">
        <div className="container">
          <div className="professional-section-header">
            <h2>Next.js Services for Business Growth</h2>
            <p>Unlock new opportunities with high-performance, scalable, and SEO-optimized Next.js solutions</p>
          </div>
          <div className="professional-problems-grid">
            <div className="professional-problem-card">
              <div className="professional-problem-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
                  <rect x="3" y="4" width="18" height="16" rx="2"/>
                  <path d="M8 2v4M16 2v4"/>
                </svg>
              </div>
              <h3>Server-Side Rendering (SSR) & Static Generation (SSG)</h3>
              <p>Deliver blazing-fast, SEO-friendly pages for every user</p>
            </div>
            <div className="professional-problem-card">
              <div className="professional-problem-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
                  <rect x="3" y="7" width="18" height="13" rx="2"/>
                  <path d="M16 3v4M8 3v4"/>
                </svg>
              </div>
              <h3>Headless CMS Integration</h3>
              <p>Seamlessly connect with Contentful, Sanity, Strapi, and more</p>
            </div>
            <div className="professional-problem-card">
              <div className="professional-problem-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
                  <circle cx="9" cy="21" r="1"/>
                  <circle cx="20" cy="21" r="1"/>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                </svg>
              </div>
              <h3>eCommerce Solutions</h3>
              <p>Build modern, scalable online stores with Next.js and top platforms</p>
            </div>
            <div className="professional-problem-card">
              <div className="professional-problem-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
                  <circle cx="12" cy="12" r="3"/>
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h.09a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51h.09a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82 1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
                </svg>
              </div>
              <h3>API Development & Integration</h3>
              <p>Create robust APIs and connect any third-party service</p>
            </div>
            <div className="professional-problem-card">
              <div className="professional-problem-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
                  <path d="M21 13.5A8.38 8.38 0 0 1 12 21a8.38 8.38 0 0 1-9-7.5C3 7.11 7.58 2.5 13 2.5a8.38 8.38 0 0 1 8 8.5z"/>
                  <path d="M12 8v4l3 3"/>
                </svg>
              </div>
              <h3>Performance Optimization</h3>
              <p>Maximize speed, Core Web Vitals, and user experience</p>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="professional-process-section">
        <div className="container">
          <div className="professional-section-header">
            <h2>Development Process</h2>
            <p>Our proven methodology for delivering high-quality Next.js applications</p>
          </div>
          <div className="professional-process-grid">
            <div className="professional-process-step">
              <div className="professional-process-number">01</div>
              <h3>Discovery & Planning</h3>
              <p>Understanding your requirements, technical architecture planning, and project roadmap creation</p>
            </div>
            <div className="professional-process-step">
              <div className="professional-process-number">02</div>
              <h3>Design & Prototyping</h3>
              <p>UI/UX design, component architecture, and interactive prototypes for validation</p>
            </div>
            <div className="professional-process-step">
              <div className="professional-process-number">03</div>
              <h3>Development</h3>
              <p>Agile development with Next.js, modern React patterns, and best practices implementation</p>
            </div>
            <div className="professional-process-step">
              <div className="professional-process-number">04</div>
              <h3>Testing & Quality</h3>
              <p>Comprehensive testing, performance optimization, and quality assurance</p>
            </div>
            <div className="professional-process-step">
              <div className="professional-process-number">05</div>
              <h3>Deployment</h3>
              <p>Production deployment, CI/CD setup, and monitoring configuration</p>
            </div>
            <div className="professional-process-step">
              <div className="professional-process-number">06</div>
              <h3>Support & Maintenance</h3>
              <p>Ongoing support, updates, and maintenance to ensure optimal performance</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <ContactForm 
        title="Ready to Start Your Next.js Project?"
        description="Let's discuss your project requirements and create a custom solution that drives results."
        features={[
          { text: "Free consultation and project estimation" },
          { text: "Modern Next.js architecture and best practices" },
          { text: "Performance optimization and SEO focus" },
          { text: "Ongoing support and maintenance" }
        ]}
      />

      <Footer />
    </>
  )
}

 