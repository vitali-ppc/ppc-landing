import type { Metadata } from 'next';
import AgencyAlternativeContent from './AgencyAlternativeContent';

const SEO_TITLE = 'Replace Your Google Ads Agency With Software';
const DESCRIPTION =
  'What you give up when you drop a Google Ads agency, what software can cover, and how to tell which side of that line your account sits on.';
const URL = 'https://www.kampaio.com/replace-google-ads-agency';

export const metadata: Metadata = {
  title: SEO_TITLE,
  description: DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: {
    title: 'Replace Your Google Ads Agency With Software',
    description: DESCRIPTION,
    url: URL,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Replace Your Google Ads Agency With Software',
    description: DESCRIPTION,
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${URL}#webpage`,
  url: URL,
  name: SEO_TITLE,
  description: DESCRIPTION,
  isPartOf: { '@type': 'WebSite', name: 'Kampaio', url: 'https://www.kampaio.com' },
  about: {
    '@type': 'Thing',
    name: 'Google Ads agency alternatives',
  },
  publisher: {
    '@type': 'Organization',
    name: 'Kampaio',
    url: 'https://www.kampaio.com',
  },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AgencyAlternativeContent />
    </>
  );
}
