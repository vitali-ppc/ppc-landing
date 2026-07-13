import type { Metadata } from 'next';
import ArticleContent from './ArticleContent';

export const metadata: Metadata = {
  title: 'ChatGPT for Google Ads: What It Does Well, Where It Falls Short (Honest 2026 Guide)',
  description:
    "ChatGPT is a strong copilot for Google Ads copy, keywords, and reporting, but it can't see your account or make safe changes. Here's what it does well, where it fails, and the prompts that actually work.",
  alternates: {
    canonical: 'https://www.kampaio.com/blog/chatgpt-google-ads',
  },
  openGraph: {
    title: 'ChatGPT for Google Ads: What It Does Well, Where It Falls Short (Honest 2026 Guide)',
    description:
      "ChatGPT is a strong copilot for Google Ads copy, keywords, and reporting, but it can't see your account or make safe changes. What it does well, where it fails, and the prompts that work.",
    url: 'https://www.kampaio.com/blog/chatgpt-google-ads',
    type: 'article',
    images: [
      {
        url: '/og/chatgpt-google-ads.png',
        width: 1200,
        height: 630,
        alt: 'ChatGPT for Google Ads, kampaio.com/blog',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ChatGPT for Google Ads: What It Does Well, Where It Falls Short (Honest 2026 Guide)',
    description:
      "ChatGPT is a strong copilot for Google Ads copy, keywords, and reporting, but it can't see your account or make safe changes.",
    images: ['/og/chatgpt-google-ads.png'],
  },
};

export default function Page() {
  return <ArticleContent />;
}
