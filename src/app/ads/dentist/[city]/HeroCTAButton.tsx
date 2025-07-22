"use client";
import React, { useState } from "react";

export default function HeroCTAButton() {
  const [hover, setHover] = useState(false);
  return (
    <a
      href="/chat"
      style={{
        display: 'inline-block',
        padding: '18px 44px',
        borderRadius: 12,
        background: hover
          ? 'linear-gradient(90deg, #00bfae 0%, #00ffe7 100%)'
          : 'linear-gradient(90deg, #00ffe7 0%, #00bfae 100%)',
        color: '#23272f',
        fontWeight: 800,
        fontSize: '1.18rem',
        boxShadow: hover
          ? '0 6px 32px rgba(0,255,231,0.4)'
          : '0 4px 24px rgba(0,255,231,0.3)',
        textDecoration: 'none',
        transition: 'all 0.2s',
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      Get AI Analysis in 60 Seconds
    </a>
  );
} 