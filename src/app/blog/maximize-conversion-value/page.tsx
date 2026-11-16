import type { Metadata } from 'next';
import ArticleContent from './ArticleContent';

const TITLE = 'Maximize Conversion Value: Which Client Accounts Should Use It';
// SERP title: the layout template appends " | Kampaio", so the full title (62 chars) is
// shortened here only. H1, JSON-LD headline, Open Graph and Twitter keep the full title.
const SEO_TITLE = 'Maximize Conversion Value: Which Accounts Fit';
const DESCRIPTION =
  'Maximize conversion value fits some client accounts and wrecks others. A three-gate test for agencies, with the accounts to move, keep and graduate.';

export const metadata: Metadata = {
  title: SEO_TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: 'https://www.kampaio.com/blog/maximize-conversion-value',
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: 'https://www.kampaio.com/blog/maximize-conversion-value',
    type: 'article',
    images: [
      {
        url: '/og/maximize-conversion-value.png',
        width: 1200,
        height: 630,
        alt: 'Maximize Conversion Value: Which Client Accounts Should Use It, kampaio.com/blog',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: ['/og/maximize-conversion-value.png'],
  },
};

export default function Page() {
  return <ArticleContent />;
}
