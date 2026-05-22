import type { Metadata } from 'next';
import ArticleContent from './ArticleContent';

export const metadata: Metadata = {
  title: 'Google Ads "Bid Strategy Limited" Status: What It Means and How to Fix It',
  description: 'Your Google Ads bid strategy shows "Limited"? Here is what "Limited by bid strategy" and "Eligible (Limited)" mean, the real causes, and how to fix (or safely ignore) it.',
  alternates: {
    canonical: 'https://www.kampaio.com/blog/google-ads-bid-strategy-status-limited',
  },
  openGraph: {
    title: 'Google Ads "Bid Strategy Limited" Status: Causes and Fixes',
    description: 'What "Limited by bid strategy" and "Eligible (Limited)" mean, the four real causes, the 5-step fix, and when ignoring the warning is the right call.',
    url: 'https://www.kampaio.com/blog/google-ads-bid-strategy-status-limited',
    type: 'article',
    images: [{ url: '/og/google-ads-bid-strategy-status-limited.png', width: 1200, height: 630, alt: 'Google Ads Bid Strategy Limited Status, kampaio.com/blog' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Google Ads "Bid Strategy Limited" Status: Causes and Fixes',
    description: 'What "Limited by bid strategy" and "Eligible (Limited)" mean, the four real causes, the 5-step fix, and when ignoring the warning is the right call.',
    images: ['/og/google-ads-bid-strategy-status-limited.png'],
  },
};

export default function Page() {
  return <ArticleContent />;
}
