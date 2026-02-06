'use client'

import Link from 'next/link'

interface DashboardToggleProps {
  currentDashboard: 'base' | 'atrium'
}

export default function DashboardToggle({ currentDashboard }: DashboardToggleProps) {
  return (
    <div className="flex items-center gap-2 bg-secondary/40 rounded-lg p-1 border border-secondary/50">
      <Link href="/">
        <button
          className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
            currentDashboard === 'base'
              ? 'bg-accent text-accent-foreground'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          Base
        </button>
      </Link>
      <Link href="/atrium">
        <button
          className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
            currentDashboard === 'atrium'
              ? 'bg-accent text-accent-foreground'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          Atrium
        </button>
      </Link>
    </div>
  )
}
