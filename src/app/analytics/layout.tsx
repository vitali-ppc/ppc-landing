import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Analytics Services | PPCSet',
  description: 'Professional analytics and reporting services. Get data-driven insights, automated reporting, and performance optimization for your business growth.',
  keywords: 'analytics, reporting, data insights, performance optimization, business intelligence, PPCSet',
  authors: [{ name: 'PPCSet' }],
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    url: 'https://ppcset.com/analytics',
    title: 'Analytics Services | PPCSet',
    description: 'Professional analytics and reporting services. Get data-driven insights, automated reporting, and performance optimization for your business growth.',
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
    title: 'Analytics Services | PPCSet',
    description: 'Professional analytics and reporting services. Get data-driven insights, automated reporting, and performance optimization for your business growth.',
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