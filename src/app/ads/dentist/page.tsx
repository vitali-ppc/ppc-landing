'use client';

import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import Breadcrumbs from '../../../components/Breadcrumbs';
import NichePromoBlock from '../../../components/NichePromoBlock';

// Cleaned 2026-11-09 (flag 82): the city cards ("Coming Soon"), the city search, the
// template paragraph ("from Chicago to Berlin") and the "proven campaign examples"
// promise are gone. Niche × city by template is not being built: no measurable demand
// for city queries, and Google treats such pages as doorways. Each niche gets a real
// article written by the pipeline; until then the section is noindex (ads/layout.tsx).
export default function DentistAdsHubPage() {
  return (
    <>
      <Header />
      <Breadcrumbs />
      <main style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)', padding: '48px 16px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center', marginBottom: 48 }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#1e293b', marginBottom: 16 }}>
            AI-Powered Local Google Ads <br />
            for Dentists
          </h1>
        </div>
        <NichePromoBlock niche="dentist" />
      </main>
      <Footer compact={true} />
    </>
  );
}
