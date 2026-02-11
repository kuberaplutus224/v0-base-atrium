-- Seed Data for v0-base-atrium
-- Run this script AFTER running 001_create_tables.sql
-- This populates the database with the dummy data currently in the app

-- 1. Seed Revenue Data (from stats-modal.tsx and executive-summary.tsx)
INSERT INTO revenue_data (date, day_of_week, revenue, transactions, conversion_rate) VALUES
('2026-02-03', 'Mon', 2400.00, 30, 2.8),
('2026-02-04', 'Tue', 2210.00, 35, 3.1),
('2026-02-05', 'Wed', 2290.00, 28, 2.9),
('2026-02-06', 'Thu', 2000.00, 32, 3.2),
('2026-02-07', 'Fri', 2181.00, 45, 3.5),
('2026-02-08', 'Sat', 2500.00, 50, 3.8),
('2026-02-09', 'Sun', 2100.00, 48, 3.6);

-- Additional week data from executive-summary
INSERT INTO revenue_data (date, day_of_week, revenue, transactions, conversion_rate) VALUES
('2026-02-10', 'Mon', 12450.00, 38, 3.2),
('2026-02-11', 'Tue', 11200.00, 35, 3.0),
('2026-02-12', 'Wed', 13890.00, 42, 3.4),
('2026-02-13', 'Thu', 14230.00, 45, 3.5),
('2026-02-14', 'Fri', 16450.00, 52, 3.8),
('2026-02-15', 'Sat', 18200.00, 58, 4.0),
('2026-02-16', 'Sun', 15600.00, 50, 3.7);

-- 2. Seed Forecast Data (from predictive-revenue-forecast.tsx)
INSERT INTO forecast_data (date, current_revenue, forecast_revenue, lower_bound, upper_bound) VALUES
('2026-02-10', 12450.00, 12300.00, 11800.00, 13100.00),
('2026-02-11', 11200.00, 11800.00, 11100.00, 12500.00),
('2026-02-12', 13890.00, 13500.00, 12800.00, 14200.00),
('2026-02-13', 14230.00, 14100.00, 13400.00, 14800.00),
('2026-02-14', 16450.00, 15800.00, 15000.00, 16600.00),
('2026-02-15', 18200.00, 17500.00, 16700.00, 18300.00),
('2026-02-16', 15600.00, 16200.00, 15400.00, 17000.00);

-- 3. Seed Customer Segments (from customer-segmentation.tsx)
INSERT INTO customer_segments (segment_name, customer_count, revenue, growth_rate, characteristics) VALUES
('Loyal Commuters', 12, 15200.00, 18.0, '{"visit_frequency": "Daily", "top_pick": "Latte", "preferences": "Oat Milk"}'),
('Corporate Catering', 48, 28600.00, 34.0, '{"visit_frequency": "Weekly", "top_pick": "Bulk Brew", "preferences": "Whole Bean"}'),
('Weekend Explorers', 340, 8400.00, -8.0, '{"visit_frequency": "Monthly", "top_pick": "Pour Over", "preferences": "Manual Brew"}'),
('Laptop Nomads', 85, 12300.00, 45.0, '{"visit_frequency": "Daily", "top_pick": "Cold Brew", "preferences": "Fast WiFi"}');

-- 4. Seed Churn Risk Customers (from customer-churn-risk-scoring.tsx)
INSERT INTO churn_risk_customers (customer_name, risk_score, reason, ltv_at_risk, last_purchase_days) VALUES
('Jordan S.', 92, 'Morning routine lapse, 45 days since last espresso', 450.00, 45),
('Alex P.', 78, 'Subscription pause, shifted to work-from-home model', 182.00, 28),
('Riverside Office', 65, 'Competitive proximity, new micro-roastery opened nearby', 3210.00, 21),
('Casey M.', 88, 'App usage drop, loyalty reward redemption stalled', 89.00, 35);

-- 5. Seed Inventory Items (from inventory-optimization.tsx)
INSERT INTO inventory_items (product_name, current_stock, optimal_stock, days_supply, reorder_point, status) VALUES
('Kaapi Heritage Beans', 45, 120, 8, 60, 'critical'),
('Barista Oat Milk', 230, 200, 28, 100, 'good'),
('Single Origin Ethiopia', 85, 150, 15, 75, 'low'),
('Biodegradable Cups', 340, 250, 42, 125, 'good'),
('Artisan Croissants', 22, 100, 5, 50, 'critical');

-- 6. Seed Pricing Recommendations (from dynamic-pricing-optimization.tsx)
INSERT INTO pricing_recommendations (product_name, current_price, recommended_price, expected_impact, reason) VALUES
('Kaapi Heritage Beans', 18.99, 21.99, 8.4, 'High recurring demand. Inventory turnover exceeds 70%/month.'),
('Barista Oat Milk', 5.99, 5.49, 12.1, 'Price sensitive segment indicator. Surplus inventory reduction.'),
('Single Origin Ethiopia', 24.99, 25.99, 5.2, 'Niche exclusivity. Market supports premium specialty increase.'),
('Artisan Croissants', 4.50, 4.25, -3.5, 'Slow morning movement. Tactical reduction to clear same-day stock.');

-- 7. Seed Attribution Channels (from attribution-modeling.tsx)
INSERT INTO attribution_channels (channel_name, revenue, roi, orders) VALUES
('Walk-in', 28400.00, 450.0, 342),
('Newsletter', 24200.00, 850.0, 289),
('Instagram', 18600.00, 320.0, 215),
('Word of Mouth', 16200.00, 1200.0, 178),
('Local SEO', 14500.00, 280.0, 156),
('Organic', 22100.00, 0.0, 267);

-- 8. Seed Anomaly Alerts (from anomaly-detection-alerts.tsx)
INSERT INTO anomaly_alerts (alert_type, severity, message, timestamp) VALUES
('Midnight Rush Spike', 'critical', 'Unusual night-time volume detected (+340% vs historic average)', NOW() - INTERVAL '2 hours'),
('Morning Conversion Dip', 'warning', 'Checkout conversion rate dropped 15% during peak 8AM window', NOW() - INTERVAL '1 hour'),
('Heritage Bean Alert', 'info', 'Heritage Beans below reorder threshold. Auto-replenish triggered.', NOW() - INTERVAL '30 minutes'),
('WiFi Bot Activity', 'critical', 'Unusual network-triggered traffic detected on customer portal', NOW() - INTERVAL '15 minutes'),
('POS Gateway Timeout', 'critical', 'Payment processor latency increased 5x', NOW() - INTERVAL '45 minutes');

-- 9. Create sample uploaded files record
INSERT INTO uploaded_files (filename, file_path, file_type, processed, row_count) VALUES
('01-05-2026_ledger.csv', 'uploads/01-05-2026_ledger.csv', 'csv', true, 248),
('sample_revenue_data.xlsx', 'uploads/sample_revenue_data.xlsx', 'xlsx', true, 150);

-- Verify data insertion
SELECT 'Revenue Data' as table_name, COUNT(*) as row_count FROM revenue_data
UNION ALL
SELECT 'Forecast Data', COUNT(*) FROM forecast_data
UNION ALL
SELECT 'Customer Segments', COUNT(*) FROM customer_segments
UNION ALL
SELECT 'Churn Risk Customers', COUNT(*) FROM churn_risk_customers
UNION ALL
SELECT 'Inventory Items', COUNT(*) FROM inventory_items
UNION ALL
SELECT 'Pricing Recommendations', COUNT(*) FROM pricing_recommendations
UNION ALL
SELECT 'Attribution Channels', COUNT(*) FROM attribution_channels
UNION ALL
SELECT 'Anomaly Alerts', COUNT(*) FROM anomaly_alerts
UNION ALL
SELECT 'Uploaded Files', COUNT(*) FROM uploaded_files;
