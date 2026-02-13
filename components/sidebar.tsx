'use client'

import { useState } from 'react'
import { Menu, X, ChevronDown } from 'lucide-react'
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
        className="fixed top-4 left-4 z-50 rounded-lg p-2 text-foreground md:hidden hover:bg-muted transition-colors"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-[60px] h-[calc(100vh-60px)] w-80 bg-card/95 glass border-r border-border flex flex-col transition-all duration-300 ease-in-out z-40 ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
          }`}
      >        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="px-4 py-6 space-y-6">
            {/* Data Management Section */}
            <div>
              <h3 className="text-xs font-semibold text-foreground uppercase tracking-widest mb-3 px-1">
                Data Management
              </h3>
              <a
                href="/upload"
                className="flex items-center gap-2 px-3 py-2 rounded-[10px] text-sm text-muted-foreground hover:text-accent hover:bg-secondary/50 transition-all duration-200"
              >
                <span>📤</span> Upload Dashboard
              </a>
            </div>

            {/* Analysis History */}
            <div>
              <h3 className="text-xs font-semibold text-foreground uppercase tracking-widest mb-3 px-1">
                Recent Analyses
              </h3>
              <div className="space-y-1">
                {historyItems.map((item) => (
                  <button
                    key={item}
                    onClick={() => handleAnalysisClick(item)}
                    className="w-full text-left px-3 py-2 rounded-[10px] text-sm text-muted-foreground hover:text-accent hover:bg-secondary/50 transition-all duration-200 truncate"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* Top Performing Strategies */}
            <div>
              <h3 className="text-xs font-semibold text-foreground uppercase tracking-widest mb-3 px-1">
                Top Strategies
              </h3>
              <TopPerformingStrategies />
            </div>
          </div>
        </div>

        {/* Usage Footer */}
        <div className="border-t border-border p-4">
          <h3 className="text-xs font-semibold text-foreground uppercase tracking-widest mb-3">
            Logic Usage
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="text-muted-foreground">
                {tokensUsed.toLocaleString()} / {maxTokens.toLocaleString()}
              </span>
              <span className="font-semibold text-foreground">
                {Math.round((tokensUsed / maxTokens) * 100)}%
              </span>
            </div>
            <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
              <div
                className="h-full bg-accent transition-all duration-300"
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
          className="fixed inset-0 z-30 bg-black/30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  )
}
