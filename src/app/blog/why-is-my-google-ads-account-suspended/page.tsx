import type { Metadata } from 'next';
import ArticleContent from './ArticleContent';

export const metadata: Metadata = {
  title: 'Why Is My Google Ads Account Suspended? Causes, Fixes, and How to Appeal',
  description: "Your Google Ads account got suspended and Google's email is vague. Here are the real causes, how to find yours, and a step-by-step appeal that actually works.",
  alternates: {
    canonical: 'https://www.kampaio.com/blog/why-is-my-google-ads-account-suspended',
  },
  openGraph: {
    title: 'Why Is My Google Ads Account Suspended? Causes, Fixes, and How to Appeal',
    description: "Your Google Ads account got suspended and Google's email is vague. Here are the real causes, how to find yours, and a step-by-step appeal that actually works.",
    url: 'https://www.kampaio.com/blog/why-is-my-google-ads-account-suspended',
    type: 'article',
    images: [{ url: '/blog/why-is-my-google-ads-account-suspended/opengraph-image', width: 1200, height: 630, alt: 'Why Is My Google Ads Account Suspended, kampaio.com/blog' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Why Is My Google Ads Account Suspended? Causes, Fixes, and How to Appeal',
    description: "Your Google Ads account got suspended and Google's email is vague. Here are the real causes, how to find yours, and a step-by-step appeal that actually works.",
    images: ['/blog/why-is-my-google-ads-account-suspended/opengraph-image'],
  },
};

export default function Page() {
  return <ArticleContent />;
}
