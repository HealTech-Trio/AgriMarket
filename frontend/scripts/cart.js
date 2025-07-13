document.addEventListener('DOMContentLoaded', function() {
    // Get cart elements
    const cartLinks = document.querySelectorAll('.cart-link');
    const mainContent = document.querySelector('.buyer-products');
    const cartContent = document.querySelector('.cart-container');
    const products_sidebar = document.querySelector('.buyer-sidebar');
    const farmersContent = document.querySelector('.farmers-near-container');

    // Initially hide cart content
    if (cartContent) {
        cartContent.style.display = 'none';
    }
    
    // Function to show cart
    function showCart() {
        if (mainContent) {
            mainContent.style.display = 'none';
            products_sidebar.style.display = 'none';
            farmersContent.style.display = 'none';
        }
        
        if (cartContent) {
            cartContent.style.display = 'block';
        }
        
        // Update active state in navigation
        const navLinks = document.querySelectorAll('.main-links a');
        navLinks.forEach(navLink => {
            navLink.classList.remove('active');
        });
        
        // Scroll to top
        window.scrollTo(0, 0);
    }
    
    // Add click event listeners to cart links
    cartLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            showCart();
        });
    });
    
    // Simulate quantity changes (for UI only)
    const minusButtons = document.querySelectorAll('.quantity-btn.minus');
    const plusButtons = document.querySelectorAll('.quantity-btn.plus');
    
    minusButtons.forEach(button => {
        button.addEventListener('click', function() {
            const input = this.nextElementSibling;
            if (input.value > 1) {
                input.value = parseInt(input.value) - 1;
                updateItemTotal(input);
            }
        });
    });
    
    plusButtons.forEach(button => {
        button.addEventListener('click', function() {
            const input = this.previousElementSibling;
            input.value = parseInt(input.value) + 1;
            updateItemTotal(input);
        });
    });
    
    // Simulate remove item (for UI only)
    const removeButtons = document.querySelectorAll('.remove-btn');
    removeButtons.forEach(button => {
        button.addEventListener('click', function() {
            this.closest('.cart-item').style.display = 'none';
            // In a real implementation, you would update the cart total here
        });
    });
    
    // Helper function to update item total (for demo only)
    function updateItemTotal(input) {
        const item = input.closest('.cart-item');
        const price = parseFloat(item.querySelector('.current-price').textContent.replace('R ', ''));
        const quantity = parseInt(input.value);
        const totalElement = item.querySelector('.item-total');
        totalElement.textContent = 'R ' + (price * quantity).toFixed(2);
    }
});