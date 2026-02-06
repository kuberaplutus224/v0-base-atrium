'use client'

import { useState } from 'react'
import { Menu } from 'lucide-react'

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
  const maxTokens = 5000

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
        className={`fixed left-0 top-0 h-screen w-80 bg-background border-r border-border flex flex-col transition-transform duration-300 z-40 ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Logo Section */}
        <div className="border-b border-border px-6 py-8">
          <h2 className="font-serif text-2xl font-semibold text-foreground">SellerGPT</h2>
          <p className="text-xs text-muted-foreground mt-1">Business Intelligence</p>
        </div>

        {/* History Section */}
        <div className="flex-1 overflow-y-auto border-b border-border">
          <div className="p-6">
            <h3 className="font-serif text-xs font-semibold text-foreground uppercase tracking-wide mb-4">
              Analysis History
            </h3>
            <div className="space-y-2">
              {historyItems.map((item) => (
                <button
                  key={item}
                  className="w-full text-left px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/40 transition-colors"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Account & Usage Section */}
        <div className="border-t border-border p-6">
          <h3 className="font-serif text-xs font-semibold text-foreground uppercase tracking-wide mb-3">
            AI Token Usage
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
            <p className="text-xs text-muted-foreground mt-2">
              {maxTokens - tokensUsed} tokens remaining
            </p>
          </div>

          {/* Account Button */}
          <button className="w-full mt-4 px-3 py-2 rounded-lg bg-secondary text-foreground text-sm font-medium transition-colors hover:bg-secondary/80">
            Account Settings
          </button>
        </div>
      </aside>

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
