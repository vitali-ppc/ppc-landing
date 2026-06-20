import type { Metadata } from 'next';
import ArticleContent from './ArticleContent';

export const metadata: Metadata = {
  title: 'Google Ads AI vs Manual Bidding: How to Decide (with Real Data)',
  description:
    'AI (Smart) bidding vs manual bidding in Google Ads, decided by account stage, conversion volume, and goal. A decision matrix plus real attributed performance data, not "it depends."',
  alternates: {
    canonical: 'https://www.kampaio.com/blog/google-ads-ai-vs-manual-bidding',
  },
  openGraph: {
    title: 'Google Ads AI vs Manual Bidding: How to Decide (with Real Data)',
    description:
      'A decision matrix for AI (Smart) bidding vs manual CPC in Google Ads, keyed to conversion volume, tracking quality, and account maturity, with real attributed performance data.',
    url: 'https://www.kampaio.com/blog/google-ads-ai-vs-manual-bidding',
    type: 'article',
    images: [
      {
        url: '/og/google-ads-ai-vs-manual-bidding.png',
        width: 1200,
        height: 630,
        alt: 'Google Ads AI vs Manual Bidding, kampaio.com/blog',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Google Ads AI vs Manual Bidding: How to Decide (with Real Data)',
    description:
      'A decision matrix for AI (Smart) bidding vs manual CPC in Google Ads, keyed to conversion volume, tracking quality, and account maturity.',
    images: ['/og/google-ads-ai-vs-manual-bidding.png'],
  },
};

export default function Page() {
  return <ArticleContent />;
}
