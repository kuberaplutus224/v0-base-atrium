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
    <div className="sticky top-0 z-10 border-b border-border bg-card">
      <div className="flex items-center justify-center gap-0 px-6 py-5">
        {/* Revenue */}
        <button
          onClick={() => onStatClick('revenue')}
          className="flex flex-1 flex-col items-center gap-2 px-6 transition-all hover:text-accent active:scale-95 cursor-pointer"
        >
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">Revenue</p>
          <p className="text-xl font-semibold text-foreground hover:text-accent transition-colors">
            {stats.revenue}
          </p>
        </button>

        {/* Divider */}
        <div className="border-l h-14 border-border" />

        {/* Transactions */}
        <button
          onClick={() => onStatClick('transactions')}
          className="flex flex-1 flex-col items-center gap-2 px-6 transition-all hover:text-accent active:scale-95 cursor-pointer"
        >
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
            Transactions
          </p>
          <p className="text-xl font-semibold text-foreground hover:text-accent transition-colors">
            {stats.transactions}
          </p>
        </button>

        {/* Divider */}
        <div className="border-l h-14 border-border" />

        {/* Conversion Rate */}
        <button
          onClick={() => onStatClick('conversion')}
          className="flex flex-1 flex-col items-center gap-2 px-6 transition-all hover:text-accent active:scale-95 cursor-pointer"
        >
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
            Conversion
          </p>
          <p className="text-xl font-semibold text-foreground hover:text-accent transition-colors">
            {stats.conversionRate}
          </p>
        </button>
      </div>
    </div>
  )
}
