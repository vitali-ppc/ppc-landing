import type { Metadata } from 'next';
import ArticleContent from './ArticleContent';

export const metadata: Metadata = {
  title: 'B2B PPC Lead Generation: How to Buy Pipeline, Not Just Leads (2026)',
  description: 'Most B2B PPC advice optimizes for cheap leads. This is the quality layer: how to tell pipeline from noise, feed CRM outcomes back into bidding, pick channels by intent, and measure cost per closed-won as spend scales from $10K to $100K per month.',
  alternates: {
    canonical: 'https://www.kampaio.com/blog/b2b-ppc-lead-generation',
  },
  openGraph: {
    title: 'B2B PPC Lead Generation: How to Buy Pipeline, Not Just Leads (2026)',
    description: 'A vendor-neutral pillar on B2B PPC lead generation: the four levers of lead quality, the conversion feedback loop, and the only metric that matters, cost per closed-won.',
    url: 'https://www.kampaio.com/blog/b2b-ppc-lead-generation',
    type: 'article',
    images: [{ url: '/blog/b2b-ppc-lead-generation/opengraph-image', width: 1200, height: 630, alt: 'B2B PPC Lead Generation, kampaio.com/blog' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'B2B PPC Lead Generation: How to Buy Pipeline, Not Just Leads (2026)',
    description: 'A vendor-neutral pillar on B2B PPC lead generation: the four levers of lead quality, the conversion feedback loop, and the only metric that matters, cost per closed-won.',
    images: ['/blog/b2b-ppc-lead-generation/opengraph-image'],
  },
};

export default function Page() {
  return <ArticleContent />;
}
