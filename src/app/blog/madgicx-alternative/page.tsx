import type { Metadata } from 'next';
import ArticleContent from './ArticleContent';

export const metadata: Metadata = {
  title: 'Madgicx Alternatives 2026: Meta vs Google Ads',
  description:
    'Madgicx only manages Meta ads. Compare Bïrch, AdEspresso, Smartly.io and Triple Whale on verified 2026 pricing, plus what to use if your problem is Google Ads.',
  alternates: {
    canonical: 'https://www.kampaio.com/blog/madgicx-alternative',
  },
  openGraph: {
    title: 'Madgicx Alternatives 2026: Real Meta Options, Plus the Google Ads Gap',
    description:
      'Madgicx only manages Meta ads. Compare Bïrch, AdEspresso, Smartly.io and Triple Whale on verified 2026 pricing, plus what to use if your problem is Google Ads.',
    url: 'https://www.kampaio.com/blog/madgicx-alternative',
    type: 'article',
    images: [
      {
        url: '/og/madgicx-alternative.png',
        width: 1200,
        height: 630,
        alt: 'Madgicx Alternatives 2026: Real Meta Options, Plus the Google Ads Gap, kampaio.com/blog',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Madgicx Alternatives 2026: Real Meta Options, Plus the Google Ads Gap',
    description:
      'Verified 2026 pricing for Bïrch, AdEspresso, Smartly.io and Triple Whale, and why none of them (or Madgicx) touch Google Search, Shopping or Performance Max.',
    images: ['/og/madgicx-alternative.png'],
  },
};

export default function Page() {
  return <ArticleContent />;
}
