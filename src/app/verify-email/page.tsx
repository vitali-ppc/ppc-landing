import type { Metadata } from 'next';
import VerifyEmailContent from './VerifyEmailContent';

export const metadata: Metadata = {
  title: 'Verify Email | Kampaio',
  description: 'Confirm your email address to activate your Kampaio account.',
  robots: 'noindex, nofollow',
  alternates: { canonical: 'https://www.kampaio.com/verify-email' },
};

export default function Page() {
  return <VerifyEmailContent />;
}
