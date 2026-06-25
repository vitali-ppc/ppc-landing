import type { Metadata } from 'next';
import ArticleContent from './ArticleContent';

export const metadata: Metadata = {
  title: 'Landing Page Optimization for Google Ads (Quality Score Fix)',
  description:
    'Your landing page feeds Quality Score, which sets your Ad Rank and CPC. Here is the diagnostic chain and the ordered fix list: message match, speed, mobile, LPE flags.',
  alternates: {
    canonical: 'https://www.kampaio.com/blog/landing-page-optimization-for-google-ads',
  },
  openGraph: {
    title: 'Landing Page Optimization for Google Ads (Quality Score Fix)',
    description:
      'Your landing page feeds Quality Score, which sets Ad Rank and CPC. The diagnostic chain plus the ordered fix list: message match, speed, mobile, LPE flags.',
    url: 'https://www.kampaio.com/blog/landing-page-optimization-for-google-ads',
    type: 'article',
    images: [
      {
        url: '/og/landing-page-optimization-for-google-ads.png',
        width: 1200,
        height: 630,
        alt: 'Landing Page Optimization for Google Ads, kampaio.com/blog',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Landing Page Optimization for Google Ads (Quality Score Fix)',
    description:
      'Your landing page feeds Quality Score, which sets Ad Rank and CPC. The diagnostic chain plus the ordered fix list: message match, speed, mobile, LPE flags.',
    images: ['/og/landing-page-optimization-for-google-ads.png'],
  },
};

export default function Page() {
  return <ArticleContent />;
}
