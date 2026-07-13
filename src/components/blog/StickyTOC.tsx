'use client';

// Sticky "On this page" sidebar for blog articles. Self-contained: it scans the
// rendered <section id> + <h2> pairs from the DOM, so it needs zero per-article
// wiring — mounted once in blog/layout.tsx and applies to every article. Desktop
// only (there is room in the right gutter beside the 800px content column);
// on narrow screens it hides and the in-article collapsible ToC covers mobile.
// Auto-hides when it finds fewer than 2 sections (e.g. the /blog index).

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

type Item = { id: string; text: string };

export default function StickyTOC() {
  const pathname = usePathname();
  const [items, setItems] = useState<Item[]>([]);
  const [active, setActive] = useState<string>('');
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll('section[id]'))
      .filter((s) => s.querySelector('h2'))
      .map((s) => ({ id: s.id, text: (s.querySelector('h2')?.textContent || '').trim() }))
      .filter((i) => i.id && i.text.length > 0);

    setItems(sections);
    if (sections.length < 2) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive((visible[0].target as HTMLElement).id);
      },
      { rootMargin: '-96px 0px -68% 0px', threshold: 0 }
    );

    sections.forEach((i) => {
      const el = document.getElementById(i.id);
      if (el) observer.observe(el);
    });

    // Show the sidebar only once the reader has scrolled into the article body
    // (past the hero cover), and hide it again near the footer, so it never
    // floats over the hero or the recirculation block.
    const firstEl = document.getElementById(sections[0].id);
    const lastEl = document.getElementById(sections[sections.length - 1].id);
    const onScroll = () => {
      const top = firstEl?.getBoundingClientRect().top ?? Infinity;
      const bottom = lastEl?.getBoundingClientRect().bottom ?? Infinity;
      // Appear as soon as the article body enters the upper part of the viewport
      // (hero mostly scrolled off), hide again near the footer.
      setShown(top < window.innerHeight * 0.6 && bottom > 240);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, [pathname]);

  if (items.length < 2) return null;

  const handleClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className={`sticky-toc${shown ? ' shown' : ''}`} aria-label="On this page">
      <div className="sticky-toc-title">On this page</div>
      <ul>
        {items.map((it) => (
          <li key={it.id}>
            <a
              href={`#${it.id}`}
              onClick={(e) => handleClick(e, it.id)}
              className={active === it.id ? 'active' : ''}
            >
              {it.text}
            </a>
          </li>
        ))}
      </ul>
      <style jsx>{`
        .sticky-toc {
          position: fixed;
          top: 140px;
          left: calc(50% + 408px);
          width: 210px;
          max-height: calc(100vh - 200px);
          overflow-y: auto;
          display: none;
          opacity: 0;
          transform: translateY(4px);
          transition: opacity 0.2s ease, transform 0.2s ease;
          pointer-events: none;
          z-index: 10;
        }
        @media (min-width: 1260px) {
          .sticky-toc {
            display: block;
          }
          .sticky-toc.shown {
            opacity: 1;
            transform: translateY(0);
            pointer-events: auto;
          }
        }
        .sticky-toc-title {
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: #94a3b8;
          margin-bottom: 14px;
        }
        ul {
          list-style: none;
          margin: 0;
          padding: 0;
          border-left: 2px solid #e5e7eb;
        }
        li {
          margin: 0;
        }
        a {
          display: block;
          padding: 6px 0 6px 16px;
          margin-left: -2px;
          border-left: 2px solid transparent;
          color: #64748b;
          text-decoration: none;
          font-size: 14px;
          line-height: 1.45;
          transition: color 0.15s ease, border-color 0.15s ease;
        }
        a:hover {
          color: #1e293b;
        }
        a.active {
          color: #764ba2;
          border-left-color: #764ba2;
          font-weight: 600;
        }
      `}</style>
    </nav>
  );
}
