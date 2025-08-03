'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import TypewriterText from './TypewriterText';
import MagneticButton from './MagneticButton';
import LiveAIChat from './LiveAIChat';

// Стабильные значения для частиц (избегаем Math.random() для SSR)
const stableParticles = [
  { id: 0, x: 30.99, y: 92.28, size: 2.80, duration: 15 },
  { id: 1, x: 13.78, y: 61.57, size: 3.58, duration: 18 },
  { id: 2, x: 70.12, y: 82.47, size: 5.64, duration: 12 },
  { id: 3, x: 77.43, y: 55.99, size: 2.86, duration: 20 },
  { id: 4, x: 73.37, y: 6.95, size: 5.11, duration: 16 },
  { id: 5, x: 8.35, y: 26.98, size: 2.46, duration: 14 },
  { id: 6, x: 33.78, y: 24.23, size: 5.05, duration: 19 },
  { id: 7, x: 56.53, y: 2.45, size: 2.19, duration: 17 },
  { id: 8, x: 11.19, y: 81.10, size: 4.94, duration: 13 },
  { id: 9, x: 3.05, y: 46.93, size: 4.20, duration: 21 },
  { id: 10, x: 93.10, y: 73.96, size: 2.89, duration: 15 },
  { id: 11, x: 9.67, y: 75.26, size: 5.90, duration: 18 },
  { id: 12, x: 30.18, y: 66.63, size: 2.40, duration: 16 },
  { id: 13, x: 74.24, y: 78.87, size: 5.03, duration: 14 },
  { id: 14, x: 98.11, y: 36.13, size: 4.69, duration: 20 },
  { id: 15, x: 23.91, y: 51.63, size: 4.82, duration: 17 },
  { id: 16, x: 51.06, y: 53.09, size: 5.94, duration: 19 },
  { id: 17, x: 67.33, y: 51.41, size: 3.70, duration: 13 },
  { id: 18, x: 12.13, y: 25.14, size: 5.84, duration: 15 },
  { id: 19, x: 50.69, y: 89.87, size: 4.40, duration: 18 }
];

export default function AnimatedHero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsClient(true);
    setIsVisible(true);

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section 
      ref={containerRef}
      style={{
        padding: '120px 0',
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
        position: 'relative',
        overflow: 'hidden',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center'
      }}
    >
      {/* Interactive Background */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, rgba(102, 126, 234, 0.08) 0%, transparent 50%), radial-gradient(circle at ${(1 - mousePosition.x) * 100}% ${(1 - mousePosition.y) * 100}%, rgba(118, 75, 162, 0.05) 0%, transparent 50%)`,
        pointerEvents: 'none',
        transition: 'all 0.3s ease'
      }} />

      {/* Animated Grid */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `
          linear-gradient(rgba(102, 126, 234, 0.02) 1px, transparent 1px),
          linear-gradient(90deg, rgba(102, 126, 234, 0.02) 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px',
        pointerEvents: 'none',
        opacity: 0.3
      }} />

      {/* Floating Particles - только на клиенте */}
      {isClient && stableParticles.map((particle) => (
        <motion.div
          key={particle.id}
          style={{
            position: 'absolute',
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            background: particle.id % 2 === 0 ? 'rgba(102, 126, 234, 0.2)' : 'rgba(118, 75, 162, 0.2)',
            borderRadius: '50%',
            pointerEvents: 'none'
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.6, 0.2],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}

      <div style={{
        position: 'relative',
        zIndex: 1,
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 24px',
        width: '100%'
      }}>
        {/* Hero Section - Two Column Layout */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '80px',
          alignItems: 'center'
        }}>
          {/* Left side - Text content */}
          <motion.div 
            style={{ textAlign: 'left' }}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -50 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.h1 
              style={{
                fontSize: 'clamp(40px, 5vw, 56px)',
                fontWeight: '700',
                color: '#1e293b',
                marginBottom: '24px',
                marginTop: 0,
                lineHeight: '1.1'
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                AI
              </span>{' '}
              Assistant for Smarter Google Ads Management
            </motion.h1>
            
            <motion.p 
              style={{
                fontSize: 'clamp(18px, 2vw, 22px)',
                color: '#64748b',
                marginBottom: '40px',
                lineHeight: '1.6',
                fontWeight: '400'
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Analyze your Google Ads campaigns, discover growth opportunities, and automate optimizations — all with one AI-powered platform
            </motion.p>
            
            {/* Magnetic CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <MagneticButton
                style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '18px 36px',
                  fontSize: '18px',
                  fontWeight: '700',
                  color: 'white',
                  cursor: 'pointer',
                  boxShadow: '0 8px 32px rgba(102, 126, 234, 0.3)',
                  letterSpacing: '0.5px',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onClick={() => window.location.href = '/register'}
              >
                <motion.span
                  style={{ position: 'relative', zIndex: 1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  Start Your Free Trial
                </motion.span>
              </MagneticButton>
            </motion.div>
            
            {/* No credit card required */}
            <motion.div 
              style={{
                marginTop: '12px',
                textAlign: 'left'
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: isVisible ? 1 : 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <span style={{
                fontSize: '12px',
                color: '#64748b',
                fontWeight: '400'
              }}>
                No credit card required
              </span>
            </motion.div>
          </motion.div>

          {/* Right side - Live AI Chat */}
          <motion.div 
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'relative'
            }}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : 50 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <LiveAIChat />
          </motion.div>
        </div>
      </div>
    </section>
  );
} 