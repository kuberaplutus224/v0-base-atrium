'use client'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const forecastData = [
  { date: 'Mon', current: 12450, forecast: 12300, lower: 11800, upper: 13100 },
  { date: 'Tue', current: 11200, forecast: 11800, lower: 11100, upper: 12500 },
  { date: 'Wed', current: 13890, forecast: 13500, lower: 12800, upper: 14200 },
  { date: 'Thu', current: 14230, forecast: 14100, lower: 13400, upper: 14800 },
  { date: 'Fri', current: 16450, forecast: 15800, lower: 15000, upper: 16600 },
  { date: 'Sat', current: 18200, forecast: 17500, lower: 16700, upper: 18300 },
  { date: 'Sun', current: 15600, forecast: 16200, lower: 15400, upper: 17000 },
]

export default function PredictiveRevenueForecast() {
  return (
    <div className="w-full">
      <div className="mb-6">
        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="text-xs text-muted-foreground mb-2">This Week</p>
            <p className="font-serif text-lg font-semibold text-foreground">$102,420</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-2">Next Week (Forecast)</p>
            <p className="font-serif text-lg font-semibold text-accent">$101,300</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-2">Change</p>
            <p className="font-serif text-lg font-semibold text-destructive">-1.1%</p>
          </div>
        </div>
      </div>

      <div className="w-full h-64 overflow-hidden -mx-4 px-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={forecastData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" style={{ fontSize: '11px' }} />
            <YAxis stroke="hsl(var(--muted-foreground))" style={{ fontSize: '11px' }} />
            <Tooltip 
              contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))' }}
            />
            <Legend />
            <Line type="monotone" dataKey="current" stroke="#D1633C" strokeWidth={2} dot={false} name="Current" />
            <Line type="monotone" dataKey="forecast" stroke="#8B7355" strokeWidth={2} strokeDasharray="5 5" name="Forecast" />
            <Line type="monotone" dataKey="upper" stroke="hsl(var(--muted-foreground))" strokeWidth={1} strokeDasharray="5 5" name="Upper Band" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <p className="text-xs text-muted-foreground mt-4">
        <strong>Insight:</strong> Revenue expected to dip 1.1% next week. Consider flash sales on Thursday-Friday to offset seasonal decline.
      </p>
    </div>
  )
}
