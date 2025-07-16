'use client';

import { useState } from 'react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  gradient: string;
}

const FeatureCard = ({ title, description, icon, color, gradient }: FeatureCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      style={{
        background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
        borderRadius: '20px',
        padding: '40px',
        border: `1px solid ${color}20`,
        transition: 'all 0.4s ease',
        position: 'relative',
        overflow: 'hidden',
        transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
        boxShadow: isHovered 
          ? `0 30px 60px ${color}15, 0 4px 16px rgba(0,0,0,0.08)` 
          : '0 8px 32px rgba(0,0,0,0.12), 0 4px 16px rgba(0,0,0,0.08)',
        borderColor: isHovered ? `${color}30` : `${color}20`,
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
      onMouseEnter={() => {
        console.log('Hover on:', title);
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        console.log('Leave:', title);
        setIsHovered(false);
      }}
    >
      <div style={{
        width: '60px',
        height: '60px',
        background: gradient,
        borderRadius: '16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '24px',
        boxShadow: `0 8px 24px ${color}30`,
        transition: 'all 0.3s ease',
        transform: isHovered ? 'scale(1.1)' : 'scale(1)',
        animation: isHovered ? 'pulse 2s infinite' : 'none'
      }}>
        {icon}
      </div>
      
      <h3 style={{
        fontSize: '24px',
        fontWeight: '700',
        color: '#1a1a1a',
        marginBottom: '16px',
        whiteSpace: 'nowrap'
      }}>
        {title}
      </h3>
      
      <p style={{
        fontSize: '16px',
        color: '#666',
        lineHeight: '1.6',
        marginBottom: '20px',
        minHeight: '140px'
      }}>
        {description}
      </p>
      
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontSize: '14px',
        color: color,
        fontWeight: '600',
        marginTop: 'auto'
      }}>
        <span>Learn more</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="5" y1="12" x2="19" y2="12"></line>
          <polyline points="12,5 19,12 12,19"></polyline>
        </svg>
      </div>
    </div>
  );
};

export default FeatureCard; 