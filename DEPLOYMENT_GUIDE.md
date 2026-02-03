# NaijaMall Deployment Guide

## 🚀 Deploy to Netlify (Recommended - FREE)

### Method 1: Drag & Drop (Easiest - 2 minutes)

1. **Visit Netlify**
   - Go to https://app.netlify.com/drop
   - No account needed for first deployment!

2. **Prepare Your Files**
   - Create a ZIP file with these files:
     - `index.html`
     - `styles.css`
     - `script.js`
     - `netlify.toml` (already created)

3. **Deploy**
   - Drag and drop the ZIP file to Netlify
   - Wait 10-30 seconds
   - Get your live URL like: `https://your-site-name.netlify.app`

4. **Optional: Custom Domain**
   - Sign up for free Netlify account
   - Go to Domain settings
   - Add your custom domain (e.g., naijamall.com)
   - Follow DNS instructions

---

### Method 2: Deploy via GitHub (Professional Way)

1. **Create GitHub Account** (if you don't have one)
   - Go to https://github.com
   - Sign up for free

2. **Create New Repository**
   - Click "New Repository"
   - Name it: `naijamall-website`
   - Make it Public
   - Don't initialize with README

3. **Upload Your Files to GitHub**
   ```powershell
   # Open PowerShell in your project folder
   cd C:\Users\DONATUS\Desktop\AtlassianCLI\naijamall
   
   # Initialize git
   git init
   git add index.html styles.css script.js netlify.toml README.md
   git commit -m "Initial NaijaMall website"
   
   # Connect to GitHub (replace YOUR_USERNAME with your GitHub username)
   git remote add origin https://github.com/YOUR_USERNAME/naijamall-website.git
   git branch -M main
   git push -u origin main
   ```

4. **Connect to Netlify**
   - Go to https://app.netlify.com
   - Sign up/Login (can use GitHub account)
   - Click "Add new site" → "Import an existing project"
   - Choose "GitHub"
   - Select your `naijamall-website` repository
   - Click "Deploy site"
   - Done! Your site is live!

5. **Automatic Updates**
   - Every time you push to GitHub, Netlify auto-deploys
   - Updates go live in seconds

---

## 🌐 Custom Domain Setup

### If you have a domain (e.g., naijamall.com):

1. **In Netlify Dashboard**
   - Go to "Domain management"
   - Click "Add custom domain"
   - Enter: `naijamall.com`

2. **Update Your Domain DNS** (at your domain registrar)
   - Add these DNS records:

   **For Apex Domain (naijamall.com):**
   ```
   Type: A Record
   Name: @
   Value: 75.2.60.5
   ```

   **For www subdomain:**
   ```
   Type: CNAME
   Name: www
   Value: your-site-name.netlify.app
   ```

3. **Enable HTTPS** (Free SSL Certificate)
   - Netlify does this automatically
   - Wait 24 hours for DNS propagation
   - Your site will have https://

---

## 📱 Alternative: Deploy to Vercel

1. Visit https://vercel.com
2. Sign up (free)
3. Click "Add New Project"
4. Drag & drop your files or connect GitHub
5. Click Deploy

---

## 💰 Cost Breakdown

**Netlify (Recommended):**
- Hosting: FREE ✅
- SSL/HTTPS: FREE ✅
- Custom Domain: FREE (but domain purchase costs $10-15/year)
- Bandwidth: 100GB/month FREE
- Build minutes: 300 minutes/month FREE

**Domain Name (Optional):**
- Buy from Namecheap, GoDaddy, or Google Domains
- Cost: $10-15/year for .com
- Cost: $5-10/year for .com.ng (Nigerian domain)

---

## 🔧 Making Updates After Deployment

### If using Drag & Drop:
1. Edit files on your computer
2. Create new ZIP
3. Drag & drop to Netlify again

### If using GitHub:
1. Edit files on your computer
2. Run these commands:
   ```powershell
   git add .
   git commit -m "Updated website"
   git push
   ```
3. Netlify auto-deploys your changes!

---

## 📞 Need Help?

**Contact:**
- Email: naijamall.contact@gmail.com
- Phone: +2348137790780

**Resources:**
- Netlify Docs: https://docs.netlify.com
- Netlify Support: https://answers.netlify.com

---

## ✅ Pre-Deployment Checklist

- [x] All images loading correctly
- [x] Contact information updated
- [x] FAQ section complete
- [x] Navigation working
- [x] Mobile responsive
- [x] No broken links
- [x] Forms working (if any)

Your site is ready to deploy! 🎉