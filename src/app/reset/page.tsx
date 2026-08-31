import type { Metadata } from 'next';
import ResetContent from './ResetContent';

export const metadata: Metadata = {
  title: 'Reset',
  description: 'Account reset for your Kampaio account.',
  robots: 'noindex, nofollow',
  alternates: { canonical: 'https://www.kampaio.com/reset' },
};

export default function Page() {
  return <ResetContent />;
}
