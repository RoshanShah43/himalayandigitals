# RS Bazar Admin Panel

## Access Admin Panel

Open your browser and go to:
```
http://localhost/admin.html
```

Or if running with Python:
```
http://127.0.0.1:5000/admin.html
```

## Login Credentials (Demo)

- **Username:** `admin`
- **Password:** `admin123`

---

## Admin Panel Features

### 1. **Dashboard**
   - View total products, sections, orders, and revenue
   - See recent orders
   - Quick overview of website performance

### 2. **Products Management**
   - ✅ Add new products
   - ✅ Edit existing products
   - ✅ Change prices for each package
   - ✅ Delete products
   - ✅ Add multiple packages per product
   - ✅ Assign products to sections

**How to Add/Edit Products:**
1. Click "Products" in navigation
2. Click "+ Add Product" button
3. Fill in:
   - Product Name
   - Section (Games, Subscriptions, Software, etc.)
   - Image URL
   - Description
   - Packages (JSON format)

**Package JSON Format Example:**
```json
[
  {
    "id": "ff1",
    "label": "Free Fire 25 Diamonds",
    "value": 30,
    "original": 50
  },
  {
    "id": "ff2",
    "label": "Free Fire 50 Diamonds",
    "value": 60,
    "original": 95
  }
]
```

### 3. **Sections Management**
   - ✅ Create new sections (e.g., Online Games, Subscriptions)
   - ✅ View products in each section
   - ✅ Delete sections
   - Organize products by category

### 4. **Orders Management**
   - ✅ View all customer orders
   - ✅ See order details (Game, Package, UID, Quantity, Total)
   - ✅ Clear all orders
   - Track revenue per order

### 5. **Settings**
   - ✅ Set website status (Active/Inactive)
   - ✅ Configure opening/closing hours
   - ✅ Update contact email
   - ✅ Update contact phone

---

## How to Change Prices

### For Existing Products:
1. Go to **Products** tab
2. Find the product you want to edit
3. Click the **Edit** button
4. Modify the prices in the Packages field
5. Click **Save Product**

### Price Example:
```json
{
  "id": "ff1",
  "label": "Free Fire 25 Diamonds",
  "value": 30,      // Current selling price
  "original": 50    // Original/crossed price (optional)
}
```

---

## How to Add a Product to a Section

1. **Create a Section First:**
   - Go to **Sections** tab
   - Click "+ Add Section"
   - Enter section name (e.g., "Mobile Games")

2. **Add Product:**
   - Go to **Products** tab
   - Click "+ Add Product"
   - Select the section from the dropdown
   - Fill other details
   - Click "Save Product"

---

## Data Storage

All data is stored in browser's **localStorage**:
- Products: `adminProducts`
- Sections: `adminSections`
- Orders: `gameCart`
- Settings: `adminSettings`

### Backup Your Data

To export all data:
1. Open browser console (F12)
2. Run: `exportData()`
3. A JSON file will download with all your data

### Clear Data (if needed)

In browser console:
```javascript
localStorage.clear();
```

---

## Integration with Main Website

The admin panel automatically syncs with the main website:
- Products added in admin panel appear on the home page
- Prices update automatically
- Orders are tracked in real-time
- Settings (hours, contact info) appear on the website

---

## Features Summary

✅ Full product management with pricing control
✅ Dynamic section creation and management
✅ Real-time order tracking
✅ Website settings configuration
✅ Responsive admin interface
✅ Data persistence with localStorage
✅ Multiple products and packages support
✅ Easy price modifications
✅ Order history and analytics

---

## Tips

1. **Always test prices** before deploying to production
2. **Use descriptive product names** for easy management
3. **Organize products in sections** for better UX
4. **Monitor orders regularly** for customer service
5. **Backup data weekly** using the export function

---

## Need Help?

All data is stored locally in your browser. Clear browser cache/cookies to reset if needed.

For a production setup, you would need a backend database (MySQL, MongoDB, etc.) instead of localStorage.
