'use client'

import { Users, TrendingUp } from 'lucide-react'

interface Segment {
  name: string
  count: number
  revenue: number
  growthRate: number
  characteristics: string[]
}

const segments: Segment[] = [
  {
    name: 'High-Value Enterprise',
    count: 12,
    revenue: 45200,
    growthRate: 18,
    characteristics: ['Annual contracts', 'High retention', 'Premium support users'],
  },
  {
    name: 'Growing Mid-Market',
    count: 48,
    revenue: 28600,
    growthRate: 34,
    characteristics: ['Monthly renewals', 'Feature expansion', 'Seasonal spikes'],
  },
  {
    name: 'Price-Sensitive Volume',
    count: 340,
    revenue: 18400,
    growthRate: -8,
    characteristics: ['Deal seekers', 'Seasonal buyers', 'High churn'],
  },
]

export default function CustomerSegmentation() {
  return (
    <div className="w-full">
      <div className="space-y-3">
        {segments.map((segment, idx) => (
          <div key={idx} className="border-b border-secondary/40 pb-3 last:border-b-0">
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
                <p className={`text-xs font-semibold ${segment.growthRate > 0 ? 'text-accent' : 'text-destructive'}`}>
                  {segment.growthRate > 0 ? '+' : ''}{segment.growthRate}% YoY
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {segment.characteristics.map((char, i) => (
                <span
                  key={i}
                  className="inline-block rounded-full bg-secondary/60 px-2 py-1 text-xs text-muted-foreground"
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
