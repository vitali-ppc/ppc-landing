import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ProfessionalContactSection from '@/components/ProfessionalContactSection'
import Breadcrumbs from '@/components/Breadcrumbs'

export const metadata: Metadata = {
  title: 'PPC Performance — Premium Advertising Services | PPCSet',
  description: 'Premium PPC performance services: strategy, analytics, and optimization for Google, Meta, LinkedIn ads. Expert approach for businesses seeking better results.',
  keywords: 'PPC, performance marketing, advertising, campaign management, Google Ads, Meta Ads, LinkedIn Ads, analytics, optimization, PPCSet',
  authors: [{ name: 'PPCSet' }],
  robots: 'index, follow',
  alternates: {
    canonical: 'https://ppcset.com/ppc-performance'
  },
  openGraph: {
    type: 'website',
    url: 'https://ppcset.com/ppc-performance',
    title: 'PPC Performance — Premium Advertising Services | PPCSet',
    description: 'Premium PPC performance services: strategy, analytics, and optimization for Google, Meta, LinkedIn ads. Expert approach for businesses seeking better results.',
    images: ['https://ppcset.com/logo.png'],
    siteName: 'PPCSet',
    locale: 'en_US'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PPC Performance — Premium Advertising Services | PPCSet',
    description: 'Premium PPC performance services: strategy, analytics, and optimization for Google, Meta, LinkedIn ads. Expert approach for businesses seeking better results.',
    images: ['https://ppcset.com/logo.png']
  }
}

export default function PpcPerformancePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Vitaliy PPCSet",
            "jobTitle": "PPC Expert",
            "url": "https://ppcset.com/ppc-performance",
            "image": "https://ppcset.com/logo.png",
            "worksFor": {
              "@type": "Organization",
              "name": "PPCSet",
              "url": "https://ppcset.com"
            },
            "sameAs": [
              "https://www.linkedin.com/in/vitali-ppc%E2%9C%94-26b294b4/"
            ],
            "description": "Premium PPC performance services: strategy, analytics, and optimization for Google, Meta, LinkedIn ads. Expert approach for businesses seeking better results."
          })
        }}
      />
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "serviceType": "PPC Campaign Management",
            "provider": {
              "@type": "Person",
              "name": "Vitaliy PPCSet"
            },
            "areaServed": "Worldwide",
            "description": "Premium PPC performance services: strategy, analytics, and optimization for Google, Meta, LinkedIn ads. Expert approach for businesses seeking better results."
          })
        }}
      />
      
      <Header />
      
      <Breadcrumbs />
      
      {/* Hero Section */}
      <section className="professional-hero">
        <div className="container">
          <div className="professional-hero-grid">
            <div className="professional-hero-main">
              <h1 className="professional-hero-title">PPC Performance</h1>
              <p className="professional-hero-subtitle">Strategic PPC campaign management for enterprise-level results</p>
              <div className="professional-btn-group">
                <a href="#contact" className="professional-btn premium-gradient-btn" aria-label="Schedule consultation for PPC services">
                  <svg className="btn-calendar-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" style={{verticalAlign: 'middle', marginRight: '10px'}} aria-hidden="true" focusable="false">
                    <rect x="3" y="5" width="14" height="12" rx="3" fill="#23272f"/>
                    <path d="M3 8.5H17" stroke="#23272f" strokeWidth="1.5" strokeLinecap="round"/>
                    <rect x="7" y="11" width="2" height="2" rx="1" fill="#fff"/>
                    <rect x="11" y="11" width="2" height="2" rx="1" fill="#fff"/>
                  </svg>
                  Schedule Consultation
                </a>
              </div>
            </div>
            
            <div className="professional-hero-cards">
              <div className="professional-mini-card">
                <div className="professional-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
                    <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3>Performance</h3>
                <p>Data-driven optimization for maximum ROI</p>
              </div>
              <div className="professional-mini-card">
                <div className="professional-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
                    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3>Strategy</h3>
                <p>Comprehensive PPC strategy development</p>
              </div>
              <div className="professional-mini-card">
                <div className="professional-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
                    <path d="M3 3V21H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M9 9L12 6L16 10L21 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3>Analytics</h3>
                <p>Advanced reporting and insights</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Business Challenges Section */}
      <section id="problems" className="professional-problems-section">
        <div className="container">
          <div className="professional-section-header">
            <h2>Business Challenges</h2>
            <p>Addressing critical pain points faced by entrepreneurs and marketing directors</p>
          </div>
          <div className="professional-problems-grid">
            <div className="professional-problem-card">
              <div className="professional-problem-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>Expertise Gap</h3>
              <p>Need for specialized expertise to restart and optimize paid advertising strategy for B2B and B2C markets</p>
            </div>
            <div className="professional-problem-card">
              <div className="professional-problem-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
                  <path d="M3 3V21H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 9L12 6L16 10L21 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 17L12 14L16 18L21 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>Analytics Deficiency</h3>
              <p>Lack of high-level analytical capabilities and proactive decision-making for strategic initiatives</p>
            </div>
            <div className="professional-problem-card">
              <div className="professional-problem-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
                  <path d="M12 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 18V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M4.93 4.93L7.76 7.76" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16.24 16.24L19.07 19.07" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 12H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M18 12H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M4.93 19.07L7.76 16.24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16.24 7.76L19.07 4.93" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>Continuous Optimization</h3>
              <p>Ongoing campaign optimization requirements to attract qualified leads and maintain performance</p>
            </div>
            <div className="professional-problem-card">
              <div className="professional-problem-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
                  <path d="M9 11H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 7H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 15H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M3 21H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M3 3H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M3 7H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M3 11H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M3 15H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>Business Alignment</h3>
              <p>Need for advertising efforts to align with overall business objectives and strategic goals</p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Responsibilities Section */}
      <section id="responsibilities" className="professional-responsibilities-section">
        <div className="container">
          <div className="professional-section-header">
            <h2>Core Responsibilities</h2>
            <p>Comprehensive approach to managing your advertising campaigns</p>
          </div>
          <div className="professional-responsibilities-grid">
            <div className="professional-responsibility-card">
              <div className="professional-responsibility-number">01</div>
              <h3>PPC Strategy</h3>
              <p>Development and implementation of comprehensive strategy tailored to your services and business objectives</p>
            </div>
            <div className="professional-responsibility-card">
              <div className="professional-responsibility-number">02</div>
              <h3>Campaign Planning</h3>
              <p>Proactive participation in marketing campaign planning with strategic approach and data-driven insights</p>
            </div>
            <div className="professional-responsibility-card">
              <div className="professional-responsibility-number">03</div>
              <h3>Campaign Management</h3>
              <p>Independent structuring and strategic decision-making regarding formats, targeting, and budgeting</p>
            </div>
            <div className="professional-responsibility-card">
              <div className="professional-responsibility-number">04</div>
              <h3>Performance Optimization</h3>
              <p>Continuous optimization focused on reducing CPL and improving return on investment</p>
            </div>
            <div className="professional-responsibility-card">
              <div className="professional-responsibility-number">05</div>
              <h3>Remarketing</h3>
              <p>Launch and management of remarketing campaigns for re-engagement and conversion increase</p>
            </div>
            <div className="professional-responsibility-card">
              <div className="professional-responsibility-number">06</div>
              <h3>Analytics & Reporting</h3>
              <p>Performance metrics analysis and data utilization for strategy enhancement and optimization</p>
            </div>
          </div>
          <div className="internal-link-analytics professional-section-header" style={{margin: '32px 0 0 0', textAlign: 'center', marginTop: '24px'}}>
            <p className="analytics-link-desc">Want to go deeper? <a href="/analytics" className="accent-link" aria-label="Explore our analytics services">Explore Analytics</a> for actionable insights.</p>
          </div>
        </div>
      </section>

      {/* Experience & Expertise Section */}
      <section id="experience" className="professional-experience-section">
        <div className="container">
          <div className="professional-section-header">
            <h2>Experience & Expertise</h2>
            <p>Professional approach with proven results and industry expertise</p>
          </div>
          <div className="professional-experience-grid">
            <div className="professional-experience-card">
              <div className="professional-experience-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                  <polyline points="12,6 12,12 16,14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>5+ Years Experience</h3>
              <p>Practical experience managing PPC campaigns in B2B and B2C segments with proven track record</p>
            </div>
            <div className="professional-experience-card">
              <div className="professional-experience-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>Technical Expertise</h3>
              <p>Deep knowledge of Google Ads, Google Analytics, Meta and LinkedIn Ads platforms</p>
            </div>
            <div className="professional-experience-card">
              <div className="professional-experience-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
                  <path d="M3 3V21H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 9L12 6L16 10L21 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>Advanced Analytics</h3>
              <p>Experience with remarketing campaigns and audience segmentation strategies</p>
            </div>
            <div className="professional-experience-card">
              <div className="professional-experience-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
                  <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>Conversion Optimization</h3>
              <p>Deep understanding of advertising performance metrics and conversion tracking</p>
            </div>
            <div className="professional-experience-card">
              <div className="professional-experience-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
                  <path d="M9 11H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 7H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 15H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M3 21H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M3 3H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M3 7H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M3 11H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M3 15H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>Business Intelligence</h3>
              <p>Skills in Looker Studio, Power BI for comprehensive reporting and analysis</p>
            </div>
            <div className="professional-experience-card">
              <div className="professional-experience-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
                  <path d="M12 1V23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M17 5H9.5A3.5 3.5 0 0 0 6 8.5C6 10.5 7.5 12 9.5 12H14.5A3.5 3.5 0 0 1 18 15.5C18 17.5 16.5 19 14.5 19H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>Proven Results</h3>
              <p>Demonstrated experience in reducing CPL and improving return on investment</p>
            </div>
          </div>
        </div>
      </section>

      {/* Partnership Benefits Section */}
      <section id="benefits" className="professional-benefits-section" style={{paddingTop: '32px'}}>
        <div className="container">
          <div className="professional-section-header">
            <h2>Partnership Benefits</h2>
            <p>Why choose this strategic approach for your business growth</p>
          </div>
          <div className="professional-benefits-grid">
            <div className="professional-benefit-card">
              <div className="professional-benefit-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
                  <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>Rapid Implementation</h3>
              <p>Quick strategy deployment and immediate start with your campaigns for faster results</p>
            </div>
            <div className="professional-benefit-card">
              <div className="professional-benefit-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
                  <path d="M3 3V21H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 9L12 6L16 10L21 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>Full Transparency</h3>
              <p>Complete transparency with detailed reports and comprehensive analytics</p>
            </div>
            <div className="professional-benefit-card">
              <div className="professional-benefit-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>Goal-Oriented Focus</h3>
              <p>Strategic focus on achieving your specific business objectives and KPIs</p>
            </div>
            <div className="professional-benefit-card">
              <div className="professional-benefit-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
                  <path d="M12 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 18V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M4.93 4.93L7.76 7.76" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16.24 16.24L19.07 19.07" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 12H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M18 12H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M4.93 19.07L7.76 16.24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16.24 7.76L19.07 4.93" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>Continuous Optimization</h3>
              <p>Ongoing campaign improvement and performance enhancement strategies</p>
            </div>
          </div>
        </div>
      </section>

      {/* Work Process Section */}
      <section id="process" className="professional-process-section">
        <div className="container">
          <div className="professional-section-header">
            <h2>Work Process</h2>
            <p>How we achieve results together through strategic collaboration</p>
          </div>
          <div className="professional-process-timeline">
            <div className="professional-process-step">
              <div className="professional-step-number">1</div>
              <div className="professional-step-content">
                <h3>Current Situation Analysis</h3>
                <p>Comprehensive analysis of your existing campaigns and identification of growth opportunities</p>
              </div>
            </div>
            <div className="professional-process-step">
              <div className="professional-step-number">2</div>
              <div className="professional-step-content">
                <h3>Strategy Development</h3>
                <p>Creation of comprehensive strategy tailored to your business objectives and market conditions</p>
              </div>
            </div>
            <div className="professional-process-step">
              <div className="professional-step-number">3</div>
              <div className="professional-step-content">
                <h3>Implementation & Launch</h3>
                <p>Technical implementation of strategy and launch of optimized campaigns with best practices</p>
              </div>
            </div>
            <div className="professional-process-step">
              <div className="professional-step-number">4</div>
              <div className="professional-step-content">
                <h3>Monitoring & Optimization</h3>
                <p>Continuous performance monitoring and strategic optimization to achieve target KPIs</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section id="results" className="professional-results-section">
        <div className="container">
          <div className="professional-section-header">
            <h2>Results & Case Studies</h2>
            <p>Proven results from client partnerships and successful campaigns</p>
          </div>
          <div className="professional-results-grid">
            <div className="professional-result-card">
              <div className="professional-result-metric">
                <span className="professional-result-number">-40%</span>
                <span className="professional-result-label">CPL Reduction</span>
              </div>
              <p>Average cost per lead reduction of 40% across client campaigns</p>
            </div>
            <div className="professional-result-card">
              <div className="professional-result-metric">
                <span className="professional-result-number">+150%</span>
                <span className="professional-result-label">Conversion Growth</span>
              </div>
              <p>Increase in qualified leads by 2.5x through optimized targeting</p>
            </div>
            <div className="professional-result-card">
              <div className="professional-result-metric">
                <span className="professional-result-number">+85%</span>
                <span className="professional-result-label">ROI Improvement</span>
              </div>
              <p>Enhanced return on investment by 85% through strategic optimization</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <ProfessionalContactSection 
        title="Ready to Start?"
        description="Contact me to discuss your business needs and strategic objectives"
      />

      <Footer compact={true} />
    </>
  )
} 