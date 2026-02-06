'use client'

import { ArrowUp, ArrowDown } from 'lucide-react'

interface PricingRec {
  product: string
  current: number
  recommended: number
  impact: string
  reason: string
}

const recommendations: PricingRec[] = [
  {
    product: 'Premium Widget',
    current: 49.99,
    recommended: 54.99,
    impact: '+8.4% revenue',
    reason: 'High demand, low price elasticity',
  },
  {
    product: 'Standard Bundle',
    current: 89.99,
    recommended: 79.99,
    impact: '+12.1% volume',
    reason: 'Price sensitive segment, inventory surplus',
  },
  {
    product: 'Elite Service',
    current: 199.99,
    recommended: 229.99,
    impact: '+$2.2K MRR',
    reason: 'Competitor analysis shows opportunity',
  },
]

export default function DynamicPricingOptimization() {
  return (
    <div className="w-full">
      <div className="space-y-3">
        {recommendations.map((rec, idx) => (
          <div key={idx} className="border-b border-secondary/40 pb-3 last:border-b-0">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h4 className="font-medium text-foreground text-sm">{rec.product}</h4>
                <p className="text-xs text-muted-foreground mt-1">{rec.reason}</p>
              </div>
              <div className="text-right">
                <p className={`text-sm font-semibold ${rec.recommended > rec.current ? 'text-accent' : 'text-foreground'}`}>
                  {rec.impact}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 mt-3">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">Current:</span>
                  <span className="font-serif font-semibold text-foreground">${rec.current}</span>
                </div>
              </div>
              {rec.recommended > rec.current ? (
                <ArrowUp className="h-4 w-4 text-accent" />
              ) : (
                <ArrowDown className="h-4 w-4 text-foreground" />
              )}
              <div className="flex-1 text-right">
                <div className="flex items-center justify-end gap-2">
                  <span className="text-xs text-muted-foreground">Recommended:</span>
                  <span className="font-serif font-semibold text-accent">${rec.recommended}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <p className="text-xs text-muted-foreground mt-4">
        <strong>Projected Impact:</strong> These optimizations could generate +$8,240 additional monthly revenue.
      </p>
    </div>
  )
}
