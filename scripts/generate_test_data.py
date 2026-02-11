import csv
import random
from datetime import datetime, timedelta

# Configuration
products = [
    ("Latte", 4.50, "Coffee"),
    ("Espresso", 3.00, "Coffee"),
    ("Cappuccino", 4.00, "Coffee"),
    ("Americano", 3.50, "Coffee"),
    ("Oat Milk Latte", 5.50, "Coffee"),
    ("Croissant", 3.75, "Pastry"),
    ("Blueberry Muffin", 3.50, "Pastry"),
    ("Avocado Toast", 9.00, "Food"),
    ("Breakfast Sandwich", 8.50, "Food"),
    ("Hot Tea", 3.00, "Tea"),
]

payment_methods = ["Credit Card", "Digital Wallet", "Cash"]
base_date = datetime(2026, 2, 8)

for i in range(5):
    current_date = base_date + timedelta(days=i)
    filename = f"test-data/kaapi_ledger_{current_date.strftime('%Y_%m_%d')}.csv"
    num_transactions = random.randint(100, 300)
    
    with open(filename, 'w', newline='') as f:
        writer = csv.writer(f)
        writer.writerow(["Transaction ID", "Date", "Time", "Product", "Category", "Qty", "Price", "Total", "Payment Method"])
        
        for j in range(num_transactions):
            product, price, category = random.choice(products)
            qty = random.choices([1, 2, 3], weights=[80, 15, 5])[0]
            total = round(price * qty, 2)
            
            # Spread transactions throughout the day (7 AM to 7 PM)
            hour = random.randint(7, 18)
            minute = random.randint(0, 59)
            time_str = f"{hour:02d}:{minute:02d}"
            
            writer.writerow([
                f"TXN-{current_date.strftime('%Y%m%d')}-{j:03d}",
                current_date.strftime('%Y-%m-%d'),
                time_str,
                product,
                category,
                qty,
                f"{price:.2f}",
                f"{total:.2f}",
                random.choice(payment_methods)
            ])
            
    print(f"Generated {filename} with {num_transactions} transactions.")
