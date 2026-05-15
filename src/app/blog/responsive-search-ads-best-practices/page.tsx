import type { Metadata } from 'next';
import ArticleContent from './ArticleContent';

export const metadata: Metadata = {
  title: 'Responsive Search Ads Best Practices for Senior PPC Managers (2026)',
  description: 'Technical RSA best practices: ML signal quality, asset combinations, ad strength forensics, pinning trade-offs, variant testing with statistical significance.',
  alternates: {
    canonical: 'https://www.kampaio.com/blog/responsive-search-ads-best-practices',
  },
  openGraph: {
    title: 'Responsive Search Ads Best Practices (2026)',
    description: 'Sara-level technical RSA guide: combinations math, ad strength forensics, pinning trade-offs, 4,200-impression significance windows.',
    url: 'https://www.kampaio.com/blog/responsive-search-ads-best-practices',
    type: 'article',
    images: [{ url: '/og/responsive-search-ads-best-practices.png', width: 1200, height: 630, alt: 'Responsive Search Ads Best Practices, kampaio.com/blog' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Responsive Search Ads Best Practices (2026)',
    description: 'Sara-level technical RSA guide: combinations math, ad strength forensics, pinning trade-offs, 4,200-impression significance windows.',
    images: ['/og/responsive-search-ads-best-practices.png'],
  },
};

export default function Page() {
  return <ArticleContent />;
}
