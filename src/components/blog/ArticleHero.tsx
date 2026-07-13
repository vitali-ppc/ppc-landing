// Article hero cover: the same programmatic cover used for the OG share image
// and the blog card thumbnail, shown at the top of the article. The H1 stays as
// real text in the page (this image does not replace it), for SEO + a11y.
// Above the fold, so not lazy. Fixed 1200x630 ratio avoids layout shift.

export default function ArticleHero({ slug }: { slug: string }) {
  return (
    // Constrained to the 800px content column (not full 1200px width) so the
    // article sits in a left column and leaves a clear right rail for the sticky
    // "On this page" ToC — matching the two-column article layout on sister sites.
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <img
        src={`/blog/${slug}/opengraph-image`}
        width={1200}
        height={630}
        alt=""
        style={{
          display: 'block',
          width: '100%',
          height: 'auto',
          aspectRatio: '1200 / 630',
          borderRadius: '16px',
          border: '1px solid #e5e7eb',
          marginBottom: '32px',
        }}
      />
    </div>
  );
}
