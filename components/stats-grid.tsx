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
    <div className="space-y-8">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {/* Revenue Card */}
        <div className="space-y-6 rounded-lg border border-border bg-card p-8 shadow-sm">
          <div>
            <h2 className="font-serif text-sm font-semibold text-muted-foreground">
              Total Revenue
            </h2>
            <p className="text-3xl font-semibold text-foreground">{stats.revenue}</p>
          </div>
          <div className="h-32">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="day" tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                <YAxis hide />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: `1px solid hsl(var(--border))`,
                  }}
                />
                <Bar dataKey="value" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Transactions Card */}
        <div className="space-y-6 rounded-lg border border-border bg-card p-8 shadow-sm">
          <div>
            <h2 className="font-serif text-sm font-semibold text-muted-foreground">
              Transactions
            </h2>
            <p className="text-3xl font-semibold text-foreground">{stats.transactions}</p>
          </div>
          <div className="h-32">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={transactionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="day" tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                <YAxis hide />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: `1px solid hsl(var(--border))`,
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
        </div>

        {/* Conversion Rate Card */}
        <div className="space-y-6 rounded-lg border border-border bg-card p-8 shadow-sm">
          <div>
            <h2 className="font-serif text-sm font-semibold text-muted-foreground">
              Conversion Rate
            </h2>
            <p className="text-3xl font-semibold text-foreground">{stats.conversionRate}</p>
          </div>
          <div className="flex h-32 items-end justify-around rounded-lg bg-secondary/30 p-4">
            {[40, 65, 55, 70, 50].map((height, i) => (
              <div
                key={i}
                className="w-3 rounded-t bg-chart-4"
                style={{ height: `${height}%` }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
