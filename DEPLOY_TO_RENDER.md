# 🚀 Deploy to Render - Step by Step

## 📋 Prerequisites
- ✅ Backend code pushed to GitHub
- ✅ MongoDB Atlas database created (or will create)

---

## Part 1: Create MongoDB Database (5 minutes)

### If you don't have MongoDB Atlas yet:

1. **Go to:** https://www.mongodb.com/cloud/atlas
2. **Sign up** with Google (fastest)
3. **Create Cluster:**
   - Click "Build a Database"
   - Choose **FREE** (M0)
   - Choose region closest to you
   - Click "Create"
4. **Create Database User:**
   - Go to "Database Access"
   - Click "Add New Database User"
   - Username: `naijamall`
   - Password: Click "Autogenerate Secure Password" and **COPY IT**
   - Database User Privileges: "Read and write to any database"
   - Click "Add User"
5. **Whitelist IP:**
   - Go to "Network Access"
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (0.0.0.0/0)
   - Click "Confirm"
6. **Get Connection String:**
   - Go to "Database" → Click "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - **Important:** Replace `<password>` with your actual password
   - Replace `myFirstDatabase` with `naijamall`
   
   Example result:
   ```
   mongodb+srv://naijamall:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/naijamall?retryWrites=true&w=majority
   ```
   
7. **Save this connection string!** You'll need it for Render.

---

## Part 2: Deploy Backend to Render (10 minutes)

### Step 1: Create Render Account
1. Go to https://render.com
2. Click "Get Started for Free"
3. Sign up with GitHub (recommended)
4. Authorize Render to access GitHub

### Step 2: Create Web Service
1. Click "New +" → "Web Service"
2. Click "Build and deploy from a Git repository"
3. Click "Next"
4. **Connect Repository:**
   - You should see your `naijamall-backend` repository
   - If not, click "Configure account" to give Render access
   - Click "Connect" next to your repository

### Step 3: Configure Service
Fill in these settings:

- **Name:** `naijamall-api` (or your preferred name)
- **Region:** Choose closest to you
- **Branch:** `main`
- **Root Directory:** Leave empty
- **Runtime:** `Node`
- **Build Command:** `npm install`
- **Start Command:** `npm start`
- **Plan:** `Free`

### Step 4: Add Environment Variables
Click "Advanced" → Scroll down to "Environment Variables"

Add these one by one (click "Add Environment Variable" for each):

```
Key: NODE_ENV
Value: production

Key: PORT
Value: 10000

Key: MONGODB_URI
Value: mongodb+srv://naijamall:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/naijamall

Key: JWT_SECRET
Value: naijamall_production_jwt_secret_2024_change_this_random_string

Key: FRONTEND_URL
Value: https://naijamall.netlify.app
```

**Replace:**
- `MONGODB_URI` with your actual MongoDB connection string
- `JWT_SECRET` with a random string (can be anything secure)
- `FRONTEND_URL` with your actual Netlify URL (if different)

### Step 5: Deploy
1. Click "Create Web Service"
2. Wait 5-10 minutes for deployment
3. Watch the logs for any errors
4. When you see "Live" status, copy your URL

**Your backend URL will be:** `https://naijamall-api.onrender.com` (or similar)

### Step 6: Test Backend
1. Visit: `https://your-backend.onrender.com`
2. You should see: `{"message":"Welcome to NaijaMall API",...}`
3. Test health: `https://your-backend.onrender.com/api/health`
4. Should return: `{"status":"OK",...}`

---

## ✅ Success Indicators

You'll know it worked when:
- ✅ Render shows "Live" status
- ✅ Visiting your URL shows the welcome message
- ✅ No errors in the Render logs
- ✅ MongoDB shows connection in Atlas

---

## 🆘 Troubleshooting

### "Build Failed"
- Check Render logs for specific error
- Usually missing dependencies or wrong Node version

### "MongoDB Connection Error"
- Check connection string is correct
- Verify password has no special characters (or URL-encode them)
- Confirm IP whitelist includes 0.0.0.0/0

### "Application Failed to Start"
- Check PORT is set to 10000
- Verify Start Command is `npm start`
- Check all required environment variables are set

---

## 📝 What to Share With Me After Deployment

Tell me:
1. ✅ "Backend deployed successfully"
2. Your Render URL: `https://your-backend.onrender.com`
3. Your Netlify URL: `https://your-site.netlify.app`

Then I'll help you update Netlify with the new backend URL! 🎉
