# ENEBA Store - Database Setup Guide

## ✅ Database Setup Complete!

Your SQLite database is now integrated directly into your app folder.

---

## 📂 Project Structure

```
D:\Programavimas\eneba\
├── database/
│   ├── init.js              # Database initialization script
│   ├── connection.js        # Database connection
│   └── eneba.db            # SQLite database file (AUTO-CREATED)
│
├── server/
│   └── index.js            # Express API server
│
├── src/
│   ├── pages/
│   │   └── Shop.js         # Now fetches from API
│   └── services/
│       └── api.js          # API client (pre-configured)
│
└── package.json            # Updated with new scripts
```

---

## 🚀 How to Run Everything

### **Option 1: Run Both Servers Separately (Easiest)**

**Terminal 1 - Start Backend API:**
```bash
npm run server
```
This starts the Express server on `http://localhost:5000`

**Terminal 2 - Start Frontend:**
```bash
npm start
```
This starts React on `http://localhost:3000`

### **Option 2: Initialize Database First (Required Once)**
```bash
npm run setup
```
This creates the `eneba.db` file with 6 sample products.

### **Option 3: Run Both Together (requires concurrently)**
```bash
npm install concurrently --save-dev
npm run dev:all
```

---

## 📊 Database Details

**Database File Location:** `D:\Programavimas\eneba\database\eneba.db`

**Database Size:** ~50KB (very small!)

**Tables:**
- `products` - Product catalog (6 sample products)
- `cart_items` - Shopping cart items
- `orders` - Customer orders
- `users` - User accounts (optional)

**Sample Products in Database:**
1. Windows 11 Pro ($199.99)
2. Microsoft Office 365 ($99.99)
3. Adobe Creative Cloud ($54.99)
4. Norton 360 ($79.99)
5. Visual Studio Pro ($499.99)
6. Photoshop 2024 ($29.99)

---

## 🔄 API Endpoints (Running on localhost:5000)

### **Products**
```
GET    /api/products              # Get all products
GET    /api/products/:id          # Get single product
GET    /api/products/search?q=    # Search products
GET    /api/products/category/:   # Filter by category
```

### **Cart**
```
GET    /api/cart                  # Get cart items
POST   /api/cart                  # Add to cart
PUT    /api/cart/:product_id      # Update quantity
DELETE /api/cart/:product_id      # Remove item
DELETE /api/cart                  # Clear cart
```

### **Orders**
```
POST   /api/orders                # Create order
GET    /api/orders/:id            # Get order details
```

### **Health Check**
```
GET    /api/health                # Check if API is alive
```

---

## ✨ Features Now Working

✅ **Products from Database** - Real data from SQLite  
✅ **Dynamic Loading** - Data loads from API  
✅ **Search & Filter** - Works with database  
✅ **Shopping Cart** - Still in memory (can be saved to DB)  
✅ **Real API** - Fully functional Express backend  

---

## 🔧 NPM Scripts

```bash
npm start           # Start React (port 3000)
npm run server      # Start API (port 5000)
npm run setup       # Initialize database
npm run db:init     # Re-initialize database (fresh)
npm run build       # Build for production
npm run dev:all     # Run both together (needs concurrently)
```

---

## 📝 Example: Adding a New Product

The database is ready! You can add new products by modifying `database/init.js` or by creating an API endpoint.

**To add via database:**
1. Edit `database/init.js`
2. Add product to the `products` array
3. Run `npm run setup` to reinitialize

**To add via API (Coming next):**
```javascript
POST /api/products
{
  "name": "Product Name",
  "price": 99.99,
  "category": "Creative",
  "description": "Description",
  "image_url": "https://...",
  "rating": 4.5,
  "reviews": 100
}
```

---

## 🛠️ Troubleshooting

### **"Cannot find module 'better-sqlite3'"**
```bash
npm install
```

### **"Port 5000 already in use"**
```bash
# Kill the process using port 5000
npx kill-port 5000
npm run server
```

### **"Database is locked"**
Delete `database/eneba.db` and run:
```bash
npm run setup
```

### **"API not responding"**
- Check backend is running: `npm run server`
- Check frontend is pointing to correct URL in `.env`
- Open `http://localhost:5000/api/health`

---

## 🚀 Next Steps

1. ✅ **Database created** - Done!
2. ✅ **API running** - Done!
3. ✅ **Products loading** - Done!
4. 🔲 **Add cart persistence** - Save cart to DB
5. 🔲 **Add user authentication** - Login/register
6. 🔲 **Add payment processing** - Stripe integration
7. 🔲 **Add order history** - User orders

---

## 📚 Project Architecture

```
┌─────────────────────────────────────────┐
│         ENEBA STORE ARCHITECTURE        │
├─────────────────────────────────────────┤
│                                         │
│  FRONTEND (React)                       │
│  http://localhost:3000                  │
│  ├── Home Page                          │
│  ├── Shop (fetches from API)            │
│  └── Cart (Zustand state)               │
│           │                             │
│           │ HTTP Requests               │
│           ↓                             │
│  BACKEND (Express Node.js)              │
│  http://localhost:5000                  │
│  ├── Products Routes                    │
│  ├── Cart Routes                        │
│  └── Orders Routes                      │
│           │                             │
│           │ SQL Queries                 │
│           ↓                             │
│  DATABASE (SQLite)                      │
│  database/eneba.db                      │
│  ├── products table                     │
│  ├── cart_items table                   │
│  ├── orders table                       │
│  └── users table                        │
│                                         │
└─────────────────────────────────────────┘
```

---

## ✅ Status

🟢 **Backend:** Running on http://localhost:5000  
🟢 **Frontend:** Running on http://localhost:3000  
🟢 **Database:** SQLite initialized with 6 products  
✅ **API:** Fully functional  
✅ **Products:** Loading from database  

**Ready for testing and development!**

---

**Created:** January 18, 2026
**Database:** SQLite (eneba.db)
**API:** Express.js
**Frontend:** React 19
