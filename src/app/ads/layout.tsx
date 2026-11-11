import { Metadata } from 'next';
import StickyTOC from '../../components/blog/StickyTOC';
import ReadingProgress from '../../components/blog/ReadingProgress';
import ArticleBreadcrumbs from '../../components/blog/ArticleBreadcrumbs';
import { ARTICLE_SHELL_CSS } from '../../components/blog/articleShellCss';

export const metadata: Metadata = {
  title: 'AI Google Ads by Industry',
  description: 'Kampaio is building AI agents for Google Ads. In development. Join early access.',
  // Section default. Each written page (hub + 4 niches) sets robots index itself.
  robots: { index: false, follow: true },
};

// Same article shell as /blog (2026-11-11, owner): breadcrumbs, two-column "On this page"
// rail, numbered sections, reading-progress bar, H1 size.
export default function AdsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="blog-shell">
      <style dangerouslySetInnerHTML={{ __html: ARTICLE_SHELL_CSS }} />
      <ReadingProgress />
      <main>{children}</main>
      <StickyTOC />
      <ArticleBreadcrumbs />
    </div>
  );
}
