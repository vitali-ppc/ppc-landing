"use client";
import React, { useState } from "react";

interface HeroCTAButton2Props {
  customText?: string;
}

export default function HeroCTAButton2({ customText }: HeroCTAButton2Props) {
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
          ? 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)'
          : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        fontWeight: 700,
        fontSize: '1.18rem',
        boxShadow: hover
          ? '0 4px 20px rgba(102,126,234,0.4)'
          : '0 2px 12px rgba(102,126,234,0.3)',
        textDecoration: 'none',
        transition: 'all 0.3s ease',
        border: 'none',
        letterSpacing: '-0.2px',
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {buttonText}
    </a>
  );
} 