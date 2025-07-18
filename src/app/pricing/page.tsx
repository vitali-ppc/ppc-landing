'use client';

import { useState, useEffect } from 'react';
import Footer from '../../components/Footer';

export default function PricingPage() {
  const [currentPhase, setCurrentPhase] = useState(0);
  const [dataFlow, setDataFlow] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  // Data flow animation
  useEffect(() => {
    const interval = setInterval(() => {
      setDataFlow(prev => (prev + 1) % 100);
    }, 50);

    return () => clearInterval(interval);
  }, []);

  // Phase progression
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhase(prev => (prev + 1) % 6);
      setIsProcessing(true);
      setTimeout(() => setIsProcessing(false), 2000);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const phases = [
    { 
      id: 0, 
      name: 'DATA INGESTION', 
      color: '#667eea',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M3 12H7L10 9L14 15L17 12H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="12" cy="12" r="2" stroke="currentColor" strokeWidth="1.5"/>
        </svg>
      )
    },
    { 
      id: 1, 
      name: 'ANALYSIS', 
      color: '#f093fb',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M7 17L10 14L14 17L21 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="7" cy="17" r="1" fill="currentColor"/>
          <circle cx="10" cy="14" r="1" fill="currentColor"/>
          <circle cx="14" cy="17" r="1" fill="currentColor"/>
          <circle cx="21" cy="10" r="1" fill="currentColor"/>
        </svg>
      )
    },
    { 
      id: 2, 
      name: 'PATTERN DETECTION', 
      color: '#4facfe',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M12 4V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M12 16V20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M4 12H8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M16 12H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M6.34 6.34L8.93 8.93" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M15.07 15.07L17.66 17.66" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M6.34 17.66L8.93 15.07" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M15.07 8.93L17.66 6.34" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      )
    },
    { 
      id: 3, 
      name: 'OPTIMIZATION', 
      color: '#43e97b',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M12 2L12 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M2 12H22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M12 5L15 8L12 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 19L9 16L12 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    { 
      id: 4, 
      name: 'VALIDATION', 
      color: '#fa709a',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M7 12L10 15L17 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    { 
      id: 5, 
      name: 'DEPLOYMENT', 
      color: '#a8edea',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M12 2L12 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M5 12L12 5L19 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M5 19L12 12L19 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    }
  ];

  return (
    <>
      <div style={{
        minHeight: '100vh',
        background: 'white',
        color: '#1a1a1a',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: 'Inter, SF Pro Display, Segoe UI, Arial, sans-serif'
      }}>
        
        {/* Holographic Grid Background */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            linear-gradient(90deg, rgba(26, 26, 26, 0.1) 1px, transparent 1px),
            linear-gradient(rgba(26, 26, 26, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          animation: 'gridMove 20s linear infinite',
          pointerEvents: 'none'
        }} />

        {/* Floating Data Particles */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          pointerEvents: 'none'
        }}>
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                width: '3px',
                height: '3px',
                background: `hsl(${200 + i * 3}, 80%, 50%)`,
                borderRadius: '50%',
                left: `${(i * 7) % 100}%`,
                top: `${(i * 11) % 100}%`,
                animation: `dataFloat ${3 + i % 5}s linear infinite`,
                animationDelay: `${i * 0.1}s`,
                boxShadow: `0 0 15px hsl(${200 + i * 3}, 80%, 50%)`
              }}
            />
          ))}
        </div>

        {/* Main Dashboard Container */}
        <div style={{
          padding: '40px 20px',
          position: 'relative',
          zIndex: 10,
          flex: 1,
          display: 'flex',
          flexDirection: 'column'
        }}>
          
          {/* Main Interactive Dashboard */}
          <div style={{
            flex: 1,
            position: 'relative',
            background: 'rgba(248, 250, 252, 0.8)',
            border: '1px solid rgba(102, 126, 234, 0.2)',
            borderRadius: '12px',
            padding: '32px',
            backdropFilter: 'blur(20px)',
            minHeight: '600px',
            marginBottom: '40px'
          }}>
            
            {/* Phase Indicator */}
            <div style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <div style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                background: isProcessing ? '#43e97b' : '#fa709a',
                animation: isProcessing ? 'pulse 1s infinite' : 'none',
                boxShadow: `0 0 10px ${isProcessing ? '#43e97b' : '#fa709a'}`
              }} />
              <span style={{
                fontSize: '0.875rem',
                color: 'rgba(26, 26, 26, 0.7)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>
                {isProcessing ? 'PROCESSING' : 'STANDBY'}
              </span>
            </div>

            {/* Central Processing Hub */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '200px',
              height: '200px',
              background: 'radial-gradient(circle, rgba(102, 126, 234, 0.2) 0%, rgba(102, 126, 234, 0.05) 70%, transparent 100%)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#667eea',
              boxShadow: `
                0 0 60px rgba(102, 126, 234, 0.3),
                inset 0 0 60px rgba(102, 126, 234, 0.1)
              `,
              animation: 'hubPulse 3s ease-in-out infinite',
              border: '2px solid rgba(102, 126, 234, 0.3)'
            }}>
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M12 9V15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M9 12H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>

            {/* Rotating Phase Rings */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '400px',
              height: '400px'
            }}>
              {phases.map((phase, index) => (
                <div
                  key={phase.id}
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: `translate(-50%, -50%) rotate(${index * 60}deg)`,
                    width: '300px',
                    height: '2px',
                    background: currentPhase === phase.id 
                      ? `linear-gradient(90deg, transparent, ${phase.color}, transparent)`
                      : 'rgba(102, 126, 234, 0.2)',
                    animation: currentPhase === phase.id ? 'phaseActive 2s ease-in-out infinite' : 'none'
                  }}
                >
                  <div style={{
                    position: 'absolute',
                    right: '-20px',
                    top: '-20px',
                    width: '40px',
                    height: '40px',
                    background: currentPhase === phase.id ? phase.color : 'rgba(102, 126, 234, 0.2)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: currentPhase === phase.id ? '#ffffff' : 'rgba(102, 126, 234, 0.8)',
                    boxShadow: currentPhase === phase.id 
                      ? `0 0 20px ${phase.color}` 
                      : 'none',
                    animation: currentPhase === phase.id ? 'phasePulse 2s ease-in-out infinite' : 'none'
                  }}>
                    {phase.icon}
                  </div>
                  <div style={{
                    position: 'absolute',
                    right: '-120px',
                    top: '-10px',
                    fontSize: '0.75rem',
                    color: currentPhase === phase.id ? phase.color : 'rgba(102, 126, 234, 0.8)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    whiteSpace: 'nowrap',
                    textShadow: currentPhase === phase.id ? `0 0 10px ${phase.color}` : 'none'
                  }}>
                    {phase.name}
                  </div>
                </div>
              ))}
            </div>

            {/* Data Flow Lines */}
            <svg
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none'
              }}
              viewBox="0 0 800 600"
            >
              <defs>
                <linearGradient id="dataFlow" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgba(102, 126, 234, 0)" />
                  <stop offset="50%" stopColor="rgba(102, 126, 234, 0.8)" />
                  <stop offset="100%" stopColor="rgba(102, 126, 234, 0)" />
                </linearGradient>
              </defs>
              <path
                d="M 100 300 Q 200 200 400 300 T 700 300"
                stroke="url(#dataFlow)"
                strokeWidth="2"
                fill="none"
                strokeDasharray="10,5"
                style={{
                  animation: 'dataFlow 6s linear infinite'
                }}
              />
              <path
                d="M 100 200 Q 300 100 500 200 T 700 200"
                stroke="url(#dataFlow)"
                strokeWidth="2"
                fill="none"
                strokeDasharray="10,5"
                style={{
                  animation: 'dataFlow 7s linear infinite'
                }}
              />
              <path
                d="M 100 400 Q 300 500 500 400 T 700 400"
                stroke="url(#dataFlow)"
                strokeWidth="2"
                fill="none"
                strokeDasharray="10,5"
                style={{
                  animation: 'dataFlow 7s linear infinite'
                }}
              />
            </svg>

            {/* Processing Zones */}
            <div style={{
              position: 'absolute',
              bottom: '20px',
              left: '20px',
              right: '20px',
              display: 'flex',
              justifyContent: 'space-between',
              gap: '20px'
            }}>
              {[
                { name: 'Dentists', status: 'ACTIVE', data: '1.2M/s' },
                { name: 'Real Estate', status: currentPhase > 0 ? 'ACTIVE' : 'STANDBY', data: '850K/s' },
                { name: 'SaaS Companies', status: currentPhase > 1 ? 'ACTIVE' : 'STANDBY', data: '650K/s' },
                { name: 'Legal Services', status: currentPhase > 4 ? 'ACTIVE' : 'STANDBY', data: '450K/s' }
              ].map((zone, index) => (
                <div
                  key={zone.name}
                  style={{
                    flex: 1,
                    padding: '16px',
                    background: zone.status === 'ACTIVE' 
                      ? 'rgba(102, 126, 234, 0.1)' 
                      : 'rgba(255, 255, 255, 0.05)',
                    border: `1px solid ${zone.status === 'ACTIVE' ? 'rgba(102, 126, 234, 0.3)' : 'rgba(255, 255, 255, 0.1)'}`,
                    borderRadius: '8px',
                    textAlign: 'center',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <div style={{
                    fontSize: '0.875rem',
                    color: zone.status === 'ACTIVE' ? '#667eea' : 'rgba(26, 26, 26, 0.6)',
                    marginBottom: '8px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}>
                    {zone.name}
                  </div>
                  <div style={{
                    fontSize: '1.25rem',
                    fontWeight: '600',
                    color: zone.status === 'ACTIVE' ? '#1a1a1a' : 'rgba(26, 26, 26, 0.4)',
                    marginBottom: '4px'
                  }}>
                    {zone.data}
                  </div>
                  <div style={{
                    fontSize: '0.75rem',
                    color: zone.status === 'ACTIVE' ? '#43e97b' : 'rgba(26, 26, 26, 0.4)',
                    textTransform: 'uppercase'
                  }}>
                    {zone.status}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Combined Block: Real-time Data Processing Pipeline + AI Neural Network */}
          <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: '40px',
            marginBottom: '40px',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)'
          }}>
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'transparent',
              pointerEvents: 'none'
            }} />

            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '40px',
              alignItems: 'start'
            }}>
              {/* Left Side: Real-time Data Processing Pipeline */}
              <div>
                <h2 style={{
                  fontSize: 'clamp(36px, 4vw, 48px)',
                  fontWeight: '800',
                  color: '#1a1a1a',
                  marginBottom: '24px',
                  lineHeight: '1.2',
                  textAlign: 'center'
                }}>
                  Real-time Data Processing Pipeline
                </h2>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '16px',
                  marginBottom: '24px'
                }}>
                  {[
                    { 
                      title: 'Dentists', 
                      status: 'Connected', 
                      data: '2.4M requests/min', 
                      icon: (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                          <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M19 10v2a7 7 0 0 1-14 0v-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          <line x1="12" y1="19" x2="12" y2="23" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                          <line x1="8" y1="23" x2="16" y2="23" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                        </svg>
                      )
                    },
                    { 
                      title: 'Real Estate', 
                      status: 'Active', 
                      data: '1.8TB/hour', 
                      icon: (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          <polyline points="9,22 9,12 15,12 15,22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M9 9h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                          <path d="M15 9h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                      )
                    },
                    { 
                      title: 'SaaS Companies', 
                      status: 'Running', 
                      data: '99.7% accuracy', 
                      icon: (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" stroke="currentColor" strokeWidth="1.5"/>
                          <path d="M8 8h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                          <path d="M8 12h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                          <path d="M8 16h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                          <circle cx="16" cy="16" r="2" stroke="currentColor" strokeWidth="1.5"/>
                          <path d="M16 14v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                          <path d="M14 16h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                        </svg>
                      )
                    },
                    { 
                      title: 'Legal Services', 
                      status: 'Live', 
                      data: '156 insights/sec', 
                      icon: (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                          <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M12 12V22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                          <path d="M8 18L12 22L16 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )
                    }
                  ].map((item, index) => (
                    <div key={index} style={{
                      background: 'rgba(102, 126, 234, 0.05)',
                      borderRadius: '12px',
                      padding: '20px',
                      border: '1px solid rgba(102, 126, 234, 0.2)',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer',
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
                      e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.3)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0) scale(1)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}>
                      <div style={{
                        marginBottom: '12px',
                        textAlign: 'center',
                        color: '#667eea'
                      }}>
                        {item.icon}
                      </div>
                      <h3 style={{
                        fontSize: '1rem',
                        fontWeight: '600',
                        color: '#1a1a1a',
                        marginBottom: '6px',
                        textAlign: 'center'
                      }}>
                        {item.title}
                      </h3>
                      <div style={{
                        fontSize: '1.25rem',
                        fontWeight: '700',
                        color: '#1a1a1a',
                        marginBottom: '6px',
                        textAlign: 'center'
                      }}>
                        {item.data}
                      </div>
                      <div style={{
                        fontSize: '0.75rem',
                        color: '#43e97b',
                        textAlign: 'center',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        fontWeight: '600'
                      }}>
                        {item.status}
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{
                  textAlign: 'center'
                }}>
                  <button style={{
                    background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
                    border: 'none',
                    borderRadius: '12px',
                    padding: '14px 28px',
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    color: '#1a1a1a',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 8px 20px rgba(67, 233, 123, 0.3)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 12px 30px rgba(67, 233, 123, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 8px 20px rgba(67, 233, 123, 0.3)';
                  }}>
                    Launch Demo
                  </button>
                </div>
              </div>

              {/* Right Side: AI Neural Network Processing */}
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative',
                height: '100%',
                minHeight: '400px'
              }}>
                {/* Central AI Brain */}
                <div style={{
                  width: '150px',
                  height: '150px',
                  background: 'radial-gradient(circle, rgba(102, 126, 234, 0.4) 0%, rgba(102, 126, 234, 0.15) 70%, transparent 100%)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '3px solid rgba(102, 126, 234, 0.6)',
                  boxShadow: '0 0 60px rgba(102, 126, 234, 0.5)',
                  animation: 'pulse 1.5s ease-in-out infinite',
                  position: 'relative',
                  zIndex: 10
                }}>
                  <svg width="60" height="60" viewBox="0 0 24 24" fill="none" style={{color: '#667eea'}}>
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/>
                    <circle cx="12" cy="12" r="6" stroke="currentColor" strokeWidth="1.5"/>
                    <circle cx="12" cy="12" r="2" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M2 12H4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M20 12H22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M12 2V4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M12 20V22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </div>

                {/* Neural Connections */}
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    style={{
                      position: 'absolute',
                      width: '150px',
                      height: '2px',
                      background: `linear-gradient(90deg, transparent, rgba(102, 126, 234, 0.6), transparent)`,
                      transform: `rotate(${i * 45}deg)`,
                      animation: `neuralPulse ${2 + i * 0.5}s ease-in-out infinite`,
                      animationDelay: `${i * 0.2}s`
                    }}
                  />
                ))}

                {/* Processing Nodes */}
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    style={{
                      position: 'absolute',
                      width: '16px',
                      height: '16px',
                      background: `hsl(${200 + i * 30}, 80%, 60%)`,
                      borderRadius: '50%',
                      transform: `rotate(${i * 60}deg) translateX(110px)`,
                      boxShadow: `0 0 20px hsl(${200 + i * 30}, 80%, 60%)`,
                      animation: `nodePulse ${1.5 + i * 0.3}s ease-in-out infinite`,
                      animationDelay: `${i * 0.1}s`
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Variant 3: Live Performance Analytics */}
          <div style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
            borderRadius: '16px',
            padding: '40px',
            marginBottom: '40px',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 20px 40px rgba(102, 126, 234, 0.3)'
          }}>
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: `
                radial-gradient(circle at 20% 30%, rgba(255,255,255,0.1) 0%, transparent 50%),
                radial-gradient(circle at 80% 70%, rgba(240, 147, 251, 0.1) 0%, transparent 50%)
              `,
              pointerEvents: 'none'
            }} />

            <h2 style={{
              fontSize: '2rem',
              fontWeight: '600',
              color: '#ffffff',
              marginBottom: '32px',
              textAlign: 'center',
              textShadow: '0 2px 10px rgba(0,0,0,0.3)'
            }}>
              Live Performance Analytics
            </h2>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '2fr 1fr',
              gap: '32px',
              marginBottom: '32px'
            }}>
              {/* Live Chart Area */}
              <div style={{
                background: 'rgba(255,255,255,0.1)',
                backdropFilter: 'blur(10px)',
                borderRadius: '12px',
                padding: '24px',
                border: '1px solid rgba(255,255,255,0.2)',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: '600',
                  color: '#ffffff',
                  marginBottom: '20px'
                }}>
                  Real-time Performance Metrics
                </h3>
                
                {/* Animated Chart Lines */}
                <svg width="100%" height="200" viewBox="0 0 400 200" style={{marginBottom: '20px'}}>
                  <defs>
                    <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="rgba(102, 126, 234, 0.8)" />
                      <stop offset="100%" stopColor="rgba(102, 126, 234, 0.1)" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M0,150 Q50,120 100,140 T200,100 T300,80 T400,60"
                    stroke="rgba(102, 126, 234, 0.8)"
                    strokeWidth="3"
                    fill="none"
                    style={{
                      animation: 'chartAnimation 3s ease-in-out infinite'
                    }}
                  />
                  <path
                    d="M0,180 Q50,160 100,170 T200,150 T300,130 T400,110"
                    stroke="rgba(240, 147, 251, 0.8)"
                    strokeWidth="2"
                    fill="none"
                    style={{
                      animation: 'chartAnimation 3s ease-in-out infinite 0.5s'
                    }}
                  />
                </svg>

                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <div style={{
                      width: '12px',
                      height: '12px',
                      borderRadius: '50%',
                      background: '#667eea'
                    }} />
                    <span style={{color: '#ffffff', fontSize: '0.875rem'}}>CTR Performance</span>
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <div style={{
                      width: '12px',
                      height: '12px',
                      borderRadius: '50%',
                      background: '#f093fb'
                    }} />
                    <span style={{color: '#ffffff', fontSize: '0.875rem'}}>Conversion Rate</span>
                  </div>
                </div>
              </div>

              {/* Live Metrics */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '16px'
              }}>
                {[
                  { label: 'CTR', value: '4.2%', change: '+12%', trend: 'up' },
                  { label: 'CPC', value: '$2.34', change: '-8%', trend: 'down' },
                  { label: 'ROAS', value: '3.8x', change: '+15%', trend: 'up' },
                  { label: 'Impressions', value: '2.1M', change: '+5%', trend: 'up' }
                ].map((metric, index) => (
                  <div key={index} style={{
                    background: 'rgba(255,255,255,0.1)',
                    borderRadius: '8px',
                    padding: '16px',
                    border: '1px solid rgba(255,255,255,0.2)',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)';
                    e.currentTarget.style.background = 'rgba(255,255,255,0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                  }}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '8px'
                    }}>
                      <span style={{
                        fontSize: '0.875rem',
                        color: 'rgba(255,255,255,0.8)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em'
                      }}>
                        {metric.label}
                      </span>
                      <span style={{
                        fontSize: '0.75rem',
                        color: metric.trend === 'up' ? '#43e97b' : '#fa709a',
                        fontWeight: '600'
                      }}>
                        {metric.change}
                      </span>
                    </div>
                    <div style={{
                      fontSize: '1.5rem',
                      fontWeight: '700',
                      color: '#ffffff',
                      textShadow: '0 2px 10px rgba(0,0,0,0.3)'
                    }}>
                      {metric.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{
              textAlign: 'center'
            }}>
              <button style={{
                background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
                border: 'none',
                borderRadius: '12px',
                padding: '16px 32px',
                fontSize: '1rem',
                fontWeight: '600',
                color: '#1a1a1a',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 8px 20px rgba(67, 233, 123, 0.3)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginRight: '16px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 12px 30px rgba(67, 233, 123, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 8px 20px rgba(67, 233, 123, 0.3)';
              }}>
                View Full Report
              </button>
              <button style={{
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.3)',
                borderRadius: '12px',
                padding: '16px 32px',
                fontSize: '1rem',
                fontWeight: '600',
                color: '#ffffff',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.2)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}>
                Export Data
              </button>
            </div>
          </div>

          {/* Premium AI Analytics Visualization Block */}
          <div style={{
            background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 25%, #16213e 50%, #0f3460 75%, #533483 100%)',
            borderRadius: '24px',
            padding: '60px 40px',
            marginBottom: '40px',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 40px 80px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            
            {/* Animated Background Elements */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: `
                radial-gradient(circle at 20% 20%, rgba(102, 126, 234, 0.15) 0%, transparent 50%),
                radial-gradient(circle at 80% 80%, rgba(240, 147, 251, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 40% 60%, rgba(67, 233, 123, 0.08) 0%, transparent 50%)
              `,
              animation: 'pulse 4s ease-in-out infinite',
              pointerEvents: 'none'
            }} />

            {/* Floating 3D Particles */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              pointerEvents: 'none'
            }}>
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  style={{
                    position: 'absolute',
                    width: `${2 + (i % 4)}px`,
                    height: `${2 + (i % 4)}px`,
                    background: i % 3 === 0 ? '#00FFE7' : i % 3 === 1 ? '#7F9CF5' : '#00BFAE',
                    borderRadius: '50%',
                    left: `${(i * 5) % 100}%`,
                    top: `${(i * 7) % 100}%`,
                    animation: `dataFloat ${4 + i % 6}s linear infinite`,
                    animationDelay: `${i * 0.2}s`,
                    boxShadow: i % 3 === 0 ? '0 0 20px #00FFE7' : i % 3 === 1 ? '0 0 20px #7F9CF5' : '0 0 20px #00BFAE',
                    transform: 'translateZ(0)'
                  }}
                />
              ))}
            </div>

            {/* Main Content */}
            <div style={{
              position: 'relative',
              zIndex: 10,
              textAlign: 'center'
            }}>
              
              {/* Hero Section */}
              <h2 style={{
                fontSize: 'clamp(48px, 6vw, 72px)',
                fontWeight: '800',
                background: 'linear-gradient(135deg, #00FFE7 0%, #7F9CF5 50%, #00BFAE 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: '24px',
                lineHeight: '1.1',
                textShadow: '0 4px 20px rgba(0, 255, 231, 0.3)'
              }}>
                AI Analytics in Real-Time
              </h2>
              
              <p style={{
                fontSize: 'clamp(18px, 2.5vw, 24px)',
                color: 'rgba(255, 255, 255, 0.8)',
                marginBottom: '60px',
                maxWidth: '800px',
                margin: '0 auto 60px',
                lineHeight: '1.6',
                fontWeight: '300'
              }}>
                Watch as our AI processes Google Ads data with surgical precision, delivering insights that transform your campaigns
              </p>

              {/* Interactive Process Visualization */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '32px',
                marginBottom: '60px'
              }}>
                
                {/* Step 1: API Connection */}
                <div style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(20px)',
                  borderRadius: '20px',
                  padding: '32px',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  transition: 'all 0.4s ease',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-12px) scale(1.02)';
                  e.currentTarget.style.boxShadow = '0 30px 60px rgba(0, 0, 0, 0.4)';
                  e.currentTarget.style.borderColor = 'rgba(0, 255, 231, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                }}>
                  
                  {/* Step Number */}
                  <div style={{
                    position: 'absolute',
                    top: '20px',
                    right: '20px',
                    width: '40px',
                    height: '40px',
                    background: 'linear-gradient(135deg, #00FFE7, #7F9CF5)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '18px',
                    fontWeight: '700',
                    color: '#ffffff',
                    boxShadow: '0 8px 24px rgba(0, 255, 231, 0.4)'
                  }}>
                    1
                  </div>

                  {/* Icon */}
                  <div style={{
                    width: '80px',
                    height: '80px',
                    background: 'linear-gradient(135deg, rgba(0, 255, 231, 0.2), rgba(127, 156, 245, 0.1))',
                    borderRadius: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 24px',
                    border: '1px solid rgba(0, 255, 231, 0.3)',
                    animation: 'pulse 2s ease-in-out infinite'
                  }}>
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" style={{color: '#00FFE7'}}>
                      <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5"/>
                    </svg>
                  </div>

                  <h3 style={{
                    fontSize: '24px',
                    fontWeight: '700',
                    color: '#ffffff',
                    marginBottom: '16px',
                    textAlign: 'center'
                  }}>
                    API Connection
                  </h3>
                  
                  <p style={{
                    fontSize: '16px',
                    color: 'rgba(255, 255, 255, 0.7)',
                    lineHeight: '1.6',
                    marginBottom: '20px',
                    textAlign: 'center'
                  }}>
                    Secure real-time connection to Google Ads API with 99.9% uptime
                  </p>

                  {/* Live Status */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px'
                  }}>
                    <div style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      background: '#00BFAE',
                      animation: 'pulse 1s ease-in-out infinite'
                    }} />
                    <span style={{
                      fontSize: '14px',
                      color: '#00BFAE',
                      fontWeight: '600',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em'
                    }}>
                      Connected
                    </span>
                  </div>
                </div>

                {/* Step 2: Data Analysis */}
                <div style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(20px)',
                  borderRadius: '20px',
                  padding: '32px',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  transition: 'all 0.4s ease',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-12px) scale(1.02)';
                  e.currentTarget.style.boxShadow = '0 30px 60px rgba(0, 0, 0, 0.4)';
                  e.currentTarget.style.borderColor = 'rgba(127, 156, 245, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                }}>
                  
                  <div style={{
                    position: 'absolute',
                    top: '20px',
                    right: '20px',
                    width: '40px',
                    height: '40px',
                    background: 'linear-gradient(135deg, #7F9CF5, #00BFAE)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '18px',
                    fontWeight: '700',
                    color: '#ffffff',
                    boxShadow: '0 8px 24px rgba(127, 156, 245, 0.4)'
                  }}>
                    2
                  </div>

                  <div style={{
                    width: '80px',
                    height: '80px',
                    background: 'linear-gradient(135deg, rgba(127, 156, 245, 0.2), rgba(0, 191, 174, 0.1))',
                    borderRadius: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 24px',
                    border: '1px solid rgba(127, 156, 245, 0.3)',
                    animation: 'pulse 2s ease-in-out infinite 0.5s'
                  }}>
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" style={{color: '#7F9CF5'}}>
                      <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                      <path d="M7 17L10 14L14 17L21 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <circle cx="7" cy="17" r="1" fill="currentColor"/>
                      <circle cx="10" cy="14" r="1" fill="currentColor"/>
                      <circle cx="14" cy="17" r="1" fill="currentColor"/>
                      <circle cx="21" cy="10" r="1" fill="currentColor"/>
                    </svg>
                  </div>

                  <h3 style={{
                    fontSize: '24px',
                    fontWeight: '700',
                    color: '#ffffff',
                    marginBottom: '16px',
                    textAlign: 'center'
                  }}>
                    Data Analysis
                  </h3>
                  
                  <p style={{
                    fontSize: '16px',
                    color: 'rgba(255, 255, 255, 0.7)',
                    lineHeight: '1.6',
                    marginBottom: '20px',
                    textAlign: 'center'
                  }}>
                    Advanced pattern recognition and trend analysis in milliseconds
                  </p>

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px'
                  }}>
                    <div style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      background: '#00FFE7',
                      animation: 'pulse 1s ease-in-out infinite'
                    }} />
                    <span style={{
                      fontSize: '14px',
                      color: '#00FFE7',
                      fontWeight: '600',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em'
                    }}>
                      Processing
                    </span>
                  </div>
                </div>

                {/* Step 3: AI Processing */}
                <div style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(20px)',
                  borderRadius: '20px',
                  padding: '32px',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  transition: 'all 0.4s ease',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-12px) scale(1.02)';
                  e.currentTarget.style.boxShadow = '0 30px 60px rgba(0, 0, 0, 0.4)';
                  e.currentTarget.style.borderColor = 'rgba(0, 255, 231, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                }}>
                  
                  <div style={{
                    position: 'absolute',
                    top: '20px',
                    right: '20px',
                    width: '40px',
                    height: '40px',
                    background: 'linear-gradient(135deg, #00FFE7, #00BFAE)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '18px',
                    fontWeight: '700',
                    color: '#ffffff',
                    boxShadow: '0 8px 24px rgba(0, 255, 231, 0.4)'
                  }}>
                    3
                  </div>

                  <div style={{
                    width: '80px',
                    height: '80px',
                    background: 'linear-gradient(135deg, rgba(0, 255, 231, 0.2), rgba(0, 191, 174, 0.1))',
                    borderRadius: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 24px',
                    border: '1px solid rgba(0, 255, 231, 0.3)',
                    animation: 'pulse 2s ease-in-out infinite 1s'
                  }}>
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" style={{color: '#00FFE7'}}>
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/>
                      <path d="M12 4V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                      <path d="M12 16V20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                      <path d="M4 12H8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                      <path d="M16 12H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                      <path d="M6.34 6.34L8.93 8.93" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                      <path d="M15.07 15.07L17.66 17.66" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                      <path d="M6.34 17.66L8.93 15.07" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                      <path d="M15.07 8.93L17.66 6.34" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </div>

                  <h3 style={{
                    fontSize: '24px',
                    fontWeight: '700',
                    color: '#ffffff',
                    marginBottom: '16px',
                    textAlign: 'center'
                  }}>
                    AI Processing
                  </h3>
                  
                  <p style={{
                    fontSize: '16px',
                    color: 'rgba(255, 255, 255, 0.7)',
                    lineHeight: '1.6',
                    marginBottom: '20px',
                    textAlign: 'center'
                  }}>
                    Neural networks analyze patterns and predict optimal strategies
                  </p>

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px'
                  }}>
                    <div style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      background: '#7F9CF5',
                      animation: 'pulse 1s ease-in-out infinite'
                    }} />
                    <span style={{
                      fontSize: '14px',
                      color: '#7F9CF5',
                      fontWeight: '600',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em'
                    }}>
                      Active
                    </span>
                  </div>
                </div>

                {/* Step 4: Insights Generation */}
                <div style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(20px)',
                  borderRadius: '20px',
                  padding: '32px',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  transition: 'all 0.4s ease',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-12px) scale(1.02)';
                  e.currentTarget.style.boxShadow = '0 30px 60px rgba(0, 0, 0, 0.4)';
                  e.currentTarget.style.borderColor = 'rgba(0, 191, 174, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                }}>
                  
                  <div style={{
                    position: 'absolute',
                    top: '20px',
                    right: '20px',
                    width: '40px',
                    height: '40px',
                    background: 'linear-gradient(135deg, #00BFAE, #7F9CF5)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '18px',
                    fontWeight: '700',
                    color: '#ffffff',
                    boxShadow: '0 8px 24px rgba(0, 191, 174, 0.4)'
                  }}>
                    4
                  </div>

                  <div style={{
                    width: '80px',
                    height: '80px',
                    background: 'linear-gradient(135deg, rgba(0, 191, 174, 0.2), rgba(127, 156, 245, 0.1))',
                    borderRadius: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 24px',
                    border: '1px solid rgba(0, 191, 174, 0.3)',
                    animation: 'pulse 2s ease-in-out infinite 1.5s'
                  }}>
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" style={{color: '#00BFAE'}}>
                      <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                      <path d="M7 12L10 15L17 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>

                  <h3 style={{
                    fontSize: '24px',
                    fontWeight: '700',
                    color: '#ffffff',
                    marginBottom: '16px',
                    textAlign: 'center'
                  }}>
                    Insights Generation
                  </h3>
                  
                  <p style={{
                    fontSize: '16px',
                    color: 'rgba(255, 255, 255, 0.7)',
                    lineHeight: '1.6',
                    marginBottom: '20px',
                    textAlign: 'center'
                  }}>
                    Actionable insights and recommendations generated instantly
                  </p>

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px'
                  }}>
                    <div style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      background: '#00FFE7',
                      animation: 'pulse 1s ease-in-out infinite'
                    }} />
                    <span style={{
                      fontSize: '14px',
                      color: '#00FFE7',
                      fontWeight: '600',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em'
                    }}>
                      Ready
                    </span>
                  </div>
                </div>

                {/* Step 5: Optimization */}
                <div style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(20px)',
                  borderRadius: '20px',
                  padding: '32px',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  transition: 'all 0.4s ease',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-12px) scale(1.02)';
                  e.currentTarget.style.boxShadow = '0 30px 60px rgba(0, 0, 0, 0.4)';
                  e.currentTarget.style.borderColor = 'rgba(127, 156, 245, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                }}>
                  
                  <div style={{
                    position: 'absolute',
                    top: '20px',
                    right: '20px',
                    width: '40px',
                    height: '40px',
                    background: 'linear-gradient(135deg, #7F9CF5, #00FFE7)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '18px',
                    fontWeight: '700',
                    color: '#ffffff',
                    boxShadow: '0 8px 24px rgba(127, 156, 245, 0.4)'
                  }}>
                    5
                  </div>

                  <div style={{
                    width: '80px',
                    height: '80px',
                    background: 'linear-gradient(135deg, rgba(127, 156, 245, 0.2), rgba(0, 255, 231, 0.1))',
                    borderRadius: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 24px',
                    border: '1px solid rgba(127, 156, 245, 0.3)',
                    animation: 'pulse 2s ease-in-out infinite 2s'
                  }}>
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" style={{color: '#7F9CF5'}}>
                      <path d="M12 2L12 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                      <path d="M2 12H22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5"/>
                      <path d="M12 5L15 8L12 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 19L9 16L12 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>

                  <h3 style={{
                    fontSize: '24px',
                    fontWeight: '700',
                    color: '#ffffff',
                    marginBottom: '16px',
                    textAlign: 'center'
                  }}>
                    Optimization
                  </h3>
                  
                  <p style={{
                    fontSize: '16px',
                    color: 'rgba(255, 255, 255, 0.7)',
                    lineHeight: '1.6',
                    marginBottom: '20px',
                    textAlign: 'center'
                  }}>
                    Continuous campaign optimization for maximum ROI
                  </p>

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px'
                  }}>
                    <div style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      background: '#00BFAE',
                      animation: 'pulse 1s ease-in-out infinite'
                    }} />
                    <span style={{
                      fontSize: '14px',
                      color: '#00BFAE',
                      fontWeight: '600',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em'
                    }}>
                      Optimizing
                    </span>
                  </div>
                </div>
              </div>

              {/* Live Metrics Bar */}
              <div style={{
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(20px)',
                borderRadius: '16px',
                padding: '32px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                marginBottom: '40px'
              }}>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '24px'
                }}>
                  {[
                    { label: 'Data Points Processed', value: '2.4M', suffix: '/sec', color: '#00FFE7' },
                    { label: 'AI Accuracy', value: '99.7', suffix: '%', color: '#7F9CF5' },
                    { label: 'Response Time', value: '<50', suffix: 'ms', color: '#00BFAE' },
                    { label: 'Campaigns Optimized', value: '1,247', suffix: '', color: '#00FFE7' }
                  ].map((metric, index) => (
                    <div key={index} style={{
                      textAlign: 'center',
                      padding: '20px',
                      background: 'rgba(255, 255, 255, 0.03)',
                      borderRadius: '12px',
                      border: '1px solid rgba(255, 255, 255, 0.05)',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.05)';
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                    }}>
                      <div style={{
                        fontSize: '32px',
                        fontWeight: '800',
                        color: metric.color,
                        marginBottom: '8px',
                        textShadow: `0 0 20px ${metric.color}40`
                      }}>
                        {metric.value}{metric.suffix}
                      </div>
                      <div style={{
                        fontSize: '14px',
                        color: 'rgba(255, 255, 255, 0.7)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        fontWeight: '500'
                      }}>
                        {metric.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Section */}
              <div style={{
                textAlign: 'center'
              }}>
                <button style={{
                  background: 'linear-gradient(135deg, #00FFE7 0%, #7F9CF5 50%, #00BFAE 100%)',
                  border: 'none',
                  borderRadius: '16px',
                  padding: '20px 48px',
                  fontSize: '18px',
                  fontWeight: '700',
                  color: '#ffffff',
                  cursor: 'pointer',
                  transition: 'all 0.4s ease',
                  boxShadow: '0 20px 40px rgba(0, 255, 231, 0.4)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px) scale(1.02)';
                  e.currentTarget.style.boxShadow = '0 30px 60px rgba(0, 255, 231, 0.6)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 255, 231, 0.4)';
                }}>
                  <span style={{
                    position: 'relative',
                    zIndex: 2
                  }}>
                    Launch AI Demo
                  </span>
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: '-100%',
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
                    transition: 'left 0.5s ease',
                    zIndex: 1
                  }} />
                </button>
                
                <p style={{
                  fontSize: '14px',
                  color: 'rgba(255, 255, 255, 0.6)',
                  marginTop: '16px',
                  fontWeight: '300'
                }}>
                  Experience the future of AI-powered analytics
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Premium Industry Solutions Block */}
        <section style={{
          padding: '120px 0',
          background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Animated Background Elements */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `
              radial-gradient(circle at 20% 30%, rgba(0, 255, 231, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 80% 70%, rgba(127, 156, 245, 0.08) 0%, transparent 50%),
              radial-gradient(circle at 40% 80%, rgba(0, 191, 174, 0.06) 0%, transparent 50%)
            `,
            pointerEvents: 'none'
          }} />

          {/* Floating Geometric Shapes */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            pointerEvents: 'none'
          }}>
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  width: `${20 + (i % 3) * 10}px`,
                  height: `${20 + (i % 3) * 10}px`,
                  background: i % 3 === 0 ? 'rgba(0, 255, 231, 0.1)' : i % 3 === 1 ? 'rgba(127, 156, 245, 0.1)' : 'rgba(0, 191, 174, 0.1)',
                  borderRadius: i % 2 === 0 ? '50%' : '4px',
                  left: `${(i * 8) % 100}%`,
                  top: `${(i * 12) % 100}%`,
                  animation: `float ${6 + i % 4}s ease-in-out infinite`,
                  animationDelay: `${i * 0.5}s`,
                  transform: 'rotate(45deg)'
                }}
              />
            ))}
          </div>

          <div style={{
            maxWidth: '1400px',
            margin: '0 auto',
            padding: '0 24px',
            position: 'relative',
            zIndex: 1
          }}>
            {/* Header Section */}
            <div style={{
              textAlign: 'center',
              marginBottom: '80px'
            }}>
              <h2 style={{
                fontSize: 'clamp(48px, 6vw, 72px)',
                fontWeight: '800',
                background: 'linear-gradient(135deg, #00FFE7 0%, #7F9CF5 50%, #00BFAE 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: '24px',
                lineHeight: '1.1',
                textShadow: '0 4px 20px rgba(0, 255, 231, 0.3)'
              }}>
                Tailored AI Solutions for Every Industry
              </h2>
              
              <p style={{
                fontSize: 'clamp(18px, 2.5vw, 24px)',
                color: 'rgba(255, 255, 255, 0.8)',
                maxWidth: '800px',
                margin: '0 auto',
                lineHeight: '1.6',
                fontWeight: '300'
              }}>
                Our AI understands the unique challenges of your business
              </p>
            </div>

            {/* Interactive Industry Cards */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '32px',
              marginBottom: '60px'
            }}>
              {[
                {
                  title: 'Dentists',
                  description: 'Attract more patients with targeted local SEO campaigns. Our AI optimizes for dental-specific keywords and local search intent.',
                  icon: (
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                      <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5"/>
                    </svg>
                  ),
                  gradient: 'linear-gradient(135deg, #00FFE7, #7F9CF5)',
                  stats: { patients: '+47%', keywords: '2.3K', cpc: '-32%' }
                },
                {
                  title: 'Real Estate',
                  description: 'Generate qualified leads with hyper-local targeting. Our AI finds the perfect audience for your property listings and market updates.',
                  icon: (
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                      <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M9 22V12H15V22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  ),
                  gradient: 'linear-gradient(135deg, #7F9CF5, #00BFAE)',
                  stats: { leads: '+89%', targeting: 'Hyper-local', roi: '+156%' }
                },
                {
                  title: 'SaaS Companies',
                  description: 'Scale your user acquisition with intelligent B2B targeting. Our AI optimizes for high-value leads and reduces customer acquisition costs.',
                  icon: (
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" stroke="currentColor" strokeWidth="1.5"/>
                      <line x1="8" y1="21" x2="16" y2="21" stroke="currentColor" strokeWidth="1.5"/>
                      <line x1="12" y1="17" x2="12" y2="21" stroke="currentColor" strokeWidth="1.5"/>
                      <circle cx="12" cy="9" r="2" stroke="currentColor" strokeWidth="1.5"/>
                      <path d="M8 13C8 13 9 12 12 12C15 12 16 13 16 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  ),
                  gradient: 'linear-gradient(135deg, #00BFAE, #00FFE7)',
                  stats: { users: '+234%', cac: '-41%', ltv: '+89%' }
                },
                {
                  title: 'Legal Services',
                  description: 'Build trust and attract qualified clients. Our AI targets legal-specific keywords and optimizes for high-intent search queries.',
                  icon: (
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                      <path d="M12 1V23" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M17 5H9.5C8.57174 5 7.6815 5.36875 7.02513 6.02513C6.36875 6.6815 6 7.57174 6 8.5C6 9.42826 6.36875 10.3185 7.02513 10.9749C7.6815 11.6313 8.57174 12 9.5 12H14.5C15.4283 12 16.3185 12.3687 16.9749 13.0251C17.6313 13.6815 18 14.5717 18 15.5C18 16.4283 17.6313 17.3185 16.9749 17.9749C16.3185 18.6313 15.4283 19 14.5 19H6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  ),
                  gradient: 'linear-gradient(135deg, #00FFE7, #00BFAE)',
                  stats: { clients: '+67%', trust: 'High-intent', conversion: '+89%' }
                }
              ].map((industry, index) => (
                <div
                  key={index}
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: '24px',
                    padding: '40px',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                    cursor: 'pointer',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-16px) scale(1.02)';
                    e.currentTarget.style.boxShadow = '0 40px 80px rgba(0, 0, 0, 0.4)';
                    e.currentTarget.style.borderColor = 'rgba(0, 255, 231, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                  }}
                >
                  {/* Animated Background Gradient */}
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: industry.gradient,
                    opacity: 0,
                    transition: 'opacity 0.5s ease',
                    zIndex: 0
                  }} />
                  
                  {/* Icon Container */}
                  <div style={{
                    width: '80px',
                    height: '80px',
                    background: industry.gradient,
                    borderRadius: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '24px',
                    position: 'relative',
                    zIndex: 1,
                    boxShadow: `0 8px 32px ${industry.gradient.includes('#00FFE7') ? 'rgba(0, 255, 231, 0.3)' : industry.gradient.includes('#7F9CF5') ? 'rgba(127, 156, 245, 0.3)' : 'rgba(0, 191, 174, 0.3)'}`,
                    animation: 'pulse 3s ease-in-out infinite'
                  }}>
                    <div style={{ color: '#ffffff' }}>
                      {industry.icon}
                    </div>
                  </div>

                  {/* Content */}
                  <div style={{ position: 'relative', zIndex: 1 }}>
                    <h3 style={{
                      fontSize: '28px',
                      fontWeight: '700',
                      color: '#ffffff',
                      marginBottom: '16px',
                      lineHeight: '1.2'
                    }}>
                      {industry.title}
                    </h3>
                    
                    <p style={{
                      fontSize: '16px',
                      color: 'rgba(255, 255, 255, 0.7)',
                      lineHeight: '1.6',
                      marginBottom: '24px'
                    }}>
                      {industry.description}
                    </p>

                    {/* Live Stats */}
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(3, 1fr)',
                      gap: '16px',
                      marginBottom: '24px'
                    }}>
                      {Object.entries(industry.stats).map(([key, value], statIndex) => (
                        <div key={statIndex} style={{
                          textAlign: 'center',
                          padding: '12px',
                          background: 'rgba(255, 255, 255, 0.05)',
                          borderRadius: '12px',
                          border: '1px solid rgba(255, 255, 255, 0.1)'
                        }}>
                          <div style={{
                            fontSize: '18px',
                            fontWeight: '700',
                            color: industry.gradient.includes('#00FFE7') ? '#00FFE7' : industry.gradient.includes('#7F9CF5') ? '#7F9CF5' : '#00BFAE',
                            marginBottom: '4px'
                          }}>
                            {value}
                          </div>
                          <div style={{
                            fontSize: '12px',
                            color: 'rgba(255, 255, 255, 0.6)',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                            fontWeight: '500'
                          }}>
                            {key}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Learn More Button */}
                    <button style={{
                      background: 'transparent',
                      border: '2px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: '12px',
                      padding: '12px 24px',
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#ffffff',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = industry.gradient.includes('#00FFE7') ? '#00FFE7' : industry.gradient.includes('#7F9CF5') ? '#7F9CF5' : '#00BFAE';
                      e.currentTarget.style.background = industry.gradient.includes('#00FFE7') ? 'rgba(0, 255, 231, 0.1)' : industry.gradient.includes('#7F9CF5') ? 'rgba(127, 156, 245, 0.1)' : 'rgba(0, 191, 174, 0.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                      e.currentTarget.style.background = 'transparent';
                    }}>
                      Learn more
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom CTA */}
            <div style={{
              textAlign: 'center',
              padding: '60px 0',
              background: 'rgba(255, 255, 255, 0.02)',
              borderRadius: '24px',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(20px)'
            }}>
              <h3 style={{
                fontSize: 'clamp(32px, 4vw, 48px)',
                fontWeight: '700',
                color: '#ffffff',
                marginBottom: '16px'
              }}>
                Ready to Transform Your Business?
              </h3>
              
              <p style={{
                fontSize: '18px',
                color: 'rgba(255, 255, 255, 0.7)',
                marginBottom: '32px',
                maxWidth: '600px',
                margin: '0 auto 32px',
                lineHeight: '1.6'
              }}>
                Join thousands of businesses already using AI to optimize their campaigns and drive results
              </p>
              
              <button style={{
                background: 'linear-gradient(135deg, #00FFE7 0%, #7F9CF5 50%, #00BFAE 100%)',
                border: 'none',
                borderRadius: '16px',
                padding: '20px 48px',
                fontSize: '18px',
                fontWeight: '700',
                color: '#ffffff',
                cursor: 'pointer',
                transition: 'all 0.4s ease',
                boxShadow: '0 20px 40px rgba(0, 255, 231, 0.4)',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px) scale(1.02)';
                e.currentTarget.style.boxShadow = '0 30px 60px rgba(0, 255, 231, 0.6)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 255, 231, 0.4)';
              }}>
                Start Your AI Journey
              </button>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
} 