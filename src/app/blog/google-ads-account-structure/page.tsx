import type { Metadata } from 'next';
import ArticleContent from './ArticleContent';

const FULL_TITLE =
  'Google Ads Account Structure: The 2026 Setup Guide (Plus the 5-Minute Audit That Shows If Yours Is Quietly Burning Budget)';

const DESCRIPTION =
  'Build a Google Ads account structure that works from day one: three layers, a DTC campaign blueprint, naming conventions, and where AI Max fits in 2026. Then run the 5-minute audit that shows if your current setup is quietly wasting budget.';

export const metadata: Metadata = {
  // Short SERP title (55 chars). The full H1 / og:title / JSON-LD headline stays long.
  title: 'Google Ads Account Structure: Setup + Silent-Leak Audit',
  description: DESCRIPTION,
  alternates: {
    canonical: 'https://www.kampaio.com/blog/google-ads-account-structure',
  },
  openGraph: {
    title: FULL_TITLE,
    description: DESCRIPTION,
    url: 'https://www.kampaio.com/blog/google-ads-account-structure',
    type: 'article',
    images: [
      {
        url: '/og/google-ads-account-structure.png',
        width: 1200,
        height: 630,
        alt: 'Google Ads Account Structure, kampaio.com/blog',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: FULL_TITLE,
    description: DESCRIPTION,
    images: ['/og/google-ads-account-structure.png'],
  },
};

export default function Page() {
  return <ArticleContent />;
}
