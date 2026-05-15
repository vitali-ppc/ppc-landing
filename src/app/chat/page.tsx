import type { Metadata } from 'next';
import ChatContent from './ChatContent';

export const metadata: Metadata = {
  title: 'Chat with Kampaio AI: Instant Google Ads Insights',
  description:
    'Chat with our AI to get instant Google Ads advice, audit your account, or generate campaign strategy. Free preview, no signup required.',
  alternates: { canonical: 'https://www.kampaio.com/chat' },
  openGraph: {
    title: 'Free PPC AI Chat | Kampaio',
    description: 'Get instant Google Ads advice from our AI. No signup needed.',
    url: 'https://www.kampaio.com/chat',
    type: 'website',
    images: [
      {
        url: '/og/chat.png',
        width: 1200,
        height: 630,
        alt: 'Kampaio AI Chat for Google Ads',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free PPC AI Chat | Kampaio',
    description: 'Get instant Google Ads advice from our AI. No signup needed.',
    images: ['/og/chat.png'],
  },
};

export default function Page() {
  return <ChatContent />;
}
