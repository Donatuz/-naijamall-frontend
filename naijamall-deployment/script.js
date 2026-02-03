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

// Shop from Platform button
const shopFromPlatform = document.getElementById('shopFromPlatform');
if (shopFromPlatform) {
    shopFromPlatform.addEventListener('click', () => {
        document.querySelector('#shop').scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
}

// Shop from Agent button
const shopFromAgent = document.getElementById('shopFromAgent');
if (shopFromAgent) {
    shopFromAgent.addEventListener('click', () => {
        alert('Contact our agents:\n📞 +2348137790780\n📧 naijamall.contact@gmail.com\n\nOur professional agents are ready to shop for you at Lagos markets!');
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