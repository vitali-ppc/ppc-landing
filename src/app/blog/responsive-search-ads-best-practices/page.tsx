import type { Metadata } from 'next';
import ArticleContent from './ArticleContent';

export const metadata: Metadata = {
  title: 'Responsive Search Ads Best Practices (2026)',
  description: 'Responsive search ads best practices: how many headlines to write, when pinning helps or hurts, what ad strength misses, and how to test RSA variants.',
  alternates: {
    canonical: 'https://www.kampaio.com/blog/responsive-search-ads-best-practices',
  },
  openGraph: {
    title: 'Responsive Search Ads Best Practices for Senior PPC Managers (2026)',
    description: 'Responsive search ads best practices: how many headlines to write, when pinning helps or hurts, what ad strength misses, and how to test RSA variants.',
    url: 'https://www.kampaio.com/blog/responsive-search-ads-best-practices',
    type: 'article',
    images: [{ url: '/og/responsive-search-ads-best-practices.png', width: 1200, height: 630, alt: 'Responsive Search Ads Best Practices, kampaio.com/blog' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Responsive Search Ads Best Practices (2026)',
    description: 'Responsive search ads best practices: how many headlines to write, when pinning helps or hurts, what ad strength misses, and how to test RSA variants.',
    images: ['/og/responsive-search-ads-best-practices.png'],
  },
};

export default function Page() {
  return <ArticleContent />;
}
