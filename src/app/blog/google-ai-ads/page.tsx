import type { Metadata } from 'next';
import ArticleContent from './ArticleContent';

export const metadata: Metadata = {
  title: 'Google AI Ads: What Google Turned On in Your Account, and What to Keep vs Kill',
  description:
    "Google switched AI on across your ad account: AI Max, ads in AI Overviews and AI Mode, auto-created assets. Here's exactly what each one changes, where the controls are, and our keep-kill-monitor call for every one.",
  alternates: {
    canonical: 'https://www.kampaio.com/blog/google-ai-ads',
  },
  openGraph: {
    title: 'Google AI Ads: What Google Turned On, and What to Keep vs Kill',
    description:
      'Six AI ad features are live in your Google Ads account. One quietly reroutes your budget. A keep, kill, or monitor call for every surface.',
    url: 'https://www.kampaio.com/blog/google-ai-ads',
    type: 'article',
    images: [{ url: '/blog/google-ai-ads/opengraph-image', width: 1200, height: 630, alt: 'Google AI Ads, kampaio.com/blog' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Google AI Ads: What Google Turned On, and What to Keep vs Kill',
    description:
      'Six AI ad features are live in your Google Ads account. One quietly reroutes your budget. A keep, kill, or monitor call for every surface.',
    images: ['/blog/google-ai-ads/opengraph-image'],
  },
};

export default function Page() {
  return <ArticleContent />;
}
