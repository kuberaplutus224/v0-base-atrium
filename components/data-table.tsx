'use client'

import * as React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { MoreHorizontal, ChevronUp, ChevronDown } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface DataColumn {
  key: string
  label: string
  sortable?: boolean
  width?: string
}

interface DataTableProps {
  columns: DataColumn[]
  data: Record<string, any>[]
  onRowClick?: (row: Record<string, any>) => void
  dense?: boolean
}

export function DataTable({
  columns,
  data,
  onRowClick,
  dense = false,
}: DataTableProps) {
  const [sortBy, setSortBy] = React.useState<string | null>(null)
  const [sortOrder, setSortOrder] = React.useState<'asc' | 'desc'>('asc')

  const handleSort = (columnKey: string) => {
    if (sortBy === columnKey) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(columnKey)
      setSortOrder('asc')
    }
  }

  const sortedData = React.useMemo(() => {
    if (!sortBy) return data

    return [...data].sort((a, b) => {
      const aVal = a[sortBy]
      const bVal = b[sortBy]

      if (typeof aVal === 'string') {
        return sortOrder === 'asc'
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal)
      }

      return sortOrder === 'asc' ? aVal - bVal : bVal - aVal
    })
  }, [data, sortBy, sortOrder])

  return (
    <div className="w-full overflow-x-auto rounded-[10px] border border-border">
      <Table>
        <TableHeader className="bg-muted/30">
          <TableRow>
            {columns.map((column) => (
              <TableHead
                key={column.key}
                className={`${dense ? 'px-4 py-2' : 'px-6 py-3'} text-xs font-semibold text-foreground uppercase tracking-wider ${
                  column.width ? `w-${column.width}` : ''
                }`}
              >
                {column.sortable ? (
                  <button
                    onClick={() => handleSort(column.key)}
                    className="flex items-center gap-1 hover:text-accent transition-colors"
                  >
                    {column.label}
                    {sortBy === column.key && (
                      sortOrder === 'asc' ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )
                    )}
                  </button>
                ) : (
                  column.label
                )}
              </TableHead>
            ))}
            <TableHead className={`${dense ? 'px-4 py-2' : 'px-6 py-3'} w-10`}>
              <span className="sr-only">Actions</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedData.map((row, idx) => (
            <TableRow
              key={idx}
              onClick={() => onRowClick?.(row)}
              className={`border-border hover:bg-secondary/30 transition-colors ${
                onRowClick ? 'cursor-pointer' : ''
              }`}
            >
              {columns.map((column) => (
                <TableCell
                  key={`${idx}-${column.key}`}
                  className={`${dense ? 'px-4 py-2' : 'px-6 py-3'} text-sm text-foreground`}
                >
                  {row[column.key]}
                </TableCell>
              ))}
              <TableCell className={`${dense ? 'px-4 py-2' : 'px-6 py-3'} text-right`}>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="h-8 w-8 p-0"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>View</DropdownMenuItem>
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem>Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {sortedData.length === 0 && (
        <div className="px-6 py-8 text-center">
          <p className="text-sm text-muted-foreground">No data available</p>
        </div>
      )}
    </div>
  )
}
