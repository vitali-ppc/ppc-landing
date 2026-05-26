import type { Metadata } from 'next';
import ArticleContent from './ArticleContent';

export const metadata: Metadata = {
  title: 'Google Ads Display Network Wasted Spend: How to Stop the Bleeding (2026)',
  description:
    'Display Network silently drains 20-60% of Google Ads budgets on low-intent traffic. Here is how to identify, audit, and shut it off in 60 seconds, plus when Display is actually worth running.',
  alternates: {
    canonical: 'https://www.kampaio.com/blog/google-ads-display-network-wasted-spend',
  },
  openGraph: {
    title: 'Google Ads Display Network Wasted Spend: How to Stop the Bleeding (2026)',
    description:
      'Display Network silently drains 20-60% of Google Ads budgets. Find the leak, run a 5-minute audit, and turn off Display in 60 seconds. Plus Display Expansion and the honest cases when Display works.',
    url: 'https://www.kampaio.com/blog/google-ads-display-network-wasted-spend',
    type: 'article',
    images: [
      {
        url: '/og/google-ads-display-network-wasted-spend.png',
        width: 1200,
        height: 630,
        alt: 'Google Ads Display Network Wasted Spend, kampaio.com/blog',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Google Ads Display Network Wasted Spend: How to Stop the Bleeding (2026)',
    description:
      'Display Network silently drains 20-60% of Google Ads budgets. The 60-second fix, the audit, and the smaller settings that keep leaking after the obvious checkbox.',
    images: ['/og/google-ads-display-network-wasted-spend.png'],
  },
};

export default function Page() {
  return <ArticleContent />;
}
