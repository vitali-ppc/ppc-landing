import type { Metadata } from 'next';
import ArticleContent from './ArticleContent';

export const metadata: Metadata = {
  title: 'The Complete Guide to Google Ads Quality Score in 2025',
  description: 'Master the fundamentals of Quality Score and learn advanced techniques to improve your ad performance.',
  alternates: {
    canonical: 'https://www.kampaio.com/blog/the-complete-guide-to-google-ads-quality-score-in-2025',
  },
  openGraph: {
    title: 'The Complete Guide to Google Ads Quality Score in 2025',
    description: 'Master Quality Score fundamentals and learn advanced techniques to improve your Google Ads performance in 2025.',
    url: 'https://www.kampaio.com/blog/the-complete-guide-to-google-ads-quality-score-in-2025',
    type: 'article',
    images: [{ url: '/logo.png', width: 1200, height: 630, alt: 'B6 PPC Cabinet' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Complete Guide to Google Ads Quality Score in 2025',
    description: 'Master Quality Score fundamentals and learn advanced techniques to improve your Google Ads performance in 2025.',
    images: ['/logo.png'],
  },
};

export default function Page() {
  return <ArticleContent />;
}
