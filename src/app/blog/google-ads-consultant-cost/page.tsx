import type { Metadata } from 'next';
import ArticleContent from './ArticleContent';

export const metadata: Metadata = {
  title: 'Hire a Google Ads Consultant: Cost, Rates and Salary',
  description:
    'A Google Ads consultant costs $75-250/hour or $500-5,000/month. The honest ranges, the break-even math at your spend, and how it compares to an in-house salary.',
  alternates: {
    canonical: 'https://www.kampaio.com/blog/google-ads-consultant-cost',
  },
  openGraph: {
    title: 'Hire a Google Ads Consultant: Cost, Rates and Salary',
    description:
      'The honest cost ranges for a Google Ads consultant, the break-even math at your spend, and a neutral consultant vs agency vs in-house vs software vs DIY grid.',
    url: 'https://www.kampaio.com/blog/google-ads-consultant-cost',
    type: 'article',
    images: [
      {
        url: '/og/google-ads-consultant-cost.png',
        width: 1200,
        height: 630,
        alt: 'Google Ads Consultant Cost, kampaio.com/blog',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hire a Google Ads Consultant: Cost, Rates and Salary',
    description:
      'The honest cost ranges for a Google Ads consultant, the break-even math at your spend, and a neutral consultant vs agency vs software vs DIY grid.',
    images: ['/og/google-ads-consultant-cost.png'],
  },
};

export default function Page() {
  return <ArticleContent />;
}
