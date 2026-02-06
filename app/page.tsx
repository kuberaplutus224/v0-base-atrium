'use client'

import { useState } from 'react'
import Header from '@/components/header'
import StatsGrid from '@/components/stats-grid'
import ChatInterface from '@/components/chat-interface'
import NextBestStep from '@/components/next-best-step'

export default function Page() {
  const [stats, setStats] = useState({
    revenue: '$12,450',
    transactions: 248,
    conversionRate: '3.2%',
  })

  return (
    <main className="min-h-screen bg-background pb-24">
      <div className="mx-auto max-w-6xl">
        <Header />
        <div className="space-y-12 px-4 py-12 md:px-8">
          <StatsGrid stats={stats} />
          <ChatInterface />
        </div>
      </div>
      <NextBestStep />
    </main>
  )
}
