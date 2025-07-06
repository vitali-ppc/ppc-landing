import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Breadcrumbs from '@/components/Breadcrumbs'
import ScrollToTop from '@/components/ScrollToTop'
import ChatForm from '@/components/ChatForm'

export const metadata: Metadata = {
  title: 'Чат з GPT | PPCSet',
  description: 'Запитай щось у GPT - інтерактивний чат з штучним інтелектом',
  robots: 'noindex, follow'
}

export default function ChatPage() {
  return (
    <>
      <Header />
      <Breadcrumbs />
      <ChatForm />
      <ScrollToTop />
    </>
  )
} 