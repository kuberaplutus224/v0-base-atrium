# Supabase Integration Setup Guide

This guide will help you complete the Supabase integration for your v0-base-atrium application.

## ✅ What's Been Done

1. **Database Schema**: All 9 tables created in Supabase
2. **Data Seeded**: Dummy data migrated to database
3. **Supabase Client**: Configuration files created
4. **API Routes**: 8 API endpoints for data fetching
5. **File Upload Dashboard**: Complete upload interface at `/upload`

## 🔧 What You Need to Do

### Step 1: Install Dependencies

Run this command in your project directory:

```bash
npm install @supabase/supabase-js @supabase/ssr papaparse xlsx
```

Or if you prefer yarn:

```bash
yarn add @supabase/supabase-js @supabase/ssr papaparse xlsx
```

### Step 2: Configure Environment Variables

1. Copy `.env.local.example` to `.env.local`:
   ```bash
   cp .env.local.example .env.local
   ```

2. Open `.env.local` and add your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   ```

3. Get these values from your Supabase dashboard:
   - Go to **Settings** → **API**
   - Copy the **Project URL** and **anon/public key**

### Step 3: Restart Development Server

After adding environment variables, restart your dev server:

```bash
# Stop the current server (Ctrl+C)
# Then restart:
npm run dev
```

### Step 4: Test the Integration

1. **Visit Upload Dashboard**: Navigate to http://localhost:3001/upload
2. **Check API Routes**: Test endpoints like:
   - http://localhost:3001/api/revenue
   - http://localhost:3001/api/forecast
   - http://localhost:3001/api/customers/segments

3. **Upload a Test File**: Try uploading a CSV file with revenue data

## 📁 File Structure

```
v0-base-atrium/
├── lib/
│   └── supabase.ts              # Supabase client & types
├── app/
│   ├── api/
│   │   ├── revenue/route.ts     # Revenue data API
│   │   ├── forecast/route.ts    # Forecast data API
│   │   ├── customers/
│   │   │   ├── segments/route.ts
│   │   │   └── churn/route.ts
│   │   ├── inventory/route.ts
│   │   ├── pricing/route.ts
│   │   ├── alerts/route.ts
│   │   ├── attribution/route.ts
│   │   ├── upload/route.ts      # File upload handler
│   │   └── uploads/route.ts     # Upload history
│   └── upload/
│       └── page.tsx              # Upload dashboard page
├── components/
│   ├── file-upload.tsx           # Upload component
│   └── sidebar.tsx               # Updated with upload link
├── supabase/
│   ├── migrations/
│   │   ├── 001_create_tables.sql
│   │   └── 002_seed_data.sql
│   └── README.md
└── .env.local.example            # Environment template
```

## 🎯 Next Steps

### Update Components to Use Real Data

The components still use hardcoded data. You'll need to update them to fetch from the API routes:

**Example: Update `executive-summary.tsx`**

```typescript
'use client'

import { useState, useEffect } from 'react'
// ... other imports

export default function ExecutiveSummary() {
  const [summaryData, setSummaryData] = useState([])
  const [weekData, setWeekData] = useState([])

  useEffect(() => {
    fetchRevenueData()
  }, [])

  const fetchRevenueData = async () => {
    const response = await fetch('/api/revenue')
    const result = await response.json()
    // Transform and set data
    setWeekData(result.data)
  }

  // ... rest of component
}
```

### Components to Update

1. `stats-modal.tsx` - Fetch from `/api/revenue`
2. `executive-summary.tsx` - Fetch from `/api/revenue`
3. `predictive-revenue-forecast.tsx` - Fetch from `/api/forecast`
4. `customer-segmentation.tsx` - Fetch from `/api/customers/segments`
5. `customer-churn-risk-scoring.tsx` - Fetch from `/api/customers/churn`
6. `inventory-optimization.tsx` - Fetch from `/api/inventory`
7. `dynamic-pricing-optimization.tsx` - Fetch from `/api/pricing`
8. `anomaly-detection-alerts.tsx` - Fetch from `/api/alerts`
9. `attribution-modeling.tsx` - Fetch from `/api/attribution`

## 🐛 Troubleshooting

### "Module not found: @supabase/supabase-js"
- Run `npm install` to install dependencies

### "Invalid API key" or connection errors
- Check your `.env.local` file has correct Supabase URL and key
- Restart the dev server after adding environment variables

### No data showing in components
- Verify data exists in Supabase tables (check Supabase dashboard)
- Check browser console for API errors
- Ensure RLS policies are set correctly

### File upload not working
- Check file type is CSV or Excel
- Verify Supabase storage bucket `uploaded-files` exists
- Check API route logs for errors

## 📚 Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- [Supabase with Next.js](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)

## 🎉 You're All Set!

Once you've completed these steps, your app will be fully integrated with Supabase. You can:
- Upload CSV/Excel files via the dashboard
- View real-time data from the database
- Add new data through the API routes
- Scale your application with Supabase's backend
