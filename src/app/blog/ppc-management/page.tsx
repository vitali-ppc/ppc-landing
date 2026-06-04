import type { Metadata } from 'next';
import ArticleContent from './ArticleContent';

export const metadata: Metadata = {
  title: 'PPC Management: How In-House Teams Actually Run Paid Search (2026 Guide)',
  description:
    'What PPC management really is and how an in-house team runs it: the core disciplines, a weekly and monthly operating cadence, when to audit or restructure, and how to decide if you still need an agency.',
  alternates: {
    canonical: 'https://www.kampaio.com/blog/ppc-management',
  },
  openGraph: {
    title: 'PPC Management: How In-House Teams Actually Run Paid Search (2026 Guide)',
    description:
      'The in-house PPC operating system: six core disciplines, a daily/weekly/monthly/quarterly cadence, when to audit or restructure, and the in-house vs agency vs tool decision.',
    url: 'https://www.kampaio.com/blog/ppc-management',
    type: 'article',
    images: [
      {
        url: '/og/ppc-management.png',
        width: 1200,
        height: 630,
        alt: 'PPC Management Guide, kampaio.com/blog',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PPC Management: How In-House Teams Actually Run Paid Search (2026 Guide)',
    description:
      'The in-house PPC operating system: six core disciplines, a daily/weekly/monthly/quarterly cadence, when to audit or restructure, and the in-house vs agency vs tool decision.',
    images: ['/og/ppc-management.png'],
  },
};

export default function Page() {
  return <ArticleContent />;
}
