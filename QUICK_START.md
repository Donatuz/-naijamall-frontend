# 🚀 NaijaMall Quick Start Guide

Get your NaijaMall website up and running in 5 minutes!

## ⚡ Quick Setup (3 Steps)

### Step 1: Start Backend (2 minutes)

```bash
# Navigate to backend
cd naijamall-backend

# Install dependencies (first time only)
npm install

# Create .env file (first time only)
cp .env.example .env

# Start the backend server
npm run dev
```

**Backend will run on:** `http://localhost:5001`

### Step 2: Configure Environment (1 minute)

Edit `naijamall-backend/.env`:

```env
# Minimum required configuration
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/naijamall
JWT_SECRET=change_this_to_something_random_and_secure
FRONTEND_URL=http://localhost:5500
```

**Note:** Make sure MongoDB is running locally or use MongoDB Atlas.

### Step 3: Start Frontend (1 minute)

**Option 1 - VS Code Live Server (Recommended):**
- Install "Live Server" extension
- Right-click `index.html`
- Select "Open with Live Server"
- Site opens at `http://localhost:5500`

**Option 2 - Python:**
```bash
python -m http.server 8080
# Visit http://localhost:8080
```

**Option 3 - Node:**
```bash
npx http-server -p 8080
# Visit http://localhost:8080
```

## ✅ Verify Everything Works

1. **Check Backend:** Visit `http://localhost:5000` - should see welcome message
2. **Check Frontend:** Visit `http://localhost:5500` - should see NaijaMall website
3. **Test Features:**
   - Click "Sign Up" to create account
   - Browse products (will load from backend)
   - Add items to cart
   - View cart by clicking cart icon

## 🎯 What You Get

- ✅ **Full Authentication** - Login/Register with JWT tokens
- ✅ **Product Management** - Real products from MongoDB database
- ✅ **Shopping Cart** - Add, update, remove items
- ✅ **Order System** - Create orders with escrow protection
- ✅ **Payment Ready** - Paystack integration prepared
- ✅ **Admin Panel** - User and product management
- ✅ **Responsive Design** - Works on mobile, tablet, desktop

## 🆘 Common Issues

**Backend won't start?**
- Install Node.js from nodejs.org
- Install MongoDB or use MongoDB Atlas
- Run `npm install` in naijamall-backend folder

**Frontend not connecting?**
- Check backend is running on port 5000
- Open browser console (F12) for errors
- Verify CORS settings in backend

**Products not showing?**
- Backend must be running
- Check browser console for errors
- Add sample products via API or admin panel

## 📖 Need More Help?

See `INTEGRATION_GUIDE.md` for detailed documentation!

## 🎉 You're All Set!

Your fully integrated e-commerce platform is ready to use!
