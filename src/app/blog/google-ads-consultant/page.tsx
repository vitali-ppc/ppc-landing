import type { Metadata } from 'next';
import ArticleContent from './ArticleContent';

export const metadata: Metadata = {
  title: 'Google Ads Consultant: What They Do, Cost, and When to Hire One',
  description: "An honest buyer's guide to Google Ads consultants: what they actually do, real cost ranges (freelancer vs agency vs software), the hiring red flags, and how to know if you need one at all.",
  alternates: {
    canonical: 'https://www.kampaio.com/blog/google-ads-consultant',
  },
  openGraph: {
    title: 'Google Ads Consultant: What They Do, Cost, and When to Hire One',
    description: "An honest buyer's guide to Google Ads consultants: real cost ranges (freelancer vs agency vs software), the hiring red flags, and whether you need one at all.",
    url: 'https://www.kampaio.com/blog/google-ads-consultant',
    type: 'article',
    images: [{ url: '/og/google-ads-consultant.png', width: 1200, height: 630, alt: 'Google Ads Consultant, kampaio.com/blog' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Google Ads Consultant: What They Do, Cost, and When to Hire One',
    description: "Real cost ranges (freelancer vs agency vs software), the hiring red flags, and whether you need a Google Ads consultant at all.",
    images: ['/og/google-ads-consultant.png'],
  },
};

export default function Page() {
  return <ArticleContent />;
}
