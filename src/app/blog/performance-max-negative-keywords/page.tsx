import type { Metadata } from 'next';
import ArticleContent from './ArticleContent';

// SERP title is kept short (Google truncates past ~60 chars, and the root layout
// appends " | Kampaio"). The full title stays on the H1, JSON-LD headline, and OG.
export const metadata: Metadata = {
  title: 'Performance Max Negative Keywords: Levels & Limits',
  description:
    'Where PMax negative keywords apply (account, campaign, list level), the current caps, how they interact with Smart Bidding and AI Max, and a clear-eyed look at when they help versus when Smart Bidding already has it covered.',
  alternates: {
    canonical: 'https://www.kampaio.com/blog/performance-max-negative-keywords',
  },
  openGraph: {
    title:
      'Performance Max Negative Keywords: Account vs Campaign vs List Level, Real Limits, and When They Actually Help (2026)',
    description:
      'The three levels PMax negatives apply at, the real 2026 caps, the Search and Shopping boundary, and when Smart Bidding has already done the job for you.',
    url: 'https://www.kampaio.com/blog/performance-max-negative-keywords',
    type: 'article',
    images: [
      {
        url: '/og/performance-max-negative-keywords.png',
        width: 1200,
        height: 630,
        alt: 'Performance Max Negative Keywords, kampaio.com/blog',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title:
      'Performance Max Negative Keywords: Account vs Campaign vs List Level, Real Limits, and When They Actually Help (2026)',
    description:
      'The three levels PMax negatives apply at, the real 2026 caps, the Search and Shopping boundary, and when Smart Bidding has already done the job for you.',
    images: ['/og/performance-max-negative-keywords.png'],
  },
};

export default function Page() {
  return <ArticleContent />;
}
