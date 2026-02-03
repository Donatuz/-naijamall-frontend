# 📤 Push Both Backend & Frontend to GitHub

## 🎯 What We'll Do
1. Create 2 GitHub repositories
2. Push backend code
3. Push frontend code
4. Share both URLs with me
5. I'll deploy everything for you!

---

## Step 1: Create Backend Repository (2 minutes)

1. Go to https://github.com
2. Click **"+"** → **"New repository"**
3. **Repository name:** `naijamall-backend`
4. **Visibility:** Public (recommended)
5. ❌ **Don't** check any boxes
6. Click **"Create repository"**
7. **Keep this page open**

---

## Step 2: Push Backend Code (2 minutes)

Open PowerShell in your project root:

```powershell
# Navigate to backend
cd naijamall-backend

# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - NaijaMall backend API"

# Add remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/naijamall-backend.git

# Push
git branch -M main
git push -u origin main
```

**Replace `YOUR_USERNAME` with your actual GitHub username!**

✅ **Verify:** Go to your repository and see all files (except .env)

---

## Step 3: Create Frontend Repository (2 minutes)

1. Go to https://github.com
2. Click **"+"** → **"New repository"**
3. **Repository name:** `naijamall-frontend`
4. **Visibility:** Public (recommended)
5. ❌ **Don't** check any boxes
6. Click **"Create repository"**
7. **Keep this page open**

---

## Step 4: Push Frontend Code (2 minutes)

In PowerShell (from project root):

```powershell
# Go back to root (if in backend folder)
cd ..

# Initialize git (if not already)
git init

# Add all frontend files
git add .

# Commit
git commit -m "Initial commit - NaijaMall frontend with backend integration"

# Add remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/naijamall-frontend.git

# Push
git branch -M main
git push -u origin main
```

**Replace `YOUR_USERNAME` with your actual GitHub username!**

✅ **Verify:** Go to your repository and see all files

---

## Step 5: Share With Me

Once both are pushed, share these URLs:

1. **Backend Repository:**
   ```
   https://github.com/YOUR_USERNAME/naijamall-backend
   ```

2. **Frontend Repository:**
   ```
   https://github.com/YOUR_USERNAME/naijamall-frontend
   ```

3. **Your Netlify Site URL** (if you have it):
   ```
   https://your-site.netlify.app
   ```

---

## 🎁 What I'll Do Next

Once you share the URLs, I will:

1. ✅ Help you deploy backend to Render
2. ✅ Get your backend URL
3. ✅ Update frontend config with backend URL
4. ✅ Create Netlify deployment package
5. ✅ Give you exact instructions to update Netlify

---

## 🆘 Troubleshooting

### "Remote already exists"
```powershell
git remote remove origin
git remote add origin https://github.com/YOUR_USERNAME/repo-name.git
```

### "Permission denied"
- Use Personal Access Token instead of password
- Get token: https://github.com/settings/tokens
- Generate new token (classic)
- Check "repo" scope
- Use token as password when pushing

### "Not a git repository" (in backend)
```powershell
cd naijamall-backend
git init
```

### "Not a git repository" (in frontend/root)
```powershell
cd ..  # Go to root where index.html is
git init
```

---

## 📝 Summary Checklist

- [ ] Created backend repository on GitHub
- [ ] Pushed backend code successfully
- [ ] Created frontend repository on GitHub  
- [ ] Pushed frontend code successfully
- [ ] Shared both repository URLs
- [ ] Shared Netlify URL (if have one)

---

## ✅ Ready to Share?

After pushing both repositories, tell me:

```
✅ Backend pushed: https://github.com/YOUR_USERNAME/naijamall-backend
✅ Frontend pushed: https://github.com/YOUR_USERNAME/naijamall-frontend
✅ My Netlify URL: https://your-site.netlify.app
```

Then I'll take over and help you deploy! 🚀
