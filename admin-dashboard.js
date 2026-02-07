import { AuthService, AdminService } from './api-service.js';

// Check if user is admin or super admin
const checkAdminAccess = () => {
    const user = JSON.parse(localStorage.getItem('naijamall_user') || localStorage.getItem('user') || '{}');
    const adminRoles = ['admin', 'super_admin'];
    if (!user || !adminRoles.includes(user.role)) {
        alert('Access denied. Admin privileges required.');
        window.location.href = 'index.html';
        return false;
    }
    return true;
};

// Check if current user is super admin
const isSuperAdmin = () => {
    const user = JSON.parse(localStorage.getItem('naijamall_user') || localStorage.getItem('user') || '{}');
    return user.role === 'super_admin';
};

// Chart instances
let signupChart, transactionChart, revenueChart, rolesChart;

// Initialize dashboard
document.addEventListener('DOMContentLoaded', () => {
    if (!checkAdminAccess()) return;
    
    loadDashboardStats();
    loadOrders();
    
    // Initialize charts after a short delay to ensure DOM is ready
    setTimeout(() => {
        initializeCharts();
        updateCharts();
    }, 100);
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
    document.getElementById('analyticsTab').style.display = 'none';
    document.getElementById('shoppingListsTab').style.display = 'none';
    document.getElementById('ordersTab').style.display = 'none';
    document.getElementById('usersTab').style.display = 'none';
    document.getElementById('sellersTab').style.display = 'none';
    
    // Remove active class from all tabs
    document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
    
    // Show selected tab and activate corresponding tab button
    if (tabName === 'analytics') {
        document.getElementById('analyticsTab').style.display = 'block';
        document.querySelectorAll('.tab')[0].classList.add('active');
    } else if (tabName === 'shoppingLists') {
        document.getElementById('shoppingListsTab').style.display = 'block';
        document.querySelectorAll('.tab')[1].classList.add('active');
        loadShoppingLists();
    } else if (tabName === 'orders') {
        document.getElementById('ordersTab').style.display = 'block';
        document.querySelectorAll('.tab')[2].classList.add('active');
        loadOrders();
    } else if (tabName === 'users') {
        document.getElementById('usersTab').style.display = 'block';
        document.querySelectorAll('.tab')[3].classList.add('active');
        loadUsers();
    } else if (tabName === 'sellers') {
        document.getElementById('sellersTab').style.display = 'block';
        document.querySelectorAll('.tab')[4].classList.add('active');
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
    const statusFilter = document.getElementById('userStatusFilter').value;
    const searchQuery = document.getElementById('userSearchInput').value;
    const usersContent = document.getElementById('usersContent');
    
    usersContent.innerHTML = '<div class="loading"><i class="fas fa-spinner fa-spin"></i> Loading users...</div>';
    
    try {
        const response = await AdminService.getAllUsers(roleFilter, statusFilter, searchQuery, page);
        
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
                                <td style="white-space: nowrap;">
                                    ${isSuperAdmin() || (user.role !== 'super_admin' && user.role !== 'admin') ? `
                                        <button class="action-btn" style="background: #8b5cf6;" onclick="showRoleModal('${user._id}', '${user.role}', '${user.firstName} ${user.lastName}')">
                                            <i class="fas fa-user-tag"></i> Role
                                        </button>
                                    ` : ''}
                                    <button class="action-btn ${user.isActive ? 'cancelled' : 'assign'}" 
                                            onclick="toggleUserStatus('${user._id}', ${!user.isActive})"
                                            style="background: ${user.isActive ? '#f59e0b' : '#22c55e'}">
                                        <i class="fas fa-${user.isActive ? 'ban' : 'check'}"></i> 
                                        ${user.isActive ? 'Deactivate' : 'Activate'}
                                    </button>
                                    ${isSuperAdmin() || (user.role !== 'super_admin' && user.role !== 'admin') ? `
                                        <button class="action-btn" style="background: #ef4444;" onclick="confirmDeleteUser('${user._id}', '${user.firstName} ${user.lastName}')">
                                            <i class="fas fa-trash"></i> Delete
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

// Show role change modal
window.showRoleModal = async (userId, currentRole, userName) => {
    try {
        // Get available roles
        const response = await AdminService.getRoles();
        
        if (!response.success) {
            showNotification('Failed to load roles', 'error');
            return;
        }

        const roles = response.data;
        
        // Create modal HTML
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content" style="max-width: 500px;">
                <div class="modal-header">
                    <h2><i class="fas fa-user-tag"></i> Change User Role</h2>
                    <button class="close-btn" onclick="closeRoleModal()">&times;</button>
                </div>
                <div class="modal-body">
                    <p><strong>User:</strong> ${userName}</p>
                    <p><strong>Current Role:</strong> <span class="status-badge ${currentRole}">${currentRole}</span></p>
                    <br>
                    <label for="newRole"><strong>Select New Role:</strong></label>
                    <select id="newRole" class="form-control" style="width: 100%; padding: 10px; margin-top: 10px; border: 1px solid #ddd; border-radius: 8px;">
                        ${roles.map(role => `
                            <option value="${role.value}" ${role.value === currentRole ? 'selected' : ''}>
                                ${role.label} - ${role.description}
                            </option>
                        `).join('')}
                    </select>
                    <br><br>
                    <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; border-left: 4px solid #3b82f6;">
                        <p style="margin: 0; font-size: 14px;">
                            <i class="fas fa-info-circle"></i> <strong>Role Hierarchy:</strong>
                        </p>
                        <ul style="margin: 10px 0 0 20px; font-size: 13px; line-height: 1.8;">
                            <li><strong>Super Admin:</strong> Complete system control</li>
                            <li><strong>Admin:</strong> Full admin access</li>
                            <li><strong>Customer Service:</strong> Support staff</li>
                            <li><strong>Agent:</strong> Sales agent</li>
                            <li><strong>Seller:</strong> Merchant</li>
                            <li><strong>Rider:</strong> Delivery personnel</li>
                            <li><strong>Buyer:</strong> Regular customer</li>
                        </ul>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-secondary" onclick="closeRoleModal()">Cancel</button>
                    <button class="btn btn-primary" onclick="updateRole('${userId}')">
                        <i class="fas fa-save"></i> Update Role
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
    } catch (error) {
        console.error('Error showing role modal:', error);
        showNotification('Error loading role options', 'error');
    }
};

// Close role modal
window.closeRoleModal = () => {
    const modal = document.querySelector('.modal-overlay');
    if (modal) {
        modal.remove();
    }
};

// Update user role
window.updateRole = async (userId) => {
    const newRole = document.getElementById('newRole').value;
    
    if (!newRole) {
        showNotification('Please select a role', 'error');
        return;
    }
    
    try {
        const response = await AdminService.updateUserRole(userId, newRole);
        
        if (response.success) {
            showNotification(`User role updated successfully to ${newRole}`, 'success');
            closeRoleModal();
            loadUsers(); // Refresh users list
        } else {
            showNotification(response.message || 'Failed to update role', 'error');
        }
    } catch (error) {
        console.error('Error updating role:', error);
        showNotification(error.message || 'Error updating user role', 'error');
    }
};

// Confirm delete user
window.confirmDeleteUser = (userId, userName) => {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 450px;">
            <div class="modal-header">
                <h2><i class="fas fa-exclamation-triangle" style="color: #ef4444;"></i> Confirm Delete</h2>
                <button class="close-btn" onclick="closeDeleteModal()">&times;</button>
            </div>
            <div class="modal-body" style="text-align: center;">
                <p style="font-size: 16px; margin-bottom: 15px;">
                    Are you sure you want to delete <strong>${userName}</strong>?
                </p>
                <p style="color: #ef4444; font-size: 14px;">
                    ⚠️ This action cannot be undone. All user data will be permanently deleted.
                </p>
            </div>
            <div class="modal-footer">
                <button class="btn btn-secondary" onclick="closeDeleteModal()">Cancel</button>
                <button class="btn" style="background: #ef4444; color: white;" onclick="deleteUser('${userId}')">
                    <i class="fas fa-trash"></i> Delete User
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
};

// Close delete modal
window.closeDeleteModal = () => {
    const modal = document.querySelectorAll('.modal-overlay');
    modal.forEach(m => m.remove());
};

// Delete user
window.deleteUser = async (userId) => {
    try {
        const response = await AdminService.deleteUser(userId);
        
        if (response.success) {
            showNotification('User deleted successfully', 'success');
            closeDeleteModal();
            loadUsers();
            loadDashboardStats(); // Refresh stats
        } else {
            showNotification(response.message || 'Failed to delete user', 'error');
        }
    } catch (error) {
        console.error('Error deleting user:', error);
        showNotification(error.message || 'Error deleting user', 'error');
    }
};

// Initialize Charts
const initializeCharts = () => {
    const chartConfig = {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
            legend: {
                display: false
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    precision: 0
                }
            }
        }
    };

    // Signup Chart
    const signupCtx = document.getElementById('signupChart').getContext('2d');
    signupChart = new Chart(signupCtx, {
        type: 'bar',
        data: {
            labels: [],
            datasets: [{
                label: 'User Signups',
                data: [],
                backgroundColor: '#3b82f6',
                borderColor: '#2563eb',
                borderWidth: 1
            }]
        },
        options: chartConfig
    });

    // Transaction Chart
    const transactionCtx = document.getElementById('transactionChart').getContext('2d');
    transactionChart = new Chart(transactionCtx, {
        type: 'bar',
        data: {
            labels: [],
            datasets: [{
                label: 'Orders',
                data: [],
                backgroundColor: '#22c55e',
                borderColor: '#16a34a',
                borderWidth: 1
            }]
        },
        options: chartConfig
    });

    // Revenue Chart
    const revenueCtx = document.getElementById('revenueChart').getContext('2d');
    revenueChart = new Chart(revenueCtx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Revenue (₦)',
                data: [],
                backgroundColor: 'rgba(139, 92, 246, 0.2)',
                borderColor: '#8b5cf6',
                borderWidth: 2,
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            ...chartConfig,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return '₦' + value.toLocaleString();
                        }
                    }
                }
            }
        }
    });

    // Roles Chart (Pie)
    const rolesCtx = document.getElementById('rolesChart').getContext('2d');
    rolesChart = new Chart(rolesCtx, {
        type: 'doughnut',
        data: {
            labels: [],
            datasets: [{
                data: [],
                backgroundColor: [
                    '#3b82f6', // buyer
                    '#22c55e', // seller
                    '#f59e0b', // rider
                    '#8b5cf6', // agent
                    '#10b981', // customer_service
                    '#ef4444', // admin
                    '#6366f1'  // super_admin
                ]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom'
                }
            }
        }
    });
};

// Update Charts
window.updateCharts = async () => {
    try {
        const period = document.getElementById('chartPeriodFilter').value;
        
        // Get analytics data from backend
        const analyticsData = await AdminService.getAnalytics(period);
        
        if (analyticsData.success) {
            const data = analyticsData.data;
            
            // Update Signup Chart
            signupChart.data.labels = data.signups.labels;
            signupChart.data.datasets[0].data = data.signups.values;
            signupChart.update();
            
            // Update Transaction Chart
            transactionChart.data.labels = data.transactions.labels;
            transactionChart.data.datasets[0].data = data.transactions.values;
            transactionChart.update();
            
            // Update Revenue Chart
            revenueChart.data.labels = data.revenue.labels;
            revenueChart.data.datasets[0].data = data.revenue.values;
            revenueChart.update();
            
            // Update Roles Chart
            rolesChart.data.labels = data.roles.labels;
            rolesChart.data.datasets[0].data = data.roles.values;
            rolesChart.update();
        }
    } catch (error) {
        console.error('Error updating charts:', error);
        // Use mock data if API fails
        updateChartsWithMockData();
    }
};

// Mock data for charts (fallback)
const updateChartsWithMockData = () => {
    const period = document.getElementById('chartPeriodFilter').value;
    const days = period === '7days' ? 7 : period === '30days' ? 30 : 90;
    
    const labels = [];
    const signupData = [];
    const transactionData = [];
    const revenueData = [];
    
    for (let i = days - 1; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        labels.push(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
        signupData.push(Math.floor(Math.random() * 20) + 5);
        transactionData.push(Math.floor(Math.random() * 30) + 10);
        revenueData.push(Math.floor(Math.random() * 500000) + 100000);
    }
    
    signupChart.data.labels = labels;
    signupChart.data.datasets[0].data = signupData;
    signupChart.update();
    
    transactionChart.data.labels = labels;
    transactionChart.data.datasets[0].data = transactionData;
    transactionChart.update();
    
    revenueChart.data.labels = labels;
    revenueChart.data.datasets[0].data = revenueData;
    revenueChart.update();
    
    rolesChart.data.labels = ['Buyers', 'Sellers', 'Riders', 'Agents', 'Customer Service', 'Admins'];
    rolesChart.data.datasets[0].data = [45, 12, 8, 5, 3, 2];
    rolesChart.update();
};

// Load shopping lists
window.loadShoppingLists = async (page = 1) => {
    const statusFilter = document.getElementById('shoppingListStatusFilter').value;
    const content = document.getElementById('shoppingListsContent');
    
    content.innerHTML = '<div class="loading"><i class="fas fa-spinner fa-spin"></i> Loading shopping lists...</div>';
    
    try {
        const params = new URLSearchParams();
        if (statusFilter) params.append('status', statusFilter);
        params.append('page', page);
        
        const response = await AdminService.getShoppingLists(statusFilter, page);
        
        if (response.success && response.data.length > 0) {
            content.innerHTML = `
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Customer</th>
                            <th>Items</th>
                            <th>Status</th>
                            <th>Assigned To</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${response.data.map(list => `
                            <tr>
                                <td><strong>#${list._id.slice(-6)}</strong></td>
                                <td>
                                    ${list.buyer?.firstName || 'N/A'} ${list.buyer?.lastName || ''}<br>
                                    <small>${list.buyer?.phone || list.buyer?.email || ''}</small>
                                </td>
                                <td>${list.items?.length || 0} item(s)</td>
                                <td><span class="status-badge ${list.status}">${list.status}</span></td>
                                <td>${list.assignedTo ? `${list.assignedTo.firstName} ${list.assignedTo.lastName}` : '<span style="color: #ef4444;">Not Assigned</span>'}</td>
                                <td>${new Date(list.createdAt).toLocaleDateString()}</td>
                                <td style="white-space: nowrap;">
                                    <button class="action-btn view" onclick="viewShoppingList('${list._id}')">
                                        <i class="fas fa-eye"></i> View
                                    </button>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            `;
        } else {
            content.innerHTML = `
                <div style="text-align: center; padding: 60px 20px; color: #666;">
                    <i class="fas fa-list-ul" style="font-size: 60px; color: #ddd; margin-bottom: 20px;"></i>
                    <h3>No shopping lists found</h3>
                    <p>Customer shopping lists will appear here when submitted.</p>
                </div>
            `;
        }
    } catch (error) {
        console.error('Load shopping lists error:', error);
        content.innerHTML = `
            <div style="text-align: center; padding: 60px 20px; color: #ef4444;">
                <i class="fas fa-exclamation-triangle" style="font-size: 60px; margin-bottom: 20px;"></i>
                <h3>Error loading shopping lists</h3>
                <p>${error.message || 'Please try again later.'}</p>
            </div>
        `;
    }
};

window.viewShoppingList = async (id) => {
    alert('Shopping list details: ' + id + '\n\nThis will show full details including items, customer info, and delivery address.');
};

// Notification helper
const showNotification = (message, type = 'info') => {
    if (window.showNotification) {
        window.showNotification(message, type);
    } else {
        alert(message);
    }
};
