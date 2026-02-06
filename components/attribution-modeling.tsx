'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const attributionData = [
  { channel: 'Direct', revenue: 28400, orders: 240, roi: 450 },
  { channel: 'Email', revenue: 24200, orders: 185, roi: 850 },
  { channel: 'Social', revenue: 18600, orders: 142, roi: 320 },
  { channel: 'Referral', revenue: 16200, orders: 98, roi: 1200 },
  { channel: 'Paid Search', revenue: 14500, orders: 112, roi: 280 },
]

export default function AttributionModeling() {
  return (
    <div className="w-full">
      <div className="w-full h-64 -mx-4 px-4 mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={attributionData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="channel" stroke="hsl(var(--muted-foreground))" style={{ fontSize: '11px' }} />
            <YAxis stroke="hsl(var(--muted-foreground))" yAxisId="left" style={{ fontSize: '11px' }} />
            <YAxis yAxisId="right" orientation="right" stroke="hsl(var(--muted-foreground))" style={{ fontSize: '11px' }} />
            <Tooltip 
              contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))' }}
            />
            <Legend />
            <Bar yAxisId="left" dataKey="revenue" fill="#D1633C" name="Revenue ($)" radius={[4, 4, 0, 0]} />
            <Bar yAxisId="right" dataKey="roi" fill="#8B7355" name="ROI (%)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="pb-3 border-b border-secondary/40">
          <p className="text-xs text-muted-foreground mb-1">Highest Revenue Channel</p>
          <p className="font-serif font-semibold text-foreground">Direct - $28.4K</p>
        </div>
        <div className="pb-3 border-b border-secondary/40">
          <p className="text-xs text-muted-foreground mb-1">Best ROI Channel</p>
          <p className="font-serif font-semibold text-accent">Referral - 1200%</p>
        </div>
      </div>

      <p className="text-xs text-muted-foreground">
        <strong>Recommendation:</strong> Increase referral program budget (1200% ROI) and optimize Email campaigns (850% ROI).
      </p>
    </div>
  )
}
