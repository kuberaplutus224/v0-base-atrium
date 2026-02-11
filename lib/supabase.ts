import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export type RevenueData = {
    id: string
    date: string
    day_of_week: string
    revenue: number
    transactions: number
    conversion_rate: number
    created_at: string
}

export type CustomerSegment = {
    id: string
    segment_name: string
    customer_count: number
    revenue: number
    growth_rate: number
    characteristics: Record<string, any>
    created_at: string
}

export type InventoryItem = {
    id: string
    product_name: string
    current_stock: number
    optimal_stock: number
    days_supply: number
    reorder_point: number
    status: 'critical' | 'low' | 'good'
    created_at: string
}

export type PricingRecommendation = {
    id: string
    product_name: string
    current_price: number
    recommended_price: number
    expected_impact: number
    reason: string
    created_at: string
}

export type ChurnRiskCustomer = {
    id: string
    customer_name: string
    risk_score: number
    reason: string
    ltv_at_risk: number
    last_purchase_days: number
    created_at: string
}

export type AnomalyAlert = {
    id: string
    alert_type: string
    severity: 'critical' | 'warning' | 'info'
    message: string
    timestamp: string
    created_at: string
}

export type AttributionChannel = {
    id: string
    channel_name: string
    revenue: number
    roi: number
    orders: number
    created_at: string
}

export type ForecastData = {
    id: string
    date: string
    current_revenue: number | null
    forecast_revenue: number
    lower_bound: number
    upper_bound: number
    created_at: string
}

export type UploadedFile = {
    id: string
    filename: string
    file_path: string
    file_type: string
    upload_date: string
    processed: boolean
    row_count: number
    created_at: string
}
