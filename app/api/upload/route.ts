import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import Papa from 'papaparse'

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData()
        const file = formData.get('file') as File
        const dateStr = formData.get('date') as string
        const uploadDate = dateStr ? new Date(dateStr) : new Date()

        if (!file) {
            return NextResponse.json(
                { error: 'No file provided' },
                { status: 400 }
            )
        }

        // Validate file type
        const validTypes = ['text/csv', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']
        if (!validTypes.includes(file.type) && !file.name.endsWith('.csv') && !file.name.endsWith('.xlsx')) {
            return NextResponse.json(
                { error: 'Invalid file type. Please upload CSV or Excel files.' },
                { status: 400 }
            )
        }

        // Read file content
        const fileContent = await file.text()

        // Parse CSV using PapaParse
        const parsedData = Papa.parse(fileContent, {
            header: true,
            skipEmptyLines: true,
            dynamicTyping: true
        })

        const rows = parsedData.data as any[]

        // Aggregate revenue and transaction count
        let totalRevenue = 0
        const transactionIds = new Set()

        rows.forEach(row => {
            const revenue = parseFloat(row['Total'] || row['total'] || 0)
            if (!isNaN(revenue)) {
                totalRevenue += revenue
            }

            const txnId = row['Transaction ID'] || row['transaction_id'] || row['id']
            if (txnId) {
                transactionIds.add(txnId)
            }
        })

        const transactionCount = transactionIds.size || rows.length
        const formattedDate = uploadDate.toISOString().split('T')[0]

        // Get day of week for the data
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
        const dayOfWeek = days[uploadDate.getUTCDay()]

        // 1. Store the file metadata
        const { error: uploadError } = await supabase
            .from('uploaded_files')
            .insert([
                {
                    filename: file.name,
                    file_path: `uploads/${file.name}`,
                    file_type: file.name.endsWith('.csv') ? 'csv' : 'xlsx',
                    upload_date: uploadDate.toISOString(),
                    processed: true,
                    row_count: rows.length,
                },
            ])

        if (uploadError) throw uploadError

        // 2. Upsert into revenue_data table
        // We use upsert based on date to avoid duplicate entries for the same day
        const { error: revenueError } = await supabase
            .from('revenue_data')
            .upsert({
                date: formattedDate,
                day_of_week: dayOfWeek,
                revenue: totalRevenue,
                transactions: transactionCount,
                conversion_rate: 3.2 // Default placeholder for now
            }, {
                onConflict: 'date'
            })

        if (revenueError) {
            console.error('Error upserting revenue data:', revenueError)
            // We don't throw here to ensure the file record is still considered "completed"
        }

        return NextResponse.json({
            success: true,
            filename: file.name,
            rowCount: rows.length,
            totalRevenue,
            transactionCount,
            uploadDate: uploadDate.toISOString(),
            message: 'File processed and consolidated into dashboard.',
        })
    } catch (error) {
        console.error('Upload error:', error)
        return NextResponse.json(
            { error: 'Failed to process upload' },
            { status: 500 }
        )
    }
}

export const config = {
    api: {
        bodyParser: false,
    },
}
