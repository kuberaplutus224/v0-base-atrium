'use client'

import { Zap, TrendingUp } from 'lucide-react'

interface Opportunity {
  id: string
  title: string
  description: string
  potentialImpact: string
  effort: 'low' | 'medium' | 'high'
  urgency: 'critical' | 'high' | 'medium'
}

const opportunities: Opportunity[] = [
  {
    id: '1',
    title: 'Bundle Cross-Sell Opportunity',
    description: 'Customers buying Widget X rarely add Service Y. AI suggests 30% of these could be upsold.',
    potentialImpact: '+$12.5K MRR',
    effort: 'low',
    urgency: 'high',
  },
  {
    id: '2',
    title: 'Retention Window Opening',
    description: 'Mid-Market segment shows renewal churn risk spike. Proactive outreach could recover $24K annually.',
    potentialImpact: '+$24K ARR',
    effort: 'medium',
    urgency: 'high',
  },
  {
    id: '3',
    title: 'Inventory Arbitrage Play',
    description: 'Supplier price drop detected. Stock up on top 5 SKUs now for 18% margin improvement.',
    potentialImpact: '+8K units profit',
    effort: 'low',
    urgency: 'critical',
  },
]

function getUrgencyColor(urgency: 'critical' | 'high' | 'medium') {
  switch (urgency) {
    case 'critical':
      return 'border-destructive/50 bg-destructive/10'
    case 'high':
      return 'border-accent/50 bg-accent/10'
    case 'medium':
      return 'border-secondary/50 bg-secondary/20'
  }
}

export default function OpportunityDetection() {
  return (
    <div className="space-y-3">
      {opportunities.map((opp) => (
        <div
          key={opp.id}
          className={`rounded-lg border p-4 ${getUrgencyColor(opp.urgency)}`}
        >
          <div className="flex gap-3">
            <div className="flex-shrink-0 mt-1">
              <Zap className="h-5 w-5 text-accent" />
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between gap-2 mb-2">
                <h4 className="font-medium text-foreground">{opp.title}</h4>
                <span className="inline-block rounded-full px-2.5 py-1 bg-accent/20 text-xs font-semibold text-accent whitespace-nowrap">
                  {opp.potentialImpact}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mb-3">{opp.description}</p>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">
                  Effort: <span className="font-medium capitalize">{opp.effort}</span>
                </span>
                <span className="text-xs text-muted-foreground">
                  Urgency: <span className="font-medium capitalize">{opp.urgency}</span>
                </span>
              </div>
              <button className="w-full mt-2 rounded-md bg-accent/10 px-3 py-2 text-xs font-medium text-accent hover:bg-accent/20 transition-colors">
                Review & Execute
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
