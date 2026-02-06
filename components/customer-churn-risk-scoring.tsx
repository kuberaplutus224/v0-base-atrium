'use client'

import { AlertTriangle, TrendingDown } from 'lucide-react'

interface ChurnRisk {
  customerId: string
  name: string
  riskScore: number
  riskReason: string
  ltv: number
  monthlySpend: number
}

const atRiskCustomers: ChurnRisk[] = [
  {
    customerId: 'C001',
    name: 'Acme Corp',
    riskScore: 92,
    riskReason: 'No purchases in 45 days, previously bought weekly',
    ltv: 24500,
    monthlySpend: 450,
  },
  {
    customerId: 'C002',
    name: 'TechStart Inc',
    riskScore: 87,
    riskReason: 'Support tickets increased, satisfaction score dropped',
    ltv: 18200,
    monthlySpend: 320,
  },
  {
    customerId: 'C003',
    name: 'Global Solutions',
    riskScore: 78,
    riskReason: 'Competitor inquiry activity detected',
    ltv: 15600,
    monthlySpend: 280,
  },
]

function getRiskColor(score: number) {
  if (score >= 85) return 'text-destructive bg-destructive/10'
  if (score >= 70) return 'text-accent bg-accent/10'
  return 'text-foreground bg-secondary/40'
}

export default function CustomerChurnRiskScoring() {
  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <div className="mb-6">
        <h3 className="font-serif text-lg font-semibold text-foreground">Churn Risk Analysis</h3>
        <p className="text-xs text-muted-foreground mt-1">{atRiskCustomers.length} high-risk accounts detected</p>
      </div>

      <div className="space-y-3">
        {atRiskCustomers.map((customer) => (
          <div key={customer.customerId} className="rounded-lg border border-border/50 p-4 bg-secondary/20">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h4 className="font-medium text-foreground">{customer.name}</h4>
                <p className="text-xs text-muted-foreground mt-1">{customer.riskReason}</p>
              </div>
              <div className={`rounded-full px-3 py-1 ${getRiskColor(customer.riskScore)}`}>
                <p className="text-xs font-semibold">{customer.riskScore}% risk</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-3 pt-3 border-t border-border/30">
              <div>
                <p className="text-xs text-muted-foreground">LTV</p>
                <p className="font-serif font-semibold text-foreground">${customer.ltv.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Monthly Spend</p>
                <p className="font-serif font-semibold text-foreground">${customer.monthlySpend}</p>
              </div>
            </div>

            <button className="w-full mt-3 rounded-md bg-accent/10 px-3 py-2 text-xs font-medium text-accent hover:bg-accent/20 transition-colors">
              View Retention Plan
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-border">
        <p className="text-xs text-muted-foreground">
          <strong>At Risk Revenue:</strong> ${atRiskCustomers.reduce((sum, c) => sum + c.ltv, 0).toLocaleString()} LTV at risk
        </p>
      </div>
    </div>
  )
}
