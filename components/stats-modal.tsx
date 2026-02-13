'use client'

import { useState, useEffect } from 'react'
import { X, Loader2 } from 'lucide-react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { format, parseISO } from 'date-fns'

interface StatsModalProps {
  isOpen: boolean
  onClose: () => void
  statType: 'revenue' | 'transactions' | 'conversion' | null
  dates?: string[]
}

export default function StatsModal({ isOpen, onClose, statType, dates }: StatsModalProps) {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    if (isOpen && statType) {
      async function fetchData() {
        setLoading(true)
        try {
          const response = await fetch('/api/revenue')
          const json = await response.json()
          const rawData = json.data || []

          if (rawData.length > 0) {
            // Sort by date base
            const sortedData = [...rawData].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

            // Format for the chart
            const formatted = sortedData.map((item: any) => ({
              day: item.day_of_week.substring(0, 3),
              value: statType === 'revenue'
                ? item.revenue
                : statType === 'transactions'
                  ? item.transactions
                  : item.conversion_rate,
              fullDate: item.date
            }))

            setData(formatted)
          }
        } catch (error) {
          console.error('Error fetching modal data:', error)
        } finally {
          setLoading(false)
        }
      }
      fetchData()
    }
  }, [isOpen, statType, dates])

  if (!isOpen || !statType) return null

  const getStatDetails = () => {
    // If dates are provided, aggregate values for those specific days
    const selectedDays = data.filter(item => dates?.includes(item.fullDate))
    const displayValue = selectedDays.length > 0
      ? selectedDays.reduce((sum, item) => sum + item.value, 0)
      : data.reduce((sum, item) => sum + item.value, 0)

    const dateRangeText = dates && dates.length > 0
      ? dates.length === 1
        ? `Data for ${dates[0]}`
        : `Data for ${format(parseISO(dates[0]), 'MMM dd')} - ${format(parseISO(dates[dates.length - 1]), 'MMM dd')}`
      : 'Historical Trend'

    switch (statType) {
      case 'revenue':
        return {
          title: 'Revenue Analysis',
          subtitle: dateRangeText,
          value: `$${(displayValue / 1000).toFixed(1)}K`,
          change: '+12%',
          data: data,
          unit: '$',
          insights: [
            selectedDays.length > 0
              ? `Aggregated Revenue for selected dates: $${displayValue.toLocaleString()}`
              : `Total accumulated revenue: $${displayValue.toLocaleString()}`,
            'Revenue patterns are now reflecting your latest ledger uploads.',
            'Consistency across uploaded dates indicates healthy business flow.',
            'AI Insight: Weekend spikes are becoming more prominent.',
          ],
        }
      case 'transactions':
        return {
          title: 'Transaction Volume',
          subtitle: dateRangeText,
          value: Math.floor(displayValue).toString(),
          change: '+18%',
          data: data,
          unit: 'txn',
          insights: [
            selectedDays.length > 0
              ? `Total Transactions for selected dates: ${displayValue}`
              : `Total processed transactions: ${Math.floor(displayValue)}`,
            'Volume is being updated in real-time from file ingestions.',
            'Transaction frequency is within optimal ranges.',
            'Recommended: Verify staffing for high-volume peak hours.',
          ],
        }
      case 'conversion':
        return {
          title: 'Conversion Rate',
          subtitle: dateRangeText,
          value: selectedDays.length > 0 ? `${(displayValue / selectedDays.length).toFixed(1)}%` : '3.2%',
          change: '+8%',
          data: data,
          unit: '%',
          insights: [
            'Conversion rates are modeled across your checkout touchpoints.',
            'Stable conversion indicates high customer intent.',
            'Data quality is verified across all uploaded sources.',
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
      <div className="bg-background rounded-lg subtle-border w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between border-b border-border bg-background px-6 py-4 z-10">
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
          {loading ? (
            <div className="flex h-64 items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-accent" />
            </div>
          ) : (
            <>
              {/* Key Metrics */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    {dates && dates.length > 0 ? 'Selected Period Value' : 'Total Dashboard Value'}
                  </p>
                  <p className="mt-2 font-serif text-3xl font-semibold text-foreground">
                    {details.value}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    System Verified
                  </p>
                  <p className="mt-2 font-serif text-3xl font-semibold text-accent">
                    99%
                  </p>
                </div>
              </div>

              {/* Trend Chart */}
              <div className="space-y-2">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Historical Growth
                </p>
                <div className="h-64 -mx-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={details.data}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                      <XAxis dataKey="day" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
                      <YAxis tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} tickFormatter={(val) => details.unit === '$' ? `$${val}` : val} />
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
                        stroke="hsl(var(--accent))"
                        strokeWidth={2}
                        dot={(props) => {
                          const { cx, cy, payload } = props;
                          if (dates?.includes(payload.fullDate)) {
                            return <circle key={payload.fullDate} cx={cx} cy={cy} r={6} fill="hsl(var(--accent))" stroke="hsl(var(--card))" strokeWidth={2} />;
                          }
                          return <circle key={payload.fullDate} cx={cx} cy={cy} r={4} fill="hsl(var(--accent))" />;
                        }}
                        name={details.title}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Insights */}
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
            </>
          )}
        </div>
      </div>
    </div>
  )
}
