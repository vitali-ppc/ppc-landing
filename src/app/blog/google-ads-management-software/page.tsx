import type { Metadata } from 'next';
import ArticleContent from './ArticleContent';

export const metadata: Metadata = {
  title: "Google Ads Management Software: A Neutral Buyer's Guide (2026)",
  description:
    'How to choose Google Ads management software without the vendor hype: the 4 tool categories, a 6-criterion scorecard, an affordability-by-ad-spend matrix, and what 107 practitioners say.',
  alternates: {
    canonical: 'https://www.kampaio.com/blog/google-ads-management-software',
  },
  openGraph: {
    title: "Google Ads Management Software: A Neutral Buyer's Guide (2026)",
    description:
      'The 4 tool categories, a 6-criterion scorecard, and an affordability-by-ad-spend matrix for choosing Google Ads management software. Built for PPC managers who need a defensible pick.',
    url: 'https://www.kampaio.com/blog/google-ads-management-software',
    type: 'article',
    images: [
      {
        url: '/og/google-ads-management-software.png',
        width: 1200,
        height: 630,
        alt: 'Google Ads Management Software buyer guide, kampaio.com/blog',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Google Ads Management Software: A Neutral Buyer's Guide (2026)",
    description:
      'The 4 tool categories, a 6-criterion scorecard, and an affordability-by-ad-spend matrix for choosing Google Ads management software.',
    images: ['/og/google-ads-management-software.png'],
  },
};

export default function Page() {
  return <ArticleContent />;
}
