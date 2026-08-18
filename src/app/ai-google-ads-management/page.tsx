import type { Metadata } from 'next';
import AiManagementContent from './AiManagementContent';

const SEO_TITLE = 'AI Google Ads Management: What It Runs';
const DESCRIPTION =
  'Google already runs AI inside your account. What a management layer adds on top, which decisions it should never take alone, and how to tell the two apart.';
const URL = 'https://www.kampaio.com/ai-google-ads-management';

export const metadata: Metadata = {
  title: SEO_TITLE,
  description: DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: {
    title: 'AI Google Ads Management: What It Runs',
    description: DESCRIPTION,
    url: URL,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Google Ads Management: What It Runs',
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
  about: { '@type': 'Thing', name: 'AI Google Ads management' },
  publisher: { '@type': 'Organization', name: 'Kampaio', url: 'https://www.kampaio.com' },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AiManagementContent />
    </>
  );
}
