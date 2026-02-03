# 🚀 NaijaMall Deployment Instructions

## Step-by-Step Deployment Guide

---

## Part 1: Deploy Backend to Render (15 minutes)

### Step 1: Create MongoDB Atlas Database (5 minutes)

1. **Go to MongoDB Atlas:** https://www.mongodb.com/cloud/atlas
2. **Sign up/Login** (use Google for quick signup)
3. **Create a FREE Cluster:**
   - Click "Build a Database"
   - Choose FREE tier (M0)
   - Choose a region close to you
   - Click "Create"
4. **Create Database User:**
   - Go to "Database Access"
   - Click "Add New Database User"
   - Username: `naijamall`
   - Password: Generate a secure password (save it!)
   - Click "Add User"
5. **Whitelist IP Address:**
   - Go to "Network Access"
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (0.0.0.0/0)
   - Click "Confirm"
6. **Get Connection String:**
   - Go to "Database" → "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your password
   - Replace `<dbname>` with `naijamall`
   - Example: `mongodb+srv://naijamall:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/naijamall?retryWrites=true&w=majority`

### Step 2: Deploy Backend to Render (10 minutes)

1. **Go to Render:** https://render.com
2. **Sign up/Login** (use GitHub for easy integration)
3. **Create New Web Service:**
   - Click "New +" → "Web Service"
   - Choose "Build and deploy from a Git repository"
   - Click "Next"
4. **Connect Repository:**
   - Option A: **If you have GitHub repo:**
     - Connect your GitHub account
     - Select your naijamall repository
   - Option B: **If you DON'T have GitHub repo (easier):**
     - You'll need to create one first (see instructions below)

#### Quick: Create GitHub Repository

```bash
# In your naijamall-backend folder
cd naijamall-backend
git init
git add .
git commit -m "Initial backend deployment"

# Go to GitHub.com and create new repository named "naijamall-backend"
# Then run these commands (replace YOUR_USERNAME):
git remote add origin https://github.com/YOUR_USERNAME/naijamall-backend.git
git branch -M main
git push -u origin main
```

5. **Configure Web Service on Render:**
   - **Name:** `naijamall-api`
   - **Region:** Choose closest to you
   - **Branch:** `main`
   - **Root Directory:** Leave empty (or `naijamall-backend` if whole project is in repo)
   - **Environment:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Plan:** FREE

6. **Add Environment Variables:**
   Click "Advanced" → "Add Environment Variable" and add these:

   ```
   NODE_ENV = production
   PORT = 10000
   MONGODB_URI = mongodb+srv://naijamall:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/naijamall
   JWT_SECRET = naijamall_production_secret_key_2024_change_this_to_random_string
   FRONTEND_URL = https://naijamall.netlify.app
   ```

   Optional (add later when ready):
   ```
   CLOUDINARY_CLOUD_NAME = your_cloud_name
   CLOUDINARY_API_KEY = your_api_key
   CLOUDINARY_API_SECRET = your_api_secret
   PAYSTACK_SECRET_KEY = your_paystack_secret_key
   PAYSTACK_PUBLIC_KEY = your_paystack_public_key
   ```

7. **Deploy:**
   - Click "Create Web Service"
   - Wait 5-10 minutes for deployment
   - You'll get a URL like: `https://naijamall-api.onrender.com`

8. **Test Backend:**
   - Visit: `https://naijamall-api.onrender.com`
   - You should see: `{"message":"Welcome to NaijaMall API",...}`

---

## Part 2: Deploy Frontend to Netlify (5 minutes)

### Method 1: Drag & Drop (Easiest)

1. **Update API Config:**
   - I've already created `api-config.prod.js` with production settings
   - Open it and replace `https://naijamall-api.onrender.com` with YOUR actual Render URL

2. **Prepare Deployment Files:**
   - I'll create a deployment package for you
   - It will include all necessary files

3. **Deploy to Netlify:**
   - Go to https://app.netlify.com
   - Login to your account
   - Find your existing NaijaMall site
   - Click on "Deploys" tab
   - Drag and drop the deployment folder I'll create

### Method 2: Netlify CLI (Alternative)

```bash
# Install Netlify CLI (if not already installed)
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy (from root folder)
netlify deploy --prod
```

---

## Part 3: Post-Deployment Configuration

### Update Frontend API URL

After backend is deployed, update the API URL:

**In `api-config.js` (or create environment-based config):**
```javascript
const API_CONFIG = {
    BASE_URL: 'https://your-actual-render-url.onrender.com/api'
};
```

### Update Backend CORS

Your backend is already configured to accept your Netlify URL!
The CORS settings in `server.js` will work automatically.

---

## 📝 Important Notes

### Free Tier Limitations:

**Render (Backend):**
- ✅ Free tier available
- ⚠️ Sleeps after 15 minutes of inactivity
- ⚠️ First request after sleep takes 30-60 seconds to wake up
- ✅ 750 hours/month free

**MongoDB Atlas:**
- ✅ 512MB storage free
- ✅ Always on, no sleep
- ✅ Perfect for development/small production

**Netlify (Frontend):**
- ✅ 100GB bandwidth/month
- ✅ Always on
- ✅ Automatic HTTPS
- ✅ Global CDN

### Backend Wake-Up Solution:

To prevent backend from sleeping, you can:
1. Use a service like UptimeRobot (free) to ping your backend every 5 minutes
2. Upgrade to Render paid plan ($7/month)
3. Accept the 30-60 second first-load delay

---

## 🧪 Testing Your Deployed Site

### Test Checklist:

1. **Backend Health Check:**
   ```
   Visit: https://your-backend.onrender.com/api/health
   Should return: {"status":"OK",...}
   ```

2. **Frontend Loading:**
   ```
   Visit: https://naijamall.netlify.app
   Check browser console for errors
   ```

3. **Test Features:**
   - ✅ Register new account
   - ✅ Login
   - ✅ View products
   - ✅ Add to cart
   - ✅ Checkout (creates order)

4. **Check Console:**
   - Press F12
   - Check for any API errors
   - Network tab should show successful requests

---

## 🆘 Troubleshooting

### "Failed to load products"
- **Cause:** Backend not deployed or wrong URL
- **Fix:** Check backend URL in `api-config.js`

### "CORS Error"
- **Cause:** Frontend URL not in backend CORS config
- **Fix:** Add your Netlify URL to `FRONTEND_URL` env var on Render

### "MongoDB Connection Error"
- **Cause:** Wrong connection string or IP not whitelisted
- **Fix:** Check MongoDB Atlas connection string and network access

### Backend Returns 500 Error
- **Cause:** Environment variables missing
- **Fix:** Check all required env vars are set on Render

---

## 🎯 Next Steps After Deployment

1. **Add Sample Products:**
   - Use Postman or create an admin panel
   - Or use the test-api.html file

2. **Configure Cloudinary:**
   - For product image uploads
   - Get free account at cloudinary.com

3. **Configure Paystack:**
   - For payment processing
   - Get API keys from paystack.com

4. **Custom Domain (Optional):**
   - Add custom domain on Netlify
   - Update FRONTEND_URL on Render

---

## 📊 Deployment Summary

| Service | Platform | URL Format | Cost |
|---------|----------|------------|------|
| Backend API | Render | `https://naijamall-api.onrender.com` | FREE |
| Database | MongoDB Atlas | Cloud hosted | FREE |
| Frontend | Netlify | `https://naijamall.netlify.app` | FREE |

---

## ✅ Final Checklist

- [ ] MongoDB Atlas cluster created
- [ ] Database user created
- [ ] Network access configured (0.0.0.0/0)
- [ ] Backend deployed to Render
- [ ] All environment variables set
- [ ] Backend health check passes
- [ ] Frontend API URL updated
- [ ] Frontend deployed to Netlify
- [ ] Test registration works
- [ ] Test product loading works
- [ ] Test cart functionality works

---

**🎉 Congratulations! Your full-stack e-commerce platform is now live!**

Need help? Check the error messages and refer to the troubleshooting section above.
