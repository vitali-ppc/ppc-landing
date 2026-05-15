import type { Metadata } from 'next';
import ArticleContent from './ArticleContent';

export const metadata: Metadata = {
  title: 'Google Ads Anomaly Detection: Spend Spikes, Conversion Drops, Tracking Outages',
  description: 'Built-in Google Ads alerts are too noisy or too late. The Account Anomaly Detector script is brittle. The detection stack that actually works in 2026: rolling baselines, severity tiers, and Aegis classification.',
  alternates: {
    canonical: 'https://www.kampaio.com/blog/google-ads-anomaly-detection',
  },
  openGraph: {
    title: 'Google Ads Anomaly Detection: The Stack That Actually Works',
    description: 'Comparison of built-in alerts vs Account Anomaly Detector script vs CAD v2 vs commercial monitors vs Aegis. Threshold math, severity tiers, routing rules. Sara-targeted technical guide.',
    url: 'https://www.kampaio.com/blog/google-ads-anomaly-detection',
    type: 'article',
    images: [{ url: '/og/google-ads-anomaly-detection.png', width: 1200, height: 630, alt: 'Google Ads Anomaly Detection , kampaio.com/blog' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Google Ads Anomaly Detection: The Stack That Actually Works',
    description: 'Comparison of built-in alerts vs Account Anomaly Detector script vs CAD v2 vs commercial monitors vs Aegis. Threshold math, severity tiers, routing rules. Sara-targeted technical guide.',
    images: ['/og/google-ads-anomaly-detection.png'],
  },
};

export default function Page() {
  return <ArticleContent />;
}
