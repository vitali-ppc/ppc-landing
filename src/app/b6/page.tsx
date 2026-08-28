import type { Metadata } from 'next';
import B6Content from './B6Content';

export const metadata: Metadata = {
  title: 'B6 Autonomous PPC Cabinet: AI Agents for Google Ads',
  description:
    'B6 is an AI-agent team that manages Google Ads campaigns end-to-end. Buzz bids, Aegis reviews, Echo reports. Free during early access. Watch them work in real-time.',
  alternates: { canonical: 'https://www.kampaio.com/b6' },
  openGraph: {
    title: 'B6: 7 AI Agents Running Your Google Ads',
    description:
      'Autonomous PPC cabinet. Buzz, Aegis, Echo work 24/7. Free during early access.',
    url: 'https://www.kampaio.com/b6',
    type: 'website',
    images: [
      {
        url: '/og/b6.png',
        width: 1200,
        height: 630,
        alt: 'B6 Autonomous PPC Cabinet by Kampaio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'B6: 7 AI Agents Running Your Google Ads',
    description:
      'Autonomous PPC cabinet. Buzz, Aegis, Echo work 24/7. Free during early access.',
    images: ['/og/b6.png'],
  },
};

// Service schema: links B6 product to Kampaio Organization entity via @id.
// Rendered server-side so Google bot always sees it (B6Content is behind
// AuthGuard which shows "Loading…" before client hydration).
const b6JsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': 'https://www.kampaio.com/b6#service',
  name: 'B6 Autonomous PPC Cabinet',
  serviceType: 'PPC Campaign Management',
  category: 'Pay-Per-Click Advertising Automation',
  description:
    'B6 is an autonomous AI-agent team that manages Google Ads campaigns end-to-end. 8 specialized agents (Buzz for bidding, Aegis for risk review, Echo for reporting, Vox for strategy, Maximus for orchestration, Mira for creative, Sage for research, Vigil for 24/7 anomaly monitoring) work together to deliver campaign performance without manual intervention.',
  url: 'https://www.kampaio.com/b6',
  provider: {
    '@id': 'https://www.kampaio.com/#organization',
  },
  areaServed: 'Worldwide',
  audience: {
    '@type': 'BusinessAudience',
    audienceType: 'SMB and DTC advertisers with $3K-50K/month Google Ads budgets',
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'B6 Autonomy Tiers',
    itemListElement: [
      {
        '@type': 'Offer',
        name: 'L1 Co-pilot',
        description: 'AI suggests, you approve every action',
        price: '99',
        priceCurrency: 'USD',
      },
      {
        '@type': 'Offer',
        name: 'L2 Autopilot',
        description: 'AI acts on small changes, you approve major moves',
        price: '199',
        priceCurrency: 'USD',
      },
      {
        '@type': 'Offer',
        name: 'L3 Full Autopilot',
        description: 'AI manages account autonomously with daily safety caps',
        price: '399',
        priceCurrency: 'USD',
      },
    ],
  },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(b6JsonLd) }}
      />
      <B6Content />
    </>
  );
}
