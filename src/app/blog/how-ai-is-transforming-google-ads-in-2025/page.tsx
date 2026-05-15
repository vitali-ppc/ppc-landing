import type { Metadata } from 'next';
import ArticleContent from './ArticleContent';

export const metadata: Metadata = {
  title: 'How AI is Transforming Google Ads in 2025',
  description: 'The new rules of PPC: smarter bidding, better targeting, automated creativity. The 5 biggest AI-driven changes in Google Ads for 2025, and how to stay ahead.',
  alternates: {
    canonical: 'https://www.kampaio.com/blog/how-ai-is-transforming-google-ads-in-2025',
  },
  openGraph: {
    title: 'How AI is Transforming Google Ads in 2025',
    description: 'The 5 biggest AI-driven changes in Google Ads for 2025: smarter bidding, better targeting, automated creativity, and how to stay ahead.',
    url: 'https://www.kampaio.com/blog/how-ai-is-transforming-google-ads-in-2025',
    type: 'article',
    images: [{ url: '/og/how-ai-is-transforming-google-ads-in-2025.png', width: 1200, height: 630, alt: 'How Ai Is Transforming Google Ads In 2025, kampaio.com/blog' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How AI is Transforming Google Ads in 2025',
    description: 'The 5 biggest AI-driven changes in Google Ads for 2025: smarter bidding, better targeting, automated creativity, and how to stay ahead.',
    images: ['/og/how-ai-is-transforming-google-ads-in-2025.png'],
  },
};

export default function Page() {
  return <ArticleContent />;
}
