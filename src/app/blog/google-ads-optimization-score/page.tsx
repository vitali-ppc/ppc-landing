import type { Metadata } from 'next';
import ArticleContent from './ArticleContent';

export const metadata: Metadata = {
  title: "Google Ads Optimization Score: What's a Good Score, and Should You Chase 100%?",
  description:
    "Google Ads optimization score measures how many recommendations you've applied, not how well your account performs. Here's what a good score actually is, and why chasing 100% can raise your CPCs and hurt ROAS.",
  alternates: {
    canonical: 'https://www.kampaio.com/blog/google-ads-optimization-score',
  },
  openGraph: {
    title: "Google Ads Optimization Score: What's a Good Score, and Should You Chase 100%?",
    description:
      "Optimization score tracks recommendation adoption, not results. What a good score really is, and why chasing 100% can raise CPCs and hurt ROAS.",
    url: 'https://www.kampaio.com/blog/google-ads-optimization-score',
    type: 'article',
    images: [
      {
        url: '/og/google-ads-optimization-score.png',
        width: 1200,
        height: 630,
        alt: 'Google Ads Optimization Score, kampaio.com/blog',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Google Ads Optimization Score: What's a Good Score, and Should You Chase 100%?",
    description:
      "Optimization score tracks recommendation adoption, not results. What a good score really is, and why chasing 100% can raise CPCs and hurt ROAS.",
    images: ['/og/google-ads-optimization-score.png'],
  },
};

export default function Page() {
  return <ArticleContent />;
}
