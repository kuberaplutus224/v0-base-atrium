'use client'

import { useState } from 'react'
import { X } from 'lucide-react'

export default function NextBestStep() {
  const [isDismissed, setIsDismissed] = useState(false)

  if (isDismissed) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-secondary/50 dark:bg-secondary px-6 py-4">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 ml-80">
        <div className="flex flex-1 items-center gap-3">
          <div className="h-2 w-2 rounded-full bg-accent" />
          <p className="text-sm text-foreground">
            <span className="font-medium">Recommendation:</span> Your inventory levels for{' '}
            <span className="font-semibold">Oat Milk</span> are low for a typical Saturday morning.{' '}
            <button className="font-semibold text-accent transition-opacity hover:opacity-80">
              Draft a Vendor Order
            </button>
          </p>
        </div>
        <button
          onClick={() => setIsDismissed(true)}
          className="flex-shrink-0 text-foreground transition-opacity hover:opacity-60"
          aria-label="Dismiss recommendation"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
    </div>
  )
}
