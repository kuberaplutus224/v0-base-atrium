'use client'

import Header from '@/components/header'
import PredictiveRevenueForecast from '@/components/predictive-revenue-forecast'
import AnomalyDetectionAlerts from '@/components/anomaly-detection-alerts'
import DynamicPricingOptimization from '@/components/dynamic-pricing-optimization'
import CustomerChurnRiskScoring from '@/components/customer-churn-risk-scoring'
import CustomerSegmentation from '@/components/customer-segmentation'
import InventoryOptimization from '@/components/inventory-optimization'
import AttributionModeling from '@/components/attribution-modeling'
import ExecutiveSummary from '@/components/executive-summary'
import OpportunityDetection from '@/components/opportunity-detection'

export default function AtriumPage() {
  return (
    <>
      <div className="flex flex-col h-screen bg-background">
        {/* Shared Header */}
        <Header />

        {/* Main Content - Architectural Open Space */}
        <main className="flex-1 overflow-y-auto">
          {/* Title Section */}
          <div className="px-[10vw] pt-12 pb-8 cascade-fade cascade-1">
            <h1 className="font-serif text-7xl font-light text-foreground" style={{ letterSpacing: '-0.02em' }}>
              Atrium
            </h1>
            <p className="text-xs font-sans font-medium text-muted-foreground mt-2 uppercase tracking-[0.1em]">
              AI Intelligence Hub
            </p>
          </div>

          {/* Features Grid - Architectural Layout */}
          <div className="px-[10vw] pb-12">
            <div className="max-w-[1600px] mx-auto">
              {/* Row 1 - Executive Summary & Opportunities */}
              <div className="grid grid-cols-2 gap-12 mb-12">
                <div className="cascade-fade cascade-1" style={{ backgroundColor: '#F1ECE5', padding: '40px' }}>
                  <h2 className="text-xs font-sans font-semibold text-muted-foreground uppercase tracking-[0.1em] mb-6">
                    Executive Summary
                  </h2>
                  <ExecutiveSummary />
                </div>
                <div className="cascade-fade cascade-2" style={{ backgroundColor: '#F1ECE5', padding: '40px' }}>
                  <h2 className="text-xs font-sans font-semibold text-muted-foreground uppercase tracking-[0.1em] mb-6">
                    Opportunities
                  </h2>
                  <OpportunityDetection />
                </div>
              </div>

              {/* Row 2 - Alerts, Forecasting & Pricing */}
              <div className="grid grid-cols-3 gap-12 mb-12">
                <div className="cascade-fade cascade-2" style={{ backgroundColor: '#F1ECE5', padding: '40px' }}>
                  <h2 className="text-xs font-sans font-semibold text-muted-foreground uppercase tracking-[0.1em] mb-6">
                    System Alerts
                  </h2>
                  <AnomalyDetectionAlerts />
                </div>
                <div className="cascade-fade cascade-3" style={{ backgroundColor: '#F1ECE5', padding: '40px' }}>
                  <h2 className="text-xs font-sans font-semibold text-muted-foreground uppercase tracking-[0.1em] mb-6">
                    Revenue Forecast
                  </h2>
                  <PredictiveRevenueForecast />
                </div>
                <div className="cascade-fade cascade-4" style={{ backgroundColor: '#F1ECE5', padding: '40px' }}>
                  <h2 className="text-xs font-sans font-semibold text-muted-foreground uppercase tracking-[0.1em] mb-6">
                    Pricing Optimization
                  </h2>
                  <DynamicPricingOptimization />
                </div>
              </div>

              {/* Row 3 - Churn, Segmentation & Inventory */}
              <div className="grid grid-cols-3 gap-12 mb-12">
                <div className="cascade-fade cascade-3" style={{ backgroundColor: '#F1ECE5', padding: '40px' }}>
                  <h2 className="text-xs font-sans font-semibold text-muted-foreground uppercase tracking-[0.1em] mb-6">
                    Churn Risk
                  </h2>
                  <CustomerChurnRiskScoring />
                </div>
                <div className="cascade-fade cascade-4" style={{ backgroundColor: '#F1ECE5', padding: '40px' }}>
                  <h2 className="text-xs font-sans font-semibold text-muted-foreground uppercase tracking-[0.1em] mb-6">
                    Customer Segments
                  </h2>
                  <CustomerSegmentation />
                </div>
                <div className="cascade-fade cascade-5" style={{ backgroundColor: '#F1ECE5', padding: '40px' }}>
                  <h2 className="text-xs font-sans font-semibold text-muted-foreground uppercase tracking-[0.1em] mb-6">
                    Inventory Health
                  </h2>
                  <InventoryOptimization />
                </div>
              </div>

              {/* Row 4 - Attribution */}
              <div className="cascade-fade cascade-5" style={{ backgroundColor: '#F1ECE5', padding: '40px' }}>
                <h2 className="text-xs font-sans font-semibold text-muted-foreground uppercase tracking-[0.1em] mb-6">
                  Attribution Modeling
                </h2>
                <AttributionModeling />
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
