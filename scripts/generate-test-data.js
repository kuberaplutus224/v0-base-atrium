const fs = require('fs');
const path = require('path');

const products = [
    { name: "Latte", price: 4.50, category: "Coffee" },
    { name: "Espresso", price: 3.00, category: "Coffee" },
    { name: "Cappuccino", price: 4.00, category: "Coffee" },
    { name: "Americano", price: 3.50, category: "Coffee" },
    { name: "Oat Milk Latte", price: 5.50, category: "Coffee" },
    { name: "Croissant", price: 3.75, category: "Pastry" },
    { name: "Blueberry Muffin", price: 3.50, category: "Pastry" },
    { name: "Avocado Toast", price: 9.00, category: "Food" },
    { name: "Breakfast Sandwich", price: 8.50, category: "Food" },
    { name: "Hot Tea", price: 3.00, category: "Tea" },
];

const paymentMethods = ["Credit Card", "Digital Wallet", "Cash"];
const baseDate = new Date(2026, 1, 8); // February (0-indexed so 1 is Feb)
const testDataDir = path.join(process.cwd(), 'test-data');

if (!fs.existsSync(testDataDir)) {
    fs.mkdirSync(testDataDir, { recursive: true });
}

for (let i = 0; i < 5; i++) {
    const currentDate = new Date(baseDate);
    currentDate.setDate(baseDate.getDate() + i);

    const dateStr = currentDate.toISOString().split('T')[0];
    const filename = path.join(testDataDir, `kaapi_ledger_${dateStr.replace(/-/g, '_')}.csv`);
    const numTransactions = Math.floor(Math.random() * (300 - 100 + 1)) + 100;

    let csvContent = "Transaction ID,Date,Time,Product,Category,Qty,Price,Total,Payment Method\n";

    for (let j = 0; j < numTransactions; j++) {
        const productObj = products[Math.floor(Math.random() * products.length)];
        const qty = [1, 1, 1, 1, 2, 2, 3][Math.floor(Math.random() * 7)];
        const total = (productObj.price * qty).toFixed(2);

        const hour = Math.floor(Math.random() * (18 - 7 + 1)) + 7;
        const minute = Math.floor(Math.random() * 60);
        const timeStr = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;

        csvContent += `TXN-${dateStr.replace(/-/g, '')}-${j.toString().padStart(3, '0')},${dateStr},${timeStr},${productObj.name},${productObj.category},${qty},${productObj.price.toFixed(2)},${total},${paymentMethods[Math.floor(Math.random() * paymentMethods.length)]}\n`;
    }

    fs.writeFileSync(filename, csvContent);
    console.log(`Generated ${filename} with ${numTransactions} transactions.`);
}
