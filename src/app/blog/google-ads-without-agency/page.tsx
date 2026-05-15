import type { Metadata } from 'next';
import ArticleContent from './ArticleContent';

export const metadata: Metadata = {
  title: 'Google Ads Without an Agency: When DIY Works (and Doesn\'t)',
  description: 'Manage Google Ads without paying $2K/month to an agency? Yes, if spend is under $20K and you use the right tools. A realistic framework for SMB owners.',
  alternates: {
    canonical: 'https://www.kampaio.com/blog/google-ads-without-agency',
  },
  openGraph: {
    title: 'Google Ads Without an Agency: DIY Framework for SMBs',
    description: 'Can you run Google Ads without an agency? Yes if spend is under $20K and you pick the right tools. Realistic framework for SMB owners.',
    url: 'https://www.kampaio.com/blog/google-ads-without-agency',
    type: 'article',
    images: [{ url: '/logo.png', width: 1200, height: 630, alt: 'B6 PPC Cabinet' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Google Ads Without an Agency: DIY Framework for SMBs',
    description: 'Can you run Google Ads without an agency? Yes if spend is under $20K and you pick the right tools. Realistic framework for SMB owners.',
    images: ['/logo.png'],
  },
};

export default function Page() {
  return <ArticleContent />;
}
