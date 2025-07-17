'use client';

import { useState, useEffect } from 'react';
import Header from '../../components/Header';
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
          <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    { 
      id: 1, 
      name: 'ANALYSIS', 
      color: '#f093fb',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M3 3V21H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M9 9L12 6L16 10L21 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="9" cy="9" r="1" fill="currentColor"/>
          <circle cx="12" cy="6" r="1" fill="currentColor"/>
          <circle cx="16" cy="10" r="1" fill="currentColor"/>
          <circle cx="21" cy="5" r="1" fill="currentColor"/>
        </svg>
      )
    },
    { 
      id: 2, 
      name: 'PATTERN DETECTION', 
      color: '#4facfe',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M11 7V11L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    { 
      id: 3, 
      name: 'OPTIMIZATION', 
      color: '#43e97b',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M19 15L20 17L22 18L20 19L19 21L18 19L16 18L18 17L19 15Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M5 15L6 17L8 18L6 19L5 21L4 19L2 18L4 17L5 15Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    { 
      id: 4, 
      name: 'VALIDATION', 
      color: '#fa709a',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="1.5"/>
        </svg>
      )
    },
    { 
      id: 5, 
      name: 'DEPLOYMENT', 
      color: '#a8edea',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 12V22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
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
        fontFamily: 'monospace'
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
          
          {/* System Header */}
          <div style={{
            textAlign: 'center',
            marginBottom: '40px',
            animation: 'fadeInUp 1s ease-out'
          }}>
            <h1 style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: '300',
              color: '#1a1a1a',
              marginBottom: '8px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              textShadow: '0 0 20px rgba(102, 126, 234, 0.3)'
            }}>
              KAMPAIO AI ANALYTICS
            </h1>
            <div style={{
              fontSize: '0.875rem',
              color: 'rgba(26, 26, 26, 0.6)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase'
            }}>
              SYSTEM STATUS: OPERATIONAL | VERSION 2.1.4 | AI CORE: ACTIVE
            </div>
          </div>



          {/* Main Interactive Dashboard */}
          <div style={{
            flex: 1,
            position: 'relative',
            background: 'rgba(248, 250, 252, 0.8)',
            border: '1px solid rgba(102, 126, 234, 0.2)',
            borderRadius: '12px',
            padding: '32px',
            backdropFilter: 'blur(20px)',
            minHeight: '600px'
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
                  animation: `dataFlow ${3 + dataFlow / 20}s linear infinite`
                }}
              />
              <path
                d="M 100 200 Q 300 100 500 200 T 700 200"
                stroke="url(#dataFlow)"
                strokeWidth="2"
                fill="none"
                strokeDasharray="10,5"
                style={{
                  animation: `dataFlow ${2 + dataFlow / 30}s linear infinite`
                }}
              />
              <path
                d="M 100 400 Q 300 500 500 400 T 700 400"
                stroke="url(#dataFlow)"
                strokeWidth="2"
                fill="none"
                strokeDasharray="10,5"
                style={{
                  animation: `dataFlow ${4 + dataFlow / 25}s linear infinite`
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
        </div>

        <Footer />
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes gridMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }

        @keyframes dataFloat {
          0% {
            transform: translateY(100vh) scale(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100px) scale(1);
            opacity: 0;
          }
        }

        @keyframes hubPulse {
          0%, 100% {
            transform: translate(-50%, -50%) scale(1);
            box-shadow: 0 0 60px rgba(102, 126, 234, 0.3);
          }
          50% {
            transform: translate(-50%, -50%) scale(1.05);
            box-shadow: 0 0 80px rgba(102, 126, 234, 0.5);
          }
        }

        @keyframes phaseActive {
          0%, 100% {
            opacity: 0.5;
            box-shadow: 0 0 10px currentColor;
          }
          50% {
            opacity: 1;
            box-shadow: 0 0 20px currentColor;
          }
        }

        @keyframes phasePulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
        }

        @keyframes dataFlow {
          0% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: -15; }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
      `}</style>
    </>
  );
} 