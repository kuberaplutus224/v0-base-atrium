'use client'

import { X, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react'

interface AnalysisDetailModalProps {
  isOpen: boolean
  onClose: () => void
  analysisTitle: string | null
}

const analysisData: Record<string, {
  title: string
  date: string
  summary: string
  keyFindings: string[]
  metrics: { label: string; value: string; change: string }[]
  recommendations: string[]
  impact: string
}> = {
  'Tuesday Sales Dip': {
    title: 'Tuesday Sales Dip Analysis',
    date: 'Jan 31, 2026',
    summary: 'A 23% drop in revenue was detected on Tuesday. Root cause analysis identified staffing gaps during peak hours and reduced promotional visibility.',
    keyFindings: [
      'Peak hour traffic declined 18% due to understaffing',
      'Email marketing campaign underperformed by 15%',
      'Product page load times increased by 2.3 seconds',
      'Customer support response time delayed by 45%'
    ],
    metrics: [
      { label: 'Revenue Impact', value: '-$2,840', change: '-23%' },
      { label: 'Transactions', value: '156', change: '-19%' },
      { label: 'Conversion Rate', value: '2.8%', change: '-0.6%' },
      { label: 'Avg Order Value', value: '$82.50', change: '-5%' }
    ],
    recommendations: [
      'Increase staffing during 2-5 PM peak hours',
      'Reschedule promotional emails for optimal engagement times',
      'Optimize product images for faster loading',
      'Implement chatbot to reduce support backlog'
    ],
    impact: 'Implementing these changes could recover $2,400+ in lost revenue'
  },
  'Inventory Audit': {
    title: 'Inventory Audit Report',
    date: 'Jan 29, 2026',
    summary: 'Quarterly inventory audit completed. Identified 12 SKUs at critical levels and $4,200 in excess stock requiring clearance.',
    keyFindings: [
      '12 high-demand items below reorder point',
      '$4,200 in overstocked slow-moving inventory',
      '8% discrepancy between system and physical count',
      'Seasonal items showing 34% sales increase'
    ],
    metrics: [
      { label: 'Total SKUs', value: '487', change: '0%' },
      { label: 'Critical Stock', value: '12 items', change: '+3' },
      { label: 'Excess Inventory', value: '$4,200', change: '-12%' },
      { label: 'Stock Accuracy', value: '92%', change: '+2%' }
    ],
    recommendations: [
      'Place urgent orders for 12 critical items',
      'Create clearance campaign for overstocked items',
      'Implement ABC inventory classification system',
      'Increase stock for seasonal best-sellers by 25%'
    ],
    impact: 'Optimizations could free up $3,500 in working capital'
  },
  'Customer Churn Analysis': {
    title: 'Customer Churn Analysis',
    date: 'Jan 28, 2026',
    summary: 'Analyzed customer retention patterns. Identified 127 at-risk customers and churn drivers including pricing concerns and product satisfaction.',
    keyFindings: [
      '127 customers at risk of churning identified',
      '34% cite pricing as primary concern',
      '28% report product quality issues',
      'VIP customers have 8x lower churn rate'
    ],
    metrics: [
      { label: 'At-Risk Customers', value: '127', change: '+15' },
      { label: 'Churn Rate', value: '4.2%', change: '-0.3%' },
      { label: 'Avg Customer Lifetime', value: '14 months', change: '+2' },
      { label: 'Retention Rate', value: '95.8%', change: '+0.3%' }
    ],
    recommendations: [
      'Launch VIP loyalty program for high-value customers',
      'Offer personalized discounts to at-risk segment',
      'Conduct product quality improvement initiative',
      'Implement proactive customer success outreach'
    ],
    impact: 'Retaining just 30% of at-risk customers adds $8,500 annual revenue'
  },
  'Pricing Strategy Review': {
    title: 'Pricing Strategy Review',
    date: 'Jan 25, 2026',
    summary: 'Competitive pricing analysis completed. Identified pricing optimization opportunities and revenue expansion potential through tiered pricing.',
    keyFindings: [
      'Premium tier priced 12% below competitors',
      'Price elasticity shows 3% quantity increase per 2% price cut',
      'Bundle pricing could increase AOV by 18%',
      'Market demand supports 8% base price increase'
    ],
    metrics: [
      { label: 'Price Competitiveness', value: '94%', change: '+2%' },
      { label: 'Price Elasticity', value: '-1.5', change: '0%' },
      { label: 'AOV Potential', value: '+$14.82', change: '+18%' },
      { label: 'Revenue Impact', value: '+$1,200/mo', change: '+12%' }
    ],
    recommendations: [
      'Increase premium tier pricing by 8%',
      'Launch bundle packages for cross-sell',
      'Implement dynamic pricing for peak demand',
      'Test tiered subscription model'
    ],
    impact: 'Strategic pricing could increase monthly revenue by $1,200-$1,800'
  },
  'Weekly Performance': {
    title: 'Weekly Performance Summary',
    date: 'Jan 31, 2026',
    summary: 'Week ending Jan 31 showed strong performance with 8% revenue growth despite Tuesday dip. Key drivers: email campaigns and product promotions.',
    keyFindings: [
      'Week-over-week revenue up 8%',
      'Email marketing ROI improved 22%',
      'New customer acquisition up 15%',
      'Average order value increased $3.20'
    ],
    metrics: [
      { label: 'Weekly Revenue', value: '$28,450', change: '+8%' },
      { label: 'Transactions', value: '1,247', change: '+12%' },
      { label: 'New Customers', value: '156', change: '+15%' },
      { label: 'Avg Order Value', value: '$82.50', change: '+4%' }
    ],
    recommendations: [
      'Continue current email marketing cadence',
      'Replicate successful product promotion tactics',
      'Invest in paid advertising for new customer channels',
      'Scale high-performing product categories'
    ],
    impact: 'Maintaining this trajectory could achieve $1.5M+ annual revenue'
  }
}

export default function AnalysisDetailModal({ isOpen, onClose, analysisTitle }: AnalysisDetailModalProps) {
  if (!isOpen || !analysisTitle) return null

  const analysis = analysisData[analysisTitle]
  if (!analysis) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-background rounded-lg border border-border shadow-xl">
        {/* Header */}
        <div className="sticky top-0 bg-background border-b border-border px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="font-serif text-2xl font-semibold text-foreground">{analysis.title}</h2>
            <p className="text-xs text-muted-foreground mt-1">Generated on {analysis.date}</p>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-secondary rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-muted-foreground" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Summary */}
          <div>
            <p className="text-sm text-foreground leading-relaxed">{analysis.summary}</p>
          </div>

          {/* Key Metrics */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wide">Key Metrics</h3>
            <div className="grid grid-cols-2 gap-3">
              {analysis.metrics.map((metric) => (
                <div key={metric.label} className="bg-secondary/30 rounded-lg p-3 border border-border">
                  <p className="text-xs text-muted-foreground mb-1">{metric.label}</p>
                  <div className="flex items-baseline gap-2">
                    <p className="font-serif text-lg font-semibold text-foreground">{metric.value}</p>
                    <span className={`text-xs font-semibold ${metric.change.startsWith('-') ? 'text-destructive' : 'text-accent'}`}>
                      {metric.change}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Key Findings */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wide">Key Findings</h3>
            <div className="space-y-2">
              {analysis.keyFindings.map((finding, idx) => (
                <div key={idx} className="flex gap-3 items-start">
                  <AlertCircle className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-foreground">{finding}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Recommendations */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wide">Recommendations</h3>
            <div className="space-y-2">
              {analysis.recommendations.map((rec, idx) => (
                <div key={idx} className="flex gap-3 items-start">
                  <CheckCircle className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-foreground">{rec}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Impact */}
          <div className="bg-accent/10 border border-accent/30 rounded-lg p-4">
            <div className="flex gap-3 items-start">
              <TrendingUp className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-semibold text-accent uppercase tracking-wide mb-1">Potential Impact</p>
                <p className="text-sm font-semibold text-foreground">{analysis.impact}</p>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <button className="w-full bg-accent text-accent-foreground py-2.5 rounded-lg font-semibold text-sm hover:opacity-90 transition-opacity">
            Apply Recommendations
          </button>
        </div>
      </div>
    </div>
  )
}
