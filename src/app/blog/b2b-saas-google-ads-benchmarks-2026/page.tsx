import type { Metadata } from 'next';
import ArticleContent from './ArticleContent';

export const metadata: Metadata = {
  title: 'B2B SaaS Google Ads Benchmarks 2026: CTR, CPC, CPA, and ROAS by Segment',
  description: 'B2B SaaS Google Ads benchmarks for 2026: average CPC $5.34 (up 29% YoY), CPA $87-$1,500+ by segment, conversion rate 3-5%. Real data from 2,000+ SaaS campaigns to tell you if your numbers are on target.',
  alternates: {
    canonical: 'https://www.kampaio.com/blog/b2b-saas-google-ads-benchmarks-2026',
  },
  openGraph: {
    title: 'B2B SaaS Google Ads Benchmarks 2026: CTR, CPC, CPA, and ROAS by Segment',
    description: 'B2B SaaS Google Ads benchmarks for 2026: average CPC $5.34 (up 29% YoY), CPA $87-$1,500+ by segment, conversion rate 3-5%. Real data from 2,000+ SaaS campaigns.',
    url: 'https://www.kampaio.com/blog/b2b-saas-google-ads-benchmarks-2026',
    type: 'article',
    images: [{ url: '/og/b2b-saas-google-ads-benchmarks-2026.png', width: 1200, height: 630, alt: 'B2B SaaS Google Ads Benchmarks 2026, kampaio.com/blog' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'B2B SaaS Google Ads Benchmarks 2026: CTR, CPC, CPA, and ROAS by Segment',
    description: 'B2B SaaS Google Ads benchmarks for 2026: CPC $5.34, CPA $87-$1,500+, CVR 3-5%. Real data from 2,000+ SaaS campaigns.',
    images: ['/og/b2b-saas-google-ads-benchmarks-2026.png'],
  },
};

export default function Page() {
  return <ArticleContent />;
}
