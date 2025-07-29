import { formatNiche } from '../../utils/seo';
import React from 'react';

interface NichePromoBlockProps {
  niche: string;
}

const NichePromoBlock: React.FC<NichePromoBlockProps> = ({ niche }) => {
  const formattedNiche = formatNiche(niche);
  return (
    <section style={{
      background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%)',
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
        color: '#1e293b',
        marginBottom: 0,
        lineHeight: '1.2'
      }}>
        AI for Google Ads. Built for {formattedNiche}s
      </h2>
      <p style={{
        fontSize: '17px',
        color: '#64748b',
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
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          border: 'none',
          padding: '16px 32px',
          borderRadius: '10px',
          fontSize: '16px',
          fontWeight: '600',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          display: 'inline-block',
          boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
          textDecoration: 'none',
        }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.4)';
          (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-2px)';
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.3)';
          (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)';
        }}
      >
        Try for Free
      </a>
    </section>
  );
};

export default NichePromoBlock; 