'use client'

import { useState } from 'react'
import Sidebar from '@/components/sidebar'
import TickerRow from '@/components/ticker-row'
import ChatInterface from '@/components/chat-interface'
import IntelligencePanel from '@/components/intelligence-panel'
import NextBestStep from '@/components/next-best-step'

export default function Page() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [stats] = useState({
    revenue: '$12,450',
    transactions: 248,
    conversionRate: '3.2%',
  })

  return (
    <>
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      {/* Main Content Wrapper */}
      <div className="md:ml-80 flex flex-col h-screen">
        {/* Ticker Row */}
        <TickerRow stats={stats} />

      {/* Main Content Area */}
      <main className="flex-1 overflow-hidden flex bg-background">
        {/* Center Chat Area - Fixed width container with 800px chat area */}
        <div className="flex-1 flex flex-col overflow-hidden border-r border-border">
          <div className="flex-1 overflow-y-auto">
            <div className="mx-auto w-full max-w-3xl px-6 py-8 md:px-8">
              <ChatInterface />
            </div>
          </div>
        </div>

        {/* Right Intelligence Panel */}
        <IntelligencePanel />
      </main>
      </div>

      {/* Sticky Next Best Step */}
      <NextBestStep />
    </>
  )
}

