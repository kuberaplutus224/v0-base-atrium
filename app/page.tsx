'use client'

import { useState } from 'react'
import Sidebar from '@/components/sidebar'
import Header from '@/components/header'
import TickerRow from '@/components/ticker-row'
import ChatInterface from '@/components/chat-interface'
import IntelligencePanel from '@/components/intelligence-panel'
import NextBestStep from '@/components/next-best-step'
import StatsModal from '@/components/stats-modal'

export default function Page() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedStat, setSelectedStat] = useState<'revenue' | 'transactions' | 'conversion' | null>(null)
  
  const [stats] = useState({
    revenue: '$12,450',
    transactions: 248,
    conversionRate: '3.2%',
  })

  const handleStatClick = (stat: 'revenue' | 'transactions' | 'conversion') => {
    setSelectedStat(stat)
    setModalOpen(true)
  }

  return (
    <>
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      {/* Main Content Wrapper */}
      <div className="md:ml-80 flex flex-col h-screen">
        {/* Header with Dashboard Toggle */}
        <Header />

        {/* Ticker Row */}
        <TickerRow stats={stats} onStatClick={handleStatClick} />

        {/* Main Content Area */}
        <main className="flex-1 overflow-hidden flex bg-background">
          {/* Center Chat Area - 850px max width */}
          <div className="flex-1 flex flex-col overflow-hidden border-r border-border">
            <div className="flex-1 overflow-y-auto">
              <div className="mx-auto w-full px-6 py-8 md:px-8" style={{ maxWidth: '850px' }}>
                <ChatInterface />
              </div>
            </div>
            {/* Base Sync Status Footer */}
            <div className="border-t border-border bg-background/50 px-6 py-3 text-center">
              <p className="text-xs text-muted-foreground">
                Base is synced: 01-05-2026_ledger.csv
              </p>
            </div>
          </div>

          {/* Right Intelligence Panel */}
          <IntelligencePanel />
        </main>
      </div>

      {/* Sticky Next Best Step */}
      <NextBestStep />

      {/* Stats Modal */}
      <StatsModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        statType={selectedStat}
      />
    </>
  )
}

