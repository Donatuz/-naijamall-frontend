# ⚡ Quick Deploy Guide - NaijaMall

## 🎯 Deploy in 3 Steps (30 minutes total)

---

## Step 1: Deploy Backend (20 minutes)

### A. Create MongoDB Database (5 min)
1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up with Google (fastest)
3. Create FREE cluster (M0)
4. Create user: `naijamall` / `password123` (or your own)
5. Whitelist IP: `0.0.0.0/0` (allow all)
6. Get connection string, save it!

### B. Deploy to Render (15 min)
1. Go to https://render.com
2. Sign up with GitHub
3. Create repository on GitHub:
   ```bash
   cd naijamall-backend
   git init
   git add .
   git commit -m "Deploy backend"
   ```
   - Create repo on GitHub named `naijamall-backend`
   - Push code to GitHub
   
4. On Render:
   - New → Web Service
   - Connect GitHub repo
   - Name: `naijamall-api`
   - Build: `npm install`
   - Start: `npm start`
   - Add environment variables:
     ```
     NODE_ENV=production
     MONGODB_URI=your_mongodb_connection_string
     JWT_SECRET=your_random_secret_key_here
     FRONTEND_URL=https://naijamall.netlify.app
     ```
   - Click "Create Web Service"
   
5. Wait 5-10 minutes, get URL like: `https://naijamall-api.onrender.com`

---

## Step 2: Update Frontend Config (2 minutes)

1. Open `_netlify_deploy/api-config.js`
2. Find this line:
   ```javascript
   BASE_URL: 'https://naijamall-api.onrender.com/api',
   ```
3. Replace with YOUR Render URL
4. Save file

---

## Step 3: Deploy Frontend to Netlify (5 minutes)

### Option A: Drag & Drop (Easiest)
1. Go to https://app.netlify.com
2. Login
3. Find your site or click "Add new site"
4. **Drag the entire `_netlify_deploy` folder** onto Netlify
5. Done! 🎉

### Option B: Update Existing Site
1. Go to your existing NaijaMall site on Netlify
2. Click "Deploys" tab
3. Drag `_netlify_deploy` folder
4. Wait for deployment
5. Done! 🎉

---

## ✅ Test Your Live Site

1. Visit your Netlify URL
2. Click "Sign Up" → Create account
3. Should work! If not, check console (F12)

---

## 🆘 Quick Troubleshooting

**Products not loading?**
- Check: Did you update api-config.js with YOUR backend URL?
- Check: Is backend running? Visit `https://your-backend.onrender.com`

**Can't register/login?**
- Check: Backend deployed successfully?
- Check: MongoDB connected? (check Render logs)

**CORS error?**
- Check: FRONTEND_URL on Render matches your Netlify URL

---

## 📱 Your URLs

- **Backend:** `https://your-name.onrender.com`
- **Frontend:** `https://naijamall.netlify.app` (or your custom domain)
- **Database:** MongoDB Atlas (cloud)

---

**Need detailed help?** See `DEPLOYMENT_INSTRUCTIONS.md`

**Ready to deploy?** Start with Step 1! 🚀
