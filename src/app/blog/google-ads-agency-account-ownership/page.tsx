import type { Metadata } from 'next';
import ArticleContent from './ArticleContent';

export const metadata: Metadata = {
  title: 'Google Ads Agency Account Ownership: Who Owns What, and How Exposed Are You',
  description:
    'Who owns your Google Ads account when an agency runs it, what each access level costs you at exit, the six Google assets an agency can hold, and what to negotiate before you sign. Verified against Google Ads Help, July 2026.',
  alternates: {
    canonical: 'https://www.kampaio.com/blog/google-ads-agency-account-ownership',
  },
  openGraph: {
    title: 'Google Ads Agency Account Ownership: Who Owns What, and How Exposed Are You',
    description:
      'Who owns your Google Ads account when an agency runs it, what each of the five access levels costs you at exit, and the six Google assets an agency can hold.',
    url: 'https://www.kampaio.com/blog/google-ads-agency-account-ownership',
    type: 'article',
    images: [
      {
        url: '/og/google-ads-agency-account-ownership.png',
        width: 1200,
        height: 630,
        alt: 'Google Ads Agency Account Ownership, kampaio.com/blog',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Google Ads Agency Account Ownership: Who Owns What, and How Exposed Are You',
    description:
      'Who owns your Google Ads account when an agency runs it, what each of the five access levels costs you at exit, and the six Google assets an agency can hold.',
    images: ['/og/google-ads-agency-account-ownership.png'],
  },
};

export default function Page() {
  return <ArticleContent />;
}
