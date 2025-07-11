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
                    
                    <!-- Search Within Results -->
                    <div class="filter-group search-within">
                        <input type="text" placeholder="Search within results...">
                        <button><i class="fas fa-search"></i></button>
                    </div>
                    
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
                    
                    <!-- Order Options -->
                    <div class="filter-group">
                        <h4>Order Options</h4>
                        <div class="order-options">
                            <label class="checkbox-container">Same-day Delivery
                                <input type="checkbox">
                                <span class="checkmark"></span>
                            </label>
                            <label class="checkbox-container">Bulk Discounts
                                <input type="checkbox">
                                <span class="checkmark"></span>
                            </label>
                            <label class="checkbox-container">Subscription Available
                                <input type="checkbox">
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
                    <!-- Product Card 1 -->
                    <div class="product-card">
                        <div class="product-badges">
                            <span class="badge organic">Organic</span>
                            <span class="badge discount">-15%</span>
                        </div>
                        <div class="product-image">
                            <img src="../../assets/images/product1.jpg" alt="Fresh Apples">
                            <button class="wishlist-btn"><i class="far fa-heart"></i></button>
                        </div>
                        <div class="product-info">
                            <h3>Fresh Red Apples</h3>
                            <div class="price">
                                <span class="current-price">R 55 / 10kg</span>
                                <span class="original-price">R 65</span>
                            </div>
                            <div class="supplier-info">
                                <div class="rating">
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star-half-alt"></i>
                                    <span>4.5</span>
                                </div>
                                <div class="supplier-name">Farm Fresh Co.</div>
                                <div class="supplier-location"><i class="fas fa-map-marker-alt"></i> 15km away</div>
                            </div>
                            <div class="product-actions">
                                <button class="view-btn">View Details</button>
                                <button class="cart-btn"><i class="fas fa-cart-plus"></i></button>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Product Card 2 -->
                    <div class="product-card">
                        <div class="product-badges">
                            <span class="badge local">Local</span>
                        </div>
                        <div class="product-image">
                            <img src="https://tse4.mm.bing.net/th/id/OIP.jNvLzjm9bZSCJKKjiZL2AQAAAA?rs=1&pid=ImgDetMain&o=7&rm=3" alt="Organic Tomatoes">
                            <button class="wishlist-btn"><i class="far fa-heart"></i></button>
                        </div>
                        <div class="product-info">
                            <h3>Organic Tomatoes</h3>
                            <div class="price">
                                <span class="current-price">R 45 / 5kg</span>
                            </div>
                            <div class="supplier-info">
                                <div class="rating">
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="far fa-star"></i>
                                    <span>4.0</span>
                                </div>
                                <div class="supplier-name">Green Valley Farms</div>
                                <div class="supplier-location"><i class="fas fa-map-marker-alt"></i> 8km away</div>
                            </div>
                            <div class="product-actions">
                                <button class="view-btn">View Details</button>
                                <button class="cart-btn"><i class="fas fa-cart-plus"></i></button>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Product Card 3 -->
                    <div class="product-card">
                        <div class="product-badges">
                            <span class="badge bulk">Bulk Deal</span>
                        </div>
                        <div class="product-image">
                            <img src="https://th.bing.com/th/id/R.2a211c11dab40396b01d0129693c27d6?rik=YQM%2fl2ZuC0I3ug&pid=ImgRaw&r=0" alt="Sweet Corn">
                            <button class="wishlist-btn"><i class="far fa-heart"></i></button>
                        </div>
                        <div class="product-info">
                            <h3>Sweet Corn</h3>
                            <div class="price">
                                <span class="current-price">R 30 / 5kg</span>
                            </div>
                            <div class="supplier-info">
                                <div class="rating">
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <span>5.0</span>
                                </div>
                                <div class="supplier-name">Sunshine Farms</div>
                                <div class="supplier-location"><i class="fas fa-map-marker-alt"></i> 22km away</div>
                            </div>
                            <div class="product-actions">
                                <button class="view-btn">View Details</button>
                                <button class="cart-btn"><i class="fas fa-cart-plus"></i></button>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Product Card 4 -->
                    <div class="product-card">
                        <div class="product-image">
                            <img src="https://tse3.mm.bing.net/th/id/OIP.TpObdWh6guNQhi4Rldc5YwHaHa?rs=1&pid=ImgDetMain&o=7&rm=3" alt="Fresh Potatoes">
                            <button class="wishlist-btn"><i class="far fa-heart"></i></button>
                        </div>
                        <div class="product-info">
                            <h3>Fresh Potatoes</h3>
                            <div class="price">
                                <span class="current-price">R 50 / 10kg</span>
                            </div>
                            <div class="supplier-info">
                                <div class="rating">
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star-half-alt"></i>
                                    <span>4.5</span>
                                </div>
                                <div class="supplier-name">Mountain View Produce</div>
                                <div class="supplier-location"><i class="fas fa-map-marker-alt"></i> 35km away</div>
                            </div>
                            <div class="product-actions">
                                <button class="view-btn">View Details</button>
                                <button class="cart-btn"><i class="fas fa-cart-plus"></i></button>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Product Card 5 -->
                    <div class="product-card">
                        <div class="product-badges">
                            <span class="badge new">New</span>
                        </div>
                        <div class="product-image">
                            <img src="https://tse1.mm.bing.net/th/id/OIP.cc1fmrVHT-YDXEVia6rsUwHaHa?rs=1&pid=ImgDetMain&o=7&rm=3" alt="Carrots">
                            <button class="wishlist-btn"><i class="far fa-heart"></i></button>
                        </div>
                        <div class="product-info">
                            <h3>Fresh Carrots</h3>
                            <div class="price">
                                <span class="current-price">R 40 / 5kg</span>
                            </div>
                            <div class="supplier-info">
                                <div class="rating">
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="far fa-star"></i>
                                    <span>4.0</span>
                                </div>
                                <div class="supplier-name">Riverbend Farms</div>
                                <div class="supplier-location"><i class="fas fa-map-marker-alt"></i> 18km away</div>
                            </div>
                            <div class="product-actions">
                                <button class="view-btn">View Details</button>
                                <button class="cart-btn"><i class="fas fa-cart-plus"></i></button>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Product Card 6 -->
                    <div class="product-card">
                        <div class="product-badges">
                            <span class="badge subscription">Subscribe</span>
                        </div>
                        <div class="product-image">
                            <img src="https://tse2.mm.bing.net/th/id/OIP.VtUhSp-QUNbW2daMC1JWYQHaF3?rs=1&pid=ImgDetMain&o=7&rm=3" alt="Avocados">
                            <button class="wishlist-btn active"><i class="fas fa-heart"></i></button>
                        </div>
                        <div class="product-info">
                            <h3>Hass Avocados</h3>
                            <div class="price">
                                <span class="current-price">R 90 / 5kg</span>
                            </div>
                            <div class="supplier-info">
                                <div class="rating">
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star-half-alt"></i>
                                    <span>4.5</span>
                                </div>
                                <div class="supplier-name">Tropical Delights</div>
                                <div class="supplier-location"><i class="fas fa-map-marker-alt"></i> 42km away</div>
                            </div>
                            <div class="product-actions">
                                <button class="view-btn">View Details</button>
                                <button class="cart-btn"><i class="fas fa-cart-plus"></i></button>
                            </div>
                        </div>
                    </div>
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

    <script src="../../scripts/farmers-near.js"></script>

</body>
</html>