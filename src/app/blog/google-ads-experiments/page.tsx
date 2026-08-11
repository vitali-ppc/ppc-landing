import type { Metadata } from 'next';
import ArticleContent from './ArticleContent';

// SERP title is kept short (47 chars, 57 with the "| Kampaio" template) so Google
// does not truncate it. The full H1 / headline / OG title stays long-form.
export const metadata: Metadata = {
  title: 'Google Ads Experiments: A/B Tests You Can Trust',
  description:
    'How to set up Google Ads Experiments, pick a split ratio and duration, read the significance readout (including the new Experiment Power score), and know when your traffic is too low to trust it.',
  alternates: {
    canonical: 'https://www.kampaio.com/blog/google-ads-experiments',
  },
  openGraph: {
    title: 'Google Ads Experiments: How to Run an A/B Test You Can Actually Trust',
    description:
      'How to set up Google Ads Experiments, pick a split ratio and duration, read the significance readout (including the new Experiment Power score), and know when your traffic is too low to trust it.',
    url: 'https://www.kampaio.com/blog/google-ads-experiments',
    type: 'article',
    images: [
      {
        url: '/og/google-ads-experiments.png',
        width: 1200,
        height: 630,
        alt: 'Google Ads Experiments: How to Run an A/B Test You Can Actually Trust, kampaio.com/blog',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Google Ads Experiments: How to Run an A/B Test You Can Actually Trust',
    description:
      'Split ratio, duration, and how to read the p-value, margin of error, and the new Experiment Power score before you spend 4 to 6 weeks on a test.',
    images: ['/og/google-ads-experiments.png'],
  },
};

export default function Page() {
  return <ArticleContent />;
}
