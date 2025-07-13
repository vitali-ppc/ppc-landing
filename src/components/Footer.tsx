'use client';

import { useMemo } from 'react'

interface FooterProps {
  showTitle?: boolean
  compact?: boolean
}

export default function Footer({ showTitle = false, compact = false }: FooterProps) {
  // Мемоизируем текущий год для производительности
  const currentYear = useMemo(() => new Date().getFullYear(), [])

  return (
    <footer className="footer">
      <div className="container">
        {showTitle && (
          <h2 style={{ fontSize: '1.05rem', color: '#b0b0b0', fontWeight: '500', textAlign: 'center', margin: '0 0 12px 0', letterSpacing: '0.1px' }}>
            Comprehensive Digital Services for Business Growth
          </h2>
        )}
        
        {compact ? (
          // Компактний футер для інших сторінок (в два рядки)
          <>
            <p style={{ textAlign: 'center', margin: 0, padding: '0 0 8px 0', color: '#a0a0a0', fontSize: '15px', letterSpacing: '0.2px' }}>
              &copy; PPCSet, {currentYear}. All rights reserved |{' '}
              <a href="mailto:info@ppcset.com" style={{ color: 'inherit', textDecoration: 'none' }} aria-label="Send email to info@ppcset.com">
                info@ppcset.com
              </a>
            </p>
            <p style={{ textAlign: 'center', margin: 0, padding: '0 0 16px 0', color: '#a0a0a0', fontSize: '15px', letterSpacing: '0.2px' }}>
              <a href="/privacy-policy" style={{ color: 'inherit', textDecoration: 'none' }}>Privacy Policy</a>
              {' '}|{' '}
              <a href="/terms-of-service" style={{ color: 'inherit', textDecoration: 'none' }}>Terms of Service</a>
            </p>
          </>
        ) : (
          // Повний футер для головної сторінки (в один рядок)
          <p style={{ textAlign: 'center', margin: 0, padding: '0 0 16px 0', color: '#a0a0a0', fontSize: '15px', letterSpacing: '0.2px' }}>
            &copy; PPCSet, {currentYear}. All rights reserved |{' '}
            <a href="mailto:info@ppcset.com" style={{ color: 'inherit', textDecoration: 'none' }} aria-label="Send email to info@ppcset.com">
              info@ppcset.com
            </a>
            {' '}|{' '}
            <a href="/privacy-policy" style={{ color: 'inherit', textDecoration: 'none' }}>Privacy Policy</a>
            {' '}|{' '}
            <a href="/terms-of-service" style={{ color: 'inherit', textDecoration: 'none' }}>Terms of Service</a>
          </p>
        )}
      </div>
    </footer>
  )
} 