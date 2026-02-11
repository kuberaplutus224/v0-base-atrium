import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
    try {
        // Fetch anomaly alerts ordered by timestamp
        const { data, error } = await supabase
            .from('anomaly_alerts')
            .select('*')
            .order('timestamp', { ascending: false })
            .limit(10)

        if (error) throw error

        return NextResponse.json({ data })
    } catch (error) {
        console.error('Error fetching anomaly alerts:', error)
        return NextResponse.json(
            { error: 'Failed to fetch anomaly alerts' },
            { status: 500 }
        )
    }
}
