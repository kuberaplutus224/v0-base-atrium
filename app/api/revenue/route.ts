import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
    try {
        // Fetch revenue data ordered by date
        const { data, error } = await supabase
            .from('revenue_data')
            .select('*')
            .order('date', { ascending: true })

        if (error) throw error

        return NextResponse.json({ data })
    } catch (error) {
        console.error('Error fetching revenue data:', error)
        return NextResponse.json(
            { error: 'Failed to fetch revenue data' },
            { status: 500 }
        )
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json()

        const { data, error } = await supabase
            .from('revenue_data')
            .insert([body])
            .select()

        if (error) throw error

        return NextResponse.json({ data })
    } catch (error) {
        console.error('Error inserting revenue data:', error)
        return NextResponse.json(
            { error: 'Failed to insert revenue data' },
            { status: 500 }
        )
    }
}
