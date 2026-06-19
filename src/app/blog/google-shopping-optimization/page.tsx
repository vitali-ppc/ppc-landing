import type { Metadata } from 'next';
import ArticleContent from './ArticleContent';

export const metadata: Metadata = {
  title: 'Google Shopping Optimization: Diagnose First, Fix Second',
  description: 'Most Google Shopping guides jump straight to "optimize your titles." But if your bids are wrong or your campaign structure is broken, feed tweaks won\'t save you. Here\'s a diagnostic-first framework for DTC store owners running their own campaigns.',
  alternates: {
    canonical: 'https://www.kampaio.com/blog/google-shopping-optimization',
  },
  openGraph: {
    title: 'Google Shopping Optimization: Diagnose First, Fix Second',
    description: 'A diagnostic-first framework for Google Shopping: feed quality, bid strategy, campaign structure, and PMax signals. Fix the right lever first.',
    url: 'https://www.kampaio.com/blog/google-shopping-optimization',
    type: 'article',
    images: [{ url: '/og/google-shopping-optimization.png', width: 1200, height: 630, alt: 'Google Shopping Optimization, kampaio.com/blog' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Google Shopping Optimization: Diagnose First, Fix Second',
    description: 'A diagnostic-first framework for Google Shopping: feed quality, bid strategy, campaign structure, and PMax signals. Fix the right lever first.',
    images: ['/og/google-shopping-optimization.png'],
  },
};

export default function Page() {
  return <ArticleContent />;
}
