import type { Metadata } from 'next';
import ArticleContent from './ArticleContent';

export const metadata: Metadata = {
  title: 'How to Scale Google Ads Without Losing ROAS (2026 Playbook)',
  description: 'Scaling Google Ads spend without tanking ROAS comes down to one rule: raise budgets 20% at a time, wait for Smart Bidding to re-stabilize, and expand demand instead of buying more of the same clicks. Seven-step playbook with thresholds.',
  alternates: {
    canonical: 'https://www.kampaio.com/blog/how-to-scale-google-ads-without-losing-roas',
  },
  openGraph: {
    title: 'How to Scale Google Ads Without Losing ROAS (2026 Playbook)',
    description: 'Raise budgets 20% at a time, wait 7-14 days for Smart Bidding to re-stabilize, and expand demand instead of buying more of the same clicks. A seven-step scaling playbook with thresholds.',
    url: 'https://www.kampaio.com/blog/how-to-scale-google-ads-without-losing-roas',
    type: 'article',
    images: [{ url: '/og/how-to-scale-google-ads-without-losing-roas.png', width: 1200, height: 630, alt: 'How to Scale Google Ads Without Losing ROAS, kampaio.com/blog' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How to Scale Google Ads Without Losing ROAS (2026 Playbook)',
    description: 'Raise budgets 20% at a time, wait 7-14 days for Smart Bidding to re-stabilize, and expand demand instead of buying more of the same clicks.',
    images: ['/og/how-to-scale-google-ads-without-losing-roas.png'],
  },
};

export default function Page() {
  return <ArticleContent />;
}
