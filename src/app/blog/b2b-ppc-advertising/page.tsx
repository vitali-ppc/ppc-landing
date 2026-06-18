import type { Metadata } from 'next';
import ArticleContent from './ArticleContent';

export const metadata: Metadata = {
  title: 'B2B PPC Advertising: How to Set It Up Without Burning Your First Month (2026)',
  description: 'A hands-on setup guide for B2B PPC advertising. The exact channels, account structure, match types, conversion tracking, and first-30-days settings that stop a B2B campaign from bleeding budget on the wrong clicks, plus when to bring in automation.',
  alternates: {
    canonical: 'https://www.kampaio.com/blog/b2b-ppc-advertising',
  },
  openGraph: {
    title: 'B2B PPC Advertising: How to Set It Up Without Burning Your First Month (2026)',
    description: 'The exact channels, account structure, match types, conversion tracking, and first-30-days settings that stop a B2B PPC campaign from bleeding budget on the wrong clicks.',
    url: 'https://www.kampaio.com/blog/b2b-ppc-advertising',
    type: 'article',
    images: [{ url: '/blog/b2b-ppc-advertising/opengraph-image', width: 1200, height: 630, alt: 'B2B PPC Advertising setup guide, kampaio.com/blog' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'B2B PPC Advertising: How to Set It Up Without Burning Your First Month (2026)',
    description: 'The exact channels, account structure, match types, conversion tracking, and first-30-days settings that stop a B2B PPC campaign from bleeding budget.',
    images: ['/blog/b2b-ppc-advertising/opengraph-image'],
  },
};

export default function Page() {
  return <ArticleContent />;
}
