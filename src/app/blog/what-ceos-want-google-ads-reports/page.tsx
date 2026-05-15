import type { Metadata } from 'next';
import ArticleContent from './ArticleContent';

export const metadata: Metadata = {
  title: 'What CEOs Want to See in Google Ads Reports',
  description: 'Learn which Google Ads metrics CEOs care about (hint: it\'s not clicks) and get the exact reporting template that secures bigger budgets.',
  alternates: {
    canonical: 'https://www.kampaio.com/blog/what-ceos-want-google-ads-reports',
  },
  openGraph: {
    title: 'What CEOs Want in Google Ads Reports',
    description: 'The Google Ads metrics CEOs actually care about (hint: not clicks), plus the exact reporting template that secures bigger budgets.',
    url: 'https://www.kampaio.com/blog/what-ceos-want-google-ads-reports',
    type: 'article',
    images: [{ url: '/og/what-ceos-want-google-ads-reports.png', width: 1200, height: 630, alt: 'What Ceos Want Google Ads Reports, kampaio.com/blog' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'What CEOs Want in Google Ads Reports',
    description: 'The Google Ads metrics CEOs actually care about (hint: not clicks), plus the exact reporting template that secures bigger budgets.',
    images: ['/og/what-ceos-want-google-ads-reports.png'],
  },
};

export default function Page() {
  return <ArticleContent />;
}
