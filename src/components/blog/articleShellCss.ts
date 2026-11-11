// Shared article-page CSS for /blog/<slug> and /ads/<page> (moved out of blog/layout.tsx on
// 2026-11-11 so the industries pages get the same two-column rail, numbered sections, H1 size
// and table handling). Everything is scoped to .blog-shell and, where it matters, html.has-toc.
export const ARTICLE_SHELL_CSS = `
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
  /* 2026-11-11 (same fix as agentsexplained 91013f0): thead and tbody as two separate
     display:table boxes sized their columns separately, so the header drifted off the rows, and
     narrow cells broke words letter by letter. Cells get a readable minimum width and break only
     between words; the table scrolls sideways inside itself. */
  .blog-shell table:not(.rt) th,
  .blog-shell table:not(.rt) td { min-width: 7.5rem; overflow-wrap: normal; word-break: normal; }
}
`;
