'use client'

import { AlertCircle, TrendingDown, Zap } from 'lucide-react'

interface Alert {
  id: string
  title: string
  description: string
  severity: 'critical' | 'warning' | 'info'
  icon: 'alert' | 'trend' | 'zap'
}

const alerts: Alert[] = [
  {
    id: '1',
    title: 'Unusual Transaction Spike',
    description: 'Transaction volume up 45% in last 2 hours. Investigate for bot activity or system error.',
    severity: 'critical',
    icon: 'alert',
  },
  {
    id: '2',
    title: 'Conversion Rate Drop',
    description: 'Conversion rate dropped from 3.2% to 2.1% today. Possible checkout issue detected.',
    severity: 'warning',
    icon: 'trend',
  },
  {
    id: '3',
    title: 'Inventory Low Alert',
    description: 'Top 3 products at <10% stock. Auto-reorder triggered.',
    severity: 'info',
    icon: 'zap',
  },
]

function getSeverityColor(severity: 'critical' | 'warning' | 'info') {
  switch (severity) {
    case 'critical':
      return 'bg-destructive/10 border-destructive/30'
    case 'warning':
      return 'bg-accent/10 border-accent/30'
    case 'info':
      return 'bg-secondary/40 border-secondary/50'
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
  }
}

export default function AnomalyDetectionAlerts() {
  return (
    <div className="space-y-3">
      {alerts.map((alert) => (
        <div
          key={alert.id}
          className={`rounded-lg border p-4 ${getSeverityColor(alert.severity)}`}
        >
          <div className="flex gap-3">
            <div className="flex-shrink-0 mt-0.5">
              {alert.icon === 'alert' && <AlertCircle className={`h-5 w-5 ${getSeverityTextColor(alert.severity)}`} />}
              {alert.icon === 'trend' && <TrendingDown className={`h-5 w-5 ${getSeverityTextColor(alert.severity)}`} />}
              {alert.icon === 'zap' && <Zap className={`h-5 w-5 ${getSeverityTextColor(alert.severity)}`} />}
            </div>
            <div className="flex-1">
              <h4 className={`font-medium ${getSeverityTextColor(alert.severity)}`}>
                {alert.title}
              </h4>
              <p className="text-xs text-muted-foreground mt-1">
                {alert.description}
              </p>
            </div>
            <button className="text-xs text-muted-foreground hover:text-foreground transition-colors ml-2">
              Dismiss
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
