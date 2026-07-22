import type { Metadata } from 'next';
import ArticleContent from './ArticleContent';

export const metadata: Metadata = {
  title: 'Google Ads Agency Guide: Do You Need One, What It Costs, and Your Alternatives',
  description:
    'A neutral guide to hiring a Google Ads agency: what one does, real US fees, how to decide if you need one, how to choose, switch, or fire an agency, and when a consultant, in-house hire, or software is the better call.',
  alternates: {
    canonical: 'https://www.kampaio.com/blog/google-ads-agency-guide',
  },
  openGraph: {
    title: 'Google Ads Agency Guide: Do You Need One, What It Costs, and Your Alternatives',
    description:
      'What a Google Ads agency does, real 2026 US fees, how to decide if you need one, and when a consultant, in-house hire, or software beats a retainer.',
    url: 'https://www.kampaio.com/blog/google-ads-agency-guide',
    type: 'article',
    images: [{ url: '/og/google-ads-agency-guide.png', width: 1200, height: 630, alt: 'Google Ads Agency Guide, kampaio.com/blog' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Google Ads Agency Guide: Do You Need One, What It Costs, and Your Alternatives',
    description:
      'What a Google Ads agency does, real 2026 US fees, how to decide if you need one, and when a consultant, in-house hire, or software beats a retainer.',
    images: ['/og/google-ads-agency-guide.png'],
  },
};

export default function Page() {
  return <ArticleContent />;
}
