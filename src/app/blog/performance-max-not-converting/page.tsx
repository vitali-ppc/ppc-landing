import type { Metadata } from 'next';
import ArticleContent from './ArticleContent';

export const metadata: Metadata = {
  title: 'Performance Max Not Converting? 9 Fixes That Work (2026)',
  description: 'Performance Max burning budget without conversions? 9 diagnostic steps from conversion tracking to bid strategy to landing pages, with thresholds and timelines.',
  alternates: {
    canonical: 'https://www.kampaio.com/blog/performance-max-not-converting',
  },
  openGraph: {
    title: 'Performance Max Not Converting: 9 Fixes That Work',
    description: '9 diagnostic steps for Performance Max that burns budget without converting: tracking, bid strategy, landing pages, with thresholds and timelines.',
    url: 'https://www.kampaio.com/blog/performance-max-not-converting',
    type: 'article',
    images: [{ url: '/og/performance-max-not-converting.png', width: 1200, height: 630, alt: 'Performance Max Not Converting , kampaio.com/blog' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Performance Max Not Converting: 9 Fixes That Work',
    description: '9 diagnostic steps for Performance Max that burns budget without converting: tracking, bid strategy, landing pages, with thresholds and timelines.',
    images: ['/og/performance-max-not-converting.png'],
  },
};

export default function Page() {
  return <ArticleContent />;
}
