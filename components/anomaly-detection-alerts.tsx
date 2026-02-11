import { useState, useEffect } from 'react'
import { AlertCircle, TrendingDown, Zap, Loader2 } from 'lucide-react'
import { format, parseISO } from 'date-fns'

interface Alert {
  id: string
  title: string
  description: string
  severity: 'critical' | 'warning' | 'info'
  icon: 'alert' | 'trend' | 'zap'
  timestamp: string
}

interface AnomalyDetectionAlertsProps {
  dates?: string[]
}

function getSeverityColor(severity: 'critical' | 'warning' | 'info') {
  switch (severity) {
    case 'critical':
      return 'border-destructive/30'
    case 'warning':
      return 'border-accent/30'
    case 'info':
      return 'border-secondary/50'
    default:
      return 'border-secondary/50'
  }
}

function getSeverityTextColor(severity: 'critical' | 'warning' | 'info') {
  switch (severity) {
    case 'critical':
      return 'text-destructive'
    case 'warning':
      return 'text-accent'
    case 'info':
      return 'text-foreground'
    default:
      return 'text-foreground'
  }
}

function getIconForType(title: string) {
  const t = title.toLowerCase()
  if (t.includes('conversion') || t.includes('drop') || t.includes('down')) return 'trend'
  if (t.includes('inventory') || t.includes('stock')) return 'zap'
  return 'alert'
}

export default function AnomalyDetectionAlerts({ dates }: AnomalyDetectionAlertsProps) {
  const [loading, setLoading] = useState(true)
  const [alerts, setAlerts] = useState<Alert[]>([])

  useEffect(() => {
    async function fetchAlerts() {
      setLoading(true)
      try {
        const response = await fetch('/api/alerts')
        const json = await response.json()
        const rawAlerts = json.data || []

        // Map and filter by dates if provided
        const mappedAlerts = rawAlerts.map((a: any) => ({
          id: a.id,
          title: a.alert_type,
          description: a.message,
          severity: a.severity,
          timestamp: a.timestamp,
          icon: getIconForType(a.alert_type)
        }))

        const filtered = dates && dates.length > 0
          ? mappedAlerts.filter((a: any) => dates.includes(format(parseISO(a.timestamp), 'yyyy-MM-dd')))
          : mappedAlerts

        setAlerts(filtered)
      } catch (error) {
        console.error('Error fetching alerts:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchAlerts()
  }, [dates?.join(',')])

  if (loading) {
    return (
      <div className="flex h-32 items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-accent" />
      </div>
    )
  }

  if (alerts.length === 0) {
    return (
      <div className="py-8 text-center border border-dashed rounded-lg border-secondary/50">
        <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
          System Status: Optimal
        </p>
        <p className="text-[10px] text-muted-foreground mt-1 lowercase">
          No anomalies detected for selected period.
        </p>
      </div>
    )
  }

  return (
    <div className="w-full space-y-3">
      {alerts.map((alert) => (
        <div
          key={alert.id}
          className={`border-b border-secondary/40 pb-3 last:border-b-0 ${getSeverityColor(alert.severity)}`}
        >
          <div className="flex gap-3">
            <div className="flex-shrink-0 mt-0.5">
              {alert.icon === 'alert' && <AlertCircle className={`h-5 w-5 ${getSeverityTextColor(alert.severity)}`} />}
              {alert.icon === 'trend' && <TrendingDown className={`h-5 w-5 ${getSeverityTextColor(alert.severity)}`} />}
              {alert.icon === 'zap' && <Zap className={`h-5 w-5 ${getSeverityTextColor(alert.severity)}`} />}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className={`font-medium ${getSeverityTextColor(alert.severity)}`}>
                {alert.title}
              </h4>
              <p className="text-xs text-muted-foreground mt-1 break-words">
                {alert.description}
              </p>
            </div>
            <div className="flex flex-col items-end gap-1">
              <span className="text-[10px] text-muted-foreground tabular-nums">
                {format(parseISO(alert.timestamp), 'HH:mm')}
              </span>
              <button className="text-xs text-muted-foreground hover:text-foreground transition-colors flex-shrink-0">
                Dismiss
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
