import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Google Ads by Industry',
  description: 'Kampaio is building AI agents for Google Ads. In development. Join early access.',
  // noindex until each niche has a real article behind it (flag 82, 2026-11-09).
  robots: { index: false, follow: true },
};

export default function AdsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
    </>
  );
} 