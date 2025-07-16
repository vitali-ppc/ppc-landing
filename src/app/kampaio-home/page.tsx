'use client';

import { useState } from 'react';
import Header from '../../components/Header';
import AnimatedHero from '../../components/AnimatedHero';

export default function KampaioHome() {
  return (
    <>
      <style jsx>{`
        @keyframes aiPulse {
          0%, 100% { 
            transform: scale(1);
            box-shadow: 0 8px 40px rgba(26,26,26,0.15);
          }
          50% { 
            transform: scale(1.05);
            box-shadow: 0 12px 50px rgba(26,26,26,0.25);
          }
        }
        
        @keyframes rotate {
          from { transform: translate(-50%,-50%) rotate(0deg); }
          to { transform: translate(-50%,-50%) rotate(360deg); }
        }
        
        @keyframes flow {
          0% { transform: translateX(-100%); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateX(100%); opacity: 0; }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
        
        @keyframes countUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
  return (
    <div style={{
      minHeight: '100vh',
      background: '#1a1a1a',
      color: 'white',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      {/* Header */}
      <Header variant="full" />

      {/* Main Hero Block 1 */}
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
          background: 'radial-gradient(circle at 20% 30%, rgba(127,156,245,0.15) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(0,255,231,0.1) 0%, transparent 50%)',
          pointerEvents: 'none'
        }}></div>
        
        <div style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 24px'
        }}>
          {/* Hero Section - Two Column Layout */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '80px',
            alignItems: 'center'
          }}>
            {/* Left side - Text content */}
            <div style={{ textAlign: 'left' }}>
              <h1 style={{
                fontSize: 'clamp(40px, 5vw, 56px)',
                fontWeight: '800',
                color: '#fff',
                marginBottom: '24px',
                marginTop: 0,
                lineHeight: '1.1'
              }}>
                AI Assistant for Smarter Google Ads Management
              </h1>
              <p style={{
                fontSize: 'clamp(18px, 2vw, 22px)',
                color: '#a0a0a0',
                marginBottom: '40px',
                lineHeight: '1.6',
                fontWeight: '400'
              }}>
                Analyze your Google Ads campaigns, discover growth opportunities, and automate optimizations — all with one AI-powered platform
              </p>
              
              {/* CTA Button */}
              <button style={{
                background: 'white',
                border: 'none',
                borderRadius: '12px',
                padding: '18px 36px',
                fontSize: '18px',
                fontWeight: '700',
                color: '#1a1a1a',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 8px 32px rgba(255,255,255,0.2)',
                letterSpacing: '0.5px'
              }} onMouseEnter={(e) => {
                const target = e.target as HTMLElement;
                target.style.transform = 'translateY(-3px)';
                target.style.boxShadow = '0 12px 40px rgba(255,255,255,0.3)';
              }} onMouseLeave={(e) => {
                const target = e.target as HTMLElement;
                target.style.transform = 'translateY(0)';
                target.style.boxShadow = '0 8px 32px rgba(255,255,255,0.2)';
              }}>
                Start Your Free Trial
              </button>
              
              {/* No credit card required */}
              <div style={{
                marginTop: '12px',
                textAlign: 'left'
              }}>
                <span style={{
                  fontSize: '12px',
                  color: '#a0a0a0',
                  fontWeight: '400'
                }}>
                  No credit card required
                </span>
              </div>
            </div>

            {/* Right side - Claude-style Chat Interface */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'relative'
            }}>
              {/* Main interface container */}
              <div style={{
                width: '550px',
                height: '400px',
                background: '#fafafa',
                borderRadius: '12px',
                border: '1px solid #e5e5e5',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: '0 20px 60px rgba(0,0,0,0.1)',
                display: 'flex'
              }}>
                {/* Left Sidebar */}
                <div style={{
                  width: '200px',
                  background: '#f5f5f5',
                  borderRight: '1px solid #e5e5e5',
                  padding: '20px 0',
                  display: 'flex',
                  flexDirection: 'column'
                }}>
                  {/* Logo */}
                  <div style={{
                    padding: '0 20px 20px 20px',
                    borderBottom: '1px solid #e5e5e5',
                    marginBottom: '20px'
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}>
                      <div style={{
                        width: '24px',
                        height: '24px',
                        background: 'linear-gradient(135deg, #00ffe7, #7f9cf5)',
                        borderRadius: '6px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#1a1a1a' }}>K</span>
                      </div>
                      <span style={{ color: '#1a1a1a', fontWeight: '600', fontSize: '16px' }}>Kampaio</span>
                    </div>
                  </div>

                  {/* Navigation */}
                  <div style={{
                    padding: '0 20px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px'
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '8px 12px',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      color: '#1a1a1a',
                      fontSize: '14px'
                    }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                      </svg>
                      New chat
                    </div>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '8px 12px',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      color: '#666',
                      fontSize: '14px'
                    }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                      </svg>
                      Chats
                    </div>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '8px 12px',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      color: '#666',
                      fontSize: '14px'
                    }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="3" width="7" height="7"></rect>
                        <rect x="14" y="3" width="7" height="7"></rect>
                        <rect x="14" y="14" width="7" height="7"></rect>
                        <rect x="3" y="14" width="7" height="7"></rect>
                      </svg>
                      Analytics
                    </div>
                  </div>

                  {/* Recent Chats */}
                  <div style={{
                    marginTop: '20px',
                    padding: '0 20px',
                    flex: 1,
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      fontSize: '12px',
                      color: '#666',
                      fontWeight: '500',
                      marginBottom: '12px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>
                      Recent
                    </div>
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '4px',
                      maxHeight: '200px',
                      overflow: 'auto'
                    }}>
                      {['Campaign Analysis', 'ROI Optimization', 'Keyword Research', 'Budget Planning', 'Performance Review'].map((chat, index) => (
                        <div key={index} style={{
                          padding: '6px 8px',
                          borderRadius: '4px',
                          fontSize: '13px',
                          color: '#666',
                          cursor: 'pointer',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis'
                        }}>
                          {chat}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Main Chat Area */}
                <div style={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  background: '#fafafa'
                }}>
                  {/* Top Bar */}
                  <div style={{
                    padding: '16px 24px',
                    borderBottom: '1px solid #e5e5e5',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px'
                    }}>
                      <div style={{
                        width: '8px',
                        height: '8px',
                        background: '#00ffe7',
                        borderRadius: '50%'
                      }}></div>
                      <span style={{ color: '#1a1a1a', fontWeight: '500', fontSize: '14px' }}>Welcome, user</span>
                    </div>
                    <div style={{
                      padding: '4px 12px',
                      background: '#f0f0f0',
                      borderRadius: '6px',
                      fontSize: '12px',
                      color: '#666'
                    }}>
                      Free plan
                    </div>
                  </div>

                  {/* Chat Messages */}
                  <div style={{
                    flex: 1,
                    padding: '24px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                    overflow: 'auto'
                  }}>
                    {/* AI Message */}
                    <div style={{
                      display: 'flex',
                      gap: '12px',
                      alignItems: 'flex-start'
                    }}>
                      <div style={{
                        width: '28px',
                        height: '28px',
                        background: 'linear-gradient(135deg, #00ffe7, #7f9cf5)',
                        borderRadius: '6px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}>
                        <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#1a1a1a' }}>K</span>
                      </div>
                      <div style={{
                        background: 'white',
                        padding: '12px 16px',
                        borderRadius: '8px',
                        border: '1px solid #e5e5e5',
                        fontSize: '14px',
                        color: '#1a1a1a',
                        lineHeight: '1.5',
                        maxWidth: '80%'
                      }}>
                        Hello! I'm your AI assistant for Google Ads optimization. I can help you analyze campaigns, find growth opportunities, and automate optimizations. What would you like to work on today?
                      </div>
                    </div>

                    {/* User Message */}
                    <div style={{
                      display: 'flex',
                      gap: '12px',
                      alignItems: 'flex-start',
                      justifyContent: 'flex-end'
                    }}>
                      <div style={{
                        background: '#f5f5f5',
                        padding: '12px 16px',
                        borderRadius: '8px',
                        fontSize: '14px',
                        color: '#1a1a1a',
                        lineHeight: '1.5',
                        maxWidth: '80%',
                        border: '1px solid #e5e5e5'
                      }}>
                        Can you analyze my recent campaign performance?
                      </div>
                      <div style={{
                        width: '28px',
                        height: '28px',
                        background: '#f0f0f0',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}>
                        <span style={{ fontSize: '12px', fontWeight: '500', color: '#666' }}>U</span>
                      </div>
                    </div>

                    {/* AI Response */}
                    <div style={{
                      display: 'flex',
                      gap: '12px',
                      alignItems: 'flex-start'
                    }}>
                      <div style={{
                        width: '28px',
                        height: '28px',
                        background: 'linear-gradient(135deg, #00ffe7, #7f9cf5)',
                        borderRadius: '6px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}>
                        <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#1a1a1a' }}>K</span>
                      </div>
                      <div style={{
                        background: 'white',
                        padding: '12px 16px',
                        borderRadius: '8px',
                        border: '1px solid #e5e5e5',
                        fontSize: '14px',
                        color: '#1a1a1a',
                        lineHeight: '1.5',
                        maxWidth: '80%'
                      }}>
                        I've analyzed your recent campaigns and found several optimization opportunities:
                        <br/><br/>
                        • <strong>CTR improvement:</strong> 23% potential increase<br/>
                        • <strong>Cost reduction:</strong> 15% savings possible<br/>
                        • <strong>Conversion boost:</strong> 8% improvement expected
                      </div>
                    </div>
                  </div>

                  {/* Input Area */}
                  <div style={{
                    padding: '16px 24px',
                    borderTop: '1px solid #e5e5e5',
                    background: 'white'
                  }}>
                    <div style={{
                      display: 'flex',
                      gap: '12px',
                      alignItems: 'center',
                      background: '#f5f5f5',
                      borderRadius: '8px',
                      padding: '8px 12px',
                      border: '1px solid #e5e5e5',
                      height: '40px',
                      maxWidth: '400px',
                      margin: '0 auto'
                    }}>
                      <div style={{
                        display: 'flex',
                        gap: '8px'
                      }}>
                        <div style={{
                          width: '16px',
                          height: '16px',
                          background: '#f0f0f0',
                          borderRadius: '3px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer'
                        }}>
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="12" y1="5" x2="12" y2="19"></line>
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                          </svg>
                        </div>
                        <div style={{
                          width: '16px',
                          height: '16px',
                          background: '#f0f0f0',
                          borderRadius: '3px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer'
                        }}>
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                          </svg>
                        </div>
                      </div>
                      <div style={{
                        flex: 1,
                        fontSize: '13px',
                        color: '#666'
                      }}>
                        How can I help you today?
                      </div>

                      <div style={{
                        width: '28px',
                        height: '28px',
                        background: '#1a1a1a',
                        borderRadius: '6px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer'
                      }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                          <line x1="22" y1="2" x2="11" y2="13"></line>
                          <polygon points="22,2 15,22 11,13 2,9 22,2"></polygon>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Hero Block 2 - Interactive AI Hero */}
      <AnimatedHero />

      {/* How Kampaio Helps You Run Smarter Ads */}
      <section style={{
        padding: '120px 0',
        background: 'linear-gradient(180deg, #fafbfc 0%, #ffffff 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Gradient Transition from Previous Section */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '100px',
          background: 'linear-gradient(180deg, rgba(26,26,26,0.1) 0%, transparent 100%)',
          pointerEvents: 'none'
        }}></div>

        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 24px',
          position: 'relative',
          zIndex: 1
        }}>
          {/* Section Header */}
          <div style={{
            textAlign: 'center',
            marginBottom: '80px'
          }}>
            <h2 style={{
              fontSize: 'clamp(36px, 4vw, 48px)',
              fontWeight: '800',
              color: '#1a1a1a',
              marginBottom: '24px',
              lineHeight: '1.2'
            }}>
              How Kampaio Helps You Run Smarter Ads
            </h2>
            <p style={{
              fontSize: 'clamp(18px, 2vw, 20px)',
              color: '#666',
              maxWidth: '600px',
              margin: '0 auto',
              lineHeight: '1.6'
            }}>
              From AI-powered insights to automated optimizations — discover how our platform transforms your Google Ads management
            </p>
          </div>

          {/* Features Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '40px',
            marginBottom: '80px'
          }}>
            {/* Feature 1: AI-Powered Analysis */}
            <div style={{
              background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
              borderRadius: '20px',
              padding: '40px',
              border: '1px solid rgba(127,156,245,0.1)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.12), 0 4px 16px rgba(127,156,245,0.08)',
              transition: 'all 0.4s ease',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseEnter={(e) => {
              const target = e.target as HTMLElement;
              target.style.transform = 'translateY(-8px)';
              target.style.boxShadow = '0 30px 60px rgba(127,156,245,0.15)';
              target.style.borderColor = 'rgba(127,156,245,0.3)';
            }}
            onMouseLeave={(e) => {
              const target = e.target as HTMLElement;
              target.style.transform = 'translateY(0)';
              target.style.boxShadow = '0 20px 40px rgba(0,0,0,0.08)';
              target.style.borderColor = 'rgba(127,156,245,0.1)';
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                background: 'linear-gradient(135deg, #7f9cf5, #667eea)',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '24px',
                boxShadow: '0 8px 24px rgba(127,156,245,0.3)'
              }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <path d="M9 11H1l8-8 8 8h-8v8z"/>
                  <path d="M3 15h6"/>
                  <path d="M3 19h6"/>
                </svg>
              </div>
              <h3 style={{
                fontSize: '24px',
                fontWeight: '700',
                color: '#1a1a1a',
                marginBottom: '16px'
              }}>
                AI-Powered Analysis
              </h3>
              <p style={{
                fontSize: '16px',
                color: '#666',
                lineHeight: '1.6',
                marginBottom: '20px'
              }}>
                Our advanced AI analyzes your campaigns in real-time, identifying performance patterns, 
                detecting anomalies, and uncovering hidden opportunities that traditional analysis might miss.
              </p>
              <div style={{
                marginBottom: '20px'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '8px',
                  fontSize: '14px',
                  color: '#1a1a1a'
                }}>
                  <div style={{
                    width: '6px',
                    height: '6px',
                    background: '#7f9cf5',
                    borderRadius: '50%'
                  }}></div>
                  <span>Real-time performance monitoring & alerts</span>
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '8px',
                  fontSize: '14px',
                  color: '#1a1a1a'
                }}>
                  <div style={{
                    width: '6px',
                    height: '6px',
                    background: '#7f9cf5',
                    borderRadius: '50%'
                  }}></div>
                  <span>Anomaly detection & alerts</span>
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '14px',
                  color: '#1a1a1a'
                }}>
                  <div style={{
                    width: '6px',
                    height: '6px',
                    background: '#7f9cf5',
                    borderRadius: '50%'
                  }}></div>
                  <span>Hidden opportunity identification</span>
                </div>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '14px',
                color: '#7f9cf5',
                fontWeight: '600'
              }}>
                <span>Learn more</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12,5 19,12 12,19"></polyline>
                </svg>
              </div>
            </div>

            {/* Feature 2: Automated Optimization */}
            <div style={{
              background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
              borderRadius: '20px',
              padding: '40px',
              border: '1px solid rgba(0,255,231,0.1)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.12), 0 4px 16px rgba(0,255,231,0.08)',
              transition: 'all 0.4s ease',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseEnter={(e) => {
              const target = e.target as HTMLElement;
              target.style.transform = 'translateY(-8px)';
              target.style.boxShadow = '0 30px 60px rgba(0,255,231,0.15)';
              target.style.borderColor = 'rgba(0,255,231,0.3)';
            }}
            onMouseLeave={(e) => {
              const target = e.target as HTMLElement;
              target.style.transform = 'translateY(0)';
              target.style.boxShadow = '0 20px 40px rgba(0,0,0,0.08)';
              target.style.borderColor = 'rgba(0,255,231,0.1)';
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                background: 'linear-gradient(135deg, #00ffe7, #00d4aa)',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '24px',
                boxShadow: '0 8px 24px rgba(0,255,231,0.3)'
              }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <circle cx="12" cy="12" r="3"></circle>
                  <path d="M12 1v6m0 6v6"/>
                  <path d="M15.5 4.5l-3 3m3 3l-3-3"/>
                  <path d="M8.5 4.5l3 3m-3 3l3-3"/>
                </svg>
              </div>
              <h3 style={{
                fontSize: '24px',
                fontWeight: '700',
                color: '#1a1a1a',
                marginBottom: '16px'
              }}>
                Automated Optimization
              </h3>
              <p style={{
                fontSize: '16px',
                color: '#666',
                lineHeight: '1.6',
                marginBottom: '20px'
              }}>
                Set your goals and watch our AI work 24/7. Automatically adjust bids, 
                pause underperforming keywords, and optimize ad copy - all based on real-time performance data.
              </p>
              <div style={{
                marginBottom: '20px'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '8px',
                  fontSize: '14px',
                  color: '#1a1a1a'
                }}>
                  <div style={{
                    width: '6px',
                    height: '6px',
                    background: '#00ffe7',
                    borderRadius: '50%'
                  }}></div>
                  <span>Smart bid adjustments for maximum ROI</span>
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '8px',
                  fontSize: '14px',
                  color: '#1a1a1a'
                }}>
                  <div style={{
                    width: '6px',
                    height: '6px',
                    background: '#00ffe7',
                    borderRadius: '50%'
                  }}></div>
                  <span>Keyword performance management</span>
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '14px',
                  color: '#1a1a1a'
                }}>
                  <div style={{
                    width: '6px',
                    height: '6px',
                    background: '#00ffe7',
                    borderRadius: '50%'
                  }}></div>
                  <span>Ad copy optimization</span>
                </div>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '14px',
                color: '#00ffe7',
                fontWeight: '600'
              }}>
                <span>Learn more</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12,5 19,12 12,19"></polyline>
                </svg>
              </div>
            </div>

            {/* Feature 3: Predictive Insights */}
            <div style={{
              background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
              borderRadius: '20px',
              padding: '40px',
              border: '1px solid rgba(139,92,246,0.1)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.12), 0 4px 16px rgba(139,92,246,0.08)',
              transition: 'all 0.4s ease',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseEnter={(e) => {
              const target = e.target as HTMLElement;
              target.style.transform = 'translateY(-8px)';
              target.style.boxShadow = '0 30px 60px rgba(139,92,246,0.15)';
              target.style.borderColor = 'rgba(139,92,246,0.3)';
            }}
            onMouseLeave={(e) => {
              const target = e.target as HTMLElement;
              target.style.transform = 'translateY(0)';
              target.style.boxShadow = '0 20px 40px rgba(0,0,0,0.08)';
              target.style.borderColor = 'rgba(139,92,246,0.1)';
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                background: 'linear-gradient(135deg, #8b5cf6, #a855f7)',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '24px',
                boxShadow: '0 8px 24px rgba(139,92,246,0.3)'
              }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <path d="M12 2v4m0 12v4"/>
                  <path d="M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83"/>
                  <path d="M19.07 4.93l-2.83 2.83m-8.48 8.48l-2.83 2.83"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
              </div>
              <h3 style={{
                fontSize: '24px',
                fontWeight: '700',
                color: '#1a1a1a',
                marginBottom: '16px'
              }}>
                Predictive Insights
              </h3>
              <p style={{
                fontSize: '16px',
                color: '#666',
                lineHeight: '1.6',
                marginBottom: '20px'
              }}>
                Stay ahead of the competition with predictive analytics. Our AI forecasts campaign performance up to 30 days ahead, 
                identifies seasonal trends, and recommends proactive strategies before your competitors catch on.
              </p>
              <div style={{
                marginBottom: '20px'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '8px',
                  fontSize: '14px',
                  color: '#1a1a1a'
                }}>
                  <div style={{
                    width: '6px',
                    height: '6px',
                    background: '#8b5cf6',
                    borderRadius: '50%'
                  }}></div>
                  <span>Performance forecasting</span>
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '8px',
                  fontSize: '14px',
                  color: '#1a1a1a'
                }}>
                  <div style={{
                    width: '6px',
                    height: '6px',
                    background: '#8b5cf6',
                    borderRadius: '50%'
                  }}></div>
                  <span>Seasonal trend analysis</span>
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '14px',
                  color: '#1a1a1a'
                }}>
                  <div style={{
                    width: '6px',
                    height: '6px',
                    background: '#8b5cf6',
                    borderRadius: '50%'
                  }}></div>
                  <span>Proactive strategy recommendations</span>
                </div>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '14px',
                color: '#8b5cf6',
                fontWeight: '600'
              }}>
                <span>Learn more</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12,5 19,12 12,19"></polyline>
                </svg>
              </div>
            </div>
          </div>


        </div>
      </section>

      {/* Industries We Serve */}
      <section style={{
        padding: '120px 0',
        background: 'white',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 24px',
          position: 'relative',
          zIndex: 1
        }}>
          {/* Section Header */}
          <div style={{
            textAlign: 'center',
            marginBottom: '80px'
          }}>
            <h2 style={{
              fontSize: 'clamp(36px, 4vw, 48px)',
              fontWeight: '800',
              color: '#1a1a1a',
              marginBottom: '24px',
              lineHeight: '1.2'
            }}>
              Tailored AI Solutions for Every Industry
            </h2>
            <p style={{
              fontSize: 'clamp(18px, 2vw, 20px)',
              color: '#666',
              maxWidth: '600px',
              margin: '0 auto',
              lineHeight: '1.6'
            }}>
              Our AI understands the unique challenges of your business
            </p>
          </div>

          {/* Industries Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '32px',
            marginBottom: '60px'
          }}>
            {/* Dentists */}
            <div style={{
              background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
              borderRadius: '20px',
              padding: '32px',
              border: '1px solid rgba(127,156,245,0.1)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.08), 0 4px 16px rgba(127,156,245,0.05)',
              transition: 'all 0.4s ease',
              position: 'relative',
              overflow: 'hidden',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              const target = e.target as HTMLElement;
              target.style.transform = 'translateY(-8px)';
              target.style.boxShadow = '0 20px 40px rgba(0,0,0,0.12), 0 8px 24px rgba(127,156,245,0.15)';
              target.style.borderColor = 'rgba(127,156,245,0.3)';
            }}
            onMouseLeave={(e) => {
              const target = e.target as HTMLElement;
              target.style.transform = 'translateY(0)';
              target.style.boxShadow = '0 8px 32px rgba(0,0,0,0.08), 0 4px 16px rgba(127,156,245,0.05)';
              target.style.borderColor = 'rgba(127,156,245,0.1)';
            }}>
              <div style={{
                width: '56px',
                height: '56px',
                background: 'linear-gradient(135deg, #7f9cf5, #667eea)',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '24px',
                boxShadow: '0 8px 24px rgba(127,156,245,0.3)'
              }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/>
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
                  <line x1="12" y1="19" x2="12" y2="23"/>
                  <line x1="8" y1="23" x2="16" y2="23"/>
                </svg>
              </div>
              <h3 style={{
                fontSize: '22px',
                fontWeight: '700',
                color: '#1a1a1a',
                marginBottom: '16px'
              }}>
                Dentists
              </h3>
              <p style={{
                fontSize: '15px',
                color: '#666',
                lineHeight: '1.6',
                marginBottom: '20px'
              }}>
                Attract more patients with targeted local SEO campaigns. Our AI optimizes for dental-specific keywords and local search intent.
              </p>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '14px',
                color: '#7f9cf5',
                fontWeight: '600'
              }}>
                <span>Learn more</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12,5 19,12 12,19"></polyline>
                </svg>
              </div>
            </div>

            {/* Real Estate */}
            <div style={{
              background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
              borderRadius: '20px',
              padding: '32px',
              border: '1px solid rgba(0,255,231,0.1)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.08), 0 4px 16px rgba(0,255,231,0.05)',
              transition: 'all 0.4s ease',
              position: 'relative',
              overflow: 'hidden',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              const target = e.target as HTMLElement;
              target.style.transform = 'translateY(-8px)';
              target.style.boxShadow = '0 20px 40px rgba(0,0,0,0.12), 0 8px 24px rgba(0,255,231,0.15)';
              target.style.borderColor = 'rgba(0,255,231,0.3)';
            }}
            onMouseLeave={(e) => {
              const target = e.target as HTMLElement;
              target.style.transform = 'translateY(0)';
              target.style.boxShadow = '0 8px 32px rgba(0,0,0,0.08), 0 4px 16px rgba(0,255,231,0.05)';
              target.style.borderColor = 'rgba(0,255,231,0.1)';
            }}>
              <div style={{
                width: '56px',
                height: '56px',
                background: 'linear-gradient(135deg, #00ffe7, #00d4aa)',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '24px',
                boxShadow: '0 8px 24px rgba(0,255,231,0.3)'
              }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                  <polyline points="9,22 9,12 15,12 15,22"/>
                </svg>
              </div>
              <h3 style={{
                fontSize: '22px',
                fontWeight: '700',
                color: '#1a1a1a',
                marginBottom: '16px'
              }}>
                Real Estate
              </h3>
              <p style={{
                fontSize: '15px',
                color: '#666',
                lineHeight: '1.6',
                marginBottom: '20px'
              }}>
                Generate qualified leads with hyper-local targeting. Our AI finds the perfect audience for your property listings and market updates.
              </p>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '14px',
                color: '#00ffe7',
                fontWeight: '600'
              }}>
                <span>Learn more</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12,5 19,12 12,19"></polyline>
                </svg>
              </div>
            </div>

            {/* SaaS Companies */}
            <div style={{
              background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
              borderRadius: '20px',
              padding: '32px',
              border: '1px solid rgba(139,92,246,0.1)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.08), 0 4px 16px rgba(139,92,246,0.05)',
              transition: 'all 0.4s ease',
              position: 'relative',
              overflow: 'hidden',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              const target = e.target as HTMLElement;
              target.style.transform = 'translateY(-8px)';
              target.style.boxShadow = '0 20px 40px rgba(0,0,0,0.12), 0 8px 24px rgba(139,92,246,0.15)';
              target.style.borderColor = 'rgba(139,92,246,0.3)';
            }}
            onMouseLeave={(e) => {
              const target = e.target as HTMLElement;
              target.style.transform = 'translateY(0)';
              target.style.boxShadow = '0 8px 32px rgba(0,0,0,0.08), 0 4px 16px rgba(139,92,246,0.05)';
              target.style.borderColor = 'rgba(139,92,246,0.1)';
            }}>
              <div style={{
                width: '56px',
                height: '56px',
                background: 'linear-gradient(135deg, #8b5cf6, #a855f7)',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '24px',
                boxShadow: '0 8px 24px rgba(139,92,246,0.3)'
              }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                  <line x1="8" y1="21" x2="16" y2="21"/>
                  <line x1="12" y1="17" x2="12" y2="21"/>
                </svg>
              </div>
              <h3 style={{
                fontSize: '22px',
                fontWeight: '700',
                color: '#1a1a1a',
                marginBottom: '16px'
              }}>
                SaaS Companies
              </h3>
              <p style={{
                fontSize: '15px',
                color: '#666',
                lineHeight: '1.6',
                marginBottom: '20px'
              }}>
                Scale your user acquisition with intelligent B2B targeting. Our AI optimizes for high-value leads and reduces customer acquisition costs.
              </p>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '14px',
                color: '#8b5cf6',
                fontWeight: '600'
              }}>
                <span>Learn more</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12,5 19,12 12,19"></polyline>
                </svg>
              </div>
            </div>

            {/* Legal Services */}
            <div style={{
              background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
              borderRadius: '20px',
              padding: '32px',
              border: '1px solid rgba(255,107,107,0.1)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.08), 0 4px 16px rgba(255,107,107,0.05)',
              transition: 'all 0.4s ease',
              position: 'relative',
              overflow: 'hidden',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              const target = e.target as HTMLElement;
              target.style.transform = 'translateY(-8px)';
              target.style.boxShadow = '0 20px 40px rgba(0,0,0,0.12), 0 8px 24px rgba(255,107,107,0.15)';
              target.style.borderColor = 'rgba(255,107,107,0.3)';
            }}
            onMouseLeave={(e) => {
              const target = e.target as HTMLElement;
              target.style.transform = 'translateY(0)';
              target.style.boxShadow = '0 8px 32px rgba(0,0,0,0.08), 0 4px 16px rgba(255,107,107,0.05)';
              target.style.borderColor = 'rgba(255,107,107,0.1)';
            }}>
              <div style={{
                width: '56px',
                height: '56px',
                background: 'linear-gradient(135deg, #ff6b6b, #ee5a52)',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '24px',
                boxShadow: '0 8px 24px rgba(255,107,107,0.3)'
              }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <path d="M12 1a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
                  <line x1="12" y1="19" x2="12" y2="23"/>
                  <line x1="8" y1="23" x2="16" y2="23"/>
                </svg>
              </div>
              <h3 style={{
                fontSize: '22px',
                fontWeight: '700',
                color: '#1a1a1a',
                marginBottom: '16px'
              }}>
                Legal Services
              </h3>
              <p style={{
                fontSize: '15px',
                color: '#666',
                lineHeight: '1.6',
                marginBottom: '20px'
              }}>
                Build trust and attract qualified clients. Our AI targets legal-specific keywords and optimizes for high-intent search queries.
              </p>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '14px',
                color: '#ff6b6b',
                fontWeight: '600'
              }}>
                <span>Learn more</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12,5 19,12 12,19"></polyline>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Templates Block - Vercel Style */}
      <section style={{
        padding: '120px 0',
        background: 'white',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 24px',
          position: 'relative',
          zIndex: 1
        }}>
          {/* Two Column Layout */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '80px',
            alignItems: 'center'
          }}>
            {/* Left side - Text content */}
            <div>
              <h2 style={{
                fontSize: 'clamp(32px, 4vw, 48px)',
                fontWeight: '800',
                color: '#1a1a1a',
                marginBottom: '32px',
                lineHeight: '1.2'
              }}>
                Tailored AI<br />
                Campaigns for<br />
                Your Industry
              </h2>
              
              <p style={{
                fontSize: '18px',
                color: '#666',
                lineHeight: '1.6',
                marginBottom: '32px',
                maxWidth: '500px'
              }}>
                Pre-built Google Ads strategies, keywords & ad copy optimized for your business type.
              </p>
              
              {/* Features list */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                marginBottom: '40px'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}>
                  <div style={{
                    width: '6px',
                    height: '6px',
                    background: '#7f9cf5',
                    borderRadius: '50%'
                  }}></div>
                  <span style={{
                    fontSize: '16px',
                    color: '#1a1a1a',
                    fontWeight: '500'
                  }}>
                    Ready-to-run campaigns for your business
                  </span>
                </div>
                
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}>
                  <div style={{
                    width: '6px',
                    height: '6px',
                    background: '#00ffe7',
                    borderRadius: '50%'
                  }}></div>
                  <span style={{
                    fontSize: '16px',
                    color: '#1a1a1a',
                    fontWeight: '500'
                  }}>
                    Location targeting & industry keywords
                  </span>
                </div>
                
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}>
                  <div style={{
                    width: '6px',
                    height: '6px',
                    background: '#8b5cf6',
                    borderRadius: '50%'
                  }}></div>
                  <span style={{
                    fontSize: '16px',
                    color: '#1a1a1a',
                    fontWeight: '500'
                  }}>
                    Optimized ad copy for each template
                  </span>
                </div>
                
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}>
                  <div style={{
                    width: '6px',
                    height: '6px',
                    background: '#ff6b6b',
                    borderRadius: '50%'
                  }}></div>
                  <span style={{
                    fontSize: '16px',
                    color: '#1a1a1a',
                    fontWeight: '500'
                  }}>
                    Dental, Real Estate, SaaS & Legal templates
                  </span>
                </div>
              </div>
            </div>

            {/* Right side - Template cards */}
            <div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '16px'
              }}>
                {[
                  { 
                    name: 'Dentists', 
                    icon: '🦷', 
                    color: '#7f9cf5'
                  },
                  { 
                    name: 'Real Estate', 
                    icon: '🏡', 
                    color: '#00ffe7'
                  },
                  { 
                    name: 'SaaS Products', 
                    icon: '💻', 
                    color: '#8b5cf6'
                  },
                  { 
                    name: 'Legal Services', 
                    icon: '⚖️', 
                    color: '#ff6b6b'
                  }
                ].map((template, index) => (
                  <div key={index} style={{
                    background: '#f8fafc',
                    borderRadius: '12px',
                    padding: '20px',
                    border: '1px solid #e2e8f0',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    textAlign: 'center'
                  }}
                  onMouseEnter={(e) => {
                    const target = e.target as HTMLElement;
                    target.style.transform = 'translateY(-2px)';
                    target.style.boxShadow = '0 12px 24px rgba(0,0,0,0.1)';
                    target.style.borderColor = template.color;
                  }}
                  onMouseLeave={(e) => {
                    const target = e.target as HTMLElement;
                    target.style.transform = 'translateY(0)';
                    target.style.boxShadow = 'none';
                    target.style.borderColor = '#e2e8f0';
                  }}>
                    <div style={{
                      fontSize: '32px',
                      marginBottom: '12px'
                    }}>
                      {template.icon}
                    </div>
                    <h3 style={{
                      fontSize: '16px',
                      fontWeight: '700',
                      color: '#1a1a1a',
                      marginBottom: '12px',
                      marginTop: 0
                    }}>
                      {template.name}
                    </h3>
                    <button style={{
                      background: 'transparent',
                      border: 'none',
                      color: template.color,
                      fontSize: '13px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      padding: 0,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      transition: 'all 0.2s ease',
                      margin: '0 auto'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateX(2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateX(0)';
                    }}>
                      Explore Template
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12,5 19,12 12,19"></polyline>
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI-powered Google Ads optimization */}
      <section style={{
        padding: '60px 0px 120px',
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
          <div style={{
            textAlign: 'left',
            marginTop: '-30px'
          }}>
            <h2 style={{
              fontSize: 'clamp(32px, 4.5vw, 42px)',
              fontWeight: '700',
              color: '#1a1a1a',
              marginBottom: '20px',
              lineHeight: '1.2'
            }}>
              AI-powered Google Ads optimization
            </h2>
            <p style={{
              fontSize: 'clamp(16px, 1.8vw, 18px)',
              color: '#666',
              marginBottom: '40px',
              lineHeight: '1.5'
            }}>
              Automatically optimize your campaigns, boost ROI, and scale your business with intelligent AI assistance.
            </p>
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
                fontWeight: '600',
                color: 'white',
                cursor: 'pointer',
                fontSize: '16px',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
              }}>
                Try for free
              </button>
            </div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '80px'
            }}>
              <div style={{
                textAlign: 'left'
              }}>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: '600',
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
                  <div style={{
                    padding: '12px 16px',
                    background: '#f8f9fa',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#1a1a1a',
                    border: '1px solid #e9ecef',
                    transition: '0.2s',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
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
                      background: '#f9ab00'
                    }}>
                      GA
                    </div>
                    Google Analytics
                  </div>
                </div>
              </div>
              <div style={{
                textAlign: 'left'
              }}>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: '600',
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
                  <div style={{
                    padding: '12px 16px',
                    background: '#f8f9fa',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#666',
                    border: '1px solid #e9ecef',
                    opacity: '0.7',
                    transition: '0.2s',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
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
                      background: '#ff7a59'
                    }}>
                      H
                    </div>
                    HubSpot
                  </div>
                  <div style={{
                    padding: '12px 16px',
                    background: '#e9ecef',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#666',
                    border: '1px solid #e9ecef',
                    opacity: '0.7',
                    transition: '0.2s',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
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
                      background: '#f8f9fa'
                    }}>
                      S
                    </div>
                    Salesforce
                  </div>
                </div>
              </div>
            </div>
          </div>
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
              background: 'white',
              borderRadius: '20px',
              border: '1px solid #e9ecef',
              display: 'flex',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: 'rgba(0, 0, 0, 0.1) 0px 20px 40px',
              flexDirection: 'column'
            }}>
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
                      animation: 'pulse 2s ease infinite'
                    }}></div>
                    Online
                  </div>
                </div>
              </div>
              <div style={{
                flex: '1',
                padding: '20px',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px'
              }}>
                <div style={{
                  alignSelf: 'flex-end',
                  maxWidth: '80%'
                }}>
                  <div style={{
                    background: '#1a1a1a',
                    color: 'white',
                    padding: '12px 16px',
                    borderRadius: '18px 18px 4px',
                    fontSize: '14px',
                    lineHeight: '1.4',
                    animation: 'slideInRight 0.5s ease-out'
                  }}>
                    How can I optimize my Google Ads campaign for better ROI?
                  </div>
                </div>
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
                      1. <strong>Audience Targeting:</strong> Use lookalike audiences and custom intent targeting<br />
                      2. <strong>Keyword Optimization:</strong> Focus on long-tail keywords with lower competition<br />
                      3. <strong>Ad Copy Testing:</strong> A/B test headlines and descriptions regularly<br />
                      4. <strong>Landing Page Optimization:</strong> Improve conversion rates with better UX<br />
                      5. <strong>Bid Management:</strong> Use automated bidding strategies
                    </div>
                  </div>
                </div>
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
                        animation: 'typing 1.4s ease infinite'
                      }}></div>
                      <div style={{
                        width: '6px',
                        height: '6px',
                        background: '#666',
                        borderRadius: '50%',
                        animation: 'typing 1.4s ease infinite 0.2s'
                      }}></div>
                      <div style={{
                        width: '6px',
                        height: '6px',
                        background: '#666',
                        borderRadius: '50%',
                        animation: 'typing 1.4s ease infinite 0.4s'
                      }}></div>
                    </div>
                  </div>
                </div>
              </div>
              <div style={{
                background: '#f8f9fa',
                padding: '16px 20px',
                borderTop: '1px solid #e9ecef'
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
                    placeholder="Ask Kampaio AI anything..."
                    type="text"
                    style={{
                      flex: '1',
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
                    transition: 'transform 0.2s'
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

      {/* === ВАРІАНТ 1: Professional Code Editor === */}
      <section style={{
        background:'white',
        padding:'120px 0 48px 0',
        overflow:'hidden',
        position:'relative'
      }}>
        <div style={{textAlign:'center',marginBottom:'48px'}}>
          <h2 style={{fontSize:'32px',fontWeight:'700',color:'#1a1a1a',marginBottom:'16px',marginTop:0}}>AI в дії</h2>
          <p style={{fontSize:'18px',color:'#a0a0a0',margin:0}}>Як Kampaio AI аналізує дані та приймає рішення</p>
        </div>
        
        {/* Professional Code Editor Layout */}
        <div style={{
          maxWidth:'1000px',
          margin:'0 auto 60px auto',
          background:'#fafafa',
          borderRadius:'12px',
          border:'1px solid #e5e5e5',
          overflow:'hidden',
          boxShadow:'0 8px 32px rgba(0,0,0,0.08)'
        }}>
          {/* Editor Header */}
          <div style={{
            background:'#f5f5f5',
            padding:'16px 24px',
            borderBottom:'1px solid #e5e5e5',
            display:'flex',
            alignItems:'center',
            gap:'12px'
          }}>
            <div style={{
              display:'flex',
              gap:'8px'
            }}>
              <div style={{
                width:'12px',
                height:'12px',
                borderRadius:'50%',
                background:'#ff5f56'
              }}></div>
              <div style={{
                width:'12px',
                height:'12px',
                borderRadius:'50%',
                background:'#ffbd2e'
              }}></div>
              <div style={{
                width:'12px',
                height:'12px',
                borderRadius:'50%',
                background:'#27ca3f'
              }}></div>
            </div>
            <div style={{
              fontSize:'14px',
              color:'#666',
              fontWeight:'500'
            }}>
              kampaio-ai-analysis.js
            </div>
          </div>

          {/* Editor Content */}
          <div style={{
            padding:'24px',
            display:'grid',
            gridTemplateColumns:'1fr 1fr',
            gap:'40px',
            alignItems:'center'
          }}>
            {/* Left: Code */}
            <div style={{
              background:'#1a1a1a',
              borderRadius:'8px',
              padding:'24px',
              fontFamily:'Monaco, Menlo, monospace',
              fontSize:'14px',
              lineHeight:'1.6',
              color:'#fff',
              position:'relative',
              overflow:'hidden'
            }}>
              {/* Animated lines */}
              <div style={{
                position:'absolute',
                top:'0',
                left:'0',
                right:'0',
                height:'2px',
                background:'linear-gradient(90deg, transparent, #00ffe7, transparent)',
                animation:'flow 3s ease-in-out infinite'
              }}></div>
              
              <div style={{color:'#7f9cf5'}}>// AI Analysis Engine</div>
              <div style={{color:'#7f9cf5'}}>class KampaioAI {'{'}</div>
              <div style={{marginLeft:'20px',color:'#a0a0a0'}}>constructor() {'{'}</div>
              <div style={{marginLeft:'40px',color:'#00ffe7'}}>this.accuracy = 0.98;</div>
              <div style={{marginLeft:'40px',color:'#00ffe7'}}>this.roiBoost = 3.2;</div>
              <div style={{marginLeft:'20px',color:'#a0a0a0'}}>{'}'}</div>
              <br/>
              <div style={{marginLeft:'20px',color:'#7f9cf5'}}>analyzeCampaign(data) {'{'}</div>
              <div style={{marginLeft:'40px',color:'#a0a0a0'}}>// Pattern recognition</div>
              <div style={{marginLeft:'40px',color:'#00ffe7'}}>const insights = this.findInsights(data);</div>
              <div style={{marginLeft:'40px',color:'#00ffe7'}}>return this.optimize(data, insights);</div>
              <div style={{marginLeft:'20px',color:'#a0a0a0'}}>{'}'}</div>
              <div style={{color:'#7f9cf5'}}>{'}'}</div>
            </div>

            {/* Right: AI Processing Visualization */}
            <div style={{
              display:'flex',
              flexDirection:'column',
              gap:'24px'
            }}>
              {/* AI Core */}
              <div style={{
                display:'flex',
                alignItems:'center',
                gap:'16px'
              }}>
                <div style={{
                  width:'60px',
                  height:'60px',
                  background:'#1a1a1a',
                  borderRadius:'50%',
                  display:'flex',
                  alignItems:'center',
                  justifyContent:'center',
                  animation:'aiPulse 2s ease-in-out infinite'
                }}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="12" y1="17" x2="12.01" y2="17"/>
                  </svg>
                </div>
                <div>
                  <div style={{fontSize:'18px',fontWeight:'600',color:'#1a1a1a',marginBottom:'4px'}}>AI Processing</div>
                  <div style={{fontSize:'14px',color:'#666'}}>Real-time analysis</div>
                </div>
              </div>

              {/* Metrics */}
              <div style={{
                display:'grid',
                gridTemplateColumns:'1fr 1fr',
                gap:'16px'
              }}>
                <div style={{
                  background:'#f8f9fa',
                  padding:'16px',
                  borderRadius:'8px',
                  border:'1px solid #e5e5e5',
                  textAlign:'center'
                }}>
                  <div style={{fontSize:'24px',fontWeight:'700',color:'#1a1a1a',marginBottom:'4px'}}>98%</div>
                  <div style={{fontSize:'12px',color:'#666'}}>Accuracy</div>
                </div>
                <div style={{
                  background:'#f8f9fa',
                  padding:'16px',
                  borderRadius:'8px',
                  border:'1px solid #e5e5e5',
                  textAlign:'center'
                }}>
                  <div style={{fontSize:'24px',fontWeight:'700',color:'#1a1a1a',marginBottom:'4px'}}>3.2x</div>
                  <div style={{fontSize:'12px',color:'#666'}}>ROI Boost</div>
                </div>
              </div>

              {/* Processing Lines */}
              <div style={{
                position:'relative',
                height:'40px'
              }}>
                <div style={{
                  position:'absolute',
                  top:'50%',
                  left:'0',
                  right:'0',
                  height:'2px',
                  background:'#e5e5e5',
                  transform:'translateY(-50%)'
                }}></div>
                <div style={{
                  position:'absolute',
                  top:'50%',
                  left:'0',
                  width:'60%',
                  height:'2px',
                  background:'#00ffe7',
                  transform:'translateY(-50%)',
                  animation:'flow 2s ease-in-out infinite'
                }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Metrics */}
        <div style={{
          display:'flex',
          justifyContent:'center',
          gap:'60px',
          marginBottom:'60px'
        }}>
          <div style={{textAlign:'center'}}>
            <div style={{fontSize:'36px',fontWeight:'700',color:'#1a1a1a',marginBottom:'8px'}}>98%</div>
            <div style={{fontSize:'14px',color:'#666'}}>Accuracy</div>
          </div>
          <div style={{textAlign:'center'}}>
            <div style={{fontSize:'36px',fontWeight:'700',color:'#1a1a1a',marginBottom:'8px'}}>3.2x</div>
            <div style={{fontSize:'14px',color:'#666'}}>ROI Boost</div>
          </div>
          <div style={{textAlign:'center'}}>
            <div style={{fontSize:'36px',fontWeight:'700',color:'#1a1a1a',marginBottom:'8px'}}>24/7</div>
            <div style={{fontSize:'14px',color:'#666'}}>Monitoring</div>
          </div>
        </div>

        <div style={{textAlign:'center'}}>
          <button style={{
            background:'#1a1a1a',
            color:'white',
            border:'none',
            padding:'16px 32px',
            borderRadius:'12px',
            fontSize:'16px',
            fontWeight:'600',
            cursor:'pointer',
            transition:'all 0.3s ease'
          }}>
            Start Your Free Trial
          </button>
        </div>
      </section>

      {/* Tailored AI Solutions for Every Industry */}
      <section style={{
        background:'#fafafa',
        padding:'120px 0 80px 0',
        overflow:'hidden',
        position:'relative'
      }}>
        {/* Animated Background Elements */}
        <div style={{
          position:'absolute',
          top:'10%',
          left:'5%',
          width:'200px',
          height:'200px',
          background:'radial-gradient(circle, rgba(0,255,231,0.1) 0%, transparent 70%)',
          borderRadius:'50%',
          animation:'pulse 4s ease-in-out infinite'
        }}></div>
        <div style={{
          position:'absolute',
          top:'60%',
          right:'10%',
          width:'150px',
          height:'150px',
          background:'radial-gradient(circle, rgba(127,156,245,0.08) 0%, transparent 70%)',
          borderRadius:'50%',
          animation:'pulse 6s ease-in-out infinite'
        }}></div>
        
        <div style={{
          maxWidth:'1200px',
          margin:'0 auto',
          padding:'0 24px',
          position:'relative',
          zIndex:1
        }}>
          {/* Header with Floating Elements */}
          <div style={{textAlign:'center',marginBottom:'80px',position:'relative'}}>
            {/* Floating AI Particles */}
            <div style={{
              position:'absolute',
              top:'-20px',
              left:'20%',
              width:'8px',
              height:'8px',
              background:'#00ffe7',
              borderRadius:'50%',
              animation:'pulse 2s ease-in-out infinite'
            }}></div>
            <div style={{
              position:'absolute',
              top:'40px',
              right:'25%',
              width:'6px',
              height:'6px',
              background:'#7f9cf5',
              borderRadius:'50%',
              animation:'pulse 3s ease-in-out infinite'
            }}></div>
            
            <h2 style={{
              fontSize:'clamp(32px, 4vw, 48px)',
              fontWeight:'700',
              color:'#1a1a1a',
              marginBottom:'24px',
              marginTop:0,
              lineHeight:'1.2',
              position:'relative'
            }}>
              Tailored AI Solutions for Every Industry
              {/* Animated Underline */}
              <div style={{
                position:'absolute',
                bottom:'-8px',
                left:'50%',
                transform:'translateX(-50%)',
                width:'80px',
                height:'3px',
                background:'linear-gradient(90deg, #00ffe7, #7f9cf5)',
                borderRadius:'2px',
                animation:'flow 3s ease-in-out infinite'
              }}></div>
            </h2>
            <p style={{
              fontSize:'clamp(18px, 2vw, 22px)',
              color:'#666',
              margin:0,
              lineHeight:'1.6',
              maxWidth:'600px',
              marginLeft:'auto',
              marginRight:'auto'
            }}>
              Our AI understands the unique challenges of your business
            </p>
          </div>

          {/* Industry Cards Grid with 3D Effects */}
          <div style={{
            display:'grid',
            gridTemplateColumns:'repeat(auto-fit, minmax(280px, 1fr))',
            gap:'32px',
            marginBottom:'80px',
            perspective:'1000px'
          }}>
            {/* Dentists - Holographic Card */}
            <div style={{
              background:'linear-gradient(135deg, rgba(255,255,255,0.95), rgba(255,255,255,0.85))',
              borderRadius:'20px',
              padding:'40px 32px',
              border:'1px solid rgba(229,229,229,0.3)',
              boxShadow:'0 8px 32px rgba(0,0,0,0.1), 0 0 0 1px rgba(255,255,255,0.2)',
              transition:'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
              position:'relative',
              overflow:'hidden',
              backdropFilter:'blur(10px)'
            }} onMouseEnter={(e) => {
              const target = e.target as HTMLElement;
              target.style.transform = 'translateY(-8px) rotateX(5deg)';
              target.style.boxShadow = '0 20px 60px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,255,231,0.3)';
            }} onMouseLeave={(e) => {
              const target = e.target as HTMLElement;
              target.style.transform = 'translateY(0) rotateX(0deg)';
              target.style.boxShadow = '0 8px 32px rgba(0,0,0,0.1), 0 0 0 1px rgba(255,255,255,0.2)';
            }}>
              {/* Holographic Effect */}
              <div style={{
                position:'absolute',
                top:0,
                left:0,
                right:0,
                height:'100%',
                background:'linear-gradient(45deg, transparent 30%, rgba(0,255,231,0.1) 50%, transparent 70%)',
                animation:'flow 4s ease-in-out infinite',
                pointerEvents:'none'
              }}></div>
              
              {/* Animated Icon Container */}
              <div style={{
                width:'80px',
                height:'80px',
                background:'linear-gradient(135deg, #f8f9fa, #e9ecef)',
                borderRadius:'20px',
                display:'flex',
                alignItems:'center',
                justifyContent:'center',
                marginBottom:'24px',
                border:'2px solid rgba(0,255,231,0.2)',
                position:'relative',
                overflow:'hidden'
              }}>
                {/* Rotating Background */}
                <div style={{
                  position:'absolute',
                  top:'50%',
                  left:'50%',
                  width:'60px',
                  height:'60px',
                  background:'conic-gradient(from 0deg, transparent, rgba(0,255,231,0.1), transparent)',
                  borderRadius:'50%',
                  transform:'translate(-50%, -50%)',
                  animation:'rotate 8s linear infinite'
                }}></div>
                
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="2" style={{position:'relative',zIndex:1}}>
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
              </div>

              <h3 style={{
                fontSize:'26px',
                fontWeight:'700',
                color:'#1a1a1a',
                margin:'0 0 16px 0',
                position:'relative'
              }}>
                Dentists
              </h3>
              
              <p style={{
                fontSize:'16px',
                color:'#666',
                lineHeight:'1.6',
                margin:'0 0 24px 0'
              }}>
                Attract more patients with targeted local SEO campaigns. Our AI optimizes for dental-specific keywords and local search intent.
              </p>

              {/* Animated Button */}
              <button style={{
                background:'linear-gradient(135deg, transparent, transparent)',
                color:'#1a1a1a',
                border:'2px solid rgba(0,255,231,0.3)',
                padding:'14px 28px',
                borderRadius:'12px',
                fontSize:'14px',
                fontWeight:'600',
                cursor:'pointer',
                transition:'all 0.3s ease',
                position:'relative',
                overflow:'hidden'
              }} onMouseEnter={(e) => {
                const target = e.target as HTMLElement;
                target.style.background = 'linear-gradient(135deg, #1a1a1a, #2a2a2a)';
                target.style.color = 'white';
                target.style.borderColor = '#00ffe7';
                target.style.transform = 'scale(1.05)';
              }} onMouseLeave={(e) => {
                const target = e.target as HTMLElement;
                target.style.background = 'linear-gradient(135deg, transparent, transparent)';
                target.style.color = '#1a1a1a';
                target.style.borderColor = 'rgba(0,255,231,0.3)';
                target.style.transform = 'scale(1)';
              }}>
                <span style={{position:'relative',zIndex:1}}>Learn more</span>
              </button>
            </div>

            {/* Real Estate - Neural Network Card */}
            <div style={{
              background:'linear-gradient(135deg, rgba(255,255,255,0.95), rgba(255,255,255,0.85))',
              borderRadius:'20px',
              padding:'40px 32px',
              border:'1px solid rgba(229,229,229,0.3)',
              boxShadow:'0 8px 32px rgba(0,0,0,0.1), 0 0 0 1px rgba(255,255,255,0.2)',
              transition:'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
              position:'relative',
              overflow:'hidden',
              backdropFilter:'blur(10px)'
            }} onMouseEnter={(e) => {
              const target = e.target as HTMLElement;
              target.style.transform = 'translateY(-8px) rotateX(5deg)';
              target.style.boxShadow = '0 20px 60px rgba(0,0,0,0.15), 0 0 0 1px rgba(127,156,245,0.3)';
            }} onMouseLeave={(e) => {
              const target = e.target as HTMLElement;
              target.style.transform = 'translateY(0) rotateX(0deg)';
              target.style.boxShadow = '0 8px 32px rgba(0,0,0,0.1), 0 0 0 1px rgba(255,255,255,0.2)';
            }}>
              {/* Neural Network Animation */}
              <div style={{
                position:'absolute',
                top:'20px',
                right:'20px',
                width:'60px',
                height:'60px',
                opacity:'0.3'
              }}>
                <svg viewBox="0 0 60 60" fill="none">
                  <circle cx="30" cy="15" r="3" fill="#7f9cf5" opacity="0.6">
                    <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite"/>
                  </circle>
                  <circle cx="15" cy="30" r="3" fill="#00ffe7" opacity="0.6">
                    <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" begin="0.5s" repeatCount="indefinite"/>
                  </circle>
                  <circle cx="45" cy="30" r="3" fill="#7f9cf5" opacity="0.6">
                    <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" begin="1s" repeatCount="indefinite"/>
                  </circle>
                  <circle cx="30" cy="45" r="3" fill="#00ffe7" opacity="0.6">
                    <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" begin="1.5s" repeatCount="indefinite"/>
                  </circle>
                  <line x1="30" y1="15" x2="15" y2="30" stroke="#7f9cf5" strokeWidth="1" opacity="0.4"/>
                  <line x1="30" y1="15" x2="45" y2="30" stroke="#00ffe7" strokeWidth="1" opacity="0.4"/>
                  <line x1="15" y1="30" x2="30" y2="45" stroke="#7f9cf5" strokeWidth="1" opacity="0.4"/>
                  <line x1="45" y1="30" x2="30" y2="45" stroke="#00ffe7" strokeWidth="1" opacity="0.4"/>
                </svg>
              </div>
              
              {/* Animated Icon Container */}
              <div style={{
                width:'80px',
                height:'80px',
                background:'linear-gradient(135deg, #f8f9fa, #e9ecef)',
                borderRadius:'20px',
                display:'flex',
                alignItems:'center',
                justifyContent:'center',
                marginBottom:'24px',
                border:'2px solid rgba(127,156,245,0.2)',
                position:'relative',
                overflow:'hidden'
              }}>
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="2">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                  <polyline points="9,22 9,12 15,12 15,22"/>
                </svg>
              </div>

              <h3 style={{
                fontSize:'26px',
                fontWeight:'700',
                color:'#1a1a1a',
                margin:'0 0 16px 0'
              }}>
                Real Estate
              </h3>
              
              <p style={{
                fontSize:'16px',
                color:'#666',
                lineHeight:'1.6',
                margin:'0 0 24px 0'
              }}>
                Generate qualified leads with hyper-local targeting. Our AI finds the perfect audience for your property listings and market updates.
              </p>

              <button style={{
                background:'linear-gradient(135deg, transparent, transparent)',
                color:'#1a1a1a',
                border:'2px solid rgba(127,156,245,0.3)',
                padding:'14px 28px',
                borderRadius:'12px',
                fontSize:'14px',
                fontWeight:'600',
                cursor:'pointer',
                transition:'all 0.3s ease'
              }} onMouseEnter={(e) => {
                const target = e.target as HTMLElement;
                target.style.background = 'linear-gradient(135deg, #1a1a1a, #2a2a2a)';
                target.style.color = 'white';
                target.style.borderColor = '#7f9cf5';
                target.style.transform = 'scale(1.05)';
              }} onMouseLeave={(e) => {
                const target = e.target as HTMLElement;
                target.style.background = 'linear-gradient(135deg, transparent, transparent)';
                target.style.color = '#1a1a1a';
                target.style.borderColor = 'rgba(127,156,245,0.3)';
                target.style.transform = 'scale(1)';
              }}>
                Learn more
              </button>
            </div>

            {/* SaaS Companies - Data Flow Card */}
            <div style={{
              background:'linear-gradient(135deg, rgba(255,255,255,0.95), rgba(255,255,255,0.85))',
              borderRadius:'20px',
              padding:'40px 32px',
              border:'1px solid rgba(229,229,229,0.3)',
              boxShadow:'0 8px 32px rgba(0,0,0,0.1), 0 0 0 1px rgba(255,255,255,0.2)',
              transition:'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
              position:'relative',
              overflow:'hidden',
              backdropFilter:'blur(10px)'
            }} onMouseEnter={(e) => {
              const target = e.target as HTMLElement;
              target.style.transform = 'translateY(-8px) rotateX(5deg)';
              target.style.boxShadow = '0 20px 60px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,255,231,0.3)';
            }} onMouseLeave={(e) => {
              const target = e.target as HTMLElement;
              target.style.transform = 'translateY(0) rotateX(0deg)';
              target.style.boxShadow = '0 8px 32px rgba(0,0,0,0.1), 0 0 0 1px rgba(255,255,255,0.2)';
            }}>
              {/* Data Flow Animation */}
              <div style={{
                position:'absolute',
                top:'0',
                left:'0',
                right:'0',
                height:'2px',
                background:'linear-gradient(90deg, transparent, #00ffe7, transparent)',
                animation:'flow 3s ease-in-out infinite'
              }}></div>
              
              {/* Animated Icon Container */}
              <div style={{
                width:'80px',
                height:'80px',
                background:'linear-gradient(135deg, #f8f9fa, #e9ecef)',
                borderRadius:'20px',
                display:'flex',
                alignItems:'center',
                justifyContent:'center',
                marginBottom:'24px',
                border:'2px solid rgba(0,255,231,0.2)',
                position:'relative'
              }}>
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="2">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                  <line x1="8" y1="21" x2="16" y2="21"/>
                  <line x1="12" y1="17" x2="12" y2="21"/>
                </svg>
              </div>

              <h3 style={{
                fontSize:'26px',
                fontWeight:'700',
                color:'#1a1a1a',
                margin:'0 0 16px 0'
              }}>
                SaaS Companies
              </h3>
              
              <p style={{
                fontSize:'16px',
                color:'#666',
                lineHeight:'1.6',
                margin:'0 0 24px 0'
              }}>
                Scale your user acquisition with intelligent B2B targeting. Our AI optimizes for high-value leads and reduces customer acquisition costs.
              </p>

              <button style={{
                background:'linear-gradient(135deg, transparent, transparent)',
                color:'#1a1a1a',
                border:'2px solid rgba(0,255,231,0.3)',
                padding:'14px 28px',
                borderRadius:'12px',
                fontSize:'14px',
                fontWeight:'600',
                cursor:'pointer',
                transition:'all 0.3s ease'
              }} onMouseEnter={(e) => {
                const target = e.target as HTMLElement;
                target.style.background = 'linear-gradient(135deg, #1a1a1a, #2a2a2a)';
                target.style.color = 'white';
                target.style.borderColor = '#00ffe7';
                target.style.transform = 'scale(1.05)';
              }} onMouseLeave={(e) => {
                const target = e.target as HTMLElement;
                target.style.background = 'linear-gradient(135deg, transparent, transparent)';
                target.style.color = '#1a1a1a';
                target.style.borderColor = 'rgba(0,255,231,0.3)';
                target.style.transform = 'scale(1)';
              }}>
                Learn more
              </button>
            </div>

            {/* Legal Services - Quantum Card */}
            <div style={{
              background:'linear-gradient(135deg, rgba(255,255,255,0.95), rgba(255,255,255,0.85))',
              borderRadius:'20px',
              padding:'40px 32px',
              border:'1px solid rgba(229,229,229,0.3)',
              boxShadow:'0 8px 32px rgba(0,0,0,0.1), 0 0 0 1px rgba(255,255,255,0.2)',
              transition:'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
              position:'relative',
              overflow:'hidden',
              backdropFilter:'blur(10px)'
            }} onMouseEnter={(e) => {
              const target = e.target as HTMLElement;
              target.style.transform = 'translateY(-8px) rotateX(5deg)';
              target.style.boxShadow = '0 20px 60px rgba(0,0,0,0.15), 0 0 0 1px rgba(127,156,245,0.3)';
            }} onMouseLeave={(e) => {
              const target = e.target as HTMLElement;
              target.style.transform = 'translateY(0) rotateX(0deg)';
              target.style.boxShadow = '0 8px 32px rgba(0,0,0,0.1), 0 0 0 1px rgba(255,255,255,0.2)';
            }}>
              {/* Quantum Particles */}
              <div style={{
                position:'absolute',
                top:'20px',
                left:'20px',
                width:'40px',
                height:'40px',
                opacity:'0.4'
              }}>
                <div style={{
                  width:'4px',
                  height:'4px',
                  background:'#7f9cf5',
                  borderRadius:'50%',
                  position:'absolute',
                  animation:'pulse 2s ease-in-out infinite'
                }}></div>
                <div style={{
                  width:'3px',
                  height:'3px',
                  background:'#00ffe7',
                  borderRadius:'50%',
                  position:'absolute',
                  top:'15px',
                  left:'25px',
                  animation:'pulse 2s ease-in-out infinite 0.5s'
                }}></div>
                <div style={{
                  width:'2px',
                  height:'2px',
                  background:'#7f9cf5',
                  borderRadius:'50%',
                  position:'absolute',
                  top:'30px',
                  left:'10px',
                  animation:'pulse 2s ease-in-out infinite 1s'
                }}></div>
              </div>
              
              {/* Animated Icon Container */}
              <div style={{
                width:'80px',
                height:'80px',
                background:'linear-gradient(135deg, #f8f9fa, #e9ecef)',
                borderRadius:'20px',
                display:'flex',
                alignItems:'center',
                justifyContent:'center',
                marginBottom:'24px',
                border:'2px solid rgba(127,156,245,0.2)',
                position:'relative'
              }}>
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="2">
                  <path d="M12 1l3.09 6.26L22 7.27l-5 4.87 1.18 6.88L12 17.77l-6.18 1.25L7 12.14 2 7.27l6.91-1.01L12 1z"/>
                </svg>
              </div>

              <h3 style={{
                fontSize:'26px',
                fontWeight:'700',
                color:'#1a1a1a',
                margin:'0 0 16px 0'
              }}>
                Legal Services
              </h3>
              
              <p style={{
                fontSize:'16px',
                color:'#666',
                lineHeight:'1.6',
                margin:'0 0 24px 0'
              }}>
                Build trust and attract qualified clients. Our AI targets legal-specific keywords and optimizes for high-intent search queries.
              </p>

              <button style={{
                background:'linear-gradient(135deg, transparent, transparent)',
                color:'#1a1a1a',
                border:'2px solid rgba(127,156,245,0.3)',
                padding:'14px 28px',
                borderRadius:'12px',
                fontSize:'14px',
                fontWeight:'600',
                cursor:'pointer',
                transition:'all 0.3s ease'
              }} onMouseEnter={(e) => {
                const target = e.target as HTMLElement;
                target.style.background = 'linear-gradient(135deg, #1a1a1a, #2a2a2a)';
                target.style.color = 'white';
                target.style.borderColor = '#7f9cf5';
                target.style.transform = 'scale(1.05)';
              }} onMouseLeave={(e) => {
                const target = e.target as HTMLElement;
                target.style.background = 'linear-gradient(135deg, transparent, transparent)';
                target.style.color = '#1a1a1a';
                target.style.borderColor = 'rgba(127,156,245,0.3)';
                target.style.transform = 'scale(1)';
              }}>
                Learn more
              </button>
            </div>
          </div>


        </div>
      </section>

    </div>
    </>
  );
} 