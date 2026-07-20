import type { Metadata } from 'next';
import ArticleContent from './ArticleContent';

export const metadata: Metadata = {
  title: 'Google Ads AI Max: Should You Turn It On? (2026 Decision Guide)',
  description:
    'Google publishes two different performance numbers for AI Max, and they measure different things. What AI Max actually changes, the verified 2026-2027 migration dates, and when to enable it.',
  alternates: {
    canonical: 'https://www.kampaio.com/blog/google-ads-ai-max',
  },
  openGraph: {
    title: 'Google Ads AI Max: Should You Turn It On? (2026 Decision Guide)',
    description:
      'What AI Max actually changes inside your Search campaigns, what Google’s 14% and 7% figures really measure, the 2026-2027 migration dates, and when to hold off.',
    url: 'https://www.kampaio.com/blog/google-ads-ai-max',
    type: 'article',
    images: [{ url: '/og/google-ads-ai-max.png', width: 1200, height: 630, alt: 'Google Ads AI Max, kampaio.com/blog' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Google Ads AI Max: Should You Turn It On? (2026 Decision Guide)',
    description:
      'What AI Max actually changes inside your Search campaigns, what Google’s 14% and 7% figures really measure, the 2026-2027 migration dates, and when to hold off.',
    images: ['/og/google-ads-ai-max.png'],
  },
};

export default function Page() {
  return <ArticleContent />;
}
