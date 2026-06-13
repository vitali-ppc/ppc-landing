import type { Metadata } from 'next';
import ArticleContent from './ArticleContent';

export const metadata: Metadata = {
  title: 'Google Ads Negative Keywords: A Repeatable Method to Cut Wasted Spend (2026)',
  description: 'A rigorous, repeatable method for Google Ads negative keywords: how to find them in the search terms report, choose the right match type and hierarchy level, handle Performance Max, maintain the lists, and avoid over-blocking converting traffic.',
  alternates: {
    canonical: 'https://www.kampaio.com/blog/google-ads-negative-keywords',
  },
  openGraph: {
    title: 'Google Ads Negative Keywords: A Repeatable Method to Cut Wasted Spend (2026)',
    description: 'How to find negative keywords in the search terms report, pick the right match type and level, handle Performance Max, and avoid over-blocking converting traffic.',
    url: 'https://www.kampaio.com/blog/google-ads-negative-keywords',
    type: 'article',
    images: [{ url: '/og/google-ads-negative-keywords.png', width: 1200, height: 630, alt: 'Google Ads Negative Keywords, kampaio.com/blog' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Google Ads Negative Keywords: A Repeatable Method to Cut Wasted Spend (2026)',
    description: 'A repeatable weekly method for finding, scoping, and maintaining negative keywords without over-blocking converting traffic.',
    images: ['/og/google-ads-negative-keywords.png'],
  },
};

export default function Page() {
  return <ArticleContent />;
}
