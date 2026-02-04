import { AuthService, AdminService } from './api-service.js';

// Check if user is admin
const checkAdminAccess = () => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (!user || user.role !== 'admin') {
        alert('Access denied. Admin privileges required.');
        window.location.href = 'index.html';
        return false;
    }
    return true;
};

// Initialize dashboard
document.addEventListener('DOMContentLoaded', () => {
    if (!checkAdminAccess()) return;
    
    loadDashboardStats();
    loadOrders();
});

// Load dashboard statistics
const loadDashboardStats = async () => {
    try {
        const stats = await AdminService.getDashboardStats();
        
        if (stats.success) {
            const data = stats.data;
            
            // Update stats display
            document.getElementById('totalUsers').textContent = data.users.total || 0;
            document.getElementById('totalOrders').textContent = data.orders.total || 0;
            document.getElementById('totalProducts').textContent = data.products.active || 0;
            
            const revenue = data.revenue.totalRevenue || 0;
            document.getElementById('totalRevenue').textContent = `₦${revenue.toLocaleString()}`;
        }
    } catch (error) {
        console.error('Error loading dashboard stats:', error);
        showNotification('Error loading dashboard statistics', 'error');
    }
};

// Switch between tabs
window.switchTab = (tabName) => {
    // Hide all tabs
    document.getElementById('ordersTab').style.display = 'none';
    document.getElementById('usersTab').style.display = 'none';
    document.getElementById('sellersTab').style.display = 'none';
    
    // Remove active class from all tabs
    document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
    
    // Show selected tab
    if (tabName === 'orders') {
        document.getElementById('ordersTab').style.display = 'block';
        document.querySelectorAll('.tab')[0].classList.add('active');
        loadOrders();
    } else if (tabName === 'users') {
        document.getElementById('usersTab').style.display = 'block';
        document.querySelectorAll('.tab')[1].classList.add('active');
        loadUsers();
    } else if (tabName === 'sellers') {
        document.getElementById('sellersTab').style.display = 'block';
        document.querySelectorAll('.tab')[2].classList.add('active');
        loadPendingSellers();
    }
};

// Load orders
window.loadOrders = async (page = 1) => {
    const statusFilter = document.getElementById('orderStatusFilter').value;
    const ordersContent = document.getElementById('ordersContent');
    
    ordersContent.innerHTML = '<div class="loading"><i class="fas fa-spinner fa-spin"></i> Loading orders...</div>';
    
    try {
        const response = await AdminService.getAllOrders(statusFilter, page);
        
        if (response.success && response.data.length > 0) {
            ordersContent.innerHTML = `
                <table>
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Customer</th>
                            <th>Items</th>
                            <th>Total Amount</th>
                            <th>Status</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${response.data.map(order => `
                            <tr>
                                <td><strong>#${order._id.slice(-8)}</strong></td>
                                <td>
                                    ${order.buyer?.firstName || 'N/A'} ${order.buyer?.lastName || ''}<br>
                                    <small>${order.buyer?.email || ''}</small>
                                </td>
                                <td>${order.items?.length || 0} item(s)</td>
                                <td><strong>₦${order.totalAmount?.toLocaleString() || 0}</strong></td>
                                <td><span class="status-badge ${order.status}">${order.status}</span></td>
                                <td>${new Date(order.createdAt).toLocaleDateString()}</td>
                                <td>
                                    <button class="action-btn view" onclick="viewOrder('${order._id}')">
                                        <i class="fas fa-eye"></i> View
                                    </button>
                                    ${order.status === 'pending' ? `
                                        <button class="action-btn assign" onclick="assignRider('${order._id}')">
                                            <i class="fas fa-motorcycle"></i> Assign Rider
                                        </button>
                                    ` : ''}
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
                ${response.pages > 1 ? `
                    <div class="pagination">
                        ${Array.from({length: response.pages}, (_, i) => `
                            <button onclick="loadOrders(${i + 1})" class="${response.currentPage === i + 1 ? 'active' : ''}">
                                ${i + 1}
                            </button>
                        `).join('')}
                    </div>
                ` : ''}
            `;
        } else {
            ordersContent.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-shopping-cart"></i>
                    <h3>No orders found</h3>
                    <p>Orders will appear here once customers start placing them.</p>
                </div>
            `;
        }
    } catch (error) {
        console.error('Error loading orders:', error);
        ordersContent.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-exclamation-triangle"></i>
                <h3>Error loading orders</h3>
                <p>${error.message || 'Please try again later.'}</p>
            </div>
        `;
    }
};

// Load users
window.loadUsers = async (page = 1) => {
    const roleFilter = document.getElementById('userRoleFilter').value;
    const searchQuery = document.getElementById('userSearchInput').value;
    const usersContent = document.getElementById('usersContent');
    
    usersContent.innerHTML = '<div class="loading"><i class="fas fa-spinner fa-spin"></i> Loading users...</div>';
    
    try {
        const response = await AdminService.getAllUsers(roleFilter, searchQuery, page);
        
        if (response.success && response.data.length > 0) {
            usersContent.innerHTML = `
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Role</th>
                            <th>Status</th>
                            <th>Joined</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${response.data.map(user => `
                            <tr>
                                <td><strong>${user.firstName} ${user.lastName}</strong></td>
                                <td>${user.email}</td>
                                <td>${user.phone || 'N/A'}</td>
                                <td><span class="status-badge ${user.role}">${user.role}</span></td>
                                <td>
                                    <span class="status-badge ${user.isActive ? 'delivered' : 'cancelled'}">
                                        ${user.isActive ? 'Active' : 'Inactive'}
                                    </span>
                                </td>
                                <td>${new Date(user.createdAt).toLocaleDateString()}</td>
                                <td>
                                    <button class="action-btn ${user.isActive ? 'cancelled' : 'assign'}" 
                                            onclick="toggleUserStatus('${user._id}', ${!user.isActive})"
                                            style="background: ${user.isActive ? '#ef4444' : '#22c55e'}">
                                        <i class="fas fa-${user.isActive ? 'ban' : 'check'}"></i> 
                                        ${user.isActive ? 'Deactivate' : 'Activate'}
                                    </button>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
                ${response.pages > 1 ? `
                    <div class="pagination">
                        ${Array.from({length: response.pages}, (_, i) => `
                            <button onclick="loadUsers(${i + 1})" class="${response.currentPage === i + 1 ? 'active' : ''}">
                                ${i + 1}
                            </button>
                        `).join('')}
                    </div>
                ` : ''}
            `;
        } else {
            usersContent.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-users"></i>
                    <h3>No users found</h3>
                    <p>Users will appear here once they register.</p>
                </div>
            `;
        }
    } catch (error) {
        console.error('Error loading users:', error);
        usersContent.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-exclamation-triangle"></i>
                <h3>Error loading users</h3>
                <p>${error.message || 'Please try again later.'}</p>
            </div>
        `;
    }
};

// Load pending sellers
const loadPendingSellers = async () => {
    const sellersContent = document.getElementById('sellersContent');
    sellersContent.innerHTML = '<div class="loading"><i class="fas fa-spinner fa-spin"></i> Loading sellers...</div>';
    
    try {
        const response = await AdminService.getAllUsers('seller', '', 1);
        
        const pendingSellers = response.data.filter(seller => seller.verificationStatus === 'pending');
        
        if (pendingSellers.length > 0) {
            sellersContent.innerHTML = `
                <table>
                    <thead>
                        <tr>
                            <th>Business Name</th>
                            <th>Owner</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Joined</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${pendingSellers.map(seller => `
                            <tr>
                                <td><strong>${seller.businessName || 'N/A'}</strong></td>
                                <td>${seller.firstName} ${seller.lastName}</td>
                                <td>${seller.email}</td>
                                <td>${seller.phone || 'N/A'}</td>
                                <td>${new Date(seller.createdAt).toLocaleDateString()}</td>
                                <td>
                                    <button class="action-btn assign" onclick="verifySeller('${seller._id}', 'verified')">
                                        <i class="fas fa-check"></i> Approve
                                    </button>
                                    <button class="action-btn" style="background: #ef4444;" onclick="verifySeller('${seller._id}', 'rejected')">
                                        <i class="fas fa-times"></i> Reject
                                    </button>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            `;
        } else {
            sellersContent.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-store"></i>
                    <h3>No pending sellers</h3>
                    <p>All seller verification requests have been processed.</p>
                </div>
            `;
        }
    } catch (error) {
        console.error('Error loading sellers:', error);
        sellersContent.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-exclamation-triangle"></i>
                <h3>Error loading sellers</h3>
                <p>${error.message || 'Please try again later.'}</p>
            </div>
        `;
    }
};

// View order details
window.viewOrder = (orderId) => {
    // TODO: Implement order details modal or navigate to order details page
    alert(`View order details for: ${orderId}\n\nThis feature will show detailed order information including:\n- Customer details\n- Items ordered\n- Payment status\n- Delivery status\n- Timeline`);
};

// Assign rider to order
window.assignRider = async (orderId) => {
    // TODO: Implement rider assignment modal
    alert(`Assign rider to order: ${orderId}\n\nThis feature will allow you to:\n- Select an available rider\n- Assign the order for delivery\n- Notify the rider`);
};

// Toggle user status
window.toggleUserStatus = async (userId, activate) => {
    if (!confirm(`Are you sure you want to ${activate ? 'activate' : 'deactivate'} this user?`)) {
        return;
    }
    
    try {
        const response = await AdminService.updateUserStatus(userId, activate);
        
        if (response.success) {
            showNotification(`User ${activate ? 'activated' : 'deactivated'} successfully`, 'success');
            loadUsers();
        } else {
            showNotification(response.message || 'Failed to update user status', 'error');
        }
    } catch (error) {
        console.error('Error updating user status:', error);
        showNotification('Error updating user status', 'error');
    }
};

// Verify seller
window.verifySeller = async (sellerId, status) => {
    const action = status === 'verified' ? 'approve' : 'reject';
    
    if (!confirm(`Are you sure you want to ${action} this seller?`)) {
        return;
    }
    
    try {
        const response = await AdminService.verifySeller(sellerId, status);
        
        if (response.success) {
            showNotification(`Seller ${status} successfully`, 'success');
            loadPendingSellers();
            loadDashboardStats(); // Refresh stats
        } else {
            showNotification(response.message || 'Failed to verify seller', 'error');
        }
    } catch (error) {
        console.error('Error verifying seller:', error);
        showNotification('Error verifying seller', 'error');
    }
};

// Debounce search
let searchTimeout;
window.debounceSearch = () => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
        loadUsers();
    }, 500);
};

// Notification helper
const showNotification = (message, type = 'info') => {
    if (window.showNotification) {
        window.showNotification(message, type);
    } else {
        alert(message);
    }
};
