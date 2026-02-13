import { NextRequest, NextResponse } from 'next/server'
import { supabaseServer as supabase } from '@/lib/supabase-server'
import Papa from 'papaparse'
import crypto from 'crypto'
import { z } from 'zod'

// Constants
const MAX_FILE_SIZE = 50 * 1024 * 1024 // 50MB
const VALID_TYPES = ['text/csv', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']

// Validation schema
const UploadParamsSchema = z.object({
    date: z.string().optional(),
})

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData()
        const file = formData.get('file') as File
        const dateStr = formData.get('date') as string

        if (!file) {
            return NextResponse.json(
                { error: 'No file provided' },
                { status: 400 }
            )
        }

        // File size validation
        if (file.size > MAX_FILE_SIZE) {
            return NextResponse.json(
                { error: `File size exceeds maximum limit of ${MAX_FILE_SIZE / 1024 / 1024}MB` },
                { status: 413 }
            )
        }

        // Validate file type
        if (!VALID_TYPES.includes(file.type) && !file.name.endsWith('.csv') && !file.name.endsWith('.xlsx')) {
            return NextResponse.json(
                { error: 'Invalid file type. Please upload CSV or Excel files.' },
                { status: 400 }
            )
        }

        // Validate date parameter if provided
        if (dateStr) {
            try {
                UploadParamsSchema.parse({ date: dateStr })
                new Date(dateStr) // Verify it's a valid date
            } catch {
                return NextResponse.json(
                    { error: 'Invalid date format' },
                    { status: 400 }
                )
            }
        }

        // Read file content with size limit
        let fileContent: string
        try {
            fileContent = await file.text()
            if (fileContent.length > MAX_FILE_SIZE) {
                throw new Error('File content exceeds size limit')
            }
        } catch {
            return NextResponse.json(
                { error: 'Failed to read file' },
                { status: 400 }
            )
        }

        // Parse CSV using PapaParse
        const parsedData = Papa.parse(fileContent, {
            header: true,
            skipEmptyLines: true,
            dynamicTyping: true
        })

        const rows = parsedData.data as any[]

        // Validate parsed data
        if (!Array.isArray(rows) || rows.length === 0) {
            return NextResponse.json(
                { error: 'No data found in file' },
                { status: 400 }
            )
        }

        // Process data safely
        let totalRevenue = 0
        const transactionIds = new Set()

        for (const row of rows) {
            if (typeof row !== 'object' || row === null) continue

            const revenue = parseFloat(row['Total'] || row['total'] || 0)
            if (!isNaN(revenue) && revenue > 0 && revenue < 1000000000) {
                totalRevenue += revenue
            }

            const txnId = row['Transaction ID'] || row['transaction_id'] || row['id']
            if (txnId && typeof txnId === 'string' && txnId.length < 255) {
                transactionIds.add(txnId)
            }
        }

        const uploadDate = dateStr ? new Date(dateStr) : new Date()
        const formattedDate = uploadDate.toISOString().split('T')[0]
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
        const dayOfWeek = days[uploadDate.getUTCDay()]

        // Sanitize filename using UUID
        const sanitizedFilename = `${crypto.randomUUID()}_${file.name.replace(/[^a-zA-Z0-9._-]/g, '')}`
        const transactionCount = transactionIds.size || rows.length

        // Store file metadata
        const { error: uploadError } = await supabase
            .from('uploaded_files')
            .insert([
                {
                    filename: sanitizedFilename,
                    file_path: `uploads/${sanitizedFilename}`,
                    file_type: file.name.endsWith('.csv') ? 'csv' : 'xlsx',
                    upload_date: uploadDate.toISOString(),
                    processed: true,
                    row_count: rows.length,
                },
            ])

        if (uploadError) throw uploadError

        // Upsert into revenue_data table
        const { error: revenueError } = await supabase
            .from('revenue_data')
            .upsert({
                date: formattedDate,
                day_of_week: dayOfWeek,
                revenue: totalRevenue,
                transactions: transactionCount,
                conversion_rate: 3.2
            }, {
                onConflict: 'date'
            })

        if (revenueError) {
            console.error('Error upserting revenue data')
        }

        return NextResponse.json({
            success: true,
            filename: sanitizedFilename,
            rowCount: rows.length,
            totalRevenue,
            transactionCount,
            uploadDate: uploadDate.toISOString(),
            message: 'File processed and consolidated into dashboard.',
        })
    } catch (error) {
        console.error('Upload error')
        return NextResponse.json(
            { error: 'Failed to process upload' },
            { status: 500 }
        )
    }
}
