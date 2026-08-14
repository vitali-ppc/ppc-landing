import type { Metadata } from 'next';
import ArticleContent from './ArticleContent';

export const metadata: Metadata = {
  title: 'Using AI for PPC: 5 Tips for Better Campaigns',
  description: 'Five practical tips for using AI in PPC: set clear goals, feed it clean data, and validate what it recommends before you trust it.',
  alternates: {
    canonical: 'https://www.kampaio.com/blog/5-tips-for-working-with-ai-ppc-tools',
  },
  openGraph: {
    title: 'Using AI for PPC: 5 Tips for Better Campaigns',
    description: 'Five practical tips for using AI in PPC: set clear goals, feed it clean data, and validate what it recommends before you trust it.',
    url: 'https://www.kampaio.com/blog/5-tips-for-working-with-ai-ppc-tools',
    type: 'article',
    images: [{ url: '/og/5-tips-for-working-with-ai-ppc-tools.png', width: 1200, height: 630, alt: '5 Tips For Working With Ai Ppc Tools, kampaio.com/blog' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Using AI for PPC: 5 Tips for Better Campaigns',
    description: 'Five practical tips for using AI in PPC: set clear goals, feed it clean data, and validate what it recommends before you trust it.',
    images: ['/og/5-tips-for-working-with-ai-ppc-tools.png'],
  },
};

export default function Page() {
  return <ArticleContent />;
}
