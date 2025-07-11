import React from 'react'
import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import ScrollToTop from '../components/ScrollToTop'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'PPCSet - Digital Ecosystem',
    template: '%s | PPCSet'
  },
  description: 'Premium digital ecosystem: advertising, analytics, web development. For businesses that want more.',
  keywords: 'PPC, Google Ads, analytics, Node.js development, digital marketing, SEO, web development',
  authors: [{ name: 'PPCSet' }],
  creator: 'PPCSet',
  publisher: 'PPCSet',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://ppcset.com',
    siteName: 'PPCSet',
    title: 'PPCSet - Digital Ecosystem',
    description: 'Premium digital ecosystem: advertising, analytics, web development. For businesses that want more.',
    images: [
      {
        url: 'https://ppcset.com/logo.png',
        width: 1200,
        height: 630,
        alt: 'PPCSet Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PPCSet - Digital Ecosystem',
    description: 'Premium digital ecosystem: advertising, analytics, web development. For businesses that want more.',
    images: ['https://ppcset.com/logo.png'],
  },
  icons: {
    icon: [
      { url: '/logo.png', sizes: '32x32', type: 'image/png' },
      { url: '/logo.png', sizes: '16x16', type: 'image/png' }
    ],
    apple: '/logo.png',
  },
  verification: {
    google: 'your-google-verification-code',
  },
  alternates: {
    canonical: 'https://ppcset.com',
  },
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="/styles.css" />
      </head>
      <body className={inter.className}>
        {children}
        <ScrollToTop />
      </body>
    </html>
  )
} 