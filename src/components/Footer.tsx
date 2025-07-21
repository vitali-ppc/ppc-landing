'use client';

import { useMemo } from 'react'

interface FooterProps {
  showTitle?: boolean
  compact?: boolean
}

export default function Footer({ showTitle = false, compact = false }: FooterProps) {
  const currentYear = useMemo(() => new Date().getFullYear(), [])

  if (compact) {
    return (
      <footer style={{
        background: '#374151',
        borderTop: '1px solid #23272f',
        padding: '32px 0 24px',
        textAlign: 'center',
        fontSize: '15px',
        color: 'white',
        lineHeight: '1.6'
      }}>
        <div style={{ marginBottom: 4 }}>
          © Kampaio, 2025. All rights reserved | info@kampaio.com
        </div>
        <div>
          <a href="/privacy-policy" style={{ color: 'white', textDecoration: 'underline', marginRight: 12 }}>Privacy Policy</a>
          |
          <a href="/terms-of-service" style={{ color: 'white', textDecoration: 'underline', marginLeft: 12 }}>Terms of Service</a>
        </div>
      </footer>
    );
  }

  return (
    <footer style={{
      background: '#374151',
      padding: '24px 0',
      color: 'white'
    }}>
      <div className="container">
        {showTitle && (
          <h2 style={{ fontSize: '1.05rem', color: 'rgba(255,255,255,0.9)', fontWeight: '500', textAlign: 'center', margin: '0 0 12px 0', letterSpacing: '0.1px' }}>
            Comprehensive Digital Services for Business Growth
          </h2>
        )}
        <div>
          © Kampaio, 2025. All rights reserved | info@kampaio.com | Privacy Policy | Terms of Service
        </div>
      </div>
    </footer>
  )
} 