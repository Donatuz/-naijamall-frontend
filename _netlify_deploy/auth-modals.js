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
export const showRegisterModal = () => {
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
                                <label for="registerName">Full Name *</label>
                                <input type="text" id="registerName" name="name" required 
                                       placeholder="Enter your full name">
                            </div>
                            <div class="form-group">
                                <label for="registerEmail">Email Address *</label>
                                <input type="email" id="registerEmail" name="email" required 
                                       placeholder="Enter your email">
                            </div>
                        </div>
                        
                        <div class="form-row">
                            <div class="form-group">
                                <label for="registerPhone">Phone Number *</label>
                                <input type="tel" id="registerPhone" name="phone" required 
                                       placeholder="+234 XXX XXX XXXX">
                            </div>
                            <div class="form-group">
                                <label for="registerRole">Account Type *</label>
                                <select id="registerRole" name="role" required>
                                    <option value="buyer">Buyer</option>
                                    <option value="seller">Seller</option>
                                </select>
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
                                      placeholder="Enter your delivery address"></textarea>
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
    
    if (password !== confirmPassword) {
        window.showNotification('Passwords do not match', 'error');
        return;
    }
    
    const userData = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        password: password,
        role: formData.get('role'),
        address: formData.get('address')
    };
    
    await window.handleRegister(userData);
};

// Switch between modals
window.switchToRegister = () => {
    window.closeModal('loginModal');
    showRegisterModal();
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
