const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Manually parse .env.local
const envPath = path.join(__dirname, '../.env.local');
const envFile = fs.readFileSync(envPath, 'utf8');
const env = {};
envFile.split('\n').forEach(line => {
    const [key, value] = line.split('=');
    if (key && value) env[key.trim()] = value.trim();
});

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase credentials in .env.local');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function reseed() {
    console.log('--- Starting Kaapi Brand Re-seeding ---');

    // Tables to clear and re-seed
    const tables = [
        'customer_segments',
        'churn_risk_customers',
        'inventory_items',
        'pricing_recommendations',
        'anomaly_alerts',
        'attribution_channels'
    ];

    for (const table of tables) {
        console.log(`Clearing table: ${table}...`);
        const { error: delError } = await supabase.from(table).delete().neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all
        if (delError) console.error(`Error clearing ${table}:`, delError);
    }

    // 1. Customer Segments
    console.log('Inserting Customer Segments...');
    const { error: segError } = await supabase
        .from('customer_segments')
        .insert([
            { segment_name: 'Loyal Commuters', customer_count: 12, revenue: 15200.00, growth_rate: 18.0, characteristics: { visit_frequency: "Daily", top_pick: "Latte", preferences: "Oat Milk" } },
            { segment_name: 'Corporate Catering', customer_count: 48, revenue: 28600.00, growth_rate: 34.0, characteristics: { visit_frequency: "Weekly", top_pick: "Bulk Brew", preferences: "Whole Bean" } },
            { segment_name: 'Weekend Explorers', customer_count: 340, revenue: 8400.00, growth_rate: -8.0, characteristics: { visit_frequency: "Monthly", top_pick: "Pour Over", preferences: "Manual Brew" } },
            { segment_name: 'Laptop Nomads', customer_count: 85, revenue: 12300.00, growth_rate: 45.0, characteristics: { visit_frequency: "Daily", top_pick: "Cold Brew", preferences: "Fast WiFi" } }
        ]);
    if (segError) console.error('Error inserting segments:', segError);

    // 2. Churn Risk
    console.log('Inserting Churn Risk Customers...');
    const { error: churnError } = await supabase
        .from('churn_risk_customers')
        .insert([
            { customer_name: 'Jordan S.', risk_score: 92, reason: 'Morning routine lapse, 45 days since last espresso', ltv_at_risk: 450.00, last_purchase_days: 45 },
            { customer_name: 'Alex P.', risk_score: 78, reason: 'Subscription pause, shifted to work-from-home model', ltv_at_risk: 182.00, last_purchase_days: 28 },
            { customer_name: 'Riverside Office', risk_score: 65, reason: 'Competitive proximity, new micro-roastery opened nearby', ltv_at_risk: 3210.00, last_purchase_days: 21 },
            { customer_name: 'Casey M.', risk_score: 88, reason: 'App usage drop, loyalty reward redemption stalled', ltv_at_risk: 89.00, last_purchase_days: 35 }
        ]);
    if (churnError) console.error('Error inserting churn risk:', churnError);

    // 3. Inventory
    console.log('Inserting Inventory Health...');
    const { error: invError } = await supabase
        .from('inventory_items')
        .insert([
            { product_name: 'Kaapi Heritage Beans', current_stock: 45, optimal_stock: 120, days_supply: 8, reorder_point: 60, status: 'critical' },
            { product_name: 'Barista Oat Milk', current_stock: 230, optimal_stock: 200, days_supply: 28, reorder_point: 100, status: 'good' },
            { product_name: 'Single Origin Ethiopia', current_stock: 85, optimal_stock: 150, days_supply: 15, reorder_point: 75, status: 'low' },
            { product_name: 'Biodegradable Cups', current_stock: 340, optimal_stock: 250, days_supply: 42, reorder_point: 125, status: 'good' },
            { product_name: 'Artisan Croissants', current_stock: 22, optimal_stock: 100, days_supply: 5, reorder_point: 50, status: 'critical' }
        ]);
    if (invError) console.error('Error inserting inventory:', invError);

    // 4. Pricing Recommendations
    console.log('Inserting Pricing Recommendations...');
    const { error: priceError } = await supabase
        .from('pricing_recommendations')
        .insert([
            { product_name: 'Kaapi Heritage Beans', current_price: 18.99, recommended_price: 21.99, expected_impact: 8.4, reason: 'High recurring demand. Inventory turnover exceeds 70%/month.' },
            { product_name: 'Barista Oat Milk', current_price: 5.99, recommended_price: 5.49, expected_impact: 12.1, reason: 'Price sensitive segment indicator. Surplus inventory reduction.' },
            { product_name: 'Single Origin Ethiopia', current_price: 24.99, recommended_price: 25.99, expected_impact: 5.2, reason: 'Niche exclusivity. Market supports premium specialty increase.' },
            { product_name: 'Artisan Croissants', current_price: 4.50, recommended_price: 4.25, expected_impact: -3.5, reason: 'Slow morning movement. Tactical reduction to clear same-day stock.' }
        ]);
    if (priceError) console.error('Error inserting pricing:', priceError);

    // 5. Attribution Channels
    console.log('Inserting Attribution Channels...');
    const { error: attrError } = await supabase
        .from('attribution_channels')
        .insert([
            { channel_name: 'Walk-in', revenue: 28400.00, roi: 450.0, orders: 342 },
            { channel_name: 'Newsletter', revenue: 24200.00, roi: 850.0, orders: 289 },
            { channel_name: 'Instagram', revenue: 18600.00, roi: 320.0, orders: 215 },
            { channel_name: 'Word of Mouth', revenue: 16200.00, roi: 1200.0, orders: 178 },
            { channel_name: 'Local SEO', revenue: 14500.00, roi: 280.0, orders: 156 }
        ]);
    if (attrError) console.error('Error inserting attribution:', attrError);

    // 6. Anomaly Alerts
    console.log('Inserting Anomaly Alerts...');
    const { error: alertError } = await supabase
        .from('anomaly_alerts')
        .insert([
            { alert_type: 'Midnight Rush Spike', severity: 'critical', message: 'Unusual night-time volume detected (+340% vs historic average)', timestamp: new Date(Date.now() - 2 * 3600000).toISOString() },
            { alert_type: 'Morning Conversion Dip', severity: 'warning', message: 'Checkout conversion rate dropped 15% during peak 8AM window', timestamp: new Date(Date.now() - 3600000).toISOString() },
            { alert_type: 'Heritage Bean Alert', severity: 'info', message: 'Heritage Beans below reorder threshold. Auto-replenish triggered.', timestamp: new Date(Date.now() - 1800000).toISOString() }
        ]);
    if (alertError) console.error('Error inserting alerts:', alertError);

    console.log('--- Reseeding Complete ---');
}

reseed();
