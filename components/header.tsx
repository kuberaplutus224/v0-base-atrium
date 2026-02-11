'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Calendar as CalendarIcon } from 'lucide-react'
import { format, parseISO } from 'date-fns'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import DashboardToggle from './dashboard-toggle'

import { DateRange } from 'react-day-picker'

export default function Header() {
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()

  const currentDashboard = pathname === '/atrium' ? 'atrium' : 'base'

  // Get dates from URL or default to current date
  const fromParam = searchParams.get('from')
  const toParam = searchParams.get('to')

  const initialRange: DateRange = {
    from: fromParam ? parseISO(fromParam) : undefined,
    to: toParam ? parseISO(toParam) : undefined
  }

  const handleRangeSelect = (range: DateRange | undefined) => {
    const params = new URLSearchParams(searchParams.toString())

    if (range?.from) {
      params.set('from', format(range.from, 'yyyy-MM-dd'))
      if (range.to) {
        params.set('to', format(range.to, 'yyyy-MM-dd'))
      } else {
        params.delete('to')
      }
    } else {
      params.delete('from')
      params.delete('to')
    }

    // Clean up old 'dates' and 'date' params
    params.delete('dates')
    params.delete('date')

    router.push(`${pathname}?${params.toString()}`)
  }

  const getButtonText = () => {
    if (!initialRange.from) return 'Select Range'
    if (!initialRange.to) return format(initialRange.from, 'LLL dd, y')
    return `${format(initialRange.from, 'LLL dd')} - ${format(initialRange.to, 'LLL dd, y')}`
  }

  return (
    <header className="border-b border-border bg-card sticky top-0 z-50">
      <div className="px-4 py-5 md:px-8">
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

          {/* Date Picker & Merchant Name - Center */}
          <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center gap-4">
            <h2 className="font-serif text-2xl font-semibold text-foreground hidden md:block">
              Kaapi
            </h2>
            <div className="h-6 w-px bg-border hidden md:block" />
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={'outline'}
                  className={cn(
                    'w-[300px] justify-start text-left font-normal border-2 h-10',
                    !initialRange.from && 'text-muted-foreground'
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4 text-accent" />
                  <span>{getButtonText()}</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="center">
                <Calendar
                  mode="range"
                  selected={initialRange}
                  onSelect={handleRangeSelect}
                  initialFocus
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>
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
