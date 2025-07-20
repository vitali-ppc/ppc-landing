'use client';

import { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(false);
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null);

  const plans = [
    {
      id: 'starter',
      name: 'Free',
      description: 'Perfect for testing AI-powered Google Ads optimization',
      price: isAnnual ? 0 : 0,
      originalPrice: isAnnual ? 0 : 0,
      features: [
        '25 AI queries per month',
        '1 Google Ads account',
        'Basic campaign analytics',
        'CSV export only',
        'Community support',
        'Chat history (7 days)'
      ],
      popular: false,
      gradient: 'linear-gradient(135deg, #00FFE7 0%, #00BFAE 100%)',
      buttonColor: 'linear-gradient(135deg, #7F9CF5 0%, #4A5BB8 100%)'
    },
    {
      id: 'professional',
      name: 'Professional',
      description: 'Complete AI solution for growing businesses',
      price: isAnnual ? 39 : 49,
      originalPrice: isAnnual ? 49 : 49,
      features: [
        'Unlimited AI queries',
        'Up to 5 Google Ads accounts',
        'Advanced analytics & insights',
        'All export formats (CSV, TXT, XLSX, PDF)',
        'Email support',
        'Unlimited chat history',
        'Performance recommendations',
        'Keyword research & optimization'
      ],
      popular: true,
      gradient: 'linear-gradient(135deg, #7F9CF5 0%, #4A5BB8 100%)',
      buttonColor: 'linear-gradient(135deg, #7F9CF5 0%, #4A5BB8 100%)'
    },
    {
      id: 'enterprise',
      name: 'Business',
      description: 'Advanced automation for enterprise-level campaigns',
      price: isAnnual ? 119 : 149,
      originalPrice: isAnnual ? 149 : 149,
      features: [
        'Everything in Professional',
        'Unlimited Google Ads accounts',
        'Google Sheets integration',
        'Automated report delivery',
        'GA4 integration',
        'MCP automation agent',
        'Automated campaign changes',
        'Custom integrations',
        'Priority email support',
        'Dedicated account manager',
        'White-label reports',
        'API access'
      ],
      popular: false,
      gradient: 'linear-gradient(135deg, #FF6B6B 0%, #FF8E8E 100%)',
      buttonColor: 'linear-gradient(135deg, #7F9CF5 0%, #4A5BB8 100%)'
    }
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)'
    }}>
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
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            <h1 style={{
              fontSize: 'clamp(36px, 5vw, 60px)',
              fontWeight: '800',
              color: '#1a1a1a',
              marginBottom: '24px',
              lineHeight: '1.2'
            }}>
              Simple Pricing for Smarter Ads
            </h1>
            <p style={{
              fontSize: '18px',
              lineHeight: '1.6',
              color: '#666',
              marginBottom: '32px'
            }}>
              Start free and scale as you grow. All plans include advanced AI-powered optimization and real-time insights
            </p>
            
            {/* Billing Toggle */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '16px',
              marginBottom: '32px'
            }}>
              <span style={{
                fontSize: '14px',
                fontWeight: '500',
                color: !isAnnual ? '#1a1a1a' : '#666'
              }}>
                Monthly
              </span>
                              <button
                  onClick={() => setIsAnnual(!isAnnual)}
                  style={{
                    position: 'relative',
                    width: '44px',
                    height: '24px',
                    borderRadius: '12px',
                    border: 'none',
                    background: isAnnual ? 'linear-gradient(135deg, #7F9CF5 0%, #4A5BB8 100%)' : '#e2e8f0',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                >
                <span style={{
                  position: 'absolute',
                  top: '2px',
                  left: isAnnual ? '22px' : '2px',
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  background: 'white',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                }} />
              </button>
              <span style={{
                fontSize: '14px',
                fontWeight: '500',
                color: isAnnual ? '#1a1a1a' : '#666'
              }}>
                Annual
                <span style={{
                  marginLeft: '4px',
                  fontSize: '12px',
                  color: '#4ECDC4'
                }}>
                  Save 20%
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Cards */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 24px 96px'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
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
                border: plan.popular ? '2px solid #7F9CF5' : '1px solid #e2e8f0'
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
                  background: plan.gradient,
                  color: 'white',
                  padding: '8px 16px',
                  borderRadius: '20px',
                  fontSize: '14px',
                  fontWeight: '600'
                }}>
                  Most Popular
                </div>
              )}

              <div style={{ textAlign: 'center' }}>
                <h3 style={{
                  fontSize: '24px',
                  fontWeight: '700',
                  color: '#1a1a1a',
                  marginBottom: '8px'
                }}>
                  {plan.name}
                </h3>
                <p style={{
                  fontSize: '16px',
                  color: '#666',
                  marginBottom: '32px'
                }}>
                  {plan.description}
                </p>
                
                <div style={{ marginBottom: '32px' }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'baseline',
                    justifyContent: 'center',
                    gap: '4px'
                  }}>
                    <span style={{
                      fontSize: '48px',
                      fontWeight: '800',
                      color: '#1a1a1a'
                    }}>
                      ${plan.price}
                    </span>
                    <span style={{
                      fontSize: '20px',
                      color: '#666'
                    }}>
                      /month
                    </span>
                  </div>
                  {plan.originalPrice !== plan.price && (
                    <p style={{
                      marginTop: '8px',
                      fontSize: '14px',
                      color: '#666',
                      textDecoration: 'line-through'
                    }}>
                      ${plan.originalPrice}/month
                    </p>
                  )}
                </div>

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
                          color: '#4ECDC4',
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

                <button
                  style={{
                    width: '100%',
                    padding: '16px 24px',
                    borderRadius: '12px',
                    border: 'none',
                    background: plan.buttonColor,
                    color: 'white',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
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
                  Get Started
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>





      <Footer compact={true} />
    </div>
  );
} 
