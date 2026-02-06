'use client'

import ScenarioSimulator from './scenario-simulator'
import VibeCheck from './vibe-check'

export default function IntelligencePanel() {
  return (
    <aside className="hidden lg:flex flex-col gap-6 w-80 border-l bg-background/50 p-6 overflow-y-auto" style={{ borderLeftColor: '#E6E1D9' }}>
      <div>
        <h3 className="font-serif text-sm font-semibold text-foreground uppercase tracking-wide mb-4">
          Context Intelligence
        </h3>
        <div className="space-y-6">
          {/* Scenario Simulator */}
          <ScenarioSimulator />

          {/* Vibe Check */}
          <div className="pt-4 border-t border-border">
            <VibeCheck sentiment={88} keywords={['Friendly Staff', 'Fast WiFi', 'Expensive Pastries']} />
          </div>
        </div>
      </div>
    </aside>
  )
}
