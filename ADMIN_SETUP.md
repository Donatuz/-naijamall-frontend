# Admin Dashboard Setup Guide

## 🎉 Admin Dashboard is Ready!

Your admin dashboard has been successfully deployed at: **https://naijamall.netlify.app/admin-dashboard.html**

## 🔐 Creating an Admin Account

Since the backend uses MongoDB, you need to create an admin user in your database. Here are the methods:

### Method 1: Using MongoDB Compass or Atlas (Recommended)

1. **Connect to your MongoDB database** (using MongoDB Compass or Atlas web interface)

2. **Navigate to the `users` collection**

3. **Create a new document** with the following structure:

```json
{
  "firstName": "Admin",
  "lastName": "User",
  "email": "admin@naijamall.com",
  "password": "$2a$10$YOUR_HASHED_PASSWORD_HERE",
  "phone": "08012345678",
  "role": "admin",
  "isActive": true,
  "verificationStatus": "verified",
  "createdAt": "2024-02-04T00:00:00.000Z",
  "updatedAt": "2024-02-04T00:00:00.000Z"
}
```

4. **For the password**, you need to hash it. Use this online tool: https://bcrypt-generator.com/
   - Enter your desired password (e.g., "Admin@2024")
   - Select "10" rounds
   - Copy the generated hash and paste it in the `password` field

### Method 2: Register Normally and Update Role

1. **Go to**: https://naijamall.netlify.app

2. **Sign up** with your admin email (e.g., admin@naijamall.com)

3. **Connect to MongoDB** (Compass or Atlas)

4. **Find your user** in the `users` collection

5. **Edit the document** and change:
   ```json
   "role": "admin"
   ```

6. **Save** the changes

### Method 3: Using Backend API (If you have access to backend console)

You can create a script or use the backend console:

```javascript
const User = require('./models/User.model');
const bcrypt = require('bcryptjs');

async function createAdmin() {
    const hashedPassword = await bcrypt.hash('YourSecurePassword123', 10);
    
    const admin = await User.create({
        firstName: 'Admin',
        lastName: 'User',
        email: 'admin@naijamall.com',
        password: hashedPassword,
        phone: '08012345678',
        role: 'admin',
        isActive: true,
        verificationStatus: 'verified'
    });
    
    console.log('Admin created:', admin);
}

createAdmin();
```

## 📋 Admin Dashboard Features

Once logged in, customer service can:

### 1. **Dashboard Statistics**
   - Total users count
   - Total orders count
   - Active products count
   - Total revenue

### 2. **Orders Management**
   - View all orders placed on the platform
   - Filter by status (pending, processing, shipped, delivered, cancelled)
   - View customer details
   - Assign riders to orders
   - View order details

### 3. **Users Management**
   - View all registered users
   - Filter by role (buyers, sellers, riders)
   - Search users by name or email
   - Activate/deactivate user accounts

### 4. **Seller Verification**
   - View pending seller registrations
   - Approve or reject seller applications
   - See seller business information

## 🔑 Access the Dashboard

1. **Login** with your admin credentials at: https://naijamall.netlify.app

2. **After login**, you'll see "Admin Dashboard" in the user menu

3. **Click "Admin Dashboard"** to access the management panel

   OR

   **Go directly to**: https://naijamall.netlify.app/admin-dashboard.html

## 🛡️ Security Features

- ✅ **Role-based access control** - Only users with `role: "admin"` can access
- ✅ **Automatic redirect** - Non-admin users are redirected to homepage
- ✅ **Protected backend routes** - All admin API endpoints require admin role
- ✅ **JWT authentication** - Secure token-based authentication

## 📞 Workflow for Customer Service

### When a customer places an order:

1. **Login to admin dashboard**
2. **Go to "Orders Management" tab**
3. **View the order details**:
   - Customer information
   - Items ordered
   - Total amount
   - Payment status
4. **Click "Assign Rider"** to forward to delivery agent
5. **Monitor order status** as it progresses

## 🎯 Next Steps

After creating your admin account:

1. ✅ Login at https://naijamall.netlify.app
2. ✅ Access admin dashboard
3. ✅ Test viewing orders
4. ✅ Test user management
5. ✅ Test seller verification

## ❓ Troubleshooting

**"Access denied"** - Make sure your user role is set to "admin" in the database

**"Not authenticated"** - Login first at the main site before accessing admin dashboard

**Orders not showing** - Orders will appear once customers start placing them

**Statistics showing 0** - This is normal if there's no data yet

## 📧 Support

If you need help setting up the admin account, please provide:
- Your MongoDB connection string (privately)
- Or access to MongoDB Atlas dashboard
