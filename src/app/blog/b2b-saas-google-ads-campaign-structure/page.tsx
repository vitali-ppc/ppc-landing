import type { Metadata } from 'next';
import ArticleContent from './ArticleContent';

export const metadata: Metadata = {
  title: 'B2B SaaS Google Ads Campaign Structure: The Account Blueprint (2026)',
  description: 'How to structure a B2B SaaS Google Ads account from scratch: segment campaigns by intent and funnel stage, isolate brand and competitor traffic, name for scale, and add Performance Max only after Search has a feedback loop. Full blueprint with example layout.',
  alternates: {
    canonical: 'https://www.kampaio.com/blog/b2b-saas-google-ads-campaign-structure',
  },
  openGraph: {
    title: 'B2B SaaS Google Ads Campaign Structure: The Account Blueprint (2026)',
    description: 'Segment a B2B SaaS Google Ads account by intent and funnel stage, not product feature: a five-tier blueprint with example layout, naming conventions, and when to add Performance Max.',
    url: 'https://www.kampaio.com/blog/b2b-saas-google-ads-campaign-structure',
    type: 'article',
    images: [{ url: '/blog/b2b-saas-google-ads-campaign-structure/opengraph-image', width: 1200, height: 630, alt: 'B2B SaaS Google Ads Campaign Structure, kampaio.com/blog' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'B2B SaaS Google Ads Campaign Structure (2026)',
    description: 'A five-tier intent-based blueprint for structuring a B2B SaaS Google Ads account, with example layout, naming conventions, and PMax sequencing.',
    images: ['/blog/b2b-saas-google-ads-campaign-structure/opengraph-image'],
  },
};

export default function Page() {
  return <ArticleContent />;
}
