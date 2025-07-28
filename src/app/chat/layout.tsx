import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Чат з GPT | PPCSet',
  description: 'Запитай щось у GPT - інтерактивний чат з штучним інтелектом',
  robots: 'noindex, nofollow'
}

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children;
} 