import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Breadcrumbs from '@/components/Breadcrumbs'
import ScrollToTop from '@/components/ScrollToTop'
import ModernPPCContactForm from '@/components/ModernPPCContactForm'

export const metadata: Metadata = {
  title: 'PPC / AI Agency — PPCSet',
  description: 'PPCSet — AI-powered PPC agency. Professional campaign management, analytics, Google Ads, Meta, LinkedIn, and digital strategy for business growth.',
  keywords: 'PPC agency, AI PPC, digital marketing, Google Ads, Meta Ads, LinkedIn Ads, analytics, campaign management, PPCSet',
  authors: [{ name: 'PPCSet' }],
  robots: 'index, follow',
  alternates: {
    canonical: 'https://ppcset.com/'
  },
  openGraph: {
    type: 'website',
    url: 'https://ppcset.com/',
    title: 'PPC / AI Agency — PPCSet',
    description: 'PPCSet — AI-powered PPC agency. Professional campaign management, analytics, Google Ads, Meta, LinkedIn, and digital strategy for business growth.',
    images: ['https://ppcset.com/logo.png'],
    siteName: 'PPCSet',
    locale: 'en_US'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PPC / AI Agency — PPCSet',
    description: 'PPCSet — AI-powered PPC agency. Professional campaign management, analytics, Google Ads, Meta, LinkedIn, and digital strategy for business growth.',
    images: ['https://ppcset.com/logo.png']
  }
}

export default function ModernPPCPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "PPCSet",
            "url": "https://ppcset.com/",
            "logo": "https://ppcset.com/logo.png",
            "sameAs": [
              "https://www.linkedin.com/company/ppcset/"
            ]
          })
        }}
      />
      
      <Header />
      <Breadcrumbs />
      
      {/* Hero Section */}
      <section className="neo-hero-variant-2 neo-hero-blue">
        <div className="container">
          <div className="neo-hero-grid">
            <div className="neo-hero-main">
              <h1 className="neo-hero-title">PPC Expert</h1>
              <p className="neo-hero-subtitle">Professional campaign management with AI</p>
              <div className="neo-btn-group">
                <a href="#contact" className="neo-btn neo-btn-primary">Start Collaboration</a>
              </div>
            </div>
            
            <div className="neo-hero-cards">
              <div className="neo-mini-card">
                <div className="neo-mini-icon">🚀</div>
                <h3>Speed</h3>
                <p>Instant ad copy generation</p>
              </div>
              <div className="neo-mini-card">
                <div className="neo-mini-icon">🎯</div>
                <h3>Accuracy</h3>
                <p>Precise settings for maximum efficiency</p>
              </div>
              <div className="neo-mini-card">
                <div className="neo-mini-icon">📈</div>
                <h3>Results</h3>
                <p>Increased conversions and reduced costs</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Client Problems Block */}
      <section id="problems" className="ppc-problems-section">
        <div className="container">
          <div className="ppc-section-header">
            <h2>Problems I Solve</h2>
            <p>I understand the challenges faced by entrepreneurs and marketing directors</p>
          </div>
          <div className="problems-grid">
            <div className="problem-card">
              <div className="problem-icon">🎯</div>
              <h3>Need for an Expert</h3>
              <p>Specialist required for relaunch and optimization of paid advertising strategy for B2B and B2C</p>
            </div>
            <div className="problem-card">
              <div className="problem-icon">📊</div>
              <h3>Lack of Analytics</h3>
              <p>Highly analytical and proactive people needed for strategic decisions</p>
            </div>
            <div className="problem-card">
              <div className="problem-icon">🔄</div>
              <h3>Continuous Optimization</h3>
              <p>Constant campaign optimization to attract qualified leads</p>
            </div>
            <div className="problem-card">
              <div className="problem-icon">🎯</div>
              <h3>Business Goals</h3>
              <p>Alignment of advertising efforts with overall business objectives is required</p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Responsibilities Block */}
      <section id="responsibilities" className="ppc-responsibilities-section">
        <div className="container">
          <div className="ppc-section-header">
            <h2>Key Responsibilities</h2>
            <p>Comprehensive approach to managing your advertising campaigns</p>
          </div>
          <div className="responsibilities-grid">
            <div className="responsibility-card">
              <div className="responsibility-number">01</div>
              <h3>PPC Strategy</h3>
              <p>Development and implementation of a comprehensive strategy tailored to your services and business goals</p>
            </div>
            <div className="responsibility-card">
              <div className="responsibility-number">02</div>
              <h3>Campaign Planning</h3>
              <p>Proactive participation in marketing campaign planning with a strategic approach</p>
            </div>
            <div className="responsibility-card">
              <div className="responsibility-number">03</div>
              <h3>Campaign Management</h3>
              <p>Independent structuring and strategic decision-making regarding formats, targeting, and budgeting</p>
            </div>
            <div className="responsibility-card">
              <div className="responsibility-number">04</div>
              <h3>Performance Optimization</h3>
              <p>Continuous optimization focused on reducing CPL and improving ROI</p>
            </div>
            <div className="responsibility-card">
              <div className="responsibility-number">05</div>
              <h3>Remarketing</h3>
              <p>Launch and management of remarketing campaigns for re-engagement and increased conversions</p>
            </div>
            <div className="responsibility-card">
              <div className="responsibility-number">06</div>
              <h3>Analytics & Reporting</h3>
              <p>Analysis of performance metrics and data utilization for strategy improvement</p>
            </div>
          </div>
        </div>
      </section>

      {/* Experience & Expertise Block */}
      <section id="experience" className="ppc-experience-section">
        <div className="container">
          <div className="ppc-section-header">
            <h2>Experience & Expertise</h2>
            <p>Professional approach with proven results</p>
          </div>
          <div className="experience-grid">
            <div className="experience-card">
              <div className="experience-icon">⏰</div>
              <h3>5+ Years of Experience</h3>
              <p>Practical experience managing PPC campaigns in B2B and B2C segments</p>
            </div>
            <div className="experience-card">
              <div className="experience-icon">🔧</div>
              <h3>Technical Expertise</h3>
              <p>Deep knowledge of Google Ads, Google Analytics, Meta, and LinkedIn Ads</p>
            </div>
            <div className="experience-card">
              <div className="experience-icon">📈</div>
              <h3>Analytics</h3>
              <p>Experience with remarketing campaigns and audience segmentation</p>
            </div>
            <div className="experience-card">
              <div className="experience-icon">🎯</div>
              <h3>Conversions</h3>
              <p>Deep understanding of advertising performance metrics and conversion tracking</p>
            </div>
            <div className="experience-card">
              <div className="experience-icon">📊</div>
              <h3>Business Analytics</h3>
              <p>Skills in using Looker Studio, Power BI for reporting and analysis</p>
            </div>
            <div className="experience-card">
              <div className="experience-icon">💰</div>
              <h3>Results</h3>
              <p>Proven experience in reducing CPL and increasing ROI</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Block */}
      <section id="benefits" className="ppc-benefits-section">
        <div className="container">
          <div className="ppc-section-header">
            <h2>Benefits of Cooperation</h2>
            <p>Why choose this approach</p>
          </div>
          <div className="benefits-grid">
            <div className="benefit-card">
              <div className="benefit-icon">🚀</div>
              <h3>Quick Start</h3>
              <p>Fast strategy implementation and campaign launch</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">📊</div>
              <h3>Transparency</h3>
              <p>Full transparency with detailed reports and analytics</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">🎯</div>
              <h3>Goal-Oriented</h3>
              <p>Focus on achieving your specific business goals</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">🔄</div>
              <h3>Continuous Optimization</h3>
              <p>Ongoing work to improve campaign effectiveness</p>
            </div>
          </div>
        </div>
      </section>

      {/* Work Process Block */}
      <section id="process" className="ppc-process-section">
        <div className="container">
          <div className="ppc-section-header">
            <h2>Work Process</h2>
            <p>How we achieve results together</p>
          </div>
          <div className="process-timeline">
            <div className="process-step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h3>Current Situation Analysis</h3>
                <p>Detailed analysis of your existing campaigns and identification of growth points</p>
              </div>
            </div>
            <div className="process-step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h3>Strategy Development</h3>
                <p>Creation of a comprehensive strategy tailored to your business goals</p>
              </div>
            </div>
            <div className="process-step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h3>Implementation & Launch</h3>
                <p>Technical implementation of the strategy and launch of optimized campaigns</p>
              </div>
            </div>
            <div className="process-step">
              <div className="step-number">4</div>
              <div className="step-content">
                <h3>Monitoring & Optimization</h3>
                <p>Continuous monitoring and optimization to achieve goals</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Results Block */}
      <section id="results" className="ppc-results-section">
        <div className="container">
          <div className="ppc-section-header">
            <h2>Results & Cases</h2>
            <p>Proven results with clients</p>
          </div>
          <div className="results-grid">
            <div className="result-card">
              <div className="result-metric">
                <span className="result-number">-40%</span>
                <span className="result-label">CPL Reduction</span>
              </div>
              <p>Average cost per lead reduced by 40%</p>
            </div>
            <div className="result-card">
              <div className="result-metric">
                <span className="result-number">+150%</span>
                <span className="result-label">Conversion Growth</span>
              </div>
              <p>Number of qualified leads increased by 2.5x</p>
            </div>
            <div className="result-card">
              <div className="result-metric">
                <span className="result-number">+85%</span>
                <span className="result-label">ROI</span>
              </div>
              <p>Return on investment increased by 85%</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Block */}
      <section id="contact" className="ppc-contact-section">
        <div className="container">
          <div className="ppc-section-header">
            <h2>Ready to Start?</h2>
            <p>Contact me to discuss your needs</p>
          </div>
          <div className="contact-content">
            <div className="contact-info">
              <div className="contact-item">
                <div className="contact-icon">📧</div>
                <div>
                  <h3>Email</h3>
                  <p>info@ppcset.com</p>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.031-.967-.273-.099-.472-.148-.67.15-.198.297-.767.967-.94 1.164-.173.198-.347.223-.644.075-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.521-.075-.149-.669-1.611-.916-2.206-.242-.579-.487-.5-.669-.51-.173-.008-.372-.01-.571-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.099 3.205 5.077 4.366.711.306 1.263.489 1.695.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.288.173-1.413-.074-.124-.272-.198-.57-.347z" fill="#25D366"/>
                    <path d="M12.004 2.003c-5.523 0-9.997 4.474-9.997 9.997 0 1.762.464 3.484 1.345 4.997L2 22l5.09-1.333c1.47.803 3.13 1.236 4.914 1.236 5.523 0 9.997-4.474 9.997-9.997 0-5.523-4.474-9.997-9.997-9.997zm0 17.995c-1.627 0-3.217-.438-4.59-1.267l-.328-.195-3.018.791.805-2.942-.213-.302c-.822-1.166-1.257-2.537-1.257-3.98 0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z" fill="#25D366"/>
                  </svg>
                </div>
                <div>
                  <h3>WhatsApp</h3>
                  <p>Available upon request</p>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">💼</div>
                <div>
                  <h3>LinkedIn</h3>
                  <p>linkedin.com/in/ppcset</p>
                </div>
              </div>
            </div>
            <div className="contact-form">
              <h3>Send Inquiry</h3>
              <ModernPPCContactForm />
            </div>
          </div>
        </div>
      </section>
      
      <ScrollToTop />
    </>
  )
} 