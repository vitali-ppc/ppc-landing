import { MetadataRoute } from 'next';
import fs from 'fs';
import path from 'path';

/**
 * Dynamic sitemap for kampaio.com
 *
 * Auto-discovers all blog articles from src/app/blog/<slug>/page.tsx
 * No manual updates needed — when SEO Agent Team publishes a new article,
 * Next.js automatically includes it in the sitemap on next build.
 *
 * Served at: https://www.kampaio.com/sitemap.xml
 *
 * This file replaces the static /public/sitemap.xml (which should be removed
 * to avoid conflict — Next.js dynamic sitemap takes precedence in app router).
 */

const BASE_URL = 'https://www.kampaio.com';

// Static routes — manually maintained
const STATIC_ROUTES: Array<{
  path: string;
  changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
}> = [
  { path: '/', changeFrequency: 'weekly', priority: 1.0 },
  { path: '/blog', changeFrequency: 'daily', priority: 0.8 },
  { path: '/tools/roas-calculator', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/b6', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/pricing', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/replace-google-ads-agency', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/fix-google-ads-account', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/ai-google-ads-management', changeFrequency: 'monthly', priority: 0.8 },
  // /ads hub: guide 'google ads for local business' (2026-11-09). Niche pages are listed
  // here only once written and indexable.
  { path: '/ads', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/ads/dentist', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/ads/real-estate', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/ads/lawyer', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/ads/saas', changeFrequency: 'monthly', priority: 0.7 },
  // '/chat' is deliberately absent: `chat/layout.tsx` sets `robots: 'noindex, nofollow'`,
  // and a sitemap entry is a request to index. Listing it told Google to index a page the
  // page itself refuses — the two instructions cannot both be honoured, so one was noise.
  { path: '/terms-of-service', changeFrequency: 'yearly', priority: 0.3 },
  { path: '/privacy-policy', changeFrequency: 'yearly', priority: 0.3 },
];

// Auto-discover blog articles from filesystem
function getBlogSlugs(): string[] {
  const blogDir = path.join(process.cwd(), 'src', 'app', 'blog');
  try {
    return fs
      .readdirSync(blogDir, { withFileTypes: true })
      .filter((dirent) => dirent.isDirectory())
      .map((dirent) => dirent.name);
  } catch (err) {
    console.error('[sitemap] Failed to read blog directory:', err);
    return [];
  }
}

// Article lastmod = the date the article itself declares (dateModified, else datePublished).
// Fixed 2026-11-10: this read only page.tsx, but the JSON-LD lives in ArticleContent.tsx, and the
// key is written both quoted and bare (`"dateModified": "…"` / `dateModified: '…'`). Every article
// fell back to file mtime, which on Vercel is the checkout time, so all 81 blog URLs carried the
// build date as lastmod. The sitemap must say what the reader sees (knowledge geo/04 section 4).
const DATE_RE = (key: string) =>
  new RegExp(`["']?${key}["']?\\s*:\\s*["'](\\d{4}-\\d{2}-\\d{2})`);

function getArticleLastMod(slug: string): Date | undefined {
  const dir = path.join(process.cwd(), 'src', 'app', 'blog', slug);
  try {
    const src = fs
      .readdirSync(dir)
      .filter((f) => f.endsWith('.tsx'))
      .map((f) => fs.readFileSync(path.join(dir, f), 'utf-8'))
      .join('\n');
    const m = src.match(DATE_RE('dateModified')) || src.match(DATE_RE('datePublished'));
    if (m) {
      const d = new Date(m[1]);
      if (!isNaN(d.getTime())) return d;
    }
  } catch {
    // fall through
  }
  // No declared date: omit lastmod rather than invent one.
  return undefined;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticEntries = STATIC_ROUTES.map((route) => ({
    url: `${BASE_URL}${route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const blogEntries = getBlogSlugs().map((slug) => ({
    url: `${BASE_URL}/blog/${slug}`,
    ...(getArticleLastMod(slug) ? { lastModified: getArticleLastMod(slug) } : {}),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticEntries, ...blogEntries];
}
