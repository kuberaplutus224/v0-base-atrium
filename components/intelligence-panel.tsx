'use client'

import { format, parseISO } from 'date-fns'
import ScenarioSimulator from './scenario-simulator'
import VibeCheck from './vibe-check'

interface IntelligencePanelProps {
  dates?: string[]
}

export default function IntelligencePanel({ dates }: IntelligencePanelProps) {
  const getHeaderText = () => {
    if (!dates || dates.length === 0) return 'Context Intelligence'
    if (dates.length === 1) return `Context Intelligence | ${dates[0]}`
    return `Context Intelligence | ${dates.length} Days`
  }

  return (
    <aside className="hidden lg:flex flex-col gap-6 w-80 border-l border-border bg-background/50 p-6 overflow-y-auto">
      <div>
        <h3 className="font-serif text-sm font-semibold text-foreground uppercase tracking-wide mb-4">
          Context Intelligence {dates && dates.length > 0
            ? dates.length === 1
              ? `| ${dates[0]}`
              : `| ${format(parseISO(dates[0]), 'MMM dd')} - ${format(parseISO(dates[dates.length - 1]), 'MMM dd')}`
            : ''}
        </h3>
        <div className="space-y-6">
          {/* Scenario Simulator */}
          <ScenarioSimulator dates={dates} />

          {/* Vibe Check */}
          <div className="pt-4 border-t border-border">
            <VibeCheck dates={dates} sentiment={88} keywords={['Friendly Staff', 'Fast WiFi', 'Expensive Pastries']} />
          </div>
        </div>
      </div>
    </aside>
  )
}
