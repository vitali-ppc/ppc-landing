import type { Metadata } from 'next';
import ArticleContent from './ArticleContent';

export const metadata: Metadata = {
  title: 'Google Ads Account Restructure: The 4-Phase Playbook (2026)',
  description:
    'When and how to restructure a messy Google Ads account: the 3-campaign rule, 4-phase rollout over 8 weeks, what to migrate vs what to leave alone, and the thresholds that signal it is time.',
  alternates: {
    canonical: 'https://www.kampaio.com/blog/google-ads-account-restructure',
  },
  openGraph: {
    title: 'Google Ads Account Restructure: The 4-Phase Playbook (2026)',
    description:
      'When and how to restructure a messy Google Ads account: the 3-campaign rule, 4-phase rollout over 8 weeks, and the thresholds that signal it is time. Built for DTC owners and in-house marketers.',
    url: 'https://www.kampaio.com/blog/google-ads-account-restructure',
    type: 'article',
    images: [
      {
        url: '/og/google-ads-account-restructure.png',
        width: 1200,
        height: 630,
        alt: 'Google Ads Account Restructure, kampaio.com/blog',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Google Ads Account Restructure: The 4-Phase Playbook (2026)',
    description:
      'The 3-campaign rule, 4-phase rollout, what to migrate vs what to leave alone, and the thresholds that signal it is time. For DTC owners and in-house marketers.',
    images: ['/og/google-ads-account-restructure.png'],
  },
};

export default function Page() {
  return <ArticleContent />;
}
