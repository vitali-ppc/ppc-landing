import type { Metadata } from 'next';
import ArticleContent from './ArticleContent';

export const metadata: Metadata = {
  title: 'PPC Audit Checklist: 25 Senior-Level Checks (2026)',
  description:
    'A senior PPC audit checklist organized in 6 pillars with thresholds, a 3x3 decision matrix, and the 18 checks you can automate. Built for agency owners auditing 4+ accounts a quarter.',
  alternates: {
    canonical: 'https://www.kampaio.com/blog/ppc-audit-checklist',
  },
  openGraph: {
    title: 'PPC Audit Checklist: 25 Senior-Level Checks (2026)',
    description:
      'A senior PPC audit checklist with 6 pillars, thresholds, and a decision matrix. The 18 checks you can automate, the 7 that still need senior judgment.',
    url: 'https://www.kampaio.com/blog/ppc-audit-checklist',
    type: 'article',
    images: [
      {
        url: '/og/ppc-audit-checklist.png',
        width: 1200,
        height: 630,
        alt: 'PPC Audit Checklist, kampaio.com/blog',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PPC Audit Checklist: 25 Senior-Level Checks (2026)',
    description:
      'A senior PPC audit checklist with 6 pillars, thresholds, and a decision matrix. The 18 checks you can automate, the 7 that still need senior judgment.',
    images: ['/og/ppc-audit-checklist.png'],
  },
};

export default function Page() {
  return <ArticleContent />;
}
