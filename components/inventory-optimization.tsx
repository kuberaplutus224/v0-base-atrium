'use client'

import { AlertTriangle, TrendingUp } from 'lucide-react'

interface InventoryItem {
  product: string
  current: number
  optimal: number
  reorderPoint: number
  status: 'critical' | 'low' | 'good'
  daysSupply: number
}

const inventory: InventoryItem[] = [
  {
    product: 'Premium Widget',
    current: 12,
    optimal: 45,
    reorderPoint: 20,
    status: 'critical',
    daysSupply: 2,
  },
  {
    product: 'Standard Bundle',
    current: 34,
    optimal: 60,
    reorderPoint: 25,
    status: 'low',
    daysSupply: 8,
  },
  {
    product: 'Elite Service License',
    current: 156,
    optimal: 120,
    reorderPoint: 50,
    status: 'good',
    daysSupply: 45,
  },
]

function getStatusColor(status: 'critical' | 'low' | 'good') {
  switch (status) {
    case 'critical':
      return 'bg-destructive/10 text-destructive'
    case 'low':
      return 'bg-accent/10 text-accent'
    case 'good':
      return 'bg-secondary/40 text-foreground'
  }
}

export default function InventoryOptimization() {
  return (
    <div className="w-full">
      <div className="space-y-3">
        {inventory.map((item, idx) => (
          <div key={idx} className="border-b border-secondary/40 pb-3 last:border-b-0">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h4 className="font-medium text-foreground text-sm">{item.product}</h4>
                <p className="text-xs text-muted-foreground mt-1">
                  {item.daysSupply} days supply remaining
                </p>
              </div>
              <span className={`rounded-full px-2 py-1 text-xs font-semibold ${getStatusColor(item.status)}`}>
                {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
              </span>
            </div>

            <div className="mt-3">
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <p className="text-xs text-muted-foreground">Current</p>
                  <p className="font-serif font-semibold text-foreground">{item.current} units</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Optimal</p>
                  <p className="font-serif font-semibold text-foreground">{item.optimal} units</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Reorder Point</p>
                  <p className="font-serif font-semibold text-foreground">{item.reorderPoint} units</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
