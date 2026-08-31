import type { Metadata } from 'next';
import LoginContent from './LoginContent';

export const metadata: Metadata = {
  title: 'Login',
  description: 'Login to your Kampaio account to access B6 autonomous PPC tools.',
  robots: 'noindex, nofollow',
  alternates: { canonical: 'https://www.kampaio.com/login' },
};

export default function Page() {
  return <LoginContent />;
}
