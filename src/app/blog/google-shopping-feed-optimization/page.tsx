import type { Metadata } from 'next';
import ArticleContent from './ArticleContent';

export const metadata: Metadata = {
  title: 'Google Shopping Feed Optimization: The Attribute Build Order (2026)',
  description:
    'A setup-first guide to Google Shopping feed optimization: the attribute priority order, exact character limits, and the disapproval triggers that vendor "optimize your titles" advice skips. Built for PPC managers who own the feed.',
  alternates: {
    canonical: 'https://www.kampaio.com/blog/google-shopping-feed-optimization',
  },
  openGraph: {
    title: 'Google Shopping Feed Optimization: The Attribute Build Order (2026)',
    description:
      'The attribute priority order, exact character limits, and disapproval triggers for Google Shopping feed optimization. A build-order guide for PPC managers who own the feed.',
    url: 'https://www.kampaio.com/blog/google-shopping-feed-optimization',
    type: 'article',
    images: [
      {
        url: '/og/google-shopping-feed-optimization.png',
        width: 1200,
        height: 630,
        alt: 'Google Shopping Feed Optimization, kampaio.com/blog',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Google Shopping Feed Optimization: The Attribute Build Order (2026)',
    description:
      'The attribute priority order, character limits, and disapproval triggers for Google Shopping feed optimization. Build the feed in the right order.',
    images: ['/og/google-shopping-feed-optimization.png'],
  },
};

export default function Page() {
  return <ArticleContent />;
}
