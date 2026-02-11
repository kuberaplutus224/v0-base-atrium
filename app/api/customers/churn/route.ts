import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
    try {
        // Fetch churn risk customers ordered by risk score
        const { data, error } = await supabase
            .from('churn_risk_customers')
            .select('*')
            .order('risk_score', { ascending: false })

        if (error) throw error

        return NextResponse.json({ data })
    } catch (error) {
        console.error('Error fetching churn risk data:', error)
        return NextResponse.json(
            { error: 'Failed to fetch churn risk data' },
            { status: 500 }
        )
    }
}
