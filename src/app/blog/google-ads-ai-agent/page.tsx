import type { Metadata } from 'next';
import ArticleContent from './ArticleContent';

export const metadata: Metadata = {
  title: 'Google Ads AI Agent: What They Actually Do, Where They Break, and How to Choose (2026)',
  description:
    'A Google Ads AI agent runs campaign tasks autonomously, not just suggests them. We break down what they do, where they fail, Google\'s own agents, and how to pick one.',
  alternates: {
    canonical: 'https://www.kampaio.com/blog/google-ads-ai-agent',
  },
  openGraph: {
    title: 'Google Ads AI Agent: What They Actually Do, Where They Break, and How to Choose (2026)',
    description:
      'A Google Ads AI agent runs campaign tasks autonomously, not just suggests them. We break down what they do, where they fail, Google\'s own agents, and how to pick one.',
    url: 'https://www.kampaio.com/blog/google-ads-ai-agent',
    type: 'article',
    images: [{ url: '/og/google-ads-ai-agent.png', width: 1200, height: 630, alt: 'Google Ads AI Agent, kampaio.com/blog' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Google Ads AI Agent: What They Actually Do, Where They Break, and How to Choose (2026)',
    description:
      'A Google Ads AI agent runs campaign tasks autonomously, not just suggests them. We break down what they do, where they fail, Google\'s own agents, and how to pick one.',
    images: ['/og/google-ads-ai-agent.png'],
  },
};

export default function Page() {
  return <ArticleContent />;
}
