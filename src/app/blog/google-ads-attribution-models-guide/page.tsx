import type { Metadata } from 'next';
import ArticleContent from './ArticleContent';

export const metadata: Metadata = {
  title: 'Google Ads Attribution Models: A 2026 Guide to Picking the Right One (and Why It Affects Smart Bidding)',
  description: "A senior PPC manager's guide to Google Ads attribution models in 2026. Covers what each model does, why Google deprecated four of them, when data-driven beats last-click, the Model Comparison tool, and how the attribution choice trains Smart Bidding.",
  alternates: {
    canonical: 'https://www.kampaio.com/blog/google-ads-attribution-models-guide',
  },
  openGraph: {
    title: 'Google Ads Attribution Models 2026: Last-Click vs Data-Driven',
    description: 'The senior PPC manager guide to Google Ads attribution models in 2026. Why Google retired four models, when DDA beats last-click, the Model Comparison tool, and how the model choice trains Smart Bidding.',
    url: 'https://www.kampaio.com/blog/google-ads-attribution-models-guide',
    type: 'article',
    images: [{ url: '/og/google-ads-attribution-models-guide.png', width: 1200, height: 630, alt: 'Google Ads Attribution Models Guide, kampaio.com/blog' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Google Ads Attribution Models 2026: Last-Click vs Data-Driven',
    description: 'The senior PPC manager guide to Google Ads attribution models in 2026. Why Google retired four models, when DDA beats last-click, the Model Comparison tool, and how the model choice trains Smart Bidding.',
    images: ['/og/google-ads-attribution-models-guide.png'],
  },
};

export default function Page() {
  return <ArticleContent />;
}
