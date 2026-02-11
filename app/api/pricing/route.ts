import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
    try {
        // Fetch pricing recommendations
        const { data, error } = await supabase
            .from('pricing_recommendations')
            .select('*')
            .order('expected_impact', { ascending: false })

        if (error) throw error

        return NextResponse.json({ data })
    } catch (error) {
        console.error('Error fetching pricing data:', error)
        return NextResponse.json(
            { error: 'Failed to fetch pricing data' },
            { status: 500 }
        )
    }
}
