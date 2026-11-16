'use client';

// Visible "Home / Blog / <article>" trail above the article title (the sister sites have one;
// kampaio only had the BreadcrumbList JSON-LD). Mounted once in blog/layout.tsx: it finds the
// article's <h1> and renders into a node inserted at the top of the h1's column, so no
// per-article wiring. Not shown on the /blog index.
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { usePathname } from 'next/navigation';

export default function ArticleBreadcrumbs() {
  const pathname = usePathname();
  const [host, setHost] = useState<HTMLElement | null>(null);
  const [title, setTitle] = useState('');

  useEffect(() => {
    if (!pathname || !/^\/(blog\/[^/]+|ads(\/[^/]+)?)\/?$/.test(pathname)) return;
    const h1 = document.querySelector('main h1');
    if (!h1) return;
    const t = (h1.textContent || '').trim().split(':')[0].trim();
    setTitle(t.length > 70 ? t.slice(0, 67).trimEnd() + '...' : t);
    // Above the hero image when there is one (as on the sister sites), else above the H1.
    const hero = document.querySelector('main .article-hero');
    const anchor = (hero || h1) as HTMLElement;
    const el = document.createElement('div');
    el.setAttribute('data-article-breadcrumbs', '');
    // With a hero, the slot is reserved in CSS (articleShellCss: .article-hero padding-top) and the
    // trail is laid absolutely into it, so inserting it moves nothing (flag CLS-SHELL, 2026-11-16).
    if (hero) hero.insertBefore(el, hero.firstChild);
    else anchor.parentElement!.insertBefore(el, anchor);
    // The fixed header used to be cleared here by measuring it and padding the trail after
    // hydration; that moved the article header (flag CLS-SHELL). The offsets now live in CSS.
    setHost(el);
    return () => { el.remove(); setHost(null); };
  }, [pathname]);

  if (!host) return null;
  const link = { color: '#64748b', textDecoration: 'none' } as const;
  const isAds = !!pathname && pathname.startsWith('/ads');
  const isAdsHub = !!pathname && /^\/ads\/?$/.test(pathname);
  const sep = <span aria-hidden style={{ margin: '0 10px', color: '#cbd5e1' }}>/</span>;
  return createPortal(
    <nav aria-label="Breadcrumb" style={{ fontSize: '15px', color: '#64748b', marginBottom: '20px', lineHeight: 1.5 }}>
      <a href="/" style={link}>Home</a>
      {sep}
      {isAdsHub ? (
        <span aria-current="page" style={{ color: '#1e293b' }}>Industries</span>
      ) : (
        <>
          <a href={isAds ? '/ads' : '/blog'} style={link}>{isAds ? 'Industries' : 'Blog'}</a>
          {sep}
          <span aria-current="page" style={{ color: '#1e293b' }}>{title}</span>
        </>
      )}
    </nav>,
    host
  );
}
