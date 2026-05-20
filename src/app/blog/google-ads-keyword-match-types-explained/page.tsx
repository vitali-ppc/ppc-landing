import type { Metadata } from 'next';
import ArticleContent from './ArticleContent';

export const metadata: Metadata = {
  title: 'Google Ads Keyword Match Types Explained (Broad, Phrase, Exact 2026)',
  description: 'Broad, phrase, and exact match in Google Ads behave nothing like they did in 2019. How each one works in 2026, how they feed Smart Bidding, and which to use when.',
  alternates: {
    canonical: 'https://www.kampaio.com/blog/google-ads-keyword-match-types-explained',
  },
  openGraph: {
    title: 'Google Ads Keyword Match Types Explained (2026)',
    description: 'Broad, phrase, and exact match in Google Ads in 2026. How each feeds Smart Bidding, the decision framework, and the negative-keyword discipline that makes any of this work.',
    url: 'https://www.kampaio.com/blog/google-ads-keyword-match-types-explained',
    type: 'article',
    images: [{ url: '/og/google-ads-keyword-match-types-explained.png', width: 1200, height: 630, alt: 'Google Ads Keyword Match Types Explained, kampaio.com/blog' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Google Ads Keyword Match Types Explained (2026)',
    description: 'Broad, phrase, and exact match in 2026. How each feeds Smart Bidding, plus the decision framework most guides miss.',
    images: ['/og/google-ads-keyword-match-types-explained.png'],
  },
};

export default function Page() {
  return <ArticleContent />;
}
