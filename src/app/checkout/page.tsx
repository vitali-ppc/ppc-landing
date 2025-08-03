'use client';

import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement } from '@stripe/react-stripe-js';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
// Test Stripe key (replace with real key later)
const stripePromise = loadStripe('pk_test_51O...'); // Тестовый ключ

// Stripe Elements options
const cardElementOptions = {
  style: {
    base: {
      fontSize: '16px',
      color: '#1e293b',
      '::placeholder': {
        color: '#64748b',
      },
    },
  },
};

export default function CheckoutPage() {
  const [selectedPlan, setSelectedPlan] = useState('professional');
  const [isAnnual, setIsAnnual] = useState(false);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const plans = [
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
      popular: true
    },
    {
      id: 'business',
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
      popular: false
    }
  ];

  const selectedPlanData = plans.find(plan => plan.id === selectedPlan);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // TODO: Create payment intent on server
      // TODO: Confirm payment with Stripe
      console.log('Processing payment for:', selectedPlanData?.name, 'at $' + selectedPlanData?.price);
      
      // For now, simulate success
      setTimeout(() => {
        setLoading(false);
        alert('Payment processed successfully!');
      }, 2000);
    } catch (error) {
      console.error('Payment error:', error);
      setLoading(false);
      alert('Payment failed. Please try again.');
    }
  };

  return (
    <Elements stripe={stripePromise} options={{ 
      locale: 'en',
      appearance: {
        theme: 'stripe',
        variables: {
          colorPrimary: '#667eea',
        },
      },
    }}>
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)'
    }}>
      <Header />
      
      {/* Hero Section */}
      <div style={{
        background: 'white',
        padding: '60px 0',
        textAlign: 'center'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 24px'
        }}>
          <h1 style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: '700',
            color: '#1e293b',
            marginBottom: '16px'
          }}>
            Complete Your Purchase
          </h1>
          <p style={{
            fontSize: 'clamp(1rem, 2vw, 1.25rem)',
            color: '#64748b',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            Choose your plan and start optimizing your Google Ads campaigns with AI-powered insights
          </p>
        </div>
      </div>

      {/* Checkout Form */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '40px 24px 80px'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '40px',
          alignItems: 'start'
        }}>
          
          {/* Left Side - Plan Selection */}
          <div>
            <h2 style={{
              fontSize: '24px',
              fontWeight: '600',
              color: '#1e293b',
              marginBottom: '24px'
            }}>
              Choose Your Plan
            </h2>
            
            {/* Billing Toggle */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '16px',
              marginBottom: '32px',
              padding: '16px',
              background: 'white',
              borderRadius: '12px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
            }}>
              <span style={{
                fontSize: '14px',
                fontWeight: '500',
                color: !isAnnual ? '#1e293b' : '#64748b'
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
                  background: isAnnual ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : '#e2e8f0',
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
                color: isAnnual ? '#1e293b' : '#64748b'
              }}>
                Annual
                <span style={{
                  marginLeft: '4px',
                  fontSize: '12px',
                  color: '#667eea'
                }}>
                  Save 20%
                </span>
              </span>
            </div>

            {/* Plan Cards */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px'
            }}>
              {plans.map((plan) => (
                <div
                  key={plan.id}
                  style={{
                    background: 'white',
                    borderRadius: '16px',
                    padding: '24px',
                    border: selectedPlan === plan.id ? '2px solid #667eea' : '1px solid #e2e8f0',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: selectedPlan === plan.id ? '0 8px 24px rgba(102, 126, 234, 0.15)' : '0 2px 8px rgba(0,0,0,0.06)'
                  }}
                  onClick={() => setSelectedPlan(plan.id)}
                >
                  {plan.popular && (
                    <div style={{
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      color: 'white',
                      padding: '4px 12px',
                      borderRadius: '12px',
                      fontSize: '12px',
                      fontWeight: '600',
                      display: 'inline-block',
                      marginBottom: '12px'
                    }}>
                      Most Popular
                    </div>
                  )}
                  
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '12px'
                  }}>
                    <h3 style={{
                      fontSize: '20px',
                      fontWeight: '600',
                      color: '#1e293b',
                      margin: 0
                    }}>
                      {plan.name}
                    </h3>
                    <div style={{
                      display: 'flex',
                      alignItems: 'baseline',
                      gap: '4px'
                    }}>
                                             <span style={{
                         fontSize: '24px',
                         fontWeight: '700',
                         color: '#1e293b'
                       }}>
                         ${isAnnual ? plan.price * 12 : plan.price}
                       </span>
                       <span style={{
                         fontSize: '14px',
                         color: '#64748b'
                       }}>
                                                   {isAnnual ? '/ year' : '/ month'}
                       </span>
                    </div>
                  </div>
                  
                                     <p style={{
                     fontSize: '14px',
                     color: '#64748b',
                     marginBottom: '16px',
                     lineHeight: '1.5'
                   }}>
                     {plan.description}
                   </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Payment Form */}
          <div>
            <div style={{
              background: 'white',
              borderRadius: '16px',
              padding: '32px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              position: 'sticky',
              top: '20px'
            }}>
              <h2 style={{
                fontSize: '24px',
                fontWeight: '600',
                color: '#1e293b',
                marginBottom: '24px'
              }}>
                Payment Details
              </h2>

              <form onSubmit={handleSubmit}>
                {/* Email Field */}
                <div style={{ marginBottom: '24px' }}>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#64748b',
                    marginBottom: '8px'
                  }}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                                         style={{
                       width: '100%',
                       padding: '12px 16px',
                       border: '1px solid #e2e8f0',
                       borderRadius: '8px',
                       fontSize: '16px',
                       transition: 'border-color 0.2s ease'
                     }}
                    placeholder="your@email.com"
                  />
                </div>

                {/* Payment Method Placeholder */}
                <div style={{ marginBottom: '24px' }}>
                                     <label style={{
                     display: 'block',
                     fontSize: '14px',
                     fontWeight: '500',
                     color: '#64748b',
                     marginBottom: '8px'
                   }}>
                     Payment method
                  </label>
                  <CardElement options={cardElementOptions} />
                </div>

                {/* Order Summary */}
                <div style={{
                  borderTop: '1px solid #e5e7eb',
                  paddingTop: '24px',
                  marginBottom: '24px'
                }}>
                  <h3 style={{
                    fontSize: '18px',
                    fontWeight: '600',
                    color: '#1e293b',
                    marginBottom: '16px'
                  }}>
                    Order Summary
                  </h3>
                  
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '8px'
                  }}>
                    <span style={{ color: '#64748b' }}>
                      {selectedPlanData?.name} Plan
                    </span>
                                         <span style={{ fontWeight: '500' }}>
                                               ${isAnnual ? (selectedPlanData?.price || 0) * 12 : selectedPlanData?.price} {isAnnual ? '/ year' : '/ month'}
                     </span>
                  </div>
                  
                  {isAnnual && (
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginBottom: '8px',
                      color: '#667eea',
                      fontSize: '14px'
                    }}>
                      <span>Annual discount (20%)</span>
                      <span>-${selectedPlanData ? Math.round((selectedPlanData.originalPrice - selectedPlanData.price) * 12) : 0}</span>
                    </div>
                  )}
                  
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    paddingTop: '16px',
                    borderTop: '1px solid #e5e7eb',
                    fontSize: '18px',
                    fontWeight: '600',
                    color: '#1e293b'
                  }}>
                                         <span>Total</span>
                                           <span>${isAnnual ? (selectedPlanData?.price || 0) * 12 : selectedPlanData?.price} {isAnnual ? '/ year' : '/ month'}</span>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    width: '100%',
                    padding: '16px 24px',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    opacity: loading ? 0.7 : 1,
                    transition: 'all 0.3s ease'
                  }}
                >
                                     {loading ? 'Processing...' : `Pay $${isAnnual ? (selectedPlanData?.price || 0) * 12 : selectedPlanData?.price} ${isAnnual ? '/ year' : '/ month'}`}
                </button>

                                 <p style={{
                   fontSize: '12px',
                   color: '#64748b',
                   textAlign: 'center',
                   marginTop: '16px',
                   lineHeight: '1.4'
                 }}>
                  By completing your purchase, you agree to our Terms of Service and Privacy Policy.
                  You can cancel your subscription at any time.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>

      <Footer compact={true} />
    </div>
  </Elements>
);
} 