import type { Metadata } from 'next';
import StickyTOC from '../../components/blog/StickyTOC';
import ReadingProgress from '../../components/blog/ReadingProgress';
import ArticleBreadcrumbs from '../../components/blog/ArticleBreadcrumbs';

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
  /* 2026-11-11: the <main> landmark (flag #1) put a level between .blog-shell and the
     article wrapper, so ".blog-shell > div > …" matched nothing and the rail sat on top of
     the text on all 81 articles (measured: rail left 1014px, text right 1120px at 1440). */
  html.has-toc .blog-shell main > div > [style*="max-width:1200px"],
  html.has-toc .blog-shell > div > [style*="max-width:1200px"],
  html.has-toc .blog-shell main > div > [style*="max-width:800px"] {
    transform: translateX(-134px);
  }
  /* Wide article tables (up to ~1100px) overflowed the 800px column into the rail on 5 articles.
     On desktop with the rail they scroll inside the column, as they already do on mobile. */
  html.has-toc .blog-shell main section[id] table { display: block; max-width: 100%; overflow-x: auto; }
  /* The right rail replaces the in-article collapsible ToC box on desktop. */
  html.has-toc .toc-inline {
    display: none !important;
  }
}
/* Numbered section eyebrow (01, 02 ...) and a rule above every article H2, as on the
   sister sites. Article H2s carry inline font styles, so only spacing, border and the
   counter are set here. Scoped to section[id] > h2 (the article sections StickyTOC reads),
   so "Keep reading" and other blocks are not numbered. */
html.has-toc .blog-shell main { counter-reset: kp-section; }
html.has-toc .blog-shell main section[id] > h2 {
  counter-increment: kp-section;
  border-top: 1px solid #e5e7eb;
  padding-top: 32px;
  scroll-margin-top: 120px;
}
/* The first section sits right under the hero, which already ends in a rule: a second rule
   there doubled the line and left ~156px of empty space between them (2026-11-11). */
html.has-toc .blog-shell main section[id]:first-of-type > h2:first-child {
  border-top: 0;
  padding-top: 0;
  margin-top: -48px !important;
}
html.has-toc .blog-shell main section[id] > h2::before {
  content: counter(kp-section, decimal-leading-zero);
  display: block;
  margin-bottom: 8px;
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.18em;
  color: #764ba2;
}
/* The old slug-based Breadcrumbs ("B2b ppc strategy") rendered under the fixed header on all 81
   articles; ArticleBreadcrumbs replaces it with the real title above the H1. */
.blog-shell .breadcrumbs-precisely { display: none !important; }
/* Article title: 48px/800 read heavier than the sister sites (44px/600, measured 2026-11-11).
   Article H1s carry inline sizes, hence !important. */
html.has-toc .blog-shell main h1 {
  font-size: clamp(30px, 4vw, 44px) !important;
  font-weight: 600 !important;
  letter-spacing: -0.02em;
  line-height: 1.15 !important;
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
      <ReadingProgress />
      <main>{children}</main>
      <StickyTOC />
      <ArticleBreadcrumbs />
    </div>
  );
}
