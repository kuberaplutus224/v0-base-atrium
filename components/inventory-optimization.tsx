import { useState, useEffect } from 'react'
import { Loader2 } from 'lucide-react'

interface InventoryItem {
  id: string
  product: string
  current: number
  optimal: number
  reorderPoint: number
  status: 'critical' | 'low' | 'good'
  daysSupply: number
}

interface InventoryOptimizationProps {
  dates?: string[]
}

function getStatusColor(status: 'critical' | 'low' | 'good') {
  switch (status) {
    case 'critical':
      return 'bg-destructive/10 text-destructive'
    case 'low':
      return 'bg-accent/10 text-accent'
    case 'good':
      return 'bg-secondary/40 text-foreground'
    default:
      return 'bg-secondary/40 text-foreground'
  }
}

export default function InventoryOptimization({ dates }: InventoryOptimizationProps) {
  const [loading, setLoading] = useState(true)
  const [inventory, setInventory] = useState<InventoryItem[]>([])

  useEffect(() => {
    async function fetchInventory() {
      setLoading(true)
      try {
        const response = await fetch('/api/inventory')
        const json = await response.json()
        const raw = json.data || []

        const mapped = raw.map((i: any) => ({
          id: i.id,
          product: i.product_name,
          current: i.current_stock,
          optimal: i.optimal_stock,
          reorderPoint: i.reorder_point,
          status: i.status,
          daysSupply: i.days_supply
        }))

        setInventory(mapped)
      } catch (error) {
        console.error('Error fetching inventory:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchInventory()
  }, [dates?.join(',')])

  if (loading) {
    return (
      <div className="flex h-48 items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-accent" />
      </div>
    )
  }

  if (inventory.length === 0) {
    return (
      <p className="text-sm text-muted-foreground italic text-center py-8">
        No inventory data available.
      </p>
    )
  }

  return (
    <div className="w-full">
      <div className="space-y-3">
        {inventory.map((item) => (
          <div key={item.id} className="border-b border-secondary/40 pb-3 last:border-b-0">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h4 className="font-medium text-foreground text-sm">{item.product}</h4>
                <p className="text-xs text-muted-foreground mt-1 lowercase tracking-tight">
                  {item.daysSupply} days supply remaining
                </p>
              </div>
              <span className={`rounded-full px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider ${getStatusColor(item.status)}`}>
                {item.status}
              </span>
            </div>

            <div className="mt-3">
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase font-semibold">Current</p>
                  <p className="font-serif font-semibold text-foreground text-sm">{item.current}</p>
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase font-semibold">Optimal</p>
                  <p className="font-serif font-semibold text-foreground text-sm">{item.optimal}</p>
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase font-semibold">Reorder</p>
                  <p className="font-serif font-semibold text-foreground text-sm">{item.reorderPoint}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
