import type { Metadata } from 'next';
import FixAccountContent from './FixAccountContent';

const SEO_TITLE = 'Fix My Google Ads Account: Symptom Triage';
const DESCRIPTION =
  'Spend up and results down? Start from the symptom. Nine common Google Ads failures, what each one usually turns out to be, and where to read the full fix.';
const URL = 'https://www.kampaio.com/fix-google-ads-account';

export const metadata: Metadata = {
  title: SEO_TITLE,
  description: DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: {
    title: 'Fix My Google Ads Account: Symptom Triage',
    description: DESCRIPTION,
    url: URL,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fix My Google Ads Account: Symptom Triage',
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
  about: { '@type': 'Thing', name: 'Google Ads troubleshooting' },
  publisher: { '@type': 'Organization', name: 'Kampaio', url: 'https://www.kampaio.com' },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <FixAccountContent />
    </>
  );
}
