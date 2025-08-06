import React from 'react'
import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import ScrollToTop from '../components/ScrollToTop'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://kampaio.com'),
  title: {
    default: 'Kampaio - Digital Ecosystem',
    template: '%s | Kampaio'
  },
  description: 'Premium digital ecosystem: advertising, analytics, web development. For businesses that want more.',
  keywords: 'PPC, Google Ads, analytics, Node.js development, digital marketing, SEO, web development',
  authors: [{ name: 'Kampaio' }],
  creator: 'Kampaio',
  publisher: 'Kampaio',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://kampaio.com',
    siteName: 'Kampaio',
    title: 'Kampaio - Digital Ecosystem',
    description: 'Premium digital ecosystem: advertising, analytics, web development. For businesses that want more.',
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
    title: 'Kampaio - Digital Ecosystem',
    description: 'Premium digital ecosystem: advertising, analytics, web development. For businesses that want more.',
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
  alternates: {
    canonical: 'https://kampaio.com',
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