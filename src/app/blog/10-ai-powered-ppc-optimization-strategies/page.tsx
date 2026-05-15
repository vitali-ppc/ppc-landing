import type { Metadata } from 'next';
import ArticleContent from './ArticleContent';

export const metadata: Metadata = {
  title: '10 AI-Powered PPC Optimization Strategies That Actually Work',
  description: 'Discover how artificial intelligence is revolutionizing PPC campaigns and learn proven strategies to boost your ROI.',
  alternates: {
    canonical: 'https://www.kampaio.com/blog/10-ai-powered-ppc-optimization-strategies',
  },
  openGraph: {
    title: '10 AI-Powered PPC Optimization Strategies',
    description: 'Discover how AI is revolutionizing PPC campaigns and learn proven strategies to boost your ROI on every spend.',
    url: 'https://www.kampaio.com/blog/10-ai-powered-ppc-optimization-strategies',
    type: 'article',
    images: [{ url: '/logo.png', width: 1200, height: 630, alt: 'B6 PPC Cabinet' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '10 AI-Powered PPC Optimization Strategies',
    description: 'Discover how AI is revolutionizing PPC campaigns and learn proven strategies to boost your ROI on every spend.',
    images: ['/logo.png'],
  },
};

export default function Page() {
  return <ArticleContent />;
}
