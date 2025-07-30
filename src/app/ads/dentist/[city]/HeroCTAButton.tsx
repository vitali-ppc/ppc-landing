"use client";
import React, { useState } from "react";

interface HeroCTAButtonProps {
  customText?: string;
}

export default function HeroCTAButton({ customText }: HeroCTAButtonProps) {
  const [hover, setHover] = useState(false);
  const buttonText = customText || "Get AI Analysis in 60 Seconds";
  
  return (
    <a
      href="/chat"
      style={{
        display: 'inline-block',
        padding: '18px 44px',
        borderRadius: 12,
        background: hover
          ? 'linear-gradient(90deg, #764ba2 0%, #667eea 100%)'
          : 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
        color: '#1e293b',
        fontWeight: 800,
        fontSize: '1.18rem',
        boxShadow: hover
          ? '0 6px 32px rgba(0,255,231,0.4)'
          : '0 4px 24px rgba(0,255,231,0.3)',
        textDecoration: 'none',
        marginTop: 8,
        transition: 'background 0.2s',
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {buttonText}
    </a>
  );
} 