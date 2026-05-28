import type { Metadata } from 'next';
import ArticleContent from './ArticleContent';

export const metadata: Metadata = {
  title: 'How to Fix Low-Quality Leads From B2B Google Ads (2026 Playbook)',
  description: 'B2B Google Ads sending form fills but no pipeline? The fix is offline conversion imports, value-based bidding, audience exclusions, and form filtering. Six-step playbook with thresholds and timelines.',
  alternates: {
    canonical: 'https://www.kampaio.com/blog/b2b-google-ads-low-quality-leads',
  },
  openGraph: {
    title: 'How to Fix Low-Quality Leads From B2B Google Ads (2026 Playbook)',
    description: 'B2B Google Ads sending form fills but no pipeline? Six-step fix playbook: OCI, value-based bidding, audience exclusions, form filtering, match types, lead form match-quality.',
    url: 'https://www.kampaio.com/blog/b2b-google-ads-low-quality-leads',
    type: 'article',
    images: [{ url: '/og/b2b-google-ads-low-quality-leads.png', width: 1200, height: 630, alt: 'B2B Google Ads Low-Quality Leads Fix, kampaio.com/blog' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How to Fix Low-Quality Leads From B2B Google Ads (2026 Playbook)',
    description: 'B2B Google Ads sending form fills but no pipeline? Six-step fix playbook with thresholds and timelines.',
    images: ['/og/b2b-google-ads-low-quality-leads.png'],
  },
};

export default function Page() {
  return <ArticleContent />;
}
