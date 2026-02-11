import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
    try {
        // Fetch forecast data ordered by date
        const { data, error } = await supabase
            .from('forecast_data')
            .select('*')
            .order('date', { ascending: true })

        if (error) throw error

        return NextResponse.json({ data })
    } catch (error) {
        console.error('Error fetching forecast data:', error)
        return NextResponse.json(
            { error: 'Failed to fetch forecast data' },
            { status: 500 }
        )
    }
}
