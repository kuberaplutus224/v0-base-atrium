-- Supabase Database Schema for v0-base-atrium
-- Run this script in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Revenue Data Table
CREATE TABLE IF NOT EXISTS revenue_data (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    date DATE NOT NULL,
    day_of_week TEXT NOT NULL,
    revenue NUMERIC(10, 2) NOT NULL,
    transactions INTEGER NOT NULL,
    conversion_rate NUMERIC(5, 2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Customer Segments Table
CREATE TABLE IF NOT EXISTS customer_segments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    segment_name TEXT NOT NULL,
    customer_count INTEGER NOT NULL,
    revenue NUMERIC(10, 2) NOT NULL,
    growth_rate NUMERIC(5, 2) NOT NULL,
    characteristics JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Inventory Items Table
CREATE TABLE IF NOT EXISTS inventory_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_name TEXT NOT NULL,
    current_stock INTEGER NOT NULL,
    optimal_stock INTEGER NOT NULL,
    days_supply INTEGER NOT NULL,
    reorder_point INTEGER NOT NULL,
    status TEXT NOT NULL CHECK (status IN ('critical', 'low', 'good')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Pricing Recommendations Table
CREATE TABLE IF NOT EXISTS pricing_recommendations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_name TEXT NOT NULL,
    current_price NUMERIC(10, 2) NOT NULL,
    recommended_price NUMERIC(10, 2) NOT NULL,
    expected_impact NUMERIC(5, 2) NOT NULL,
    reason TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Churn Risk Customers Table
CREATE TABLE IF NOT EXISTS churn_risk_customers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    customer_name TEXT NOT NULL,
    risk_score INTEGER NOT NULL CHECK (risk_score >= 0 AND risk_score <= 100),
    reason TEXT NOT NULL,
    ltv_at_risk NUMERIC(10, 2) NOT NULL,
    last_purchase_days INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Anomaly Alerts Table
CREATE TABLE IF NOT EXISTS anomaly_alerts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    alert_type TEXT NOT NULL,
    severity TEXT NOT NULL CHECK (severity IN ('critical', 'warning', 'info')),
    message TEXT NOT NULL,
    timestamp TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. Attribution Channels Table
CREATE TABLE IF NOT EXISTS attribution_channels (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    channel_name TEXT NOT NULL,
    revenue NUMERIC(10, 2) NOT NULL,
    roi NUMERIC(10, 2) NOT NULL,
    orders INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 8. Forecast Data Table
CREATE TABLE IF NOT EXISTS forecast_data (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    date DATE NOT NULL,
    current_revenue NUMERIC(10, 2),
    forecast_revenue NUMERIC(10, 2) NOT NULL,
    lower_bound NUMERIC(10, 2) NOT NULL,
    upper_bound NUMERIC(10, 2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 9. Uploaded Files Table
CREATE TABLE IF NOT EXISTS uploaded_files (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    filename TEXT NOT NULL,
    file_path TEXT NOT NULL,
    file_type TEXT NOT NULL,
    upload_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    processed BOOLEAN DEFAULT FALSE,
    row_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_revenue_data_date ON revenue_data(date);
CREATE INDEX IF NOT EXISTS idx_forecast_data_date ON forecast_data(date);
CREATE INDEX IF NOT EXISTS idx_anomaly_alerts_timestamp ON anomaly_alerts(timestamp);
CREATE INDEX IF NOT EXISTS idx_uploaded_files_upload_date ON uploaded_files(upload_date);

-- Enable Row Level Security (RLS) - Optional but recommended
ALTER TABLE revenue_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE customer_segments ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE pricing_recommendations ENABLE ROW LEVEL SECURITY;
ALTER TABLE churn_risk_customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE anomaly_alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE attribution_channels ENABLE ROW LEVEL SECURITY;
ALTER TABLE forecast_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE uploaded_files ENABLE ROW LEVEL SECURITY;

-- Create policies to allow public read access (adjust based on your security needs)
-- For development, we'll allow all operations. In production, you should restrict these.

CREATE POLICY "Allow all operations on revenue_data" ON revenue_data FOR ALL USING (true);
CREATE POLICY "Allow all operations on customer_segments" ON customer_segments FOR ALL USING (true);
CREATE POLICY "Allow all operations on inventory_items" ON inventory_items FOR ALL USING (true);
CREATE POLICY "Allow all operations on pricing_recommendations" ON pricing_recommendations FOR ALL USING (true);
CREATE POLICY "Allow all operations on churn_risk_customers" ON churn_risk_customers FOR ALL USING (true);
CREATE POLICY "Allow all operations on anomaly_alerts" ON anomaly_alerts FOR ALL USING (true);
CREATE POLICY "Allow all operations on attribution_channels" ON attribution_channels FOR ALL USING (true);
CREATE POLICY "Allow all operations on forecast_data" ON forecast_data FOR ALL USING (true);
CREATE POLICY "Allow all operations on uploaded_files" ON uploaded_files FOR ALL USING (true);

-- Create a storage bucket for uploaded files (run this in Supabase Storage, not SQL Editor)
-- You'll need to create this manually in the Supabase dashboard under Storage
-- Bucket name: 'uploaded-files'
-- Public: false (or true if you want public access)
