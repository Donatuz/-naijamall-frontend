# 🚀 Deploy Your Backend to Render - Step by Step

## Your Repositories:
- **Backend:** https://github.com/Donatuz/-naijamall-backend
- **Frontend:** https://github.com/Donatuz/-naijamall-frontend
- **Netlify:** https://sparkly-truffle-d5b8e9.netlify.app/

---

## 📋 Before Deploying Backend

### STEP 1: Create MongoDB Database (5 minutes)

If you haven't created MongoDB Atlas yet:

1. **Go to:** https://www.mongodb.com/cloud/atlas
2. **Sign up** with Google (fastest way)
3. **Create FREE Cluster:**
   - Click "Build a Database"
   - Choose **FREE** (M0 Sandbox)
   - Choose your region
   - Click "Create"
4. **Wait 3-5 minutes** for cluster creation

5. **Create Database User:**
   - Go to "Database Access" (left sidebar)
   - Click "Add New Database User"
   - Username: `naijamall`
   - Password: Click "Autogenerate Secure Password"
   - **📝 COPY AND SAVE THIS PASSWORD!**
   - Click "Add User"

6. **Whitelist All IPs:**
   - Go to "Network Access" (left sidebar)
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere"
   - Confirm `0.0.0.0/0` is shown
   - Click "Confirm"

7. **Get Connection String:**
   - Go to "Database" → Click "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - It looks like: `mongodb+srv://naijamall:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority`
   - **Replace `<password>` with your actual password**
   - **Add `/naijamall` before the `?`**
   
   Final format should be:
   ```
   mongodb+srv://naijamall:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/naijamall?retryWrites=true&w=majority
   ```

8. **📝 SAVE THIS CONNECTION STRING!** You'll need it for Render.

---

## 🚀 STEP 2: Deploy to Render (10 minutes)

### 2.1 Create Render Account
1. Go to https://render.com
2. Click "Get Started for Free"
3. Sign up with **GitHub** (easiest)
4. Authorize Render to access GitHub

### 2.2 Create Web Service
1. On Render Dashboard, click **"New +"**
2. Select **"Web Service"**
3. Click **"Build and deploy from a Git repository"**
4. Click **"Next"**

### 2.3 Connect Your Repository
1. You should see your repositories listed
2. Find: **`-naijamall-backend`**
3. Click **"Connect"**
   - If you don't see it, click "Configure account" and give Render access

### 2.4 Configure Your Service

Fill in these settings exactly:

**Basic Settings:**
- **Name:** `naijamall-api` (or any name you prefer)
- **Region:** Choose closest to you (e.g., Oregon, Frankfurt, Singapore)
- **Branch:** `main`
- **Root Directory:** Leave **empty**
- **Runtime:** `Node`

**Build & Deploy:**
- **Build Command:** `npm install`
- **Start Command:** `npm start`

**Plan:**
- Select **"Free"** (should be selected by default)

### 2.5 Add Environment Variables (IMPORTANT!)

Scroll down to **"Environment Variables"** section.

Click **"Add Environment Variable"** and add these **5 variables**:

**Variable 1:**
```
Key: NODE_ENV
Value: production
```

**Variable 2:**
```
Key: PORT
Value: 10000
```

**Variable 3:**
```
Key: MONGODB_URI
Value: [YOUR MONGODB CONNECTION STRING FROM STEP 1]
```
⚠️ **Replace with your actual MongoDB connection string!**

**Variable 4:**
```
Key: JWT_SECRET
Value: naijamall_production_secret_2024_random_change_this
```
💡 You can change this to any random string for extra security

**Variable 5:**
```
Key: FRONTEND_URL
Value: https://sparkly-truffle-d5b8e9.netlify.app
```

### 2.6 Deploy!
1. Click **"Create Web Service"** button at the bottom
2. Wait for deployment (5-10 minutes)
3. Watch the logs - you'll see:
   - Installing dependencies
   - Building
   - Starting server
   - ✅ "MongoDB Connected"
   - ✅ "NaijaMall API Server running on port 10000"

### 2.7 Get Your Backend URL
Once deployment is complete:
1. Look at the top of the page
2. You'll see your URL: `https://naijamall-api.onrender.com` (or similar)
3. **📝 COPY THIS URL!**

### 2.8 Test Your Backend
1. Click on your backend URL or visit it in browser
2. You should see:
   ```json
   {
     "message": "Welcome to NaijaMall API",
     "version": "1.0.0"
   }
   ```
3. Test health check: Add `/api/health` to your URL
   - Should show: `{"status":"OK",...}`

---

## ✅ Success Checklist

- [ ] MongoDB cluster created
- [ ] Database user created
- [ ] Network access configured (0.0.0.0/0)
- [ ] Connection string obtained and saved
- [ ] Render account created
- [ ] Repository connected to Render
- [ ] All 5 environment variables added
- [ ] Deployment completed successfully
- [ ] Backend URL shows welcome message
- [ ] Backend URL copied and saved

---

## 📝 Share Your Backend URL With Me

Once your backend is deployed and working, tell me:

```
✅ Backend deployed: https://YOUR-BACKEND.onrender.com
```

Then I'll:
1. Update your frontend to use this backend URL
2. Create a new Netlify deployment package
3. Give you a folder to drag-and-drop to Netlify
4. Your full-stack site will be live! 🎉

---

## 🆘 Troubleshooting

### "Build failed"
- Check Render logs for specific error
- Make sure repository has `package.json`
- Verify `npm install` command

### "MongoDB Connection Error"
- Double-check connection string format
- Verify password is correct (no spaces)
- Confirm `0.0.0.0/0` is whitelisted in MongoDB Atlas
- Make sure database name is `naijamall`

### "Application failed to start"
- Check all 5 environment variables are set
- Verify PORT is set to `10000`
- Check Start Command is `npm start`

### "Cannot find module"
- Check that all dependencies are in `package.json`
- Try redeploying

---

## 💡 Important Notes

⚠️ **Free Tier Sleep:**
- Your backend will sleep after 15 minutes of inactivity
- First request after sleep takes 30-60 seconds to wake up
- This is normal for free tier!

✅ **After First Request:**
- Backend stays fast and responsive
- Perfect for development and low-traffic sites

---

**Start with STEP 1 (MongoDB) and work through to deployment!**

**When backend is live, share the URL and I'll finish the frontend deployment!** 🚀
