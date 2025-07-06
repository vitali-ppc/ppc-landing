import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Breadcrumbs from '@/components/Breadcrumbs'

export const metadata: Metadata = {
  title: 'PPCSet Blog — Articles on PPC, Analytics & Digital Advertising',
  description: 'PPCSet Blog: Useful articles on PPC, analytics, Google Ads, Meta, LinkedIn, modern marketing, and campaign optimization.',
  keywords: 'PPC blog, analytics, Google Ads, Meta Ads, LinkedIn Ads, digital marketing, advertising optimization, articles, cases, PPCSet',
  authors: [{ name: 'PPCSet' }],
  robots: 'index, follow',
  alternates: {
    canonical: 'https://ppcset.com/blog'
  },
  openGraph: {
    type: 'website',
    url: 'https://ppcset.com/blog',
    title: 'PPCSet Blog — Articles on PPC, Analytics & Digital Advertising',
    description: 'PPCSet Blog: Useful articles on PPC, analytics, Google Ads, Meta, LinkedIn, modern marketing, and campaign optimization.',
    images: ['https://ppcset.com/logo.png'],
    siteName: 'PPCSet',
    locale: 'en_US'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PPCSet Blog — Articles on PPC, Analytics & Digital Advertising',
    description: 'PPCSet Blog: Useful articles on PPC, analytics, Google Ads, Meta, LinkedIn, modern marketing, and campaign optimization.',
    images: ['https://ppcset.com/logo.png']
  }
}

export default function BlogPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": "PPCSet Blog — Articles on PPC, Analytics & Digital Advertising",
            "description": "PPCSet Blog: Useful articles on PPC, analytics, Google Ads, Meta, LinkedIn, modern marketing, and campaign optimization.",
            "image": "https://ppcset.com/logo.png",
            "author": {
              "@type": "Organization",
              "name": "PPCSet",
              "url": "https://ppcset.com"
            },
            "publisher": {
              "@type": "Organization",
              "name": "PPCSet",
              "logo": {
                "@type": "ImageObject",
                "url": "https://ppcset.com/logo.png"
              }
            },
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "https://ppcset.com/blog"
            }
          })
        }}
      />
      
      <Header />
      <Breadcrumbs />
      
      <div className="container">
        <h1>Блог</h1>
        <p>Тут буде контент блогу...</p>
      </div>
      
      <Footer />
    </>
  )
} 