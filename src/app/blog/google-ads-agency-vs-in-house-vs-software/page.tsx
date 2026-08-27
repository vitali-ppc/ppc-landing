import type { Metadata } from 'next';
import ArticleContent from './ArticleContent';

export const metadata: Metadata = {
  title: 'Google Ads Agency vs In-House vs Software: Which Is Right for You?',
  description: 'A neutral 3-way comparison of running Google Ads via an agency, an in-house team, or self-serve software. Real US costs, control and effort tradeoffs, and a spend-based verdict for each path.',
  alternates: {
    canonical: 'https://www.kampaio.com/blog/google-ads-agency-vs-in-house-vs-software',
  },
  openGraph: {
    title: 'Google Ads Agency vs In-House vs Software: Which Is Right for Your Budget?',
    description: 'A neutral 3-way comparison: agency vs in-house vs software for Google Ads. Real US costs, control and effort tradeoffs, and a spend-based verdict per path.',
    url: 'https://www.kampaio.com/blog/google-ads-agency-vs-in-house-vs-software',
    type: 'article',
    images: [{ url: '/blog/google-ads-agency-vs-in-house-vs-software/opengraph-image', width: 1200, height: 630, alt: 'Google Ads Agency vs In-House vs Software, kampaio.com/blog' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Google Ads Agency vs In-House vs Software: Which Is Right for You?',
    description: 'A neutral 3-way comparison: agency vs in-house vs software for Google Ads. Real US costs, control and effort tradeoffs, and a spend-based verdict per path.',
    images: ['/blog/google-ads-agency-vs-in-house-vs-software/opengraph-image'],
  },
};

export default function Page() {
  return <ArticleContent />;
}
