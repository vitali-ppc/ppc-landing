'use client';

import { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

/* Two plans, both real in the dashboard code. Free is open now and free during
   early access; Pro has no price yet and opens when billing does. The AI agents
   are in development and are NOT a plan: they appear only under "What comes next".
   No tiers, no prices, no trial. */
const DASHBOARD_URL = 'https://dashboard.kampaio.com/';

const plans = [
  {
    id: 'free',
    name: 'Free',
    status: 'Available now',
    description: 'Free during early access. No card.',
    features: [
      '1 Google Ads account',
      'All 14 automatic campaign checks',
      'Search terms report and negatives',
      'Changes with preview and rollback',
      'Change log with the numbers before each edit',
    ],
    available: true,
  },
  {
    id: 'pro',
    name: 'Pro',
    status: 'Coming when billing opens',
    description: 'For managers who run several accounts. No price yet.',
    features: [
      'Everything in Free',
      'Up to 5 Google Ads accounts',
      'All accounts on one screen',
      'Multi-currency totals',
    ],
    available: false,
  },
];

const pricingJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  '@id': 'https://www.kampaio.com/pricing#software',
  name: 'Kampaio',
  applicationCategory: 'BusinessApplication',
  applicationSubCategory: 'Advertising Management',
  operatingSystem: 'Web',
  description:
    'Google Ads dashboard: connect the accounts you manage, run 14 automatic campaign checks, review search terms and add negatives, and make changes with a preview and a rollback. Free during early access, no card required.',
  url: 'https://www.kampaio.com/pricing',
  // Both publisher and provider reference the main Kampaio Organization
  // entity via @id, inheriting its 15-topic knowsAbout E-E-A-T signal.
  publisher: {
    '@id': 'https://www.kampaio.com/#organization',
  },
  provider: {
    '@id': 'https://www.kampaio.com/#organization',
  },
  // Only the Free plan is an offer: Pro has no price yet, and an Offer
  // without a real price would put a made-up number in the SERP.
  offers: [
    {
      '@type': 'Offer',
      name: 'Free',
      price: '0',
      priceCurrency: 'USD',
      description: '1 Google Ads account, all 14 checks, search terms and negatives, changes with preview and rollback, change log. Free during early access.',
      url: DASHBOARD_URL,
      availability: 'https://schema.org/InStock',
    },
  ],
};

export default function PricingContent() {
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)'
    }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pricingJsonLd) }}
      />
      <Header />

      {/* Hero Section */}
      <div style={{
        position: 'relative',
        overflow: 'hidden',
        background: 'white',
        padding: '96px 0',
        textAlign: 'center'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 24px'
        }}>
          <div style={{
            maxWidth: '640px',
            margin: '0 auto'
          }}>
            <h1 style={{
              fontSize: 'clamp(36px, 5vw, 60px)',
              fontWeight: '800',
              color: '#1e293b',
              marginBottom: '24px',
              lineHeight: '1.2'
            }}>
              Free during early access
            </h1>
            <p style={{
              fontSize: '18px',
              lineHeight: '1.6',
              color: '#666',
              marginBottom: '24px'
            }}>
              Connect your Google Ads account and get all 14 automatic campaign checks,
              the search terms report, and changes with a preview and a rollback. No card.
            </p>


          </div>
        </div>
      </div>

      {/* Pricing Cards */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 24px 96px'
      }}>
        {/* One banner for the early-access status, stated once. */}
        <div style={{
          marginTop: '48px',
          padding: '18px 28px',
          borderRadius: '14px',
          background: 'linear-gradient(135deg, #0f766e 0%, #14b8a6 100%)',
          color: '#fff',
          textAlign: 'center',
          boxShadow: '0 8px 24px rgba(15, 118, 110, 0.25)'
        }}>
          <div style={{ fontSize: '22px', fontWeight: 800, letterSpacing: '-0.01em' }}>
            Free during early access
          </div>
          <div style={{ fontSize: '15px', opacity: 0.92, marginTop: '6px' }}>
            No card required. Billing is not open yet; Pro arrives when it is.
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '32px',
          marginTop: '32px'
        }}>
          {plans.map((plan) => (
            <div
              key={plan.id}
              style={{
                position: 'relative',
                background: 'white',
                borderRadius: '24px',
                padding: '32px',
                boxShadow: plan.available ? '0 20px 40px rgba(0,0,0,0.1)' : '0 10px 30px rgba(0,0,0,0.1)',
                transition: 'all 0.3s ease',
                transform: plan.available ? 'scale(1.05)' : hoveredPlan === plan.id ? 'scale(1.02)' : 'scale(1)',
                border: plan.available ? '2px solid #667eea' : '1px solid #e2e8f0'
              }}
              onMouseEnter={() => setHoveredPlan(plan.id)}
              onMouseLeave={() => setHoveredPlan(null)}
            >
              {plan.available && (
                <div style={{
                  position: 'absolute',
                  top: '-16px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  padding: '8px 16px',
                  borderRadius: '20px',
                  fontSize: '14px',
                  fontWeight: '600',
                  whiteSpace: 'nowrap'
                }}>
                  Available now
                </div>
              )}

              <div style={{ textAlign: 'center' }}>
                <h3 style={{
                  fontSize: '24px',
                  fontWeight: '700',
                  color: '#1e293b',
                  marginBottom: '8px'
                }}>
                  {plan.name}{' '}
                  {/* LIVE for the plan you can use today, NEXT for the one waiting on billing. */}
                  <span style={{
                    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                    fontSize: '11px',
                    padding: '3px 7px',
                    borderRadius: '6px',
                    fontWeight: 600,
                    verticalAlign: 'middle',
                    background: plan.available ? 'rgba(78,205,196,.18)' : 'rgba(255,167,38,.18)',
                    color: plan.available ? '#0A7C8C' : '#B45309',
                  }}>{plan.available ? 'LIVE' : 'NEXT'}</span>
                </h3>
                <p style={{
                  fontSize: '16px',
                  color: '#666',
                  marginBottom: '32px',
                  minHeight: '48px'
                }}>
                  {plan.description}
                </p>

                {/* No price block: Free costs nothing during early access and Pro has
                    no price yet. The status line says which is which. */}
                <p style={{
                  fontSize: '14px',
                  fontWeight: 600,
                  color: plan.available ? '#0f766e' : '#B45309',
                  margin: '-16px 0 24px 0'
                }}>
                  {plan.status}
                </p>


                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: '0 0 32px 0',
                  textAlign: 'left'
                }}>
                  {plan.features.map((feature, index) => (
                    <li key={index} style={{
                      display: 'flex',
                      alignItems: 'center',
                      marginBottom: '16px',
                      fontSize: '16px',
                      color: '#374151'
                    }}>
                      <svg
                        style={{
                          width: '20px',
                          height: '20px',
                          color: '#764ba2',
                          marginRight: '12px',
                          flexShrink: 0
                        }}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>

                {plan.available ? (
                  <a
                    href={DASHBOARD_URL}
                    style={{
                      display: 'block',
                      width: '100%',
                      padding: '16px 24px',
                      borderRadius: '12px',
                      border: 'none',
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      color: 'white',
                      fontSize: '16px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                      textDecoration: 'none',
                      textAlign: 'center',
                      boxSizing: 'border-box'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.2)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
                    }}
                  >
                    Open the dashboard
                  </a>
                ) : (
                  <div style={{
                    display: 'block',
                    width: '100%',
                    padding: '16px 24px',
                    borderRadius: '12px',
                    border: '1px dashed #cbd5e1',
                    background: '#f8fafc',
                    color: '#64748b',
                    fontSize: '16px',
                    fontWeight: '600',
                    textAlign: 'center',
                    boxSizing: 'border-box'
                  }}>
                    Coming when billing opens
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <p style={{
          textAlign: 'center',
          color: '#64748b',
          fontSize: '14px',
          marginTop: '40px'
        }}>
          No credit card. No contract.
        </p>

        <div style={{
          maxWidth: '720px',
          margin: '48px auto 0',
          padding: '24px 28px',
          borderRadius: '16px',
          background: 'white',
          border: '1px solid #e2e8f0',
          textAlign: 'left'
        }}>
          <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#1e293b', margin: '0 0 8px 0' }}>
            What comes next
          </h2>
          <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#475569', margin: 0 }}>
            AI agents for bidding, risk review and reporting are in development. They do not
            run on any live account yet and are not part of either plan. Today the dashboard
            flags problems and you make every change yourself, with a preview first and a
            rollback after.
          </p>
        </div>
      </div>

      <Footer compact={true} />
    </div>
  );
}
