import type { Metadata } from 'next'
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