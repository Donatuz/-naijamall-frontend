# ✅ Deployment Checklist

Use this checklist to track your deployment progress.

---

## 📋 Pre-Deployment

- [ ] Backend is working locally (`npm run dev` in naijamall-backend)
- [ ] Frontend is working locally (opened with Live Server)
- [ ] Tested registration/login locally
- [ ] Tested product loading locally
- [ ] Tested shopping cart locally

---

## 🗄️ Database Setup (MongoDB Atlas)

- [ ] Created MongoDB Atlas account
- [ ] Created FREE M0 cluster
- [ ] Created database user (username/password saved)
- [ ] Whitelisted IP address (0.0.0.0/0)
- [ ] Got connection string and saved it
- [ ] Connection string format: `mongodb+srv://username:password@cluster.mongodb.net/naijamall`

---

## 🖥️ Backend Deployment (Render)

- [ ] Created GitHub account (if needed)
- [ ] Created GitHub repository for backend
- [ ] Pushed backend code to GitHub
- [ ] Created Render account
- [ ] Connected GitHub to Render
- [ ] Created Web Service on Render
- [ ] Set build command: `npm install`
- [ ] Set start command: `npm start`
- [ ] Added environment variables:
  - [ ] `NODE_ENV=production`
  - [ ] `MONGODB_URI=<your_connection_string>`
  - [ ] `JWT_SECRET=<random_secret_key>`
  - [ ] `FRONTEND_URL=https://naijamall.netlify.app`
- [ ] Deployment completed successfully
- [ ] Got Render URL (e.g., https://naijamall-api.onrender.com)
- [ ] Tested backend: Visit `https://your-backend.onrender.com`
- [ ] Backend shows welcome message

**My Backend URL:** `_________________________________`

---

## 🌐 Frontend Configuration

- [ ] Opened `_netlify_deploy/api-config.js`
- [ ] Updated `BASE_URL` with my Render backend URL
- [ ] Saved the file
- [ ] Double-checked the URL is correct (includes /api at the end)

---

## 🚀 Frontend Deployment (Netlify)

### Option A: Drag & Drop
- [ ] Logged into Netlify (https://app.netlify.com)
- [ ] Found my existing NaijaMall site OR clicked "Add new site"
- [ ] Went to "Deploys" tab
- [ ] Dragged entire `_netlify_deploy` folder to Netlify
- [ ] Deployment completed successfully
- [ ] Got Netlify URL

### Option B: Update Existing Site
- [ ] Logged into Netlify
- [ ] Opened my existing NaijaMall site
- [ ] Went to "Deploys" tab
- [ ] Clicked "Deploy site"
- [ ] Dragged `_netlify_deploy` folder
- [ ] Deployment successful

**My Frontend URL:** `_________________________________`

---

## 🧪 Post-Deployment Testing

### Backend Tests
- [ ] Visit: `https://your-backend.onrender.com`
- [ ] Should see: Welcome message with API info
- [ ] Visit: `https://your-backend.onrender.com/api/health`
- [ ] Should see: `{"status":"OK",...}`

### Frontend Tests
- [ ] Visit: `https://your-frontend.netlify.app`
- [ ] Site loads without errors
- [ ] Open browser console (F12) - no errors
- [ ] Click "Sign Up" button - modal appears
- [ ] Try to register new account
- [ ] Registration works (or see specific error)
- [ ] Try to login with registered account
- [ ] Login works
- [ ] Products load from backend (if you added products)
- [ ] Can add items to cart
- [ ] Cart count updates
- [ ] Can view cart
- [ ] Checkout process works (creates order)

---

## 🐛 Troubleshooting Done

If you encountered issues, check which ones:

- [ ] "Failed to load products" - Fixed by updating API URL
- [ ] "CORS error" - Fixed by checking FRONTEND_URL on Render
- [ ] "MongoDB connection error" - Fixed MongoDB connection string
- [ ] "Cannot register" - Fixed by checking backend logs on Render
- [ ] Backend sleeping - Noted (normal for free tier, wakes up in 30-60s)
- [ ] Other: `_________________________________`

---

## 🎯 Optional Configurations (Do Later)

- [ ] Added Cloudinary credentials for image uploads
- [ ] Added Paystack credentials for payments
- [ ] Added custom domain to Netlify
- [ ] Updated FRONTEND_URL on Render with custom domain
- [ ] Set up UptimeRobot to prevent backend sleeping
- [ ] Added sample products to database
- [ ] Tested complete checkout flow with payment

---

## 📱 Final URLs

- **Frontend (Netlify):** `_________________________________`
- **Backend (Render):** `_________________________________`
- **Database (MongoDB Atlas):** `_________________________________`

---

## ✅ Deployment Complete!

- [ ] Both backend and frontend are live
- [ ] All tests passed
- [ ] Site is fully functional
- [ ] Users can register and login
- [ ] Products can be viewed and ordered
- [ ] Ready to share with users!

---

## 📝 Notes

Write any important notes or issues you encountered:

```
_________________________________________________________________

_________________________________________________________________

_________________________________________________________________

_________________________________________________________________
```

---

## 🎉 Congratulations!

Your full-stack NaijaMall e-commerce platform is now live!

**Share your site:** `_________________________________`

---

**Date Deployed:** `_________________________________`

**Deployed By:** `_________________________________`
