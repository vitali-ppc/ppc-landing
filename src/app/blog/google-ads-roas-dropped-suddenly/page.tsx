import type { Metadata } from 'next';
import ArticleContent from './ArticleContent';

export const metadata: Metadata = {
  title: 'Google Ads ROAS Dropped Suddenly? 8 Diagnostic Steps (2026)',
  description: 'Google Ads ROAS dropped overnight? Most ROAS drops are tracking problems in disguise. An 8-step diagnostic with thresholds and timelines for SMB owners.',
  alternates: {
    canonical: 'https://www.kampaio.com/blog/google-ads-roas-dropped-suddenly',
  },
  openGraph: {
    title: 'Google Ads ROAS Dropped Suddenly: 8 Diagnostic Steps',
    description: 'Most overnight ROAS drops are tracking issues in disguise. 8-step diagnostic with thresholds and timelines, built for SMB owners.',
    url: 'https://www.kampaio.com/blog/google-ads-roas-dropped-suddenly',
    type: 'article',
    images: [{ url: '/logo.png', width: 1200, height: 630, alt: 'B6 PPC Cabinet' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Google Ads ROAS Dropped Suddenly: 8 Diagnostic Steps',
    description: 'Most overnight ROAS drops are tracking issues in disguise. 8-step diagnostic with thresholds and timelines, built for SMB owners.',
    images: ['/logo.png'],
  },
};

export default function Page() {
  return <ArticleContent />;
}
