'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Calendar as CalendarIcon, Search, User } from 'lucide-react'
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
    if (!initialRange.to) return format(initialRange.from, 'MMM dd, y')
    return `${format(initialRange.from, 'MMM dd')} - ${format(initialRange.to, 'MMM dd, y')}`
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur-sm">
      <div className="px-6 py-4 md:px-8">
        <div className="flex items-center justify-between gap-6">
          {/* Left: Logo & Brand */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="flex items-center justify-center w-8 h-8 rounded-md bg-primary text-primary-foreground font-semibold text-sm">
              B
            </div>
            <h1 className="hidden sm:block text-lg font-semibold text-foreground">
              Base
            </h1>
          </div>

          {/* Center: Date Picker */}
          <div className="hidden md:flex items-center gap-4 flex-1 justify-center">
            <span className="text-sm font-medium text-muted-foreground">Kaapi</span>
            <div className="h-5 w-px bg-border" />
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={'outline'}
                  className={cn(
                    'w-[280px] justify-start text-left text-sm border h-9',
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

          {/* Right: Actions */}
          <div className="flex items-center gap-3 flex-shrink-0">
            {/* Global Search */}
            <div className="hidden sm:flex items-center gap-2 bg-muted rounded-lg px-3 py-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
              <Search className="h-4 w-4" />
              <span className="text-xs text-muted-foreground">Search</span>
            </div>

            {/* Dashboard Toggle */}
            <DashboardToggle currentDashboard={currentDashboard} />

            {/* User Profile */}
            <button className="flex items-center justify-center w-8 h-8 rounded-lg bg-muted text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors">
              <User className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
