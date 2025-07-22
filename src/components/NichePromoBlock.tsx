import { formatNiche } from '../../utils/seo';
import React from 'react';

interface NichePromoBlockProps {
  niche: string;
}

const NichePromoBlock: React.FC<NichePromoBlockProps> = ({ niche }) => {
  const formattedNiche = formatNiche(niche);
  return (
    <section style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      borderRadius: '16px',
      padding: '40px',
      textAlign: 'center',
      marginTop: '60px',
      marginBottom: '40px',
      maxWidth: 800,
      marginLeft: 'auto',
      marginRight: 'auto',
    }}>
      <h2 style={{
        fontSize: '2rem',
        fontWeight: 700,
        color: 'white',
        marginBottom: 0,
        lineHeight: '1.2'
      }}>
        AI for Google Ads. Built for {formattedNiche}s
      </h2>
      <p style={{
        fontSize: '17px',
        color: 'white',
        marginBottom: '28px',
        marginTop: '10px',
        lineHeight: '1.6',
        fontWeight: '500',
        opacity: 0.9
      }}>
        Automated audits, custom reports, and expert strategies designed for your practice.
      </p>
      <a
        href="/chat"
        className="btn"
        style={{
          background: 'linear-gradient(45deg, #00FFE7, #00BFAE)',
          color: '#1A1A1A',
          border: 'none',
          padding: '16px 32px',
          borderRadius: '10px',
          fontSize: '16px',
          fontWeight: '600',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          display: 'inline-block',
          boxShadow: 'none',
          textDecoration: 'none',
        }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 8px 25px rgba(0,191,174,0.15)';
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLAnchorElement).style.boxShadow = 'none';
        }}
      >
        Try for Free
      </a>
    </section>
  );
};

export default NichePromoBlock; 