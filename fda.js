// Menu Items Data
const menuItems = [
    {
        id: 1,
        name: "Margherita Pizza",
        category: "pizza",
        price: 299,
        image: "https://images.unsplash.com/photo-1604382355076-af4b0eb60143",
        description: "Fresh tomatoes, mozzarella, basil, olive oil"
    },
    {
        id: 2,
        name: "Pepperoni Pizza",
        category: "pizza",
        price: 349,
        image: "https://images.unsplash.com/photo-1628840042765-356cda07504e",
        description: "Pepperoni, cheese, tomato sauce"
    },
    {
        id: 3,
        name: "Classic Burger",
        category: "burger",
        price: 199,
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
        description: "Beef patty, lettuce, tomato, cheese"
    },
    {
        id: 4,
        name: "Chicken Burger",
        category: "burger",
        price: 179,
        image: "https://images.unsplash.com/photo-1615297928064-24977384d0da",
        description: "Grilled chicken, mayo, lettuce"
    },
    {
        id: 5,
        name: "Pad Thai",
        category: "asian",
        price: 249,
        image: "https://images.unsplash.com/photo-1559314809-0d155014e29e",
        description: "Rice noodles, shrimp, peanuts"
    },
    {
        id: 6,
        name: "Sushi Roll",
        category: "asian",
        price: 399,
        image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c",
        description: "Fresh salmon, avocado, rice"
    },
    {
        id: 7,
        name: "Chocolate Cake",
        category: "dessert",
        price: 149,
        image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587",
        description: "Rich chocolate layers with frosting"
    },
    {
        id: 8,
        name: "Ice Cream Sundae",
        category: "dessert",
        price: 129,
        image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb",
        description: "Vanilla ice cream with toppings"
    }
];

// Cart functionality
let cart = [];

// DOM Elements
const menuItemsContainer = document.querySelector('.menu-items');
const cartCount = document.querySelector('.cart-count');
const cartModal = document.getElementById('cartModal');
const closeCart = document.querySelector('.close');
const cartItemsContainer = document.querySelector('.cart-items');
const cartTotal = document.getElementById('cartTotal');
const checkoutBtn = document.getElementById('checkoutBtn');

// Authentication Modal
const authModal = document.getElementById('authModal');
const profileBtn = document.getElementById('profileBtn');
const authTabs = document.querySelectorAll('.auth-tab');
const authForms = document.querySelectorAll('.auth-form');

profileBtn.addEventListener('click', () => {
    authModal.style.display = 'block';
});

// Handle auth tab switching
authTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Remove active class from all tabs and forms
        authTabs.forEach(t => t.classList.remove('active'));
        authForms.forEach(f => f.classList.remove('active'));
        
        // Add active class to clicked tab and corresponding form
        tab.classList.add('active');
        document.querySelector(`#${tab.dataset.tab}Form`).classList.add('active');
    });
});

// Handle sign in form submission
document.getElementById('signinForm').addEventListener('submit', (e) => {
    e.preventDefault();
    authModal.style.display = 'none';
    showNotification('Signed in successfully!');
    clearAuthForm('signinForm');
});

// Handle sign up form submission
document.getElementById('signupForm').addEventListener('submit', (e) => {
    e.preventDefault();
    authModal.style.display = 'none';
    showNotification('Signed up successfully!');
    clearAuthForm('signupForm');
});

// Display Menu Items
function displayMenuItems(items = menuItems) {
    menuItemsContainer.innerHTML = items.map(item => `
        <div class="menu-item" data-category="${item.category}">
            <img src="${item.image}" alt="${item.name}">
            <h3>${item.name}</h3>
            <p>${item.description}</p>
            <div class="item-footer">
                <span class="price">₹${item.price}</span>
                <button onclick="addToCart(${item.id})" class="add-to-cart">Add to Cart</button>
            </div>
        </div>
    `).join('');
}

// Add to Cart
function addToCart(itemId) {
    const item = menuItems.find(item => item.id === itemId);
    const existingItem = cart.find(cartItem => cartItem.id === itemId);
    
    if (existingItem) {
        existingItem.quantity = (existingItem.quantity || 1) + 1;
    } else {
        cart.push({ ...item, quantity: 1 });
    }
    
    updateCartCount();
    showNotification('Item added to cart!');
}

// Update Cart Count
function updateCartCount() {
    cartCount.textContent = cart.length;
}

// Show Cart Modal
document.querySelector('.cart-icon').addEventListener('click', () => {
    displayCartItems();
    cartModal.style.display = 'block';
});

// Close Cart Modal
closeCart.addEventListener('click', () => {
    cartModal.style.display = 'none';
});

// Display Cart Items
function displayCartItems() {
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-basket"></i>
                <p>Your cart is empty</p>
            </div>
        `;
    } else {
        cartItemsContainer.innerHTML = cart.map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="item-details">
                    <h4>${item.name}</h4>
                    <p class="price">₹${item.price}</p>
                    <div class="quantity-controls">
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                        <span class="quantity">${item.quantity || 1}</span>
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                    </div>
                </div>
                <button onclick="removeFromCart(${item.id})" class="remove-btn">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `).join('');
    }
    
    updateCartTotal();
}

// Update Cart Total
function updateCartTotal() {
    const total = cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
    cartTotal.textContent = `₹${total.toFixed(2)}`;
}

// Initialize the website
document.addEventListener('DOMContentLoaded', () => {
    displayMenuItems();
});

// Add this new function for category filtering
document.querySelectorAll('.category-btn').forEach(button => {
    button.addEventListener('click', () => {
        const category = button.dataset.category;
        
        // Update active button
        document.querySelectorAll('.category-btn').forEach(btn => 
            btn.classList.remove('active'));
        button.classList.add('active');
        
        // Filter items
        const filteredItems = category === 'all' 
            ? menuItems 
            : menuItems.filter(item => item.category === category);
        
        displayMenuItems(filteredItems);
    });
}); 

// Add this function after your existing JavaScript code
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Trigger animation
    setTimeout(() => notification.classList.add('show'), 100);
    
    // Remove notification
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 2000);
} 

// Add quantity update function
function updateQuantity(itemId, change) {
    const item = cart.find(item => item.id === itemId);
    if (item) {
        item.quantity = (item.quantity || 1) + change;
        if (item.quantity < 1) {
            removeFromCart(itemId);
        } else {
            displayCartItems();
        }
    }
} 

// Close modal when clicking on X or outside the modal
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        closeAllModals();
    }
}

// Close all modals function
function closeAllModals() {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.style.display = 'none';
    });
}

// Add event listeners to all close buttons
document.querySelectorAll('.close').forEach(closeBtn => {
    closeBtn.addEventListener('click', () => {
        closeAllModals();
    });
});

// Add this CSS for empty cart state
const additionalStyles = `
    .empty-cart {
        text-align: center;
        padding: 40px 20px;
        color: #666;
    }

    .empty-cart i {
        font-size: 3rem;
        color: #ddd;
        margin-bottom: 15px;
    }

    .cart-modal .modal-content {
        display: flex;
        flex-direction: column;
    }

    .cart-items {
        flex: 1;
        overflow-y: auto;
    }
`;

// Create and append style element
const styleSheet = document.createElement("style");
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// Add these functions to handle form clearing and cart removal

// Clear auth form fields
function clearAuthForm(formId) {
    document.getElementById(formId).reset();
}

// Handle sign in form submission with clearing
document.getElementById('signinForm').addEventListener('submit', (e) => {
    e.preventDefault();
    authModal.style.display = 'none';
    showNotification('Signed in successfully!');
    clearAuthForm('signinForm');
});

// Handle sign up form submission with clearing
document.getElementById('signupForm').addEventListener('submit', (e) => {
    e.preventDefault();
    authModal.style.display = 'none';
    showNotification('Signed up successfully!');
    clearAuthForm('signupForm');
});

// Add remove from cart function
function removeFromCart(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    updateCartCount();
    displayCartItems();
    showNotification('Item removed from cart!');
}

// Handle contact form submission
document.getElementById('contactForm').addEventListener('submit', (e) => {
    e.preventDefault();
    e.target.reset();
    showNotification('Message sent successfully!');
});

// Add checkout function
checkoutBtn.addEventListener('click', () => {
    if (cart.length > 0) {
        cartItemsContainer.innerHTML = `
            <div class="order-success">
                <i class="fas fa-check-circle"></i>
                <h3>Order Placed Successfully!</h3>
                <p>Thank you for your order.</p>
                <p>Please visit again!</p>
                <button onclick="closeOrderSuccess()" class="continue-shopping">Continue Shopping</button>
            </div>
        `;
        cart = [];
        updateCartCount();
        cartTotal.textContent = '₹0.00';
        checkoutBtn.style.display = 'none';
    }
});

// Close order success and reset cart
function closeOrderSuccess() {
    closeAllModals();
    checkoutBtn.style.display = 'block';
    displayCartItems();
}

// Theme Toggle Functionality
const themeToggle = document.getElementById('themeToggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// Check for saved theme preference or default to user's system preference
const currentTheme = localStorage.getItem('theme') || 
    (prefersDarkScheme.matches ? 'dark' : 'light');

// Set initial theme
document.documentElement.setAttribute('data-theme', currentTheme);

// Theme toggle event listener
themeToggle.addEventListener('click', () => {
    let theme = document.documentElement.getAttribute('data-theme');
    let newTheme = theme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Show notification
    showNotification(`${newTheme.charAt(0).toUpperCase() + newTheme.slice(1)} mode enabled`);
});

// Update notification style for dark mode
const notificationStyles = `
    .notification {
        background: var(--primary-color);
        color: white;
    }
`;

styleSheet.textContent += notificationStyles;