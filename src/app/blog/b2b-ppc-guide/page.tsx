import type { Metadata } from 'next';
import ArticleContent from './ArticleContent';

export const metadata: Metadata = {
  title: "B2B PPC: The Complete Operator's Guide to Paid Search That Fills the Pipeline",
  description:
    'A vendor-neutral, practitioner-grounded guide to B2B PPC: how it differs from B2C, which channels to run (Google, LinkedIn, Microsoft), account structure, offline-conversion signal, budgeting, and measurement for long sales cycles.',
  alternates: {
    canonical: 'https://www.kampaio.com/blog/b2b-ppc-guide',
  },
  openGraph: {
    title: "B2B PPC: The Complete Operator's Guide to Paid Search That Fills the Pipeline",
    description:
      'How B2B PPC differs from B2C, which channels to run, account structure, offline-conversion signal, budgeting, and measurement for long sales cycles. Grounded in 49 r/PPC veteran answers.',
    url: 'https://www.kampaio.com/blog/b2b-ppc-guide',
    type: 'article',
    images: [{ url: '/og/b2b-ppc-guide.png', width: 1200, height: 630, alt: 'B2B PPC guide, kampaio.com/blog' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "B2B PPC: The Complete Operator's Guide to Paid Search That Fills the Pipeline",
    description:
      'How B2B PPC differs from B2C, which channels to run, account structure, offline-conversion signal, budgeting, and measurement for long sales cycles.',
    images: ['/og/b2b-ppc-guide.png'],
  },
};

export default function Page() {
  return <ArticleContent />;
}
