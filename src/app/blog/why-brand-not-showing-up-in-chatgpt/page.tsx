import type { Metadata } from 'next';
import ArticleContent from './ArticleContent';

export const metadata: Metadata = {
  title: 'Why Isn\'t My Brand Showing Up in ChatGPT? (How to Diagnose It)',
  description: 'Your brand ranks on Google but never appears in ChatGPT answers? Here are the real root causes and a step-by-step way to diagnose which one is yours.',
  alternates: {
    canonical: 'https://www.kampaio.com/blog/why-brand-not-showing-up-in-chatgpt',
  },
  openGraph: {
    title: 'Why Isn\'t My Brand Showing Up in ChatGPT? (How to Diagnose It)',
    description: 'Ranking on Google does not buy AI visibility. The root causes behind brand invisibility in ChatGPT, Gemini, and Perplexity, plus a step-by-step diagnosis.',
    url: 'https://www.kampaio.com/blog/why-brand-not-showing-up-in-chatgpt',
    type: 'article',
    images: [{ url: '/og/why-brand-not-showing-up-in-chatgpt.png', width: 1200, height: 630, alt: 'Why Brand Not Showing Up In ChatGPT, kampaio.com/blog' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Why Isn\'t My Brand Showing Up in ChatGPT? (How to Diagnose It)',
    description: 'Ranking on Google does not buy AI visibility. The root causes behind brand invisibility in ChatGPT, plus a step-by-step diagnosis.',
    images: ['/og/why-brand-not-showing-up-in-chatgpt.png'],
  },
};

export default function Page() {
  return <ArticleContent />;
}
