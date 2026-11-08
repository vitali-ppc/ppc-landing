import type { Metadata } from 'next';
import HomeContent from './HomeContent';

export const metadata: Metadata = {
  title: 'Kampaio: AI-Powered Google Ads Management Platform',
  description:
    'AI agents for Google Ads, built for SMBs spending $3-50K/month. In development. Join early access.',
  alternates: { canonical: 'https://www.kampaio.com' },
  openGraph: {
    title: 'Kampaio: AI-Powered Google Ads Platform',
    description:
      'AI agents for Google Ads, built for SMBs. In development. Join early access.',
    url: 'https://www.kampaio.com',
    type: 'website',
    images: [
      {
        url: '/og/home.png',
        width: 1200,
        height: 630,
        alt: 'Kampaio AI-Powered Google Ads Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kampaio: AI-Powered Google Ads Platform',
    description:
      'AI agents for Google Ads, built for SMBs. In development. Join early access.',
    images: ['/og/home.png'],
  },
};

export default function Page() {
  return <HomeContent />;
}
