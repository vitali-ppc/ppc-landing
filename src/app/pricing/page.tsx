import type { Metadata } from 'next';
import PricingContent from './PricingContent';

export const metadata: Metadata = {
  title: 'Kampaio Pricing: Free During Early Access',
  description:
    'Kampaio is free during early access, no card. Free: 1 Google Ads account, all 14 checks, search terms and negatives, changes with preview and rollback. Pro (up to 5 accounts) comes when billing opens.',
  alternates: { canonical: 'https://www.kampaio.com/pricing' },
  openGraph: {
    title: 'Kampaio Pricing: Free During Early Access',
    description:
      'Free plan available now: 1 Google Ads account, all 14 checks, changes with preview and rollback. Pro for up to 5 accounts comes when billing opens.',
    url: 'https://www.kampaio.com/pricing',
    type: 'website',
    images: [
      {
        url: '/og/pricing.png',
        width: 1200,
        height: 630,
        alt: 'Kampaio Pricing',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kampaio Pricing: Free During Early Access',
    description:
      'Free plan available now: 1 Google Ads account, all 14 checks, changes with preview and rollback. Pro for up to 5 accounts comes when billing opens.',
    images: ['/og/pricing.png'],
  },
};

export default function Page() {
  return <PricingContent />;
}
