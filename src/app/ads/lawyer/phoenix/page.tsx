'use client';

import Header from '../../../../components/Header';
import Footer from '../../../../components/Footer';

export default function PhoenixLawyerPage() {
  return (
    <>
      <Header />
      <main style={{ 
        minHeight: '100vh', 
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
        padding: '48px 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          maxWidth: 600,
          textAlign: 'center',
          background: 'white',
          borderRadius: '16px',
          padding: '48px 32px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
        }}>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: 800,
            color: '#1e293b',
            marginBottom: '24px',
            lineHeight: 1.2
          }}>
            Google Ads for Lawyers in Phoenix
          </h1>
          
          <p style={{
            fontSize: '1.1rem',
            color: '#64748b',
            marginBottom: '32px',
            lineHeight: 1.6
          }}>
            Coming Soon - We're working on detailed content for Phoenix lawyers.
          </p>
          
          <p style={{
            fontSize: '1rem',
            color: '#64748b',
            marginBottom: '32px',
            lineHeight: 1.6
          }}>
            Meanwhile, check out our general lawyer strategies and other cities.
          </p>
          
          <div style={{
            display: 'flex',
            gap: '16px',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <a
              href="/ads/lawyer"
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                padding: '12px 24px',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: 600,
                transition: 'all 0.2s'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 20px rgba(102,126,234,0.3)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              Back to Lawyers
            </a>
            
            <a
              href="/ads"
              style={{
                background: 'white',
                color: '#667eea',
                padding: '12px 24px',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: 600,
                border: '2px solid #667eea',
                transition: 'all 0.2s'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = '#667eea';
                e.currentTarget.style.color = 'white';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'white';
                e.currentTarget.style.color = '#667eea';
              }}
            >
              All Industries
            </a>
          </div>
        </div>
      </main>
      <Footer compact={true} />
    </>
  );
} 