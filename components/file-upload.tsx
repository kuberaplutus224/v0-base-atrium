'use client'

import { useState } from 'react'
import { Upload, FileText, CheckCircle, XCircle, Loader2, Calendar as CalendarIcon } from 'lucide-react'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'

interface FileUploadProps {
    onUploadComplete?: (filename: string, rowCount: number) => void
}

export default function FileUpload({ onUploadComplete }: FileUploadProps) {
    const [isDragging, setIsDragging] = useState(false)
    const [uploading, setUploading] = useState(false)
    const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle')
    const [statusMessage, setStatusMessage] = useState('')
    const [date, setDate] = useState<Date>(new Date())

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(true)
    }

    const handleDragLeave = () => {
        setIsDragging(false)
    }

    const handleDrop = async (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(false)

        const files = Array.from(e.dataTransfer.files)
        if (files.length > 0) {
            await uploadFile(files[0])
        }
    }

    const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (files && files.length > 0) {
            await uploadFile(files[0])
        }
    }

    const uploadFile = async (file: File) => {
        // Validate file type
        const validTypes = ['text/csv', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']
        if (!validTypes.includes(file.type) && !file.name.endsWith('.csv') && !file.name.endsWith('.xlsx')) {
            setUploadStatus('error')
            setStatusMessage('Please upload a CSV or Excel file')
            return
        }

        setUploading(true)
        setUploadStatus('idle')

        try {
            const formData = new FormData()
            formData.append('file', file)
            // Send the selected date along with the file
            formData.append('date', date.toISOString())

            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            })

            const result = await response.json()

            if (response.ok) {
                setUploadStatus('success')
                setStatusMessage(`Successfully uploaded ${file.name} for ${format(date, 'PPP')} with ${result.rowCount} rows`)
                if (onUploadComplete) {
                    onUploadComplete(file.name, result.rowCount)
                }
            } else {
                setUploadStatus('error')
                setStatusMessage(result.error || 'Upload failed')
            }
        } catch (error) {
            setUploadStatus('error')
            setStatusMessage('An error occurred during upload')
            console.error('Upload error:', error)
        } finally {
            setUploading(false)
        }
    }

    return (
        <div className="w-full space-y-6">
            {/* Date Selection */}
            <div className="flex flex-col space-y-2">
                <label className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                    Data Date
                </label>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            variant={'outline'}
                            className={cn(
                                'w-full justify-start text-left font-normal h-12 border-2',
                                !date && 'text-muted-foreground'
                            )}
                        >
                            <CalendarIcon className="mr-2 h-4 w-4 text-accent" />
                            {date ? format(date, 'PPP') : <span>Pick a date</span>}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                            mode="single"
                            selected={date}
                            onSelect={(d) => d && setDate(d)}
                            initialFocus
                        />
                    </PopoverContent>
                </Popover>
                <p className="text-xs text-muted-foreground italic">
                    Specify the date this data represents (e.g., yesterday's sales)
                </p>
            </div>

            {/* Drag and Drop Zone */}
            <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`
          relative border-2 border-dashed rounded-lg p-12 text-center transition-colors
          ${isDragging ? 'border-accent bg-accent/10' : 'border-border bg-secondary/20'}
          ${uploading ? 'opacity-50 pointer-events-none' : 'cursor-pointer hover:border-accent hover:bg-accent/5'}
        `}
            >
                <input
                    type="file"
                    accept=".csv,.xlsx"
                    onChange={handleFileSelect}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    disabled={uploading}
                />

                <div className="flex flex-col items-center gap-4">
                    {uploading ? (
                        <Loader2 className="h-12 w-12 text-accent animate-spin" />
                    ) : (
                        <Upload className="h-12 w-12 text-muted-foreground" />
                    )}

                    <div>
                        <p className="text-lg font-semibold text-foreground">
                            {uploading ? 'Uploading...' : 'Drop your file here'}
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                            or click to browse
                        </p>
                    </div>

                    <div className="flex gap-2 text-xs text-muted-foreground">
                        <FileText className="h-4 w-4" />
                        <span>CSV or Excel files</span>
                    </div>
                </div>
            </div>

            {/* Upload Status */}
            {uploadStatus !== 'idle' && (
                <div
                    className={`
            flex items-center gap-3 p-4 rounded-lg
            ${uploadStatus === 'success' ? 'bg-accent/10 text-accent' : 'bg-destructive/10 text-destructive'}
          `}
                >
                    {uploadStatus === 'success' ? (
                        <CheckCircle className="h-5 w-5 flex-shrink-0" />
                    ) : (
                        <XCircle className="h-5 w-5 flex-shrink-0" />
                    )}
                    <p className="text-sm font-medium">{statusMessage}</p>
                </div>
            )}
        </div>
    )
}
