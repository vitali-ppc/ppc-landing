"use client"

import React, { useState } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Breadcrumbs from '../../components/Breadcrumbs'

export default function AnalyticsPage() {
  const [showDashboard, setShowDashboard] = useState(false)
  const [showConnectForm, setShowConnectForm] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact')
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleConnectClick = () => {
    setShowConnectForm(true)
    setShowDashboard(false)
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setShowDashboard(true)
    setShowConnectForm(false)
    setTimeout(() => {
      alert('Account successfully connected! Data is updating...')
    }, 1000)
  }

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => {
      setIsRefreshing(false)
      alert('Data updated!')
    }, 2000)
  }

  return (
    <>
      <Header />
      <Breadcrumbs />
      


      {/* Analytics Dashboard Section */}
      {showDashboard && (
        <section className="analytics-dashboard" style={{
          background: '#fff',
          padding: '60px 0',
          display: 'block'
        }}>
          <div className="container">
            <div className="dashboard-header" style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '40px'
            }}>
              <h2 style={{
                fontSize: '32px',
                fontWeight: '700',
                color: '#23272f',
                margin: '0'
              }}>
                Connect to Google Ads
              </h2>
              <div className="dashboard-controls" style={{
                display: 'flex',
                gap: '16px',
                alignItems: 'center'
              }}>
                <select 
                  className="date-select"
                  style={{
                    padding: '8px 16px',
                    borderRadius: '8px',
                    border: '1px solid #e5e5e5',
                    fontSize: '14px'
                  }}
                >
                  <option value="7">Last 7 days</option>
                  <option value="30" selected>Last 30 days</option>
                  <option value="90">Last 90 days</option>
                </select>
                <button 
                  className="refresh-btn" 
                  onClick={handleRefresh}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '8px',
                    border: '1px solid #e5e5e5',
                    background: '#fff',
                    cursor: 'pointer',
                    fontSize: '14px'
                  }}
                >
                  {isRefreshing ? '🔄 Updating...' : '🔄 Refresh'}
                </button>
              </div>
            </div>

            {/* Key Metrics */}
            <div className="metrics-overview" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '24px',
              marginBottom: '40px'
            }}>
              <div className="metric-card" style={{
                background: '#fff',
                border: '1px solid #e5e5e5',
                borderRadius: '16px',
                padding: '24px',
                boxShadow: '0 2px 12px rgba(0,0,0,0.08)'
              }}>
                <div className="metric-header" style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '12px'
                }}>
                  <h3 style={{
                    fontSize: '16px',
                    fontWeight: '600',
                    color: '#666',
                    margin: '0'
                  }}>
                    CPL (Cost per Lead)
                  </h3>
                  <div className="metric-trend positive" style={{
                    color: '#10b981',
                    fontSize: '14px',
                    fontWeight: '600'
                  }}>
                    ↓ -15%
                  </div>
                </div>
                <div className="metric-value" style={{
                  fontSize: '32px',
                  fontWeight: '800',
                  color: '#23272f',
                  marginBottom: '8px'
                }}>
                  ₴245
                </div>
                <div className="metric-change" style={{
                  fontSize: '14px',
                  color: '#666'
                }}>
                  Down from ₴288
                </div>
              </div>

              <div className="metric-card" style={{
                background: '#fff',
                border: '1px solid #e5e5e5',
                borderRadius: '16px',
                padding: '24px',
                boxShadow: '0 2px 12px rgba(0,0,0,0.08)'
              }}>
                <div className="metric-header" style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '12px'
                }}>
                  <h3 style={{
                    fontSize: '16px',
                    fontWeight: '600',
                    color: '#666',
                    margin: '0'
                  }}>
                    ROI (Return on Investment)
                  </h3>
                  <div className="metric-trend positive" style={{
                    color: '#10b981',
                    fontSize: '14px',
                    fontWeight: '600'
                  }}>
                    ↑ +23%
                  </div>
                </div>
                <div className="metric-value" style={{
                  fontSize: '32px',
                  fontWeight: '800',
                  color: '#23272f',
                  marginBottom: '8px'
                }}>
                  4.2x
                </div>
                <div className="metric-change" style={{
                  fontSize: '14px',
                  color: '#666'
                }}>
                  Up from 3.4x
                </div>
              </div>

              <div className="metric-card" style={{
                background: '#fff',
                border: '1px solid #e5e5e5',
                borderRadius: '16px',
                padding: '24px',
                boxShadow: '0 2px 12px rgba(0,0,0,0.08)'
              }}>
                <div className="metric-header" style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '12px'
                }}>
                  <h3 style={{
                    fontSize: '16px',
                    fontWeight: '600',
                    color: '#666',
                    margin: '0'
                  }}>
                    Conversions
                  </h3>
                  <div className="metric-trend positive" style={{
                    color: '#10b981',
                    fontSize: '14px',
                    fontWeight: '600'
                  }}>
                    ↑ +18%
                  </div>
                </div>
                <div className="metric-value" style={{
                  fontSize: '32px',
                  fontWeight: '800',
                  color: '#23272f',
                  marginBottom: '8px'
                }}>
                  156
                </div>
                <div className="metric-change" style={{
                  fontSize: '14px',
                  color: '#666'
                }}>
                  Up from 132
                </div>
              </div>

              <div className="metric-card" style={{
                background: '#fff',
                border: '1px solid #e5e5e5',
                borderRadius: '16px',
                padding: '24px',
                boxShadow: '0 2px 12px rgba(0,0,0,0.08)'
              }}>
                <div className="metric-header" style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '12px'
                }}>
                  <h3 style={{
                    fontSize: '16px',
                    fontWeight: '600',
                    color: '#666',
                    margin: '0'
                  }}>
                    Lead Quality
                  </h3>
                  <div className="metric-trend positive" style={{
                    color: '#10b981',
                    fontSize: '14px',
                    fontWeight: '600'
                  }}>
                    ↑ +12%
                  </div>
                </div>
                <div className="metric-value" style={{
                  fontSize: '32px',
                  fontWeight: '800',
                  color: '#23272f',
                  marginBottom: '8px'
                }}>
                  87%
                </div>
                <div className="metric-change" style={{
                  fontSize: '14px',
                  color: '#666'
                }}>
                  Up from 78%
                </div>
              </div>
            </div>

            {/* Charts */}
            <div className="analytics-charts" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
              gap: '32px',
              marginBottom: '40px'
            }}>
              <div className="chart-container" style={{
                background: '#fff',
                border: '1px solid #e5e5e5',
                borderRadius: '16px',
                padding: '24px',
                boxShadow: '0 2px 12px rgba(0,0,0,0.08)'
              }}>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  color: '#23272f',
                  marginBottom: '20px'
                }}>
                  CPL & ROI Trend
                </h3>
                <div className="chart" style={{
                  height: '200px',
                  background: '#f8f9fa',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'end',
                  justifyContent: 'space-around',
                  padding: '20px',
                  position: 'relative'
                }}>
                  <div style={{ height: '60%', width: '20px', background: '#667eea', borderRadius: '4px' }}></div>
                  <div style={{ height: '80%', width: '20px', background: '#667eea', borderRadius: '4px' }}></div>
                  <div style={{ height: '40%', width: '20px', background: '#667eea', borderRadius: '4px' }}></div>
                  <div style={{ height: '90%', width: '20px', background: '#667eea', borderRadius: '4px' }}></div>
                  <div style={{ height: '70%', width: '20px', background: '#667eea', borderRadius: '4px' }}></div>
                </div>
                <div className="chart-labels" style={{
                  display: 'flex',
                  justifyContent: 'space-around',
                  marginTop: '12px',
                  fontSize: '12px',
                  color: '#666'
                }}>
                  <span>Week 1</span>
                  <span>Week 2</span>
                  <span>Week 3</span>
                  <span>Week 4</span>
                </div>
              </div>

              <div className="chart-container" style={{
                background: '#fff',
                border: '1px solid #e5e5e5',
                borderRadius: '16px',
                padding: '24px',
                boxShadow: '0 2px 12px rgba(0,0,0,0.08)'
              }}>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  color: '#23272f',
                  marginBottom: '20px'
                }}>
                  Budget Distribution by Campaign
                </h3>
                <div className="budget-slices" style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px'
                }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '8px 12px',
                    background: '#1a365d',
                    color: '#fff',
                    borderRadius: '8px'
                  }}>
                    <span>Search Campaigns</span>
                    <span>40%</span>
                  </div>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '8px 12px',
                    background: '#2c5282',
                    color: '#fff',
                    borderRadius: '8px'
                  }}>
                    <span>Remarketing</span>
                    <span>30%</span>
                  </div>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '8px 12px',
                    background: '#3182ce',
                    color: '#fff',
                    borderRadius: '8px'
                  }}>
                    <span>Display</span>
                    <span>20%</span>
                  </div>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '8px 12px',
                    background: '#4299e1',
                    color: '#fff',
                    borderRadius: '8px'
                  }}>
                    <span>YouTube</span>
                    <span>10%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Recommendations */}
            <div className="ai-recommendations" style={{
              background: '#fff',
              border: '1px solid #e5e5e5',
              borderRadius: '16px',
              padding: '24px',
              boxShadow: '0 2px 12px rgba(0,0,0,0.08)'
            }}>
              <h3 style={{
                fontSize: '20px',
                fontWeight: '600',
                color: '#23272f',
                marginBottom: '24px'
              }}>
                🤖 AI Recommendations for Optimization
              </h3>
              <div className="recommendations-list" style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '20px'
              }}>
                <div className="recommendation-item" style={{
                  display: 'flex',
                  gap: '16px',
                  alignItems: 'flex-start'
                }}>
                  <div className="recommendation-icon" style={{
                    fontSize: '24px',
                    flexShrink: 0
                  }}>
                    📈
                  </div>
                  <div className="recommendation-content">
                    <h4 style={{
                      fontSize: '16px',
                      fontWeight: '600',
                      color: '#23272f',
                      marginBottom: '8px'
                    }}>
                      Increase Bids on Keywords
                    </h4>
                    <p style={{
                      fontSize: '14px',
                      color: '#666',
                      lineHeight: '1.5',
                      margin: '0'
                    }}>
                      Keywords "B2B services" and "corporate solutions" show high conversion rates. Recommend increasing bids by 15-20%.
                    </p>
                  </div>
                </div>

                <div className="recommendation-item" style={{
                  display: 'flex',
                  gap: '16px',
                  alignItems: 'flex-start'
                }}>
                  <div className="recommendation-icon" style={{
                    fontSize: '24px',
                    flexShrink: 0
                  }}>
                    🎯
                  </div>
                  <div className="recommendation-content">
                    <h4 style={{
                      fontSize: '16px',
                      fontWeight: '600',
                      color: '#23272f',
                      marginBottom: '8px'
                    }}>
                      Optimize Ad Scheduling
                    </h4>
                    <p style={{
                      fontSize: '14px',
                      color: '#666',
                      lineHeight: '1.5',
                      margin: '0'
                    }}>
                      Highest conversion rates are observed from 9:00 to 11:00 and from 14:00 to 16:00. Recommend increasing bids during these hours.
                    </p>
                  </div>
                </div>

                <div className="recommendation-item" style={{
                  display: 'flex',
                  gap: '16px',
                  alignItems: 'flex-start'
                }}>
                  <div className="recommendation-icon" style={{
                    fontSize: '24px',
                    flexShrink: 0
                  }}>
                    💰
                  </div>
                  <div className="recommendation-content">
                    <h4 style={{
                      fontSize: '16px',
                      fontWeight: '600',
                      color: '#23272f',
                      marginBottom: '8px'
                    }}>
                      Redistribute Budget
                    </h4>
                    <p style={{
                      fontSize: '14px',
                      color: '#666',
                      lineHeight: '1.5',
                      margin: '0'
                    }}>
                      The "Remarketing" campaign shows an ROI of 5.2x. Recommend increasing the budget by 25% at the expense of less effective campaigns.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Connect Form Section */}
      {showConnectForm && (
        <section className="connect-section" style={{
          background: '#fff',
          padding: '60px 0',
          display: 'block'
        }}>
          <div className="container">
            <div className="connect-content" style={{
              maxWidth: '800px',
              margin: '0 auto',
              textAlign: 'center'
            }}>
              <h2 style={{
                fontSize: '32px',
                fontWeight: '700',
                color: '#23272f',
                marginBottom: '16px'
              }}>
                Connect to Google Ads
              </h2>
              <p style={{
                fontSize: '18px',
                color: '#666',
                marginBottom: '40px'
              }}>
                Securely connect your ad account to get detailed analytics
              </p>
              
              <div className="connect-steps" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '32px',
                marginBottom: '40px'
              }}>
                <div className="connect-step" style={{
                  textAlign: 'center'
                }}>
                  <div className="step-number" style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    background: '#667eea',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '20px',
                    fontWeight: '600',
                    margin: '0 auto 16px auto'
                  }}>
                    1
                  </div>
                  <div className="step-content">
                    <h3 style={{
                      fontSize: '18px',
                      fontWeight: '600',
                      color: '#23272f',
                      marginBottom: '8px'
                    }}>
                      Grant Access
                    </h3>
                    <p style={{
                      fontSize: '14px',
                      color: '#666',
                      margin: '0'
                    }}>
                      Grant access to your Google Ads account via OAuth 2.0
                    </p>
                  </div>
                </div>

                <div className="connect-step" style={{
                  textAlign: 'center'
                }}>
                  <div className="step-number" style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    background: '#667eea',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '20px',
                    fontWeight: '600',
                    margin: '0 auto 16px auto'
                  }}>
                    2
                  </div>
                  <div className="step-content">
                    <h3 style={{
                      fontSize: '18px',
                      fontWeight: '600',
                      color: '#23272f',
                      marginBottom: '8px'
                    }}>
                      Select Campaigns
                    </h3>
                    <p style={{
                      fontSize: '14px',
                      color: '#666',
                      margin: '0'
                    }}>
                      Select campaigns for analysis and monitoring
                    </p>
                  </div>
                </div>

                <div className="connect-step" style={{
                  textAlign: 'center'
                }}>
                  <div className="step-number" style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    background: '#667eea',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '20px',
                    fontWeight: '600',
                    margin: '0 auto 16px auto'
                  }}>
                    3
                  </div>
                  <div className="step-content">
                    <h3 style={{
                      fontSize: '18px',
                      fontWeight: '600',
                      color: '#23272f',
                      marginBottom: '8px'
                    }}>
                      Get Analytics
                    </h3>
                    <p style={{
                      fontSize: '14px',
                      color: '#666',
                      margin: '0'
                    }}>
                      Receive detailed analytics and AI recommendations
                    </p>
                  </div>
                </div>
              </div>

              <div className="connect-form" style={{
                maxWidth: '500px',
                margin: '0 auto'
              }}>
                <form onSubmit={handleFormSubmit} style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '20px'
                }}>
                  <div className="form-group">
                    <label htmlFor="accountId" style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#23272f',
                      marginBottom: '8px'
                    }}>
                      Google Ads Account ID
                    </label>
                    <input 
                      type="text" 
                      id="accountId" 
                      placeholder="123-456-7890" 
                      required
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        borderRadius: '8px',
                        border: '1px solid #e5e5e5',
                        fontSize: '14px'
                      }}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="campaigns" style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#23272f',
                      marginBottom: '8px'
                    }}>
                      Campaigns for Analysis
                    </label>
                    <select 
                      id="campaigns" 
                      multiple
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        borderRadius: '8px',
                        border: '1px solid #e5e5e5',
                        fontSize: '14px',
                        minHeight: '100px'
                      }}
                    >
                      <option value="all">All Campaigns</option>
                      <option value="search">Search Campaigns</option>
                      <option value="display">Display Campaigns</option>
                      <option value="remarketing">Remarketing</option>
                    </select>
                  </div>
                  <button 
                    type="submit" 
                    className="connect-submit-btn"
                    style={{
                      padding: '16px 32px',
                      borderRadius: '12px',
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      color: '#fff',
                      border: 'none',
                      fontSize: '16px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    Connect & Analyze
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Analytics Hero Section */}
      <section className="professional-hero">
        <div className="container">
          <div className="professional-hero-grid">
            <div className="professional-hero-main">
              {/* Coming Soon Badge */}
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '4px',
                padding: '8px 12px',
                marginBottom: '24px',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
              }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ fill: '#64748b' }}>
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span style={{
                  color: '#475569',
                  fontSize: '12px',
                  fontWeight: '500',
                  fontFamily: "'Inter', sans-serif",
                  letterSpacing: '0.2px'
                }}>Coming Soon</span>
              </div>

              <h1 className="professional-hero-title">Analytics Dashboard</h1>
              <p className="professional-hero-subtitle">Advanced campaign analytics and AI-powered insights for data-driven PPC optimization</p>
              <div className="professional-btn-group">
                <button className="professional-btn" onClick={scrollToContact}>
                  Get Early Access
                </button>
              </div>
            </div>
            
            <div className="professional-hero-cards">
              <div className="professional-mini-card" style={{ padding: '24px 20px' }}>
                <div className="professional-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 3V21H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M9 9L12 6L16 10L21 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3>Real-time Analytics</h3>
                <p>Live campaign performance monitoring with instant updates</p>
              </div>
              <div className="professional-mini-card" style={{ padding: '24px 20px' }}>
                <div className="professional-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-7.73A2 2 0 1 1 19 12H2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3>AI Insights</h3>
                <p>Machine learning recommendations for campaign optimization</p>
              </div>
              <div className="professional-mini-card" style={{ padding: '24px 20px' }}>
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

      {/* Services Block */}
      <section id="services" className="professional-problems-section">
        <div className="container">
          <div className="professional-section-header">
            <h2>Analytics Services for Business Growth</h2>
            <p>Transform your data into actionable insights and automated reporting solutions</p>
          </div>
          <div className="professional-problems-grid">
            <div className="professional-problem-card">
              <div className="professional-problem-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 3V21H21" />
                  <path d="M9 9L12 6L16 10L21 5" />
                </svg>
              </div>
              <h3>Performance Analytics</h3>
              <p>Track and analyze your business performance with comprehensive reporting</p>
            </div>
            <div className="professional-problem-card">
              <div className="professional-problem-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" />
                </svg>
              </div>
              <h3>Automated Reporting</h3>
              <p>Save time with automated reports that deliver insights when you need them</p>
            </div>
            <div className="professional-problem-card">
              <div className="professional-problem-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="3"/>
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-1.82-.33l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h.09a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51h.09a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82 1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
                </svg>
              </div>
              <h3>Data Optimization</h3>
              <p>Optimize your campaigns and strategies based on comprehensive data analysis</p>
            </div>
            <div className="professional-problem-card">
              <div className="professional-problem-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <ellipse cx="12" cy="5" rx="9" ry="3"/>
                  <path d="M3 5v14a9 3 0 0 0 18 0V5"/>
                  <path d="M3 12a9 3 0 0 0 18 0"/>
                </svg>
              </div>
              <h3>Data Integration</h3>
              <p>Connect and unify data from multiple sources for comprehensive insights</p>
            </div>
            <div className="professional-problem-card">
              <div className="professional-problem-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="6" cy="6" r="3"/>
                  <circle cx="6" cy="18" r="3"/>
                  <circle cx="18" cy="12" r="3"/>
                  <path d="M6 9v6a6 6 0 0 0 6 6h0a6 6 0 0 0 6-6V9"/>
                </svg>
              </div>
              <h3>Custom Dashboards</h3>
              <p>Get personalized dashboards that show exactly what matters to your business</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {/* Schema.org Service */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Analytics Services by PPCSet",
            "description": "Professional analytics and reporting services. Get data-driven insights, automated reporting, and performance optimization for your business growth.",
            "url": "https://ppcset.com/analytics",
            "provider": {
              "@type": "Organization",
              "name": "PPCSet",
              "url": "https://ppcset.com",
              "logo": "https://ppcset.com/logo.png"
            },
            "serviceType": "Analytics and Reporting",
            "areaServed": "Worldwide",
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Analytics Services",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Performance Analytics"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Automated Reporting"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Data Optimization"
                  }
                }
              ]
            }
          })
        }}
      />
    </>
  )
} 