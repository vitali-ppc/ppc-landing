import type { Metadata } from 'next';
import StickyTOC from '../../components/blog/StickyTOC';

export const metadata: Metadata = {
  title: 'Kampaio Blog: AI-Powered Google Ads Insights',
  description:
    'Practical AI and PPC insights for SMB advertisers. Diagnostic playbooks, technical PPC strategy, and Google Ads automation from the Kampaio team.',
  alternates: { canonical: 'https://www.kampaio.com/blog' },
  openGraph: {
    title: 'Kampaio Blog',
    description: 'AI-powered Google Ads insights for SMB advertisers.',
    url: 'https://www.kampaio.com/blog',
    type: 'website',
  },
};

// Two-column article layout: on wide screens, shift the article's centered
// content columns left so the content sits in a left column and the sticky
// "On this page" rail sits in a balanced right column (matching the sister
// sites). Scoped to `html.has-toc` (set by StickyTOC only on real articles) so
// the /blog index is never shifted. Matches the article's inline containers
// (max-width:1200px) and the KeepReading block.
const twoColCss = `
@media (min-width: 1260px) {
  html.has-toc .blog-shell > div > [style*="max-width:1200px"] {
    transform: translateX(-134px);
  }
}
`;

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="blog-shell">
      <style dangerouslySetInnerHTML={{ __html: twoColCss }} />
      {children}
      <StickyTOC />
    </div>
  );
}
