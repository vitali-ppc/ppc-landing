import type { Metadata } from 'next';
import ArticleContent from './ArticleContent';

export const metadata: Metadata = {
  title: 'Google Ads for B2B SaaS: The Complete Operator\'s Playbook (2026)',
  description: 'A complete operator playbook for running Google Ads for B2B SaaS: how to handle low category search volume, long sales cycles, multi-stakeholder buying, and attribution. Setup, 4-tier campaign structure, bidding progression, measurement, and scaling.',
  alternates: {
    canonical: 'https://www.kampaio.com/blog/google-ads-for-b2b-saas',
  },
  openGraph: {
    title: 'Google Ads for B2B SaaS: The Complete Operator\'s Playbook (2026)',
    description: 'How to run Google Ads for B2B SaaS despite thin category volume, 60-180 day sales cycles, buying committees, and attribution gaps. Setup, 4-tier structure, bidding progression, measurement, and scaling.',
    url: 'https://www.kampaio.com/blog/google-ads-for-b2b-saas',
    type: 'article',
    images: [{ url: '/og/google-ads-for-b2b-saas.png', width: 1200, height: 630, alt: 'Google Ads For B2b Saas, kampaio.com/blog' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Google Ads for B2B SaaS: The Complete Operator\'s Playbook (2026)',
    description: 'How to run Google Ads for B2B SaaS despite thin category volume, long sales cycles, buying committees, and attribution gaps.',
    images: ['/og/google-ads-for-b2b-saas.png'],
  },
};

export default function Page() {
  return <ArticleContent />;
}
