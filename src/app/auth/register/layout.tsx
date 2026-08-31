import type { Metadata } from 'next';

/**
 * Keeps /auth/register out of the index.
 *
 * The route had no metadata of its own and inherited `robots: index, follow`
 * from the root layout, so it was served to crawlers under the homepage's own
 * title and description — two more indexable URLs competing with the homepage
 * for the same words, offering a searcher a form instead of an answer.
 *
 * Same defect and same fix as `dashboard/layout.tsx` (2026-08-27); that sweep
 * covered /dashboard and /chat and did not reach /auth/*. kampaio flag #85.
 *
 * Metadata has to live in a layout because page.tsx is a client component and a
 * client component cannot export `metadata`.
 *
 * This is indexing only. It changes nothing about access.
 */
export const metadata: Metadata = {
  // The root layout appends ' | Kampaio' via its title template, so naming the
  // brand here would render it twice.
  title: 'Create Account',
  robots: 'noindex, nofollow',
};

export default function RegisterLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
