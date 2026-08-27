import type { Metadata } from 'next';
import ArticleContent from './ArticleContent';

// Full title (H1, JSON-LD headline, OG/Twitter). 111 chars, too long for the SERP.
const TITLE =
  'Performance Max Single-Conversion-Signal Steering: Why the 2026 LSA Migration Makes It Worse (and How to Fix It)';
// SERP title: 49 chars + " | Kampaio" template = 59, inside the ~60 budget.
const SEO_TITLE = 'Performance Max Single Conversion Signal Steering';
const DESCRIPTION =
  "Performance Max steers on one blended conversion signal. Google's August 2026 LSA migration removes vertical Target CPA. The fix, plus a pre-migration checklist.";

export const metadata: Metadata = {
  title: SEO_TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: 'https://www.kampaio.com/blog/performance-max-single-conversion-signal-steering',
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: 'https://www.kampaio.com/blog/performance-max-single-conversion-signal-steering',
    type: 'article',
    images: [
      {
        url: '/og/performance-max-single-conversion-signal-steering.png',
        width: 1200,
        height: 630,
        alt: 'Performance Max single conversion signal steering, kampaio.com/blog',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: ['/og/performance-max-single-conversion-signal-steering.png'],
  },
};

export default function Page() {
  return <ArticleContent />;
}
