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
  /* The right rail replaces the in-article collapsible ToC box on desktop. */
  html.has-toc .toc-inline {
    display: none !important;
  }
}
/* Retrofit: old raw article tables (NOT the new ResponsiveTable, class .rt) scroll
   horizontally on mobile instead of crushing columns to 1-char stacks. New tables
   use ResponsiveTable (cards on mobile); this just stops the legacy ones being unreadable. */
@media (max-width: 760px) {
  .blog-shell table:not(.rt) { display: block; width: 100%; max-width: 100%; overflow-x: auto; -webkit-overflow-scrolling: touch; }
  .blog-shell table:not(.rt) thead,
  .blog-shell table:not(.rt) tbody { display: table; width: 100%; min-width: 560px; }
}
`;

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="blog-shell">
      <style dangerouslySetInnerHTML={{ __html: twoColCss }} />
      {/* The primary-content landmark. Every article was missing one, which is what
          `landmark-one-main` reported on every Lighthouse sample since June (flag #1):
          assistive tech and content extractors both use it to find where the article
          starts. One element here covers the whole blog. */}
      <main>{children}</main>
      <StickyTOC />
    </div>
  );
}
