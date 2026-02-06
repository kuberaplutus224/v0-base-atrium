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
    <div className="space-y-6">
      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryData.map((item, idx) => (
          <div key={idx} className="rounded-lg border border-border bg-card p-4">
            <p className="text-xs text-muted-foreground mb-1">{item.metric}</p>
            <div className="flex items-end justify-between">
              <p className="font-serif text-xl font-semibold text-foreground">{item.value}</p>
              <p className={`text-xs font-semibold ${item.status === 'up' ? 'text-accent' : 'text-destructive'}`}>
                {item.change}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Daily Revenue Chart */}
      <div className="rounded-lg border border-border bg-card p-6">
        <h3 className="font-serif text-sm font-semibold text-foreground mb-4">This Week Revenue</h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={weekData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" />
            <YAxis stroke="hsl(var(--muted-foreground))" />
            <Tooltip 
              contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))' }}
            />
            <Bar dataKey="revenue" fill="#D1633C" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Key Insights */}
      <div className="rounded-lg border border-border bg-card p-6">
        <h3 className="font-serif text-sm font-semibold text-foreground mb-4">System Insights</h3>
        <ul className="space-y-2">
          <li className="text-xs text-muted-foreground flex gap-2">
            <span className="text-accent">▪</span>
            Revenue trending +12.3% WoW. Weekend spike suggests seasonal demand increase.
          </li>
          <li className="text-xs text-muted-foreground flex gap-2">
            <span className="text-accent">▪</span>
            3 high-risk customers detected. Automated retention campaigns activated.
          </li>
          <li className="text-xs text-muted-foreground flex gap-2">
            <span className="text-accent">▪</span>
            Pricing optimization could add $8.2K monthly revenue. Review recommendations.
          </li>
        </ul>
      </div>
    </div>
  )
}
