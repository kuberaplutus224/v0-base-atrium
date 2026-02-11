import { useState, useEffect } from 'react'
import { AlertTriangle, TrendingDown, Loader2 } from 'lucide-react'

interface ChurnRisk {
  id: string
  name: string
  riskScore: number
  riskReason: string
  ltv: number
  lastPurchaseDays: number
}

interface CustomerChurnRiskScoringProps {
  dates?: string[]
}

function getRiskColor(score: number) {
  if (score >= 85) return 'text-destructive bg-destructive/10'
  if (score >= 70) return 'text-accent bg-accent/10'
  return 'text-foreground bg-secondary/40'
}

export default function CustomerChurnRiskScoring({ dates }: CustomerChurnRiskScoringProps) {
  const [loading, setLoading] = useState(true)
  const [atRiskCustomers, setAtRiskCustomers] = useState<ChurnRisk[]>([])

  useEffect(() => {
    async function fetchChurn() {
      setLoading(true)
      try {
        const response = await fetch('/api/customers/churn')
        const json = await response.json()
        const raw = json.data || []

        const mapped = raw.map((c: any) => ({
          id: c.id,
          name: c.customer_name,
          riskScore: c.risk_score,
          riskReason: c.reason,
          ltv: c.ltv_at_risk,
          lastPurchaseDays: c.last_purchase_days
        }))

        setAtRiskCustomers(mapped)
      } catch (error) {
        console.error('Error fetching churn data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchChurn()
  }, [dates?.join(',')])

  if (loading) {
    return (
      <div className="flex h-48 items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-accent" />
      </div>
    )
  }

  if (atRiskCustomers.length === 0) {
    return (
      <p className="text-sm text-muted-foreground italic text-center py-8">
        No high-risk churn signals detected.
      </p>
    )
  }

  return (
    <div className="w-full">
      <div className="space-y-3">
        {atRiskCustomers.map((customer) => (
          <div key={customer.id} className="border-b border-secondary/40 pb-3 last:border-b-0">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h4 className="font-medium text-foreground text-sm">{customer.name}</h4>
                <p className="text-xs text-muted-foreground mt-1">{customer.riskReason}</p>
              </div>
              <div className={`rounded-full px-3 py-1 ${getRiskColor(customer.riskScore)}`}>
                <p className="text-xs font-semibold">{customer.riskScore}% risk</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-3">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-tight font-semibold">LTV at Risk</p>
                <p className="font-serif font-semibold text-foreground">${customer.ltv.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-tight font-semibold">Last Activity</p>
                <p className="font-serif font-semibold text-foreground">{customer.lastPurchaseDays} days ago</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
