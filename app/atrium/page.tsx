'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { format, parseISO, eachDayOfInterval } from 'date-fns'
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
import MorningBriefing from '@/components/morning-briefing'
import ChatInterface from '@/components/chat-interface'
import IntelligencePanel from '@/components/intelligence-panel'

function AtriumContent() {
  const searchParams = useSearchParams()

  // Get currently selected range from URL
  const fromParam = searchParams.get('from')
  const toParam = searchParams.get('to')

  // Expand range into array of dates for child components
  let selectedDates: string[] = []
  if (fromParam && toParam) {
    try {
      const interval = eachDayOfInterval({
        start: parseISO(fromParam),
        end: parseISO(toParam)
      })
      selectedDates = interval.map(d => format(d, 'yyyy-MM-dd'))
    } catch (e) {
      selectedDates = [fromParam]
    }
  } else if (fromParam) {
    selectedDates = [fromParam]
  } else {
    selectedDates = [format(new Date(), 'yyyy-MM-dd')]
  }

  return (
    <div className="flex flex-col h-screen bg-background text-foreground">
      {/* Shared Header */}
      <Header />

      <div className="flex flex-1 overflow-hidden">
        {/* Main Intelligence Grid */}
        <main className="flex-1 overflow-y-auto px-[5vw] py-12 scroll-smooth">
          <div className="max-w-[1400px] mx-auto">
            {/* Title Section */}
            <div className="mb-12">
              <h1 className="font-serif text-6xl font-light tracking-tight">Atrium</h1>
              <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-muted-foreground mt-2">
                Business Intelligence Hub
              </p>
            </div>

            <div className="space-y-12">
              {/* Primary Insights Row */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="rounded-2xl p-8 bg-secondary/50 dark:bg-secondary">
                  <h2 className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground mb-6">Executive Summary</h2>
                  <ExecutiveSummary dates={selectedDates} />
                </div>
                <div className="rounded-2xl p-8 bg-secondary/50 dark:bg-secondary">
                  <h2 className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground mb-6">Strategic Opportunities</h2>
                  <OpportunityDetection dates={selectedDates} />
                </div>
              </div>

              {/* Analytics Row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="rounded-2xl p-8 bg-secondary/50 dark:bg-secondary">
                  <h2 className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground mb-6">System Alerts</h2>
                  <AnomalyDetectionAlerts dates={selectedDates} />
                </div>
                <div className="rounded-2xl p-8 bg-secondary/50 dark:bg-secondary">
                  <h2 className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground mb-6">Revenue Forecast</h2>
                  <PredictiveRevenueForecast dates={selectedDates} />
                </div>
                <div className="rounded-2xl p-8 bg-secondary/50 dark:bg-secondary">
                  <h2 className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground mb-6">Price Optimization</h2>
                  <DynamicPricingOptimization dates={selectedDates} />
                </div>
              </div>

              {/* Data Science Row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="rounded-2xl p-8 bg-secondary/50 dark:bg-secondary">
                  <h2 className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground mb-6">Retention & Churn</h2>
                  <CustomerChurnRiskScoring dates={selectedDates} />
                </div>
                <div className="rounded-2xl p-8 bg-secondary/50 dark:bg-secondary">
                  <h2 className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground mb-6">Market Segments</h2>
                  <CustomerSegmentation dates={selectedDates} />
                </div>
                <div className="rounded-2xl p-8 bg-secondary/50 dark:bg-secondary">
                  <h2 className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground mb-6">Inventory Health</h2>
                  <InventoryOptimization dates={selectedDates} />
                </div>
              </div>

              {/* Deep Analysis Row */}
              <div className="rounded-2xl p-8 bg-secondary/50 dark:bg-secondary">
                <h2 className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground mb-6">Attribution & Performance</h2>
                <AttributionModeling dates={selectedDates} />
              </div>
            </div>
          </div>
        </main>

        {/* Intelligence Sidebar / Interaction Layer */}
        <aside className="hidden xl:flex flex-col w-[450px] border-l border-border bg-card/95 glass overflow-y-auto scrollbar-hide">
          <div className="p-8 space-y-12">
            <div>
              <h2 className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground mb-6">AI Conversationalist</h2>
              <ChatInterface dates={selectedDates} />
            </div>

            <div className="pt-8 border-t border-border">
              <h2 className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground mb-6">Contextual Simulation</h2>
              <IntelligencePanel dates={selectedDates} />
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}

export default function AtriumPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center bg-background text-muted-foreground">Loading Intelligence Hub...</div>}>
      <AtriumContent />
    </Suspense>
  )
}
