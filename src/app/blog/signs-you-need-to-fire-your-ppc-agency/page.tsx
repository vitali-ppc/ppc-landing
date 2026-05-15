import type { Metadata } from 'next';
import ArticleContent from './ArticleContent';

export const metadata: Metadata = {
  title: '8 Signs It\'s Time to Fire Your PPC Agency (And What\'s Next)',
  description: 'Eight observable signs your PPC agency is failing, a self-scoring diagnostic, and a plan for what to do next: confront, switch, or go independent.',
  alternates: {
    canonical: 'https://www.kampaio.com/blog/signs-you-need-to-fire-your-ppc-agency',
  },
  openGraph: {
    title: '8 Signs It\'s Time to Fire Your PPC Agency',
    description: '8 observable signs your PPC agency is failing, a self-scoring diagnostic, and a plan for what to do next: confront, switch, or go independent with AI tools.',
    url: 'https://www.kampaio.com/blog/signs-you-need-to-fire-your-ppc-agency',
    type: 'article',
    images: [{ url: '/logo.png', width: 1200, height: 630, alt: 'B6 PPC Cabinet' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '8 Signs It\'s Time to Fire Your PPC Agency',
    description: '8 observable signs your PPC agency is failing, a self-scoring diagnostic, and a plan for what to do next: confront, switch, or go independent with AI tools.',
    images: ['/logo.png'],
  },
};

export default function Page() {
  return <ArticleContent />;
}
