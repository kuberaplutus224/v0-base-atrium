'use client'

import { X, TrendingUp, Calendar, BarChart3, Zap } from 'lucide-react'

interface StrategyDetailModalProps {
  isOpen: boolean
  onClose: () => void
  strategyName: string | null
}

const strategyDetails: Record<string, any> = {
  'Morning Flash Sales': {
    description: 'Limited-time promotional offers during peak morning hours (6 AM - 10 AM)',
    impact: 34,
    revenue: '+$3,240',
    trend: 'up',
    metrics: [
      { label: 'Conversion Lift', value: '+34%', change: '+5.2%' },
      { label: 'Avg Order Value', value: '$87.50', change: '+12.3%' },
      { label: 'Repeat Rate', value: '42%', change: '+8.1%' },
      { label: 'Customer Satisfaction', value: '4.6/5', change: '+0.3' },
    ],
    findings: [
      'Peak conversion occurs between 7 AM - 8 AM with 38% higher engagement',
      'Mobile traffic drives 56% of flash sale conversions',
      'Email notifications 2 hours before sales increase participation by 68%',
      'Products with 20%+ discount see 3x higher cart additions',
    ],
    recommendations: [
      'Expand flash sales to 4 times per week (currently 2x)',
      'Implement countdown timers to create urgency',
      'Segment email list by timezone for optimized delivery',
      'Feature top 3 products instead of rotating entire catalog',
    ],
    impact_statement:
      'If you run 4 flash sales weekly instead of 2, you could generate an additional $12,960 monthly revenue with minimal inventory impact.',
  },
  'Email Retargeting': {
    description: 'Automated email campaigns targeting users who abandoned carts or browsed products',
    impact: 28,
    revenue: '+$2,180',
    trend: 'up',
    metrics: [
      { label: 'Open Rate', value: '32%', change: '+4.1%' },
      { label: 'Click Rate', value: '8.2%', change: '+1.8%' },
      { label: 'Conversion Rate', value: '4.3%', change: '+0.9%' },
      { label: 'ROI', value: '320%', change: '+45%' },
    ],
    findings: [
      'Cart abandonment emails sent within 1 hour show 2.1x higher recovery',
      'Product view retargeting emails have 28% higher conversion than generic emails',
      'Recipients who receive 2 follow-ups convert 3.4x more than single emails',
      'Personalized subject lines increase open rates by 22%',
    ],
    recommendations: [
      'Send first retargeting email within 30 minutes (currently 2 hours)',
      'Implement dynamic product recommendations based on browsing history',
      'A/B test subject lines to optimize open rates',
      'Add urgency messaging about low stock for high-demand items',
    ],
    impact_statement:
      'Optimizing send times and adding dynamic recommendations could increase retargeting revenue by 40%, adding $872 monthly.',
  },
  'Product Bundles': {
    description: 'Strategic product combinations offered at discounted rates to increase AOV',
    impact: 22,
    revenue: '+$1,620',
    trend: 'down',
    metrics: [
      { label: 'Bundle AOV', value: '$142', change: '-2.1%' },
      { label: 'Bundle Attach Rate', value: '18%', change: '-3.2%' },
      { label: 'Customer Satisfaction', value: '4.2/5', change: '-0.2' },
      { label: 'Inventory Turnover', value: '2.3x', change: '+0.1x' },
    ],
    findings: [
      'Current bundle composition feels arbitrary; no clear value proposition',
      'Seasonal bundles outperform year-round bundles by 31%',
      'Bundles with 3 items perform better than 4+ item bundles (24% vs 16%)',
      'Price-sensitive customers rarely purchase bundles; they prefer individual items',
    ],
    recommendations: [
      'Create seasonal bundles aligned with holidays and shopping occasions',
      'Limit bundles to 2-3 complementary items with clear synergy',
      'Show bundle savings prominently (e.g., "Save $28 with this bundle")',
      'Test positioning bundles as "Complete Your Look" vs discount-focused',
    ],
    impact_statement:
      'Restructuring bundles with better product pairing and seasonal focus could increase bundle revenue by 35%, adding $567 monthly.',
  },
  'VIP Customer Tier': {
    description: 'Exclusive membership program offering early access, special pricing, and perks',
    impact: 19,
    revenue: '+$1,450',
    trend: 'up',
    metrics: [
      { label: 'VIP Members', value: '2,340', change: '+12.5%' },
      { label: 'Lifetime Value', value: '$1,840', change: '+18.3%' },
      { label: 'Purchase Frequency', value: '4.2x/year', change: '+1.1x' },
      { label: 'Retention Rate', value: '86%', change: '+8.7%' },
    ],
    findings: [
      'VIP members spend 3.2x more than non-members over 12 months',
      'Early access sales are 2x more effective than general promotions for VIP',
      'Free shipping benefit drives 23% higher conversion on $50-150 orders',
      'VIP churn rate drops 45% after first repeat purchase within 60 days',
    ],
    recommendations: [
      'Create tiered VIP program (Silver/Gold/Platinum) with escalating benefits',
      'Offer birthday discounts or surprise gifts to increase emotional connection',
      'Implement VIP-only product launches 1 week before general release',
      'Send personalized recommendations based on purchase history',
    ],
    impact_statement:
      'Implementing a tiered VIP program with exclusive perks could increase VIP members by 50% and lifetime value by 25%, adding $725 monthly.',
  },
}

export default function StrategyDetailModal({
  isOpen,
  onClose,
  strategyName,
}: StrategyDetailModalProps) {
  if (!isOpen || !strategyName) return null

  const strategy = strategyDetails[strategyName]
  if (!strategy) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 transition-opacity"
        onClick={onClose}
        style={{ opacity: isOpen ? 1 : 0, pointerEvents: isOpen ? 'auto' : 'none' }}
      />

      {/* Modal */}
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ pointerEvents: isOpen ? 'auto' : 'none' }}
      >
        <div
          className="bg-background rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-border"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 bg-background border-b border-border px-8 py-6 flex items-start justify-between">
            <div>
              <h2 className="font-serif text-2xl font-semibold text-foreground">{strategyName}</h2>
              <p className="text-sm text-muted-foreground mt-2">{strategy.description}</p>
            </div>
            <button
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="px-8 py-6 space-y-8">
            {/* Key Metrics */}
            <div>
              <h3 className="font-serif text-sm font-semibold text-foreground uppercase tracking-wide mb-4 flex items-center gap-2">
                <BarChart3 className="w-4 h-4" />
                Key Metrics
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {strategy.metrics.map((metric: any) => (
                  <div key={metric.label} className="bg-secondary/40 rounded-lg p-4 border border-secondary/50">
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">{metric.label}</p>
                    <p className="text-lg font-semibold text-foreground mt-2">{metric.value}</p>
                    <p className={`text-xs mt-2 ${parseFloat(metric.change) > 0 ? 'text-accent' : 'text-destructive'}`}>
                      {metric.change} from last month
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Findings */}
            <div>
              <h3 className="font-serif text-sm font-semibold text-foreground uppercase tracking-wide mb-4 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Key Findings
              </h3>
              <div className="space-y-3">
                {strategy.findings.map((finding: string) => (
                  <div key={finding} className="flex gap-3 text-sm text-muted-foreground">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 flex-shrink-0" />
                    <p>{finding}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommendations */}
            <div>
              <h3 className="font-serif text-sm font-semibold text-foreground uppercase tracking-wide mb-4 flex items-center gap-2">
                <Zap className="w-4 h-4" />
                Optimization Recommendations
              </h3>
              <div className="space-y-3">
                {strategy.recommendations.map((rec: string) => (
                  <div key={rec} className="flex gap-3 items-start text-sm">
                    <div className="w-5 h-5 rounded bg-accent/20 flex items-center justify-center text-accent flex-shrink-0 mt-0.5">
                      ✓
                    </div>
                    <p className="text-foreground">{rec}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Impact Statement */}
            <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
              <p className="text-sm text-foreground font-medium">{strategy.impact_statement}</p>
            </div>

            {/* Action Button */}
            <button className="w-full bg-accent px-4 py-3 rounded-lg text-accent-foreground font-semibold transition-opacity hover:opacity-90">
              Implement This Strategy
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
