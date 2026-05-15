import type { Metadata } from 'next';
import PricingContent from './PricingContent';

export const metadata: Metadata = {
  title: 'Pricing | B6 Autonomous PPC Cabinet by Kampaio',
  description:
    'B6 pricing: L1 $99 (assistant), L2 $199 (autopilot), L3 $399 (full autonomy). All tiers include 7 AI agents plus Aegis safety reviewer.',
  alternates: { canonical: 'https://www.kampaio.com/pricing' },
  openGraph: {
    title: 'B6 Pricing: $99 / $199 / $399 per month',
    description:
      'Three tiers of autonomy. All include 7 AI agents + Aegis safety reviewer.',
    url: 'https://www.kampaio.com/pricing',
    type: 'website',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'B6 Pricing by Kampaio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'B6 Pricing: $99 / $199 / $399 per month',
    description:
      'Three tiers of autonomy. All include 7 AI agents + Aegis safety reviewer.',
    images: ['/logo.png'],
  },
};

export default function Page() {
  return <PricingContent />;
}
