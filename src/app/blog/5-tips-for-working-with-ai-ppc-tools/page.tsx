import type { Metadata } from 'next';
import ArticleContent from './ArticleContent';

export const metadata: Metadata = {
  title: '5 Tips for Working with AI-Powered PPC Tools',
  description: 'Unlock the full potential of AI in your PPC campaigns with these 5 actionable tips for marketers and advertisers.',
  alternates: {
    canonical: 'https://www.kampaio.com/blog/5-tips-for-working-with-ai-ppc-tools',
  },
  openGraph: {
    title: '5 Tips for Working with AI-Powered PPC Tools',
    description: 'Unlock the full potential of AI in your PPC campaigns with 5 actionable tips for marketers and advertisers.',
    url: 'https://www.kampaio.com/blog/5-tips-for-working-with-ai-ppc-tools',
    type: 'article',
    images: [{ url: '/logo.png', width: 1200, height: 630, alt: 'B6 PPC Cabinet' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '5 Tips for Working with AI-Powered PPC Tools',
    description: 'Unlock the full potential of AI in your PPC campaigns with 5 actionable tips for marketers and advertisers.',
    images: ['/logo.png'],
  },
};

export default function Page() {
  return <ArticleContent />;
}
