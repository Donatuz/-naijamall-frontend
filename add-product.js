// Add/Edit Product Logic
import { AuthService, ProductService, CategoryService } from './api-service.js';

let selectedImages = [];
let productId = null;
let existingProduct = null;

// Initialize on page load
document.addEventListener('DOMContentLoaded', async () => {
    await checkAuth();
    await loadCategories();
    
    // Check if editing existing product
    const urlParams = new URLSearchParams(window.location.search);
    productId = urlParams.get('id');
    
    if (productId) {
        document.getElementById('pageTitle').textContent = '✏️ Edit Product';
        document.getElementById('submitBtnText').textContent = 'Update Product';
        await loadProduct(productId);
    }
    
    setupDragAndDrop();
});

// Check authentication
async function checkAuth() {
    const token = localStorage.getItem('authToken');
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    if (!token || !user.id || user.role !== 'seller') {
        window.location.href = 'index.html';
        return;
    }

    if (user.verificationStatus !== 'verified') {
        showNotification('Your account must be verified to add products', 'error');
        setTimeout(() => {
            window.location.href = 'seller-dashboard.html';
        }, 2000);
    }
}

// Load categories
async function loadCategories() {
    try {
        const response = await CategoryService.getCategories();
        
        if (response.success && response.data) {
            const select = document.getElementById('productCategory');
            
            response.data.forEach(category => {
                const option = document.createElement('option');
                option.value = category._id;
                option.textContent = `${category.icon} ${category.name}`;
                select.appendChild(option);
            });
        }
    } catch (error) {
        console.error('Error loading categories:', error);
        showNotification('Error loading categories', 'error');
    }
}

// Load existing product for editing
async function loadProduct(id) {
    try {
        const response = await ProductService.getProduct(id);
        
        if (response.success && response.data) {
            existingProduct = response.data;
            
            // Populate form fields
            document.getElementById('productName').value = existingProduct.name;
            document.getElementById('productDescription').value = existingProduct.description;
            document.getElementById('productCategory').value = existingProduct.category._id || existingProduct.category;
            document.getElementById('productPrice').value = existingProduct.price;
            document.getElementById('productUnit').value = existingProduct.unit;
            document.getElementById('productStock').value = existingProduct.stock;
            document.getElementById('productDiscount').value = existingProduct.discount || 0;
            document.getElementById('productIsFresh').checked = existingProduct.isFresh;
            
            if (existingProduct.tags && existingProduct.tags.length > 0) {
                document.getElementById('productTags').value = existingProduct.tags.join(', ');
            }
            
            if (existingProduct.marketLocation) {
                document.getElementById('marketLocation').value = existingProduct.marketLocation.name || '';
            }
            
            // Display existing images
            if (existingProduct.images && existingProduct.images.length > 0) {
                const previewGrid = document.getElementById('imagePreviewGrid');
                existingProduct.images.forEach(image => {
                    addImagePreview(image.url, true, image.publicId);
                });
            }
        }
    } catch (error) {
        console.error('Error loading product:', error);
        showNotification('Error loading product data', 'error');
    }
}

// Setup drag and drop
function setupDragAndDrop() {
    const uploadArea = document.getElementById('imageUploadArea');
    
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        uploadArea.addEventListener(eventName, preventDefaults, false);
    });
    
    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }
    
    ['dragenter', 'dragover'].forEach(eventName => {
        uploadArea.addEventListener(eventName, () => {
            uploadArea.classList.add('dragover');
        });
    });
    
    ['dragleave', 'drop'].forEach(eventName => {
        uploadArea.addEventListener(eventName, () => {
            uploadArea.classList.remove('dragover');
        });
    });
    
    uploadArea.addEventListener('drop', handleDrop);
}

function handleDrop(e) {
    const dt = e.dataTransfer;
    const files = dt.files;
    handleImageFiles(files);
}

// Handle image selection
window.handleImageSelect = (event) => {
    const files = event.target.files;
    handleImageFiles(files);
};

function handleImageFiles(files) {
    const totalImages = selectedImages.length + (existingProduct?.images?.length || 0);
    
    if (totalImages + files.length > 5) {
        showNotification('Maximum 5 images allowed', 'error');
        return;
    }
    
    Array.from(files).forEach(file => {
        // Validate file
        if (!file.type.startsWith('image/')) {
            showNotification(`${file.name} is not an image file`, 'error');
            return;
        }
        
        if (file.size > 5 * 1024 * 1024) {
            showNotification(`${file.name} is too large (max 5MB)`, 'error');
            return;
        }
        
        selectedImages.push(file);
        
        // Create preview
        const reader = new FileReader();
        reader.onload = (e) => {
            addImagePreview(e.target.result, false);
        };
        reader.readAsDataURL(file);
    });
}

function addImagePreview(src, isExisting = false, publicId = null) {
    const previewGrid = document.getElementById('imagePreviewGrid');
    const previewItem = document.createElement('div');
    previewItem.className = 'image-preview-item';
    previewItem.dataset.existing = isExisting;
    if (publicId) previewItem.dataset.publicId = publicId;
    
    previewItem.innerHTML = `
        <img src="${src}" alt="Product image">
        <button type="button" class="remove-btn" onclick="removeImage(this)">&times;</button>
    `;
    
    previewGrid.appendChild(previewItem);
}

window.removeImage = (btn) => {
    const previewItem = btn.closest('.image-preview-item');
    const isExisting = previewItem.dataset.existing === 'true';
    const index = Array.from(previewItem.parentNode.children).indexOf(previewItem);
    
    if (!isExisting) {
        // Remove from selectedImages array
        const existingCount = existingProduct?.images?.length || 0;
        selectedImages.splice(index - existingCount, 1);
    }
    
    previewItem.remove();
};

// Handle form submission
window.handleSubmit = async (event) => {
    event.preventDefault();
    
    const submitBtn = document.getElementById('submitBtn');
    const submitBtnText = document.getElementById('submitBtnText');
    const originalText = submitBtnText.textContent;
    
    submitBtn.disabled = true;
    submitBtnText.textContent = productId ? 'Updating...' : 'Adding...';
    
    try {
        // Gather form data
        const formData = new FormData(event.target);
        
        const productData = {
            name: formData.get('name'),
            description: formData.get('description'),
            price: parseFloat(formData.get('price')),
            unit: formData.get('unit'),
            category: formData.get('category'),
            stock: parseInt(formData.get('stock')),
            isFresh: formData.get('isFresh') === 'on',
            discount: parseInt(formData.get('discount')) || 0,
        };
        
        // Parse tags
        const tagsInput = formData.get('tags');
        if (tagsInput) {
            productData.tags = tagsInput.split(',').map(tag => tag.trim()).filter(tag => tag);
        }
        
        // Market location
        const marketLocationInput = formData.get('marketLocation');
        if (marketLocationInput) {
            productData.marketLocation = {
                name: marketLocationInput
            };
        }
        
        let response;
        
        if (productId) {
            // Update existing product
            response = await ProductService.updateProduct(productId, productData);
        } else {
            // Create new product
            response = await ProductService.createProduct(productData);
        }
        
        if (response.success) {
            const createdProductId = productId || response.data._id;
            
            // Upload images if any
            if (selectedImages.length > 0) {
                await uploadImages(createdProductId);
            }
            
            showNotification(
                productId ? 'Product updated successfully!' : 'Product added successfully!',
                'success'
            );
            
            setTimeout(() => {
                window.location.href = 'seller-dashboard.html';
            }, 1500);
        } else {
            showNotification(response.message || 'Failed to save product', 'error');
            submitBtn.disabled = false;
            submitBtnText.textContent = originalText;
        }
    } catch (error) {
        console.error('Error saving product:', error);
        showNotification('Error saving product. Please try again.', 'error');
        submitBtn.disabled = false;
        submitBtnText.textContent = originalText;
    }
};

// Upload images
async function uploadImages(productId) {
    try {
        const formData = new FormData();
        selectedImages.forEach(image => {
            formData.append('images', image);
        });
        
        await ProductService.uploadProductImages(productId, formData);
    } catch (error) {
        console.error('Error uploading images:', error);
        showNotification('Product saved but some images failed to upload', 'warning');
    }
}

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
