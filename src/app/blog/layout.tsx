import type { Metadata } from 'next';
import StickyTOC from '../../components/blog/StickyTOC';
import ReadingProgress from '../../components/blog/ReadingProgress';
import ArticleBreadcrumbs from '../../components/blog/ArticleBreadcrumbs';
import { ARTICLE_SHELL_CSS } from '../../components/blog/articleShellCss';

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


export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="blog-shell">
      <style dangerouslySetInnerHTML={{ __html: ARTICLE_SHELL_CSS }} />
      {/* The primary-content landmark. Every article was missing one, which is what
          `landmark-one-main` reported on every Lighthouse sample since June (flag #1):
          assistive tech and content extractors both use it to find where the article
          starts. One element here covers the whole blog. */}
      <ReadingProgress />
      <main>{children}</main>
      <StickyTOC />
      <ArticleBreadcrumbs />
    </div>
  );
}
