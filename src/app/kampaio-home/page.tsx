'use client';

import { useState, useEffect } from 'react';
import Header from '../../components/Header';
import AnimatedHero from '../../components/AnimatedHero';
import FeatureCard from '../../components/InteractiveFeatureCard';
import Footer from '../../components/Footer';

// AI Dashboard Component
function AIAnalyticsDashboard() {
  const [currentPhase, setCurrentPhase] = useState(0);
  const [dataFlow, setDataFlow] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [metrics, setMetrics] = useState({
    dataPoints: 0,
    patterns: 0,
    optimizations: 0,
    accuracy: 0
  });

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

  // Live metrics
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        dataPoints: Math.min(prev.dataPoints + Math.floor((Date.now() % 5000) / 100), 1000000),
        patterns: Math.min(prev.patterns + Math.floor((Date.now() % 3000) / 100), 950000),
        optimizations: Math.min(prev.optimizations + Math.floor((Date.now() % 100) / 10), 50000),
        accuracy: Math.min(prev.accuracy + ((Date.now() % 50) / 100), 99.8)
      }));
    }, 100);

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
    <div style={{
      width: '100%',
      height: '500px',
      background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)',
      borderRadius: '20px',
      border: '1px solid rgba(102, 126, 234, 0.2)',
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
          linear-gradient(90deg, rgba(102, 126, 234, 0.1) 1px, transparent 1px),
          linear-gradient(rgba(102, 126, 234, 0.1) 1px, transparent 1px)
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
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: '2px',
              height: '2px',
              background: `hsl(${200 + i * 3}, 70%, 60%)`,
              borderRadius: '50%',
              left: `${(i * 7) % 100}%`,
              top: `${(i * 11) % 100}%`,
              animation: `dataFloat ${3 + i % 5}s linear infinite`,
              animationDelay: `${i * 0.1}s`,
              boxShadow: `0 0 10px hsl(${200 + i * 3}, 70%, 60%)`
            }}
          />
        ))}
      </div>

      {/* System Header */}
      <div style={{
        position: 'absolute',
        top: '20px',
        left: '20px',
        right: '20px',
        zIndex: 10
      }}>
        <div style={{
          textAlign: 'center',
          marginBottom: '20px'
        }}>
          <h3 style={{
            fontSize: '1.25rem',
            fontWeight: '300',
            color: '#ffffff',
            marginBottom: '4px',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            textShadow: '0 0 10px rgba(102, 126, 234, 0.5)'
          }}>
            AI Analytics Dashboard
          </h3>
          <div style={{
            fontSize: '0.75rem',
            color: 'rgba(255, 255, 255, 0.6)',
            letterSpacing: '0.05em',
            textTransform: 'uppercase'
          }}>
            SYSTEM STATUS: OPERATIONAL | AI CORE: ACTIVE
          </div>
        </div>

        {/* Live Metrics Bar */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '12px 16px',
          background: 'rgba(255, 255, 255, 0.05)',
          border: '1px solid rgba(102, 126, 234, 0.3)',
          borderRadius: '8px',
          backdropFilter: 'blur(10px)'
        }}>
          {[
            { label: 'DATA', value: metrics.dataPoints.toLocaleString(), color: '#667eea' },
            { label: 'PATTERNS', value: metrics.patterns.toLocaleString(), color: '#f093fb' },
            { label: 'OPTIMIZATIONS', value: metrics.optimizations.toLocaleString(), color: '#43e97b' },
            { label: 'ACCURACY', value: `${metrics.accuracy.toFixed(1)}%`, color: '#fa709a' }
          ].map((metric, index) => (
            <div key={metric.label} style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: '1rem',
                fontWeight: '600',
                color: metric.color,
                marginBottom: '2px',
                textShadow: `0 0 10px ${metric.color}`
              }}>
                {metric.value}
              </div>
              <div style={{
                fontSize: '0.625rem',
                color: 'rgba(255, 255, 255, 0.5)',
                letterSpacing: '0.05em',
                textTransform: 'uppercase'
              }}>
                {metric.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Central Processing Hub */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '120px',
        height: '120px',
        background: 'radial-gradient(circle, rgba(102, 126, 234, 0.2) 0%, rgba(102, 126, 234, 0.05) 70%, transparent 100%)',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#667eea',
        boxShadow: `
          0 0 40px rgba(102, 126, 234, 0.3),
          inset 0 0 40px rgba(102, 126, 234, 0.1)
        `,
        animation: 'hubPulse 3s ease-in-out infinite',
        border: '2px solid rgba(102, 126, 234, 0.3)'
      }}>
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
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
        width: '300px',
        height: '300px'
      }}>
        {phases.map((phase, index) => (
          <div
            key={phase.id}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: `translate(-50%, -50%) rotate(${index * 60}deg)`,
              width: '220px',
              height: '2px',
              background: currentPhase === phase.id 
                ? `linear-gradient(90deg, transparent, ${phase.color}, transparent)`
                : 'rgba(255, 255, 255, 0.1)',
              animation: currentPhase === phase.id ? 'phaseActive 2s ease-in-out infinite' : 'none'
            }}
          >
            <div style={{
              position: 'absolute',
              right: '-15px',
              top: '-15px',
              width: '30px',
              height: '30px',
              background: currentPhase === phase.id ? phase.color : 'rgba(102, 126, 234, 0.1)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: currentPhase === phase.id ? '#ffffff' : 'rgba(102, 126, 234, 0.6)',
              boxShadow: currentPhase === phase.id 
                ? `0 0 15px ${phase.color}` 
                : 'none',
              animation: currentPhase === phase.id ? 'phasePulse 2s ease-in-out infinite' : 'none'
            }}>
              {phase.icon}
            </div>
            <div style={{
              position: 'absolute',
              right: '-90px',
              top: '-8px',
              fontSize: '0.625rem',
              color: currentPhase === phase.id ? phase.color : 'rgba(102, 126, 234, 0.6)',
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
        viewBox="0 0 500 500"
      >
        <defs>
          <linearGradient id="dataFlow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(102, 126, 234, 0)" />
            <stop offset="50%" stopColor="rgba(102, 126, 234, 0.8)" />
            <stop offset="100%" stopColor="rgba(102, 126, 234, 0)" />
          </linearGradient>
        </defs>
        <path
          d="M 50 250 Q 125 200 250 250 T 450 250"
          stroke="url(#dataFlow)"
          strokeWidth="2"
          fill="none"
          strokeDasharray="10,5"
          style={{
            animation: 'dataFlow 6s linear infinite'
          }}
        />
        <path
          d="M 50 200 Q 150 150 250 200 T 450 200"
          stroke="url(#dataFlow)"
          strokeWidth="2"
          fill="none"
          strokeDasharray="10,5"
          style={{
            animation: 'dataFlow 5s linear infinite'
          }}
        />
        <path
          d="M 50 300 Q 150 350 250 300 T 450 300"
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
        gap: '12px'
      }}>
        {[
          { name: 'INPUT', status: 'ACTIVE', data: '1.2M/s' },
          { name: 'PROCESS', status: currentPhase > 0 ? 'ACTIVE' : 'STANDBY', data: '850K/s' },
          { name: 'ANALYZE', status: currentPhase > 1 ? 'ACTIVE' : 'STANDBY', data: '650K/s' },
          { name: 'OUTPUT', status: currentPhase > 4 ? 'ACTIVE' : 'STANDBY', data: '450K/s' }
        ].map((zone, index) => (
          <div
            key={zone.name}
            style={{
              flex: 1,
              padding: '8px',
              background: zone.status === 'ACTIVE' 
                ? 'rgba(102, 126, 234, 0.1)' 
                : 'rgba(255, 255, 255, 0.05)',
              border: `1px solid ${zone.status === 'ACTIVE' ? 'rgba(102, 126, 234, 0.3)' : 'rgba(255, 255, 255, 0.1)'}`,
              borderRadius: '6px',
              textAlign: 'center',
              transition: 'all 0.3s ease'
            }}
          >
            <div style={{
              fontSize: '0.625rem',
              color: zone.status === 'ACTIVE' ? '#667eea' : 'rgba(255, 255, 255, 0.5)',
              marginBottom: '4px',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>
              {zone.name}
            </div>
            <div style={{
              fontSize: '0.875rem',
              fontWeight: '600',
              color: zone.status === 'ACTIVE' ? '#ffffff' : 'rgba(255, 255, 255, 0.3)',
              marginBottom: '2px'
            }}>
              {zone.data}
            </div>
            <div style={{
              fontSize: '0.5rem',
              color: zone.status === 'ACTIVE' ? '#43e97b' : 'rgba(255, 255, 255, 0.3)',
              textTransform: 'uppercase'
            }}>
              {zone.status}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Компонент для анимированных счетчиков
function AnimatedCounter({ 
  endValue, 
  duration = 2000, 
  delay = 0,
  suffix = '',
  prefix = ''
}: { 
  endValue: number; 
  duration?: number; 
  delay?: number;
  suffix?: string;
  prefix?: string;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      const startTime = Date.now();
      const startValue = 0;
      
      const updateCounter = () => {
        const currentTime = Date.now();
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const currentValue = Math.floor(startValue + (endValue - startValue) * easeOutQuart);
        
        setCount(currentValue);
        
        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        }
      };
      
      updateCounter();
    }, delay);

    return () => clearTimeout(timer);
  }, [endValue, duration, delay]);

  return (
    <span style={{
      fontSize: '28px',
      fontWeight: '700',
      color: 'white',
      animation: 'countUp 1s ease-out',
      animationDelay: `${delay}ms`
    }}>
      {prefix}{count}{suffix}
    </span>
  );
}

// Компонент для анимированного счетчика с валютой
function AnimatedCurrencyCounter({ 
  endValue, 
  duration = 2000, 
  delay = 0
}: { 
  endValue: number; 
  duration?: number; 
  delay?: number;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      const startTime = Date.now();
      const startValue = 0;
      
      const updateCounter = () => {
        const currentTime = Date.now();
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const currentValue = startValue + (endValue - startValue) * easeOutQuart;
        
        setCount(currentValue);
        
        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        }
      };
      
      updateCounter();
    }, delay);

    return () => clearTimeout(timer);
  }, [endValue, duration, delay]);

  return (
    <span style={{
      fontSize: '28px',
      fontWeight: '700',
      color: 'white',
      animation: 'countUp 1s ease-out',
      animationDelay: `${delay}ms`
    }}>
      ${count.toFixed(2)}
    </span>
  );
}







export default function KampaioHome() {
  const [openQuestion, setOpenQuestion] = useState<number | null>(null);

  const handleFAQClick = (questionId: number) => {
    setOpenQuestion(openQuestion === questionId ? null : questionId);
  };

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
        
        @keyframes dataFlow {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes fadeInUp {
          from { 
            transform: translateY(30px); 
            opacity: 0; 
          }
          to { 
            transform: translateY(0); 
            opacity: 1; 
          }
        }
        
        @keyframes gridMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
        
        @keyframes dataFloat {
          0%, 100% { 
            transform: translateY(0px) translateX(0px);
            opacity: 0.3;
          }
          25% { 
            transform: translateY(-20px) translateX(10px);
            opacity: 0.8;
          }
          50% { 
            transform: translateY(-10px) translateX(-5px);
            opacity: 1;
          }
          75% { 
            transform: translateY(-30px) translateX(15px);
            opacity: 0.6;
          }
        }
        
        @keyframes hubPulse {
          0%, 100% { 
            transform: translate(-50%, -50%) scale(1);
            box-shadow: 0 0 40px rgba(102, 126, 234, 0.3);
          }
          50% { 
            transform: translate(-50%, -50%) scale(1.1);
            box-shadow: 0 0 60px rgba(102, 126, 234, 0.5);
          }
        }
        
        @keyframes phaseActive {
          0%, 100% { 
            opacity: 0.3;
            transform: scale(1);
          }
          50% { 
            opacity: 1;
            transform: scale(1.05);
          }
        }
        
        @keyframes phasePulse {
          0%, 100% { 
            transform: scale(1);
            box-shadow: 0 0 15px currentColor;
          }
          50% { 
            transform: scale(1.1);
            box-shadow: 0 0 25px currentColor;
          }
        }
      `}</style>
    <div style={{
      minHeight: '100vh',
      background: '#1a1a1a',
      color: 'white',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>


      {/* Header */}
      <Header variant="full" />

      {/* Interactive AI Hero */}
      <AnimatedHero />

      {/* How Kampaio Helps You Run Smarter Ads */}
      <section style={{
        padding: '120px 0',
        background: 'linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)',
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

          {/* AI ENGINE VISUALIZATION */}
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto 80px auto'
          }}>
            <div style={{
              position: 'relative',
              background: 'linear-gradient(90deg, #eff6ff 0%, #ecfeff 50%, #faf5ff 100%)',
              borderRadius: '24px',
              padding: '48px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
              overflow: 'hidden'
            }}>
              {/* BACKGROUND PARTICLES */}
              <div style={{
                position: 'absolute',
                inset: 0,
                overflow: 'hidden',
                pointerEvents: 'none'
              }}>
                <div style={{
                  position: 'absolute',
                  width: '4px',
                  height: '4px',
                  background: '#7f9cf5',
                  borderRadius: '50%',
                  top: '20%',
                  left: '15%',
                  animation: 'float 6s ease-in-out infinite'
                }}></div>
                <div style={{
                  position: 'absolute',
                  width: '3px',
                  height: '3px',
                  background: '#00ffe7',
                  borderRadius: '50%',
                  top: '60%',
                  left: '80%',
                  animation: 'float 6s ease-in-out infinite',
                  animationDelay: '2s'
                }}></div>
                <div style={{
                  position: 'absolute',
                  width: '4px',
                  height: '4px',
                  background: '#7f9cf5',
                  borderRadius: '50%',
                  top: '80%',
                  left: '30%',
                  animation: 'float 6s ease-in-out infinite',
                  animationDelay: '4s'
                }}></div>
              </div>

              <div style={{
                textAlign: 'center',
                marginBottom: '24px'
              }}>
                <h3 style={{
                  fontSize: '32px',
                  fontWeight: '700',
                  color: '#1a1a1a',
                  marginBottom: '12px'
                }}>
                  AI Engine Under the Hood
                </h3>
                <p style={{
                  fontSize: '18px',
                  color: '#666'
                }}>
                  See how your data transforms into intelligent insights
                </p>
              </div>
              
              {/* PROCESS FLOW */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '32px'
              }}>
                
                {/* INPUT */}
                <div style={{
                  textAlign: 'center',
                  flex: 1
                }}>
                  <div style={{
                    width: '80px',
                    height: '80px',
                    background: 'white',
                    borderRadius: '16px',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 16px auto',
                    animation: 'pulse 2s infinite'
                  }}>
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2" style={{
                      animation: 'pulse 2s infinite'
                    }}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h4 style={{
                    fontSize: '20px',
                    fontWeight: '700',
                    color: '#1a1a1a',
                    marginBottom: '6px'
                  }}>
                    Your Data
                  </h4>
                  <div style={{
                    fontSize: '15px',
                    color: '#666',
                    lineHeight: '1.5'
                  }}>
                    <div>• Campaign metrics</div>
                    <div>• Keywords performance</div>
                    <div>• Historical data</div>
                  </div>
                </div>
                
                {/* ARROW 1 - УЛУЧШЕННАЯ АНИМАЦИЯ */}
                <div style={{
                  margin: '0 32px',
                  position: 'relative'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center'
                  }}>
                    <div style={{
                      width: '60px',
                      height: '2px',
                      background: 'linear-gradient(90deg, #7f9cf5, rgba(127,156,245,0.3))',
                      position: 'relative',
                      overflow: 'hidden',
                      borderRadius: '1px'
                    }}>
                      <div style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)',
                        width: '20px',
                        animation: 'dataFlow 2s ease-in-out infinite'
                      }}></div>
                    </div>
                    <div style={{
                      width: '0',
                      height: '0',
                      borderLeft: '8px solid #7f9cf5',
                      borderTop: '5px solid transparent',
                      borderBottom: '5px solid transparent',
                      marginLeft: '2px',
                      animation: 'pulse 3s infinite'
                    }}></div>
                  </div>
                  <div style={{
                    fontSize: '11px',
                    color: '#7f9cf5',
                    marginTop: '6px',
                    fontWeight: '500',
                    opacity: 0.8
                  }}>
                    Analyzing...
                  </div>
                  {/* Одна движущаяся точка данных */}
                  <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '0',
                    width: '6px',
                    height: '6px',
                    background: '#7f9cf5',
                    borderRadius: '50%',
                    animation: 'dataFlow 2s ease-in-out infinite',
                    boxShadow: '0 0 8px rgba(127,156,245,0.4)'
                  }}></div>
                </div>
                
                {/* AI BRAIN - УСИЛЕННАЯ АНИМАЦИЯ */}
                <div style={{
                  textAlign: 'center',
                  flex: 1
                }}>
                  <div style={{
                    width: '100px',
                    height: '100px',
                    background: 'linear-gradient(135deg, #7f9cf5 0%, #00ffe7 100%)',
                    borderRadius: '16px',
                    boxShadow: '0 8px 24px rgba(127,156,245,0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 16px auto',
                    animation: 'aiEnginePulse 3s ease-in-out infinite, spin-slow 8s linear infinite'
                  }}>
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" style={{
                      animation: 'aiEngineGlow 2s ease-in-out infinite alternate'
                    }}>
                      <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.23 3 3 0 0 1-.34-5.58l.34-.03a2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"/>
                      <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.23 3 3 0 0 0 .34-5.58l-.34-.03a2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"/>
                    </svg>
                  </div>
                  <h4 style={{
                    fontSize: '20px',
                    fontWeight: '700',
                    color: '#1a1a1a',
                    marginBottom: '6px'
                  }}>
                    AI Engine
                  </h4>
                  <div style={{
                    fontSize: '15px',
                    color: '#666',
                    lineHeight: '1.5'
                  }}>
                    <div>• Analysis</div>
                    <div>• Optimization</div>
                    <div>• Predictions</div>
                  </div>
                </div>
                
                {/* ARROW 2 - УЛУЧШЕННАЯ АНИМАЦИЯ */}
                <div style={{
                  margin: '0 32px',
                  position: 'relative'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center'
                  }}>
                    <div style={{
                      width: '60px',
                      height: '2px',
                      background: 'linear-gradient(90deg, #00ffe7, rgba(0,255,231,0.3))',
                      position: 'relative',
                      overflow: 'hidden',
                      borderRadius: '1px'
                    }}>
                      <div style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)',
                        width: '20px',
                        animation: 'dataFlow 2s ease-in-out infinite'
                      }}></div>
                    </div>
                    <div style={{
                      width: '0',
                      height: '0',
                      borderLeft: '8px solid #00ffe7',
                      borderTop: '5px solid transparent',
                      borderBottom: '5px solid transparent',
                      marginLeft: '2px',
                      animation: 'pulse 3s infinite'
                    }}></div>
                  </div>
                  <div style={{
                    fontSize: '11px',
                    color: '#00ffe7',
                    marginTop: '6px',
                    fontWeight: '500',
                    opacity: 0.8
                  }}>
                    Optimizing...
                  </div>
                  {/* Одна движущаяся точка данных */}
                  <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '0',
                    width: '6px',
                    height: '6px',
                    background: '#00ffe7',
                    borderRadius: '50%',
                    animation: 'dataFlow 2s ease-in-out infinite',
                    boxShadow: '0 0 8px rgba(0,255,231,0.4)'
                  }}></div>
                </div>
                
                {/* OUTPUT */}
                <div style={{
                  textAlign: 'center',
                  flex: 1
                }}>
                  <div style={{
                    width: '80px',
                    height: '80px',
                    background: 'white',
                    borderRadius: '16px',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 16px auto',
                    animation: 'pulse 2s infinite'
                  }}>
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#00ffe7" strokeWidth="2" style={{
                      animation: 'pulse 2s infinite'
                    }}>
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                      <polyline points="22,4 12,14.01 9,11.01"/>
                    </svg>
                  </div>
                  <h4 style={{
                    fontSize: '20px',
                    fontWeight: '700',
                    color: '#1a1a1a',
                    marginBottom: '6px'
                  }}>
                    Smart Results
                  </h4>
                  <div style={{
                    fontSize: '15px',
                    color: '#666',
                    lineHeight: '1.5'
                  }}>
                    <div>• Issues detected</div>
                    <div>• Costs optimized</div>
                    <div>• Future predicted</div>
                  </div>
                </div>
              </div>
              
              {/* METRICS BAR - УЛУЧШЕННЫЕ АНИМИРОВАННЫЕ СЧЕТЧИКИ */}
              <div style={{
                background: '#1a1a1a',
                borderRadius: '16px',
                padding: '32px 24px',
                boxShadow: '0 8px 32px rgba(0,0,0,0.15), 0 4px 16px rgba(127,156,245,0.1)',
                border: '1px solid rgba(127,156,245,0.2)'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  textAlign: 'center',
                  gap: '20px'
                }}>
                  <div style={{
                    flex: 1,
                    animation: 'fadeInUp 1s ease-out'
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      marginBottom: '8px'
                    }}>
                      <div style={{
                        width: '24px',
                        height: '24px',
                        background: 'linear-gradient(135deg, #7F9CF5, #667eea)',
                        borderRadius: '6px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                          <circle cx="12" cy="12" r="10"/>
                          <polyline points="12,6 12,12 16,14"/>
                        </svg>
                    </div>
                    <div style={{
                        animation: 'countUp 1.5s ease-out'
                      }}>
                        <AnimatedCounter endValue={85} suffix="%" delay={800} />
                      </div>
                    </div>
                    <div style={{
                      fontSize: '15px',
                      color: 'white',
                      fontWeight: '600',
                      marginBottom: '4px'
                    }}>
                      Faster Detection
                    </div>

                  </div>
                  
                  <div style={{
                    width: '1px',
                    height: '60px',
                    background: 'linear-gradient(180deg, transparent, rgba(127,156,245,0.2), transparent)'
                  }}></div>
                  
                  <div style={{
                    flex: 1,
                    animation: 'fadeInUp 1s ease-out',
                    animationDelay: '0.2s'
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      marginBottom: '8px'
                    }}>
                      <div style={{
                        width: '24px',
                        height: '24px',
                        background: 'linear-gradient(135deg, #00FFE7, #00d4aa)',
                        borderRadius: '6px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                          <path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                        </svg>
                      </div>
                      <div style={{
                        animation: 'countUp 1.5s ease-out',
                      animationDelay: '0.2s'
                    }}>
                        <AnimatedCurrencyCounter endValue={1.30} delay={1000} />
                      </div>
                    </div>
                    <div style={{
                      fontSize: '15px',
                      color: 'white',
                      fontWeight: '600',
                      marginBottom: '4px'
                    }}>
                      Saved Per Click
                    </div>

                  </div>
                  
                  <div style={{
                    width: '1px',
                    height: '60px',
                    background: 'linear-gradient(180deg, transparent, rgba(0,255,231,0.2), transparent)'
                  }}></div>
                  
                  <div style={{
                    flex: 1,
                    animation: 'fadeInUp 1s ease-out',
                    animationDelay: '0.4s'
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      marginBottom: '8px'
                    }}>
                      <div style={{
                        width: '24px',
                        height: '24px',
                        background: 'linear-gradient(135deg, #00BFAE, #00A896)',
                        borderRadius: '6px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                          <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.23 3 3 0 0 1-.34-5.58l.34-.03a2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"/>
                          <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.23 3 3 0 0 0 .34-5.58l-.34-.03a2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"/>
                        </svg>
                      </div>
                      <div style={{
                        animation: 'countUp 1.5s ease-out',
                      animationDelay: '0.4s'
                    }}>
                        <AnimatedCounter endValue={87} suffix="%" delay={1200} />
                      </div>
                    </div>
                    <div style={{
                      fontSize: '15px',
                      color: 'white',
                      fontWeight: '600',
                      marginBottom: '4px'
                    }}>
                      Prediction Accuracy
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '40px',
            marginBottom: '80px',
            alignItems: 'stretch'
          }}>
            {/* Feature 1: AI-Powered Analysis */}
            <div style={{
              background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
              borderRadius: '20px',
              padding: '40px',
              border: '1px solid rgba(127,156,245,0.1)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.08), 0 4px 16px rgba(127,156,245,0.05)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              position: 'relative',
              overflow: 'hidden',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column'
            }}
            onMouseEnter={(e) => {
              const target = e.target as HTMLElement;
              target.style.transform = 'translateY(-4px) scale(1.02)';
              target.style.boxShadow = '0 20px 40px rgba(127,156,245,0.12), 0 8px 24px rgba(0,0,0,0.1)';
              target.style.borderColor = 'rgba(127,156,245,0.2)';
            }}
            onMouseLeave={(e) => {
              const target = e.target as HTMLElement;
              target.style.transform = 'translateY(0) scale(1)';
              target.style.boxShadow = '0 8px 32px rgba(0,0,0,0.08), 0 4px 16px rgba(127,156,245,0.05)';
              target.style.borderColor = 'rgba(127,156,245,0.1)';
            }}>
              {/* Subtle background pattern */}
              <div style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: '100px',
                height: '100px',
                background: 'radial-gradient(circle, rgba(127,156,245,0.03) 0%, transparent 70%)',
                borderRadius: '50%',
                transform: 'translate(30px, -30px)',
                pointerEvents: 'none'
              }}></div>
              
              <div style={{
                width: '60px',
                height: '60px',
                background: 'linear-gradient(135deg, #00BFAE, #00A896)',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '24px',
                boxShadow: '0 8px 24px rgba(0,191,174,0.2)',
                transition: 'all 0.3s ease'
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
                marginBottom: '16px',
                whiteSpace: 'nowrap'
              }}>
                AI-Powered Analysis
              </h3>
              <p style={{
                fontSize: '16px',
                color: '#666',
                lineHeight: '1.6',
                marginBottom: '24px',
                minHeight: '140px'
              }}>
                Our advanced AI analyzes your campaigns in real-time, identifying performance patterns, detecting anomalies, and uncovering hidden opportunities that traditional analysis might miss.
              </p>
              <div style={{
                marginBottom: '24px'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  marginBottom: '12px',
                  fontSize: '15px',
                  color: '#1a1a1a',
                  fontWeight: '500'
                }}>
                  <div style={{
                    width: '8px',
                    height: '8px',
                    background: '#00BFAE',
                    borderRadius: '50%',
                    flexShrink: 0
                  }}></div>
                  <span>Real-time performance monitoring & alerts</span>
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  marginBottom: '12px',
                  fontSize: '15px',
                  color: '#1a1a1a',
                  fontWeight: '500'
                }}>
                  <div style={{
                    width: '8px',
                    height: '8px',
                    background: '#00BFAE',
                    borderRadius: '50%',
                    flexShrink: 0
                  }}></div>
                  <span>Anomaly detection & alerts</span>
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  fontSize: '15px',
                  color: '#1a1a1a',
                  fontWeight: '500'
                }}>
                  <div style={{
                    width: '8px',
                    height: '8px',
                    background: '#00BFAE',
                    borderRadius: '50%',
                    flexShrink: 0
                  }}></div>
                  <span>Hidden opportunity identification</span>
                </div>
              </div>
              <button style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '15px',
                color: '#00BFAE',
                fontWeight: '600',
                background: 'transparent',
                cursor: 'pointer',
                padding: '12px 20px',
                borderRadius: '10px',
                transition: 'all 0.3s ease',
                border: '1px solid rgba(0,191,174,0.2)',
                marginTop: 'auto'
              }}
              onMouseEnter={(e) => {
                const target = e.target as HTMLElement;
                target.style.background = 'rgba(0,191,174,0.05)';
                target.style.borderColor = 'rgba(0,191,174,0.3)';
                target.style.transform = 'translateX(4px)';
              }}
              onMouseLeave={(e) => {
                const target = e.target as HTMLElement;
                target.style.background = 'transparent';
                target.style.borderColor = 'rgba(0,191,174,0.2)';
                target.style.transform = 'translateX(0)';
              }}>
                <span>Learn more</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{
                  transition: 'transform 0.3s ease'
                }}>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12,5 19,12 12,19"></polyline>
                </svg>
              </button>
            </div>

            {/* Feature 2: Automated Optimization */}
            <div style={{
              background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
              borderRadius: '20px',
              padding: '40px',
              border: '1px solid rgba(255,107,107,0.1)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.08), 0 4px 16px rgba(255,107,107,0.05)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              position: 'relative',
              overflow: 'hidden',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column'
            }}
            onMouseEnter={(e) => {
              const target = e.target as HTMLElement;
              target.style.transform = 'translateY(-4px) scale(1.02)';
              target.style.boxShadow = '0 20px 40px rgba(255,107,107,0.12), 0 8px 24px rgba(0,0,0,0.1)';
              target.style.borderColor = 'rgba(255,107,107,0.2)';
            }}
            onMouseLeave={(e) => {
              const target = e.target as HTMLElement;
              target.style.transform = 'translateY(0) scale(1)';
              target.style.boxShadow = '0 8px 32px rgba(0,0,0,0.08), 0 4px 16px rgba(255,107,107,0.05)';
              target.style.borderColor = 'rgba(255,107,107,0.1)';
            }}>
              {/* Subtle background pattern */}
              <div style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: '100px',
                height: '100px',
                background: 'radial-gradient(circle, rgba(255,107,107,0.03) 0%, transparent 70%)',
                borderRadius: '50%',
                transform: 'translate(30px, -30px)',
                pointerEvents: 'none'
              }}></div>
              
              <div style={{
                width: '60px',
                height: '60px',
                background: 'linear-gradient(135deg, #FF6B6B, #FF8E8E)',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '24px',
                boxShadow: '0 8px 24px rgba(255,107,107,0.2)',
                transition: 'all 0.3s ease'
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
                marginBottom: '16px',
                whiteSpace: 'nowrap'
              }}>
                Automated Optimization
              </h3>
              <p style={{
                fontSize: '16px',
                color: '#666',
                lineHeight: '1.6',
                marginBottom: '24px',
                minHeight: '140px'
              }}>
                Set your goals and watch our AI work 24/7. Automatically adjust bids, pause underperforming keywords, and optimize ad copy - all based on real-time performance data.
              </p>
              <div style={{
                marginBottom: '24px'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  marginBottom: '12px',
                  fontSize: '15px',
                  color: '#1a1a1a',
                  fontWeight: '500'
                }}>
                  <div style={{
                    width: '8px',
                    height: '8px',
                    background: '#FF6B6B',
                    borderRadius: '50%',
                    flexShrink: 0
                  }}></div>
                  <span>Smart bid adjustments for maximum ROI</span>
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  marginBottom: '12px',
                  fontSize: '15px',
                  color: '#1a1a1a',
                  fontWeight: '500'
                }}>
                  <div style={{
                    width: '8px',
                    height: '8px',
                    background: '#FF6B6B',
                    borderRadius: '50%',
                    flexShrink: 0
                  }}></div>
                  <span>Keyword performance management</span>
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  fontSize: '15px',
                  color: '#1a1a1a',
                  fontWeight: '500'
                }}>
                  <div style={{
                    width: '8px',
                    height: '8px',
                    background: '#FF6B6B',
                    borderRadius: '50%',
                    flexShrink: 0
                  }}></div>
                  <span>Ad copy optimization</span>
                </div>
              </div>
              <button style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '15px',
                color: '#FF6B6B',
                fontWeight: '600',
                background: 'transparent',
                cursor: 'pointer',
                padding: '12px 20px',
                borderRadius: '10px',
                transition: 'all 0.3s ease',
                border: '1px solid rgba(255,107,107,0.2)',
                marginTop: 'auto'
              }}
              onMouseEnter={(e) => {
                const target = e.target as HTMLElement;
                target.style.background = 'rgba(255,107,107,0.05)';
                target.style.borderColor = 'rgba(255,107,107,0.3)';
                target.style.transform = 'translateX(4px)';
              }}
              onMouseLeave={(e) => {
                const target = e.target as HTMLElement;
                target.style.background = 'transparent';
                target.style.borderColor = 'rgba(255,107,107,0.2)';
                target.style.transform = 'translateX(0)';
              }}>
                <span>Learn more</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{
                  transition: 'transform 0.3s ease'
                }}>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12,5 19,12 12,19"></polyline>
                </svg>
              </button>
            </div>

            {/* Feature 3: Predictive Insights */}
            <div style={{
              background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
              borderRadius: '20px',
              padding: '40px',
              border: '1px solid rgba(139,92,246,0.1)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.08), 0 4px 16px rgba(139,92,246,0.05)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              position: 'relative',
              overflow: 'hidden',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column'
            }}
            onMouseEnter={(e) => {
              const target = e.target as HTMLElement;
              target.style.transform = 'translateY(-4px) scale(1.02)';
              target.style.boxShadow = '0 20px 40px rgba(139,92,246,0.12), 0 8px 24px rgba(0,0,0,0.1)';
              target.style.borderColor = 'rgba(139,92,246,0.2)';
            }}
            onMouseLeave={(e) => {
              const target = e.target as HTMLElement;
              target.style.transform = 'translateY(0) scale(1)';
              target.style.boxShadow = '0 8px 32px rgba(0,0,0,0.08), 0 4px 16px rgba(139,92,246,0.05)';
              target.style.borderColor = 'rgba(139,92,246,0.1)';
            }}>
              {/* Subtle background pattern */}
              <div style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: '100px',
                height: '100px',
                background: 'radial-gradient(circle, rgba(139,92,246,0.03) 0%, transparent 70%)',
                borderRadius: '50%',
                transform: 'translate(30px, -30px)',
                pointerEvents: 'none'
              }}></div>
              
              <div style={{
                width: '60px',
                height: '60px',
                background: 'linear-gradient(135deg, #00BFAE, #00D4AA)',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '24px',
                boxShadow: '0 8px 24px rgba(0,191,174,0.2)',
                transition: 'all 0.3s ease'
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
                marginBottom: '16px',
                whiteSpace: 'nowrap'
              }}>
                Predictive Insights
              </h3>
              <p style={{
                fontSize: '16px',
                color: '#666',
                lineHeight: '1.6',
                marginBottom: '24px',
                minHeight: '140px'
              }}>
                Stay ahead of the competition with predictive analytics. Our AI forecasts campaign performance up to 30 days ahead, identifies seasonal trends, and recommends proactive strategies before your competitors catch on.
              </p>
              <div style={{
                marginBottom: '24px'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  marginBottom: '12px',
                  fontSize: '15px',
                  color: '#1a1a1a',
                  fontWeight: '500'
                }}>
                  <div style={{
                    width: '8px',
                    height: '8px',
                    background: '#00BFAE',
                    borderRadius: '50%',
                    flexShrink: 0
                  }}></div>
                  <span>Performance forecasting</span>
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  marginBottom: '12px',
                  fontSize: '15px',
                  color: '#1a1a1a',
                  fontWeight: '500'
                }}>
                  <div style={{
                    width: '8px',
                    height: '8px',
                    background: '#00BFAE',
                    borderRadius: '50%',
                    flexShrink: 0
                  }}></div>
                  <span>Seasonal trend analysis</span>
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  fontSize: '15px',
                  color: '#1a1a1a',
                  fontWeight: '500'
                }}>
                  <div style={{
                    width: '8px',
                    height: '8px',
                    background: '#00BFAE',
                    borderRadius: '50%',
                    flexShrink: 0
                  }}></div>
                  <span>Proactive strategy recommendations</span>
                </div>
              </div>
              <button style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '15px',
                color: '#00BFAE',
                fontWeight: '600',
                background: 'transparent',
                cursor: 'pointer',
                padding: '12px 20px',
                borderRadius: '10px',
                transition: 'all 0.3s ease',
                border: '1px solid rgba(0,191,174,0.2)',
                marginTop: 'auto'
              }}
              onMouseEnter={(e) => {
                const target = e.target as HTMLElement;
                target.style.background = 'rgba(0,191,174,0.05)';
                target.style.borderColor = 'rgba(0,191,174,0.3)';
                target.style.transform = 'translateX(4px)';
              }}
              onMouseLeave={(e) => {
                const target = e.target as HTMLElement;
                target.style.background = 'transparent';
                target.style.borderColor = 'rgba(0,191,174,0.2)';
                target.style.transform = 'translateX(0)';
              }}>
                <span>Learn more</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{
                  transition: 'transform 0.3s ease'
                }}>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12,5 19,12 12,19"></polyline>
                </svg>
              </button>
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
            alignItems: 'center',
            position: 'relative',
            marginTop: '-60px'
          }}>
            <AIAnalyticsDashboard />
          </div>
        </div>
      </section>

      {/* === ВАРІАНТ 1: Professional Code Editor === */}






      {/* Interactive FAQ Section */}
      <section style={{
        padding: '120px 0',
        background: 'linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)',
        position: 'relative'
      }}>
        <div style={{
          maxWidth: '1000px',
          margin: '0 auto',
          padding: '0 24px'
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
              Frequently Asked Questions
            </h2>
            <p style={{
              fontSize: 'clamp(16px, 2vw, 18px)',
              color: '#666',
              maxWidth: '600px',
              margin: '0 auto',
              lineHeight: '1.6'
            }}>
              Everything you need to know about Kampaio
            </p>
          </div>

          {/* Interactive FAQ Items */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}>
            {/* FAQ Item 1 */}
            <div style={{
              background: 'white',
              borderRadius: '16px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
              border: '1px solid #f3f4f6',
              overflow: 'hidden',
              transition: 'all 0.3s ease',
              cursor: 'pointer'
            }} onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
            }} onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)';
            }} onClick={() => handleFAQClick(1)}>
              <div style={{
                padding: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                transition: 'background-color 0.3s ease'
              }} onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#f9fafb';
              }} onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px'
                }}>
                  <div id="faq-icon-1" style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '8px',
                    backgroundColor: openQuestion === 1 ? '#00FFE7' : '#E5E7EB',
                    color: openQuestion === 1 ? '#1A1A1A' : '#6B7280',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '18px',
                    fontWeight: 'bold',
                    transition: 'all 0.3s ease'
                  }}>
                    {openQuestion === 1 ? '−' : '+'}
                  </div>
                  <h3 style={{
                    fontSize: '18px',
                    fontWeight: '600',
                    color: '#1a1a1a',
                    margin: 0
                  }}>
                    What is Kampaio?
                  </h3>
                </div>
                
                <svg 
                  style={{
                    width: '20px',
                    height: '20px',
                    color: '#9ca3af',
                    transition: 'transform 0.3s ease'
                  }}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              
              {/* Animated Answer */}
              <div id="faq-answer-1" style={{
                maxHeight: openQuestion === 1 ? '200px' : '0px',
                opacity: openQuestion === 1 ? '1' : '0',
                overflow: 'hidden',
                transition: 'all 0.3s ease-in-out'
              }}>
                <div style={{
                  padding: '0 24px 24px 24px'
                }}>
                  <div style={{
                    paddingLeft: '56px',
                    borderLeft: '4px solid #00FFE7',
                    paddingTop: '16px',
                    paddingBottom: '16px'
                  }}>
                    <p style={{
                      color: '#666',
                      lineHeight: '1.6',
                      margin: '0 0 16px 0'
                    }}>
                      Kampaio is an AI assistant for Google Ads that analyzes your campaigns, generates reports, and suggests data-driven strategies and improvements.
                    </p>
                    
                    {/* Action Buttons */}
                    <div style={{
                      display: 'flex',
                      gap: '12px'
                    }}>
                      <button id="faq-button-1" style={{
                        padding: '8px 16px',
                        fontSize: '14px',
                        fontWeight: '500',
                        color: openQuestion === 1 ? '#1A1A1A' : '#6B7280',
                        background: openQuestion === 1 ? 'linear-gradient(45deg, #00FFE7, #00BFAE)' : '#E5E7EB',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        boxShadow: openQuestion === 1 ? '0 4px 12px rgba(0, 255, 231, 0.2)' : 'none'
                      }}>
                        Get Started
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ Item 2 */}
            <div style={{
              background: 'white',
              borderRadius: '16px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
              border: '1px solid #f3f4f6',
              overflow: 'hidden',
              transition: 'all 0.3s ease',
              cursor: 'pointer'
            }} onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
            }} onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)';
            }} onClick={() => handleFAQClick(2)}>
              <div style={{
                padding: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                transition: 'background-color 0.3s ease'
              }} onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#f9fafb';
              }} onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px'
                }}>
                  <div id="faq-icon-2" style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '8px',
                    backgroundColor: openQuestion === 2 ? '#00FFE7' : '#E5E7EB',
                    color: openQuestion === 2 ? '#1A1A1A' : '#6B7280',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '18px',
                    fontWeight: 'bold',
                    transition: 'all 0.3s ease'
                  }}>
                    {openQuestion === 2 ? '−' : '+'}
                  </div>
                  <h3 style={{
                    fontSize: '18px',
                    fontWeight: '600',
                    color: '#1a1a1a',
                    margin: 0
                  }}>
                    How is Kampaio different from other tools?
                  </h3>
                </div>
                
                <svg 
                  style={{
                    width: '20px',
                    height: '20px',
                    color: '#9ca3af',
                    transition: 'transform 0.3s ease'
                  }}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              
              {/* Animated Answer */}
              <div id="faq-answer-2" style={{
                maxHeight: openQuestion === 2 ? '200px' : '0px',
                opacity: openQuestion === 2 ? '1' : '0',
                overflow: 'hidden',
                transition: 'all 0.3s ease-in-out'
              }}>
                <div style={{
                  padding: '0 24px 24px 24px'
                }}>
                  <div style={{
                    paddingLeft: '56px',
                    borderLeft: '4px solid #00FFE7',
                    paddingTop: '16px',
                    paddingBottom: '16px'
                  }}>
                    <p style={{
                      color: '#666',
                      lineHeight: '1.6',
                      margin: '0 0 16px 0'
                    }}>
                      Unlike generic tools, Kampaio combines GPT-4, Google Ads API, and RAG to deliver precise, personalized recommendations — not just templates.
                    </p>
                    
                    {/* Action Buttons */}
                    <div style={{
                      display: 'flex',
                      gap: '12px'
                    }}>
                      <button id="faq-button-2" style={{
                        padding: '8px 16px',
                        fontSize: '14px',
                        fontWeight: '500',
                        color: openQuestion === 2 ? '#1A1A1A' : '#6B7280',
                        background: openQuestion === 2 ? 'linear-gradient(45deg, #00FFE7, #00BFAE)' : '#E5E7EB',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        boxShadow: openQuestion === 2 ? '0 4px 12px rgba(0, 255, 231, 0.2)' : 'none'
                      }}>
                        Get Started
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ Item 3 */}
            <div style={{
              background: 'white',
              borderRadius: '16px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
              border: '1px solid #f3f4f6',
              overflow: 'hidden',
              transition: 'all 0.3s ease',
              cursor: 'pointer'
            }} onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
            }} onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)';
            }} onClick={() => handleFAQClick(3)}>
              <div style={{
                padding: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                transition: 'background-color 0.3s ease'
              }} onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#f9fafb';
              }} onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px'
                }}>
                  <div id="faq-icon-3" style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '8px',
                    backgroundColor: openQuestion === 3 ? '#00FFE7' : '#E5E7EB',
                    color: openQuestion === 3 ? '#1A1A1A' : '#6B7280',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '18px',
                    fontWeight: 'bold',
                    transition: 'all 0.3s ease'
                  }}>
                    {openQuestion === 3 ? '−' : '+'}
                  </div>
                  <h3 style={{
                    fontSize: '18px',
                    fontWeight: '600',
                    color: '#1a1a1a',
                    margin: 0
                  }}>
                    Do I need to give access to my Google Ads account?
                  </h3>
                </div>
                
                <svg 
                  style={{
                    width: '20px',
                    height: '20px',
                    color: '#9ca3af',
                    transition: 'transform 0.3s ease'
                  }}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              
              {/* Animated Answer */}
              <div id="faq-answer-3" style={{
                maxHeight: openQuestion === 3 ? '200px' : '0px',
                opacity: openQuestion === 3 ? '1' : '0',
                overflow: 'hidden',
                transition: 'all 0.3s ease-in-out'
              }}>
                <div style={{
                  padding: '0 24px 24px 24px'
                }}>
                  <div style={{
                    paddingLeft: '56px',
                    borderLeft: '4px solid #00FFE7',
                    paddingTop: '16px',
                    paddingBottom: '16px'
                  }}>
                                         <p style={{
                       color: '#666',
                       lineHeight: '1.6',
                       margin: '0 0 16px 0'
                     }}>
                       Yes, but only read-only access. You stay in full control. Kampaio never makes automatic changes unless you explicitly approve them.
                     </p>
                    
                    {/* Action Buttons */}
                    <div style={{
                      display: 'flex',
                      gap: '12px'
                    }}>
                      <button id="faq-button-3" style={{
                        padding: '8px 16px',
                        fontSize: '14px',
                        fontWeight: '500',
                        color: openQuestion === 3 ? '#1A1A1A' : '#6B7280',
                        background: openQuestion === 3 ? 'linear-gradient(45deg, #00FFE7, #00BFAE)' : '#E5E7EB',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        boxShadow: openQuestion === 3 ? '0 4px 12px rgba(0, 255, 231, 0.2)' : 'none'
                      }}>
                        Get Started
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ Item 4 */}
            <div style={{
              background: 'white',
              borderRadius: '16px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
              border: '1px solid #f3f4f6',
              overflow: 'hidden',
              transition: 'all 0.3s ease',
              cursor: 'pointer'
            }} onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
            }} onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)';
            }} onClick={() => handleFAQClick(4)}>
              <div style={{
                padding: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                transition: 'background-color 0.3s ease'
              }} onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#f9fafb';
              }} onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px'
                }}>
                  <div id="faq-icon-4" style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '8px',
                    backgroundColor: openQuestion === 4 ? '#00FFE7' : '#E5E7EB',
                    color: openQuestion === 4 ? '#1A1A1A' : '#6B7280',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '18px',
                    fontWeight: 'bold',
                    transition: 'all 0.3s ease'
                  }}>
                    {openQuestion === 4 ? '−' : '+'}
                  </div>
                                     <h3 style={{
                     fontSize: '18px',
                     fontWeight: '600',
                     color: '#1a1a1a',
                     margin: 0
                   }}>
                     Can I try it for free?
                   </h3>
                </div>
                
                <svg 
                  style={{
                    width: '20px',
                    height: '20px',
                    color: '#9ca3af',
                    transition: 'transform 0.3s ease'
                  }}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              
              {/* Animated Answer */}
              <div id="faq-answer-4" style={{
                maxHeight: openQuestion === 4 ? '200px' : '0px',
                opacity: openQuestion === 4 ? '1' : '0',
                overflow: 'hidden',
                transition: 'all 0.3s ease-in-out'
              }}>
                <div style={{
                  padding: '0 24px 24px 24px'
                }}>
                  <div style={{
                    paddingLeft: '56px',
                    borderLeft: '4px solid #00FFE7',
                    paddingTop: '16px',
                    paddingBottom: '16px'
                  }}>
                                         <p style={{
                       color: '#666',
                       lineHeight: '1.6',
                       margin: '0 0 16px 0'
                     }}>
                       Yes! You get a 7-day free trial, no credit card required. Try Kampaio on your own ad campaigns and see the results yourself.
                     </p>
                    
                    {/* Action Buttons */}
                    <div style={{
                      display: 'flex',
                      gap: '12px'
                    }}>
                      <button id="faq-button-4" style={{
                        padding: '8px 16px',
                        fontSize: '14px',
                        fontWeight: '500',
                        color: openQuestion === 4 ? '#1A1A1A' : '#6B7280',
                        background: openQuestion === 4 ? 'linear-gradient(45deg, #00FFE7, #00BFAE)' : '#E5E7EB',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        boxShadow: openQuestion === 4 ? '0 4px 12px rgba(0, 255, 231, 0.2)' : 'none'
                      }}>
                        Get Started
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ Item 5 */}
            <div style={{
              background: 'white',
              borderRadius: '16px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
              border: '1px solid #f3f4f6',
              overflow: 'hidden',
              transition: 'all 0.3s ease',
              cursor: 'pointer'
            }} onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
            }} onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)';
            }} onClick={() => handleFAQClick(5)}>
              <div style={{
                padding: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                transition: 'background-color 0.3s ease'
              }} onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#f9fafb';
              }} onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px'
                }}>
                  <div id="faq-icon-5" style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '8px',
                    backgroundColor: openQuestion === 5 ? '#00FFE7' : '#E5E7EB',
                    color: openQuestion === 5 ? '#1A1A1A' : '#6B7280',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '18px',
                    fontWeight: 'bold',
                    transition: 'all 0.3s ease'
                  }}>
                    {openQuestion === 5 ? '−' : '+'}
                  </div>
                                     <h3 style={{
                     fontSize: '18px',
                     fontWeight: '600',
                     color: '#1a1a1a',
                     margin: 0
                   }}>
                     Is my Google Ads data secure?
                   </h3>
                </div>
                
                <svg 
                  style={{
                    width: '20px',
                    height: '20px',
                    color: '#9ca3af',
                    transition: 'transform 0.3s ease'
                  }}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              
              {/* Animated Answer */}
              <div id="faq-answer-5" style={{
                maxHeight: openQuestion === 5 ? '200px' : '0px',
                opacity: openQuestion === 5 ? '1' : '0',
                overflow: 'hidden',
                transition: 'all 0.3s ease-in-out'
              }}>
                <div style={{
                  padding: '0 24px 24px 24px'
                }}>
                  <div style={{
                    paddingLeft: '56px',
                    borderLeft: '4px solid #00FFE7',
                    paddingTop: '16px',
                    paddingBottom: '16px'
                  }}>
                                         <p style={{
                       color: '#666',
                       lineHeight: '1.6',
                       margin: '0 0 16px 0'
                     }}>
                       Yes, your data is completely secure. We use bank-level 256-bit SSL encryption, are SOC 2 Type II compliant, and follow GDPR regulations. We never share your data with third parties and only access what's necessary to optimize your campaigns.
                     </p>
                    
                    {/* Action Buttons */}
                    <div style={{
                      display: 'flex',
                      gap: '12px'
                    }}>
                      <button id="faq-button-5" style={{
                        padding: '8px 16px',
                        fontSize: '14px',
                        fontWeight: '500',
                        color: openQuestion === 5 ? '#1A1A1A' : '#6B7280',
                        background: openQuestion === 5 ? 'linear-gradient(45deg, #00FFE7, #00BFAE)' : '#E5E7EB',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        boxShadow: openQuestion === 5 ? '0 4px 12px rgba(0, 255, 231, 0.2)' : 'none'
                      }}>
                        Get Started
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ Item 6 */}
            <div style={{
              background: 'white',
              borderRadius: '16px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
              border: '1px solid #f3f4f6',
              overflow: 'hidden',
              transition: 'all 0.3s ease',
              cursor: 'pointer'
            }} onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
            }} onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)';
            }} onClick={() => handleFAQClick(6)}>
              <div style={{
                padding: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                transition: 'background-color 0.3s ease'
              }} onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#f9fafb';
              }} onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px'
                }}>
                  <div id="faq-icon-6" style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '8px',
                    backgroundColor: openQuestion === 6 ? '#00FFE7' : '#E5E7EB',
                    color: openQuestion === 6 ? '#1A1A1A' : '#6B7280',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '18px',
                    fontWeight: 'bold',
                    transition: 'all 0.3s ease'
                  }}>
                    {openQuestion === 6 ? '−' : '+'}
                  </div>
                  <h3 style={{
                    fontSize: '18px',
                    fontWeight: '600',
                    color: '#1a1a1a',
                    margin: 0
                  }}>
                    Is it difficult to set up and get started?
                  </h3>
                </div>
                
                <svg 
                  style={{
                    width: '20px',
                    height: '20px',
                    color: '#9ca3af',
                    transition: 'transform 0.3s ease'
                  }}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              
              {/* Animated Answer */}
              <div id="faq-answer-6" style={{
                maxHeight: openQuestion === 6 ? '200px' : '0px',
                opacity: openQuestion === 6 ? '1' : '0',
                overflow: 'hidden',
                transition: 'all 0.3s ease-in-out'
              }}>
                <div style={{
                  padding: '0 24px 24px 24px'
                }}>
                  <div style={{
                    paddingLeft: '56px',
                    borderLeft: '4px solid #00FFE7',
                    paddingTop: '16px',
                    paddingBottom: '16px'
                  }}>
                    <p style={{
                      color: '#666',
                      lineHeight: '1.6',
                      margin: '0 0 16px 0'
                    }}>
                      Not at all. Setup takes about 5 minutes - just connect your Google Ads account and we'll do the rest. We provide pre-built templates for your industry and step-by-step guides to get you started quickly.
                    </p>
                    
                    {/* Action Buttons */}
                    <div style={{
                      display: 'flex',
                      gap: '12px'
                    }}>
                      <button id="faq-button-6" style={{
                        padding: '8px 16px',
                        fontSize: '14px',
                        fontWeight: '500',
                        color: openQuestion === 6 ? '#1A1A1A' : '#6B7280',
                        background: openQuestion === 6 ? 'linear-gradient(45deg, #00FFE7, #00BFAE)' : '#E5E7EB',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        boxShadow: openQuestion === 6 ? '0 4px 12px rgba(0, 255, 231, 0.2)' : 'none'
                      }}>
                        Get Started
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pre-Footer CTA Block */}
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '40px 20px',
        textAlign: 'center',
        color: 'white'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: '700',
            marginBottom: '16px',
            color: 'white'
          }}>
            Tired of wasting money on Google Ads?
          </h2>
          <p style={{
            fontSize: 'clamp(1rem, 2vw, 1.25rem)',
            marginBottom: '24px',
            opacity: '0.9',
            maxWidth: '800px',
            margin: '0 auto 24px auto',
            lineHeight: '1.6'
          }}>
            Stop guessing and start winning. Our AI identifies exactly where your budget is bleeding and shows you how to fix it in minutes.
          </p>
          <div style={{
            display: 'flex',
            gap: '16px',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <a href="https://replit.com/signup" style={{
              padding: '12px 24px',
              borderRadius: '8px',
              background: 'linear-gradient(45deg, #00FFE7, #00BFAE)',
              color: '#1A1A1A',
              textDecoration: 'none',
              fontWeight: '500',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 12px rgba(0, 255, 231, 0.2)',
              display: 'inline-block'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 255, 231, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 255, 231, 0.2)';
            }}>
              Find My Leaks
            </a>
          </div>
        </div>
      </div>





      {/* G2 Grid Section */}
      <section style={{
        padding: '80px 20px',
        background: 'white'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: '0rem',
            alignItems: 'center'
          }}>
            {/* Left side - Text content */}
            <div style={{
              gridColumn: 'span 6',
              paddingRight: '40px'
            }}>
              <div style={{
                color: '#1a1a1a'
              }}>
                <h2 style={{
                  fontSize: 'clamp(2rem, 4vw, 3rem)',
                  fontWeight: '700',
                  marginBottom: '16px',
                  lineHeight: '1.2'
                }}>
                  <span style={{
                    background: 'linear-gradient(135deg, #00FFE7, #00BFAE)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}>Works </span>
                  <span>with Your Tools, Optimizes for Your Industry</span>
                </h2>
              </div>
              <div style={{
                marginBottom: '16px'
              }}></div>
              <div style={{
                fontSize: 'clamp(1.125rem, 2vw, 1.25rem)',
                color: '#666',
                marginBottom: '40px',
                lineHeight: '1.6'
              }}>
                <p>From dentists to SaaS companies - get AI-powered Google Ads optimization that integrates with your existing workflow and understands your business</p>
              </div>
              
              {/* Badges grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '16px',
                marginBottom: '40px'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <div style={{
                    width: '20px',
                    height: '20px'
                  }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      {/* Стилизованная башня - Enterprise */}
                      <path d="M12 2L8 6v4h2v8h4v-8h2V6l-4-4z" fill="#3E57DA"/>
                      <rect x="10" y="14" width="4" height="2" fill="#3E57DA"/>
                    </svg>
                  </div>
                  <p style={{
                    fontSize: '16px',
                    fontWeight: '500',
                    color: '#1a1a1a',
                    margin: 0
                  }}>Dentists</p>
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <div style={{
                    width: '20px',
                    height: '20px'
                  }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      {/* Волновая линия - Mid-Market */}
                      <path d="M3 12c2-4 4-6 6-6s4 2 6 6 4 6 6 6" stroke="#3E57DA" strokeWidth="2" fill="none" strokeLinecap="round"/>
                      <circle cx="12" cy="12" r="2" fill="#3E57DA"/>
                    </svg>
                  </div>
                  <p style={{
                    fontSize: '16px',
                    fontWeight: '500',
                    color: '#1a1a1a',
                    margin: 0
                  }}>Real Estate</p>
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <div style={{
                    width: '20px',
                    height: '20px'
                  }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      {/* Пульсирующий круг - User Satisfaction */}
                      <circle cx="12" cy="12" r="8" fill="#3E57DA"/>
                      <circle cx="12" cy="12" r="4" fill="white"/>
                      <circle cx="12" cy="12" r="2" fill="#3E57DA"/>
                    </svg>
                  </div>
                  <p style={{
                    fontSize: '16px',
                    fontWeight: '500',
                    color: '#1a1a1a',
                    margin: 0
                  }}>SaaS Companies</p>
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <div style={{
                    width: '20px',
                    height: '20px'
                  }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      {/* Соединенные точки - Small Business */}
                      <circle cx="8" cy="8" r="2" fill="#3E57DA"/>
                      <circle cx="16" cy="8" r="2" fill="#3E57DA"/>
                      <circle cx="8" cy="16" r="2" fill="#3E57DA"/>
                      <circle cx="16" cy="16" r="2" fill="#3E57DA"/>
                      <line x1="8" y1="8" x2="16" y2="8" stroke="#3E57DA" strokeWidth="1"/>
                      <line x1="8" y1="16" x2="16" y2="16" stroke="#3E57DA" strokeWidth="1"/>
                      <line x1="8" y1="8" x2="8" y2="16" stroke="#3E57DA" strokeWidth="1"/>
                      <line x1="16" y1="8" x2="16" y2="16" stroke="#3E57DA" strokeWidth="1"/>
                    </svg>
                  </div>
                  <p style={{
                    fontSize: '16px',
                    fontWeight: '500',
                    color: '#1a1a1a',
                    margin: 0
                  }}>Legal Services</p>
                </div>
              </div>
              
              {/* Button */}
              <div>
                <a href="/book-a-demo" style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '16px 32px',
                  background: 'linear-gradient(135deg, #00FFE7, #00BFAE)',
                  color: '#1A1A1A',
                  textDecoration: 'none',
                  borderRadius: '12px',
                  fontWeight: '600',
                  fontSize: '16px',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 8px 24px rgba(0, 255, 231, 0.3)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 12px 32px rgba(0, 255, 231, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 255, 231, 0.3)';
                }}>
                  <div>Find Your Industry</div>
                  <div style={{
                    width: '16px',
                    height: '16px'
                  }}>
                    <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 8.28955H15" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"></path>
                      <path d="M9.27344 2.5625L15.0007 8.28977L9.27344 14.017" stroke="currentColor" strokeWidth="1.27273" strokeLinecap="round" strokeLinejoin="round"></path>
                    </svg>
                  </div>
                </a>
              </div>
            </div>
            
            {/* Right side - Image */}
            <div style={{
              gridColumn: 'span 6',
              display: 'flex',
              justifyContent: 'flex-end'
            }}>
              <a aria-label="Image displaying Synthesia as the leader in AI Video Generator on G2" href="https://www.g2.com/categories/video-communications?utf8=%E2%9C%93&amp;selected_view=trending&amp;segment=enterprise#grid" target="_blank" style={{
                position: 'relative',
                display: 'block',
                width: '100%',
                maxWidth: '500px'
              }}>
                <div style={{
                  borderRadius: '16px',
                  border: '1px solid #e5e7eb',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                  overflow: 'hidden',
                  position: 'relative',
                  background: 'linear-gradient(135deg, #00FFE7, #00BFAE)',
                  aspectRatio: '493/437',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {/* Голографическая сетка */}
                  <svg width="100%" height="100%" viewBox="0 0 400 300" style={{
                    position: 'absolute',
                    top: 0,
                    left: 0
                  }}>
                    <defs>
                      <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>
                      </pattern>
                      <radialGradient id="hologram" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="rgba(255,255,255,0.8)"/>
                        <stop offset="50%" stopColor="rgba(255,255,255,0.3)"/>
                        <stop offset="100%" stopColor="rgba(255,255,255,0.1)"/>
                      </radialGradient>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)"/>
                    <circle cx="200" cy="150" r="80" fill="url(#hologram)" opacity="0.6">
                      <animate attributeName="r" values="80;90;80" dur="3s" repeatCount="indefinite"/>
                      <animate attributeName="opacity" values="0.6;0.8;0.6" dur="3s" repeatCount="indefinite"/>
                    </circle>
                    <circle cx="200" cy="150" r="60" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2">
                      <animate attributeName="r" values="60;70;60" dur="2s" repeatCount="indefinite"/>
                    </circle>
                    <circle cx="200" cy="150" r="40" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1">
                      <animate attributeName="r" values="40;50;40" dur="1.5s" repeatCount="indefinite"/>
                    </circle>
                  </svg>
                  
                                    {/* Google Services Badges Overlay - ближе к кругу */}
                  {/* Google Ads Badge - хаотично размещен */}
                  <div style={{
                    position: 'absolute',
                    top: '25%',
                    left: '20%',
                    transform: 'translate(-50%, -50%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '48px',
                    height: '48px',
                    background: 'white',
                    borderRadius: '50%',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15), 0 2px 4px rgba(0, 0, 0, 0.1)',
                    padding: '8px'
                  }}>
                    <img 
                      src="https://img.icons8.com/color/48/google-ads.png" 
                      alt="Google Ads Official Partner" 
                      style={{
                        width: '32px',
                        height: '32px'
                      }}
                    />
                  </div>
                  
                  {/* Google Sheets Badge - хаотично размещен */}
                  <div style={{
                    position: 'absolute',
                    top: '15%',
                    right: '25%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '48px',
                    height: '48px',
                    background: 'white',
                    borderRadius: '50%',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15), 0 2px 4px rgba(0, 0, 0, 0.1)',
                    padding: '8px'
                  }}>
                    <img 
                      src="https://img.icons8.com/color/48/google-sheets.png" 
                      alt="Google Sheets Integration" 
                      style={{
                        width: '32px',
                        height: '32px'
                      }}
                    />
                  </div>
                  
                  {/* PDF Export Badge - хаотично размещен */}
                  <div style={{
                    position: 'absolute',
                    top: '65%',
                    left: '15%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '48px',
                    height: '48px',
                    background: 'white',
                    borderRadius: '50%',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15), 0 2px 4px rgba(0, 0, 0, 0.1)',
                    padding: '8px'
                  }}>
                    <img 
                      src="https://img.icons8.com/color/48/pdf.png" 
                      alt="PDF Export" 
                      style={{
                        width: '32px',
                        height: '32px'
                      }}
                    />
                  </div>
                  
                  {/* OpenAI Badge - хаотично размещен */}
                  <div style={{
                    position: 'absolute',
                    top: '45%',
                    right: '15%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '48px',
                    height: '48px',
                    background: 'white',
                    borderRadius: '50%',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15), 0 2px 4px rgba(0, 0, 0, 0.1)',
                    padding: '8px'
                  }}>
                    <img 
                      src="https://img.icons8.com/color/48/chatgpt.png" 
                      alt="OpenAI Integration" 
                      style={{
                        width: '32px',
                        height: '32px'
                      }}
                    />
                  </div>
                  
                  {/* Google Analytics Badge - хаотично размещен */}
                  <div style={{
                    position: 'absolute',
                    bottom: '25%',
                    right: '20%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '48px',
                    height: '48px',
                    background: 'white',
                    borderRadius: '50%',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15), 0 2px 4px rgba(0, 0, 0, 0.1)',
                    padding: '8px'
                  }}>
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      {/* Google Analytics logo без белого фона */}
                      <rect x="4" y="12" width="4" height="8" rx="1" fill="#FF9800"/>
                      <rect x="9" y="8" width="4" height="12" rx="1" fill="#FF5722"/>
                      <rect x="14" y="4" width="4" height="16" rx="1" fill="#F57C00"/>
                    </svg>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
        
        <div style={{
          marginBottom: '80px'
        }}></div>
        
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <style dangerouslySetInnerHTML={{
            __html: `
              /* Fade container on desktop */
              @media screen and (min-width: 991px) {
                .g2-logo-row-container {
                  -webkit-mask-image: linear-gradient(90deg, transparent 0%, rgba(0, 0, 0, 1) 5%, rgba(0, 0, 0, 1) 95%, transparent 100%);
                }
              }

              /* Slide animation */
              @keyframes g2-logo-slides {
                from {transform: translateX(0);}
                to {transform: translateX(-71rem);}
              }
              .g2-row-img-container-inner {
                animation: 35s g2-logo-slides infinite linear;
              }
              .g2-logo-row-container,
              .g2-row-img-container-inner,
              .g2-row-img-container-inner img {
                will-change: transform;
              }
              .g2-slider-image-container {
                width: 100%;
                height: 100%;
              }
            `
          }} />
          
          <div style={{
            overflow: 'hidden',
            position: 'relative'
          }}>
            {/* Заголовок блока */}
            <div style={{
              textAlign: 'center',
              marginBottom: '30px'
            }}>
              <h3 style={{
                fontSize: '28px',
                fontWeight: '600',
                color: '#1a1a2e',
                marginBottom: '12px'
              }}>
                Поддерживаемые ниши
              </h3>
              <p style={{
                fontSize: '16px',
                color: '#666',
                maxWidth: '600px',
                margin: '0 auto',
                lineHeight: '1.5'
              }}>
                Специализированные AI-решения для различных отраслей бизнеса
              </p>
            </div>
            
            <div style={{
              display: 'flex',
              whiteSpace: 'nowrap'
            }}>
              <div className="g2-row-img-container-inner" style={{
                display: 'flex',
                alignItems: 'center',
                gap: '40px'
              }}>
                {/* Dentists */}
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <div style={{
                    width: '200px',
                    height: '80px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'linear-gradient(135deg, #00FFE7, #00BFAE)',
                    borderRadius: '12px',
                    padding: '16px'
                  }}>
                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M24 4C12.954 4 4 12.954 4 24s8.954 20 20 20 20-8.954 20-20S35.046 4 24 4zm0 36c-8.837 0-16-7.163-16-16S15.163 8 24 8s16 7.163 16 16-7.163 16-16 16z" fill="white"/>
                      <path d="M18 20h12v2H18zm0 4h12v2H18zm0 4h8v2h-8z" fill="white"/>
                    </svg>
                  </div>
                  <span style={{
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#1a1a2e',
                    textAlign: 'center'
                  }}>
                    Dentists
                  </span>
                </div>
                
                {/* Real Estate Agents */}
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <div style={{
                    width: '200px',
                    height: '80px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'linear-gradient(135deg, #7F9CF5, #667eea)',
                    borderRadius: '12px',
                    padding: '16px'
                  }}>
                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M24 4L4 20h4v20h32V20h4L24 4zm-2 34V26h4v12h-4zm8 0V26h4v12h-4z" fill="white"/>
                    </svg>
                  </div>
                  <span style={{
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#1a1a2e',
                    textAlign: 'center'
                  }}>
                    Real Estate Agents
                  </span>
                </div>
                
                {/* SaaS Products */}
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <div style={{
                    width: '200px',
                    height: '80px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'linear-gradient(135deg, #00FFE7, #00BFAE)',
                    borderRadius: '12px',
                    padding: '16px'
                  }}>
                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M24 4L4 12v12c0 11.046 8.954 20 20 20s20-8.954 20-20V12L24 4zm0 32c-8.837 0-16-7.163-16-16V16l16-8 16 8v4c0 8.837-7.163 16-16 16z" fill="white"/>
                    </svg>
                  </div>
                  <span style={{
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#1a1a2e',
                    textAlign: 'center'
                  }}>
                    SaaS Products
                  </span>
                </div>
                
                {/* Lawyers / Attorneys */}
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <div style={{
                    width: '200px',
                    height: '80px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'linear-gradient(135deg, #7F9CF5, #667eea)',
                    borderRadius: '12px',
                    padding: '16px'
                  }}>
                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M24 4L8 12v12c0 8.837 7.163 16 16 16s16-7.163 16-16V12L24 4zm0 28c-6.627 0-12-5.373-12-12V16l12-8 12 8v4c0 6.627-5.373 12-12 12z" fill="white"/>
                    </svg>
                  </div>
                  <span style={{
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#1a1a2e',
                    textAlign: 'center'
                  }}>
                    Lawyers / Attorneys
                  </span>
                </div>
                
                {/* Plumbers */}
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <div style={{
                    width: '200px',
                    height: '80px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'linear-gradient(135deg, #00FFE7, #00BFAE)',
                    borderRadius: '12px',
                    padding: '16px'
                  }}>
                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M24 4c-5.514 0-10 4.486-10 10v4h20v-4c0-5.514-4.486-10-10-10zm-6 18v12h12V22H18z" fill="white"/>
                    </svg>
                  </div>
                  <span style={{
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#1a1a2e',
                    textAlign: 'center'
                  }}>
                    Plumbers
                  </span>
                </div>
                
                {/* Roofers */}
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <div style={{
                    width: '200px',
                    height: '80px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'linear-gradient(135deg, #7F9CF5, #667eea)',
                    borderRadius: '12px',
                    padding: '16px'
                  }}>
                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M24 4L4 20h4v20h32V20h4L24 4zm-2 34V26h4v12h-4zm8 0V26h4v12h-4z" fill="white"/>
                    </svg>
                  </div>
                  <span style={{
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#1a1a2e',
                    textAlign: 'center'
                  }}>
                    Roofers
                  </span>
                </div>
                
                {/* Electricians */}
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <div style={{
                    width: '200px',
                    height: '80px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'linear-gradient(135deg, #00FFE7, #00BFAE)',
                    borderRadius: '12px',
                    padding: '16px'
                  }}>
                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M24 4L12 20h6v20h12V20h6L24 4z" fill="white"/>
                    </svg>
                  </div>
                  <span style={{
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#1a1a2e',
                    textAlign: 'center'
                  }}>
                    Electricians
                  </span>
                </div>
                
                {/* Gyms & Fitness Studios */}
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <div style={{
                    width: '200px',
                    height: '80px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'linear-gradient(135deg, #7F9CF5, #667eea)',
                    borderRadius: '12px',
                    padding: '16px'
                  }}>
                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M24 4c-5.514 0-10 4.486-10 10v20h20V14c0-5.514-4.486-10-10-10z" fill="white"/>
                    </svg>
                  </div>
                  <span style={{
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#1a1a2e',
                    textAlign: 'center'
                  }}>
                    Gyms & Fitness Studios
                  </span>
                </div>
                
                {/* Therapists / Counselors */}
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <div style={{
                    width: '200px',
                    height: '80px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'linear-gradient(135deg, #00FFE7, #00BFAE)',
                    borderRadius: '12px',
                    padding: '16px'
                  }}>
                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M24 4C12.954 4 4 12.954 4 24s8.954 20 20 20 20-8.954 20-20S35.046 4 24 4zm0 36c-8.837 0-16-7.163-16-16S15.163 8 24 8s16 7.163 16 16-7.163 16-16 16z" fill="white"/>
                      <path d="M18 20h12v2H18zm0 4h12v2H18zm0 4h8v2h-8z" fill="white"/>
                    </svg>
                  </div>
                  <span style={{
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#1a1a2e',
                    textAlign: 'center'
                  }}>
                    Therapists / Counselors
                  </span>
                </div>
                
                {/* Ecommerce Stores */}
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <div style={{
                    width: '200px',
                    height: '80px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'linear-gradient(135deg, #7F9CF5, #667eea)',
                    borderRadius: '12px',
                    padding: '16px'
                  }}>
                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M24 4L4 12v12c0 11.046 8.954 20 20 20s20-8.954 20-20V12L24 4zm0 32c-8.837 0-16-7.163-16-16V16l16-8 16 8v4c0 8.837-7.163 16-16 16z" fill="white"/>
                    </svg>
                  </div>
                  <span style={{
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#1a1a2e',
                    textAlign: 'center'
                  }}>
                    Ecommerce Stores
                  </span>
                </div>
                
                {/* Wedding Photographers */}
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <div style={{
                    width: '200px',
                    height: '80px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'linear-gradient(135deg, #00FFE7, #00BFAE)',
                    borderRadius: '12px',
                    padding: '16px'
                  }}>
                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M24 4c-5.514 0-10 4.486-10 10v20h20V14c0-5.514-4.486-10-10-10z" fill="white"/>
                    </svg>
                  </div>
                  <span style={{
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#1a1a2e',
                    textAlign: 'center'
                  }}>
                    Wedding Photographers
                  </span>
                </div>
                
                {/* Home Cleaning Services */}
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <div style={{
                    width: '200px',
                    height: '80px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'linear-gradient(135deg, #7F9CF5, #667eea)',
                    borderRadius: '12px',
                    padding: '16px'
                  }}>
                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M24 4L4 20h4v20h32V20h4L24 4zm-2 34V26h4v12h-4zm8 0V26h4v12h-4z" fill="white"/>
                    </svg>
                  </div>
                  <span style={{
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#1a1a2e',
                    textAlign: 'center'
                  }}>
                    Home Cleaning Services
                  </span>
                </div>
                
                {/* Digital Agencies */}
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <div style={{
                    width: '200px',
                    height: '80px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'linear-gradient(135deg, #00FFE7, #00BFAE)',
                    borderRadius: '12px',
                    padding: '16px'
                  }}>
                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M24 4L8 12v12c0 8.837 7.163 16 16 16s16-7.163 16-16V12L24 4zm0 28c-6.627 0-12-5.373-12-12V16l12-8 12 8v4c0 6.627-5.373 12-12 12z" fill="white"/>
                    </svg>
                  </div>
                  <span style={{
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#1a1a2e',
                    textAlign: 'center'
                  }}>
                    Digital Agencies
                  </span>
                </div>
                
                {/* Auto Repair Shops */}
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <div style={{
                    width: '200px',
                    height: '80px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'linear-gradient(135deg, #7F9CF5, #667eea)',
                    borderRadius: '12px',
                    padding: '16px'
                  }}>
                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M24 4c-5.514 0-10 4.486-10 10v4h20v-4c0-5.514-4.486-10-10-10zm-6 18v12h12V22H18z" fill="white"/>
                    </svg>
                  </div>
                  <span style={{
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#1a1a2e',
                    textAlign: 'center'
                  }}>
                    Auto Repair Shops
                  </span>
                </div>
              </div>
              
              <div className="g2-row-img-container-inner" style={{
                display: 'flex',
                alignItems: 'center',
                gap: '40px'
              }}>
                {/* Dentists */}
                <div style={{
                  width: '200px',
                  height: '80px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'linear-gradient(135deg, #00FFE7, #00BFAE)',
                  borderRadius: '12px',
                  padding: '16px'
                }}>
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 4C12.954 4 4 12.954 4 24s8.954 20 20 20 20-8.954 20-20S35.046 4 24 4zm0 36c-8.837 0-16-7.163-16-16S15.163 8 24 8s16 7.163 16 16-7.163 16-16 16z" fill="white"/>
                    <path d="M18 20h12v2H18zm0 4h12v2H18zm0 4h8v2h-8z" fill="white"/>
                  </svg>
                </div>
                
                {/* Real Estate Agents */}
                <div style={{
                  width: '200px',
                  height: '80px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'linear-gradient(135deg, #7F9CF5, #667eea)',
                  borderRadius: '12px',
                  padding: '16px'
                }}>
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 4L4 20h4v20h32V20h4L24 4zm-2 34V26h4v12h-4zm8 0V26h4v12h-4z" fill="white"/>
                  </svg>
                </div>
                
                {/* SaaS Products */}
                <div style={{
                  width: '200px',
                  height: '80px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'linear-gradient(135deg, #00FFE7, #00BFAE)',
                  borderRadius: '12px',
                  padding: '16px'
                }}>
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 4L4 12v12c0 11.046 8.954 20 20 20s20-8.954 20-20V12L24 4zm0 32c-8.837 0-16-7.163-16-16V16l16-8 16 8v4c0 8.837-7.163 16-16 16z" fill="white"/>
                  </svg>
                </div>
                
                {/* Lawyers / Attorneys */}
                <div style={{
                  width: '200px',
                  height: '80px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'linear-gradient(135deg, #7F9CF5, #667eea)',
                  borderRadius: '12px',
                  padding: '16px'
                }}>
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 4L8 12v12c0 8.837 7.163 16 16 16s16-7.163 16-16V12L24 4zm0 28c-6.627 0-12-5.373-12-12V16l12-8 12 8v4c0 6.627-5.373 12-12 12z" fill="white"/>
                  </svg>
                </div>
                
                {/* Plumbers */}
                <div style={{
                  width: '200px',
                  height: '80px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'linear-gradient(135deg, #00FFE7, #00BFAE)',
                  borderRadius: '12px',
                  padding: '16px'
                }}>
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 4c-5.514 0-10 4.486-10 10v4h20v-4c0-5.514-4.486-10-10-10zm-6 18v12h12V22H18z" fill="white"/>
                  </svg>
                </div>
                
                {/* Roofers */}
                <div style={{
                  width: '200px',
                  height: '80px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'linear-gradient(135deg, #7F9CF5, #667eea)',
                  borderRadius: '12px',
                  padding: '16px'
                }}>
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 4L4 20h4v20h32V20h4L24 4zm-2 34V26h4v12h-4zm8 0V26h4v12h-4z" fill="white"/>
                  </svg>
                </div>
                
                {/* Electricians */}
                <div style={{
                  width: '200px',
                  height: '80px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'linear-gradient(135deg, #00FFE7, #00BFAE)',
                  borderRadius: '12px',
                  padding: '16px'
                }}>
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 4L12 20h6v20h12V20h6L24 4z" fill="white"/>
                  </svg>
                </div>
                
                {/* Gyms & Fitness Studios */}
                <div style={{
                  width: '200px',
                  height: '80px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'linear-gradient(135deg, #7F9CF5, #667eea)',
                  borderRadius: '12px',
                  padding: '16px'
                }}>
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 4c-5.514 0-10 4.486-10 10v20h20V14c0-5.514-4.486-10-10-10z" fill="white"/>
                  </svg>
                </div>
                
                {/* Therapists / Counselors */}
                <div style={{
                  width: '200px',
                  height: '80px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'linear-gradient(135deg, #00FFE7, #00BFAE)',
                  borderRadius: '12px',
                  padding: '16px'
                }}>
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 4C12.954 4 4 12.954 4 24s8.954 20 20 20 20-8.954 20-20S35.046 4 24 4zm0 36c-8.837 0-16-7.163-16-16S15.163 8 24 8s16 7.163 16 16-7.163 16-16 16z" fill="white"/>
                    <path d="M18 20h12v2H18zm0 4h12v2H18zm0 4h8v2h-8z" fill="white"/>
                  </svg>
                </div>
                
                {/* Ecommerce Stores */}
                <div style={{
                  width: '200px',
                  height: '80px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'linear-gradient(135deg, #7F9CF5, #667eea)',
                  borderRadius: '12px',
                  padding: '16px'
                }}>
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 4L4 12v12c0 11.046 8.954 20 20 20s20-8.954 20-20V12L24 4zm0 32c-8.837 0-16-7.163-16-16V16l16-8 16 8v4c0 8.837-7.163 16-16 16z" fill="white"/>
                  </svg>
                </div>
                
                {/* Wedding Photographers */}
                <div style={{
                  width: '200px',
                  height: '80px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'linear-gradient(135deg, #00FFE7, #00BFAE)',
                  borderRadius: '12px',
                  padding: '16px'
                }}>
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 4c-5.514 0-10 4.486-10 10v20h20V14c0-5.514-4.486-10-10-10z" fill="white"/>
                  </svg>
                </div>
                
                {/* Home Cleaning Services */}
                <div style={{
                  width: '200px',
                  height: '80px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'linear-gradient(135deg, #7F9CF5, #667eea)',
                  borderRadius: '12px',
                  padding: '16px'
                }}>
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 4L4 20h4v20h32V20h4L24 4zm-2 34V26h4v12h-4zm8 0V26h4v12h-4z" fill="white"/>
                  </svg>
                </div>
                
                {/* Digital Agencies */}
                <div style={{
                  width: '200px',
                  height: '80px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'linear-gradient(135deg, #00FFE7, #00BFAE)',
                  borderRadius: '12px',
                  padding: '16px'
                }}>
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 4L8 12v12c0 8.837 7.163 16 16 16s16-7.163 16-16V12L24 4zm0 28c-6.627 0-12-5.373-12-12V16l12-8 12 8v4c0 6.627-5.373 12-12 12z" fill="white"/>
                  </svg>
                </div>
                
                {/* Auto Repair Shops */}
                <div style={{
                  width: '200px',
                  height: '80px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'linear-gradient(135deg, #7F9CF5, #667eea)',
                  borderRadius: '12px',
                  padding: '16px'
                }}>
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 4c-5.514 0-10 4.486-10 10v4h20v-4c0-5.514-4.486-10-10-10zm-6 18v12h12V22H18z" fill="white"/>
                  </svg>
                </div>
                
                {/* Pet Services */}
                <div style={{
                  width: '200px',
                  height: '80px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'linear-gradient(135deg, #00FFE7, #00BFAE)',
                  borderRadius: '12px',
                  padding: '16px'
                }}>
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 4C12.954 4 4 12.954 4 24s8.954 20 20 20 20-8.954 20-20S35.046 4 24 4zm0 36c-8.837 0-16-7.163-16-16S15.163 8 24 8s16 7.163 16 16-7.163 16-16 16z" fill="white"/>
                  </svg>
                </div>
                
                {/* Education Courses */}
                <div style={{
                  width: '200px',
                  height: '80px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'linear-gradient(135deg, #7F9CF5, #667eea)',
                  borderRadius: '12px',
                  padding: '16px'
                }}>
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 4L4 12v12c0 11.046 8.954 20 20 20s20-8.954 20-20V12L24 4zm0 32c-8.837 0-16-7.163-16-16V16l16-8 16 8v4c0 8.837-7.163 16-16 16z" fill="white"/>
                  </svg>
                </div>
                
                {/* Cosmetic Clinics */}
                <div style={{
                  width: '200px',
                  height: '80px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'linear-gradient(135deg, #00FFE7, #00BFAE)',
                  borderRadius: '12px',
                  padding: '16px'
                }}>
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 4C12.954 4 4 12.954 4 24s8.954 20 20 20 20-8.954 20-20S35.046 4 24 4zm0 36c-8.837 0-16-7.163-16-16S15.163 8 24 8s16 7.163 16 16-7.163 16-16 16z" fill="white"/>
                  </svg>
                </div>
                
                {/* Moving Companies */}
                <div style={{
                  width: '200px',
                  height: '80px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'linear-gradient(135deg, #7F9CF5, #667eea)',
                  borderRadius: '12px',
                  padding: '16px'
                }}>
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 4L4 20h4v20h32V20h4L24 4zm-2 34V26h4v12h-4zm8 0V26h4v12h-4z" fill="white"/>
                  </svg>
                </div>
                
                {/* HVAC Services */}
                <div style={{
                  width: '200px',
                  height: '80px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'linear-gradient(135deg, #00FFE7, #00BFAE)',
                  borderRadius: '12px',
                  padding: '16px'
                }}>
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 4c-5.514 0-10 4.486-10 10v4h20v-4c0-5.514-4.486-10-10-10zm-6 18v12h12V22H18z" fill="white"/>
                  </svg>
                </div>
                
                {/* Chiropractors */}
                <div style={{
                  width: '200px',
                  height: '80px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'linear-gradient(135deg, #7F9CF5, #667eea)',
                  borderRadius: '12px',
                  padding: '16px'
                }}>
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 4C12.954 4 4 12.954 4 24s8.954 20 20 20 20-8.954 20-20S35.046 4 24 4zm0 36c-8.837 0-16-7.163-16-16S15.163 8 24 8s16 7.163 16 16-7.163 16-16 16z" fill="white"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* Footer */}
      <Footer compact={true} />
    </div>
    </>
  );
} 