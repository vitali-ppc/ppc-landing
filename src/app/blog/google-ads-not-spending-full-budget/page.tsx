import type { Metadata } from 'next';
import ArticleContent from './ArticleContent';

export const metadata: Metadata = {
  title: 'Google Ads Not Spending Full Budget? 7 Causes and Fixes',
  description: 'Your Google Ads campaign is not spending its daily budget. The 7 most common causes, how to diagnose each in under 2 minutes, and step-by-step fixes.',
  alternates: {
    canonical: 'https://www.kampaio.com/blog/google-ads-not-spending-full-budget',
  },
  openGraph: {
    title: 'Google Ads Not Spending Budget: 7 Causes and Fixes',
    description: '7 reasons your Google Ads campaign isn\'t spending its daily budget, plus 2-minute diagnostics and step-by-step fixes for each.',
    url: 'https://www.kampaio.com/blog/google-ads-not-spending-full-budget',
    type: 'article',
    images: [{ url: '/og/google-ads-not-spending-full-budget.png', width: 1200, height: 630, alt: 'Google Ads Not Spending Full Budget , kampaio.com/blog' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Google Ads Not Spending Budget: 7 Causes and Fixes',
    description: '7 reasons your Google Ads campaign isn\'t spending its daily budget, plus 2-minute diagnostics and step-by-step fixes for each.',
    images: ['/og/google-ads-not-spending-full-budget.png'],
  },
};

export default function Page() {
  return <ArticleContent />;
}
