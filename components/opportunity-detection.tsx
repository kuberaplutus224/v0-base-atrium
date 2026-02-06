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
    <div className="w-full space-y-3">
      {opportunities.map((opp) => (
        <div
          key={opp.id}
          className={`border-b border-secondary/40 pb-3 last:border-b-0 ${getUrgencyColor(opp.urgency)}`}
        >
          <div className="flex gap-3">
            <div className="flex-shrink-0 mt-0.5">
              {opp.urgency === 'critical' ? (
                <Zap className="h-5 w-5 text-destructive" />
              ) : (
                <TrendingUp className="h-5 w-5 text-accent" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h4 className="font-medium text-foreground text-sm">{opp.title}</h4>
                  <p className="text-xs text-muted-foreground mt-1 break-words">{opp.description}</p>
                </div>
                <p className={`text-sm font-semibold flex-shrink-0 ${opp.urgency === 'critical' ? 'text-destructive' : 'text-accent'}`}>
                  {opp.potentialImpact}
                </p>
              </div>
              <div className="flex gap-2 mt-2 text-xs">
                <span className="text-muted-foreground">Effort: {opp.effort}</span>
                <span className="text-muted-foreground">Urgency: {opp.urgency}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
