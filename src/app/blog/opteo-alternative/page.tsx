import type { Metadata } from 'next';
import ArticleContent from './ArticleContent';

export const metadata: Metadata = {
  title: 'Opteo Alternatives 2026: Verified Pricing & Picks',
  description:
    "Live-checked pricing for 6 real Opteo alternatives (Optmyzr, Adalysis, Madgicx, TrueClicks, WordStream, PPC.io), plus when switching away from Opteo isn't actually worth it.",
  alternates: {
    canonical: 'https://www.kampaio.com/blog/opteo-alternative',
  },
  openGraph: {
    title: 'Opteo Alternatives: Verified Pricing, Honest Picks for 2026',
    description:
      "Live-checked pricing for 6 real Opteo alternatives (Optmyzr, Adalysis, Madgicx, TrueClicks, WordStream, PPC.io), plus when switching away from Opteo isn't actually worth it.",
    url: 'https://www.kampaio.com/blog/opteo-alternative',
    type: 'article',
    images: [
      {
        url: '/og/opteo-alternative.png',
        width: 1200,
        height: 630,
        alt: 'Opteo Alternatives: Verified Pricing, Honest Picks for 2026, kampaio.com/blog',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Opteo Alternatives: Verified Pricing, Honest Picks for 2026',
    description:
      'Verified 2026 pricing for Optmyzr, Adalysis, Madgicx, TrueClicks, WordStream, and PPC.io, plus when staying on Opteo is the right call.',
    images: ['/og/opteo-alternative.png'],
  },
};

export default function Page() {
  return <ArticleContent />;
}
