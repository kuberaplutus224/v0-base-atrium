const { supabase } = require('./lib/supabase');
const fs = require('fs');
const path = require('path');
const Papa = require('papaparse');

async function verifyIntegration() {
    console.log('--- Starting Backend Verification ---');

    // 1. Simulate the aggregation logic from the API route
    const testFilePath = path.join(process.cwd(), 'test-data', 'kaapi_ledger_2026_02_08.csv');
    if (!fs.existsSync(testFilePath)) {
        console.error('Test file not found:', testFilePath);
        return;
    }

    const fileContent = fs.readFileSync(testFilePath, 'utf8');
    const parsedData = Papa.parse(fileContent, {
        header: true,
        skipEmptyLines: true,
        dynamicTyping: true
    });

    const rows = parsedData.data;
    let totalRevenue = 0;
    const transactionIds = new Set();

    rows.forEach(row => {
        const revenue = parseFloat(row['Total'] || row['total'] || 0);
        if (!isNaN(revenue)) {
            totalRevenue += revenue;
        }

        const txnId = row['Transaction ID'] || row['transaction_id'] || row['id'];
        if (txnId) {
            transactionIds.add(txnId);
        }
    });

    const transactionCount = transactionIds.size || rows.length;
    console.log(`Aggregated Test Data:`);
    console.log(`- File: ${path.basename(testFilePath)}`);
    console.log(`- Rows: ${rows.length}`);
    console.log(`- Total Revenue: $${totalRevenue.toFixed(2)}`);
    console.log(`- Transactions: ${transactionCount}`);

    // 2. Check if data exists in Supabase
    console.log('\nChecking Supabase tables...');

    try {
        const { data: revenueData, error: revError } = await supabase
            .from('revenue_data')
            .select('*')
            .eq('date', '2026-02-08');

        if (revError) {
            console.error('Error fetching from revenue_data:', revError.message);
        } else {
            console.log(`revenue_data table for 2026-02-08:`, revenueData.length > 0 ? 'Data Found ✅' : 'No Data Yet');
            if (revenueData.length > 0) {
                console.log(`- Stored Revenue: $${revenueData[0].revenue}`);
                console.log(`- Stored Transactions: ${revenueData[0].transactions}`);
            }
        }

        const { data: uploadFiles, error: upError } = await supabase
            .from('uploaded_files')
            .select('*')
            .limit(5);

        if (upError) {
            console.error('Error fetching from uploaded_files:', upError.message);
        } else {
            console.log(`uploaded_files table:`, uploadFiles.length > 0 ? `Found ${uploadFiles.length} records ✅` : 'No Records');
        }

    } catch (e) {
        console.error('Verification failed:', e.message);
    }

    console.log('\n--- Verification Complete ---');
}

verifyIntegration();
