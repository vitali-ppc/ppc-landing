import React from 'react'

interface FooterProps {
  showTitle?: boolean
}

export default function Footer({ showTitle = false }: FooterProps) {
  return (
    <footer className="footer">
      <div className="container">
        {showTitle && (
          <h2 style={{ fontSize: '1.05rem', color: '#b0b0b0', fontWeight: '500', textAlign: 'center', margin: '0 0 12px 0', letterSpacing: '0.1px' }}>
            Comprehensive Digital Services for Business Growth
          </h2>
        )}
        <p style={{ textAlign: 'center', margin: 0, padding: '0 0 16px 0', color: '#a0a0a0', fontSize: '15px', letterSpacing: '0.2px' }}>
          &copy; PPCSet, 2025. All rights reserved |{' '}
          <a href="mailto:info@ppcset.com" style={{ color: 'inherit', textDecoration: 'none' }}>
            info@ppcset.com
          </a>
        </p>
      </div>
    </footer>
  )
} 