import type { Metadata } from 'next';
import ArticleContent from './ArticleContent';

export const metadata: Metadata = {
  title: 'Google Ads Cost Per Click Too High: 9 Reasons + Fix Sheet',
  description: 'Your Google Ads CPC is too high because of one of 9 specific causes. Diagnostic table, per-cause fix, and the numbers we cut CPC by on real accounts.',
  alternates: {
    canonical: 'https://www.kampaio.com/blog/google-ads-cost-per-click-too-high',
  },
  openGraph: {
    title: 'Google Ads CPC Too High: 9 Reasons + Fixes',
    description: 'Diagnostic guide for SMBs and PPC managers fighting CPC inflation. 9 root causes, fix sheets, real numbers from B6 client accounts.',
    url: 'https://www.kampaio.com/blog/google-ads-cost-per-click-too-high',
    type: 'article',
    images: [{ url: '/logo.png', width: 1200, height: 630, alt: 'B6 PPC Cabinet' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Google Ads CPC Too High: 9 Reasons + Fixes',
    description: 'Diagnostic guide for SMBs and PPC managers fighting CPC inflation. 9 root causes, fix sheets, real numbers from B6 client accounts.',
    images: ['/logo.png'],
  },
};

export default function Page() {
  return <ArticleContent />;
}
