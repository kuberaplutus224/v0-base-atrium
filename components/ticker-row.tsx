'use client'

interface TickerRowProps {
  stats: {
    revenue: string
    transactions: number
    conversionRate: string
  }
  onStatClick: (stat: 'revenue' | 'transactions' | 'conversion') => void
}

export default function TickerRow({ stats, onStatClick }: TickerRowProps) {
  return (
    <div className="sticky top-0 z-10 border-b" style={{ backgroundColor: '#F1ECE5', borderColor: '#E6E1D9' }}>
      <div className="flex items-center justify-center gap-0 px-6 py-5">
        {/* Revenue */}
        <button
          onClick={() => onStatClick('revenue')}
          className="flex flex-1 flex-col items-center gap-2 px-6 transition-all hover:opacity-70 active:scale-95 cursor-pointer"
        >
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Revenue</p>
          <p className="font-serif text-xl font-semibold text-foreground hover:text-accent transition-colors">
            {stats.revenue}
          </p>
        </button>

        {/* Divider */}
        <div className="border-l h-14" style={{ borderColor: '#E6E1D9' }} />

        {/* Transactions */}
        <button
          onClick={() => onStatClick('transactions')}
          className="flex flex-1 flex-col items-center gap-2 px-6 transition-all hover:opacity-70 active:scale-95 cursor-pointer"
        >
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Transactions
          </p>
          <p className="font-serif text-xl font-semibold text-foreground hover:text-accent transition-colors">
            {stats.transactions}
          </p>
        </button>

        {/* Divider */}
        <div className="border-l h-14" style={{ borderColor: '#E6E1D9' }} />

        {/* Conversion Rate */}
        <button
          onClick={() => onStatClick('conversion')}
          className="flex flex-1 flex-col items-center gap-2 px-6 transition-all hover:opacity-70 active:scale-95 cursor-pointer"
        >
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Conversion
          </p>
          <p className="font-serif text-xl font-semibold text-foreground hover:text-accent transition-colors">
            {stats.conversionRate}
          </p>
        </button>
      </div>
    </div>
  )
}
