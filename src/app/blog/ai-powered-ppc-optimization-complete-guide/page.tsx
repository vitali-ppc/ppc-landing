import type { Metadata } from 'next';
import ArticleContent from './ArticleContent';

export const metadata: Metadata = {
  title: 'AI-Powered PPC Optimization: The Complete Guide for Senior PPC Managers',
  description: "A senior PPC manager's complete guide to AI-powered PPC optimization. What AI actually decides in Google Ads, the recommendation vs autonomous distinction, an adoption roadmap, and where your judgment still wins.",
  alternates: {
    canonical: 'https://www.kampaio.com/blog/ai-powered-ppc-optimization-complete-guide',
  },
  openGraph: {
    title: 'AI-Powered PPC Optimization: The Complete Guide for Senior PPC Managers',
    description: 'What AI actually decides in Google Ads, recommendation vs autonomous tools, a calibrated adoption roadmap, and where senior PPC judgment still wins.',
    url: 'https://www.kampaio.com/blog/ai-powered-ppc-optimization-complete-guide',
    type: 'article',
    images: [{ url: '/og/ai-powered-ppc-optimization-complete-guide.png', width: 1200, height: 630, alt: 'AI-Powered PPC Optimization: The Complete Guide, kampaio.com/blog' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI-Powered PPC Optimization: The Complete Guide',
    description: 'Senior PPC managers: what AI actually optimizes, recommendation vs autonomous, and where you still win.',
    images: ['/og/ai-powered-ppc-optimization-complete-guide.png'],
  },
};

export default function Page() {
  return <ArticleContent />;
}
