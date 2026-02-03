// Main Application Logic with Backend Integration
import {
    AuthService,
    ProductService,
    CategoryService,
    OrderService,
    PaymentService,
    CartService
} from './api-service.js';

// State Management
const AppState = {
    user: null,
    products: [],
    categories: [],
    cart: [],
    isLoading: false
};

// DOM Elements
const elements = {
    cartCount: document.querySelector('.cart-count'),
    productsGrid: document.querySelector('.products-grid'),
    categoriesGrid: document.querySelector('.categories-grid'),
    loginBtn: document.querySelector('#loginBtn'),
    registerBtn: document.querySelector('#registerBtn'),
    logoutBtn: document.querySelector('#logoutBtn'),
    userProfile: document.querySelector('#userProfile')
};

// Initialize Application
const initApp = async () => {
    try {
        showLoader();
        
        // Check if user is authenticated
        if (AuthService.isAuthenticated()) {
            try {
                const userData = await AuthService.getMe();
                AppState.user = userData.user;
                updateUIForAuthenticatedUser();
            } catch (error) {
                console.error('Failed to get user data:', error);
                AuthService.logout();
            }
        }

        // Load initial data
        await Promise.all([
            loadProducts(),
            loadCategories(),
            loadCart()
        ]);

        hideLoader();
    } catch (error) {
        console.error('App initialization error:', error);
        hideLoader();
        showNotification('Failed to load application data', 'error');
    }
};

// Load Products
const loadProducts = async (filters = {}) => {
    try {
        const response = await ProductService.getProducts(filters);
        AppState.products = response.products || response.data || [];
        renderProducts();
    } catch (error) {
        console.error('Failed to load products:', error);
        showNotification('Failed to load products', 'error');
    }
};

// Render Products
const renderProducts = () => {
    const productsGrid = document.querySelector('.products-grid');
    if (!productsGrid) return;

    if (AppState.products.length === 0) {
        productsGrid.innerHTML = `
            <div class="empty-state">
                <p>No products available at the moment.</p>
            </div>
        `;
        return;
    }

    productsGrid.innerHTML = AppState.products.map(product => `
        <div class="product-card" data-product-id="${product._id}">
            <div class="product-image">
                <img src="${product.images?.[0] || 'https://via.placeholder.com/300x300?text=No+Image'}" 
                     alt="${product.name}"
                     onerror="this.src='https://via.placeholder.com/300x300?text=No+Image'">
                ${!product.available ? '<span class="badge badge-unavailable">Unavailable</span>' : ''}
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-description">${product.description?.substring(0, 100) || ''}${product.description?.length > 100 ? '...' : ''}</p>
                <div class="product-meta">
                    <span class="product-category">${product.category?.name || 'Uncategorized'}</span>
                    ${product.condition ? `<span class="product-condition">${product.condition}</span>` : ''}
                </div>
                <div class="product-footer">
                    <span class="product-price">₦${product.price?.toLocaleString()}</span>
                    ${product.available ? `
                        <button class="btn btn-sm btn-primary btn-add-cart" data-product-id="${product._id}">
                            <i class="fas fa-cart-plus"></i> Add to Cart
                        </button>
                    ` : `
                        <button class="btn btn-sm btn-secondary" disabled>
                            Out of Stock
                        </button>
                    `}
                </div>
            </div>
        </div>
    `).join('');

    // Attach event listeners to add to cart buttons
    attachCartButtonListeners();
};

// Load Categories
const loadCategories = async () => {
    try {
        const response = await CategoryService.getCategories();
        AppState.categories = response.categories || response.data || [];
        renderCategories();
    } catch (error) {
        console.error('Failed to load categories:', error);
    }
};

// Render Categories
const renderCategories = () => {
    const categoriesGrid = document.querySelector('.categories-grid');
    if (!categoriesGrid) return;

    if (AppState.categories.length === 0) return;

    categoriesGrid.innerHTML = AppState.categories.map(category => `
        <div class="category-card" data-category-id="${category._id}">
            <div class="category-icon">
                <i class="${category.icon || 'fas fa-tag'}"></i>
            </div>
            <h3>${category.name}</h3>
            <p>${category.description || ''}</p>
            <button class="btn-text" onclick="filterByCategory('${category._id}')">
                Browse ${category.name} →
            </button>
        </div>
    `).join('');
};

// Filter products by category
window.filterByCategory = async (categoryId) => {
    await loadProducts({ category: categoryId });
    document.querySelector('#shop')?.scrollIntoView({ behavior: 'smooth' });
};

// Load Cart
const loadCart = () => {
    AppState.cart = CartService.getCart();
    updateCartUI();
};

// Update Cart UI
const updateCartUI = () => {
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        const count = CartService.getCartCount();
        cartCount.textContent = count;
        cartCount.style.display = count > 0 ? 'flex' : 'none';
    }
};

// Add to Cart
const addToCart = async (productId) => {
    try {
        const product = AppState.products.find(p => p._id === productId);
        if (!product) {
            showNotification('Product not found', 'error');
            return;
        }

        if (!product.available) {
            showNotification('This product is currently unavailable', 'error');
            return;
        }

        CartService.addToCart(product, 1);
        loadCart();
        showNotification('Product added to cart!', 'success');

        // Animate the button
        const button = document.querySelector(`button[data-product-id="${productId}"]`);
        if (button) {
            const originalText = button.innerHTML;
            button.innerHTML = '<i class="fas fa-check"></i> Added!';
            button.style.background = '#16a34a';
            setTimeout(() => {
                button.innerHTML = originalText;
                button.style.background = '';
            }, 1500);
        }
    } catch (error) {
        console.error('Add to cart error:', error);
        showNotification('Failed to add product to cart', 'error');
    }
};

// Attach Cart Button Listeners
const attachCartButtonListeners = () => {
    const addToCartButtons = document.querySelectorAll('.btn-add-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const productId = button.getAttribute('data-product-id');
            addToCart(productId);
        });
    });
};

// Update UI for Authenticated User
const updateUIForAuthenticatedUser = () => {
    const loginBtn = document.querySelector('#loginBtn');
    const registerBtn = document.querySelector('#registerBtn');
    const userProfile = document.querySelector('#userProfile');

    if (loginBtn) loginBtn.style.display = 'none';
    if (registerBtn) registerBtn.style.display = 'none';
    
    if (userProfile) {
        const userName = AppState.user?.firstName || AppState.user?.name || 'User';
        userProfile.style.display = 'flex';
        userProfile.innerHTML = `
            <div class="user-dropdown">
                <button class="btn-user">
                    <i class="fas fa-user-circle"></i>
                    <span>${userName}</span>
                    <i class="fas fa-chevron-down"></i>
                </button>
                <div class="dropdown-menu">
                    <a href="#" onclick="showProfile()">My Profile</a>
                    <a href="#" onclick="showOrders()">My Orders</a>
                    ${AppState.user?.role === 'seller' ? '<a href="seller-dashboard.html">Seller Dashboard</a>' : ''}
                    ${AppState.user?.role === 'seller' ? '<a href="add-product.html">Add Product</a>' : ''}
                    ${AppState.user?.role === 'admin' ? '<a href="#" onclick="showAdminDashboard()">Admin Dashboard</a>' : ''}
                    <hr>
                    <a href="#" onclick="handleLogout()">Logout</a>
                </div>
            </div>
        `;
    }
};

// Handle Login
window.handleLogin = async (email, password) => {
    try {
        showLoader();
        const response = await AuthService.login({ email, password });
        
        if (response.success && response.data) {
            AppState.user = response.data.user;
            updateUIForAuthenticatedUser();
            closeModal('loginModal');
            showNotification('Login successful!', 'success');
            
            // Redirect sellers to dashboard
            if (AppState.user.role === 'seller') {
                setTimeout(() => {
                    window.location.href = 'seller-dashboard.html';
                }, 1000);
            }
        }
        
        hideLoader();
    } catch (error) {
        hideLoader();
        showNotification(error.message || 'Login failed', 'error');
    }
};

// Handle Register
window.handleRegister = async (userData) => {
    try {
        showLoader();
        const response = await AuthService.register(userData);
        
        if (response.success && response.data) {
            AppState.user = response.data.user;
            updateUIForAuthenticatedUser();
            closeModal('registerModal');
            
            // Show appropriate success message based on role
            if (userData.role === 'seller') {
                showNotification('Seller account created! Redirecting to dashboard...', 'success');
                setTimeout(() => {
                    window.location.href = 'seller-dashboard.html';
                }, 1500);
            } else {
                showNotification('Registration successful!', 'success');
            }
        }
        
        hideLoader();
    } catch (error) {
        hideLoader();
        showNotification(error.message || 'Registration failed', 'error');
    }
};

// Handle Logout
window.handleLogout = async () => {
    if (confirm('Are you sure you want to logout?')) {
        await AuthService.logout();
        AppState.user = null;
        window.location.reload();
    }
};

// Show Cart Modal
window.showCart = () => {
    const cart = CartService.getCart();
    if (cart.length === 0) {
        showNotification('Your cart is empty', 'info');
        return;
    }

    const cartTotal = CartService.getCartTotal();
    const cartHTML = `
        <div class="modal-overlay" id="cartModal">
            <div class="modal-content modal-large">
                <div class="modal-header">
                    <h2>Shopping Cart</h2>
                    <button class="btn-close" onclick="closeModal('cartModal')">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="cart-items">
                        ${cart.map(item => `
                            <div class="cart-item">
                                <img src="${item.image || 'https://via.placeholder.com/100'}" alt="${item.name}">
                                <div class="cart-item-info">
                                    <h4>${item.name}</h4>
                                    <p class="cart-item-price">₦${item.price.toLocaleString()}</p>
                                </div>
                                <div class="cart-item-quantity">
                                    <button onclick="updateCartQuantity('${item.productId}', ${item.quantity - 1})">-</button>
                                    <span>${item.quantity}</span>
                                    <button onclick="updateCartQuantity('${item.productId}', ${item.quantity + 1})">+</button>
                                </div>
                                <div class="cart-item-total">
                                    ₦${(item.price * item.quantity).toLocaleString()}
                                </div>
                                <button class="btn-remove" onclick="removeFromCart('${item.productId}')">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        `).join('')}
                    </div>
                    <div class="cart-summary">
                        <h3>Total: ₦${cartTotal.toLocaleString()}</h3>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-secondary" onclick="closeModal('cartModal')">Continue Shopping</button>
                    <button class="btn btn-primary" onclick="proceedToCheckout()">Proceed to Checkout</button>
                </div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', cartHTML);
};

// Update Cart Quantity
window.updateCartQuantity = (productId, quantity) => {
    CartService.updateCartItem(productId, quantity);
    closeModal('cartModal');
    showCart();
    updateCartUI();
};

// Remove from Cart
window.removeFromCart = (productId) => {
    if (confirm('Remove this item from cart?')) {
        CartService.removeFromCart(productId);
        closeModal('cartModal');
        loadCart();
        showNotification('Item removed from cart', 'success');
    }
};

// Proceed to Checkout
window.proceedToCheckout = async () => {
    // Check if user is authenticated
    if (!AuthService.isAuthenticated()) {
        closeModal('cartModal');
        showNotification('Please login or create an account to place your order', 'warning');
        // Import and show login modal
        import('./auth-modals.js').then(module => {
            module.showLoginModal();
        });
        return;
    }

    try {
        showLoader();
        const cart = CartService.getCart();
        
        // Group items by seller for multiple orders
        const ordersBySeller = {};
        cart.forEach(item => {
            if (!ordersBySeller[item.sellerId]) {
                ordersBySeller[item.sellerId] = [];
            }
            ordersBySeller[item.sellerId].push({
                product: item.productId,
                quantity: item.quantity,
                price: item.price
            });
        });

        // Create orders
        const orderPromises = Object.values(ordersBySeller).map(items => 
            OrderService.createOrder({ items })
        );

        const orders = await Promise.all(orderPromises);
        
        // Initialize payment for all orders
        const totalAmount = CartService.getCartTotal();
        const paymentResponse = await PaymentService.initializePayment({
            amount: totalAmount,
            orders: orders.map(o => o.order._id)
        });

        // Redirect to payment gateway
        if (paymentResponse.data?.authorization_url) {
            CartService.clearCart();
            window.location.href = paymentResponse.data.authorization_url;
        }

        hideLoader();
    } catch (error) {
        hideLoader();
        console.error('Checkout error:', error);
        showNotification(error.message || 'Checkout failed', 'error');
    }
};

// Utility Functions
const showLoader = () => {
    AppState.isLoading = true;
    let loader = document.querySelector('#appLoader');
    if (!loader) {
        loader = document.createElement('div');
        loader.id = 'appLoader';
        loader.className = 'app-loader';
        loader.innerHTML = '<div class="spinner"></div>';
        document.body.appendChild(loader);
    }
    loader.style.display = 'flex';
};

const hideLoader = () => {
    AppState.isLoading = false;
    const loader = document.querySelector('#appLoader');
    if (loader) {
        loader.style.display = 'none';
    }
};

const showNotification = (message, type = 'info') => {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.classList.add('show');
    }, 100);

    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
};

window.openModal = (modalId) => {
    const modal = document.querySelector(`#${modalId}`);
    if (modal) modal.style.display = 'flex';
};

window.closeModal = (modalId) => {
    const modal = document.querySelector(`#${modalId}`);
    if (modal) modal.remove();
};

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}

// Export for use in other modules
export { AppState, initApp, loadProducts, loadCategories };
