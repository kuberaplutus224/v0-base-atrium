'use client'

import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import VibeCheck from './vibe-check'

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
    <div className="space-y-6">
      {/* Stats Header Row - Modern Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {/* Revenue Card */}
        <div className="saas-card">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
            Total Revenue
          </p>
          <p className="text-3xl font-bold text-foreground">{stats.revenue}</p>
          <p className="text-xs text-muted-foreground mt-2">+12.5% from last period</p>
        </div>

        {/* Transactions Card */}
        <div className="saas-card">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
            Transactions
          </p>
          <p className="text-3xl font-bold text-foreground">
            {stats.transactions}
          </p>
          <p className="text-xs text-muted-foreground mt-2">Active transactions</p>
        </div>

        {/* Conversion Rate Card */}
        <div className="saas-card">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
            Conversion Rate
          </p>
          <p className="text-3xl font-bold text-foreground">
            {stats.conversionRate}
          </p>
          <p className="text-xs text-muted-foreground mt-2">+2.1% improvement</p>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Revenue Chart */}
        <div className="saas-card-lg">
          <h3 className="text-sm font-semibold text-foreground mb-4">Revenue Trend</h3>
          <div className="h-40">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
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
        </div>

        {/* Transactions Chart */}
        <div className="saas-card-lg">
          <h3 className="text-sm font-semibold text-foreground mb-4">Transaction Volume</h3>
          <div className="h-40">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={transactionData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
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
        </div>

        {/* Vibe Check - Customer Sentiment */}
        <div className="saas-card-lg flex flex-col justify-center">
          <h3 className="text-sm font-semibold text-foreground mb-4">Sentiment</h3>
          <VibeCheck sentiment={88} keywords={['Friendly Staff', 'Fast WiFi', 'Expensive Pastries']} />
        </div>
      </div>
    </div>
  )
}

