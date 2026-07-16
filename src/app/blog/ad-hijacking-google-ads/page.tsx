import type { Metadata } from 'next';
import ArticleContent from './ArticleContent';

export const metadata: Metadata = {
  title: 'Ad Hijacking in Google Ads: How to Detect and Stop It',
  description:
    'Ad hijacking is when affiliates or competitors clone your Google Ads and steal your branded clicks. Here is how to detect it in your account today, and shut it down.',
  alternates: {
    canonical: 'https://www.kampaio.com/blog/ad-hijacking-google-ads',
  },
  openGraph: {
    title: 'Ad Hijacking in Google Ads: How to Detect and Stop It',
    description:
      'Affiliates or competitors clone your branded Google Ads and steal your clicks. The 60-second self-check and free-tool detection matrix that shuts it down.',
    url: 'https://www.kampaio.com/blog/ad-hijacking-google-ads',
    type: 'article',
    images: [{ url: '/og/ad-hijacking-google-ads.png', width: 1200, height: 630, alt: 'Ad Hijacking In Google Ads, kampaio.com/blog' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ad Hijacking in Google Ads: How to Detect and Stop It',
    description:
      'Affiliates or competitors clone your branded Google Ads and steal your clicks. The 60-second self-check and free-tool detection matrix that shuts it down.',
    images: ['/og/ad-hijacking-google-ads.png'],
  },
};

export default function Page() {
  return <ArticleContent />;
}
