'use client'

import { useState } from 'react'
import { TrendingUp } from 'lucide-react'
import StrategyDetailModal from './strategy-detail-modal'

interface Strategy {
  name: string
  impact: number
  trend: 'up' | 'down'
  revenue: string
}

const strategies: Strategy[] = [
  {
    name: 'Morning Flash Sales',
    impact: 34,
    trend: 'up',
    revenue: '+$3,240',
  },
  {
    name: 'Email Retargeting',
    impact: 28,
    trend: 'up',
    revenue: '+$2,180',
  },
  {
    name: 'Product Bundles',
    impact: 22,
    trend: 'down',
    revenue: '+$1,620',
  },
  {
    name: 'VIP Customer Tier',
    impact: 19,
    trend: 'up',
    revenue: '+$1,450',
  },
]

export default function TopPerformingStrategies() {
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedStrategy, setSelectedStrategy] = useState<string | null>(null)

  const handleStrategyClick = (strategyName: string) => {
    setSelectedStrategy(strategyName)
    setModalOpen(true)
  }

  return (
    <>
      <div className="space-y-3">
        <h4 className="font-serif text-xs font-semibold text-foreground uppercase tracking-wide">
          Top Strategies
        </h4>
        <div className="space-y-2">
          {strategies.map((strategy) => (
            <button
              key={strategy.name}
              onClick={() => handleStrategyClick(strategy.name)}
              className="w-full text-left px-3 py-2.5 rounded-lg bg-secondary/40 hover:bg-secondary/60 transition-colors border border-secondary/50 group cursor-pointer"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground group-hover:text-accent transition-colors">
                    {strategy.name}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">{strategy.revenue}</p>
                </div>
                <div className="flex items-center gap-1">
                  <TrendingUp
                    className={`h-3.5 w-3.5 ${
                      strategy.trend === 'up' ? 'text-accent' : 'text-destructive'
                    }`}
                  />
                  <span
                    className={`text-xs font-semibold ${
                      strategy.trend === 'up' ? 'text-accent' : 'text-destructive'
                    }`}
                  >
                    {strategy.impact}%
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Strategy Detail Modal */}
      <StrategyDetailModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        strategyName={selectedStrategy}
      />
    </>
  )
}
