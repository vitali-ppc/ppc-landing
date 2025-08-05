import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '404 — Page Not Found | Kampaio',
  robots: 'noindex, follow'
}

export default function NotFound() {
  return (
    <div className="not-found-page" style={{
      background: '#1e293b',
      color: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      margin: 0,
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 9999
    }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{
          fontSize: '72px',
          fontWeight: '800',
          marginBottom: '16px'
        }}>
          404
        </div>
        <div style={{
          fontSize: '22px',
          color: '#64748b',
          marginBottom: '32px'
        }}>
          Sorry, the page you are looking for does not exist.
        </div>
        <Link href="/" style={{
          fontSize: '18px',
          padding: '14px 36px',
          borderRadius: '32px',
          background: '#fff',
          color: '#1e293b',
          fontWeight: '700',
          border: 'none',
          transition: 'background 0.2s, box-shadow 0.2s, transform 0.2s',
          boxShadow: '0 2px 24px rgba(0,0,0,0.10)',
          cursor: 'pointer',
          textDecoration: 'none',
          display: 'inline-block'
        }}>
          Go to Home
        </Link>
      </div>
    </div>
  )
} 