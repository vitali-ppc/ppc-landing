import type { Metadata } from 'next';
import ArticleContent from './ArticleContent';

export const metadata: Metadata = {
  title: "Google Ads Strategy: A Strategic Operator's Framework (2026)",
  description: "Most Google Ads advice is tactics. This is the strategy layer: set the objective, structure the account, allocate budget, align KPIs with the business, and decide when to automate the operational layer as spend scales from $10K to $100K per month.",
  alternates: {
    canonical: 'https://www.kampaio.com/blog/google-ads-strategy',
  },
  openGraph: {
    title: "Google Ads Strategy: A Strategic Operator's Framework (2026)",
    description: "Strategy is a stack of six decisions: objective, structure, budget, bidding, measurement, and organization. The operator's framework for running paid search as a system.",
    url: 'https://www.kampaio.com/blog/google-ads-strategy',
    type: 'article',
    images: [{ url: '/og/google-ads-strategy.png', width: 1200, height: 630, alt: 'Google Ads Strategy, a strategic operator framework, kampaio.com/blog' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Google Ads Strategy: A Strategic Operator Framework',
    description: 'The six-layer strategy stack for Google Ads: objective, structure, budget, bidding, measurement, and organization.',
    images: ['/og/google-ads-strategy.png'],
  },
};

export default function Page() {
  return <ArticleContent />;
}
