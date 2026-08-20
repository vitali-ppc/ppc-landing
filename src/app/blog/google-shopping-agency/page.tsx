import type { Metadata } from 'next';
import ArticleContent from './ArticleContent';

// Full title (H1, JSON-LD headline, OG/Twitter). 69 chars, too long for the SERP
// once the "| Kampaio" template is appended, so `metadata.title` below is the
// trimmed SERP variant while the human-facing title stays intact everywhere else.
const TITLE = 'Google Shopping Agency: Should You Hire One, or Run Shopping Yourself?';
const SEO_TITLE = 'Google Shopping Agency: Hire One or Run It Yourself?';
const DESCRIPTION =
  'Should you hire a Google Shopping agency or run Shopping yourself? Real fees, the Merchant Center workload nobody prices in, and when hiring pays off.';
const OG_DESCRIPTION =
  'Real Shopping agency fees, the Merchant Center workload nobody prices into the retainer, and the four ownership models that decide who should run it.';

export const metadata: Metadata = {
  title: SEO_TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: 'https://www.kampaio.com/blog/google-shopping-agency',
  },
  openGraph: {
    title: TITLE,
    description: OG_DESCRIPTION,
    url: 'https://www.kampaio.com/blog/google-shopping-agency',
    type: 'article',
    images: [
      {
        url: '/og/google-shopping-agency.png',
        width: 1200,
        height: 630,
        alt: 'Google Shopping Agency, kampaio.com/blog',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: OG_DESCRIPTION,
    images: ['/og/google-shopping-agency.png'],
  },
};

export default function Page() {
  return <ArticleContent />;
}
