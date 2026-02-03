// Authentication Modal Components
import { AuthService } from './api-service.js';

// Show Login Modal
export const showLoginModal = () => {
    const modalHTML = `
        <div class="modal-overlay" id="loginModal" onclick="closeModalOnOverlay(event, 'loginModal')">
            <div class="modal-content">
                <div class="modal-header">
                    <h2>Login to NaijaMall</h2>
                    <button class="btn-close" onclick="closeModal('loginModal')">&times;</button>
                </div>
                <div class="modal-body">
                    <form id="loginForm" onsubmit="submitLogin(event)">
                        <div class="form-group">
                            <label for="loginEmail">Email Address</label>
                            <input type="email" id="loginEmail" name="email" required 
                                   placeholder="Enter your email">
                        </div>
                        <div class="form-group">
                            <label for="loginPassword">Password</label>
                            <input type="password" id="loginPassword" name="password" required 
                                   placeholder="Enter your password">
                        </div>
                        <div class="form-group">
                            <label class="checkbox-label">
                                <input type="checkbox" name="remember"> Remember me
                            </label>
                        </div>
                        <button type="submit" class="btn btn-primary btn-block">Login</button>
                    </form>
                    <div class="modal-footer-text">
                        <p>Don't have an account? <a href="#" onclick="switchToRegister()">Register here</a></p>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
};

// Show Register Modal
export const showRegisterModal = (defaultRole = 'buyer') => {
    const modalHTML = `
        <div class="modal-overlay" id="registerModal" onclick="closeModalOnOverlay(event, 'registerModal')">
            <div class="modal-content modal-large">
                <div class="modal-header">
                    <h2>Create Your Account</h2>
                    <button class="btn-close" onclick="closeModal('registerModal')">&times;</button>
                </div>
                <div class="modal-body">
                    <form id="registerForm" onsubmit="submitRegister(event)">
                        <div class="form-row">
                            <div class="form-group">
                                <label for="registerFirstName">First Name *</label>
                                <input type="text" id="registerFirstName" name="firstName" required 
                                       placeholder="Enter your first name">
                            </div>
                            <div class="form-group">
                                <label for="registerLastName">Last Name *</label>
                                <input type="text" id="registerLastName" name="lastName" required 
                                       placeholder="Enter your last name">
                            </div>
                        </div>
                        
                        <div class="form-row">
                            <div class="form-group">
                                <label for="registerEmail">Email Address *</label>
                                <input type="email" id="registerEmail" name="email" required 
                                       placeholder="Enter your email">
                            </div>
                            <div class="form-group">
                                <label for="registerPhone">Phone Number *</label>
                                <input type="tel" id="registerPhone" name="phone" required 
                                       placeholder="+234 XXX XXX XXXX">
                            </div>
                        </div>
                        
                        <div class="form-group">
                            <label for="registerRole">Account Type *</label>
                            <select id="registerRole" name="role" required onchange="toggleSellerFields()">
                                <option value="buyer" ${defaultRole === 'buyer' ? 'selected' : ''}>Buyer</option>
                                <option value="seller" ${defaultRole === 'seller' ? 'selected' : ''}>Seller</option>
                            </select>
                        </div>

                        <!-- Seller-specific fields -->
                        <div id="sellerFields" style="display: ${defaultRole === 'seller' ? 'block' : 'none'};">
                            <div class="form-group">
                                <label for="registerBusinessName">Business Name *</label>
                                <input type="text" id="registerBusinessName" name="businessName" 
                                       placeholder="Enter your business/shop name">
                            </div>
                            <div class="form-group">
                                <label for="registerBusinessDescription">Business Description</label>
                                <textarea id="registerBusinessDescription" name="businessDescription" rows="2"
                                          placeholder="Describe what you sell (optional)"></textarea>
                            </div>
                        </div>

                        <div class="form-row">
                            <div class="form-group">
                                <label for="registerPassword">Password *</label>
                                <input type="password" id="registerPassword" name="password" required 
                                       minlength="6" placeholder="Minimum 6 characters">
                            </div>
                            <div class="form-group">
                                <label for="registerConfirmPassword">Confirm Password *</label>
                                <input type="password" id="registerConfirmPassword" name="confirmPassword" required 
                                       placeholder="Re-enter your password">
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="registerAddress">Address *</label>
                            <textarea id="registerAddress" name="address" required rows="2"
                                      placeholder="Enter your address"></textarea>
                        </div>

                        <div class="form-group">
                            <label class="checkbox-label">
                                <input type="checkbox" name="terms" required>
                                I agree to the <a href="#" target="_blank">Terms & Conditions</a> and <a href="#" target="_blank">Privacy Policy</a>
                            </label>
                        </div>

                        <button type="submit" class="btn btn-primary btn-block">Create Account</button>
                    </form>
                    <div class="modal-footer-text">
                        <p>Already have an account? <a href="#" onclick="switchToLogin()">Login here</a></p>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
};

// Submit Login
window.submitLogin = async (event) => {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const email = formData.get('email');
    const password = formData.get('password');
    
    await window.handleLogin(email, password);
};

// Submit Register
window.submitRegister = async (event) => {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');
    const role = formData.get('role');
    
    if (password !== confirmPassword) {
        window.showNotification('Passwords do not match', 'error');
        return;
    }
    
    // Validate seller-specific fields
    if (role === 'seller') {
        const businessName = formData.get('businessName');
        if (!businessName || businessName.trim() === '') {
            window.showNotification('Business name is required for sellers', 'error');
            return;
        }
    }
    
    const userData = {
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        password: password,
        role: role,
        address: formData.get('address')
    };
    
    // Add seller-specific fields
    if (role === 'seller') {
        userData.businessName = formData.get('businessName');
        userData.businessDescription = formData.get('businessDescription');
    }
    
    await window.handleRegister(userData);
};

// Toggle seller fields visibility
window.toggleSellerFields = () => {
    const role = document.getElementById('registerRole').value;
    const sellerFields = document.getElementById('sellerFields');
    const businessNameInput = document.getElementById('registerBusinessName');
    
    if (role === 'seller') {
        sellerFields.style.display = 'block';
        businessNameInput.required = true;
    } else {
        sellerFields.style.display = 'none';
        businessNameInput.required = false;
    }
};

// Switch between modals
window.switchToRegister = (role = 'buyer') => {
    window.closeModal('loginModal');
    showRegisterModal(role);
};

window.switchToLogin = () => {
    window.closeModal('registerModal');
    showLoginModal();
};

// Close modal on overlay click
window.closeModalOnOverlay = (event, modalId) => {
    if (event.target.classList.contains('modal-overlay')) {
        window.closeModal(modalId);
    }
};

// Expose functions globally
window.showLoginModal = showLoginModal;
window.showRegisterModal = showRegisterModal;
