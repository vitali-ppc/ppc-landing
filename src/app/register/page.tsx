import type { Metadata } from 'next';
import RegisterContent from './RegisterContent';

export const metadata: Metadata = {
  title: 'Sign Up | Kampaio',
  description: 'Create your Kampaio account and start managing Google Ads with AI agents.',
  robots: 'noindex, nofollow',
  alternates: { canonical: 'https://www.kampaio.com/register' },
};

export default function Page() {
  return <RegisterContent />;
}
