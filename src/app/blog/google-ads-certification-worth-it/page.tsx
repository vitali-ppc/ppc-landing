import type { Metadata } from 'next';
import ArticleContent from './ArticleContent';

// SERP title is kept short (Google truncates past ~60 chars, and the root layout
// appends " | Kampaio"). The full title stays on the H1, JSON-LD headline, and OG.
export const metadata: Metadata = {
  title: 'Is Google Ads Certification Worth It?',
  description:
    "Is Google Ads certification worth it? What the exam actually proves, what it doesn't, the Google Partner angle, and what to check instead when hiring a PPC person.",
  alternates: {
    canonical: 'https://www.kampaio.com/blog/google-ads-certification-worth-it',
  },
  openGraph: {
    title: "Is Google Ads Certification Worth It? What It Proves (and What It Doesn't)",
    description:
      "What the exam actually proves, what it doesn't, the Google Partner badge angle, and the four things to check instead when hiring a PPC person.",
    url: 'https://www.kampaio.com/blog/google-ads-certification-worth-it',
    type: 'article',
    images: [
      {
        url: '/og/google-ads-certification-worth-it.png',
        width: 1200,
        height: 630,
        alt: 'Is Google Ads Certification Worth It, kampaio.com/blog',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Is Google Ads Certification Worth It? What It Proves (and What It Doesn't)",
    description:
      "What the exam actually proves, what it doesn't, the Google Partner badge angle, and the four things to check instead when hiring a PPC person.",
    images: ['/og/google-ads-certification-worth-it.png'],
  },
};

export default function Page() {
  return <ArticleContent />;
}
