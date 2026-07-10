import type { Metadata } from 'next';
import ArticleContent from './ArticleContent';

export const metadata: Metadata = {
  title: 'B2B PPC Strategy: How to Scale Paid Search Without Efficiency Collapse',
  description:
    'A B2B PPC strategy built for scale, not basics: funnel-aligned structure, offline-conversion signal wiring, value-based bidding, and a clear rule for when to automate. With data from 68 practitioner discussions.',
  alternates: {
    canonical: 'https://www.kampaio.com/blog/b2b-ppc-strategy',
  },
  openGraph: {
    title: 'B2B PPC Strategy: How to Scale Paid Search Without Efficiency Collapse',
    description:
      'The Scale Ladder for B2B PPC: structure, signal, bidding, automation. Funnel-aligned structure, offline-conversion wiring, value-based bidding, and when to automate. With data from 68 practitioner discussions.',
    url: 'https://www.kampaio.com/blog/b2b-ppc-strategy',
    type: 'article',
    images: [{ url: '/og/b2b-ppc-strategy.png', width: 1200, height: 630, alt: 'B2b Ppc Strategy, kampaio.com/blog' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'B2B PPC Strategy: How to Scale Paid Search Without Efficiency Collapse',
    description:
      'The Scale Ladder for B2B PPC: structure, signal, bidding, automation. Funnel-aligned structure, offline-conversion wiring, value-based bidding, and when to automate.',
    images: ['/og/b2b-ppc-strategy.png'],
  },
};

export default function Page() {
  return <ArticleContent />;
}
