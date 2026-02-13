'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

interface StatusBadgeProps {
  status: 'success' | 'warning' | 'error' | 'info'
  label: string
  icon?: React.ReactNode
  className?: string
}

export function StatusBadge({
  status,
  label,
  icon,
  className,
}: StatusBadgeProps) {
  const statusClasses = {
    success: 'status-success',
    warning: 'status-warning',
    error: 'status-error',
    info: 'status-info',
  }

  return (
    <div
      className={cn(
        statusClasses[status],
        className
      )}
    >
      {icon && <span>{icon}</span>}
      <span>{label}</span>
    </div>
  )
}
