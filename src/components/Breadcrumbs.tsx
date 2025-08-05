'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Breadcrumbs() {
  const pathname = usePathname()
  
  // Функція для генерації breadcrumbs на основі поточного шляху
  const generateBreadcrumbs = (): Array<{title: string, path: string, isLast: boolean}> => {
    const segments = pathname.split('/').filter(segment => segment !== '')
    
    if (segments.length === 0) {
      return []
    }
    
    const breadcrumbs: Array<{title: string, path: string, isLast: boolean}> = []
    let currentPath = ''
    
    segments.forEach((segment, index) => {
      currentPath += `/${segment}`
      
      // Мапінг назв для красивого відображення
      let title = segment
      switch (segment) {
        case 'analytics':
          title = 'Analytics'
          break
        case 'nodejs-development':
          title = 'Node.js Development'
          break
        case 'nextjs-development':
          title = 'Next.js Development'
          break
        case 'ppc-performance':
          title = 'PPC Performance'
          break
        case 'modern-ppc':
          title = 'Modern PPC'
          break
        case 'blog':
          title = 'Blog'
          break
        case 'chat':
          title = 'Chat'
          break
        case 'generate':
          title = 'Generate'
          break
        default:
          title = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ')
      }
      
      breadcrumbs.push({
        title,
        path: currentPath,
        isLast: index === segments.length - 1
      })
    })
    
    return breadcrumbs
  }
  
  const breadcrumbs = generateBreadcrumbs()
  
  if (breadcrumbs.length === 0) {
    return null
  }
  
  return (
    <>
      <div className="container">
        <nav className="breadcrumbs-precisely breadcrumbs-color-1" aria-label="Breadcrumb">
          <Link href="/" aria-label="Go to home page">Home</Link>
          {breadcrumbs.map((breadcrumb, index) => (
            <React.Fragment key={breadcrumb.path}>
              <span className="separator" aria-label="Breadcrumb separator">/</span>
              {breadcrumb.isLast ? (
                <span className="current" aria-current="page">{breadcrumb.title}</span>
              ) : (
                <Link href={breadcrumb.path} aria-label={`Go to ${breadcrumb.title} page`}>{breadcrumb.title}</Link>
              )}
            </React.Fragment>
          ))}
        </nav>
      </div>
      
      {/* Schema.org BreadcrumbList */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://kampaio.com"
              },
              ...breadcrumbs.map((breadcrumb, index) => ({
                "@type": "ListItem",
                "position": index + 2,
                "name": breadcrumb.title,
                "item": `https://kampaio.com${breadcrumb.path}`
              }))
            ]
          })
        }}
      />
    </>
  )
} 