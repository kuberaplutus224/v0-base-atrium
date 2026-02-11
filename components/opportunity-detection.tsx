import { Zap, TrendingUp } from 'lucide-react'

interface Opportunity {
  id: string
  title: string
  description: string
  potentialImpact: string
  effort: 'low' | 'medium' | 'high'
  urgency: 'critical' | 'high' | 'medium'
}

interface OpportunityDetectionProps {
  dates?: string[]
}

const opportunities: Opportunity[] = [
  {
    id: '1',
    title: 'Whole Bean & Grinder Bundle',
    description: 'Customers purchasing Kaapi Heritage Beans rarely add a local grinder service. 30% retention potential detected.',
    potentialImpact: '+$1.5K Revenue',
    effort: 'low',
    urgency: 'high',
  },
  {
    id: '2',
    title: 'Morning Routine Consistency',
    description: 'The "Early Bird" segment shows a lapse in visit frequency. Proactive loyalty push recommended.',
    potentialImpact: '+120 Visits',
    effort: 'medium',
    urgency: 'high',
  },
  {
    id: '3',
    title: 'Oat Milk Supply Arbitrage',
    description: 'Local supplier price drop detected for Barista Edition Oat Milk. Stock up now to improve beverage margins.',
    potentialImpact: '+15% Margin',
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

export default function OpportunityDetection({ dates }: OpportunityDetectionProps) {
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
                  <p className="text-[11px] text-muted-foreground mt-1 leading-relaxed">{opp.description}</p>
                </div>
                <p className={`text-sm font-semibold flex-shrink-0 ${opp.urgency === 'critical' ? 'text-destructive' : 'text-accent'}`}>
                  {opp.potentialImpact}
                </p>
              </div>
              <div className="flex gap-2 mt-2 text-[10px] uppercase font-bold tracking-wider">
                <span className="text-muted-foreground/80">Effort: {opp.effort}</span>
                <span className="text-muted-foreground/80">Urgency: {opp.urgency}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
