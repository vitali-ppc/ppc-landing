import type { Metadata } from 'next';
import ArticleContent from './ArticleContent';

// Two titles on purpose. The full editorial title (82 chars) is too long for
// the SERP, so `metadata.title` carries a shorter, query-led variant; the full
// title stays on the H1, JSON-LD headline, openGraph and twitter titles.
// Measured 2026-08-31 on the live page: article titles render WITHOUT the root
// layout's "| Kampaio" template (src/app/blog/layout.tsx sets a plain-string
// title, which stops the template propagating), so the budget here is the full
// 60 chars, not 50. The earlier note in this spot claimed the suffix was
// appended and cost the page ~10 characters of SERP wording that never existed.
// SERP title retargeted 2026-08-31 (Argus F2): the page was titled for
// "google ads search terms report" (pos 31.1, 7 impressions) while the demand
// it actually receives is the hidden-terms cluster - "uncategorised search
// terms" 32 impressions at position 20.1, plus ~44 more across the
// "total: search terms" variants at 12-14. Body already answers it (see the
// "two total rows" section, flag #67).
const SEO_TITLE = 'Uncategorised Search Terms in Google Ads: What\'s Hidden';
const FULL_TITLE =
  'Google Ads Search Terms Report: What It Shows, What It Hides, and How to Act On It';
const DESCRIPTION =
  'The Google Ads search terms report shows the real queries behind your clicks, but Google withholds a chunk of them. How to read the report, what is hidden and why, and a framework for turning any term into a negative, a new keyword, or a wait-and-see.';

export const metadata: Metadata = {
  title: SEO_TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: 'https://www.kampaio.com/blog/google-ads-search-terms-report',
  },
  openGraph: {
    title: FULL_TITLE,
    description: DESCRIPTION,
    url: 'https://www.kampaio.com/blog/google-ads-search-terms-report',
    type: 'article',
    images: [
      {
        url: '/og/google-ads-search-terms-report.png',
        width: 1200,
        height: 630,
        alt: 'Google Ads Search Terms Report, kampaio.com/blog',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: FULL_TITLE,
    description: DESCRIPTION,
    images: ['/og/google-ads-search-terms-report.png'],
  },
};

export default function Page() {
  return <ArticleContent />;
}
