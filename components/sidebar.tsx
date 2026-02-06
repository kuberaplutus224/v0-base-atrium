'use client'

import { useState } from 'react'
import { Menu } from 'lucide-react'
import TopPerformingStrategies from './top-performing-strategies'
import AnalysisDetailModal from './analysis-detail-modal'

interface SidebarProps {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}

const historyItems = [
  'Tuesday Sales Dip',
  'Inventory Audit',
  'Customer Churn Analysis',
  'Pricing Strategy Review',
  'Weekly Performance',
]

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const [tokensUsed] = useState(1240)
  const [analysisModalOpen, setAnalysisModalOpen] = useState(false)
  const [selectedAnalysis, setSelectedAnalysis] = useState<string | null>(null)
  const maxTokens = 5000

  const handleAnalysisClick = (item: string) => {
    setSelectedAnalysis(item)
    setAnalysisModalOpen(true)
  }

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 rounded-lg p-2 text-foreground md:hidden"
      >
        <Menu className="h-6 w-6" />
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-[154px] h-[calc(100vh-154px)] w-80 bg-background border-r border-border flex flex-col transition-transform duration-300 z-40 ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* History Section */}
        <div className="flex-1 overflow-y-auto border-b border-border">
          <div className="px-6 pb-6 space-y-6">
            {/* Analysis History */}
            <div>
              <h3 className="font-serif text-xs font-semibold text-foreground uppercase tracking-wide mb-4">
                Analysis History
              </h3>
              <div className="space-y-2">
                {historyItems.map((item) => (
                  <button
                    key={item}
                    onClick={() => handleAnalysisClick(item)}
                    className="w-full text-left px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/40 transition-colors"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* Top Performing Strategies */}
            <div className="border-t border-border pt-6">
              <TopPerformingStrategies />
            </div>
          </div>
        </div>

        {/* Account & Usage Section */}
        <div className="border-t border-border p-6">
          <h3 className="font-serif text-xs font-semibold text-foreground uppercase tracking-wide mb-3">
            System Logic Usage
          </h3>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs text-muted-foreground">
                {tokensUsed.toLocaleString()} / {maxTokens.toLocaleString()}
              </span>
              <span className="text-xs font-semibold text-foreground">
                {Math.round((tokensUsed / maxTokens) * 100)}%
              </span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-secondary/50 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-accent to-accent/70 transition-all duration-300"
                style={{ width: `${(tokensUsed / maxTokens) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </aside>

      {/* Analysis Detail Modal */}
      <AnalysisDetailModal
        isOpen={analysisModalOpen}
        onClose={() => setAnalysisModalOpen(false)}
        analysisTitle={selectedAnalysis}
      />

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/20 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  )
}
