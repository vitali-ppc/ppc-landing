import type { Metadata } from 'next';
import ArticleContent from './ArticleContent';

export const metadata: Metadata = {
  title: 'Google Ads Conversion Tracking Not Working: 90s Triage + 7 Fixes',
  description: 'Conversion tracking broken? Run a 90-second triage, then fix 7 common failure modes: tag missing, duplicate conversions, GA4 mismatch, gclid loss.',
  alternates: {
    canonical: 'https://www.kampaio.com/blog/google-ads-conversion-tracking-not-working',
  },
  openGraph: {
    title: 'Google Ads Conversion Tracking Not Working: 7 Fixes',
    description: '90-second triage and 7 fixes for broken Google Ads conversion tracking: tag missing, duplicates, GA4 mismatch, gclid stripped, enhanced conv silent fail.',
    url: 'https://www.kampaio.com/blog/google-ads-conversion-tracking-not-working',
    type: 'article',
    images: [{ url: '/og/google-ads-conversion-tracking-not-working.png', width: 1200, height: 630, alt: 'Google Ads Conversion Tracking Not Working , kampaio.com/blog' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Google Ads Conversion Tracking Not Working: 7 Fixes',
    description: '90-second triage and 7 fixes for broken Google Ads conversion tracking: tag missing, duplicates, GA4 mismatch, gclid stripped, enhanced conv silent fail.',
    images: ['/og/google-ads-conversion-tracking-not-working.png'],
  },
};

export default function Page() {
  return <ArticleContent />;
}
