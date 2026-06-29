import type { Metadata } from 'next';
import ArticleContent from './ArticleContent';

export const metadata: Metadata = {
  title: 'Performance Max Optimization: The 7-Lever Playbook (In the Right Order)',
  description: 'A sequenced Performance Max optimization playbook: which of 7 levers to touch first, what to leave alone during learning, and the weekly cadence that beats random tweaking.',
  alternates: {
    canonical: 'https://www.kampaio.com/blog/performance-max-optimization',
  },
  openGraph: {
    title: 'Performance Max Optimization: The 7-Lever Playbook (In the Right Order)',
    description: 'Which of 7 Performance Max levers to touch first, what to leave alone during learning, and the weekly cadence that beats random tweaking.',
    url: 'https://www.kampaio.com/blog/performance-max-optimization',
    type: 'article',
    images: [{ url: '/og/performance-max-optimization.png', width: 1200, height: 630, alt: 'Performance Max Optimization, kampaio.com/blog' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Performance Max Optimization: The 7-Lever Playbook (In the Right Order)',
    description: 'Which of 7 Performance Max levers to touch first, what to leave alone during learning, and the weekly cadence that beats random tweaking.',
    images: ['/og/performance-max-optimization.png'],
  },
};

export default function Page() {
  return <ArticleContent />;
}
