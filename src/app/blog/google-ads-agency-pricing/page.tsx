import type { Metadata } from 'next';
import ArticleContent from './ArticleContent';

export const metadata: Metadata = {
  title: 'Google Ads Agency Pricing: What Agencies Charge and Which Model Fits You (2026)',
  description:
    'Google Ads agencies charge a flat $500-$5,000/mo, 10-20% of ad spend, $75-$250/hr, or on performance. Here are the real 2026 ranges and which model actually fits your budget.',
  alternates: {
    canonical: 'https://www.kampaio.com/blog/google-ads-agency-pricing',
  },
  openGraph: {
    title: 'Google Ads Agency Pricing: What Agencies Charge and Which Model Fits You (2026)',
    description:
      'The four pricing models agencies use, the real 2026 dollar ranges, the hidden fees to check, and how to pick a model you can defend.',
    url: 'https://www.kampaio.com/blog/google-ads-agency-pricing',
    type: 'article',
    images: [{ url: '/og/google-ads-agency-pricing.png', width: 1200, height: 630, alt: 'Google Ads Agency Pricing, kampaio.com/blog' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Google Ads Agency Pricing: What Agencies Charge and Which Model Fits You (2026)',
    description:
      'The four pricing models agencies use, the real 2026 dollar ranges, the hidden fees to check, and how to pick a model you can defend.',
    images: ['/og/google-ads-agency-pricing.png'],
  },
};

export default function Page() {
  return <ArticleContent />;
}
