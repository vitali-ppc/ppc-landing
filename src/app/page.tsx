import type { Metadata } from 'next';
import HomeContent from './HomeContent';

export const metadata: Metadata = {
  title: 'Kampaio: Google Ads Dashboard for Marketers and PPC Managers',
  description:
    'All your Google Ads accounts on one screen. 14 automatic checks flag wasted spend and stalled campaigns. Change budgets and targets with a preview and a rollback.',
  alternates: { canonical: 'https://www.kampaio.com' },
  openGraph: {
    title: 'Kampaio: Google Ads Dashboard',
    description:
      'All your Google Ads accounts on one screen, with automatic checks and changes you can roll back. Free during early access.',
    url: 'https://www.kampaio.com',
    type: 'website',
    images: [
      {
        url: '/og/home.png',
        width: 1200,
        height: 630,
        alt: 'Kampaio Google Ads dashboard',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kampaio: Google Ads Dashboard',
    description:
      'All your Google Ads accounts on one screen, with automatic checks and changes you can roll back. Free during early access.',
    images: ['/og/home.png'],
  },
};

export default function Page() {
  return <HomeContent />;
}
