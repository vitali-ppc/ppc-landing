import type { Metadata } from 'next';

/**
 * Keeps /dashboard out of the index.
 *
 * The route is 2702 lines of campaign interface and it was serving
 * `robots: index, follow` inherited from the root layout, so it invited
 * crawling of an empty shell: a crawler saw the site's own homepage title
 * followed by "Checking connection... Campaign Dashboard, No account selected,
 * N/A". Absent from sitemap.xml is not protection; a page is discoverable by
 * link and by inheritance regardless.
 *
 * Two costs, both avoidable: it competes with the homepage for the same title,
 * and an app frame with no data reads as a broken page to anyone who lands on
 * it from search. App UI has nothing to offer a searcher.
 *
 * Metadata has to live in a layout because page.tsx is a client component and
 * a client component cannot export `metadata`. Same shape as `chat/layout.tsx`.
 *
 * This is indexing only. It changes nothing about access: the route stays open
 * to anyone with the link, and whether it should sit behind AuthGuard is a
 * separate decision that also depends on the backend being alive.
 */
export const metadata: Metadata = {
  // The root layout appends ' | Kampaio' via its title template, so naming the
  // brand here would render it twice.
  title: 'Campaign Dashboard',
  robots: 'noindex, nofollow',
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
