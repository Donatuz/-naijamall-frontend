// API Service Layer for NaijaMall Backend Integration
import { API_CONFIG, API_ENDPOINTS, STORAGE_KEYS } from './api-config.js';

// Helper function to get auth token
const getToken = () => {
    return localStorage.getItem(STORAGE_KEYS.TOKEN);
};

// Helper function to get auth headers
const getAuthHeaders = () => {
    const token = getToken();
    return {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` })
    };
};

// Generic API request handler
const apiRequest = async (endpoint, options = {}) => {
    try {
        const url = `${API_CONFIG.BASE_URL}${endpoint}`;
        const config = {
            ...options,
            headers: {
                ...getAuthHeaders(),
                ...options.headers
            }
        };

        const response = await fetch(url, config);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Something went wrong');
        }

        return data;
    } catch (error) {
        console.error('API Request Error:', error);
        throw error;
    }
};

// Authentication Service
const AuthService = {
    // Register new user
    register: async (userData) => {
        const data = await apiRequest(API_ENDPOINTS.AUTH.REGISTER, {
            method: 'POST',
            body: JSON.stringify(userData)
        });
        
        // Backend returns data wrapped in 'data' property
        if (data.data && data.data.token) {
            localStorage.setItem(STORAGE_KEYS.TOKEN, data.data.token);
            localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(data.data.user));
        } else if (data.token) {
            // Fallback for direct token response
            localStorage.setItem(STORAGE_KEYS.TOKEN, data.token);
            localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(data.user));
        }
        
        return data;
    },

    // Login user
    login: async (credentials) => {
        const data = await apiRequest(API_ENDPOINTS.AUTH.LOGIN, {
            method: 'POST',
            body: JSON.stringify(credentials)
        });
        
        // Backend returns data wrapped in 'data' property
        if (data.data && data.data.token) {
            localStorage.setItem(STORAGE_KEYS.TOKEN, data.data.token);
            localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(data.data.user));
        } else if (data.token) {
            // Fallback for direct token response
            localStorage.setItem(STORAGE_KEYS.TOKEN, data.token);
            localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(data.user));
        }
        
        return data;
    },

    // Logout user
    logout: async () => {
        try {
            await apiRequest(API_ENDPOINTS.AUTH.LOGOUT, { method: 'POST' });
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            localStorage.removeItem(STORAGE_KEYS.TOKEN);
            localStorage.removeItem(STORAGE_KEYS.USER);
            window.location.href = '/';
        }
    },

    // Get current user
    getMe: async () => {
        return await apiRequest(API_ENDPOINTS.AUTH.GET_ME);
    },

    // Update profile
    updateProfile: async (profileData) => {
        return await apiRequest(API_ENDPOINTS.AUTH.UPDATE_PROFILE, {
            method: 'PUT',
            body: JSON.stringify(profileData)
        });
    },

    // Change password
    changePassword: async (passwordData) => {
        return await apiRequest(API_ENDPOINTS.AUTH.CHANGE_PASSWORD, {
            method: 'PUT',
            body: JSON.stringify(passwordData)
        });
    },

    // Check if user is logged in
    isAuthenticated: () => {
        return !!getToken();
    },

    // Get current user from localStorage
    getCurrentUser: () => {
        const userStr = localStorage.getItem(STORAGE_KEYS.USER);
        return userStr ? JSON.parse(userStr) : null;
    }
};

// Product Service
const ProductService = {
    // Get all products with filters
    getProducts: async (filters = {}) => {
        const queryParams = new URLSearchParams(filters).toString();
        const endpoint = queryParams ? `${API_ENDPOINTS.PRODUCTS.GET_ALL}?${queryParams}` : API_ENDPOINTS.PRODUCTS.GET_ALL;
        return await apiRequest(endpoint);
    },

    // Get single product
    getProduct: async (id) => {
        return await apiRequest(API_ENDPOINTS.PRODUCTS.GET_ONE(id));
    },

    // Create product (seller only)
    createProduct: async (productData) => {
        return await apiRequest(API_ENDPOINTS.PRODUCTS.CREATE, {
            method: 'POST',
            body: JSON.stringify(productData)
        });
    },

    // Update product
    updateProduct: async (id, productData) => {
        return await apiRequest(API_ENDPOINTS.PRODUCTS.UPDATE(id), {
            method: 'PUT',
            body: JSON.stringify(productData)
        });
    },

    // Delete product
    deleteProduct: async (id) => {
        return await apiRequest(API_ENDPOINTS.PRODUCTS.DELETE(id), {
            method: 'DELETE'
        });
    },

    // Get my products (seller)
    getMyProducts: async () => {
        return await apiRequest(API_ENDPOINTS.PRODUCTS.MY_PRODUCTS);
    },

    // Toggle product availability
    toggleAvailability: async (id) => {
        return await apiRequest(API_ENDPOINTS.PRODUCTS.TOGGLE_AVAILABILITY(id), {
            method: 'PATCH'
        });
    },

    // Upload product images
    uploadProductImages: async (id, formData) => {
        const token = getToken();
        const response = await fetch(`${API_CONFIG.BASE_URL}${API_ENDPOINTS.PRODUCTS.UPLOAD_IMAGES(id)}`, {
            method: 'POST',
            headers: {
                ...(token && { 'Authorization': `Bearer ${token}` })
            },
            body: formData
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to upload images');
        }

        return await response.json();
    },

    // Legacy method for backward compatibility
    uploadImages: async (id, files) => {
        const formData = new FormData();
        for (let i = 0; i < files.length; i++) {
            formData.append('images', files[i]);
        }
        return await ProductService.uploadProductImages(id, formData);
    }
};

// Category Service
const CategoryService = {
    // Get all categories
    getCategories: async () => {
        return await apiRequest(API_ENDPOINTS.CATEGORIES.GET_ALL);
    },

    // Get single category
    getCategory: async (id) => {
        return await apiRequest(API_ENDPOINTS.CATEGORIES.GET_ONE(id));
    },

    // Create category (admin only)
    createCategory: async (categoryData) => {
        return await apiRequest(API_ENDPOINTS.CATEGORIES.CREATE, {
            method: 'POST',
            body: JSON.stringify(categoryData)
        });
    },

    // Update category (admin only)
    updateCategory: async (id, categoryData) => {
        return await apiRequest(API_ENDPOINTS.CATEGORIES.UPDATE(id), {
            method: 'PUT',
            body: JSON.stringify(categoryData)
        });
    },

    // Delete category (admin only)
    deleteCategory: async (id) => {
        return await apiRequest(API_ENDPOINTS.CATEGORIES.DELETE(id), {
            method: 'DELETE'
        });
    }
};

// Order Service
const OrderService = {
    // Create order
    createOrder: async (orderData) => {
        return await apiRequest(API_ENDPOINTS.ORDERS.CREATE, {
            method: 'POST',
            body: JSON.stringify(orderData)
        });
    },

    // Get my orders
    getMyOrders: async () => {
        return await apiRequest(API_ENDPOINTS.ORDERS.GET_MY_ORDERS);
    },

    // Get single order
    getOrder: async (id) => {
        return await apiRequest(API_ENDPOINTS.ORDERS.GET_ONE(id));
    },

    // Update order status
    updateOrderStatus: async (id, status) => {
        return await apiRequest(API_ENDPOINTS.ORDERS.UPDATE_STATUS(id), {
            method: 'PATCH',
            body: JSON.stringify({ status })
        });
    },

    // Confirm delivery
    confirmDelivery: async (id) => {
        return await apiRequest(API_ENDPOINTS.ORDERS.CONFIRM_DELIVERY(id), {
            method: 'POST'
        });
    },

    // Cancel order
    cancelOrder: async (id, reason) => {
        return await apiRequest(API_ENDPOINTS.ORDERS.CANCEL(id), {
            method: 'POST',
            body: JSON.stringify({ reason })
        });
    }
};

// Payment Service
const PaymentService = {
    // Initialize payment
    initializePayment: async (paymentData) => {
        return await apiRequest(API_ENDPOINTS.PAYMENTS.INITIALIZE, {
            method: 'POST',
            body: JSON.stringify(paymentData)
        });
    },

    // Verify payment
    verifyPayment: async (reference) => {
        return await apiRequest(API_ENDPOINTS.PAYMENTS.VERIFY, {
            method: 'POST',
            body: JSON.stringify({ reference })
        });
    },

    // Get my payments
    getMyPayments: async () => {
        return await apiRequest(API_ENDPOINTS.PAYMENTS.GET_MY_PAYMENTS);
    }
};

// Cart Service (Local Storage)
const CartService = {
    // Get cart items
    getCart: () => {
        const cartStr = localStorage.getItem(STORAGE_KEYS.CART);
        return cartStr ? JSON.parse(cartStr) : [];
    },

    // Add item to cart
    addToCart: (product, quantity = 1) => {
        const cart = CartService.getCart();
        const existingItem = cart.find(item => item.productId === product._id);

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.push({
                productId: product._id,
                name: product.name,
                price: product.price,
                image: product.images?.[0] || '',
                sellerId: product.seller,
                quantity: quantity
            });
        }

        localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
        return cart;
    },

    // Update cart item quantity
    updateCartItem: (productId, quantity) => {
        const cart = CartService.getCart();
        const item = cart.find(item => item.productId === productId);

        if (item) {
            if (quantity <= 0) {
                return CartService.removeFromCart(productId);
            }
            item.quantity = quantity;
            localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
        }

        return cart;
    },

    // Remove item from cart
    removeFromCart: (productId) => {
        let cart = CartService.getCart();
        cart = cart.filter(item => item.productId !== productId);
        localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
        return cart;
    },

    // Clear cart
    clearCart: () => {
        localStorage.removeItem(STORAGE_KEYS.CART);
        return [];
    },

    // Get cart total
    getCartTotal: () => {
        const cart = CartService.getCart();
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    },

    // Get cart count
    getCartCount: () => {
        const cart = CartService.getCart();
        return cart.reduce((count, item) => count + item.quantity, 0);
    }
};

// Admin Service
const AdminService = {
    // Get dashboard stats
    getDashboardStats: async () => {
        return await apiRequest('/admin/dashboard');
    },

    // Get all users
    getAllUsers: async (role = '', search = '', page = 1) => {
        const params = new URLSearchParams();
        if (role) params.append('role', role);
        if (search) params.append('search', search);
        params.append('page', page);
        
        return await apiRequest(`/admin/users?${params.toString()}`);
    },

    // Get all orders (admin view)
    getAllOrders: async (status = '', page = 1) => {
        const params = new URLSearchParams();
        if (status) params.append('status', status);
        params.append('page', page);
        
        return await apiRequest(`/admin/orders?${params.toString()}`);
    },

    // Update user status
    updateUserStatus: async (userId, isActive) => {
        return await apiRequest(`/admin/users/${userId}/status`, {
            method: 'PATCH',
            body: JSON.stringify({ isActive })
        });
    },

    // Verify seller
    verifySeller: async (sellerId, status) => {
        return await apiRequest(`/admin/sellers/${sellerId}/verify`, {
            method: 'POST',
            body: JSON.stringify({ status })
        });
    },

    // Get revenue report
    getRevenueReport: async (startDate = null, endDate = null) => {
        const params = new URLSearchParams();
        if (startDate) params.append('startDate', startDate);
        if (endDate) params.append('endDate', endDate);
        
        return await apiRequest(`/admin/revenue?${params.toString()}`);
    },

    // Get all products
    getAllProducts: async () => {
        return await apiRequest(API_ENDPOINTS.ADMIN.ALL_PRODUCTS);
    },

    // Update user
    updateUser: async (id, userData) => {
        return await apiRequest(API_ENDPOINTS.ADMIN.UPDATE_USER(id), {
            method: 'PUT',
            body: JSON.stringify(userData)
        });
    },

    // Delete user
    deleteUser: async (id) => {
        return await apiRequest(API_ENDPOINTS.ADMIN.DELETE_USER(id), {
            method: 'DELETE'
        });
    }
};

// Export all services
export {
    AuthService,
    ProductService,
    CategoryService,
    OrderService,
    PaymentService,
    CartService,
    AdminService
};
