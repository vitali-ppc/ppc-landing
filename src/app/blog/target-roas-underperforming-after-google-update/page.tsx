import type { Metadata } from 'next';
import ArticleContent from './ArticleContent';

export const metadata: Metadata = {
  title: 'Target ROAS Underperforming After a Google Update? The Test',
  description: 'Target ROAS underperforming after a Google update? Run this diagnostic to tell the Aug 17 auction change from a real problem, then fix the right thing.',
  alternates: {
    canonical: 'https://www.kampaio.com/blog/target-roas-underperforming-after-google-update',
  },
  openGraph: {
    title: 'Target ROAS Underperforming After a Google Update? The Test',
    description: 'Target ROAS underperforming after a Google update? Run this diagnostic to tell the Aug 17 auction change from a real problem, then fix the right thing.',
    url: 'https://www.kampaio.com/blog/target-roas-underperforming-after-google-update',
    type: 'article',
    images: [{ url: '/og/target-roas-underperforming-after-google-update.png', width: 1200, height: 630, alt: 'Target ROAS Underperforming After A Google Update , kampaio.com/blog' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Target ROAS Underperforming After a Google Update? The Test',
    description: 'Target ROAS underperforming after a Google update? Run this diagnostic to tell the Aug 17 auction change from a real problem, then fix the right thing.',
    images: ['/og/target-roas-underperforming-after-google-update.png'],
  },
};

export default function Page() {
  return <ArticleContent />;
}
