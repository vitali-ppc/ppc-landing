"use client";
import React, { useState } from "react";

export default function CTAButton({ cityName }: { cityName: string }) {
  const [hover, setHover] = useState(false);
  return (
    <a
      href="/chat"
      style={{
        display: 'inline-block',
        padding: '18px 44px',
        borderRadius: 12,
        background: hover
          ? 'linear-gradient(90deg, #764ba2 0%, #00ffe7 100%)'
          : 'linear-gradient(90deg, #667eea 0%, #00ffe7 100%)',
        color: '#23272f',
        fontWeight: 800,
        fontSize: '1.18rem',
        boxShadow: '0 4px 24px rgba(80,100,180,0.10)',
        textDecoration: 'none',
        marginTop: 8,
        transition: 'background 0.2s',
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      Отримати AI-аудит Google Ads для {cityName}
    </a>
  );
} 