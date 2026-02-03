NaijaMall - Netlify Deployment Package
========================================

BEFORE DEPLOYING:
1. Deploy your backend first (see DEPLOYMENT_INSTRUCTIONS.md in parent folder)
2. Get your Render backend URL (e.g., https://naijamall-api.onrender.com)
3. Open api-config.js in this folder
4. Replace 'https://naijamall-api.onrender.com' with YOUR actual backend URL

HOW TO DEPLOY TO NETLIFY:
1. Go to https://app.netlify.com
2. Login to your account
3. Find your existing NaijaMall site (or create new site)
4. Go to "Deploys" tab
5. Drag and drop this entire "_netlify_deploy" folder
6. Wait for deployment to complete
7. Visit your site!

IMPORTANT:
- Make sure backend is deployed FIRST
- Update the API URL in api-config.js before deploying
- Test the site after deployment

Your site will have all the new features:
✓ User authentication (login/register)
✓ Real products from database
✓ Shopping cart
✓ Order processing
✓ Payment integration (when configured)
