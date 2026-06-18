import type { Metadata } from 'next';
import RoasCalculator from './RoasCalculator';

export const metadata: Metadata = {
  title: 'Break-even & Target ROAS Calculator (with POAS) | kampaio',
  description:
    'Free break-even ROAS calculator. Enter your margin to get the ROAS you actually need, your target ROAS for a profit goal, POAS (profit on ad spend), and max CPA. No signup.',
  alternates: {
    canonical: 'https://www.kampaio.com/tools/roas-calculator',
  },
  openGraph: {
    title: 'Break-even & Target ROAS Calculator (with POAS)',
    description:
      'Revenue is not profit. Get your break-even ROAS, target ROAS for a profit goal, POAS, and max CPA. Free, no signup.',
    url: 'https://www.kampaio.com/tools/roas-calculator',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Break-even & Target ROAS Calculator (with POAS)',
    description:
      'Get your break-even ROAS, target ROAS, POAS, and max CPA from your margin. Free, no signup.',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      name: 'Break-even & Target ROAS Calculator (with POAS)',
      url: 'https://www.kampaio.com/tools/roas-calculator',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Any (web)',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      description:
        'Calculate break-even ROAS (1 ÷ margin), target ROAS for a profit goal, POAS (ROAS × margin), and max profitable CPA. Client-side, free, no signup.',
      publisher: { '@type': 'Organization', name: 'kampaio', url: 'https://www.kampaio.com' },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What is a break-even ROAS?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Break-even ROAS is the return on ad spend at which ad revenue exactly covers product costs plus the ad spend. It equals 1 divided by your gross margin. At a 30% margin break-even ROAS is 3.33×; at 50% it is 2.0×.',
          },
        },
        {
          '@type': 'Question',
          name: 'How do I calculate target ROAS for a profit goal?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Target ROAS = 1 ÷ (gross margin − desired net profit margin). For a 40% gross margin and a 10% net profit goal, target ROAS = 1 ÷ 0.30 = 3.33×.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is POAS and how is it different from ROAS?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'POAS (profit on ad spend) measures profit per dollar of ad spend. POAS = ROAS × gross margin. A 4× ROAS at a 25% margin is a POAS of 1.0 (break-even). ROAS can look strong while POAS shows a loss.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is a good ROAS?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'There is no universal good ROAS, only break-even for your margin. A 2× ROAS is profitable at a 60% margin but loses money at 30%. Compare ROAS to your break-even ROAS, not an industry average.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is the maximum CPA I can afford?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'At break-even, maximum CPA = average order value × gross margin (AOV × margin). To keep a profit, subtract desired profit margin first: max CPA = AOV × (margin − desired profit).',
          },
        },
      ],
    },
  ],
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <RoasCalculator />
    </>
  );
}
