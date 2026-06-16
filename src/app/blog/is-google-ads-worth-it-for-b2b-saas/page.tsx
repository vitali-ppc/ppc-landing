import type { Metadata } from 'next';
import ArticleContent from './ArticleContent';

export const metadata: Metadata = {
  title: 'Is Google Ads Worth It for B2B SaaS? A Decision Framework (2026)',
  description: 'Is Google Ads worth it for your B2B SaaS, or a money-pit? An honest decision framework: a 6-factor scorecard, the real CPL-to-CAC economics, the alternatives, and a cheap 4-6 week test to de-risk the commitment.',
  alternates: {
    canonical: 'https://www.kampaio.com/blog/is-google-ads-worth-it-for-b2b-saas',
  },
  openGraph: {
    title: 'Is Google Ads Worth It for B2B SaaS? A Decision Framework (2026)',
    description: 'A 6-factor scorecard, the real CPL-to-CAC economics, the alternatives, and a cheap 4-6 week test to de-risk Google Ads before you spend a quarter\'s budget.',
    url: 'https://www.kampaio.com/blog/is-google-ads-worth-it-for-b2b-saas',
    type: 'article',
    images: [{ url: '/blog/is-google-ads-worth-it-for-b2b-saas/opengraph-image', width: 1200, height: 630, alt: 'Is Google Ads Worth It for B2B SaaS, kampaio.com/blog' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Is Google Ads Worth It for B2B SaaS? (2026)',
    description: 'A 6-factor scorecard, the real CPL-to-CAC economics, the alternatives, and a cheap 4-6 week test to de-risk Google Ads.',
    images: ['/blog/is-google-ads-worth-it-for-b2b-saas/opengraph-image'],
  },
};

export default function Page() {
  return <ArticleContent />;
}
