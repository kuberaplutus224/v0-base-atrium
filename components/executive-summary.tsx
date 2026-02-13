'use client'

import { useState, useEffect } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { Loader2 } from 'lucide-react'
import { format, parseISO } from 'date-fns'
import { RevenueData } from '@/lib/supabase'

interface ExecutiveSummaryProps {
  dates?: string[]
}

export default function ExecutiveSummary({ dates }: ExecutiveSummaryProps) {
  const [loading, setLoading] = useState(true)
  const [revenueData, setRevenueData] = useState<{ day: string; revenue: number; fullDate: string }[]>([])
  const [summary, setSummary] = useState([
    { metric: 'Revenue', value: '$0', change: '0%', status: 'up' },
    { metric: 'Transactions', value: '0', change: '0%', status: 'up' },
    { metric: 'Avg Order', value: '$0', change: '0%', status: 'up' },
    { metric: 'Health Score', value: '8.4/10', change: '+0.3', status: 'up' },
  ])

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/revenue')
        const json = await response.json()
        const data: RevenueData[] = json.data || []

        if (data.length > 0) {
          // Sort by date to ensure the chart is chronological
          const sortedData = [...data].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

          // Format for the bar chart
          const chartData = sortedData.map((item: RevenueData) => ({
            day: item.day_of_week.substring(0, 3),
            revenue: item.revenue,
            fullDate: item.date
          }))

          setRevenueData(chartData)

          // Find data for all selected dates
          const selectedDaysData = data.filter((item: RevenueData) => dates?.includes(item.date))

          let totalRevenue = 0
          let totalTransactions = 0

          if (selectedDaysData.length > 0) {
            totalRevenue = selectedDaysData.reduce((sum: number, item: RevenueData) => sum + item.revenue, 0)
            totalTransactions = selectedDaysData.reduce((sum: number, item: RevenueData) => sum + item.transactions, 0)
          } else if (!dates || dates.length === 0) {
            // If no date selected, show totals
            totalRevenue = data.reduce((sum: number, item: RevenueData) => sum + item.revenue, 0)
            totalTransactions = data.reduce((sum: number, item: RevenueData) => sum + item.transactions, 0)
          }

          const avgOrder = totalTransactions > 0 ? totalRevenue / totalTransactions : 0

          setSummary([
            {
              metric: 'Revenue',
              value: `$${(totalRevenue / 1000).toFixed(1)}K`,
              change: '+12.3%',
              status: 'up'
            },
            {
              metric: 'Transactions',
              value: totalTransactions.toLocaleString(),
              change: '+8.2%',
              status: 'up'
            },
            {
              metric: 'Avg Order',
              value: `$${avgOrder.toFixed(2)}`,
              change: '-2.1%',
              status: 'down'
            },
            {
              metric: 'Health Score',
              value: '8.4/10',
              change: '+0.3',
              status: 'up'
            },
          ])
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [dates?.join(',')])

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-accent" />
      </div>
    )
  }

  return (
    <div className="w-full space-y-6">
      {/* Key Metrics Grid */}
      <div className="grid grid-cols-2 gap-4">
        {summary.map((item, idx) => (
          <div key={idx} className="pb-3 border-b border-secondary/40">
            <p className="text-xs text-muted-foreground mb-2">{item.metric}</p>
            <div className="flex items-end justify-between">
              <p className="font-serif text-lg font-semibold text-foreground">{item.value}</p>
              <p className={`text-xs font-semibold ${item.status === 'up' ? 'text-accent' : 'text-destructive'}`}>
                {item.change}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Daily Revenue Chart */}
      <div>
        <h3 className="font-serif text-sm font-semibold text-foreground mb-4">Historical Revenue</h3>
        <div className="w-full h-40 -mx-4 px-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" style={{ fontSize: '11px' }} />
              <YAxis stroke="hsl(var(--muted-foreground))" style={{ fontSize: '11px' }} tickFormatter={(val) => `$${val}`} />
              <Tooltip
                contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))' }}
                formatter={(val: number) => [`$${val.toFixed(2)}`, 'Revenue']}
              />
              <Bar
                dataKey="revenue"
                fill="hsl(var(--accent))"
                radius={[4, 4, 0, 0]}
              >
                {/* Highlight selected dates bars */}
                {revenueData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={dates?.includes(entry.fullDate) ? 'hsl(var(--accent))' : 'hsl(var(--accent) / 0.5)'}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Key Insights */}
      <div>
        <h3 className="font-serif text-sm font-semibold text-foreground mb-3">System Insights {dates && dates.length > 0 ? `| ${dates.length} Days` : ''}</h3>
        <ul className="space-y-2 text-xs text-muted-foreground">
          <li className="flex gap-2">• {dates && dates.length > 0 ? `Displaying specialized insights for ${dates.length} selected days.` : 'Revenue is being aggregated from your latest uploads.'}</li>
          <li className="flex gap-2">• Consistency in average order value suggests stable pricing strategy.</li>
          <li className="flex gap-2">• Health Score reflects operational efficiency and customer retention.</li>
        </ul>
      </div>
    </div>
  )
}
