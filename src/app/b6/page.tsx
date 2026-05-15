import type { Metadata } from 'next';
import B6Content from './B6Content';

export const metadata: Metadata = {
  title: 'B6 Autonomous PPC Cabinet: AI Agents for Google Ads',
  description:
    'B6 is an AI-agent team that manages Google Ads campaigns end-to-end. Buzz bids, Aegis reviews, Echo reports. From $99/month. Watch them work in real-time.',
  alternates: { canonical: 'https://www.kampaio.com/b6' },
  openGraph: {
    title: 'B6: 7 AI Agents Running Your Google Ads',
    description:
      'Autonomous PPC cabinet. Buzz, Aegis, Echo work 24/7. From $99/month.',
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
      'Autonomous PPC cabinet. Buzz, Aegis, Echo work 24/7. From $99/month.',
    images: ['/og/b6.png'],
  },
};

export default function Page() {
  return <B6Content />;
}
