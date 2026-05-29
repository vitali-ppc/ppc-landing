import type { Metadata } from 'next';
import ArticleContent from './ArticleContent';

export const metadata: Metadata = {
  title: 'LinkedIn Ads vs Google Ads for B2B Lead Generation: Honest 2026 Comparison',
  description: 'LinkedIn delivers 121% ROAS for B2B in 2026, Google Search 67% (Dreamdata). But CPL, intent type, and lead quality tell a more complex story. Honest comparison across 8 axes with budget split frameworks for $20-100K/mo B2B advertisers.',
  alternates: {
    canonical: 'https://www.kampaio.com/blog/linkedin-ads-vs-google-ads-b2b-lead-generation',
  },
  openGraph: {
    title: 'LinkedIn Ads vs Google Ads for B2B Lead Generation: Honest 2026 Comparison',
    description: 'LinkedIn delivers 121% ROAS for B2B in 2026, Google Search 67% (Dreamdata). Honest comparison across 8 axes with budget split frameworks for $20-100K/mo B2B advertisers.',
    url: 'https://www.kampaio.com/blog/linkedin-ads-vs-google-ads-b2b-lead-generation',
    type: 'article',
    images: [{ url: '/og/linkedin-ads-vs-google-ads-b2b-lead-generation.png', width: 1200, height: 630, alt: 'LinkedIn Ads vs Google Ads for B2B Lead Generation, kampaio.com/blog' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LinkedIn Ads vs Google Ads for B2B Lead Generation: Honest 2026 Comparison',
    description: 'LinkedIn delivers 121% ROAS for B2B in 2026, Google Search 67% (Dreamdata). Honest comparison across 8 axes with budget split frameworks.',
    images: ['/og/linkedin-ads-vs-google-ads-b2b-lead-generation.png'],
  },
};

export default function Page() {
  return <ArticleContent />;
}
