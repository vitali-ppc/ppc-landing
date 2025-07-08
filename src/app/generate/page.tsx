import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Breadcrumbs from '@/components/Breadcrumbs'
import ScrollToTop from '@/components/ScrollToTop'

export const metadata: Metadata = {
  title: 'Результат генерації | PPCSet',
  description: 'Рекламний текст від GPT - результат генерації',
  robots: 'noindex, nofollow'
}

export default function GeneratePage() {
  return (
    <>
      <Header />
      <Breadcrumbs />
      
      <div className="container" style={{ padding: '20px 0' }}>
        <h2>Рекламний текст від GPT</h2>
        <pre style={{
          background: '#f5f5f5',
          padding: '20px',
          borderRadius: '8px',
          whiteSpace: 'pre-wrap',
          wordWrap: 'break-word',
          fontFamily: 'monospace',
          fontSize: '14px',
          lineHeight: '1.5',
          border: '1px solid #ddd',
          marginTop: '20px'
        }}>
          {/* Здесь будет отображаться результат генерации */}
          Результат генерації буде показаний тут...
        </pre>
      </div>
      
      <ScrollToTop />
    </>
  )
} 