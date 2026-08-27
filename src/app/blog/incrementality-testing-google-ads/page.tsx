import type { Metadata } from 'next';
import ArticleContent from './ArticleContent';

export const metadata: Metadata = {
  title: 'Incrementality Testing in Google Ads: Causal Lift, Not Last-Click',
  description: 'Incrementality testing in Google Ads measures the true causal lift of your ads versus a no-ad control group. Covers Conversion Lift, geo-lift, the November 2025 $5K minimum spend update, common pitfalls, and how lift findings should retune Smart Bidding.',
  alternates: {
    canonical: 'https://www.kampaio.com/blog/incrementality-testing-google-ads',
  },
  openGraph: {
    title: 'Incrementality Testing in Google Ads: What It Measures and How to Run One',
    description: 'Conversion Lift, geo experiments, the $5K minimum, design pitfalls, and how to feed lift findings back into Smart Bidding. Technical guide for Senior PPC Managers.',
    url: 'https://www.kampaio.com/blog/incrementality-testing-google-ads',
    type: 'article',
    images: [{ url: '/og/incrementality-testing-google-ads.png', width: 1200, height: 630, alt: 'Incrementality Testing in Google Ads , kampaio.com/blog' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Incrementality Testing in Google Ads: Causal Lift, Not Last-Click',
    description: 'Conversion Lift, geo experiments, the $5K minimum, design pitfalls, and how to feed lift findings back into Smart Bidding. Technical guide for Senior PPC Managers.',
    images: ['/og/incrementality-testing-google-ads.png'],
  },
};

export default function Page() {
  return <ArticleContent />;
}
