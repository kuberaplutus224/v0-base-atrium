'use client'

import { Coffee } from 'lucide-react'

export default function MorningBriefing() {
  const briefPoints = [
    'Revenue up 12% vs yesterday',
    'Peak transaction hour shifted to 10 AM',
    'Oat Milk inventory alert - low for weekend',
  ]

  return (
    <div className="rounded-lg border p-6" style={{ borderColor: '#E6E1D9', backgroundColor: '#F1ECE5' }}>
      <div className="flex items-start gap-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-full flex-shrink-0" style={{ backgroundColor: 'rgba(209, 99, 60, 0.1)' }}>
          <Coffee className="h-5 w-5 text-accent" />
        </div>
        <div className="flex-1">
          <h3 className="font-serif text-sm font-semibold text-foreground">Daily Brief</h3>
          <p className="mb-3 text-xs text-muted-foreground">Yesterday's performance snapshot</p>
          <ul className="space-y-2">
            {briefPoints.map((point, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                <span className="text-sm text-foreground">{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
