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
    if (!pathname || !/^\/blog\/[^/]+\/?$/.test(pathname)) return;
    const h1 = document.querySelector('main h1');
    if (!h1) return;
    const t = (h1.textContent || '').trim().split(':')[0].trim();
    setTitle(t.length > 70 ? t.slice(0, 67).trimEnd() + '...' : t);
    // Above the hero image when there is one (as on the sister sites), else above the H1.
    const hero = document.querySelector('main .article-hero');
    const anchor = (hero || h1) as HTMLElement;
    const el = document.createElement('div');
    el.setAttribute('data-article-breadcrumbs', '');
    if (hero) el.style.maxWidth = '800px', (el.style.margin = '0 auto');
    anchor.parentElement!.insertBefore(el, anchor);
    // The header is fixed and the hero container starts at the top of the page, so the hero
    // image sat ~80px under the header on every article (measured 2026-11-11: header bottom
    // 102px, image top 20px). Push the trail (and the image below it) clear of the header.
    const fit = () => {
      if (!hero) return;
      el.style.paddingTop = '0px';
      const hb = document.querySelector('.next-header')?.getBoundingClientRect().bottom ?? 0;
      const top = el.getBoundingClientRect().top + window.scrollY;
      el.style.paddingTop = Math.max(0, Math.round(hb - top + 24)) + 'px';
    };
    fit();
    window.addEventListener('resize', fit);
    setHost(el);
    return () => { window.removeEventListener('resize', fit); el.remove(); setHost(null); };
  }, [pathname]);

  if (!host) return null;
  const link = { color: '#64748b', textDecoration: 'none' } as const;
  const sep = <span aria-hidden style={{ margin: '0 10px', color: '#cbd5e1' }}>/</span>;
  return createPortal(
    <nav aria-label="Breadcrumb" style={{ fontSize: '15px', color: '#64748b', marginBottom: '20px', lineHeight: 1.5 }}>
      <a href="/" style={link}>Home</a>
      {sep}
      <a href="/blog" style={link}>Blog</a>
      {sep}
      <span aria-current="page" style={{ color: '#1e293b' }}>{title}</span>
    </nav>,
    host
  );
}
