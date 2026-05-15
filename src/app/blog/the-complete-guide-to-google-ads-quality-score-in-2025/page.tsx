import type { Metadata } from 'next';
import ArticleContent from './ArticleContent';

export const metadata: Metadata = {
  title: 'The Complete Guide to Google Ads Quality Score in 2026',
  description: 'Master the fundamentals of Quality Score and learn advanced techniques to improve your ad performance.',
  alternates: {
    canonical: 'https://www.kampaio.com/blog/the-complete-guide-to-google-ads-quality-score-in-2025',
  },
  openGraph: {
    title: 'The Complete Guide to Google Ads Quality Score in 2026',
    description: 'Master Quality Score fundamentals and learn advanced techniques to improve your Google Ads performance in 2026.',
    url: 'https://www.kampaio.com/blog/the-complete-guide-to-google-ads-quality-score-in-2025',
    type: 'article',
    images: [{ url: '/og/the-complete-guide-to-google-ads-quality-score-in-2025.png', width: 1200, height: 630, alt: 'The Complete Guide To Google Ads Quality Score In 2025, kampaio.com/blog' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Complete Guide to Google Ads Quality Score in 2026',
    description: 'Master Quality Score fundamentals and learn advanced techniques to improve your Google Ads performance in 2026.',
    images: ['/og/the-complete-guide-to-google-ads-quality-score-in-2025.png'],
  },
};

export default function Page() {
  return <ArticleContent />;
}
