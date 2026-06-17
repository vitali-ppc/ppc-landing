import type { Metadata } from 'next';
import ArticleContent from './ArticleContent';

export const metadata: Metadata = {
  title: 'Google Ads Optimization: The Complete Guide (2026)',
  description: 'A diagnostic-first system for optimizing Google Ads in 2026: find your real constraint, pull the highest-leverage lever, measure the lift, and know when to leave a campaign alone. Built for operators, not checklist-followers.',
  alternates: {
    canonical: 'https://www.kampaio.com/blog/google-ads-optimization',
  },
  openGraph: {
    title: 'Google Ads Optimization: The Complete Guide (2026)',
    description: 'Optimization is diagnosis, not a checklist. Find the one binding constraint, pull the highest-leverage lever, measure the lift, repeat. The operator system for Google Ads.',
    url: 'https://www.kampaio.com/blog/google-ads-optimization',
    type: 'article',
    images: [{ url: '/blog/google-ads-optimization/opengraph-image', width: 1200, height: 630, alt: 'Google Ads Optimization, the complete diagnostic guide, kampaio.com/blog' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Google Ads Optimization: The Complete Guide (2026)',
    description: 'Optimization is diagnosis, not a checklist. Find the binding constraint, pull the highest-leverage lever, measure the lift, repeat.',
    images: ['/blog/google-ads-optimization/opengraph-image'],
  },
};

export default function Page() {
  return <ArticleContent />;
}
