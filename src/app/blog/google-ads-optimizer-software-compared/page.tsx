import type { Metadata } from 'next';
import ArticleContent from './ArticleContent';

export const metadata: Metadata = {
  title: 'Google Ads Optimizer Software, Compared: Do You Actually Need One?',
  description:
    'Optmyzr, TheOptimizer, Google Recommendations and AI-native tools compared, plus how to tell when a Google Ads optimizer beats optimizing manually.',
  alternates: {
    canonical: 'https://www.kampaio.com/blog/google-ads-optimizer-software-compared',
  },
  openGraph: {
    title: 'Google Ads Optimizer Software, Compared: Do You Actually Need One?',
    description:
      'Optimizers split into advisors, rule engines, and AI-native operators. A neutral comparison plus a rule for choosing by how much of the work you want removed.',
    url: 'https://www.kampaio.com/blog/google-ads-optimizer-software-compared',
    type: 'article',
    images: [
      {
        url: '/og/google-ads-optimizer-software-compared.png',
        width: 1200,
        height: 630,
        alt: 'Google Ads Optimizer Software Compared, kampaio.com/blog',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Google Ads Optimizer Software, Compared: Do You Actually Need One?',
    description:
      'Advisors vs rule engines vs AI-native operators. A neutral comparison and a rule for choosing the right Google Ads optimizer.',
    images: ['/og/google-ads-optimizer-software-compared.png'],
  },
};

export default function Page() {
  return <ArticleContent />;
}
