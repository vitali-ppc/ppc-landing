import type { Metadata } from 'next';
import ArticleContent from './ArticleContent';

export const metadata: Metadata = {
  title: 'AI-Powered PPC Platform: How to Evaluate One Before You Buy (2026)',
  description:
    'What actually separates an AI-powered PPC platform from a chatbot with a dashboard, the evaluation criteria that matter, and where kampaio fits, grounded in real 2026 practitioner discussion.',
  alternates: {
    canonical: 'https://www.kampaio.com/blog/ai-powered-ppc-platform',
  },
  openGraph: {
    title: 'AI-Powered PPC Platform: How to Evaluate One Before You Buy (2026)',
    description:
      'What separates an AI-powered PPC platform from a chatbot with a dashboard: the read/write fork, product-neutral evaluation criteria, and a 20-minute checklist.',
    url: 'https://www.kampaio.com/blog/ai-powered-ppc-platform',
    type: 'article',
    images: [
      {
        url: '/og/ai-powered-ppc-platform.png',
        width: 1200,
        height: 630,
        alt: 'AI-Powered PPC Platform: How to Evaluate One Before You Buy, kampaio.com/blog',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI-Powered PPC Platform: How to Evaluate One Before You Buy (2026)',
    description:
      'What separates an AI-powered PPC platform from a chatbot with a dashboard: the read/write fork, product-neutral evaluation criteria, and a 20-minute checklist.',
    images: ['/og/ai-powered-ppc-platform.png'],
  },
};

export default function Page() {
  return <ArticleContent />;
}
