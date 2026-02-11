# Supabase Database Setup Instructions

This guide will help you set up the Supabase database for the v0-base-atrium application.

## Prerequisites

1. A Supabase account (sign up at https://supabase.com if you don't have one)
2. A Supabase project created

## Step 1: Create a Supabase Project

1. Go to https://supabase.com/dashboard
2. Click "New Project"
3. Fill in the details:
   - **Name**: v0-base-atrium (or your preferred name)
   - **Database Password**: Choose a strong password (save this!)
   - **Region**: Choose the closest region to you
4. Click "Create new project" and wait for it to initialize (~2 minutes)

## Step 2: Run the Migration Scripts

### Option A: Using Supabase SQL Editor (Recommended)

1. In your Supabase dashboard, go to **SQL Editor** (left sidebar)
2. Click **"New query"**
3. Copy the entire contents of `supabase/migrations/001_create_tables.sql`
4. Paste into the SQL Editor
5. Click **"Run"** (or press Ctrl+Enter)
6. You should see "Success. No rows returned" - this is correct!

7. Create another new query
8. Copy the entire contents of `supabase/migrations/002_seed_data.sql`
9. Paste into the SQL Editor
10. Click **"Run"**
11. You should see a table showing row counts for each table

### Option B: Using Supabase CLI (Advanced)

```bash
# Install Supabase CLI
npm install -g supabase

# Login to Supabase
supabase login

# Link to your project
supabase link --project-ref YOUR_PROJECT_REF

# Run migrations
supabase db push
```

## Step 3: Verify Tables Were Created

1. In your Supabase dashboard, go to **Table Editor** (left sidebar)
2. You should see 9 tables:
   - revenue_data
   - customer_segments
   - inventory_items
   - pricing_recommendations
   - churn_risk_customers
   - anomaly_alerts
   - attribution_channels
   - forecast_data
   - uploaded_files

3. Click on any table to verify data was seeded correctly

## Step 4: Create Storage Bucket for File Uploads

1. In your Supabase dashboard, go to **Storage** (left sidebar)
2. Click **"Create a new bucket"**
3. Enter bucket details:
   - **Name**: `uploaded-files`
   - **Public**: Toggle OFF (keep it private)
4. Click **"Create bucket"**

## Step 5: Get Your API Keys

1. In your Supabase dashboard, go to **Settings** → **API**
2. You'll need two keys:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon/public key**: A long string starting with `eyJ...`

3. Copy these values - you'll need them for the next step!

## Step 6: Configure Environment Variables

Create a `.env.local` file in your project root with:

```env
NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

Replace `your_project_url_here` and `your_anon_key_here` with the values from Step 5.

## Verification

Run this query in the SQL Editor to verify everything is set up:

```sql
SELECT 
    'revenue_data' as table_name, 
    COUNT(*) as row_count 
FROM revenue_data
UNION ALL
SELECT 'customer_segments', COUNT(*) FROM customer_segments
UNION ALL
SELECT 'inventory_items', COUNT(*) FROM inventory_items;
```

You should see row counts for each table.

## Troubleshooting

### "relation does not exist" error
- Make sure you ran `001_create_tables.sql` before `002_seed_data.sql`

### "permission denied" error
- Check that RLS policies were created correctly
- Verify you're using the correct API keys

### No data showing in tables
- Make sure `002_seed_data.sql` ran successfully
- Check for any error messages in the SQL Editor

## Next Steps

Once the database is set up, you can proceed with:
1. Installing Supabase client libraries
2. Creating API routes to fetch data
3. Building the file upload dashboard

---

**Need Help?** 
- Supabase Documentation: https://supabase.com/docs
- Supabase Discord: https://discord.supabase.com
