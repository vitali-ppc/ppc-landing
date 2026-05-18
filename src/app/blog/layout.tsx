import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kampaio Blog: AI-Powered Google Ads Insights',
  description:
    'Practical AI and PPC insights for SMB advertisers. Diagnostic playbooks, technical PPC strategy, and Google Ads automation from the Kampaio team.',
  alternates: { canonical: 'https://www.kampaio.com/blog' },
  openGraph: {
    title: 'Kampaio Blog',
    description: 'AI-powered Google Ads insights for SMB advertisers.',
    url: 'https://www.kampaio.com/blog',
    type: 'website',
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
