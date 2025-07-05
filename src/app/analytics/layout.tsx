import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Analytics for PPC — Conversion Tracking & Insights | PPCSet',
  description: 'Advanced analytics and conversion tracking for PPC campaigns. Get actionable insights, Google Analytics 4 setup, and data-driven optimization from PPCSet.',
  keywords: 'PPC analytics, conversion tracking, Google Analytics 4, PPC insights, data-driven advertising, PPCSet',
  authors: [{ name: 'PPCSet' }],
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    url: 'https://ppcset.com/analytics',
    title: 'Analytics for PPC — Conversion Tracking & Insights | PPCSet',
    description: 'Advanced analytics and conversion tracking for PPC campaigns. Get actionable insights, Google Analytics 4 setup, and data-driven optimization from PPCSet.',
    images: [
      {
        url: 'https://ppcset.com/logo.png',
        width: 1200,
        height: 630,
        alt: 'PPCSet Logo',
      },
    ],
    siteName: 'PPCSet',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Analytics for PPC — Conversion Tracking & Insights | PPCSet',
    description: 'Advanced analytics and conversion tracking for PPC campaigns. Get actionable insights, Google Analytics 4 setup, and data-driven optimization from PPCSet.',
    images: ['https://ppcset.com/logo.png'],
  },
  alternates: {
    canonical: 'https://ppcset.com/analytics',
  },
}

export default function AnalyticsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 