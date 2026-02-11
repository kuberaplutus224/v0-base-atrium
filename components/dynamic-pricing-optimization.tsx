import { useState, useEffect } from 'react'
import { ArrowUp, ArrowDown, Loader2 } from 'lucide-react'

interface PricingRec {
  id: string
  product: string
  current: number
  recommended: number
  impact: string
  reason: string
}

interface DynamicPricingOptimizationProps {
  dates?: string[]
}

export default function DynamicPricingOptimization({ dates }: DynamicPricingOptimizationProps) {
  const [loading, setLoading] = useState(true)
  const [recommendations, setRecommendations] = useState<PricingRec[]>([])

  useEffect(() => {
    async function fetchPricing() {
      setLoading(true)
      try {
        const response = await fetch('/api/pricing')
        const json = await response.json()
        const raw = json.data || []

        const mapped = raw.map((r: any) => ({
          id: r.id,
          product: r.product_name,
          current: r.current_price,
          recommended: r.recommended_price,
          impact: r.expected_impact >= 1000
            ? `+$${(r.expected_impact / 1000).toFixed(1)}k revenue`
            : `+${r.expected_impact}% revenue`,
          reason: r.reason
        }))

        setRecommendations(mapped)
      } catch (error) {
        console.error('Error fetching pricing:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPricing()
  }, [dates?.join(',')])

  if (loading) {
    return (
      <div className="flex h-48 items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-accent" />
      </div>
    )
  }

  if (recommendations.length === 0) {
    return (
      <p className="text-sm text-muted-foreground italic text-center py-8">
        No pricing optimizations recommended at this time.
      </p>
    )
  }

  return (
    <div className="w-full">
      <div className="space-y-3">
        {recommendations.map((rec) => (
          <div key={rec.id} className="border-b border-secondary/40 pb-3 last:border-b-0">
            <div className="flex items-start justify-between gap-4 mb-2">
              <div className="min-w-0 flex-1">
                <h4 className="font-medium text-foreground text-sm truncate">{rec.product}</h4>
                <p className="text-xs text-muted-foreground mt-1 leading-tight">{rec.reason}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className={`text-sm font-semibold tabular-nums ${rec.recommended > rec.current ? 'text-accent' : 'text-foreground'}`}>
                  {rec.impact}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 mt-3 text-[11px]">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-muted-foreground uppercase font-bold tracking-tighter">Now:</span>
                  <span className="font-serif font-semibold text-foreground tabular-nums">
                    ${rec.current.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="flex-shrink-0">
                {rec.recommended > rec.current ? (
                  <ArrowUp className="h-3 w-3 text-accent" />
                ) : (
                  <ArrowDown className="h-3 w-3 text-foreground" />
                )}
              </div>

              <div className="flex-1 min-w-0 text-right">
                <div className="flex items-center justify-end gap-1.5">
                  <span className="text-muted-foreground uppercase font-bold tracking-tighter">Rec:</span>
                  <span className="font-serif font-semibold text-accent tabular-nums">
                    ${rec.recommended.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <p className="text-xs text-muted-foreground mt-4 italic">
        <strong>Projected Impact:</strong> These optimizations are calculated based on local demand elasticity and competitor pricing signals.
      </p>
    </div>
  )
}
