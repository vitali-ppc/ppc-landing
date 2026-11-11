'use client';

// Thin bar that fills left-to-right as the reader scrolls an article (same pattern as the
// sister sites). Sits on the bottom edge of the fixed header (.next-header); the header's
// real height is measured, not hard-coded. Shown on articles only: hidden on the /blog index.
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function ReadingProgress() {
  const pathname = usePathname();
  const [progress, setProgress] = useState(0);
  const [top, setTop] = useState(0);

  useEffect(() => {
    const update = () => {
      const el = document.documentElement;
      const scrollable = el.scrollHeight - el.clientHeight;
      setProgress(scrollable > 0 ? (el.scrollTop / scrollable) * 100 : 0);
      const h = document.querySelector('.next-header');
      setTop(h ? Math.round(h.getBoundingClientRect().bottom) : 0);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [pathname]);

  if (!pathname || pathname === '/blog' || pathname === '/blog/') return null;

  return (
    <div
      aria-hidden
      style={{ position: 'fixed', left: 0, right: 0, top, height: 3, zIndex: 1001, background: 'transparent' }}
    >
      <div style={{ height: '100%', width: `${progress}%`, background: '#764ba2', transition: 'width 75ms ease-out' }} />
    </div>
  );
}
