'use client';

import { useState } from 'react';
import Header from '../../components/Header';

export default function KampaioHome() {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#1a1a1a',
      color: 'white',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      {/* Header */}
      <Header variant="full" />

      {/* AI Assistant Section - Alternative Hero */}
      <section style={{
        padding: '120px 0',
        background: '#1a1a1a',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background gradient */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 30% 20%, rgba(127,156,245,0.1) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(0,255,231,0.08) 0%, transparent 50%)',
          pointerEvents: 'none'
        }}></div>
        
        <div style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 24px'
        }}>
          {/* Hero Section */}
          <div style={{textAlign: 'center', marginBottom: '80px'}}>
            <h2 style={{
              fontSize: '48px',
              fontWeight: '700',
              color: '#fff',
              marginBottom: '24px',
              marginTop: 0,
              lineHeight: '1.1'
            }}>
              AI-Powered Google Ads Assistant
            </h2>
            <p style={{
              fontSize: '20px',
              color: '#a0a0a0',
              marginBottom: '40px',
              maxWidth: '600px',
              marginLeft: 'auto',
              marginRight: 'auto',
              lineHeight: '1.6'
            }}>
              Intelligent analytics, strategy generation, and campaign optimization powered by AI. 
              Your smart partner for Google Ads success.
            </p>
            
            {/* Interactive Demo Button */}
            <button style={{
              background: 'linear-gradient(135deg, #00ffe7 0%, #7f9cf5 100%)',
              border: 'none',
              borderRadius: '12px',
              padding: '16px 32px',
              fontSize: '16px',
              fontWeight: '600',
              color: '#1a1a1a',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 8px 32px rgba(0,255,231,0.3)',
              marginBottom: '60px'
            }} onMouseEnter={(e) => {
              const target = e.target as HTMLElement;
              target.style.transform = 'translateY(-2px)';
              target.style.boxShadow = '0 12px 40px rgba(0,255,231,0.4)';
            }} onMouseLeave={(e) => {
              const target = e.target as HTMLElement;
              target.style.transform = 'translateY(0)';
              target.style.boxShadow = '0 8px 32px rgba(0,255,231,0.3)';
            }}>
              Try Interactive Demo
            </button>
          </div>
        </div>
      </section>

      {/* Notion Style Search Section */}
      <section style={{
        padding: '60px 0 120px 0',
        background: 'white',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 24px',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '80px',
          alignItems: 'center'
        }}>
          {/* Left side - Text content */}
          <div style={{ textAlign: 'left', marginTop: '-30px' }}>
            <h2 style={{
              fontSize: 'clamp(32px, 4.5vw, 42px)',
              fontWeight: 700,
              color: '#1a1a1a',
              marginBottom: '20px',
              lineHeight: 1.2
            }}>
              AI-powered Google Ads optimization
            </h2>
            <p style={{
              fontSize: 'clamp(16px, 1.8vw, 18px)',
              color: '#666',
              marginBottom: '40px',
              lineHeight: 1.5
            }}>
              Automatically optimize your campaigns, boost ROI, and scale your business with intelligent AI assistance.
            </p>
            
            {/* CTA Buttons */}
            <div style={{
              display: 'flex',
              gap: '16px',
              alignItems: 'center',
              flexWrap: 'wrap',
              marginBottom: '80px'
            }}>
              <button style={{
                padding: '16px 32px',
                background: '#1a1a1a',
                border: 'none',
                borderRadius: '8px',
                fontWeight: 600,
                color: 'white',
                cursor: 'pointer',
                fontSize: '16px',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
              }}
              onMouseEnter={(e) => {
                const target = e.target as HTMLElement;
                target.style.transform = 'translateY(-2px)';
                target.style.boxShadow = '0 8px 20px rgba(0,0,0,0.15)';
              }}
              onMouseLeave={(e) => {
                const target = e.target as HTMLElement;
                target.style.transform = 'translateY(0)';
                target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
              }}>
                Try for free
              </button>

            </div>

            {/* Integrations Section */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '80px'
            }}>
              {/* Integrates with */}
              <div style={{ textAlign: 'left' }}>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: 600,
                  color: '#1a1a1a',
                  marginBottom: '24px'
                }}>
                  Integrates with
                </h3>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr',
                  gap: '16px'
                }}>
                  {[
                    { name: 'Google Analytics', icon: 'GA' }
                  ].map((app, index) => (
                    <div key={index} style={{
                      padding: '12px 16px',
                      background: '#f8f9fa',
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontWeight: 500,
                      color: '#1a1a1a',
                      border: '1px solid #e9ecef',
                      transition: 'all 0.2s ease',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                    onMouseEnter={(e) => {
                      const target = e.target as HTMLElement;
                      target.style.background = '#e9ecef';
                      target.style.transform = 'translateY(-1px)';
                    }}
                    onMouseLeave={(e) => {
                      const target = e.target as HTMLElement;
                      target.style.background = '#f8f9fa';
                      target.style.transform = 'translateY(0)';
                    }}>
                      <div style={{
                        width: '20px',
                        height: '20px',
                        borderRadius: '4px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '10px',
                        fontWeight: 'bold',
                        color: 'white',
                        background: '#F9AB00'
                      }}>
                        GA
                      </div>
                      {app.name}
                    </div>
                  ))}
                </div>
              </div>

              {/* Coming soon */}
              <div style={{ textAlign: 'left' }}>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: 600,
                  color: '#1a1a1a',
                  marginBottom: '24px'
                }}>
                  Coming soon
                </h3>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '16px'
                }}>
                  {[
                    { name: 'HubSpot', icon: 'H' },
                    { name: 'Salesforce', icon: 'S' }
                  ].map((app, index) => (
                    <div key={index} style={{
                      padding: '12px 16px',
                      background: '#f8f9fa',
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontWeight: 500,
                      color: '#666',
                      border: '1px solid #e9ecef',
                      opacity: 0.7,
                      transition: 'all 0.2s ease',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                    onMouseEnter={(e) => {
                      const target = e.target as HTMLElement;
                      target.style.background = '#e9ecef';
                      target.style.transform = 'translateY(-1px)';
                    }}
                    onMouseLeave={(e) => {
                      const target = e.target as HTMLElement;
                      target.style.background = '#f8f9fa';
                      target.style.transform = 'translateY(0)';
                    }}>
                      <div style={{
                        width: '20px',
                        height: '20px',
                        borderRadius: '4px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '12px',
                        fontWeight: 'bold',
                        color: 'white',
                        background: app.name === 'HubSpot' ? '#ff7a59' : '#00a1e0'
                      }}>
                        {app.icon}
                      </div>
                      {app.name}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Interactive Chat Demo */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
            position: 'relative',
            marginTop: '-60px'
          }}>
            <div style={{
              width: '100%',
              maxWidth: '500px',
              height: '400px',
              background: '#ffffff',
              borderRadius: '20px',
              border: '1px solid #e9ecef',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
            }}>
              {/* Chat Header */}
              <div style={{
                padding: '16px 20px',
                borderBottom: '1px solid #e9ecef',
                background: '#f8f9fa',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  background: 'linear-gradient(45deg, #00ffe7, #7f9cf5)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '16px',
                  color: 'white',
                  fontWeight: 'bold'
                }}>
                  K
                </div>
                <div>
                  <div style={{
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#1a1a1a'
                  }}>
                    Kampaio AI
                  </div>
                  <div style={{
                    fontSize: '12px',
                    color: '#666',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}>
                    <div style={{
                      width: '6px',
                      height: '6px',
                      background: '#00d4aa',
                      borderRadius: '50%',
                      animation: 'pulse 2s infinite'
                    }}></div>
                    Online
                  </div>
                </div>
              </div>

              {/* Chat Messages */}
              <div style={{
                flex: 1,
                padding: '20px',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px'
              }}>
                {/* User Question */}
                <div style={{
                  alignSelf: 'flex-end',
                  maxWidth: '80%'
                }}>
                  <div style={{
                    background: '#1a1a1a',
                    color: 'white',
                    padding: '12px 16px',
                    borderRadius: '18px 18px 4px 18px',
                    fontSize: '14px',
                    lineHeight: '1.4',
                    animation: 'slideInRight 0.5s ease-out'
                  }}>
                    How can I optimize my Google Ads campaign for better ROI?
                  </div>
                </div>

                {/* AI Response */}
                <div style={{
                  alignSelf: 'flex-start',
                  maxWidth: '80%'
                }}>
                  <div style={{
                    background: '#f8f9fa',
                    color: '#1a1a1a',
                    padding: '12px 16px',
                    borderRadius: '18px 18px 18px 4px',
                    fontSize: '14px',
                    lineHeight: '1.4',
                    border: '1px solid #e9ecef',
                    animation: 'slideInLeft 0.5s ease-out 0.3s both'
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      marginBottom: '8px'
                    }}>
                      <div style={{
                        width: '20px',
                        height: '20px',
                        background: 'linear-gradient(45deg, #00ffe7, #7f9cf5)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '10px',
                        color: 'white',
                        fontWeight: 'bold'
                      }}>
                        K
                      </div>
                      <span style={{
                        fontSize: '12px',
                        fontWeight: '600',
                        color: '#666'
                      }}>
                        Kampaio AI
                      </span>
                    </div>
                    <div style={{
                      marginBottom: '8px'
                    }}>
                      Here are 5 key strategies to optimize your Google Ads ROI:
                    </div>
                    <div style={{
                      fontSize: '13px',
                      color: '#666',
                      lineHeight: '1.5'
                    }}>
                      1. <strong>Audience Targeting:</strong> Use lookalike audiences and custom intent targeting<br/>
                      2. <strong>Keyword Optimization:</strong> Focus on long-tail keywords with lower competition<br/>
                      3. <strong>Ad Copy Testing:</strong> A/B test headlines and descriptions regularly<br/>
                      4. <strong>Landing Page Optimization:</strong> Improve conversion rates with better UX<br/>
                      5. <strong>Bid Management:</strong> Use automated bidding strategies
                    </div>
                  </div>
                </div>

                {/* Typing Indicator */}
                <div style={{
                  alignSelf: 'flex-start',
                  maxWidth: '80%',
                  animation: 'fadeIn 0.5s ease-out 1s both'
                }}>
                  <div style={{
                    background: '#f8f9fa',
                    padding: '12px 16px',
                    borderRadius: '18px 18px 18px 4px',
                    border: '1px solid #e9ecef',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <div style={{
                      width: '20px',
                      height: '20px',
                      background: 'linear-gradient(45deg, #00ffe7, #7f9cf5)',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '10px',
                      color: 'white',
                      fontWeight: 'bold'
                    }}>
                      K
                    </div>
                    <div style={{
                      display: 'flex',
                      gap: '4px'
                    }}>
                      <div style={{
                        width: '6px',
                        height: '6px',
                        background: '#666',
                        borderRadius: '50%',
                        animation: 'typing 1.4s infinite'
                      }}></div>
                      <div style={{
                        width: '6px',
                        height: '6px',
                        background: '#666',
                        borderRadius: '50%',
                        animation: 'typing 1.4s infinite 0.2s'
                      }}></div>
                      <div style={{
                        width: '6px',
                        height: '6px',
                        background: '#666',
                        borderRadius: '50%',
                        animation: 'typing 1.4s infinite 0.4s'
                      }}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Chat Input */}
              <div style={{
                padding: '16px 20px',
                borderTop: '1px solid #e9ecef',
                background: '#f8f9fa'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  background: 'white',
                  border: '1px solid #e9ecef',
                  borderRadius: '24px',
                  padding: '8px 16px'
                }}>
                  <input
                    type="text"
                    placeholder="Ask Kampaio AI anything..."
                    style={{
                      flex: 1,
                      border: 'none',
                      outline: 'none',
                      fontSize: '14px',
                      background: 'transparent',
                      color: '#1a1a1a'
                    }}
                  />
                  <button style={{
                    width: '32px',
                    height: '32px',
                    background: 'linear-gradient(45deg, #00ffe7, #7f9cf5)',
                    border: 'none',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'transform 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    const target = e.target as HTMLElement;
                    target.style.transform = 'scale(1.1)';
                  }}
                  onMouseLeave={(e) => {
                    const target = e.target as HTMLElement;
                    target.style.transform = 'scale(1)';
                  }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 1L15 8L8 15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M1 8H15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={{
        padding: '120px 0',
        background: '#23272f',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background Elements for Features */}
        <div style={{ position: 'absolute', inset: 0 }}>
          <div style={{
            position: 'absolute',
            top: '20%',
            right: '10%',
            width: '200px',
            height: '200px',
            background: 'linear-gradient(45deg, #00ffe7, #7f9cf5)',
            borderRadius: '50%',
            filter: 'blur(60px)',
            opacity: 0.15,
            animation: 'pulse 4s ease-in-out infinite'
          }}></div>
          <div style={{
            position: 'absolute',
            bottom: '20%',
            left: '10%',
            width: '150px',
            height: '150px',
            background: 'linear-gradient(45deg, #7f9cf5, #00ffe7)',
            borderRadius: '50%',
            filter: 'blur(50px)',
            opacity: 0.15,
            animation: 'pulse 4s ease-in-out infinite 2s'
          }}></div>
        </div>

        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 24px',
          position: 'relative',
          zIndex: 10
        }}>
          {/* Section Header */}
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <h2 style={{
              fontSize: 'clamp(36px, 5vw, 48px)',
              fontWeight: 700,
              marginBottom: '24px',
              backgroundImage: 'linear-gradient(45deg, #ffffff, #00ffe7)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Powerful Features
            </h2>
            <p style={{
              fontSize: '20px',
              color: '#a0a0a0',
              maxWidth: '600px',
              margin: '0 auto',
              lineHeight: 1.6
            }}>
              Everything you need to optimize your Google Ads campaigns with AI
            </p>
          </div>

          {/* Feature Cards Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '40px'
          }}>
            {[
              {
                icon: "🚀",
                title: "AI Optimization",
                description: "Automatically optimize your campaigns for maximum performance using advanced machine learning algorithms",
                details: "Real-time bid adjustments, keyword optimization, and audience targeting based on performance data"
              },
              {
                icon: "📊",
                title: "Smart Analytics",
                description: "Get deep insights into your campaign performance with intelligent data analysis and reporting",
                details: "Custom dashboards, trend analysis, and predictive performance modeling"
              },
              {
                icon: "⚡",
                title: "Real-time Monitoring",
                description: "Monitor your campaigns 24/7 with instant alerts and automated performance tracking",
                details: "Instant notifications, performance thresholds, and automated response systems"
              },
              {
                icon: "🎯",
                title: "Advanced Targeting",
                description: "Reach your ideal audience with precision targeting and intelligent audience segmentation",
                details: "Lookalike audiences, custom intent targeting, and cross-platform optimization"
              },
              {
                icon: "📈",
                title: "Performance Forecasting",
                description: "Predict campaign performance and optimize budgets with AI-powered forecasting",
                details: "Budget optimization, seasonal trend analysis, and ROI prediction models"
              },
              {
                icon: "🔄",
                title: "Automated Workflows",
                description: "Streamline your workflow with automated campaign management and optimization",
                details: "Scheduled optimizations, automated reporting, and intelligent rule-based actions"
              }
            ].map((feature, index) => (
              <div 
                key={index}
                style={{
                  position: 'relative',
                  padding: '40px',
                  background: 'linear-gradient(135deg, rgba(0, 255, 231, 0.1), rgba(127, 156, 245, 0.1))',
                  border: '1px solid rgba(0, 255, 231, 0.2)',
                  borderRadius: '20px',
                  backdropFilter: 'blur(12px)',
                  transition: 'all 0.3s ease',
                  transform: 'translateY(0)',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  const target = e.target as HTMLElement;
                  target.style.transform = 'translateY(-12px) scale(1.02)';
                  target.style.border = '1px solid rgba(0, 255, 231, 0.4)';
                  target.style.boxShadow = '0 20px 40px rgba(0, 255, 231, 0.2)';
                }}
                onMouseLeave={(e) => {
                  const target = e.target as HTMLElement;
                  target.style.transform = 'translateY(0) scale(1)';
                  target.style.border = '1px solid rgba(0, 255, 231, 0.2)';
                  target.style.boxShadow = 'none';
                }}
              >
                <div style={{ 
                  fontSize: '56px', 
                  marginBottom: '24px',
                  filter: 'drop-shadow(0 4px 8px rgba(0, 255, 231, 0.3))'
                }}>
                  {feature.icon}
                </div>
                <h3 style={{
                  fontSize: '24px',
                  fontWeight: 700,
                  color: 'white',
                  marginBottom: '16px'
                }}>
                  {feature.title}
                </h3>
                <p style={{
                  color: '#a0a0a0',
                  lineHeight: 1.6,
                  marginBottom: '16px',
                  fontSize: '16px'
                }}>
                  {feature.description}
                </p>
                <p style={{
                  color: '#7f9cf5',
                  lineHeight: 1.5,
                  fontSize: '14px',
                  fontStyle: 'italic'
                }}>
                  {feature.details}
                </p>
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(45deg, rgba(0, 255, 231, 0.05), rgba(127, 156, 245, 0.05))',
                  borderRadius: '20px',
                  opacity: 0,
                  transition: 'opacity 0.3s ease'
                }}></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section style={{
        padding: '120px 0',
        background: '#1a1a1a',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background Elements */}
        <div style={{ position: 'absolute', inset: 0 }}>
          <div style={{
            position: 'absolute',
            top: '10%',
            left: '5%',
            width: '300px',
            height: '300px',
            background: 'linear-gradient(45deg, #00ffe7, #7f9cf5)',
            borderRadius: '50%',
            filter: 'blur(100px)',
            opacity: 0.1,
            animation: 'pulse 6s ease-in-out infinite'
          }}></div>
          <div style={{
            position: 'absolute',
            bottom: '10%',
            right: '5%',
            width: '250px',
            height: '250px',
            background: 'linear-gradient(45deg, #7f9cf5, #00ffe7)',
            borderRadius: '50%',
            filter: 'blur(80px)',
            opacity: 0.1,
            animation: 'pulse 6s ease-in-out infinite 3s'
          }}></div>
        </div>

        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 24px',
          position: 'relative',
          zIndex: 10
        }}>
          {/* Section Header */}
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <h2 style={{
              fontSize: 'clamp(36px, 5vw, 48px)',
              fontWeight: 700,
              marginBottom: '24px',
              backgroundImage: 'linear-gradient(45deg, #ffffff, #00ffe7)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              FROM IDEA TO OPTIMIZATION IN MINUTES
            </h2>
            <p style={{
              fontSize: '20px',
              color: '#a0a0a0',
              maxWidth: '700px',
              margin: '0 auto',
              lineHeight: 1.6
            }}>
              How Kampaio works - simple, fast, and intelligent
            </p>
          </div>

          {/* Steps Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '40px',
            marginBottom: '80px'
          }}>
            {[
              {
                number: "1",
                title: "Connect Your Account",
                description: "Link your Google Ads account securely with one-click OAuth integration",
                icon: "🔗",
                details: "Instant connection, no API keys needed, secure data handling"
              },
              {
                number: "2",
                title: "AI Analysis",
                description: "Our AI analyzes your campaigns, performance data, and optimization opportunities",
                icon: "🤖",
                details: "Real-time data processing, performance insights, optimization recommendations"
              },
              {
                number: "3",
                title: "Get Recommendations",
                description: "Receive personalized optimization suggestions and performance insights",
                icon: "💡",
                details: "Actionable insights, A/B testing suggestions, budget optimization"
              },
              {
                number: "4",
                title: "Apply & Monitor",
                description: "Apply changes with one click and monitor results in real-time",
                icon: "📊",
                details: "Automated implementation, performance tracking, ROI measurement"
              }
            ].map((step, index) => (
              <div 
                key={index}
                style={{
                  position: 'relative',
                  padding: '40px 30px',
                  background: 'linear-gradient(135deg, rgba(0, 255, 231, 0.08), rgba(127, 156, 245, 0.08))',
                  border: '1px solid rgba(0, 255, 231, 0.2)',
                  borderRadius: '20px',
                  backdropFilter: 'blur(12px)',
                  transition: 'all 0.3s ease',
                  transform: 'translateY(0)',
                  cursor: 'pointer',
                  textAlign: 'center'
                }}
                onMouseEnter={(e) => {
                  const target = e.target as HTMLElement;
                  target.style.transform = 'translateY(-8px) scale(1.02)';
                  target.style.border = '1px solid rgba(0, 255, 231, 0.4)';
                  target.style.boxShadow = '0 20px 40px rgba(0, 255, 231, 0.15)';
                }}
                onMouseLeave={(e) => {
                  const target = e.target as HTMLElement;
                  target.style.transform = 'translateY(0) scale(1)';
                  target.style.border = '1px solid rgba(0, 255, 231, 0.2)';
                  target.style.boxShadow = 'none';
                }}
              >
                {/* Step Number */}
                <div style={{
                  position: 'absolute',
                  top: '-20px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '40px',
                  height: '40px',
                  background: 'linear-gradient(45deg, #00ffe7, #7f9cf5)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '18px',
                  fontWeight: 700,
                  color: '#1a1a1a',
                  boxShadow: '0 4px 15px rgba(0, 255, 231, 0.3)'
                }}>
                  {step.number}
                </div>

                {/* Icon */}
                <div style={{ 
                  fontSize: '48px', 
                  marginBottom: '20px',
                  filter: 'drop-shadow(0 4px 8px rgba(0, 255, 231, 0.3))'
                }}>
                  {step.icon}
                </div>

                {/* Content */}
                <h3 style={{
                  fontSize: '22px',
                  fontWeight: 700,
                  color: 'white',
                  marginBottom: '16px'
                }}>
                  {step.title}
                </h3>
                <p style={{
                  color: '#a0a0a0',
                  lineHeight: 1.6,
                  marginBottom: '16px',
                  fontSize: '16px'
                }}>
                  {step.description}
                </p>
                <p style={{
                  color: '#7f9cf5',
                  lineHeight: 1.5,
                  fontSize: '14px',
                  fontStyle: 'italic'
                }}>
                  {step.details}
                </p>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div style={{
            textAlign: 'center',
            padding: '60px 40px',
            background: 'linear-gradient(135deg, rgba(0, 255, 231, 0.1), rgba(127, 156, 245, 0.1))',
            border: '1px solid rgba(0, 255, 231, 0.2)',
            borderRadius: '24px',
            backdropFilter: 'blur(12px)'
          }}>
            <h3 style={{
              fontSize: '32px',
              fontWeight: 700,
              color: 'white',
              marginBottom: '20px'
            }}>
              Ready to optimize your campaigns?
            </h3>
            <p style={{
              fontSize: '18px',
              color: '#a0a0a0',
              marginBottom: '40px',
              maxWidth: '600px',
              marginLeft: 'auto',
              marginRight: 'auto'
            }}>
              Join thousands of marketers who trust Kampaio to optimize their Google Ads campaigns
            </p>
            <div style={{
              display: 'flex',
              gap: '20px',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              <button style={{
                padding: '16px 32px',
                background: 'linear-gradient(45deg, #00ffe7, #7f9cf5)',
                border: 'none',
                borderRadius: '12px',
                fontWeight: 600,
                color: '#1a1a1a',
                fontSize: '16px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 8px 25px rgba(0, 255, 231, 0.3)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
              onMouseEnter={(e) => {
                const target = e.target as HTMLElement;
                target.style.transform = 'translateY(-2px)';
                target.style.boxShadow = '0 12px 35px rgba(0, 255, 231, 0.4)';
              }}
              onMouseLeave={(e) => {
                const target = e.target as HTMLElement;
                target.style.transform = 'translateY(0)';
                target.style.boxShadow = '0 8px 25px rgba(0, 255, 231, 0.3)';
              }}>
                Start Free Trial
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginLeft: '8px' }}>
                  <path d="M8 1L15 8L8 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M1 8H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <button style={{
                padding: '16px 32px',
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '12px',
                fontWeight: 600,
                color: 'white',
                fontSize: '16px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                backdropFilter: 'blur(8px)'
              }}
              onMouseEnter={(e) => {
                const target = e.target as HTMLElement;
                target.style.transform = 'translateY(-2px)';
                target.style.background = 'rgba(255, 255, 255, 0.2)';
              }}
              onMouseLeave={(e) => {
                const target = e.target as HTMLElement;
                target.style.transform = 'translateY(0)';
                target.style.background = 'rgba(255, 255, 255, 0.1)';
              }}>
                Book Demo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* AI-Powered Google Ads Assistant Section */}
      <section style={{
        padding: '120px 0',
        background: '#1a1a1a',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background gradient */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 30% 20%, rgba(127,156,245,0.1) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(0,255,231,0.08) 0%, transparent 50%)',
          pointerEvents: 'none'
        }}></div>
        
        <div style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 24px'
        }}>
          {/* Hero Section */}
          <div style={{textAlign: 'center', marginBottom: '80px'}}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              background: 'rgba(127,156,245,0.1)',
              border: '1px solid rgba(127,156,245,0.2)',
              borderRadius: '50px',
              padding: '8px 20px',
              marginBottom: '24px'
            }}>
              <div style={{
                width: '8px',
                height: '8px',
                background: '#00ffe7',
                borderRadius: '50%',
                animation: 'pulse 2s infinite'
              }}></div>
              <span style={{
                fontSize: '14px',
                fontWeight: '600',
                color: '#00ffe7',
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}>AI Assistant</span>
            </div>
            <h2 style={{
              fontSize: '48px',
              fontWeight: '700',
              color: '#fff',
              marginBottom: '24px',
              marginTop: 0,
              lineHeight: '1.1'
            }}>
              AI-Powered Google Ads Assistant
            </h2>
            <p style={{
              fontSize: '20px',
              color: '#a0a0a0',
              marginBottom: '40px',
              maxWidth: '600px',
              marginLeft: 'auto',
              marginRight: 'auto',
              lineHeight: '1.6'
            }}>
              Intelligent analytics, strategy generation, and campaign optimization powered by AI. 
              Your smart partner for Google Ads success.
            </p>
            
            {/* Interactive Demo Button */}
            <button style={{
              background: 'linear-gradient(135deg, #00ffe7 0%, #7f9cf5 100%)',
              border: 'none',
              borderRadius: '12px',
              padding: '16px 32px',
              fontSize: '16px',
              fontWeight: '600',
              color: '#1a1a1a',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 8px 32px rgba(0,255,231,0.3)',
              marginBottom: '60px'
            }} onMouseEnter={(e) => {
              const target = e.target as HTMLElement;
              target.style.transform = 'translateY(-2px)';
              target.style.boxShadow = '0 12px 40px rgba(0,255,231,0.4)';
            }} onMouseLeave={(e) => {
              const target = e.target as HTMLElement;
              target.style.transform = 'translateY(0)';
              target.style.boxShadow = '0 8px 32px rgba(0,255,231,0.3)';
            }}>
              Try Interactive Demo
            </button>
          </div>

          {/* Live Chat Demo */}
          <div style={{
            background: 'linear-gradient(135deg, #23272f 0%, #1a1a1a 100%)',
            borderRadius: '20px',
            padding: '40px',
            marginBottom: '80px',
            border: '1px solid rgba(255,255,255,0.1)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
          }}>
            <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px'}}>
              <div style={{width: '12px', height: '12px', background: '#00ffe7', borderRadius: '50%'}}></div>
              <span style={{fontSize: '18px', fontWeight: '600', color: '#fff'}}>Live Demo</span>
            </div>
            
            {/* Chat Interface Mockup */}
            <div style={{
              background: '#1a1a1a',
              borderRadius: '16px',
              padding: '24px',
              border: '1px solid rgba(255,255,255,0.1)'
            }}>
              <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px'}}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  background: 'linear-gradient(135deg, #00ffe7, #7f9cf5)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <span style={{fontSize: '14px', fontWeight: '700', color: '#1a1a1a'}}>AI</span>
                </div>
                <span style={{fontSize: '14px', color: '#00ffe7', fontWeight: '600'}}>Kampaio Assistant</span>
              </div>
              
              <div style={{marginBottom: '16px'}}>
                <div style={{
                  background: 'rgba(127,156,245,0.1)',
                  borderRadius: '12px',
                  padding: '16px',
                  border: '1px solid rgba(127,156,245,0.2)'
                }}>
                  <p style={{fontSize: '14px', color: '#fff', margin: 0, lineHeight: '1.5'}}>
                    I've analyzed your Google Ads campaign. Your CTR is 2.3% which is below industry average. 
                    I recommend optimizing your ad copy and testing new keywords. Would you like me to generate 
                    some suggestions?
                  </p>
                </div>
              </div>
              
              <div style={{display: 'flex', gap: '8px'}}>
                <button style={{
                  background: 'rgba(0,255,231,0.1)',
                  border: '1px solid rgba(0,255,231,0.3)',
                  borderRadius: '8px',
                  padding: '8px 16px',
                  fontSize: '12px',
                  color: '#00ffe7',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }} onMouseEnter={(e) => {
                  const target = e.target as HTMLElement;
                  target.style.background = 'rgba(0,255,231,0.2)';
                }} onMouseLeave={(e) => {
                  const target = e.target as HTMLElement;
                  target.style.background = 'rgba(0,255,231,0.1)';
                }}>
                  Generate Suggestions
                </button>
                <button style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '8px',
                  padding: '8px 16px',
                  fontSize: '12px',
                  color: '#a0a0a0',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }} onMouseEnter={(e) => {
                  const target = e.target as HTMLElement;
                  target.style.background = 'rgba(255,255,255,0.1)';
                }} onMouseLeave={(e) => {
                  const target = e.target as HTMLElement;
                  target.style.background = 'rgba(255,255,255,0.05)';
                }}>
                  View Analytics
                </button>
              </div>
            </div>
          </div>

          {/* 4 Key Capabilities */}
          <div style={{marginBottom: '80px'}}>
            <h3 style={{
              fontSize: '32px',
              fontWeight: '700',
              color: '#fff',
              textAlign: 'center',
              marginBottom: '48px',
              marginTop: 0
            }}>
              Key Capabilities
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '32px'
            }}>
              {/* Analytics */}
              <div style={{
                background: 'linear-gradient(135deg, rgba(127,156,245,0.1) 0%, rgba(0,255,231,0.05) 100%)',
                borderRadius: '16px',
                padding: '32px',
                border: '1px solid rgba(127,156,245,0.2)',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }} onMouseEnter={(e) => {
                const target = e.target as HTMLElement;
                target.style.transform = 'translateY(-4px)';
                target.style.boxShadow = '0 20px 40px rgba(127,156,245,0.2)';
              }} onMouseLeave={(e) => {
                const target = e.target as HTMLElement;
                target.style.transform = 'translateY(0)';
                target.style.boxShadow = 'none';
              }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  background: 'linear-gradient(135deg, #00ffe7, #7f9cf5)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '24px'
                }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 3v18h18"/>
                    <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3"/>
                  </svg>
                </div>
                <h4 style={{fontSize: '20px', fontWeight: '700', color: '#fff', marginBottom: '12px', marginTop: 0}}>Smart Analytics</h4>
                <p style={{fontSize: '16px', color: '#a0a0a0', margin: 0, lineHeight: '1.6'}}>
                  AI-powered insights that identify opportunities and threats in your campaigns. 
                  Get actionable recommendations based on real data.
                </p>
              </div>

              {/* Strategy Generation */}
              <div style={{
                background: 'linear-gradient(135deg, rgba(127,156,245,0.1) 0%, rgba(0,255,231,0.05) 100%)',
                borderRadius: '16px',
                padding: '32px',
                border: '1px solid rgba(127,156,245,0.2)',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }} onMouseEnter={(e) => {
                const target = e.target as HTMLElement;
                target.style.transform = 'translateY(-4px)';
                target.style.boxShadow = '0 20px 40px rgba(127,156,245,0.2)';
              }} onMouseLeave={(e) => {
                const target = e.target as HTMLElement;
                target.style.transform = 'translateY(0)';
                target.style.boxShadow = 'none';
              }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  background: 'linear-gradient(135deg, #00ffe7, #7f9cf5)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '24px'
                }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 11H1l8-8 8 8h-8v8z"/>
                    <path d="M5 15h14"/>
                  </svg>
                </div>
                <h4 style={{fontSize: '20px', fontWeight: '700', color: '#fff', marginBottom: '12px', marginTop: 0}}>Strategy Generation</h4>
                <p style={{fontSize: '16px', color: '#a0a0a0', margin: 0, lineHeight: '1.6'}}>
                  Generate complete campaign strategies tailored to your industry and goals. 
                  From keyword research to ad copy optimization.
                </p>
              </div>

              {/* Automation */}
              <div style={{
                background: 'linear-gradient(135deg, rgba(127,156,245,0.1) 0%, rgba(0,255,231,0.05) 100%)',
                borderRadius: '16px',
                padding: '32px',
                border: '1px solid rgba(127,156,245,0.2)',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }} onMouseEnter={(e) => {
                const target = e.target as HTMLElement;
                target.style.transform = 'translateY(-4px)';
                target.style.boxShadow = '0 20px 40px rgba(127,156,245,0.2)';
              }} onMouseLeave={(e) => {
                const target = e.target as HTMLElement;
                target.style.transform = 'translateY(0)';
                target.style.boxShadow = 'none';
              }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  background: 'linear-gradient(135deg, #00ffe7, #7f9cf5)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '24px'
                }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
                  </svg>
                </div>
                <h4 style={{fontSize: '20px', fontWeight: '700', color: '#fff', marginBottom: '12px', marginTop: 0}}>Smart Automation</h4>
                <p style={{fontSize: '16px', color: '#a0a0a0', margin: 0, lineHeight: '1.6'}}>
                  Automate routine tasks like bid adjustments, budget optimization, and 
                  performance monitoring. Focus on strategy, not administration.
                </p>
              </div>

              {/* Performance Optimization */}
              <div style={{
                background: 'linear-gradient(135deg, rgba(127,156,245,0.1) 0%, rgba(0,255,231,0.05) 100%)',
                borderRadius: '16px',
                padding: '32px',
                border: '1px solid rgba(127,156,245,0.2)',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }} onMouseEnter={(e) => {
                const target = e.target as HTMLElement;
                target.style.transform = 'translateY(-4px)';
                target.style.boxShadow = '0 20px 40px rgba(127,156,245,0.2)';
              }} onMouseLeave={(e) => {
                const target = e.target as HTMLElement;
                target.style.transform = 'translateY(0)';
                target.style.boxShadow = 'none';
              }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  background: 'linear-gradient(135deg, #00ffe7, #7f9cf5)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '24px'
                }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
                  </svg>
                </div>
                <h4 style={{fontSize: '20px', fontWeight: '700', color: '#fff', marginBottom: '12px', marginTop: 0}}>Performance Boost</h4>
                <p style={{fontSize: '16px', color: '#a0a0a0', margin: 0, lineHeight: '1.6'}}>
                  Continuously optimize your campaigns for better ROI. AI learns from your 
                  performance data to suggest improvements in real-time.
                </p>
              </div>
            </div>
          </div>

          {/* Template Gallery */}
          <div style={{marginBottom: '80px'}}>
            <h3 style={{
              fontSize: '32px',
              fontWeight: '700',
              color: '#fff',
              textAlign: 'center',
              marginBottom: '48px',
              marginTop: 0
            }}>
              Ready-to-Use Templates
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '24px'
            }}>
              {[
                {name: 'E-commerce', icon: '🛒', desc: 'Product campaigns, shopping ads, retargeting'},
                {name: 'B2B SaaS', icon: '💼', desc: 'Lead generation, account-based marketing'},
                {name: 'Local Business', icon: '📍', desc: 'Local SEO, location-based targeting'},
                {name: 'Agency', icon: '🎯', desc: 'Client management, multi-account optimization'}
              ].map((template, index) => (
                <div key={index} style={{
                  background: 'rgba(255,255,255,0.03)',
                  borderRadius: '16px',
                  padding: '24px',
                  border: '1px solid rgba(255,255,255,0.1)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }} onMouseEnter={(e) => {
                  const target = e.target as HTMLElement;
                  target.style.background = 'rgba(127,156,245,0.1)';
                  target.style.border = '1px solid rgba(127,156,245,0.3)';
                  target.style.transform = 'translateY(-2px)';
                }} onMouseLeave={(e) => {
                  const target = e.target as HTMLElement;
                  target.style.background = 'rgba(255,255,255,0.03)';
                  target.style.border = '1px solid rgba(255,255,255,0.1)';
                  target.style.transform = 'translateY(0)';
                }}>
                  <div style={{fontSize: '32px', marginBottom: '16px'}}>{template.icon}</div>
                  <h4 style={{fontSize: '18px', fontWeight: '700', color: '#fff', marginBottom: '8px', marginTop: 0}}>{template.name}</h4>
                  <p style={{fontSize: '14px', color: '#a0a0a0', margin: 0, lineHeight: '1.5'}}>{template.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Early Access CTA */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(127,156,245,0.1) 0%, rgba(0,255,231,0.05) 100%)',
            borderRadius: '20px',
            padding: '48px',
            textAlign: 'center',
            border: '1px solid rgba(127,156,245,0.2)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{
              position: 'absolute',
              top: '-50%',
              right: '-50%',
              width: '200px',
              height: '200px',
              background: 'radial-gradient(circle, rgba(0,255,231,0.1) 0%, transparent 70%)',
              borderRadius: '50%'
            }}></div>
            <div style={{
              position: 'absolute',
              bottom: '-30%',
              left: '-30%',
              width: '150px',
              height: '150px',
              background: 'radial-gradient(circle, rgba(127,156,245,0.1) 0%, transparent 70%)',
              borderRadius: '50%'
            }}></div>
            
            <div style={{position: 'relative', zIndex: 1}}>
              <h3 style={{
                fontSize: '32px',
                fontWeight: '700',
                color: '#fff',
                marginBottom: '16px',
                marginTop: 0
              }}>
                Get Early Access
              </h3>
              <p style={{
                fontSize: '18px',
                color: '#a0a0a0',
                marginBottom: '32px',
                maxWidth: '500px',
                marginLeft: 'auto',
                marginRight: 'auto',
                lineHeight: '1.6'
              }}>
                Be among the first to experience the future of Google Ads management. 
                Join our beta program and get exclusive access to advanced features.
              </p>
              
              <div style={{
                display: 'flex',
                gap: '16px',
                justifyContent: 'center',
                flexWrap: 'wrap'
              }}>
                <input 
                  type="email" 
                  placeholder="Enter your email"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '12px',
                    padding: '16px 20px',
                    fontSize: '16px',
                    color: '#fff',
                    minWidth: '300px',
                    outline: 'none'
                  }}
                />
                <button style={{
                  background: 'linear-gradient(135deg, #00ffe7 0%, #7f9cf5 100%)',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '16px 32px',
                  fontSize: '16px',
                  fontWeight: '600',
                  color: '#1a1a1a',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 8px 32px rgba(0,255,231,0.3)'
                }} onMouseEnter={(e) => {
                  const target = e.target as HTMLElement;
                  target.style.transform = 'translateY(-2px)';
                  target.style.boxShadow = '0 12px 40px rgba(0,255,231,0.4)';
                }} onMouseLeave={(e) => {
                  const target = e.target as HTMLElement;
                  target.style.transform = 'translateY(0)';
                  target.style.boxShadow = '0 8px 32px rgba(0,255,231,0.3)';
                }}>
                  Join Beta
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.4; }
        }
        
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }

        @keyframes slideInRight {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes slideInLeft {
          from {
            transform: translateX(-100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes typing {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
} 