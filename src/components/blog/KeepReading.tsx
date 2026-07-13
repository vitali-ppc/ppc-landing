// "Keep reading" recirculation block: same-category articles first, then recent
// others. Each card shows the article cover thumbnail (the per-article OG route)
// so the block matches the blog index visually. Drives the +1-page return rate.

import { relatedPosts, CATEGORY_LABEL } from '../../lib/posts';

export default function KeepReading({ slug, category }: { slug: string; category: string }) {
  const posts = relatedPosts(slug, category, 3);
  if (posts.length === 0) return null;

  return (
    <section style={{ maxWidth: '1200px', margin: '-40px auto 0', padding: '40px 24px 0', borderTop: '1px solid #e5e7eb' }}>
      {/* Inner column matches the 800px article body so the cards align under the
          content and never sit beneath the right-rail ToC. */}
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h2
        style={{
          fontSize: '13px',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          color: '#64748b',
          marginBottom: '24px',
        }}
      >
        Keep reading
      </h2>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '24px',
        }}
        className="keep-reading-grid"
      >
        {posts.map((p) => (
          <a
            key={p.slug}
            href={`/blog/${p.slug}`}
            style={{
              display: 'flex',
              flexDirection: 'column',
              textDecoration: 'none',
              borderRadius: '12px',
              border: '1px solid #e5e7eb',
              background: '#ffffff',
              overflow: 'hidden',
            }}
          >
            <img
              src={`/blog/${p.slug}/opengraph-image`}
              width={1200}
              height={630}
              alt=""
              loading="lazy"
              style={{ display: 'block', width: '100%', height: 'auto', aspectRatio: '1200 / 630' }}
            />
            <div style={{ padding: '16px' }}>
              <div
                style={{
                  fontFamily: 'monospace',
                  fontSize: '11px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  color: '#667eea',
                  marginBottom: '8px',
                }}
              >
                {CATEGORY_LABEL[p.category] ?? p.category}
              </div>
              <div style={{ fontSize: '15px', fontWeight: 600, lineHeight: 1.4, color: '#1e293b' }}>{p.title}</div>
            </div>
          </a>
        ))}
      </div>
      </div>
      <style
        dangerouslySetInnerHTML={{
          __html: '@media (max-width: 640px){.keep-reading-grid{grid-template-columns:1fr !important}}',
        }}
      />
    </section>
  );
}
