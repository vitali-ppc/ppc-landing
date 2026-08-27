import type { Metadata } from 'next';
import ArticleContent from './ArticleContent';

export const metadata: Metadata = {
  title: 'Why Google Ads Strategy Fails at Scale: 8 Patterns',
  description: "Across 20+ client accounts an agency owner sees the same 8 patterns when Google Ads strategy stalls at scale. Auction signal exhaustion, attribution drift, KPI misalignment, vendor sprawl, and the diagnostic framework to find which one is killing your account.",
  alternates: {
    canonical: 'https://www.kampaio.com/blog/why-google-ads-strategy-fails-at-scale',
  },
  openGraph: {
    title: 'Why Google Ads Strategy Fails at Scale: 8 Diagnostic Patterns Agencies See',
    description: 'Auction signal exhaustion, attribution drift, KPI misalignment, vendor sprawl. The 8 patterns an agency owner sees across 20+ accounts when Google Ads stops scaling.',
    url: 'https://www.kampaio.com/blog/why-google-ads-strategy-fails-at-scale',
    type: 'article',
    images: [{ url: '/og/why-google-ads-strategy-fails-at-scale.png', width: 1200, height: 630, alt: 'Why Google Ads Strategy Fails at Scale, kampaio.com/blog' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Why Google Ads Strategy Fails at Scale: 8 Patterns',
    description: 'The 8 patterns agency owners see when Google Ads strategy stalls between $30K and $100K per month.',
    images: ['/og/why-google-ads-strategy-fails-at-scale.png'],
  },
};

export default function Page() {
  return <ArticleContent />;
}
