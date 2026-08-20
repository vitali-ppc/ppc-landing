import type { Metadata } from 'next';
import PricingContent from './PricingContent';

export const metadata: Metadata = {
  title: 'B6 Pricing: 3 Tiers of Google Ads AI Autonomy',
  description:
    'B6 pricing: three autonomy tiers, L1 assistant, L2 autopilot, L3 full autonomy. Free during early access; paid plans are not open yet.',
  alternates: { canonical: 'https://www.kampaio.com/pricing' },
  openGraph: {
    title: 'B6 Pricing: Free During Early Access',
    description:
      'Three tiers of autonomy. All include 7 AI agents + Aegis safety reviewer.',
    url: 'https://www.kampaio.com/pricing',
    type: 'website',
    images: [
      {
        url: '/og/pricing.png',
        width: 1200,
        height: 630,
        alt: 'B6 Pricing by Kampaio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'B6 Pricing: Free During Early Access',
    description:
      'Three tiers of autonomy. All include 7 AI agents + Aegis safety reviewer.',
    images: ['/og/pricing.png'],
  },
};

export default function Page() {
  return <PricingContent />;
}
