import type { Metadata } from 'next';
import ArticleContent from './ArticleContent';

export const metadata: Metadata = {
  title: 'Why Performance Max Fails in B2B Marketing',
  description: 'The dirty secret Google won\'t tell you: Performance Max is built for B2C, not B2B. Learn why it fails and get the alternative strategy that actually works.',
  alternates: {
    canonical: 'https://www.kampaio.com/blog/performance-max-problems-b2b-marketing',
  },
  openGraph: {
    title: 'Why Performance Max Fails in B2B Marketing',
    description: 'Performance Max is built for B2C, not B2B. Why it fails for B2B advertisers, plus the alternative strategy that actually works.',
    url: 'https://www.kampaio.com/blog/performance-max-problems-b2b-marketing',
    type: 'article',
    images: [{ url: '/og/performance-max-problems-b2b-marketing.png', width: 1200, height: 630, alt: 'Performance Max Problems B2b Marketing, kampaio.com/blog' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Why Performance Max Fails in B2B Marketing',
    description: 'Performance Max is built for B2C, not B2B. Why it fails for B2B advertisers, plus the alternative strategy that actually works.',
    images: ['/og/performance-max-problems-b2b-marketing.png'],
  },
};

export default function Page() {
  return <ArticleContent />;
}
