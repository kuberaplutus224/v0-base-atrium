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
    <div className="w-full">
      <div className="space-y-3">
        {atRiskCustomers.map((customer) => (
          <div key={customer.customerId} className="border-b border-secondary/40 pb-3 last:border-b-0">
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
                <p className="text-xs text-muted-foreground">LTV</p>
                <p className="font-serif font-semibold text-foreground">${customer.ltv.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Monthly Spend</p>
                <p className="font-serif font-semibold text-foreground">${customer.monthlySpend}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
