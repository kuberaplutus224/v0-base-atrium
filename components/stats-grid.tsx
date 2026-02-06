'use client'

import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface StatsGridProps {
  stats: {
    revenue: string
    transactions: number
    conversionRate: string
  }
}

const revenueData = [
  { day: 'Mon', value: 2400 },
  { day: 'Tue', value: 2210 },
  { day: 'Wed', value: 2290 },
  { day: 'Thu', value: 2000 },
  { day: 'Fri', value: 2181 },
  { day: 'Sat', value: 2500 },
  { day: 'Sun', value: 2100 },
]

const transactionData = [
  { day: 'Mon', value: 30 },
  { day: 'Tue', value: 35 },
  { day: 'Wed', value: 28 },
  { day: 'Thu', value: 32 },
  { day: 'Fri', value: 45 },
  { day: 'Sat', value: 50 },
  { day: 'Sun', value: 48 },
]

export default function StatsGrid({ stats }: StatsGridProps) {
  return (
    <div className="space-y-1">
      {/* Stats Header Row */}
      <div className="grid grid-cols-1 gap-0 md:grid-cols-3 lg:grid-cols-3">
        {/* Revenue Card */}
        <div className="space-y-4 py-6 px-0">
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Total Revenue
            </p>
            <p className="mt-2 font-serif text-4xl font-semibold text-foreground">{stats.revenue}</p>
          </div>
        </div>

        {/* Divider */}
        <div className="hidden border-l border-border md:block" />

        {/* Transactions Card */}
        <div className="space-y-4 py-6 px-6">
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Transactions
            </p>
            <p className="mt-2 font-serif text-4xl font-semibold text-foreground">
              {stats.transactions}
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="hidden border-l border-border md:block" />

        {/* Conversion Rate Card */}
        <div className="space-y-4 py-6 px-6">
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Conversion Rate
            </p>
            <p className="mt-2 font-serif text-4xl font-semibold text-foreground">
              {stats.conversionRate}
            </p>
          </div>
        </div>
      </div>

      {/* Horizontal Divider */}
      <div className="border-b border-border" />

      {/* Charts Row */}
      <div className="grid grid-cols-1 gap-8 py-8 md:grid-cols-2 lg:grid-cols-3">
        {/* Revenue Chart */}
        <div className="h-40">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis dataKey="day" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
              <YAxis hide />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: `1px solid hsl(var(--border))`,
                  borderRadius: '0.5rem',
                }}
              />
              <Bar dataKey="value" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Transactions Chart */}
        <div className="h-40">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={transactionData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis dataKey="day" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
              <YAxis hide />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: `1px solid hsl(var(--border))`,
                  borderRadius: '0.5rem',
                }}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="hsl(var(--chart-2))"
                dot={false}
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Conversion Rate Sparkline */}
        <div className="flex h-40 items-end justify-around gap-1 py-8">
          {[40, 65, 55, 70, 50, 80, 60].map((height, i) => (
            <div
              key={i}
              className="w-2 rounded-t bg-gradient-to-t from-accent to-accent/50 transition-all hover:from-accent/90"
              style={{ height: `${height}%` }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

