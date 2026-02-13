'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Sidebar from '@/components/sidebar'
import Header from '@/components/header'
import TickerRow from '@/components/ticker-row'
import ChatInterface from '@/components/chat-interface'
import IntelligencePanel from '@/components/intelligence-panel'
import NextBestStep from '@/components/next-best-step'
import StatsModal from '@/components/stats-modal'
import { format, parseISO, eachDayOfInterval } from 'date-fns'

function DashboardContent() {
  const searchParams = useSearchParams()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedStat, setSelectedStat] = useState<'revenue' | 'transactions' | 'conversion' | null>(null)

  const [stats, setStats] = useState({
    revenue: '$0',
    transactions: 0,
    conversionRate: '3.2%',
  })

  const [lastSyncedFile, setLastSyncedFile] = useState('Checking...')

  // Get currently selected range from URL
  const fromParam = searchParams.get('from')
  const toParam = searchParams.get('to')

  // Expand range into array of dates for child components
  let selectedDates: string[] = []
  if (fromParam && toParam) {
    try {
      const interval = eachDayOfInterval({
        start: parseISO(fromParam),
        end: parseISO(toParam)
      })
      selectedDates = interval.map(d => format(d, 'yyyy-MM-dd'))
    } catch (e) {
      // Fallback if date parsing fails, treat 'from' as a single date
      selectedDates = [fromParam]
    }
  } else if (fromParam) {
    selectedDates = [fromParam]
  } else {
    // Fallback to current date if no range
    selectedDates = [format(new Date(), 'yyyy-MM-dd')]
  }

  useEffect(() => {
    async function fetchDashboardStats() {
      try {
        // Fetch revenue data
        const revResponse = await fetch('/api/revenue')
        const revJson = await revResponse.json()
        const allData = revJson.data || []

        // Find data for all selected dates in the range
        const dayStats = allData.filter((item: any) => selectedDates.includes(item.date))

        if (dayStats.length > 0) {
          const totalRev = dayStats.reduce((sum: number, item: any) => sum + item.revenue, 0)
          const totalTxns = dayStats.reduce((sum: number, item: any) => sum + item.transactions, 0)

          setStats(prev => ({
            ...prev,
            revenue: `$${(totalRev / 1000).toFixed(1)}K`,
            transactions: totalTxns
          }))
        } else {
          setStats({
            revenue: '$0',
            transactions: 0,
            conversionRate: '0%',
          })
        }

        // Fetch latest upload filename
        const uploadResponse = await fetch('/api/uploads')
        const uploadJson = await uploadResponse.json()
        const uploads = uploadJson.data || []

        if (uploads.length > 0) {
          setLastSyncedFile(uploads[0].filename)
        } else {
          setLastSyncedFile('No uploads yet')
        }
      } catch (error) {
        console.error('Error fetching dashboard stats:', error)
      }
    }

    fetchDashboardStats()
  }, [selectedDates.join(',')])

  const handleStatClick = (stat: 'revenue' | 'transactions' | 'conversion') => {
    setSelectedStat(stat)
    setModalOpen(true)
  }

  const getFooterDateText = () => {
    if (selectedDates.length === 0) return 'No dates selected'
    if (selectedDates.length === 1) return format(parseISO(selectedDates[0]), 'PPP')
    return `${format(parseISO(selectedDates[0]), 'MMM dd')} - ${format(parseISO(selectedDates[selectedDates.length - 1]), 'PPP')}`
  }

  return (
    <>
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      {/* Header spans full width */}
      <Header />

      {/* Main Content Wrapper */}
      <div className="md:ml-80 flex flex-col h-[calc(100vh-60px)]">
        {/* Ticker Row */}
        <TickerRow stats={stats} onStatClick={handleStatClick} />

        {/* Main Content Area */}
        <main className="flex-1 overflow-hidden flex bg-background">
          {/* Center Chat Area - 850px max width */}
          <div className="flex-1 flex flex-col overflow-hidden border-r border-border">
            <div className="flex-1 overflow-y-auto">
              <div className="mx-auto w-full px-6 py-8 md:px-8" style={{ maxWidth: '850px' }}>
                <ChatInterface dates={selectedDates} />
              </div>
            </div>
            {/* Base Sync Status Footer */}
            <div className="border-t border-border bg-background/50 px-6 py-3 text-center">
              <p className="text-xs text-muted-foreground">
                Displaying data for: {getFooterDateText()} | Last sync: {lastSyncedFile}
              </p>
            </div>
          </div>

          {/* Right Intelligence Panel */}
          <IntelligencePanel dates={selectedDates} />
        </main>
      </div>

      {/* Sticky Next Best Step */}
      <NextBestStep />

      {/* Stats Modal */}
      <StatsModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        statType={selectedStat}
        dates={selectedDates}
      />
    </>
  )
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading dashboard...</div>}>
      <DashboardContent />
    </Suspense>
  )
}
