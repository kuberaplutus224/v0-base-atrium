import { NextResponse } from 'next/server'
import { supabaseServer as supabase } from '@/lib/supabase-server'
import { z } from 'zod'

// Validation schema for revenue data
const RevenueDataSchema = z.object({
    date: z.string().date('Invalid date format'),
    day_of_week: z.string().min(1).max(10),
    revenue: z.number().min(0).max(1000000000), // Max 1 billion
    transactions: z.number().min(0).max(10000000),
    conversion_rate: z.number().min(0).max(100),
}).strict()

export async function GET() {
    try {
        const { data, error } = await supabase
            .from('revenue_data')
            .select('*')
            .order('date', { ascending: true })

        if (error) throw error

        return NextResponse.json({ data })
    } catch (error) {
        console.error('Error fetching revenue data')
        return NextResponse.json(
            { error: 'Failed to fetch revenue data' },
            { status: 500 }
        )
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json()

        // Validate input against schema
        const validatedData = RevenueDataSchema.parse(body)

        const { data, error } = await supabase
            .from('revenue_data')
            .insert([validatedData])
            .select()

        if (error) throw error

        return NextResponse.json({ data })
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { error: 'Invalid data format', details: error.errors },
                { status: 400 }
            )
        }
        console.error('Error inserting revenue data')
        return NextResponse.json(
            { error: 'Failed to insert revenue data' },
            { status: 500 }
        )
    }
}
