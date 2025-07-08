import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Breadcrumbs from '@/components/Breadcrumbs'
import ScrollToTop from '@/components/ScrollToTop'
import ChatFormGPT from '@/components/ChatFormGPT';

export const metadata: Metadata = {
  title: 'Чат з GPT | PPCSet',
  description: 'Запитай щось у GPT - інтерактивний чат з штучним інтелектом',
  robots: 'noindex, nofollow'
}

export default function ChatPage() {
  return (
    <main>
      <ChatFormGPT />
    </main>
  );
} 