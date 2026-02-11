import { useState, useEffect } from 'react'
import { Users, Loader2 } from 'lucide-react'

interface Segment {
  id: string
  name: string
  count: number
  revenue: number
  growthRate: number
  characteristics: string[]
}

interface CustomerSegmentationProps {
  dates?: string[]
}

export default function CustomerSegmentation({ dates }: CustomerSegmentationProps) {
  const [loading, setLoading] = useState(true)
  const [segments, setSegments] = useState<Segment[]>([])

  useEffect(() => {
    async function fetchSegments() {
      setLoading(true)
      try {
        const response = await fetch('/api/customers/segments')
        const json = await response.json()
        const raw = json.data || []

        const mapped = raw.map((s: any) => {
          let chars: string[] = []
          if (Array.isArray(s.characteristics)) {
            chars = s.characteristics
          } else if (s.characteristics && typeof s.characteristics === 'object') {
            chars = Object.values(s.characteristics).map(v => String(v))
          }

          return {
            id: s.id,
            name: s.segment_name,
            count: s.customer_count,
            revenue: s.revenue,
            growthRate: s.growth_rate,
            characteristics: chars
          }
        })

        setSegments(mapped)
      } catch (error) {
        console.error('Error fetching segments:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchSegments()
  }, [dates?.join(',')])

  if (loading) {
    return (
      <div className="flex h-48 items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-accent" />
      </div>
    )
  }

  if (segments.length === 0) {
    return (
      <p className="text-sm text-muted-foreground italic text-center py-8">
        No customer segments identified.
      </p>
    )
  }

  return (
    <div className="w-full">
      <div className="space-y-3">
        {segments.map((segment) => (
          <div key={segment.id} className="border-b border-secondary/40 pb-3 last:border-b-0">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="rounded-full bg-accent/20 p-2">
                  <Users className="h-4 w-4 text-accent" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground text-sm">{segment.name}</h4>
                  <p className="text-xs text-muted-foreground">{segment.count} customers</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-serif font-semibold text-foreground">${segment.revenue.toLocaleString()}</p>
                <p className={`text-xs font-semibold ${segment.growthRate > 0 ? 'text-green-600' : 'text-destructive'}`}>
                  {segment.growthRate > 0 ? '+' : ''}{segment.growthRate}% Growth
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {segment.characteristics.map((char, i) => (
                <span
                  key={i}
                  className="inline-block rounded-full bg-secondary/60 px-2 py-1 text-[10px] text-muted-foreground font-medium uppercase tracking-tight"
                >
                  {char}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
