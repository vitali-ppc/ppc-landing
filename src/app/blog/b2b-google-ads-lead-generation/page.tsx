import type { Metadata } from 'next';
import ArticleContent from './ArticleContent';

export const metadata: Metadata = {
  title: 'B2B Google Ads Lead Generation: How to Build a Campaign That Feeds the Pipeline',
  description: 'B2B Google Ads requires a different structure than B2C. Here is how to set up campaigns, conversion tracking, and bidding for long sales cycles that actually produce qualified pipeline.',
  alternates: {
    canonical: 'https://www.kampaio.com/blog/b2b-google-ads-lead-generation',
  },
  openGraph: {
    title: 'B2B Google Ads Lead Generation: How to Build a Campaign That Feeds the Pipeline',
    description: 'B2B Google Ads requires a different structure than B2C. Here is how to set up campaigns, conversion tracking, and bidding for long sales cycles that actually produce qualified pipeline.',
    url: 'https://www.kampaio.com/blog/b2b-google-ads-lead-generation',
    type: 'article',
    images: [{ url: '/og/b2b-google-ads-lead-generation.png', width: 1200, height: 630, alt: 'B2B Google Ads Lead Generation, kampaio.com/blog' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'B2B Google Ads Lead Generation: How to Build a Campaign That Feeds the Pipeline',
    description: 'B2B Google Ads requires a different structure than B2C. Here is how to set up campaigns, conversion tracking, and bidding for long sales cycles that actually produce qualified pipeline.',
    images: ['/og/b2b-google-ads-lead-generation.png'],
  },
};

export default function Page() {
  return <ArticleContent />;
}
