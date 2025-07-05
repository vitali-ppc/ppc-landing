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

  const [formErrors, setFormErrors] = useState<{[key: string]: string}>({})
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  })

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validateName = (name: string) => {
    return name.trim().length >= 2
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Real-time validation
    if (name === 'name' && value.trim() !== '') {
      if (!validateName(value)) {
        setFormErrors(prev => ({ ...prev, name: 'Please enter a valid name' }))
      } else {
        setFormErrors(prev => ({ ...prev, name: '' }))
      }
    }
    
    if (name === 'email' && value.trim() !== '') {
      if (!validateEmail(value)) {
        setFormErrors(prev => ({ ...prev, email: 'Please enter a valid email address' }))
      } else {
        setFormErrors(prev => ({ ...prev, email: '' }))
      }
    }
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    let hasErrors = false
    const newErrors: {[key: string]: string} = {}
    
    // Validate Name
    if (!formData.name.trim()) {
      newErrors.name = 'Please fill in your name'
      hasErrors = true
    } else if (!validateName(formData.name)) {
      newErrors.name = 'Please enter a valid name'
      hasErrors = true
    }
    
    // Validate Email
    if (!formData.email.trim()) {
      newErrors.email = 'Please enter a valid email address'
      hasErrors = true
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
      hasErrors = true
    }
    
    setFormErrors(newErrors)
    
    if (!hasErrors) {
      // Here you would typically send the data to your server
      console.log('Early access form submitted:', formData)
      
      // Show success message
      alert('Thank you for joining our waitlist! We will contact you soon.')
      
      // Reset form
      setFormData({ name: '', email: '', company: '', message: '' })
      setFormErrors({})
    }
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
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ verticalAlign: 'top', marginRight: '10px', marginTop: '-2px' }}>
                    <rect x="3" y="5" width="14" height="12" rx="3" fill="#23272f"/>
                    <path d="M3 8.5H17" stroke="#23272f" strokeWidth="1.5" strokeLinecap="round"/>
                    <rect x="7" y="11" width="2" height="2" rx="1" fill="#fff"/>
                    <rect x="11" y="11" width="2" height="2" rx="1" fill="#fff"/>
                  </svg>
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



      {/* Get Early Access Section */}
      <section id="contact" className="professional-contact-section">
        <div className="container">
          <div className="professional-section-header">
            <h2>Get Early Access</h2>
            <p>Be among the first to experience our advanced analytics platform</p>
          </div>
          <div className="professional-contact-content">
            <div className="professional-contact-info">
              <div className="professional-contact-item">
                <div className="professional-contact-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <h3>Email</h3>
                  <p>info@ppcset.com</p>
                </div>
              </div>
              <div className="professional-contact-item">
                <div className="professional-contact-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" fill="currentColor"/>
                  </svg>
                </div>
                <div>
                  <h3>WhatsApp</h3>
                  <p>Available upon request</p>
                </div>
              </div>
              <div className="professional-contact-item">
                <a href="https://www.linkedin.com/in/vitali-ppc%E2%9C%94-26b294b4/" target="_blank" rel="noopener" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div className="professional-contact-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" fill="currentColor"/>
                    </svg>
                  </div>
                  <div>
                    <h3>LinkedIn</h3>
                    <p>linkedin.com/in/ppcset</p>
                  </div>
                </a>
              </div>
            </div>
            <div className="professional-contact-form">
              <h3>Join Waitlist</h3>
              <form className="professional-contact-form-inner" onSubmit={handleFormSubmit}>
                <div className="professional-input-group">
                  <input 
                    type="text" 
                    className={`professional-input ${formErrors.name ? 'error' : ''}`}
                    name="name" 
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your Name *" 
                  />
                  {formErrors.name && (
                    <div className="email-error" style={{ color: '#dc3545', fontSize: '12px', marginTop: '4px' }}>
                      {formErrors.name}
                    </div>
                  )}
                </div>
                <div className="professional-input-group">
                  <input 
                    type="email" 
                    className={`professional-input ${formErrors.email ? 'error' : ''}`}
                    name="email" 
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Email Address *" 
                  />
                  {formErrors.email && (
                    <div className="email-error" style={{ color: '#dc3545', fontSize: '12px', marginTop: '4px' }}>
                      {formErrors.email}
                    </div>
                  )}
                </div>
                <div className="professional-input-group">
                  <input 
                    type="text" 
                    className="professional-input"
                    name="company" 
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder="Company"
                  />
                </div>
                <div className="professional-input-group">
                  <textarea 
                    className="professional-textarea" 
                    name="message" 
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us about your analytics needs" 
                    rows={4}
                  />
                </div>

                <button type="submit" className="professional-submit">Join Waitlist</button>
              </form>
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