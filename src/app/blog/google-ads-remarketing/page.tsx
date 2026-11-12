import type { Metadata } from 'next';
import ArticleContent from './ArticleContent';

export const metadata: Metadata = {
  title: 'Google Ads Remarketing: Lists, Exclusions and PMax',
  description:
    'How Google Ads remarketing works once you scale: list minimums, membership duration, RLSA, PMax and Demand Gen, exclusions and incrementality tests.',
  alternates: {
    canonical: 'https://www.kampaio.com/blog/google-ads-remarketing',
  },
  openGraph: {
    title: 'Google Ads Remarketing at Scale: Lists, Exclusions and What PMax Changes (2026)',
    description:
      'How Google Ads remarketing works once you scale: list minimums, membership duration, RLSA, PMax and Demand Gen, exclusions and incrementality tests.',
    url: 'https://www.kampaio.com/blog/google-ads-remarketing',
    type: 'article',
    images: [
      {
        url: '/og/google-ads-remarketing.png',
        width: 1200,
        height: 630,
        alt: 'Google Ads Remarketing at Scale: Lists, Exclusions and What PMax Changes (2026), kampaio.com/blog',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Google Ads Remarketing at Scale: Lists, Exclusions and What PMax Changes (2026)',
    description:
      'How Google Ads remarketing works once you scale: list minimums, membership duration, RLSA, PMax and Demand Gen, exclusions and incrementality tests.',
    images: ['/og/google-ads-remarketing.png'],
  },
};

export default function Page() {
  return <ArticleContent />;
}
