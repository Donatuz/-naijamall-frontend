// Production API Configuration for NaijaMall
// This file will be used when deploying to Netlify

const API_CONFIG = {
    // Replace this with your actual Render backend URL after deployment
    BASE_URL: 'https://naijamall-34sh.onrender.com/api',
    TIMEOUT: 10000
};

// API Endpoints
const API_ENDPOINTS = {
    // Auth endpoints
    AUTH: {
        REGISTER: '/auth/register',
        LOGIN: '/auth/login',
        LOGOUT: '/auth/logout',
        GET_ME: '/auth/me',
        UPDATE_PROFILE: '/auth/profile',
        CHANGE_PASSWORD: '/auth/change-password'
    },
    // Product endpoints
    PRODUCTS: {
        GET_ALL: '/products',
        GET_ONE: (id) => `/products/${id}`,
        CREATE: '/products',
        UPDATE: (id) => `/products/${id}`,
        DELETE: (id) => `/products/${id}`,
        MY_PRODUCTS: '/products/seller/my-products',
        TOGGLE_AVAILABILITY: (id) => `/products/${id}/availability`,
        UPLOAD_IMAGES: (id) => `/products/${id}/upload-images`,
        DELETE_IMAGE: (id, publicId) => `/products/${id}/images/${publicId}`
    },
    // Category endpoints
    CATEGORIES: {
        GET_ALL: '/categories',
        GET_ONE: (id) => `/categories/${id}`,
        CREATE: '/categories',
        UPDATE: (id) => `/categories/${id}`,
        DELETE: (id) => `/categories/${id}`
    },
    // Order endpoints
    ORDERS: {
        CREATE: '/orders',
        GET_MY_ORDERS: '/orders/my-orders',
        GET_ONE: (id) => `/orders/${id}`,
        UPDATE_STATUS: (id) => `/orders/${id}/status`,
        CONFIRM_DELIVERY: (id) => `/orders/${id}/confirm`,
        CANCEL: (id) => `/orders/${id}/cancel`,
        ASSIGN_RIDER: (id) => `/orders/${id}/assign-rider`
    },
    // Payment endpoints
    PAYMENTS: {
        INITIALIZE: '/payments/initialize',
        VERIFY: '/payments/verify',
        GET_MY_PAYMENTS: '/payments/my-payments'
    },
    // Delivery endpoints
    DELIVERIES: {
        GET_ALL: '/deliveries',
        GET_ONE: (id) => `/deliveries/${id}`,
        UPDATE_STATUS: (id) => `/deliveries/${id}/status`
    },
    // Admin endpoints
    ADMIN: {
        STATS: '/admin/stats',
        ALL_USERS: '/admin/users',
        ALL_ORDERS: '/admin/orders',
        ALL_PRODUCTS: '/admin/products',
        UPDATE_USER: (id) => `/admin/users/${id}`,
        DELETE_USER: (id) => `/admin/users/${id}`
    }
};

// Storage keys for localStorage
const STORAGE_KEYS = {
    TOKEN: 'naijamall_token',
    USER: 'naijamall_user',
    CART: 'naijamall_cart'
};

export { API_CONFIG, API_ENDPOINTS, STORAGE_KEYS };
