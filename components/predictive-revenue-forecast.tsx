import { useState, useEffect } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Loader2 } from 'lucide-react'
import { format, parseISO } from 'date-fns'

interface ForecastItem {
  date: string
  current: number | null
  forecast: number
  lower: number
  upper: number
}

interface PredictiveRevenueForecastProps {
  dates?: string[]
}

export default function PredictiveRevenueForecast({ dates }: PredictiveRevenueForecastProps) {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<ForecastItem[]>([])
  const [stats, setStats] = useState({ currentTotal: 0, forecastTotal: 0, change: 0 })

  useEffect(() => {
    async function fetchForecast() {
      setLoading(true)
      try {
        const response = await fetch('/api/forecast')
        const json = await response.json()
        const raw = json.data || []

        const mapped = raw.map((d: any) => ({
          date: format(parseISO(d.date), 'MMM dd'),
          current: d.current_revenue,
          forecast: d.forecast_revenue,
          lower: d.lower_bound,
          upper: d.upper_bound,
          rawDate: d.date
        }))

        // Filter and aggregate stats
        const relevant = dates && dates.length > 0
          ? mapped.filter((d: any) => dates.includes(d.rawDate))
          : mapped

        const currentSum = relevant.reduce((sum: number, d: any) => sum + (d.current || 0), 0)
        const forecastSum = relevant.reduce((sum: number, d: any) => sum + (d.forecast || 0), 0)
        const change = currentSum > 0 ? ((forecastSum - currentSum) / currentSum) * 100 : 0

        setStats({ currentTotal: currentSum, forecastTotal: forecastSum, change })
        setData(mapped)
      } catch (error) {
        console.error('Error fetching forecast:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchForecast()
  }, [dates?.join(',')])

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-accent" />
      </div>
    )
  }

  return (
    <div className="w-full">
      <div className="mb-6">
        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="text-xs text-muted-foreground mb-2">Range Current</p>
            <p className="font-serif text-lg font-semibold text-foreground">
              ${stats.currentTotal.toLocaleString(undefined, { maximumFractionDigits: 0 })}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-2">Range Forecast</p>
            <p className="font-serif text-lg font-semibold text-accent">
              ${stats.forecastTotal.toLocaleString(undefined, { maximumFractionDigits: 0 })}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-2">Exp. Change</p>
            <p className={`font-serif text-lg font-semibold ${stats.change >= 0 ? 'text-green-600' : 'text-destructive'}`}>
              {stats.change >= 0 ? '+' : ''}{stats.change.toFixed(1)}%
            </p>
          </div>
        </div>
      </div>

      <div className="w-full h-64 overflow-hidden -mx-4 px-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
            <XAxis
              dataKey="date"
              stroke="hsl(var(--muted-foreground))"
              style={{ fontSize: '10px' }}
              tickMargin={10}
            />
            <YAxis
              stroke="hsl(var(--muted-foreground))"
              style={{ fontSize: '10px' }}
              tickFormatter={(value) => `$${value / 1000}k`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--background))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
                fontSize: '12px'
              }}
            />
            <Legend verticalAlign="top" height={36} iconType="circle" />
            <Line type="monotone" dataKey="current" stroke="#D1633C" strokeWidth={2} dot={false} name="Actual" activeDot={{ r: 4 }} />
            <Line type="monotone" dataKey="forecast" stroke="#8B7355" strokeWidth={2} strokeDasharray="5 5" name="Forecast" dot={false} />
            <Line type="monotone" dataKey="upper" stroke="hsl(var(--muted-foreground))" strokeWidth={1} strokeDasharray="3 3" name="Bound" dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <p className="text-xs text-muted-foreground mt-4 leading-relaxed">
        <strong>Base Intelligence Insight:</strong> {stats.change < 0
          ? `Expected revenue dip of ${Math.abs(stats.change).toFixed(1)}% detected in the upcoming cycle. Recommend strategic price adjustments or targeted promotions.`
          : `Growth trend of ${stats.change.toFixed(1)}% projected. Inventory levels should be monitored to support increased demand.`}
      </p>
    </div>
  )
}
