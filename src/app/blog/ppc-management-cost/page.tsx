import type { Metadata } from 'next';
import ArticleContent from './ArticleContent';

export const metadata: Metadata = {
  title: 'PPC Management Pricing: What Agencies Actually Charge (2026)',
  description: 'PPC management costs $500 to $10,000 a month, or 10 to 20% of ad spend. Here is the honest line-item breakdown, the three pricing models decoded, and the math on whether the fee is worth it at your spend level.',
  alternates: {
    canonical: 'https://www.kampaio.com/blog/ppc-management-cost',
  },
  openGraph: {
    title: 'PPC Management Pricing: What Agencies Actually Charge (2026)',
    description: 'PPC management costs $500 to $10,000 a month, or 10 to 20% of ad spend. The honest line-item breakdown and the math on whether the fee is worth it.',
    url: 'https://www.kampaio.com/blog/ppc-management-cost',
    type: 'article',
    images: [{ url: '/og/ppc-management-cost.png', width: 1200, height: 630, alt: 'How Much Does PPC Management Cost, kampaio.com/blog' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PPC Management Pricing: What Agencies Actually Charge (2026)',
    description: 'PPC management costs $500 to $10,000 a month, or 10 to 20% of ad spend. The honest breakdown and the worth-it math.',
    images: ['/og/ppc-management-cost.png'],
  },
};

export default function Page() {
  return <ArticleContent />;
}
