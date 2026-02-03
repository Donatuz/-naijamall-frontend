# NaijaMall Frontend-Backend Integration Guide

## 🎉 Overview

Your NaijaMall website is now fully integrated with the backend API! This guide will help you set up and run the complete system.

## 📋 Prerequisites

Before you start, make sure you have:

- **Node.js** (v14 or higher) installed
- **MongoDB** (local installation or MongoDB Atlas account)
- **Git** (optional, for version control)

## 🚀 Quick Start

### Step 1: Backend Setup

1. **Navigate to the backend directory:**
   ```bash
   cd naijamall-backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create environment file:**
   - Copy `.env.example` to `.env`
   - Update the following variables:
   
   ```env
   # Server Configuration
   PORT=5000
   NODE_ENV=development
   
   # Database (Choose one)
   # Local MongoDB:
   MONGODB_URI=mongodb://localhost:27017/naijamall
   
   # Or MongoDB Atlas:
   # MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/naijamall
   
   # JWT Secret (Change this!)
   JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
   JWT_EXPIRE=7d
   
   # Cloudinary (Optional - for image uploads)
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   
   # Paystack (Optional - for payments)
   PAYSTACK_SECRET_KEY=your_paystack_secret_key
   PAYSTACK_PUBLIC_KEY=your_paystack_public_key
   
   # Frontend URL
   FRONTEND_URL=http://localhost:5500
   ```

4. **Start the backend server:**
   ```bash
   npm run dev
   ```
   
   The backend will run on `http://localhost:5001`

### Step 2: Frontend Setup

1. **Navigate back to the root directory:**
   ```bash
   cd ..
   ```

2. **Update API configuration (if needed):**
   - Open `api-config.js`
   - Update the `BASE_URL` if your backend is running on a different port:
   
   ```javascript
   const API_CONFIG = {
       BASE_URL: 'http://localhost:5000/api',
       TIMEOUT: 10000
   };
   ```

3. **Run the frontend:**
   
   You have several options:
   
   **Option A: Using Live Server (VS Code Extension)**
   - Install the "Live Server" extension in VS Code
   - Right-click on `index.html` and select "Open with Live Server"
   - The site will open at `http://localhost:5500`
   
   **Option B: Using Python's HTTP Server**
   ```bash
   # Python 3
   python -m http.server 8080
   
   # Then visit http://localhost:8080
   ```
   
   **Option C: Using Node's http-server**
   ```bash
   npx http-server -p 8080
   
   # Then visit http://localhost:8080
   ```

## 🔧 Key Features Integrated

### ✅ Authentication System
- **User Registration** - Create buyer or seller accounts
- **User Login** - Secure JWT-based authentication
- **Session Management** - Auto-login with stored tokens
- **User Profile** - View and update profile information

### ✅ Product Management
- **Product Listing** - Fetch and display products from backend
- **Product Filtering** - Filter by category, price, condition
- **Product Details** - View full product information
- **Seller Products** - Sellers can manage their products

### ✅ Shopping Cart
- **Add to Cart** - Add products to cart (stored locally)
- **Cart Management** - Update quantities, remove items
- **Cart Persistence** - Cart saved in localStorage
- **Cart Badge** - Real-time cart count display

### ✅ Order Processing
- **Checkout** - Create orders from cart items
- **Order Tracking** - View order status and history
- **Payment Integration** - Paystack payment gateway ready
- **Escrow Protection** - Secure payment holding system

### ✅ Category System
- **Dynamic Categories** - Categories loaded from backend
- **Category Filtering** - Browse products by category
- **Category Management** - Admin can create/edit categories

## 📁 File Structure

```
naijamall/
├── index.html              # Main HTML file (updated with auth buttons)
├── styles.css              # Original styles
├── styles-extended.css     # New styles for modals, forms, notifications
├── script.js               # Original frontend scripts
├── api-config.js           # API endpoint configuration
├── api-service.js          # API service layer (all backend calls)
├── app.js                  # Main application logic with backend integration
├── auth-modals.js          # Login/Register modal components
│
└── naijamall-backend/      # Backend API
    ├── server.js           # Main server (updated CORS)
    ├── .env               # Environment variables (create this)
    ├── controllers/       # Business logic
    ├── models/           # Database schemas
    ├── routes/           # API routes
    └── middleware/       # Auth & upload middleware
```

## 🔑 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update profile
- `POST /api/auth/logout` - Logout user

### Products
- `GET /api/products` - Get all products (with filters)
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (seller only)
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders/my-orders` - Get user's orders
- `GET /api/orders/:id` - Get single order
- `POST /api/orders/:id/confirm` - Confirm delivery
- `POST /api/orders/:id/cancel` - Cancel order

### Categories
- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create category (admin only)
- `PUT /api/categories/:id` - Update category (admin only)

### Payments
- `POST /api/payments/initialize` - Initialize payment
- `POST /api/payments/verify` - Verify payment

## 🎨 Frontend Components

### Modal System
The integration includes a complete modal system for:
- User login
- User registration
- Shopping cart
- Product details (ready to implement)

### Notification System
Toast notifications for:
- Success messages (green)
- Error messages (red)
- Info messages (blue)

### Loading States
- Global loader for API calls
- Button loading states
- Smooth transitions

## 🧪 Testing the Integration

### 1. Test User Registration
1. Open the website
2. Click "Sign Up" button
3. Fill in the registration form
4. Choose "Buyer" or "Seller" role
5. Submit the form
6. You should see a success message and be logged in

### 2. Test Product Loading
1. Products should automatically load when you visit the site
2. Check browser console for any errors
3. Products should display with images, prices, and "Add to Cart" buttons

### 3. Test Shopping Cart
1. Click "Add to Cart" on any product
2. Cart count should increase in the header
3. Click the cart icon to view cart
4. Update quantities or remove items
5. Cart persists on page refresh

### 4. Test Checkout
1. Add items to cart
2. Click "Proceed to Checkout"
3. If not logged in, you'll be prompted to login
4. If logged in, order will be created

## 🐛 Troubleshooting

### Issue: "Failed to load products"
**Solution:**
- Check if backend is running on `http://localhost:5000`
- Check browser console for CORS errors
- Verify MongoDB is connected
- Check backend logs for errors

### Issue: "Login failed" or "Registration failed"
**Solution:**
- Check network tab in browser developer tools
- Verify the API endpoint is correct
- Check if MongoDB is running
- Review backend console for error messages

### Issue: CORS Errors
**Solution:**
- Make sure frontend URL matches in backend CORS settings
- Backend now allows `localhost:5500`, `localhost:8080`, `localhost:3000`
- Add your specific port if using a different one

### Issue: Products not displaying
**Solution:**
- Open browser console (F12)
- Check for JavaScript errors
- Verify API response in Network tab
- Make sure products exist in database

### Issue: Cart not working
**Solution:**
- Check if localStorage is enabled in browser
- Clear browser cache and reload
- Check browser console for errors

## 🎯 Next Steps

### For Development:
1. **Seed Database** - Add sample products and categories
   ```bash
   cd naijamall-backend
   # Create a seed script to populate database
   ```

2. **Test All Features** - Go through each feature systematically

3. **Customize Styling** - Update colors, fonts in `styles-extended.css`

4. **Add More Features:**
   - Product reviews and ratings
   - Wishlist functionality
   - Advanced search
   - Seller dashboard
   - Admin panel

### For Production:
1. **Update Environment Variables:**
   - Use production MongoDB Atlas connection
   - Set strong JWT_SECRET
   - Configure Cloudinary for images
   - Set up Paystack for payments

2. **Deploy Backend:**
   - Heroku, Railway, Render, or DigitalOcean
   - Update `FRONTEND_URL` in `.env`

3. **Deploy Frontend:**
   - Netlify, Vercel, or GitHub Pages
   - Update `BASE_URL` in `api-config.js`

4. **Security:**
   - Enable HTTPS
   - Set NODE_ENV=production
   - Review CORS settings
   - Add rate limiting

## 📚 API Service Usage Examples

### In Your JavaScript:
```javascript
import { AuthService, ProductService, CartService } from './api-service.js';

// Login user
const loginUser = async () => {
    try {
        const response = await AuthService.login({
            email: 'user@example.com',
            password: 'password123'
        });
        console.log('Logged in:', response.user);
    } catch (error) {
        console.error('Login failed:', error.message);
    }
};

// Get products
const getProducts = async () => {
    try {
        const response = await ProductService.getProducts({
            category: 'categoryId',
            minPrice: 1000,
            maxPrice: 5000
        });
        console.log('Products:', response.products);
    } catch (error) {
        console.error('Failed to load products:', error.message);
    }
};

// Add to cart
const addToCart = (product) => {
    CartService.addToCart(product, 1);
    const count = CartService.getCartCount();
    console.log('Cart count:', count);
};
```

## 🤝 Support

If you encounter any issues:

1. Check the browser console for errors
2. Check the backend server logs
3. Review this guide carefully
4. Check MongoDB connection status
5. Verify all environment variables are set

## 🎉 Congratulations!

Your NaijaMall website is now fully integrated with a powerful backend API! You have:

- ✅ Complete user authentication system
- ✅ Product management with real database
- ✅ Shopping cart functionality
- ✅ Order processing with escrow
- ✅ Payment gateway integration ready
- ✅ Admin capabilities
- ✅ Secure API with JWT authentication

Happy coding! 🚀
