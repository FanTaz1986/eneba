# 🚀 ENEBA Store - Quick Start Guide

## ⚡ ONE COMMAND START

Just run:
```bash
npm run go
```

This will start:
- ✅ Backend API (Express) on http://localhost:5000
- ✅ Frontend (React) on http://localhost:3000
- ✅ Database (SQLite) already connected

**That's it! Everything runs together!**

---

## 📋 All Available Commands

| Command | What It Does |
|---------|-------------|
| `npm run go` | **Start EVERYTHING** (Backend + Frontend) |
| `npm run server` | Start backend only (port 5000) |
| `npm start` | Start frontend only (port 3000) |
| `npm run setup` | Initialize database (first time only) |
| `npm run build` | Build for production |

---

## 🎯 Quick Start Steps

### **First Time Setup:**
```bash
npm run setup      # Initialize database (one-time)
npm run go         # Start everything
```

### **Regular Development:**
```bash
npm run go         # That's all you need!
```

---

## 🌐 Access Points

Once `npm run go` is running, access:

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000
- **Products API:** http://localhost:5000/api/products
- **API Health:** http://localhost:5000/api/health

---

## 🔄 How It Works

When you run `npm run go`:

```
Your Terminal
    ↓
npm run go
    ↓
Runs concurrently:
    ├─ Terminal [0]: npm run server (Backend on 5000)
    └─ Terminal [1]: npm start (Frontend on 3000)
```

Both run side-by-side in the same terminal! 🎊

---

## ⚙️ Terminal Output

You'll see output from both servers:

```
[0] 🚀 Starting ENEBA API Server...
[0] ✅ ENEBA API Server running on http://localhost:5000

[1] Compiled successfully!
[1] You can now view eneba-store in the browser.
[1] Local: http://localhost:3000
```

- **[0]** = Backend (Express)
- **[1]** = Frontend (React)

---

## 🛑 How to Stop

In terminal, press:
```
Ctrl + C
```

This stops both servers.

---

## ⚡ What's Inside `npm run go`

```bash
concurrently "npm run server" "npm start"
```

This uses the `concurrently` package to run both commands at once.

---

## 💡 Pro Tips

### **Want to run separately?**
Open two terminals:

**Terminal 1:**
```bash
npm run server
```

**Terminal 2:**
```bash
npm start
```

### **Want to reinitialize database?**
```bash
npm run setup
```

### **Build for production:**
```bash
npm run build
```

---

## 🐛 Troubleshooting

### **"Port 5000 is already in use"**
```bash
# Kill the process and try again
npx kill-port 5000
npm run go
```

### **"Port 3000 is already in use"**
```bash
# Kill the process and try again
npx kill-port 3000
npm run go
```

### **API not loading products?**
1. Make sure backend is running (check `[0]` output)
2. Check database exists at `database/eneba.db`
3. Run `npm run setup` to reinitialize database

### **Database not found?**
```bash
npm run setup
npm run go
```

---

## ✨ Features Ready to Use

✅ Products loading from SQLite database  
✅ Search & category filtering  
✅ Shopping cart (Zustand state)  
✅ Toast notifications  
✅ Responsive design  
✅ Real API backend  

---

**You're all set! Just run `npm run go` and start building!** 🚀
