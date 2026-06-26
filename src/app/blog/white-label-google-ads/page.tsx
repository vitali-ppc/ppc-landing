import type { Metadata } from 'next';
import ArticleContent from './ArticleContent';

export const metadata: Metadata = {
  title: 'White Label Google Ads: When to Outsource, Hire, or Use Software (A Neutral Decision Guide)',
  description: 'A neutral decision guide for agency owners weighing white label Google Ads vs hiring in-house vs software. The real margin math, provider red flags, and when each model actually wins.',
  alternates: {
    canonical: 'https://www.kampaio.com/blog/white-label-google-ads',
  },
  openGraph: {
    title: 'White Label Google Ads: When to Outsource, Hire, or Use Software',
    description: 'A neutral decision guide for agency owners weighing white label Google Ads vs hiring in-house vs software. The real margin math, provider red flags, and when each model wins.',
    url: 'https://www.kampaio.com/blog/white-label-google-ads',
    type: 'article',
    images: [{ url: '/blog/white-label-google-ads/opengraph-image', width: 1200, height: 630, alt: 'White Label Google Ads, kampaio.com/blog' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'White Label Google Ads: When to Outsource, Hire, or Use Software',
    description: 'A neutral decision guide for agency owners weighing white label Google Ads vs hiring in-house vs software. The real margin math, provider red flags, and when each model wins.',
    images: ['/blog/white-label-google-ads/opengraph-image'],
  },
};

export default function Page() {
  return <ArticleContent />;
}
