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
    <div className="rounded-lg border border-border bg-card p-6">
      <div className="mb-6">
        <h3 className="font-serif text-lg font-semibold text-foreground">Customer Segments</h3>
        <p className="text-xs text-muted-foreground mt-1">AI-identified customer groups with unique strategies</p>
      </div>

      <div className="space-y-3">
        {segments.map((segment, idx) => (
          <div key={idx} className="rounded-lg border border-border/50 p-4 bg-secondary/20">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="rounded-full bg-accent/20 p-2">
                  <Users className="h-4 w-4 text-accent" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground">{segment.name}</h4>
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

            <button className="w-full mt-3 rounded-md bg-accent/10 px-3 py-2 text-xs font-medium text-accent hover:bg-accent/20 transition-colors">
              View Strategy
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-border">
        <p className="text-xs text-muted-foreground">
          <strong>Recommendation:</strong> Focus retention efforts on Enterprise segment (18% growth), scale marketing to Mid-Market (34% growth).
        </p>
      </div>
    </div>
  )
}
