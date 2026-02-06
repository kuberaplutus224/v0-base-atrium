'use client'

import { X } from 'lucide-react'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

interface StatsModalProps {
  isOpen: boolean
  onClose: () => void
  statType: 'revenue' | 'transactions' | 'conversion' | null
}

const revenueData = [
  { day: 'Mon', value: 2400, previous: 2100 },
  { day: 'Tue', value: 2210, previous: 1900 },
  { day: 'Wed', value: 2290, previous: 2050 },
  { day: 'Thu', value: 2000, previous: 1950 },
  { day: 'Fri', value: 2181, previous: 2100 },
  { day: 'Sat', value: 2500, previous: 2200 },
  { day: 'Sun', value: 2100, previous: 1800 },
]

const transactionData = [
  { day: 'Mon', value: 30, previous: 28 },
  { day: 'Tue', value: 35, previous: 30 },
  { day: 'Wed', value: 28, previous: 32 },
  { day: 'Thu', value: 32, previous: 28 },
  { day: 'Fri', value: 45, previous: 40 },
  { day: 'Sat', value: 50, previous: 45 },
  { day: 'Sun', value: 48, previous: 42 },
]

const conversionData = [
  { day: 'Mon', value: 2.8, previous: 2.6 },
  { day: 'Tue', value: 3.1, previous: 2.8 },
  { day: 'Wed', value: 2.9, previous: 3.0 },
  { day: 'Thu', value: 3.2, previous: 2.9 },
  { day: 'Fri', value: 3.5, previous: 3.2 },
  { day: 'Sat', value: 3.8, previous: 3.4 },
  { day: 'Sun', value: 3.6, previous: 3.1 },
]

export default function StatsModal({ isOpen, onClose, statType }: StatsModalProps) {
  if (!isOpen || !statType) return null

  const getStatDetails = () => {
    switch (statType) {
      case 'revenue':
        return {
          title: 'Revenue Analysis',
          subtitle: '7-day trend',
          value: '$12,450',
          change: '+12%',
          data: revenueData,
          unit: '$',
          insights: [
            'Peak revenue on Saturday ($2,500)',
            'Consistent growth trend this week',
            'Average daily revenue: $2,240',
            'Recommended: Increase Saturday inventory by 15%',
          ],
        }
      case 'transactions':
        return {
          title: 'Transaction Volume',
          subtitle: '7-day trend',
          value: '248',
          change: '+18%',
          data: transactionData,
          unit: 'txn',
          insights: [
            'Peak activity Saturday with 50 transactions',
            'Friday-Sunday show strong performance',
            'Average daily transactions: 38.3',
            'Recommended: Staff up weekend shifts',
          ],
        }
      case 'conversion':
        return {
          title: 'Conversion Rate',
          subtitle: '7-day trend',
          value: '3.2%',
          change: '+8%',
          data: conversionData,
          unit: '%',
          insights: [
            'Saturday shows highest conversion (3.8%)',
            'Steady improvement throughout week',
            'Average conversion: 3.27%',
            'Recommended: Replicate Saturday strategies on weekdays',
          ],
        }
      default:
        return null
    }
  }

  const details = getStatDetails()
  if (!details) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4">
      <div className="bg-background rounded-lg subtle-border w-full max-w-2xl max-h-96 overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between border-b border-border bg-background px-6 py-4">
          <div>
            <h2 className="font-serif text-2xl font-semibold text-foreground">{details.title}</h2>
            <p className="text-xs text-muted-foreground mt-1">{details.subtitle}</p>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-secondary"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-8">
          {/* Key Metrics */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Current Value
              </p>
              <p className="mt-2 font-serif text-3xl font-semibold text-foreground">
                {details.value}
              </p>
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Week Over Week
              </p>
              <p className="mt-2 font-serif text-3xl font-semibold text-accent">
                {details.change}
              </p>
            </div>
          </div>

          {/* 7-Day Chart */}
          <div className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              7-Day Trend
            </p>
            <div className="h-64 -mx-2">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={details.data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                  <XAxis dataKey="day" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
                  <YAxis tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
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
                    stroke="#D1633C"
                    strokeWidth={2}
                    dot={{ fill: '#D1633C', r: 4 }}
                    name="This Week"
                  />
                  <Line
                    type="monotone"
                    dataKey="previous"
                    stroke="hsl(var(--muted-foreground))"
                    strokeWidth={1}
                    strokeDasharray="5 5"
                    dot={false}
                    name="Last Week"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Insights from Base Intelligence */}
          <div className="space-y-3 rounded-lg bg-secondary/40 p-4">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Base Intelligence Insights
            </p>
            <ul className="space-y-2">
              {details.insights.map((insight, idx) => (
                <li key={idx} className="flex gap-2 text-sm text-foreground">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                  <span>{insight}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
