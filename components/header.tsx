'use client'

import { usePathname } from 'next/navigation'
import DashboardToggle from './dashboard-toggle'

export default function Header() {
  const pathname = usePathname()
  const currentDashboard = pathname === '/atrium' ? 'atrium' : 'base'

  return (
    <header className="border-b border-border bg-card">
      <div className="mx-auto max-w-6xl px-4 py-8 md:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Minimalist Base Logo */}
            <div className="relative w-6 h-6">
              <div className="absolute inset-0 bg-foreground rounded-sm" />
              <div className="absolute inset-1 bg-background rounded-xs" />
            </div>
            {/* Base Wordmark */}
            <h1 className="font-serif text-3xl font-medium text-foreground" style={{ letterSpacing: '0.05em' }}>
              Base
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <DashboardToggle currentDashboard={currentDashboard} />
            <button className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Settings
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
