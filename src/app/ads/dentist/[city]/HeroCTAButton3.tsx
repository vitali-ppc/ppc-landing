"use client";
import React, { useState } from "react";

interface HeroCTAButton3Props {
  customText?: string;
}

export default function HeroCTAButton3({ customText }: HeroCTAButton3Props) {
  const [hover, setHover] = useState(false);
  const buttonText = customText || "Get AI Analysis in 60 Seconds";
  
  return (
    <a
      href="/chat"
      style={{
        display: 'inline-block',
        padding: '18px 44px',
        borderRadius: 12,
        background: hover ? '#8B5CF6' : '#7F9CF5',
        color: 'white',
        fontWeight: 700,
        fontSize: '1.18rem',
        boxShadow: hover
          ? '0 4px 20px rgba(127,156,245,0.3)'
          : '0 2px 12px rgba(127,156,245,0.2)',
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