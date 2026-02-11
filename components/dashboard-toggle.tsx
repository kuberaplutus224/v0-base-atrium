'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

interface DashboardToggleProps {
  currentDashboard: 'base' | 'atrium'
}

export default function DashboardToggle({ currentDashboard }: DashboardToggleProps) {
  const searchParams = useSearchParams()
  const paramsString = searchParams.toString()
  const queryString = paramsString ? `?${paramsString}` : ''

  return (
    <div className="flex items-center gap-2 bg-secondary/40 rounded-lg p-1 border border-secondary/50">
      <Link href={`/${queryString}`}>
        <button
          className={`px-4 py-2 rounded text-sm font-medium transition-colors ${currentDashboard === 'base'
              ? 'bg-accent text-accent-foreground'
              : 'text-muted-foreground hover:text-foreground'
            }`}
        >
          Base
        </button>
      </Link>
      <Link href={`/atrium${queryString}`}>
        <button
          className={`px-4 py-2 rounded text-sm font-medium transition-colors ${currentDashboard === 'atrium'
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
