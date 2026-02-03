# 📤 Push NaijaMall to GitHub - Step by Step

## 🎯 What We'll Do
1. Create GitHub repository
2. Push backend code to GitHub
3. Then I'll help you deploy to Render and update Netlify

---

## Step 1: Create GitHub Repository (2 minutes)

### Option A: Via GitHub Website (Easier)
1. Go to https://github.com
2. Click the **"+"** icon in top-right corner
3. Click **"New repository"**
4. Fill in:
   - **Repository name:** `naijamall-backend`
   - **Description:** `NaijaMall E-commerce Backend API`
   - **Visibility:** Private or Public (your choice)
   - ❌ **DO NOT** check "Add README" or "Add .gitignore"
   - Leave everything else unchecked
5. Click **"Create repository"**
6. **Keep this page open** - you'll need the commands shown

### Option B: Via GitHub CLI (If you have it)
```bash
gh repo create naijamall-backend --public --source=. --remote=origin
```

---

## Step 2: Initialize Git in Backend Folder (1 minute)

Open PowerShell/Terminal in your project root and run:

```powershell
# Navigate to backend folder
cd naijamall-backend

# Initialize git (if not already done)
git init

# Check what files will be committed
git status
```

---

## Step 3: Push Backend to GitHub (2 minutes)

Copy these commands **one by one** (replace YOUR_USERNAME with your GitHub username):

```powershell
# Add all files
git add .

# Commit with message
git commit -m "Initial commit - NaijaMall backend ready for deployment"

# Add remote (replace YOUR_USERNAME with your actual GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/naijamall-backend.git

# Rename branch to main
git branch -M main

# Push to GitHub
git push -u origin main
```

### If it asks for authentication:
- Use your GitHub username
- For password, use a **Personal Access Token** (not your actual password)
  - Get token: https://github.com/settings/tokens
  - Click "Generate new token (classic)"
  - Check "repo" scope
  - Copy the token and use it as password

---

## Step 4: Verify Upload (30 seconds)

1. Go to https://github.com/YOUR_USERNAME/naijamall-backend
2. You should see all your backend files
3. Check that `.env` is **NOT** there (it's in .gitignore)

---

## ✅ Done? Tell Me Your Repository URL!

Once you've pushed the code, share:
- Your GitHub username
- Repository URL (e.g., `https://github.com/YOUR_USERNAME/naijamall-backend`)

Then I'll give you the exact steps to:
1. Deploy to Render
2. Update your Netlify site

---

## 🆘 Common Issues

### "Permission denied"
- You need to set up SSH keys or use HTTPS with Personal Access Token
- Use HTTPS (easier): https://github.com/YOUR_USERNAME/naijamall-backend.git

### "Remote already exists"
```powershell
git remote remove origin
git remote add origin https://github.com/YOUR_USERNAME/naijamall-backend.git
```

### "Not a git repository"
```powershell
git init
```

---

## 📝 What to Share With Me

After pushing, tell me:
1. ✅ "Code pushed successfully"
2. Your repository URL: `https://github.com/YOUR_USERNAME/naijamall-backend`
3. Your Netlify site URL (if you have it)

Then I'll guide the Render deployment! 🚀
