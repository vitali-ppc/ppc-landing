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
  { path: '/b6', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/pricing', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/chat', changeFrequency: 'monthly', priority: 0.5 },
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

// Try to get article's last modified date from JSON-LD inside page.tsx
function getArticleLastMod(slug: string): Date {
  try {
    const filePath = path.join(process.cwd(), 'src', 'app', 'blog', slug, 'page.tsx');
    const content = fs.readFileSync(filePath, 'utf-8');
    // Match dateModified or datePublished from JSON-LD
    const match =
      content.match(/"dateModified":\s*"([^"]+)"/) ||
      content.match(/"datePublished":\s*"([^"]+)"/);
    if (match) {
      const date = new Date(match[1]);
      if (!isNaN(date.getTime())) return date;
    }
  } catch {
    // fall through
  }
  // Fallback: file mtime
  try {
    const filePath = path.join(process.cwd(), 'src', 'app', 'blog', slug, 'page.tsx');
    return fs.statSync(filePath).mtime;
  } catch {
    return new Date();
  }
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
    lastModified: getArticleLastMod(slug),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticEntries, ...blogEntries];
}
