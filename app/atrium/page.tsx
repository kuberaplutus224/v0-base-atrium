'use client'

import Header from '@/components/header'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const momentumData = [
  { day: 'Mon', value: 2400, lastWeek: 2100 },
  { day: 'Tue', value: 3200, lastWeek: 2800 },
  { day: 'Wed', value: 2800, lastWeek: 2600 },
  { day: 'Thu', value: 3900, lastWeek: 3200 },
  { day: 'Fri', value: 4100, lastWeek: 3800 },
  { day: 'Sat', value: 3800, lastWeek: 3400 },
  { day: 'Sun', value: 4300, lastWeek: 3900 },
]

const signalFeed = [
  { id: 1, type: 'Revenue Peak', value: '+$2,400', time: '2 min ago', status: 'positive' },
  { id: 2, type: 'Customer Surge', value: '+142 users', time: '5 min ago', status: 'positive' },
  { id: 3, type: 'System Latency', value: '+240ms', time: '8 min ago', status: 'warning' },
  { id: 4, type: 'Churn Alert', value: '-3 customers', time: '12 min ago', status: 'warning' },
  { id: 5, type: 'Inventory Low', value: 'Product A', time: '15 min ago', status: 'warning' },
]

export default function AtriumPage() {
  return (
    <>
      <div className="flex flex-col h-screen bg-background">
        {/* Shared Header */}
        <Header />

        {/* Main Content - Architectural Open Space */}
        <main className="flex-1 overflow-y-auto">
          {/* Title Section */}
          <div className="px-[10vw] pt-12 pb-8 cascade-fade cascade-1">
            <h1 className="font-serif text-7xl font-light text-foreground" style={{ letterSpacing: '-0.02em' }}>
              Atrium
            </h1>
            <p className="text-xs font-sans font-medium text-muted-foreground mt-2 uppercase tracking-[0.1em]">
              Business Intelligence Skylight
            </p>
          </div>

          {/* Three-Column Grid Layout */}
          <div className="px-[10vw] pb-12">
            <div className="max-w-[1600px] mx-auto grid grid-cols-[20%_55%_25%] gap-12">
              {/* LEFT COLUMN - History & Sync */}
              <div className="space-y-8">
                {/* History Stats */}
                <div className="cascade-fade cascade-2">
                  <h3 className="text-xs font-sans font-semibold text-muted-foreground uppercase tracking-[0.1em] mb-6">
                    Analysis History
                  </h3>
                  <div className="space-y-3">
                    {[
                      { label: 'Last Analysis', value: '14:32 UTC' },
                      { label: 'Iterations', value: '847' },
                      { label: 'Confidence', value: '94.2%' },
                    ].map((item) => (
                      <div key={item.label} className="pb-3 border-b border-secondary/40">
                        <p className="text-xs text-muted-foreground uppercase tracking-[0.08em] mb-1">
                          {item.label}
                        </p>
                        <p className="text-lg font-serif text-foreground">{item.value}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sync Status */}
                <div className="cascade-fade cascade-3" style={{ backgroundColor: '#F1ECE5', padding: '20px' }}>
                  <h3 className="text-xs font-sans font-semibold text-muted-foreground uppercase tracking-[0.1em] mb-4">
                    System Sync
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">Square</span>
                      <span className="text-green-600 text-xs font-semibold">Live</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">Inventory</span>
                      <span className="text-green-600 text-xs font-semibold">Live</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">Database</span>
                      <span className="text-green-600 text-xs font-semibold">Live</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-4">Last sync: 01-05-2026</p>
                </div>
              </div>

              {/* CENTER COLUMN - Business Momentum & Signal */}
              <div className="space-y-12">
                {/* Business Momentum Chart */}
                <div className="cascade-fade cascade-2">
                  <h3 className="text-xs font-sans font-semibold text-muted-foreground uppercase tracking-[0.1em] mb-6">
                    Business Momentum
                  </h3>
                  <div className="relative h-80" style={{ backgroundColor: 'rgba(209, 99, 60, 0.05)' }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={momentumData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(209, 99, 60, 0.1)" vertical={false} />
                        <XAxis dataKey="day" stroke="#999" style={{ fontSize: '11px' }} />
                        <YAxis stroke="#999" style={{ fontSize: '11px' }} />
                        <Tooltip
                          contentStyle={{ backgroundColor: '#F1ECE5', border: 'none' }}
                          formatter={(value) => `$${value.toLocaleString()}`}
                        />
                        <Line
                          type="monotone"
                          dataKey="value"
                          stroke="#D1633C"
                          dot={false}
                          strokeWidth={2}
                          isAnimationActive={true}
                        />
                        <Line
                          type="monotone"
                          dataKey="lastWeek"
                          stroke="#E8D4C8"
                          dot={false}
                          strokeWidth={1}
                          strokeDasharray="5 5"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                  <p className="text-xs text-muted-foreground mt-4 uppercase tracking-[0.08em]">
                    This Week vs Last Week
                  </p>
                </div>

                {/* Live Signal Feed */}
                <div className="cascade-fade cascade-3">
                  <h3 className="text-xs font-sans font-semibold text-muted-foreground uppercase tracking-[0.1em] mb-6">
                    Live Signal Feed
                  </h3>
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {signalFeed.map((signal, idx) => (
                      <div
                        key={signal.id}
                        className="cascade-fade p-3 border-b border-secondary/40 last:border-b-0"
                        style={{ animationDelay: `${0.1 + idx * 0.05}s` }}
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="text-sm font-serif text-foreground">{signal.type}</p>
                            <p className="text-xs text-muted-foreground mt-1">{signal.time}</p>
                          </div>
                          <p className={`text-sm font-semibold ${signal.status === 'positive' ? 'text-green-600' : 'text-amber-600'}`}>
                            {signal.value}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN - Simulators & Health */}
              <div className="space-y-8">
                {/* Scenario Simulator */}
                <div className="cascade-fade cascade-4" style={{ backgroundColor: '#F1ECE5', padding: '24px' }}>
                  <h3 className="text-xs font-sans font-semibold text-muted-foreground uppercase tracking-[0.1em] mb-6">
                    Scenario Simulator
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs text-muted-foreground uppercase tracking-[0.08em]">Price Increase</label>
                      <input
                        type="range"
                        min="0"
                        max="50"
                        defaultValue="15"
                        className="w-full mt-2"
                      />
                      <p className="text-sm font-serif text-foreground mt-2">+15%</p>
                    </div>
                    <div className="pt-4 border-t border-border">
                      <p className="text-xs text-muted-foreground uppercase tracking-[0.08em] mb-2">Projected Impact</p>
                      <p className="text-2xl font-serif text-accent">+$2,400</p>
                      <p className="text-xs text-muted-foreground mt-1">Estimated weekly revenue</p>
                    </div>
                  </div>
                </div>

                {/* Predictive Health */}
                <div className="cascade-fade cascade-5">
                  <h3 className="text-xs font-sans font-semibold text-muted-foreground uppercase tracking-[0.1em] mb-6">
                    Predictive Health
                  </h3>
                  <div className="space-y-3">
                    {[
                      { metric: 'System Performance', value: 98, color: 'bg-green-600' },
                      { metric: 'Customer Retention', value: 92, color: 'bg-green-600' },
                      { metric: 'Inventory Health', value: 76, color: 'bg-amber-600' },
                      { metric: 'Revenue Stability', value: 88, color: 'bg-green-600' },
                    ].map((item) => (
                      <div key={item.metric}>
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-xs text-muted-foreground uppercase tracking-[0.08em]">{item.metric}</p>
                          <p className="text-sm font-semibold text-foreground">{item.value}%</p>
                        </div>
                        <div className="h-1.5 bg-secondary/40 rounded-full overflow-hidden">
                          <div className={`h-full ${item.color}`} style={{ width: `${item.value}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
