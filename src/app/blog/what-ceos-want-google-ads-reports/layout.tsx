import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'What CEOs Want to See in Google Ads Reports | Kampaio',
  description: 'Learn which Google Ads metrics CEOs care about (hint: it\'s not clicks) and get the exact reporting template that secures bigger budgets. Expert insights for PPC professionals.',
  keywords: 'Google Ads reports, CEO metrics, PPC reporting, ROI tracking, customer acquisition cost, Google Ads strategy, PPC optimization',
  openGraph: {
    title: 'What CEOs Want to See in Google Ads Reports',
    description: 'Learn which Google Ads metrics CEOs care about and get the exact reporting template that secures bigger budgets.',
    type: 'article',
    url: 'https://kampaio.com/blog/what-ceos-want-google-ads-reports',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'What CEOs Want to See in Google Ads Reports'
      }
    ],
    authors: ['Kampaio Team'],
    publishedTime: '2024-12-15T00:00:00.000Z',
    modifiedTime: '2024-12-15T00:00:00.000Z'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'What CEOs Want to See in Google Ads Reports',
    description: 'Learn which Google Ads metrics CEOs care about and get the exact reporting template that secures bigger budgets.',
    images: ['/logo.png']
  },
  alternates: {
    canonical: 'https://kampaio.com/blog/what-ceos-want-google-ads-reports'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function BlogPostLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 