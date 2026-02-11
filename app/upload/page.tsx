'use client'

import { useState, useEffect } from 'react'
import { ArrowLeft, Upload as UploadIcon, FileText, Calendar, CheckCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import FileUpload from '@/components/file-upload'

interface UploadedFile {
    id: string
    filename: string
    file_type: string
    upload_date: string
    processed: boolean
    row_count: number
}

export default function UploadPage() {
    const router = useRouter()
    const [uploadHistory, setUploadHistory] = useState<UploadedFile[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchUploadHistory()
    }, [])

    const fetchUploadHistory = async () => {
        try {
            const response = await fetch('/api/uploads')
            if (response.ok) {
                const result = await response.json()
                setUploadHistory(result.data || [])
            }
        } catch (error) {
            console.error('Error fetching upload history:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleUploadComplete = (filename: string, rowCount: number) => {
        // Refresh upload history
        fetchUploadHistory()
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        })
    }

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <div className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container mx-auto px-6 py-4">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => router.push('/')}
                            className="p-2 rounded-lg hover:bg-secondary transition-colors"
                        >
                            <ArrowLeft className="h-5 w-5 text-foreground" />
                        </button>
                        <div>
                            <h1 className="font-serif text-2xl font-semibold text-foreground">File Upload Dashboard</h1>
                            <p className="text-sm text-muted-foreground mt-1">Upload CSV or Excel files to populate your data</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-6 py-8 max-w-5xl">
                <div className="space-y-8">
                    {/* Upload Section */}
                    <div className="bg-card rounded-lg border border-border p-6">
                        <div className="flex items-center gap-3 mb-6">
                            <UploadIcon className="h-6 w-6 text-accent" />
                            <h2 className="font-serif text-xl font-semibold text-foreground">Upload New File</h2>
                        </div>
                        <FileUpload onUploadComplete={handleUploadComplete} />
                    </div>

                    {/* Upload History */}
                    <div className="bg-card rounded-lg border border-border p-6">
                        <div className="flex items-center gap-3 mb-6">
                            <FileText className="h-6 w-6 text-accent" />
                            <h2 className="font-serif text-xl font-semibold text-foreground">Upload History</h2>
                        </div>

                        {loading ? (
                            <div className="text-center py-8 text-muted-foreground">Loading...</div>
                        ) : uploadHistory.length === 0 ? (
                            <div className="text-center py-8 text-muted-foreground">
                                No files uploaded yet. Upload your first file above!
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-border">
                                            <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Filename</th>
                                            <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Type</th>
                                            <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Rows</th>
                                            <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Upload Date</th>
                                            <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {uploadHistory.map((file) => (
                                            <tr key={file.id} className="border-b border-border/50 hover:bg-secondary/20 transition-colors">
                                                <td className="py-3 px-4 text-sm text-foreground font-medium">{file.filename}</td>
                                                <td className="py-3 px-4 text-sm text-muted-foreground uppercase">{file.file_type}</td>
                                                <td className="py-3 px-4 text-sm text-muted-foreground">{file.row_count.toLocaleString()}</td>
                                                <td className="py-3 px-4 text-sm text-muted-foreground">
                                                    <div className="flex items-center gap-2">
                                                        <Calendar className="h-4 w-4" />
                                                        {formatDate(file.upload_date)}
                                                    </div>
                                                </td>
                                                <td className="py-3 px-4">
                                                    {file.processed ? (
                                                        <div className="flex items-center gap-2 text-accent">
                                                            <CheckCircle className="h-4 w-4" />
                                                            <span className="text-sm font-medium">Processed</span>
                                                        </div>
                                                    ) : (
                                                        <span className="text-sm text-muted-foreground">Pending</span>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>

                    {/* Instructions */}
                    <div className="bg-secondary/20 rounded-lg border border-border p-6">
                        <h3 className="font-serif text-lg font-semibold text-foreground mb-4">Upload Instructions</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li className="flex gap-2">
                                <span className="text-accent">•</span>
                                <span>Supported file formats: CSV (.csv) and Excel (.xlsx)</span>
                            </li>
                            <li className="flex gap-2">
                                <span className="text-accent">•</span>
                                <span>Files should contain columns matching the database schema (revenue, transactions, etc.)</span>
                            </li>
                            <li className="flex gap-2">
                                <span className="text-accent">•</span>
                                <span>Data will be automatically processed and inserted into the appropriate tables</span>
                            </li>
                            <li className="flex gap-2">
                                <span className="text-accent">•</span>
                                <span>You can upload multiple files - they will be merged with existing data</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
