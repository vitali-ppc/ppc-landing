// Only formatNiche is read (NichePromoBlock). The template generators for niche × city
// pages (generateTitle / SEOParagraph / ...) and their 12-niche dictionaries were removed
// 2026-11-09 with the /ads cleanup (flag 82): nothing imported them any more.
export function formatNiche(niche: string) {
  if (niche.toLowerCase() === 'saas') {
    return 'SaaS';
  }
  return niche
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
