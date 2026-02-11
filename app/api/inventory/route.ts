import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
    try {
        // Fetch inventory items
        const { data, error } = await supabase
            .from('inventory_items')
            .select('*')
            .order('days_supply', { ascending: true })

        if (error) throw error

        return NextResponse.json({ data })
    } catch (error) {
        console.error('Error fetching inventory data:', error)
        return NextResponse.json(
            { error: 'Failed to fetch inventory data' },
            { status: 500 }
        )
    }
}
