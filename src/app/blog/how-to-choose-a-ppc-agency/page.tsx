import type { Metadata } from 'next';
import ArticleContent from './ArticleContent';

export const metadata: Metadata = {
  title: 'How to Choose a PPC Agency (and How to Know When You Don\'t Need One)',
  description: 'A buyer\'s framework for choosing a PPC agency: fair fees, red flags, the questions to ask, and an honest test for whether you even need an agency or just better tooling.',
  alternates: {
    canonical: 'https://www.kampaio.com/blog/how-to-choose-a-ppc-agency',
  },
  openGraph: {
    title: 'How to Choose a PPC Agency (and How to Know When You Don\'t Need One)',
    description: 'A buyer\'s framework for choosing a PPC agency: fair fees, red flags, the questions to ask, and an honest test for whether you even need an agency or just better tooling.',
    url: 'https://www.kampaio.com/blog/how-to-choose-a-ppc-agency',
    type: 'article',
    images: [{ url: '/og/how-to-choose-a-ppc-agency.png', width: 1200, height: 630, alt: 'How to Choose a PPC Agency, kampaio.com/blog' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How to Choose a PPC Agency (and How to Know When You Don\'t Need One)',
    description: 'A buyer\'s framework for choosing a PPC agency: fair fees, red flags, the questions to ask, and an honest test for whether you even need an agency.',
    images: ['/og/how-to-choose-a-ppc-agency.png'],
  },
};

export default function Page() {
  return <ArticleContent />;
}
