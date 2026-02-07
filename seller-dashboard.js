// Seller Dashboard Logic
import { AuthService, ProductService } from './api-service.js';
import { API_CONFIG } from './api-config.js';

// Chart instances
let sellerRevenueChart, sellerProductsChart, sellerTopProductsChart, sellerOrderStatusChart;

// Check authentication on page load
document.addEventListener('DOMContentLoaded', async () => {
    await checkSellerAuth();
    await loadDashboardData();
    
    // Initialize charts after a delay
    setTimeout(() => {
        initSellerCharts();
        updateSellerCharts();
    }, 500);
});

// Check if user is authenticated and is a seller
async function checkSellerAuth() {
    const token = localStorage.getItem('naijamall_token') || localStorage.getItem('authToken');
    const user = JSON.parse(localStorage.getItem('naijamall_user') || localStorage.getItem('user') || '{}');

    if (!token || !user.id) {
        window.location.href = 'index.html';
        return;
    }

    // Allow admin and super_admin to view seller dashboard
    if (user.role !== 'seller' && user.role !== 'admin' && user.role !== 'super_admin') {
        showNotification('Access denied. Seller account required.', 'error');
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 2000);
        return;
    }

    // Display seller info
    document.getElementById('sellerName').textContent = user.firstName || 'Seller';
    if (user.businessName) {
        document.getElementById('businessName').textContent = user.businessName;
    }

    // Display verification status
    const verificationStatus = document.getElementById('verificationStatus');
    const status = user.verificationStatus || 'pending';
    let badgeClass = 'pending';
    let statusText = 'Verification Pending';

    if (status === 'verified') {
        badgeClass = 'verified';
        statusText = '✓ Verified Seller';
    } else if (status === 'rejected') {
        badgeClass = 'rejected';
        statusText = 'Verification Rejected';
    }

    verificationStatus.innerHTML = `<span class="verification-badge ${badgeClass}">${statusText}</span>`;

    // Show warning if not verified
    if (status !== 'verified') {
        showNotification('Your account is pending verification. You can add products but they won\'t be visible to buyers until verified.', 'warning');
    }
}

// Load dashboard data
async function loadDashboardData() {
    try {
        await loadProducts();
        // TODO: Load other stats like orders, sales, etc.
    } catch (error) {
        console.error('Error loading dashboard data:', error);
        showNotification('Error loading dashboard data', 'error');
    }
}

// Load seller's products
async function loadProducts() {
    const productsContainer = document.getElementById('productsContainer');
    
    try {
        const response = await ProductService.getMyProducts();
        
        if (response.success && response.data) {
            const products = response.data;
            
            // Update stats
            document.getElementById('totalProducts').textContent = products.length;
            const activeCount = products.filter(p => p.isAvailable).length;
            document.getElementById('activeProducts').textContent = activeCount;

            if (products.length === 0) {
                productsContainer.innerHTML = `
                    <div class="empty-state">
                        <div class="empty-state-icon">📦</div>
                        <h3>No Products Yet</h3>
                        <p>Start by adding your first product to your store!</p>
                        <button class="btn btn-primary" onclick="showAddProductModal()">Add Product</button>
                    </div>
                `;
            } else {
                productsContainer.innerHTML = '<div class="products-grid"></div>';
                const grid = productsContainer.querySelector('.products-grid');
                
                products.forEach(product => {
                    grid.appendChild(createProductCard(product));
                });
            }
        }
    } catch (error) {
        console.error('Error loading products:', error);
        productsContainer.innerHTML = `
            <div class="empty-state">
                <p style="color: #dc3545;">Error loading products. Please try again.</p>
                <button class="btn btn-secondary" onclick="window.location.reload()">Retry</button>
            </div>
        `;
    }
}

// Create product card element
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    
    const imageUrl = product.images && product.images.length > 0 
        ? product.images[0].url 
        : 'https://via.placeholder.com/280x200?text=No+Image';
    
    const stockStatus = product.stock > 0 ? `${product.stock} in stock` : 'Out of stock';
    const availabilityClass = product.isAvailable ? 'text-success' : 'text-danger';
    const availabilityText = product.isAvailable ? 'Active' : 'Inactive';
    
    card.innerHTML = `
        <img src="${imageUrl}" alt="${product.name}" class="product-image" onerror="this.src='https://via.placeholder.com/280x200?text=No+Image'">
        <div class="product-info">
            <div class="product-name">${product.name}</div>
            <div class="product-price">₦${product.price.toLocaleString()} / ${product.unit}</div>
            <div class="product-stock">${stockStatus} • <span class="${availabilityClass}">${availabilityText}</span></div>
            <div class="product-actions">
                <button class="btn-edit" onclick="editProduct('${product._id}')">Edit</button>
                <button class="btn-toggle" onclick="toggleProductAvailability('${product._id}', ${product.isAvailable})">
                    ${product.isAvailable ? 'Disable' : 'Enable'}
                </button>
                <button class="btn-delete" onclick="deleteProduct('${product._id}', '${product.name}')">Delete</button>
            </div>
        </div>
    `;
    
    return card;
}

// Show add product modal
window.showAddProductModal = () => {
    // Check verification status
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user.verificationStatus !== 'verified') {
        showNotification('Your account must be verified before adding products. Contact admin for verification.', 'warning');
        return;
    }
    
    window.location.href = 'add-product.html';
};

// Edit product
window.editProduct = (productId) => {
    window.location.href = `add-product.html?id=${productId}`;
};

// Toggle product availability
window.toggleProductAvailability = async (productId, currentStatus) => {
    try {
        const response = await ProductService.toggleAvailability(productId);
        
        if (response.success) {
            showNotification(response.message, 'success');
            await loadProducts();
        } else {
            showNotification(response.message || 'Failed to update product', 'error');
        }
    } catch (error) {
        console.error('Error toggling product:', error);
        showNotification('Error updating product status', 'error');
    }
};

// Delete product
window.deleteProduct = async (productId, productName) => {
    if (!confirm(`Are you sure you want to delete "${productName}"? This action cannot be undone.`)) {
        return;
    }
    
    try {
        const response = await ProductService.deleteProduct(productId);
        
        if (response.success) {
            showNotification('Product deleted successfully', 'success');
            await loadProducts();
        } else {
            showNotification(response.message || 'Failed to delete product', 'error');
        }
    } catch (error) {
        console.error('Error deleting product:', error);
        showNotification('Error deleting product', 'error');
    }
};

// Logout
document.getElementById('logoutBtn').addEventListener('click', (e) => {
    e.preventDefault();
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        window.location.href = 'index.html';
    }
});

// Notification system
// Initialize seller charts
function initSellerCharts() {
    const revenueCtx = document.getElementById('sellerRevenueChart')?.getContext('2d');
    if (revenueCtx) {
        sellerRevenueChart = new Chart(revenueCtx, {
            type: 'line',
            data: { labels: [], datasets: [{ label: 'Revenue (₦)', data: [], backgroundColor: 'rgba(40, 167, 69, 0.2)', borderColor: '#28a745', borderWidth: 2, fill: true, tension: 0.4 }] },
            options: { responsive: true, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true, ticks: { callback: v => '₦' + v.toLocaleString() } } } }
        });
    }
    const productsCtx = document.getElementById('sellerProductsChart')?.getContext('2d');
    if (productsCtx) {
        sellerProductsChart = new Chart(productsCtx, {
            type: 'bar',
            data: { labels: [], datasets: [{ label: 'Products Sold', data: [], backgroundColor: '#20c997', borderWidth: 1 }] },
            options: { responsive: true, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true } } }
        });
    }
    const topProductsCtx = document.getElementById('sellerTopProductsChart')?.getContext('2d');
    if (topProductsCtx) {
        sellerTopProductsChart = new Chart(topProductsCtx, {
            type: 'bar',
            data: { labels: [], datasets: [{ label: 'Units Sold', data: [], backgroundColor: '#ffc107', borderWidth: 1 }] },
            options: { responsive: true, indexAxis: 'y', plugins: { legend: { display: false } }, scales: { x: { beginAtZero: true } } }
        });
    }
    const statusCtx = document.getElementById('sellerOrderStatusChart')?.getContext('2d');
    if (statusCtx) {
        sellerOrderStatusChart = new Chart(statusCtx, {
            type: 'doughnut',
            data: { labels: [], datasets: [{ data: [], backgroundColor: ['#28a745', '#ffc107', '#17a2b8', '#dc3545', '#6c757d'] }] },
            options: { responsive: true, plugins: { legend: { display: true, position: 'bottom' } } }
        });
    }
}

window.updateSellerCharts = async () => {
    try {
        const period = document.getElementById('sellerChartPeriod')?.value || '30days';
        const token = localStorage.getItem('naijamall_token') || localStorage.getItem('authToken');
        const response = await fetch(`${API_CONFIG.BASE_URL}/seller/analytics?period=${period}`, {
            headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
        });
        if (response.ok) {
            const result = await response.json();
            if (result.success && result.data) {
                const d = result.data;
                if (sellerRevenueChart && d.revenue) { sellerRevenueChart.data.labels = d.revenue.labels; sellerRevenueChart.data.datasets[0].data = d.revenue.values; sellerRevenueChart.update(); }
                if (sellerProductsChart && d.productsSold) { sellerProductsChart.data.labels = d.productsSold.labels; sellerProductsChart.data.datasets[0].data = d.productsSold.values; sellerProductsChart.update(); }
                if (sellerTopProductsChart && d.topProducts) { sellerTopProductsChart.data.labels = d.topProducts.labels; sellerTopProductsChart.data.datasets[0].data = d.topProducts.values; sellerTopProductsChart.update(); }
                if (sellerOrderStatusChart && d.orderStatus) { sellerOrderStatusChart.data.labels = d.orderStatus.labels; sellerOrderStatusChart.data.datasets[0].data = d.orderStatus.values; sellerOrderStatusChart.update(); }
            }
        }
    } catch (error) {
        console.error('Error updating seller charts:', error);
    }
};

function showNotification(message, type = 'info') {
    const container = document.getElementById('notification-container');
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button onclick="this.parentElement.remove()">&times;</button>
    `;
    
    container.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 5000);
}

window.showNotification = showNotification;
