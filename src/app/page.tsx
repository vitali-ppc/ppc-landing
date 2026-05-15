import type { Metadata } from 'next';
import HomeContent from './HomeContent';

export const metadata: Metadata = {
  title: 'Kampaio: AI-Powered Google Ads Management Platform',
  description:
    'Autonomous AI agents manage your Google Ads campaigns 24/7. Built for SMBs spending $3-50K/month. Stop paying agencies, start scaling efficiently.',
  alternates: { canonical: 'https://www.kampaio.com' },
  openGraph: {
    title: 'Kampaio: AI-Powered Google Ads Platform',
    description:
      '7 AI agents work 24/7 on your Google Ads. Built for SMBs. From $99/month.',
    url: 'https://www.kampaio.com',
    type: 'website',
    images: [
      {
        url: '/logo.png',
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
      '7 AI agents work 24/7 on your Google Ads. Built for SMBs. From $99/month.',
    images: ['/logo.png'],
  },
};

export default function Page() {
  return <HomeContent />;
}
