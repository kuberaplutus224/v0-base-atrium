'use client'

interface TickerRowProps {
  stats: {
    revenue: string
    transactions: number
    conversionRate: string
  }
}

export default function TickerRow({ stats }: TickerRowProps) {
  return (
    <div className="sticky top-0 z-10 border-b" style={{ backgroundColor: '#F1ECE5', borderColor: '#E6E1D9' }}>
      <div className="flex items-center justify-center gap-0 px-6 py-5">
        {/* Revenue */}
        <div className="flex flex-1 flex-col items-center gap-2 px-6">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Revenue</p>
          <p className="font-serif text-xl font-semibold text-foreground">{stats.revenue}</p>
        </div>

        {/* Divider */}
        <div className="border-l h-14" style={{ borderColor: '#E6E1D9' }} />

        {/* Transactions */}
        <div className="flex flex-1 flex-col items-center gap-2 px-6">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Transactions
          </p>
          <p className="font-serif text-xl font-semibold text-foreground">{stats.transactions}</p>
        </div>

        {/* Divider */}
        <div className="border-l h-14" style={{ borderColor: '#E6E1D9' }} />

        {/* Conversion Rate */}
        <div className="flex flex-1 flex-col items-center gap-2 px-6">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Conversion
          </p>
          <p className="font-serif text-xl font-semibold text-foreground">{stats.conversionRate}</p>
        </div>
      </div>
    </div>
  )
}
