import type { Metadata } from 'next';
import ArticleContent from './ArticleContent';

const TITLE = 'ChatGPT Shopping: Get Your Products Listed and Measure It';
const DESCRIPTION =
  'How a Shopify or Google Shopping store gets its products into ChatGPT and AI Mode answers, which feed fixes matter, and how to measure before and after.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: 'https://www.kampaio.com/blog/chatgpt-shopping',
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: 'https://www.kampaio.com/blog/chatgpt-shopping',
    type: 'article',
    images: [
      {
        url: '/og/chatgpt-shopping.png',
        width: 1200,
        height: 630,
        alt: 'ChatGPT Shopping: Get Your Products Listed and Measure It, kampaio.com/blog',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: ['/og/chatgpt-shopping.png'],
  },
};

export default function Page() {
  return <ArticleContent />;
}
