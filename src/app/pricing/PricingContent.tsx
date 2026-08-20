'use client';

import { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

/* Tiers mirror the homepage (HomeContent.tsx TIERS). Keep both in sync:
   the prices also ship in structured data below and in /b6 OfferCatalog. */
const plans = [
  {
    id: 'l1',
    name: 'L1 Co-pilot',
    description: 'AI suggests; you approve every move.',
    price: 99,
    features: [
      'Buzz + Aegis active',
      '1 Google Ads account',
      'Approve every change',
      'Weekly digest',
      'Email support',
    ],
    popular: false,
  },
  {
    id: 'l2',
    name: 'L2 Approval',
    description: 'AI acts; you approve only the big calls.',
    price: 199,
    features: [
      'Everything in L1',
      'Auto-applies small changes',
      'Risk Agent enforcement',
      'Real-time alerts',
      'Priority support',
    ],
    popular: true,
  },
  {
    id: 'l3',
    name: 'L3 Autonomous',
    description: 'Full autopilot. The agents run it.',
    price: 399,
    features: [
      'Everything in L2',
      'Full autonomy',
      'Creative Agent (ad generation)',
      'Multi-platform (Meta, TikTok)',
      'Dedicated onboarding',
    ],
    popular: false,
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
    'AI-powered Google Ads management platform. Three autonomy tiers: L1 Co-pilot, L2 Approval, L3 Autonomous. Free while in beta, no card required; paid plans come later.',
  url: 'https://www.kampaio.com/pricing',
  // Both publisher and provider reference the main Kampaio Organization
  // entity via @id, inheriting its 15-topic knowsAbout E-E-A-T signal.
  publisher: {
    '@id': 'https://www.kampaio.com/#organization',
  },
  provider: {
    '@id': 'https://www.kampaio.com/#organization',
  },
  offers: plans.map((plan) => ({
    '@type': 'Offer',
    name: plan.name,
    // Early access is free, so the offer price is 0. Shipping the old 99/199/399 here
    // while the page says "Free" would put a price in the SERP that we do not charge.
    price: '0',
    priceCurrency: 'USD',
    priceSpecification: {
      '@type': 'UnitPriceSpecification',
      // Also 0: this is the SECOND place the price reaches the SERP. Fixing only the
      // offer price above left 199 and 399 in the built HTML — verified in .next output.
      price: '0',
      priceCurrency: 'USD',
      unitText: 'MONTH',
    },
    description: plan.description,
    availability: 'https://schema.org/PreOrder',
  })),
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
              Three levels of autonomy
            </h1>
            <p style={{
              fontSize: '18px',
              lineHeight: '1.6',
              color: '#666',
              marginBottom: '24px'
            }}>
              Start as co-pilot where you approve every move, then graduate to autopilot
              when you trust the work. A fraction of a $2-5K/mo agency retainer.
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
        {/* One banner for all three tiers, not a "Free" repeated in every card:
            three identical zeroes read as an unfinished price list. */}
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
            All three levels are free while B6 is in beta
          </div>
          <div style={{ fontSize: '15px', opacity: 0.92, marginTop: '6px' }}>
            No card required. Paid plans come later.
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
                boxShadow: plan.popular ? '0 20px 40px rgba(0,0,0,0.1)' : '0 10px 30px rgba(0,0,0,0.1)',
                transition: 'all 0.3s ease',
                transform: plan.popular ? 'scale(1.05)' : hoveredPlan === plan.id ? 'scale(1.02)' : 'scale(1)',
                border: plan.popular ? '2px solid #667eea' : '1px solid #e2e8f0'
              }}
              onMouseEnter={() => setHoveredPlan(plan.id)}
              onMouseLeave={() => setHoveredPlan(null)}
            >
              {plan.popular && (
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
                  Most Popular
                </div>
              )}

              <div style={{ textAlign: 'center' }}>
                <h3 style={{
                  fontSize: '24px',
                  fontWeight: '700',
                  color: '#1e293b',
                  marginBottom: '8px'
                }}>
                  {plan.name}
                </h3>
                <p style={{
                  fontSize: '16px',
                  color: '#666',
                  marginBottom: '32px',
                  minHeight: '48px'
                }}>
                  {plan.description}
                </p>

                {/* No price block: nothing is charged yet, and three identical
                    zeroes read as an unfinished price list. The free-while-in-beta line
                    lives once at the top of the page instead. */}


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
                          color: '#667eea',
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

                <a
                  href="/auth/register"
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
                  Join founding access
                </a>
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
          No credit card. No contract. Two agents are live today (Buzz and Aegis);
          the rest ship as the cabinet grows.
        </p>
      </div>

      <Footer compact={true} />
    </div>
  );
}
