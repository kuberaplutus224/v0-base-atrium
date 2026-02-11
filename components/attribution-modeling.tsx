import { useState, useEffect } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Loader2 } from 'lucide-react'

interface Channel {
  id: string
  channel: string
  revenue: number
  orders: number
  roi: number
}

interface AttributionModelingProps {
  dates?: string[]
}

export default function AttributionModeling({ dates }: AttributionModelingProps) {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<Channel[]>([])
  const [bestPerf, setBestPerf] = useState({ revenue: '', roi: '' })

  useEffect(() => {
    async function fetchAttribution() {
      setLoading(true)
      try {
        const response = await fetch('/api/attribution')
        const json = await response.json()
        const raw = json.data || []

        const mapped = raw.map((c: any) => ({
          id: c.id,
          channel: c.channel_name,
          revenue: c.revenue,
          orders: c.orders,
          roi: c.roi
        }))

        // Find best performers
        if (mapped.length > 0) {
          const maxRev = mapped.reduce((prev: any, curr: any) => (prev.revenue > curr.revenue) ? prev : curr)
          const maxRoi = mapped.reduce((prev: any, curr: any) => (prev.roi > curr.roi) ? prev : curr)
          setBestPerf({
            revenue: `${maxRev.channel} - $${(maxRev.revenue / 1000).toFixed(1)}K`,
            roi: `${maxRoi.channel} - ${maxRoi.roi}%`
          })
        }

        setData(mapped)
      } catch (error) {
        console.error('Error fetching attribution:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchAttribution()
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
      <div className="w-full h-64 -mx-4 px-4 mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
            <XAxis dataKey="channel" stroke="hsl(var(--muted-foreground))" style={{ fontSize: '10px' }} />
            <YAxis stroke="hsl(var(--muted-foreground))" yAxisId="left" style={{ fontSize: '10px' }} />
            <YAxis yAxisId="right" orientation="right" stroke="hsl(var(--muted-foreground))" style={{ fontSize: '10px' }} />
            <Tooltip
              contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))', borderRadius: '8px' }}
            />
            <Legend verticalAlign="top" height={36} />
            <Bar yAxisId="left" dataKey="revenue" fill="#D1633C" name="Revenue ($)" radius={[4, 4, 0, 0]} />
            <Bar yAxisId="right" dataKey="roi" fill="#8B7355" name="ROI (%)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="pb-3 border-b border-secondary/40">
          <p className="text-[10px] text-muted-foreground mb-1 uppercase font-semibold">Highest Revenue</p>
          <p className="font-serif font-semibold text-foreground text-sm">{bestPerf.revenue || 'N/A'}</p>
        </div>
        <div className="pb-3 border-b border-secondary/40">
          <p className="text-[10px] text-muted-foreground mb-1 uppercase font-semibold">Peak Efficiency (ROI)</p>
          <p className="font-serif font-semibold text-accent text-sm">{bestPerf.roi || 'N/A'}</p>
        </div>
      </div>

      <p className="text-[11px] text-muted-foreground italic leading-relaxed">
        {bestPerf.roi ? (
          <>
            <strong>Attribution Insight:</strong> Multi-touch analysis suggests higher ROI potential in {bestPerf.roi.split(' - ')[0]} channel. Consider reallocating budget from lower efficiency segments.
          </>
        ) : (
          'No significant attribution patterns detected for the selected period.'
        )}
      </p>
    </div>
  )
}
