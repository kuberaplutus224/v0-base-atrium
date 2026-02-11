import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
    try {
        // Fetch attribution channels
        const { data, error } = await supabase
            .from('attribution_channels')
            .select('*')
            .order('roi', { ascending: false })

        if (error) throw error

        return NextResponse.json({ data })
    } catch (error) {
        console.error('Error fetching attribution data:', error)
        return NextResponse.json(
            { error: 'Failed to fetch attribution data' },
            { status: 500 }
        )
    }
}
