import type { Metadata } from 'next';
import ArticleContent from './ArticleContent';

// Full editorial title (82 chars) is too long for the SERP once the
// "| Kampaio" template is appended, so `metadata.title` carries a trimmed
// SERP-safe variant. The full title stays on the H1, JSON-LD headline,
// openGraph and twitter titles.
const SEO_TITLE = 'Google Ads Search Terms Report: What It Hides';
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
