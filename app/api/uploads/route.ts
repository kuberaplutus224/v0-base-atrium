import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
    try {
        // Fetch uploaded files history
        const { data, error } = await supabase
            .from('uploaded_files')
            .select('*')
            .order('upload_date', { ascending: false })

        if (error) throw error

        return NextResponse.json({ data })
    } catch (error) {
        console.error('Error fetching upload history:', error)
        return NextResponse.json(
            { error: 'Failed to fetch upload history' },
            { status: 500 }
        )
    }
}
