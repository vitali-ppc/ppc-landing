// Single source of truth for kampaio's article author (E-E-A-T entity), same pattern as the
// sister sites (saasflywheel/aitakescare src/lib/author.ts). Used by /author/vitalii-chornyi
// (Person JSON-LD with sameAs) and referenced by every article's `author` @id.
// One real person, no fabricated credentials. Added 2026-11-11 (owner).
export const AUTHOR = {
  name: 'Vitalii Chornyi',
  slug: 'vitalii-chornyi',
  jobTitle: 'Performance Marketer',
  id: 'https://www.kampaio.com/#person-vitalii-chornyi',
  url: 'https://www.kampaio.com/author/vitalii-chornyi',
  // Same profile as on saasflywheel.io (owner-confirmed there 2026-07-28).
  linkedin: 'https://www.linkedin.com/in/vitali-chornyi-26b294b4/',
  bio: "Vitalii Chornyi is a performance marketer who works on Google Ads accounts day to day. He writes Kampaio's guides on diagnosing Google Ads problems, bidding, conversion tracking and account structure.",
} as const;
