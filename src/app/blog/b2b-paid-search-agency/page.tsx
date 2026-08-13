import type { Metadata } from 'next';
import ArticleContent from './ArticleContent';

// Full title (H1, JSON-LD headline, OG/Twitter). 64 chars, too long for the SERP
// once the "| Kampaio" template is appended, so `metadata.title` below is the
// trimmed SERP variant while the human-facing title stays intact everywhere else.
const TITLE = 'B2B Paid Search Agency: How to Tell If Yours Is Actually Working';
const SEO_TITLE = 'B2B Paid Search Agency: Is Yours Actually Working?';
const DESCRIPTION =
  'Every "best B2B paid search agency" list is agencies ranking themselves. Here is the B2B-specific framework: match your evaluation window to your sales cycle, tell signal metrics from vanity ones, and know when the honest answer is in-house or software instead.';
const OG_DESCRIPTION =
  'Match the evaluation window to your sales cycle, tell signal metrics from vanity ones, and know when the honest answer is in-house or software instead.';

export const metadata: Metadata = {
  title: SEO_TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: 'https://www.kampaio.com/blog/b2b-paid-search-agency',
  },
  openGraph: {
    title: TITLE,
    description: OG_DESCRIPTION,
    url: 'https://www.kampaio.com/blog/b2b-paid-search-agency',
    type: 'article',
    images: [
      {
        url: '/og/b2b-paid-search-agency.png',
        width: 1200,
        height: 630,
        alt: 'B2B Paid Search Agency, kampaio.com/blog',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: OG_DESCRIPTION,
    images: ['/og/b2b-paid-search-agency.png'],
  },
};

export default function Page() {
  return <ArticleContent />;
}
