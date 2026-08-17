import React from 'react'
import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import Script from 'next/script'
import './globals.css'
import ScrollToTop from '../components/ScrollToTop'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  // www, matching what the site actually serves: the apex 308-redirects to www,
  // the sitemap is built from www, and every page-level canonical is www. A
  // non-www metadataBase resolved relative OG paths onto a hostname that only
  // ever redirects.
  metadataBase: new URL('https://www.kampaio.com'),
  title: {
    default: 'Kampaio: AI-Powered Google Ads Management',
    template: '%s | Kampaio'
  },
  description: 'Kampaio runs your Google Ads with a team of AI agents: bidding, risk review, anomaly monitoring and reporting, with every proposed change shown before it executes.',
  keywords: 'Google Ads, PPC, Google Ads automation, AI Google Ads management, campaign optimization, PPC agency alternative',
  authors: [{ name: 'Kampaio' }],
  creator: 'Kampaio',
  publisher: 'Kampaio',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.kampaio.com',
    siteName: 'Kampaio',
    title: 'Kampaio: AI-Powered Google Ads Management',
    description: 'Kampaio runs your Google Ads with a team of AI agents: bidding, risk review, anomaly monitoring and reporting, with every proposed change shown before it executes.',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'Kampaio Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kampaio: AI-Powered Google Ads Management',
    description: 'Kampaio runs your Google Ads with a team of AI agents: bidding, risk review, anomaly monitoring and reporting, with every proposed change shown before it executes.',
    images: ['/logo.png'],
  },
  icons: {
    icon: [
      { url: '/logo.png', sizes: '32x32', type: 'image/png' },
      { url: '/logo.png', sizes: '16x16', type: 'image/png' }
    ],
    apple: '/logo.png',
  },
  verification: {
    google: 'rfakIoGZslX3ywBADcoRGc73d3zofSCJwY5X9UKyifI',
  },
  // No root-level canonical on purpose. Next.js inherits `alternates` into every
  // route that does not declare its own, so a canonical here does not mean "the
  // homepage is canonical". It means eight routes (/ads/*, /auth/login,
  // /auth/register, /dashboard) were telling Google they are duplicates of the
  // homepage. Pages that need one declare it themselves; the rest self-
  // canonicalise, which is the correct default.
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#23272f',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Inter comes from next/font (self-hosted, applied on <body> below).
            The render-blocking fonts.googleapis stylesheet fetched the same
            family a second time, from a third party, on every page. */}
        <link rel="stylesheet" href="/styles.css" />
      </head>
      <body className={inter.className}>
        {children}
        <ScrollToTop />
        <Analytics />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-SFW7SQSRWK"
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-SFW7SQSRWK');
          `}
        </Script>
      </body>
    </html>
  )
} 