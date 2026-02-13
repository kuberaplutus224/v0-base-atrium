'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Search } from 'lucide-react'
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command'

export function GlobalCommand() {
  const [open, setOpen] = React.useState(false)
  const router = useRouter()

  // Register CMD+K and CTRL+K shortcuts
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === 'k' || e.key === 'K') && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  const runCommand = (command: () => void) => {
    setOpen(false)
    command()
  }

  return (
    <>
      {/* Command Palette Trigger in Header */}
      <button
        onClick={() => setOpen(true)}
        className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg bg-muted text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors text-sm w-48 justify-between"
      >
        <div className="flex items-center gap-2">
          <Search className="h-4 w-4" />
          <span>Search...</span>
        </div>
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded bg-background/50 px-1.5 font-mono text-xs font-medium text-muted-foreground opacity-100">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search pages, data, and actions..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>

          {/* Pages */}
          <CommandGroup heading="Pages">
            <CommandItem
              onSelect={() =>
                runCommand(() => router.push('/'))
              }
            >
              <span>Dashboard</span>
            </CommandItem>
            <CommandItem
              onSelect={() =>
                runCommand(() => router.push('/analytics'))
              }
            >
              <span>Analytics</span>
            </CommandItem>
            <CommandItem
              onSelect={() =>
                runCommand(() => router.push('/settings'))
              }
            >
              <span>Settings</span>
            </CommandItem>
          </CommandGroup>

          <CommandSeparator />

          {/* Data Actions */}
          <CommandGroup heading="Data Actions">
            <CommandItem
              onSelect={() =>
                runCommand(() => {
                  console.log('[v0] Export data')
                })
              }
            >
              <span>Export Data</span>
            </CommandItem>
            <CommandItem
              onSelect={() =>
                runCommand(() => {
                  console.log('[v0] Import Data')
                })
              }
            >
              <span>Import Data</span>
            </CommandItem>
            <CommandItem
              onSelect={() =>
                runCommand(() => {
                  console.log('[v0] Refresh Analytics')
                })
              }
            >
              <span>Refresh Analytics</span>
            </CommandItem>
          </CommandGroup>

          <CommandSeparator />

          {/* Settings */}
          <CommandGroup heading="Settings">
            <CommandItem
              onSelect={() =>
                runCommand(() => router.push('/settings'))
              }
            >
              <span>Preferences</span>
            </CommandItem>
            <CommandItem
              onSelect={() =>
                runCommand(() => {
                  console.log('[v0] Account Settings')
                })
              }
            >
              <span>Account</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}
