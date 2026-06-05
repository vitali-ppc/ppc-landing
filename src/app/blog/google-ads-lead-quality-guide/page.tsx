import type { Metadata } from 'next';
import ArticleContent from './ArticleContent';

export const metadata: Metadata = {
  title: 'How to Improve Lead Quality in Google Ads (Complete 2026 Guide)',
  description: 'Google Ads sending leads that sales rejects? This guide covers what a qualified lead is, how to measure the gap, why quality drops, and the levers that fix it.',
  alternates: {
    canonical: 'https://www.kampaio.com/blog/google-ads-lead-quality-guide',
  },
  openGraph: {
    title: 'How to Improve Lead Quality in Google Ads (Complete 2026 Guide)',
    description: 'What a qualified lead is, how to measure the gap between dashboard and CRM, why quality drops, and the six levers that fix it.',
    url: 'https://www.kampaio.com/blog/google-ads-lead-quality-guide',
    type: 'article',
    images: [{ url: '/og/google-ads-lead-quality-guide.png', width: 1200, height: 630, alt: 'How to Improve Lead Quality in Google Ads, kampaio.com/blog' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How to Improve Lead Quality in Google Ads (Complete 2026 Guide)',
    description: 'What a qualified lead is, how to measure the gap between dashboard and CRM, why quality drops, and the six levers that fix it.',
    images: ['/og/google-ads-lead-quality-guide.png'],
  },
};

export default function Page() {
  return <ArticleContent />;
}
