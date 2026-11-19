import type { Metadata } from 'next';
import ArticleContent from './ArticleContent';

// The full title is 74 characters; Google cuts the SERP title near 60, and the root layout
// appends " | Kampaio". The full title stays on the H1, the JSON-LD headline and social cards.
const SEO_TITLE = 'Google Ads Scripts: Which to Run and When to Skip';
const TITLE = 'Google Ads Scripts: Which Ones to Run, and When a Script Is the Wrong Tool';
const DESCRIPTION =
  'Google Ads scripts explained, plus a decision grid: scripts vs automated rules vs a dashboard, which scripts earn a slot, and when to skip them.';

export const metadata: Metadata = {
  title: SEO_TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: 'https://www.kampaio.com/blog/google-ads-scripts',
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: 'https://www.kampaio.com/blog/google-ads-scripts',
    type: 'article',
    images: [
      {
        url: '/og/google-ads-scripts.png',
        width: 1200,
        height: 630,
        alt: 'Google Ads Scripts: Which Ones to Run, and When a Script Is the Wrong Tool, kampaio.com/blog',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: ['/og/google-ads-scripts.png'],
  },
};

export default function Page() {
  return <ArticleContent />;
}
