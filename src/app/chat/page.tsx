import type { Metadata } from 'next'
import ChatFormGPT from '@/components/chat/index';

export const metadata: Metadata = {
  title: 'Чат з GPT | PPCSet',
  description: 'Запитай щось у GPT - інтерактивний чат з штучним інтелектом',
  robots: 'noindex, nofollow'
}

export default function ChatPage() {
  return (
    <div style={{
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
      height: '100vh',
      margin: 0,
      padding: 0,
      overflow: 'hidden'
    }}>
      <ChatFormGPT />
    </div>
  );
} 