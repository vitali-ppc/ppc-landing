
import type { Metadata } from 'next'
import Header from '@/components/Header'
import Breadcrumbs from '@/components/Breadcrumbs'
import StrategyGeneratorForm from '@/components/StrategyGeneratorForm'

export const metadata: Metadata = {
  robots: 'noindex, nofollow'
}

export default function StrategyGeneratorPage() {
  return (
    <>
      <Header />
      <Breadcrumbs />
      <StrategyGeneratorForm />
    </>
  )
} 