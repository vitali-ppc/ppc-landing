import type { Metadata } from 'next';
import ResetPasswordContent from './ResetPasswordContent';

export const metadata: Metadata = {
  title: 'Reset Password',
  description: 'Reset the password for your Kampaio account.',
  robots: 'noindex, nofollow',
  alternates: { canonical: 'https://www.kampaio.com/reset-password' },
};

export default function Page() {
  return <ResetPasswordContent />;
}
