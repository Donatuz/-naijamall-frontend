// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80; // Account for fixed navbar
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// FAQ Accordion
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        // Close other open items
        faqItems.forEach(otherItem => {
            if (otherItem !== item && otherItem.classList.contains('active')) {
                otherItem.classList.remove('active');
            }
        });
        
        // Toggle current item
        item.classList.toggle('active');
    });
});

// Add to Cart Functionality
const addToCartButtons = document.querySelectorAll('.btn-add-cart');
const cartCount = document.querySelector('.cart-count');
let itemCount = 3;

addToCartButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        itemCount++;
        cartCount.textContent = itemCount;
        
        // Add animation
        button.textContent = 'Added!';
        button.style.background = '#16a34a';
        
        setTimeout(() => {
            button.textContent = 'Add to Cart';
            button.style.background = '';
        }, 1500);
    });
});

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 1px 3px 0 rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all animated elements
document.querySelectorAll('.product-card, .category-card, .revenue-card, .step-card, .testimonial-card, .benefit-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
});

// Cart icon animation
const cartIcon = document.querySelector('.cart-icon');
if (cartIcon) {
    cartIcon.addEventListener('click', () => {
        alert('Cart functionality coming soon! Your cart has ' + itemCount + ' items.');
    });
}

// Get Started button functionality
const getStartedButtons = document.querySelectorAll('.btn-primary');
getStartedButtons.forEach(button => {
    if (button.textContent.includes('Get Started') || button.textContent.includes('Start Shopping')) {
        button.addEventListener('click', () => {
            document.querySelector('#shop').scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    }
    
    if (button.textContent.includes('Become a Seller')) {
        button.addEventListener('click', () => {
            document.querySelector('#sellers').scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    }
});

// Active navigation link highlighting
const sections = document.querySelectorAll('section[id]');

function highlightNav() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        if (navLink && scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            navLink.classList.add('active');
        }
    });
}

window.addEventListener('scroll', highlightNav);

// Add active class styling for nav links
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: var(--primary-color);
        font-weight: 600;
    }
`;
document.head.appendChild(style);

console.log('NaijaMall website loaded successfully!');

// Update Cart Count Badge
function updateCartCount() {
    const cartCount = document.getElementById('cartCount');
    if (cartCount) {
        // Get cart from localStorage
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
        
        cartCount.textContent = totalItems;
        
        // Show/hide badge based on count
        if (totalItems > 0) {
            cartCount.classList.remove('hidden');
            // Trigger animation
            cartCount.style.animation = 'none';
            setTimeout(() => {
                cartCount.style.animation = 'cartPulse 0.3s ease';
            }, 10);
        } else {
            cartCount.classList.add('hidden');
        }
    }
}

// Update cart count on page load
document.addEventListener('DOMContentLoaded', updateCartCount);

// Listen for storage changes (cart updates)
window.addEventListener('storage', function(e) {
    if (e.key === 'cart') {
        updateCartCount();
    }
});

// Make updateCartCount globally available
window.updateCartCount = updateCartCount;

// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInsideNav = navMenu.contains(event.target);
            const isClickOnHamburger = hamburger.contains(event.target);
            
            if (!isClickInsideNav && !isClickOnHamburger && navMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
});

// Shopping List Form Handling
document.addEventListener('DOMContentLoaded', function() {
    const shoppingListForm = document.getElementById('shoppingListForm');
    const successMessage = document.getElementById('successMessage');
    
    if (shoppingListForm) {
        shoppingListForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Get form data with structured items
            const shoppingItems = getShoppingItems();
            
            // Validate at least one item
            if (shoppingItems.length === 0) {
                alert('Please add at least one item to your shopping list.');
                return;
            }
            
            const formData = {
                items: shoppingItems,
                deliveryLocation: document.getElementById('deliveryLocation').options[document.getElementById('deliveryLocation').selectedIndex].text,
                preferredMarket: document.getElementById('preferredMarket').value,
                phoneNumber: document.getElementById('phoneNumber').value,
                paymentMethod: document.getElementById('paymentMethod').value,
                additionalNotes: document.getElementById('additionalNotes').value,
                estimatedTotal: document.getElementById('totalPrice').textContent,
                submittedAt: new Date().toISOString()
            };
            
            // Disable submit button
            const submitBtn = shoppingListForm.querySelector('.btn-submit');
            const originalText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
            
            try {
                // Submit to backend API
                const token = localStorage.getItem('naijamall_token') || localStorage.getItem('authToken');
                
                if (!token) {
                    alert('Please login to submit your shopping list.');
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalText;
                    return;
                }
                
                // Submit to backend
                const response = await fetch(`${API_CONFIG.BASE_URL}/shopping-lists`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(formData)
                });
                
                const result = await response.json();
                
                if (!response.ok) {
                    throw new Error(result.message || 'Failed to submit shopping list');
                }
                
                // Show success message
                shoppingListForm.style.display = 'none';
                successMessage.style.display = 'block';
                
                // Scroll to success message
                successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
                
                // Store in localStorage as backup
                const existingLists = JSON.parse(localStorage.getItem('shoppingLists') || '[]');
                existingLists.push(formData);
                localStorage.setItem('shoppingLists', JSON.stringify(existingLists));
                
                console.log('Shopping list submitted:', formData);
                
            } catch (error) {
                console.error('Error submitting shopping list:', error);
                alert('Failed to submit shopping list. Please try again or contact support.');
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
            }
        });
    }
});

// Reset Shopping List Form
function resetShoppingListForm() {
    const shoppingListForm = document.getElementById('shoppingListForm');
    const successMessage = document.getElementById('successMessage');
    
    // Reset form
    shoppingListForm.reset();
    
    // Show form, hide success message
    shoppingListForm.style.display = 'block';
    successMessage.style.display = 'none';
    
    // Scroll to form
    shoppingListForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Add link to shopping list in navigation
document.addEventListener('DOMContentLoaded', function() {
    const navMenu = document.querySelector('.nav-menu');
    if (navMenu && !document.querySelector('a[href="#shopping-list"]')) {
        const shoppingListLink = document.createElement('li');
        shoppingListLink.innerHTML = '<a href="#shopping-list" class="nav-link">Shopping List</a>';
        // Insert before "How It Works"
        const howItWorksLink = navMenu.querySelector('a[href="#how-it-works"]')?.parentElement;
        if (howItWorksLink) {
            navMenu.insertBefore(shoppingListLink, howItWorksLink);
        }
    }
});

// Shopping List Price Calculator
function calculateTotal() {
    const deliveryLocationSelect = document.getElementById('deliveryLocation');
    
    // Calculate items subtotal from table rows
    let itemsSubtotal = 0;
    const priceInputs = document.querySelectorAll('.item-price-input');
    
    priceInputs.forEach(input => {
        const price = parseFloat(input.value) || 0;
        if (price > 0) {
            itemsSubtotal += price;
        }
    });
    
    console.log('Total items subtotal:', itemsSubtotal);
    
    // Get delivery fee from selected location
    let deliveryFee = 0;
    if (deliveryLocationSelect && deliveryLocationSelect.value) {
        const selectedOption = deliveryLocationSelect.options[deliveryLocationSelect.selectedIndex];
        deliveryFee = parseInt(selectedOption.getAttribute('data-fee')) || 0;
    }
    
    // Calculate procurement fee based on subtotal
    let procurementFee = 1500; // Base fee
    if (itemsSubtotal > 30000) {
        procurementFee = 5000;
    } else if (itemsSubtotal > 20000) {
        procurementFee = 3500;
    } else if (itemsSubtotal > 10000) {
        procurementFee = 2500;
    }
    
    // Calculate total
    const total = itemsSubtotal + deliveryFee + procurementFee;
    
    console.log('Breakdown:', { itemsSubtotal, deliveryFee, procurementFee, total });
    
    // Update display with animation
    updatePriceDisplay('itemsSubtotal', itemsSubtotal);
    updatePriceDisplay('deliveryFee', deliveryFee);
    updatePriceDisplay('procurementFee', procurementFee);
    updatePriceDisplay('totalPrice', total);
}

// Helper function to update price display with formatting
function updatePriceDisplay(elementId, amount) {
    const element = document.getElementById(elementId);
    if (element) {
        const formatted = '₦' + amount.toLocaleString('en-NG');
        
        // Add animation class
        element.style.transition = 'all 0.3s ease';
        element.style.transform = 'scale(1.1)';
        element.textContent = formatted;
        
        // Reset animation
        setTimeout(() => {
            element.style.transform = 'scale(1)';
        }, 300);
    }
}

// Format currency for Nigerian Naira
function formatCurrency(amount) {
    return '₦' + amount.toLocaleString('en-NG');
}

// Initialize shopping list with default rows
document.addEventListener('DOMContentLoaded', function() {
    // Add 3 initial rows
    for (let i = 0; i < 3; i++) {
        addItemRow();
    }
    calculateTotal();
});

// Add new item row
let itemRowCounter = 0;
function addItemRow() {
    itemRowCounter++;
    const container = document.getElementById('itemsContainer');
    
    const row = document.createElement('div');
    row.className = 'item-row';
    row.id = `item-row-${itemRowCounter}`;
    
    row.innerHTML = `
        <input 
            type="text" 
            class="item-description-input" 
            placeholder="e.g., 2 kg Fresh Tomatoes, 1 bunch Ugwu"
            data-row-id="${itemRowCounter}"
        />
        <input 
            type="number" 
            class="item-price-input" 
            placeholder="₦0" 
            min="0" 
            step="100"
            data-row-id="${itemRowCounter}"
            oninput="calculateTotal()"
        />
        <button type="button" class="btn-remove-item" onclick="removeItemRow(${itemRowCounter})" title="Remove item">
            <i class="fas fa-trash"></i>
        </button>
    `;
    
    container.appendChild(row);
    
    // Focus on the new item description input
    const newInput = row.querySelector('.item-description-input');
    if (newInput) {
        newInput.focus();
    }
}

// Remove item row
function removeItemRow(rowId) {
    const row = document.getElementById(`item-row-${rowId}`);
    if (row) {
        row.style.transition = 'all 0.3s ease';
        row.style.opacity = '0';
        row.style.transform = 'translateX(-20px)';
        
        setTimeout(() => {
            row.remove();
            calculateTotal();
            
            // If no rows left, add one
            const container = document.getElementById('itemsContainer');
            if (container.children.length === 0) {
                addItemRow();
            }
        }, 300);
    }
}

// Get all shopping items for form submission
function getShoppingItems() {
    const items = [];
    const rows = document.querySelectorAll('.item-row');
    
    rows.forEach(row => {
        const description = row.querySelector('.item-description-input')?.value.trim();
        const price = parseFloat(row.querySelector('.item-price-input')?.value) || 0;
        
        if (description) {
            items.push({
                description: description,
                estimatedPrice: price
            });
        }
    });
    
    return items;
}