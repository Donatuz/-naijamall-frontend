# 🎯 NaijaMall Role-Based Workflow System

## Overview
Complete role-based access control (RBAC) system with staff management and order workflow capabilities.

## 🔐 User Roles & Hierarchy

### Role Levels (Highest to Lowest)
1. **Super Admin** (Level 7) - Complete system control
2. **Admin** (Level 6) - Full administrative access
3. **Customer Service** (Level 5) - Order and customer management
4. **Agent** (Level 4) - Market shopping agent
5. **Seller** (Level 3) - Product vendor
6. **Rider** (Level 2) - Delivery personnel
7. **Buyer** (Level 1) - Regular customer

## 📋 Workflow Process

### Order Flow: Customer → Customer Service → Agent → Rider → Delivered

```
1. Customer places order (status: pending)
   ↓
2. Customer Service reviews order (status: confirmed)
   ↓
3. Customer Service assigns to Agent (status: shopping)
   ↓
4. Agent shops at market (status: shopping)
   ↓
5. Agent completes shopping (status: ready_for_delivery)
   ↓
6. Rider picks up and delivers (status: out_for_delivery → delivered)
```

## 🛠️ Features Implemented

### 1. Backend API

#### New Models
- **Order Model** - Enhanced with:
  - `customerService` - CS staff assigned to order
  - `assignedAgent` - Market agent assigned
  - `assignmentHistory` - Complete assignment tracking

#### New Controllers
- **`customerService.controller.js`** - CS operations
  - View all orders
  - Assign orders to agents
  - Get available agents
  - Update order notes
  
- **`agent.controller.js`** - Agent operations
  - View assigned orders
  - Update order status
  - Complete shopping tasks
  - Track statistics

#### New Routes
- **`/api/customer-service/*`** - Customer service endpoints
- **`/api/agent/*`** - Agent endpoints

### 2. Admin Dashboard Enhancements

#### Staff Management Features
- **View All Users** - Filter by role, status, search
- **Change User Roles** - Assign/modify roles with hierarchy validation
- **Activate/Deactivate Users** - Control user access
- **Delete Users** - Remove users (with permissions check)
- **Role Hierarchy Enforcement** - Prevent privilege escalation

#### New Admin Functions
- `showRoleModal()` - Role management interface
- `confirmDeleteUser()` - Safe user deletion
- `updateUserRole()` - Role update with validation
- `getRoles()` - Fetch available roles

### 3. Customer Service Dashboard

**File:** `customer-service-dashboard.html`

#### Features
- View all customer orders
- Filter by order status
- See available agents
- Assign orders to market agents
- Add notes for agents
- Real-time statistics

#### Key Functions
- `loadOrders()` - Display customer orders
- `showAssignAgentModal()` - Agent assignment interface
- `assignAgent()` - Assign order to agent
- `loadStats()` - Display CS statistics

### 4. Agent Dashboard

**File:** `agent-dashboard.html`

#### Features
- View assigned shopping tasks
- See order details (customer info, items, address)
- Update shopping status
- Mark orders as complete
- Add shopping notes
- Track performance stats

#### Key Functions
- `loadOrders()` - Display assigned orders
- `viewOrderDetails()` - Full order information
- `showCompleteModal()` - Complete shopping interface
- `completeShopping()` - Mark task as done
- `loadStats()` - Display agent statistics

### 5. API Service Layer

**Enhanced:** `api-service.js`

#### New Services

**CustomerServiceService:**
```javascript
- getOrders(status, page)
- getMyOrders(status, page)
- getOrderDetails(orderId)
- getAvailableAgents()
- assignOrderToAgent(orderId, agentId, notes)
- updateOrderNotes(orderId, notes)
```

**AgentService:**
```javascript
- getMyAssignedOrders(status, page)
- getOrderDetails(orderId)
- updateOrderStatus(orderId, status, notes)
- completeShoppingTask(orderId, notes)
- getAgentStats()
```

**AdminService (Enhanced):**
```javascript
- getRoles()
- updateUserRole(userId, role)
- deleteUser(userId)
```

## 🚀 How to Use

### For Admins

1. **Login as Admin/Super Admin**
   - Access: `admin-dashboard.html`

2. **Manage Staff Roles**
   - Go to "Users" tab
   - Click "Role" button next to any user
   - Select new role from dropdown
   - Confirm change

3. **Delete Users**
   - Navigate to Users tab
   - Click "Delete" button (available for lower-level users only)
   - Confirm deletion

4. **Activate/Deactivate Users**
   - Click "Activate" or "Deactivate" button
   - User access will be enabled/disabled

### For Customer Service

1. **Login as Customer Service**
   - Access: `customer-service-dashboard.html`

2. **View Orders**
   - See all customer orders
   - Filter by status

3. **Assign to Agent**
   - Click "Assign Agent" on unassigned orders
   - Select available agent
   - Add notes (optional)
   - Confirm assignment

### For Agents

1. **Login as Agent**
   - Access: `agent-dashboard.html`

2. **View Assigned Tasks**
   - See orders assigned to you
   - Click "View" for full details

3. **Complete Shopping**
   - Shop for items at market
   - Click "Complete" when done
   - Add shopping notes
   - Mark as ready for delivery

## 📊 API Endpoints

### Customer Service Endpoints
```
GET    /api/customer-service/orders              - Get all orders
GET    /api/customer-service/my-orders           - Get CS assigned orders
GET    /api/customer-service/orders/:id          - Get order details
GET    /api/customer-service/agents              - Get available agents
POST   /api/customer-service/orders/:id/assign-agent  - Assign to agent
PATCH  /api/customer-service/orders/:id/notes    - Update notes
```

### Agent Endpoints
```
GET    /api/agent/orders                         - Get assigned orders
GET    /api/agent/orders/:id                     - Get order details
PATCH  /api/agent/orders/:id/status              - Update order status
POST   /api/agent/orders/:id/complete-shopping   - Complete shopping
GET    /api/agent/stats                          - Get agent stats
```

### Admin Endpoints (Enhanced)
```
GET    /api/admin/roles                          - Get available roles
PATCH  /api/admin/users/:id/role                 - Update user role
DELETE /api/admin/users/:id                      - Delete user
```

## 🔒 Security & Permissions

### Role Hierarchy Rules

1. **Super Admin** can:
   - Modify any user role
   - Delete any user (except themselves)
   - Create other super admins

2. **Admin** can:
   - Modify roles below admin level
   - Delete users below admin level
   - Cannot modify super admins

3. **Customer Service** can:
   - View all orders
   - Assign orders to agents
   - Update order notes

4. **Agent** can:
   - View assigned orders only
   - Update shopping status
   - Complete shopping tasks

### Permission Validation

- **Backend**: Middleware checks role hierarchy
- **Frontend**: UI elements hidden based on permissions
- **API**: Role-based route protection

## 🎨 Dashboard Access

| Role | Dashboard URL |
|------|--------------|
| Super Admin / Admin | `admin-dashboard.html` |
| Customer Service | `customer-service-dashboard.html` |
| Agent | `agent-dashboard.html` |
| Seller | `seller-dashboard.html` |
| Buyer | `index.html` (customer view) |

## 📝 Order Status Flow

```
pending → confirmed → shopping → ready_for_delivery → out_for_delivery → delivered
```

- **pending**: New order placed
- **confirmed**: CS reviewed and confirmed
- **shopping**: Agent is shopping at market
- **ready_for_delivery**: Items purchased, ready for rider
- **out_for_delivery**: Rider delivering
- **delivered**: Customer received

## 💾 Database Schema Updates

### Order Model Additions
```javascript
{
  customerService: ObjectId,          // CS staff assigned
  assignedAgent: ObjectId,            // Market agent assigned
  assignmentHistory: [{               // Complete assignment log
    assignedBy: ObjectId,
    assignedTo: ObjectId,
    role: String,
    timestamp: Date,
    notes: String
  }]
}
```

## 🧪 Testing the Workflow

### Step-by-Step Test

1. **Create Test Users**
   ```javascript
   // As Super Admin, create:
   - 1 Customer Service user
   - 1 Agent user
   - 1 Rider user
   ```

2. **Place Test Order**
   ```javascript
   // As Customer:
   - Add products to cart
   - Checkout and place order
   ```

3. **CS Assignment**
   ```javascript
   // As Customer Service:
   - View pending order
   - Assign to available agent
   ```

4. **Agent Shopping**
   ```javascript
   // As Agent:
   - View assigned order
   - Check items and address
   - Complete shopping task
   ```

5. **Verify Flow**
   ```javascript
   // As Admin:
   - Check order status changes
   - Verify assignment history
   ```

## 🔧 Configuration

### Environment Variables
```env
MONGODB_URI=your_mongodb_connection
JWT_SECRET=your_jwt_secret
PORT=5000
```

### CORS Configuration
Update `naijamall-backend/server.js` to allow your frontend URLs.

## 📚 Files Modified/Created

### Backend
- ✅ `models/Order.model.js` - Enhanced with assignment fields
- ✅ `controllers/customerService.controller.js` - New
- ✅ `controllers/agent.controller.js` - New
- ✅ `routes/customerService.routes.js` - New
- ✅ `routes/agent.routes.js` - New
- ✅ `server.js` - Added new routes

### Frontend
- ✅ `admin-dashboard.html` - Enhanced with role management
- ✅ `admin-dashboard.js` - Added role/delete functions
- ✅ `customer-service-dashboard.html` - New
- ✅ `agent-dashboard.html` - New
- ✅ `api-service.js` - Added CS and Agent services

## 🎯 Next Steps

1. **Deploy Backend**
   - Push to your backend hosting (Render, Railway, etc.)
   - Update environment variables

2. **Deploy Frontend**
   - Update `api-config.js` with production API URL
   - Deploy to Netlify/Vercel

3. **Create Initial Users**
   - Use super admin to create staff accounts
   - Assign appropriate roles

4. **Test Complete Workflow**
   - Place order as customer
   - Assign as CS
   - Complete as Agent
   - Deliver as Rider

## 📞 Support

For issues or questions, refer to:
- `README.md` - General documentation
- `QUICK_START.md` - Setup guide
- `INTEGRATION_GUIDE.md` - Backend integration

---

**Built with ❤️ for NaijaMall**
