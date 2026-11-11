// Single source of truth for kampaio's article author (E-E-A-T entity), same pattern as the
// sister sites (saasflywheel/aitakescare src/lib/author.ts). Used by /author/vitalii-chornyi
// (Person JSON-LD with sameAs) and referenced by every article's `author` @id.
// One real person, no fabricated credentials. Added 2026-11-11 (owner).
export const AUTHOR = {
  name: 'Vitalii Chornyi',
  slug: 'vitalii-chornyi',
  jobTitle: 'Google Ads Strategist',
  id: 'https://www.kampaio.com/#person-vitalii-chornyi',
  url: 'https://www.kampaio.com/author/vitalii-chornyi',
  // Same profile as on saasflywheel.io (owner-confirmed there 2026-07-28).
  linkedin: 'https://www.linkedin.com/in/vitali-chornyi-26b294b4/',
  bio: "Vitalii Chornyi writes Kampaio's guides on Google Ads for business owners, in-house PPC managers and agencies: why an account stopped performing, bidding and Performance Max, conversion tracking, and when an agency or a tool is worth paying for. He builds each guide on Google's own documentation, says plainly when a number comes from a vendor, and does not claim tests he did not run.",
  // <=160 variant for metadata.description only (same split as on saasflywheel).
  metaDescription:
    "Vitalii Chornyi writes Kampaio's Google Ads guides for business owners, PPC managers and agencies, built on Google's own documentation.",
} as const;
