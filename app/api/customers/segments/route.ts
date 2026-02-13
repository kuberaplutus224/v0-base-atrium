import { NextResponse } from 'next/server'
import { supabaseServer as supabase } from '@/lib/supabase-server'

export async function GET() {
    try {
        // Fetch customer segments
        const { data, error } = await supabase
            .from('customer_segments')
            .select('*')
            .order('revenue', { ascending: false })

        if (error) throw error

        return NextResponse.json({ data })
    } catch (error) {
        console.error('Error fetching customer segments:')
        return NextResponse.json(
            { error: 'Failed to fetch customer segments' },
            { status: 500 }
        )
    }
}
