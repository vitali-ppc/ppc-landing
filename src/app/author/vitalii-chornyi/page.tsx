import type { Metadata } from 'next';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import { AUTHOR } from '../../../lib/author';
import { blogPosts, CATEGORY_LABEL } from '../../../lib/posts';

// Author page, as on the sister sites (owner 2026-11-11): the byline on every article links here.
export const metadata: Metadata = {
  title: `${AUTHOR.name}, ${AUTHOR.jobTitle}`,
  description: AUTHOR.metaDescription,
  alternates: { canonical: AUTHOR.url },
  openGraph: { title: AUTHOR.name, description: AUTHOR.bio, url: AUTHOR.url, type: 'profile' },
};

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    url: AUTHOR.url,
    mainEntity: {
      '@type': 'Person',
      '@id': AUTHOR.id,
      name: AUTHOR.name,
      jobTitle: AUTHOR.jobTitle,
      description: AUTHOR.bio,
      url: AUTHOR.url,
      sameAs: [AUTHOR.linkedin],
      worksFor: { '@id': 'https://www.kampaio.com/#organization' },
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.kampaio.com' },
      { '@type': 'ListItem', position: 2, name: AUTHOR.name, item: AUTHOR.url },
    ],
  },
];

const fmt = (d: string) =>
  new Date(d + 'T00:00:00Z').toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC' });

export default function AuthorPage() {
  const posts = [...blogPosts].sort((a, b) => (a.date < b.date ? 1 : -1));
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div style={{ minHeight: '100vh', background: 'white' }}>
        <Header />
        <main style={{ maxWidth: '800px', margin: '0 auto', padding: '140px 24px 80px', color: '#1e293b' }}>
          <nav aria-label="Breadcrumb" style={{ fontSize: '15px', color: '#64748b', marginBottom: '28px' }}>
            <a href="/" style={{ color: '#64748b', textDecoration: 'none' }}>Home</a>
            <span aria-hidden style={{ margin: '0 10px', color: '#cbd5e1' }}>/</span>
            <span aria-current="page" style={{ color: '#1e293b' }}>{AUTHOR.name}</span>
          </nav>
          <header style={{ borderBottom: '1px solid #e5e7eb', paddingBottom: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', fontWeight: 600, fontSize: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>VC</div>
              <span style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace', fontSize: '12px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#764ba2', fontWeight: 600 }}>Author</span>
            </div>
            <h1 style={{ fontSize: 'clamp(30px, 4vw, 44px)', fontWeight: 600, letterSpacing: '-0.02em', lineHeight: 1.15, margin: '0 0 8px' }}>{AUTHOR.name}</h1>
            <p style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace', fontSize: '13px', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#764ba2', margin: '0 0 20px' }}>{AUTHOR.jobTitle}</p>
            <p style={{ fontSize: '18px', lineHeight: 1.7, color: '#475569', margin: '0 0 20px' }}>{AUTHOR.bio}</p>
            <a href={AUTHOR.linkedin} target="_blank" rel="noopener me" style={{ color: '#764ba2', fontWeight: 600, textDecoration: 'none' }}>LinkedIn profile →</a>
          </header>
          <section aria-labelledby="by-author" style={{ marginTop: '40px' }}>
            <h2 id="by-author" style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace', fontSize: '12px', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#64748b', fontWeight: 600, margin: '0 0 8px' }}>
              Articles by {AUTHOR.name} ({posts.length})
            </h2>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, borderTop: '1px solid #e5e7eb' }}>
              {posts.map((p) => (
                <li key={p.slug} style={{ borderBottom: '1px solid #e5e7eb' }}>
                  <a href={`/blog/${p.slug}`} style={{ display: 'block', padding: '20px 0', textDecoration: 'none' }}>
                    <div style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace', fontSize: '12px', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#64748b', marginBottom: '6px' }}>
                      <span style={{ color: '#764ba2' }}>{CATEGORY_LABEL[p.category] ?? p.category}</span> · {p.readTime} · {fmt(p.date)}
                    </div>
                    <div style={{ fontSize: '18px', fontWeight: 600, lineHeight: 1.4, color: '#1e293b' }}>{p.title}</div>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
