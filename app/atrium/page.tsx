'use client'

import { useState } from 'react'
import Sidebar from '@/components/sidebar'
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
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <>
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      {/* Main Content Wrapper */}
      <div className="md:ml-80 flex flex-col h-screen bg-background">
        {/* Shared Header with Toggle */}
        <Header />

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-7xl px-4 py-8 md:px-8">
            {/* Executive Summary Row */}
            <div className="mb-8">
              <ExecutiveSummary />
            </div>

            {/* Opportunities Section */}
            <div className="mb-8">
              <h2 className="font-serif text-lg font-semibold text-foreground mb-4">Opportunities</h2>
              <OpportunityDetection />
            </div>

            {/* Alerts Section */}
            <div className="mb-8">
              <h2 className="font-serif text-lg font-semibold text-foreground mb-4">System Alerts</h2>
              <AnomalyDetectionAlerts />
            </div>

            {/* Analytics Grid */}
            <div className="mb-8">
              <h2 className="font-serif text-lg font-semibold text-foreground mb-4">Analytics & Forecasts</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <PredictiveRevenueForecast />
                <DynamicPricingOptimization />
              </div>
            </div>

            {/* Risk & Performance Grid */}
            <div className="mb-8">
              <h2 className="font-serif text-lg font-semibold text-foreground mb-4">Risk Management</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <CustomerChurnRiskScoring />
                <CustomerSegmentation />
              </div>
            </div>

            {/* Operations Grid */}
            <div className="mb-8">
              <h2 className="font-serif text-lg font-semibold text-foreground mb-4">Operations</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <InventoryOptimization />
                <AttributionModeling />
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
