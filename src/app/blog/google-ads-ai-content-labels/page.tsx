import type { Metadata } from 'next';
import ArticleContent from './ArticleContent';

export const metadata: Metadata = {
  title: 'Google Ads AI Content Labels: What to Do Now',
  description:
    'Google is rolling out AI content labels across five ad platforms in July 2026. See whether you must label your assets, the exact Asset Studio click path, and what it means for your QA process.',
  alternates: {
    canonical: 'https://www.kampaio.com/blog/google-ads-ai-content-labels',
  },
  openGraph: {
    title: 'Google Ads AI Content Labels: What Changed in July 2026 and What You Must Do',
    description:
      'Google is rolling out AI content labels across five ad platforms in July 2026. See whether you must label your assets, the exact Asset Studio click path, and what it means for your QA process.',
    url: 'https://www.kampaio.com/blog/google-ads-ai-content-labels',
    type: 'article',
    images: [
      {
        url: '/og/google-ads-ai-content-labels.png',
        width: 1200,
        height: 630,
        alt: 'Google Ads AI content labels, kampaio.com/blog',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Google Ads AI Content Labels: What Changed in July 2026 and What You Must Do',
    description:
      'Google is rolling out AI content labels across five ad platforms in July 2026. See whether you must label your assets, the exact Asset Studio click path, and what it means for your QA process.',
    images: ['/og/google-ads-ai-content-labels.png'],
  },
};

export default function Page() {
  return <ArticleContent />;
}
