'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const summaryData = [
  { metric: 'Revenue', value: '$102.4K', change: '+12.3%', status: 'up' },
  { metric: 'Customers', value: '2,847', change: '+8.2%', status: 'up' },
  { metric: 'Avg Order', value: '$36.02', change: '-2.1%', status: 'down' },
  { metric: 'Health Score', value: '8.4/10', change: '+0.3', status: 'up' },
]

const weekData = [
  { day: 'Mon', revenue: 12450 },
  { day: 'Tue', revenue: 11200 },
  { day: 'Wed', revenue: 13890 },
  { day: 'Thu', revenue: 14230 },
  { day: 'Fri', revenue: 16450 },
  { day: 'Sat', revenue: 18200 },
  { day: 'Sun', revenue: 15600 },
]

export default function ExecutiveSummary() {
  return (
    <div className="w-full space-y-6">
      {/* Key Metrics Grid */}
      <div className="grid grid-cols-2 gap-4">
        {summaryData.map((item, idx) => (
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
        <h3 className="font-serif text-sm font-semibold text-foreground mb-4">This Week Revenue</h3>
        <div className="w-full h-40 -mx-4 px-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weekData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" style={{ fontSize: '11px' }} />
              <YAxis stroke="hsl(var(--muted-foreground))" style={{ fontSize: '11px' }} />
              <Tooltip 
                contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))' }}
              />
              <Bar dataKey="revenue" fill="#D1633C" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Key Insights */}
      <div>
        <h3 className="font-serif text-sm font-semibold text-foreground mb-3">System Insights</h3>
        <ul className="space-y-2 text-xs text-muted-foreground">
          <li className="flex gap-2">• Friday is your peak revenue day. Consider flash sales on other days to smooth the curve.</li>
          <li className="flex gap-2">• Health Score is holding strong at 8.4/10. Customer satisfaction remains consistent.</li>
          <li className="flex gap-2">• Avg order declining 2.1%. May indicate price sensitivity or product mix shift.</li>
        </ul>
      </div>
    </div>
  )
}
