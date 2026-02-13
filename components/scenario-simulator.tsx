import { useState, useEffect } from 'react'
import { format, parseISO } from 'date-fns'
import { RevenueData } from '@/lib/supabase'

interface ScenarioSimulatorProps {
  dates?: string[]
}

export default function ScenarioSimulator({ dates }: ScenarioSimulatorProps) {
  const [priceIncrease, setPriceIncrease] = useState(0.5)
  const [baselineRevenue, setBaselineRevenue] = useState(120)
  const [avgAOV, setAvgAOV] = useState(8.5)

  useEffect(() => {
    async function fetchBaseline() {
      if (!dates || dates.length === 0) return
      try {
        const response = await fetch('/api/revenue')
        const json = await response.json()
        const allData: RevenueData[] = json.data || []

        // Filter for specific dates
        const relevant = allData.filter((d: RevenueData) => dates.includes(d.date))
        if (relevant.length > 0) {
          const totalRev = relevant.reduce((sum: number, d: RevenueData) => sum + d.revenue, 0)
          const totalTxns = relevant.reduce((sum: number, d: RevenueData) => sum + d.transactions, 0)

          setBaselineRevenue(totalRev)
          if (totalTxns > 0) {
            setAvgAOV(totalRev / totalTxns)
          }
        }
      } catch (error) {
        // Silent fail for baseline fetch
      }
    }
    fetchBaseline()
  }, [dates?.join(',')])

  // Simulation logic tied to hypothetical elasticity
  // baselineRevenue is now the TOTAL for the period
  // avgAOV is the actual "median price" for this merchant
  const elasticity = 0.6 // More realistic retail elasticity (not immediately negative)
  const volumeDropFactor = (priceIncrease / avgAOV) * elasticity
  const projectedRevenueImpact = baselineRevenue * (1 + (priceIncrease / avgAOV)) * (1 - volumeDropFactor) - baselineRevenue
  const customerRetention = Math.max(0, 98 - (priceIncrease / avgAOV * 100 * 1.8))

  const isPositiveImpact = projectedRevenueImpact >= 0

  return (
    <div className="space-y-4 rounded-[10px] border border-border bg-card p-6 shadow-sm">
      {/* Title */}
      <div>
        <h3 className="font-serif text-sm font-semibold text-foreground tracking-tight">
          Scenario Simulation
        </h3>
        <p className="mt-1 text-[11px] text-muted-foreground leading-relaxed">Adjust pricing to see projected impact on {dates && dates.length > 1 ? `${dates.length} days` : 'current period'}.</p>
      </div>

      {/* Slider */}
      <div className="space-y-4 pt-2">
        <div className="flex items-center justify-between">
          <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Adjustment</label>
          <span className="font-serif font-bold text-accent">+${priceIncrease.toFixed(2)}</span>
        </div>
        <input
          type="range"
          min="0"
          max="2"
          step="0.05"
          value={priceIncrease}
          onChange={(e) => setPriceIncrease(parseFloat(e.target.value))}
          className="w-full cursor-pointer appearance-none h-1.5 rounded-full bg-secondary/30 accent-accent"
        />
      </div>

      {/* Predicted Impact Box */}
      <div className="space-y-4 rounded-lg bg-secondary/50 dark:bg-secondary p-4 border border-border">
        <div className="grid grid-cols-2 gap-4">
          {/* Weekly Revenue */}
          <div className="space-y-1">
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-tighter">Proj. Revenue</p>
            <p className={`font-serif text-lg font-semibold ${isPositiveImpact ? 'text-accent' : 'text-destructive'}`}>
              {isPositiveImpact ? '+' : ''}${projectedRevenueImpact.toFixed(0)}
            </p>
          </div>

          {/* Customer Retention */}
          <div className="space-y-1 text-right">
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-tighter">Retention</p>
            <p className={`font-serif text-lg font-semibold ${customerRetention >= 90 ? 'text-foreground' : 'text-destructive'}`}>
              {customerRetention.toFixed(0)}%
            </p>
          </div>
        </div>

        {/* Insight */}
        <div className="border-t border-border pt-3">
          <p className="text-[11px] text-muted-foreground italic leading-relaxed">
            {priceIncrease < 0.75
              ? 'Low friction adjustment. High probability of revenue lift with minimal customer churn.'
              : priceIncrease < 1.5
                ? 'Moderate risk. Growth outweighs retention loss in current market conditions.'
                : 'Aggressive increase. Significant churn risk detected for price-sensitive segments.'}
          </p>
        </div>
      </div>
    </div>
  )
}
