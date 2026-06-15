import type { Metadata } from 'next';
import ArticleContent from './ArticleContent';

export const metadata: Metadata = {
  title: 'Google Ads Invalid Traffic & Click Fraud: How to Spot It, Stop It, and Get Refunded (2026)',
  description: 'Suspicious clicks draining your Google Ads budget? Learn how to tell real click fraud from invalid traffic, diagnose it in 5 minutes, claim Google\'s automatic credits, and lock it down with IP and audience exclusions.',
  alternates: {
    canonical: 'https://www.kampaio.com/blog/google-ads-invalid-traffic-click-fraud',
  },
  openGraph: {
    title: 'Google Ads Invalid Traffic & Click Fraud: How to Spot It, Stop It, and Get Refunded (2026)',
    description: 'Tell click fraud from invalid traffic, diagnose it in 5 minutes, claim Google\'s automatic credits, and lock it down with IP and audience exclusions.',
    url: 'https://www.kampaio.com/blog/google-ads-invalid-traffic-click-fraud',
    type: 'article',
    images: [{ url: '/blog/google-ads-invalid-traffic-click-fraud/opengraph-image', width: 1200, height: 630, alt: 'Google Ads Invalid Traffic and Click Fraud, kampaio.com/blog' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Google Ads Invalid Traffic & Click Fraud (2026)',
    description: 'Tell click fraud from invalid traffic, diagnose it in 5 minutes, claim Google\'s automatic credits, and lock it down with IP and audience exclusions.',
    images: ['/blog/google-ads-invalid-traffic-click-fraud/opengraph-image'],
  },
};

export default function Page() {
  return <ArticleContent />;
}
