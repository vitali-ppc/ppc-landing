import type { Metadata } from 'next';
import ArticleContent from './ArticleContent';

export const metadata: Metadata = {
  title: 'Google Ads Smart Bidding Strategies: How to Choose the Right One',
  description: 'A decision guide to all six Google Ads Smart Bidding strategies: when to use Target CPA vs Target ROAS vs Maximize Conversions, the data thresholds each needs, and when to avoid automation entirely.',
  alternates: {
    canonical: 'https://www.kampaio.com/blog/google-ads-smart-bidding-strategies',
  },
  openGraph: {
    title: 'Google Ads Smart Bidding Strategies: How to Choose the Right One (and When to Avoid Each)',
    description: 'When to use Target CPA vs Target ROAS vs Maximize Conversions, the data thresholds each strategy needs, and when to avoid automation entirely.',
    url: 'https://www.kampaio.com/blog/google-ads-smart-bidding-strategies',
    type: 'article',
    images: [{ url: '/og/google-ads-smart-bidding-strategies.png', width: 1200, height: 630, alt: 'Google Ads Smart Bidding Strategies, kampaio.com/blog' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Google Ads Smart Bidding Strategies: How to Choose the Right One',
    description: 'When to use Target CPA vs Target ROAS vs Maximize Conversions, the data thresholds each strategy needs, and when to avoid automation entirely.',
    images: ['/og/google-ads-smart-bidding-strategies.png'],
  },
};

export default function Page() {
  return <ArticleContent />;
}
