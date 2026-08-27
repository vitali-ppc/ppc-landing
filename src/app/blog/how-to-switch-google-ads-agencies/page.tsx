import type { Metadata } from 'next';
import ArticleContent from './ArticleContent';

export const metadata: Metadata = {
  title: 'How to Switch Google Ads Agencies Without Losing Your Account',
  description: 'A step-by-step guide to switching Google Ads agencies safely: who owns the account, how to transfer the MCC and billing, export your history, and avoid the agency that will not hand over access.',
  alternates: {
    canonical: 'https://www.kampaio.com/blog/how-to-switch-google-ads-agencies',
  },
  openGraph: {
    title: 'How to Switch Google Ads Agencies Without Losing Your Account or Your Data',
    description: 'The clean switching sequence: confirm Admin access, run the pre-switch checklist, transfer the MCC link and billing in order, and handle the agency that refuses to hand over the account.',
    url: 'https://www.kampaio.com/blog/how-to-switch-google-ads-agencies',
    type: 'article',
    images: [{ url: '/og/how-to-switch-google-ads-agencies.png', width: 1200, height: 630, alt: 'How to switch Google Ads agencies without losing your account, kampaio.com/blog' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How to Switch Google Ads Agencies Without Losing Your Account',
    description: 'Confirm Admin access, run the pre-switch checklist, transfer the MCC link and billing in order. The clean switch wraps up in days, not weeks.',
    images: ['/og/how-to-switch-google-ads-agencies.png'],
  },
};

export default function Page() {
  return <ArticleContent />;
}
