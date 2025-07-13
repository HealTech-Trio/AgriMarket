<?php 
/*
 * Buyer Dashboard - UI Mockup
 * File: buyer.php
 * Description: Buyer dashboard interface for authenticated users

 */
?> 
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Dashboard | AgriMarket</title>
    <link rel="stylesheet" href="../../stylesheets/main.css">
    <link rel="stylesheet" href="../../stylesheets/buyer.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/lipis/flag-icons@7.3.2/css/flag-icons.min.css" />
</head>
<body>
    <!-- Buyer Dashboard Header -->
    <header class="buyer-header">
        <div class="container">
            <div class="logo">
                <i class="fas fa-seedling"></i>
                <a href="buyer.php">AgriMarket</a>
            </div>
            
            <!-- Buyer Navigation -->
            <nav class="buyer-nav">
                <ul class="main-links">
                    <li><a href="#" class="active"><i class="fas fa-home"></i> Home</a></li>
                    <li><a href="#"><i class="fas fa-search"></i> Discover</a></li>
                    <li><a href="#" class="farmers-near"><i class="fas fa-store"></i> Farmers</a></li>
                    <li><a href="#"><i class="fas fa-tag"></i> Deals</a></li>
                </ul>
                
                <ul class="user-links">                    
                    <!-- Currency Switcher -->
                    <li class="currency-switcher">
                        <a href="#">
                            <i class="fas fa-globe"></i>
                            <span>ZAR</span>
                            <i class="fas fa-chevron-down"></i>
                        </a>
                        <div class="dropdown-menu">
                            <a href="#">
                                ZAR
                                <span class="dropdown-flag"><span class="fi fi-za"></span></span>
                            </a>
                            <a href="#">
                                USD
                                <span class="dropdown-flag"><span class="fi fi-us"></span></span>
                            </a>
                            <a href="#">
                                EUR
                                <span class="dropdown-flag"><span class="fi fi-eu"></span></span>
                            </a>
                        </div>
                    </li>
                    
                    <!-- Customer Support -->
                    <li class="support-link">
                        <a href="#">
                            <i class="fas fa-headset"></i>
                        </a>
                    </li>
                    
                    <!-- Shopping Cart -->
                    <li class="cart-link">
                        <a href="#">
                            <i class="fas fa-shopping-cart"></i>
                            <span class="cart-count">3</span>
                        </a>
                    </li>
                    
                    <!-- User Profile -->
                    <li class="user-profile">
                        <a href="#">
                            <div class="avatar">
                                <img src="../../assets/images/josh.jpg" alt="User Avatar">
                            </div>
                            <span>My Account</span>
                            <i class="fas fa-chevron-down"></i>
                        </a>
                        <div class="dropdown-menu">
                            <a href="#"><i class="fas fa-user"></i> My Profile</a>
                            <a href="#"><i class="fas fa-box"></i> My Orders</a>
                            <a href="#"><i class="fas fa-tag"></i> My Coupons</a>
                            <a href="#"><i class="fas fa-coins"></i> My Points</a>
                            <div class="divider"></div>
                            <a href="#"><i class="fas fa-exchange-alt"></i> Switch Accounts</a>
                            <a href="#"><i class="fas fa-sign-out-alt"></i> Sign Out</a>
                        </div>
                    </li>
                </ul>
            </nav>
        </div>
    </header>

    <!-- Buyer Dashboard Content -->
    <main class="buyer-content">

        <!-- Farmers Near Me Content -->
        <section class="farmers-near-container" style="display: none;">
            <div class="container">
                <div class="farmers-near-wrapper">
                    <!-- Fixed Search and Sort Bar -->
                    <div class="farmers-search-sort">
                        <div class="farmers-search">
                            <input type="text" placeholder="Search farmers by name or location...">
                            <button><i class="fas fa-search"></i></button>
                        </div>
                        <div class="farmers-sort">
                            <span>Sort by:</span>
                            <select>
                                <option>Distance (nearest first)</option>
                                <option>Rating (highest first)</option>
                                <option>Alphabetical (A-Z)</option>
                            </select>
                        </div>
                    </div>
                    
                    <!-- Farmers List and Map -->
                    <div class="farmers-content">
                        <!-- Farmers List Sidebar -->
                        <aside class="farmers-sidebar">
                            <div class="farmers-list">
                                <!-- Farmer Card 1 -->
                                <div class="farmer-card">
                                    <div class="farmer-avatar">
                                        <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Farmer Avatar">
                                        <span class="farmer-status online"></span>
                                    </div>
                                    <div class="farmer-info">
                                        <h3>Green Valley Organic Farm</h3>
                                        <div class="farmer-meta">
                                            <span class="farmer-rating">
                                                <i class="fas fa-star"></i> 4.8 (124)
                                            </span>
                                            <span class="farmer-distance">
                                                <i class="fas fa-map-marker-alt"></i> 2.5 km away
                                            </span>
                                        </div>
                                        <div class="farmer-specialties">
                                            <span class="specialty">Organic</span>
                                            <span class="specialty">Vegetables</span>
                                            <span class="specialty">Dairy</span>
                                        </div>
                                    </div>
                                </div>
                                
                                <!-- Farmer Card 2 -->
                                <div class="farmer-card">
                                    <div class="farmer-avatar">
                                        <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Farmer Avatar">
                                        <span class="farmer-status offline"></span>
                                    </div>
                                    <div class="farmer-info">
                                        <h3>Sunshine Fruit Orchards</h3>
                                        <div class="farmer-meta">
                                            <span class="farmer-rating">
                                                <i class="fas fa-star"></i> 4.6 (89)
                                            </span>
                                            <span class="farmer-distance">
                                                <i class="fas fa-map-marker-alt"></i> 5.1 km away
                                            </span>
                                        </div>
                                        <div class="farmer-specialties">
                                            <span class="specialty">Fruits</span>
                                            <span class="specialty">Juices</span>
                                            <span class="specialty">Jam</span>
                                        </div>
                                    </div>
                                </div>
                                
                                <!-- Farmer Card 3 -->
                                <div class="farmer-card">
                                    <div class="farmer-avatar">
                                        <img src="https://randomuser.me/api/portraits/men/67.jpg" alt="Farmer Avatar">
                                        <span class="farmer-status online"></span>
                                    </div>
                                    <div class="farmer-info">
                                        <h3>Mountain View Dairy</h3>
                                        <div class="farmer-meta">
                                            <span class="farmer-rating">
                                                <i class="fas fa-star"></i> 4.9 (156)
                                            </span>
                                            <span class="farmer-distance">
                                                <i class="fas fa-map-marker-alt"></i> 7.8 km away
                                            </span>
                                        </div>
                                        <div class="farmer-specialties">
                                            <span class="specialty">Dairy</span>
                                            <span class="specialty">Cheese</span>
                                            <span class="specialty">Yogurt</span>
                                        </div>
                                    </div>
                                </div>
                                
                                <!-- Farmer Card 4 -->
                                <div class="farmer-card">
                                    <div class="farmer-avatar">
                                        <img src="https://randomuser.me/api/portraits/women/28.jpg" alt="Farmer Avatar">
                                        <span class="farmer-status online"></span>
                                    </div>
                                    <div class="farmer-info">
                                        <h3>Riverbend Poultry Farm</h3>
                                        <div class="farmer-meta">
                                            <span class="farmer-rating">
                                                <i class="fas fa-star"></i> 4.7 (102)
                                            </span>
                                            <span class="farmer-distance">
                                                <i class="fas fa-map-marker-alt"></i> 12.3 km away
                                            </span>
                                        </div>
                                        <div class="farmer-specialties">
                                            <span class="specialty">Eggs</span>
                                            <span class="specialty">Poultry</span>
                                            <span class="specialty">Organic</span>
                                        </div>
                                    </div>
                                </div>
                                
                                <!-- Farmer Card 5 -->
                                <div class="farmer-card">
                                    <div class="farmer-avatar">
                                        <img src="https://randomuser.me/api/portraits/men/53.jpg" alt="Farmer Avatar">
                                        <span class="farmer-status offline"></span>
                                    </div>
                                    <div class="farmer-info">
                                        <h3>Golden Grain Fields</h3>
                                        <div class="farmer-meta">
                                            <span class="farmer-rating">
                                                <i class="fas fa-star"></i> 4.5 (76)
                                            </span>
                                            <span class="farmer-distance">
                                                <i class="fas fa-map-marker-alt"></i> 15.6 km away
                                            </span>
                                        </div>
                                        <div class="farmer-specialties">
                                            <span class="specialty">Grains</span>
                                            <span class="specialty">Flour</span>
                                            <span class="specialty">Bread</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </aside>
                        
                        <!-- Farmers Map -->
                        <div class="farmers-map">
                            <div class="map-placeholder">
                                <i class="fas fa-map-marked-alt"></i>
                                <h3>Interactive Farmers Map</h3>
                                <p>Farmers locations will be displayed here with markers</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <div class="container">
            <!-- Sidebar Filters -->
            <aside class="buyer-sidebar">
                <div class="filter-section">
                    <h3>Filters <button class="clear-btn">Clear All</button></h3>
                    
                    <!-- Price Range -->
                    <div class="filter-group">
                        <h4>Price Range (ZAR)</h4>
                        <div class="price-range">
                            <input type="number" placeholder="Min" min="0">
                            <span>-</span>
                            <input type="number" placeholder="Max" min="0">
                        </div>
                    </div>
                    
                    <!-- Supplier Location -->
                    <div class="filter-group">
                        <h4>Supplier Location</h4>
                        <div class="location-options">
                            <label class="checkbox-container">Within 50km
                                <input type="checkbox" checked>
                                <span class="checkmark"></span>
                            </label>
                            <label class="checkbox-container">My Province
                                <input type="checkbox">
                                <span class="checkmark"></span>
                            </label>
                        </div>
                        <select>
                            <option>All Provinces</option>
                            <option>Gauteng</option>
                            <option>Western Cape</option>
                            <option>KwaZulu-Natal</option>
                            <option>Eastern Cape</option>
                        </select>
                    </div>
                    
                    <!-- Product Category -->
                    <div class="filter-group">
                        <h4>Product Category</h4>
                        <ul class="category-list">
                            <li><a href="#" class="active">All Categories</a></li>
                            <li><a href="#">Fruits</a></li>
                            <li><a href="#">Vegetables</a></li>
                            <li><a href="#">Grains</a></li>
                            <li><a href="#">Dairy</a></li>
                            <li><a href="#">Meat</a></li>
                            <li><a href="#">Herbs</a></li>
                            <li><a href="#">Organic</a></li>
                        </ul>
                    </div>
                    
                    <!-- Seller Rating -->
                    <div class="filter-group">
                        <h4>Seller Rating</h4>
                        <div class="rating-options">
                            <label class="checkbox-container">4★ & above
                                <input type="checkbox" checked>
                                <span class="checkmark"></span>
                            </label>
                            <label class="checkbox-container">3★ & above
                                <input type="checkbox">
                                <span class="checkmark"></span>
                            </label>
                            <label class="checkbox-container">Verified Sellers
                                <input type="checkbox" checked>
                                <span class="checkmark"></span>
                            </label>
                        </div>
                    </div>                    
                </div>
            </aside>

            <!-- Main Product Area -->
            <section class="buyer-products">
                <!-- Dashboard Summary -->
                <div class="dashboard-summary">
                    <div class="welcome-banner">
                        <h2>Welcome back, Thando!</h2>
                        <p>Fresh produce from local farmers near you</p>
                    </div>
                    
                    <div class="quick-stats">
                        <div class="stat-card">
                            <i class="fas fa-box-open"></i>
                            <div>
                                <h3>3</h3>
                                <p>Active Orders</p>
                            </div>
                        </div>
                        <div class="stat-card">
                            <i class="fas fa-heart"></i>
                            <div>
                                <h3>12</h3>
                                <p>Saved Items</p>
                            </div>
                        </div>
                        <div class="stat-card">
                            <i class="fas fa-truck"></i>
                            <div>
                                <h3>2</h3>
                                <p>Deliveries Today</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Product Grid Header -->
                <div class="product-grid-header">
                    <h3>Recommended For You</h3>
                    <div class="view-options">
                        <div class="sort-by">
                            <span>Sort by:</span>
                            <select>
                                <option>Recommended</option>
                                <option>Price: Low to High</option>
                                <option>Price: High to Low</option>
                                <option>Newest Arrivals</option>
                                <option>Top Rated</option>
                            </select>
                        </div>
                        <div class="view-toggle">
                            <button class="active"><i class="fas fa-th"></i></button>
                            <button><i class="fas fa-list"></i></button>
                        </div>
                    </div>
                </div>
                
                <!-- Product Grid -->
                <div class="product-grid compact-view">
                    
                </div>
                
                <!-- Pagination -->
                <div class="pagination">
                    <a href="#"><i class="fas fa-chevron-left"></i></a>
                    <a href="#" class="active">1</a>
                    <a href="#">2</a>
                    <a href="#">3</a>
                    <a href="#"><i class="fas fa-chevron-right"></i></a>
                </div>
            </section>
        </div>

        <!-- Cart Content  -->
        <section class="cart-container" style="display: none;">
            <div class="container">
                <div class="cart-header">
                    <h2><i class="fas fa-shopping-cart"></i> Your Cart</h2>
                    <span class="cart-count">3 items</span>
                </div>
                
                <div class="cart-wrapper">
                    <!-- Left Side - Cart Items -->
                    <div class="cart-items">
                        <!-- Seller Group 1 -->
                        <div class="seller-group">
                            <div class="seller-header">
                                <div class="seller-avatar">
                                    <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Seller">
                                </div>
                                <h3>Green Valley Organic Farm</h3>
                            </div>
                            
                            <!-- Cart Item 1 -->
                            <div class="cart-item">
                                <div class="item-image">
                                    <img src="https://static4.depositphotos.com/1020804/343/i/950/depositphotos_3434099-stock-photo-fruits.jpg" alt="Product">
                                </div>
                                <div class="item-details">
                                    <h4>Fresh Red Apples</h4>
                                    <div class="item-meta">
                                        <span class="item-category">Fruits</span>
                                        <span class="item-weight">10kg</span>
                                    </div>
                                    <div class="item-price">
                                        <span class="current-price">R 55.00</span>
                                        <span class="original-price">R 65.00</span>
                                    </div>
                                </div>
                                <div class="item-actions">
                                    <div class="quantity-control">
                                        <button class="quantity-btn minus">-</button>
                                        <input type="number" value="2" min="1" class="quantity-input">
                                        <button class="quantity-btn plus">+</button>
                                    </div>
                                    <div class="item-total">
                                        R 110.00
                                    </div>
                                    <button class="remove-btn"><i class="fas fa-trash-alt"></i></button>
                                </div>
                            </div>
                            
                            <!-- Cart Item 2 -->
                            <div class="cart-item">
                                <div class="item-image">
                                    <img src="https://tse3.mm.bing.net/th/id/OIP.CyJLvdoWCD8uETyeCKrniAHaEo?rs=1&pid=ImgDetMain&o=7&rm=3" alt="Product">
                                </div>
                                <div class="item-details">
                                    <h4>Organic Tomatoes</h4>
                                    <div class="item-meta">
                                        <span class="item-category">Vegetables</span>
                                        <span class="item-weight">5kg</span>
                                    </div>
                                    <div class="item-price">
                                        <span class="current-price">R 45.00</span>
                                    </div>
                                </div>
                                <div class="item-actions">
                                    <div class="quantity-control">
                                        <button class="quantity-btn minus">-</button>
                                        <input type="number" value="1" min="1" class="quantity-input">
                                        <button class="quantity-btn plus">+</button>
                                    </div>
                                    <div class="item-total">
                                        R 45.00
                                    </div>
                                    <button class="remove-btn"><i class="fas fa-trash-alt"></i></button>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Seller Group 2 -->
                        <div class="seller-group">
                            <div class="seller-header">
                                <div class="seller-avatar">
                                    <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Seller">
                                </div>
                                <h3>Sunshine Fruit Orchards</h3>
                            </div>
                            
                            <!-- Cart Item 3 -->
                            <div class="cart-item">
                                <div class="item-image">
                                    <img src="https://tse2.mm.bing.net/th/id/OIP._ZMHcD5rUmHNE0c3NuRDIgHaE7?w=2000&h=1333&rs=1&pid=ImgDetMain&o=7&rm=3" alt="Product">
                                </div>
                                <div class="item-details">
                                    <h4>Hass Avocados</h4>
                                    <div class="item-meta">
                                        <span class="item-category">Fruits</span>
                                        <span class="item-weight">5kg</span>
                                    </div>
                                    <div class="item-price">
                                        <span class="current-price">R 90.00</span>
                                    </div>
                                </div>
                                <div class="item-actions">
                                    <div class="quantity-control">
                                        <button class="quantity-btn minus">-</button>
                                        <input type="number" value="1" min="1" class="quantity-input">
                                        <button class="quantity-btn plus">+</button>
                                    </div>
                                    <div class="item-total">
                                        R 90.00
                                    </div>
                                    <button class="remove-btn"><i class="fas fa-trash-alt"></i></button>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Right Side - Order Summary -->
                    <aside class="cart-summary">
                        <div class="summary-card">
                            <h3>Order Summary</h3>
                            <div class="summary-details">
                                <div class="summary-row">
                                    <span>Subtotal (3 items)</span>
                                    <span>R 245.00</span>
                                </div>
                                <div class="summary-row">
                                    <span>Delivery Fee</span>
                                    <span>R 25.00</span>
                                </div>
                                <div class="summary-row">
                                    <span>Estimated Tax</span>
                                    <span>R 30.75</span>
                                </div>
                                <div class="summary-divider"></div>
                                <div class="summary-row total">
                                    <span>Total</span>
                                    <span>R 300.75</span>
                                </div>
                            </div>
                            <button class="checkout-btn">Proceed to Checkout</button>
                            <div class="secure-checkout">
                                <i class="fas fa-lock"></i>
                                <span>Secure Checkout</span>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </section>
    </main>

    <!-- Footer Section -->
    <footer class="footer">
        <div class="container">
            <div class="footer-content">
                <div class="footer-section about">
                    <h3>About AgriMarket</h3>
                    <p>Connecting rural farmers directly with urban consumers, restaurants, and retailers to enable fair pricing, reduce waste, and promote transparent food sourcing.</p>
                </div>
                <div class="footer-section links">
                    <h3>Quick Links</h3>
                    <ul>
                        <li><a href="#">Home</a></li>
                        <li><a href="#">My Orders</a></li>
                        <li><a href="#" class="farmers-near">Farmers Near Me</a></li>
                        <li><a href="#">Deals</a></li>
                        <li><a href="#">Contact</a></li>
                    </ul>
                </div>
                <div class="footer-section contact">
                    <h3>Help & Support</h3>
                    <ul>
                        <li><a href="#">Help Center</a></li>
                        <li><a href="#">Shipping Info</a></li>
                        <li><a href="#">Returns & Refunds</a></li>
                        <li><a href="#">Contact Support</a></li>
                    </ul>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2025 AgriMarket. All Rights Reserved. | <a href="#">Terms of Service</a> | <a href="#">Privacy Policy</a></p>
            </div>
        </div>
    </footer>

    <script src="../../scripts/buyer.js"></script>
    <script src="../../scripts/farmers-near.js"></script>
    <script src="../../scripts/cart.js"></script>
</body>
</html>