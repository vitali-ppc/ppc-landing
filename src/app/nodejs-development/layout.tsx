import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Node.js Development Services | PPCSet',
  description: 'Professional Node.js development services: full-stack web apps, APIs, real-time solutions, and scalable business platforms. Get expert Node.js consulting and agile delivery from PPCSet.',
  keywords: 'Node.js development, Node.js services, web app development, API development, real-time apps, scalable solutions, JavaScript, PPCSet',
  authors: [{ name: 'PPCSet' }],
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    url: 'https://ppcset.com/nodejs-development',
    title: 'Node.js Development Services | PPCSet',
    description: 'Professional Node.js development services: full-stack web apps, APIs, real-time solutions, and scalable business platforms. Get expert Node.js consulting and agile delivery from PPCSet.',
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
    title: 'Node.js Development Services | PPCSet',
    description: 'Professional Node.js development services: full-stack web apps, APIs, real-time solutions, and scalable business platforms. Get expert Node.js consulting and agile delivery from PPCSet.',
    images: ['https://ppcset.com/logo.png'],
  },
  alternates: {
    canonical: 'https://ppcset.com/nodejs-development',
  },
}

export default function NodeJsDevelopmentLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 