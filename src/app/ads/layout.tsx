import { Metadata } from 'next';
import { generateSEOTitle, generateSEODescription } from '../../../utils/seo';

export const metadata: Metadata = {
  title: 'AI-Powered Local Google Ads | City-Specific PPC Strategies',
  description: 'Discover AI-optimized Google Ads strategies for local businesses. Get city-specific PPC insights and proven campaign examples to grow your local customer base.',
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