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
import DashboardToggle from '@/components/dashboard-toggle'

export default function AtriumPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <>
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      {/* Main Content Wrapper */}
      <div className="md:ml-80 flex flex-col h-screen bg-background">
        {/* Header with Dashboard Toggle */}
        <div className="border-b border-border bg-card">
          <div className="mx-auto max-w-7xl px-4 py-4 md:px-8 flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Logo */}
              <div className="relative w-6 h-6">
                <div className="absolute inset-0 bg-foreground rounded-sm" />
                <div className="absolute inset-1 bg-background rounded-xs" />
              </div>
              <h1 className="font-serif text-2xl font-medium text-foreground" style={{ letterSpacing: '0.05em' }}>
                Atrium
              </h1>
              <span className="text-xs text-muted-foreground ml-2">AI Intelligence Hub</span>
            </div>
            <DashboardToggle currentDashboard="atrium" />
          </div>
        </div>

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
