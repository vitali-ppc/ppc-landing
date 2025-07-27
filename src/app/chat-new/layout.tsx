import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI Chat - New Version | PPCSet',
  description: 'Advanced AI-powered chat interface for Google Ads optimization and strategy generation',
  robots: 'noindex, nofollow'
}

export default function ChatNewLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 