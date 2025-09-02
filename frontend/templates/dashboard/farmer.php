<?php
/*
 * Farmer Dashboard - UI Mockup
 * File: farmer.php
 * Description: Farmer dashboard interface for AgriMarket
 */
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Farmer Dashboard | AgriMarket</title>
    <link rel="stylesheet" href="../../stylesheets/farmer.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</head>
<body>
    <!-- Dashboard Container -->
    <div class="dashboard-container">
        <!-- Fixed Sidebar -->
        <aside class="sidebar">
            <div class="sidebar-header">
                <div class="profile">
                    <div class="profile-image">
                        <img src="../../assets/images/divine.png" alt="Farmer Profile">
                    </div>
                    <div class="profile-info">
                        <h3 class="user-name">Divin</h3>
                        <p>Farmer Account</p>
                    </div>
                </div>
            </div>
            
            <nav class="sidebar-menu">
                <ul>
                    <li class="active">
                        <a href="#dashboard">
                            <i class="fas fa-tachometer-alt"></i>
                            <span>Dashboard</span>
                        </a>
                    </li>
                    <li>
                        <a href="#upload">
                            <i class="fas fa-cloud-upload-alt"></i>
                            <span>Upload Product</span>
                        </a>
                    </li>
                    <li>
                        <a href="#products">
                            <i class="fas fa-box-open"></i>
                            <span>My Products</span>
                        </a>
                    </li>
                    <li>
                        <a href="#orders">
                            <i class="fas fa-clipboard-list"></i>
                            <span>Orders Received</span>
                        </a>
                    </li>
                    <li>
                        <a href="#feedback">
                            <i class="fas fa-star"></i>
                            <span>Rating & Feedback</span>
                        </a>
                    </li>
                    <li>
                        <a href="#billing">
                            <i class="fas fa-money-bill-wave"></i>
                            <span>Billing & Payments</span>
                        </a>
                    </li>
                    <li>
                        <a href="#profile">
                            <i class="fas fa-user"></i>
                            <span>My Profile</span>
                        </a>
                    </li>
                    <li class="logout">
                        <a href="#">
                            <i class="fas fa-sign-out-alt"></i>
                            <span>Sign Out</span>
                        </a>
                    </li>
                </ul>
            </nav>
        </aside>

        <!-- Main Content Area -->
        <main class="main-content">
            <!-- Fixed Header -->
            <header class="main-header">
                <div class="header-left">
                    <h1>Welcome back, <span class="user-name">Divin</span></h1>
                    <p>Here's what's happening with your farm today</p>
                </div>
                
                <div class="header-right">
                    <div class="header-actions">
                        <div class="notification">
                            <i class="fas fa-bell"></i>
                            <span class="badge">3</span>
                        </div>
                        
                        <div class="language-switcher">
                            <button class="dropdown-toggle">
                                <span class="fi fi-za"></span>
                                <span>ZAR</span>
                                <i class="fas fa-chevron-down"></i>
                            </button>
                            <div class="dropdown-menu">
                                <a href="#"><span class="fi fi-us"></span> USD</a>
                                <a href="#"><span class="fi fi-eu"></span> EUR</a>
                            </div>
                        </div>
                        
                        <div class="profile-dropdown">
                            <button class="dropdown-toggle">
                                <div class="avatar">
                                    <img src="../../assets/images/divine.png" alt="Profile">
                                </div>
                                <i class="fas fa-chevron-down"></i>
                            </button>
                            <div class="dropdown-menu">
                                <a href="#"><i class="fas fa-user-cog"></i> Settings</a>
                                <a href="#"><i class="fas fa-question-circle"></i> Help</a>
                                <div class="divider"></div>
                                <a href="#" class="logout"><i class="fas fa-sign-out-alt"></i> Sign Out</a>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <!-- Scrollable Content -->
            <div class="content-wrapper">
                <!-- Dashboard Overview -->
                <section class="content-section active" id="dashboard-content">
                    <div class="stats-grid">
                        <div class="stat-card stat-products">
                            <div class="stat-icon">
                                <i class="fas fa-boxes"></i>
                            </div>
                            <div class="stat-info">
                                <h3>24</h3>
                                <p>Total Products</p>
                            </div>
                        </div>
                        
                        <div class="stat-card stat-orders">
                            <div class="stat-icon">
                                <i class="fas fa-clipboard-list"></i>
                            </div>
                            <div class="stat-info">
                                <h3>8</h3>
                                <p>Pending Orders</p>
                            </div>
                        </div>
                        
                        <div class="stat-card stat-rating">
                            <div class="stat-icon">
                                <i class="fas fa-star"></i>
                            </div>
                            <div class="stat-info">
                                <h3>4.7</h3>
                                <p>Average Rating</p>
                            </div>
                        </div>
                        
                        <div class="stat-card stat-deliveries">
                            <div class="stat-icon">
                                <i class="fas fa-truck"></i>
                            </div>
                            <div class="stat-info">
                                <h3>15</h3>
                                <p>Deliveries This Month</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="quick-actions">
                        <h3>Quick Actions</h3>
                        <div class="actions-grid">
                            <a href="#upload" class="action-card">
                                <i class="fas fa-cloud-upload-alt"></i>
                                <span>Upload New Product</span>
                            </a>

                            <a href="#profile" class="action-card">
                                <i class="fas fa-user-edit"></i>
                                <span>Update Profile</span>
                            </a>
                            <a href="#agri-Assistant" class="action-card" id="assistant">
                                <i class="fas fa-robot"></i>
                                <span>Agri Assistant</span>
                            </a>
                            <a href="#support" class="action-card" id="supportTeam">
                                <i class="fas fa-headset"></i>
                                <span>Contact Support</span>
                            </a>
                        </div>
                    </div>

                    <div class="content-row">
                        <div class="chart-card">
                            <div class="card-header">
                                <h3>Sales Overview</h3>
                                <div class="time-filter">
                                    <button class="active">Week</button>
                                    <button>Month</button>
                                    <button>Year</button>
                                </div>
                            </div>
                            <div class="chart-placeholder">
                                <i class="fas fa-chart-line"></i>
                                <p>Sales chart will appear here</p>
                            </div>
                        </div>
                        
                        <div class="recent-orders">
                            <div class="card-header">
                                <h3>Recent Orders</h3>
                                <a href="#orders" class="view-all">View All</a>
                            </div>
                            <div class="orders-list">
                                <div class="order-item">
                                    <div class="order-info">
                                        <div class="order-id">#ORD-00125</div>
                                        <div class="order-buyer">Fresh Foods Market</div>
                                        <div class="order-date">Today, 10:45 AM</div>
                                    </div>
                                    <div class="order-status pending">Pending</div>
                                </div>
                                <div class="order-item">
                                    <div class="order-info">
                                        <div class="order-id">#ORD-00124</div>
                                        <div class="order-buyer">Green Restaurant</div>
                                        <div class="order-date">Yesterday, 2:30 PM</div>
                                    </div>
                                    <div class="order-status confirmed">Confirmed</div>
                                </div>
                                <div class="order-item">
                                    <div class="order-info">
                                        <div class="order-id">#ORD-00123</div>
                                        <div class="order-buyer">Organic Store</div>
                                        <div class="order-date">Yesterday, 9:15 AM</div>
                                    </div>
                                    <div class="order-status delivered">Delivered</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </section>
                
                <!-- Upload Product Section -->
                <section class="content-section" id="upload-content">
                    <div class="section-header">
                        <h2>Upload New Product</h2>
                        <p>Add your farm produce to the marketplace</p>
                    </div>
                    
                    <form class="product-form">
                        <div class="form-row">
                            <div class="form-group">
                                <label for="product-name">Product Name</label>
                                <input type="text" id="product-name" placeholder="e.g., Organic Tomatoes">
                            </div>
                            <div class="form-group">
                                <label for="product-category">Category</label>
                                <select id="product-category">
                                    <option value="" disabled selected>Select category</option>
                                    <option>Fruits</option>
                                    <option>Vegetables</option>
                                    <option>Grains</option>
                                    <option>Dairy</option>
                                    <option>Meat</option>
                                    <option>Herbs</option>
                                    <option>Organic</option>
                                </select>
                            </div>
                        </div>
                        
                        <div class="form-row">
                            <div class="form-group">
                                <label for="product-quantity">Quantity Available</label>
                                <div class="input-with-unit">
                                    <input type="number" id="product-quantity" placeholder="100">
                                    <select class="unit-select" id="quantity-unit">
                                        <option>kg</option>
                                        <option>g</option>
                                        <option>lbs</option>
                                        <option>units</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="product-price">Price</label>
                                <div class="input-with-currency">
                                    <span>R</span>
                                    <input type="number" id="product-price" placeholder="45.00">
                                    <span class="unit" id="price-unit">/kg</span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="form-group">
                            <label for="product-description">Description</label>
                            <textarea id="product-description" placeholder="Describe your product..."></textarea>
                        </div>
                        
                        <div class="form-group">
                            <label class="toggle-label" for="promotion-toggle">
                                <span>Enable Promotion</span>
                                <label class="toggle-switch">
                                    <input type="checkbox" id="promotion-toggle">
                                    <span class="slider"></span>
                                </label>
                            </label>
                        </div>
                        <div id="promotion-fields" style="display: none;">
                            <div class="form-group">
                                <label for="promotion-name">Promotion Name</label>
                                <input type="text" id="promotion-name" placeholder="e.g., Winter Sale">
                            </div>
                            <div class="form-row">
                                <div class="form-group">
                                    <label for="promotion-code">Promotion Code/Number</label>
                                    <input type="text" id="promotion-code" placeholder="e.g., WINTER2025">
                                </div>
                                <div class="form-group">
                                    <label for="promotion-type">Discount Type</label>
                                    <select id="promotion-type">
                                        <option value="percentage">Percentage (%)</option>
                                        <option value="amount">Fixed Amount</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label for="promotion-value">Discount Value</label>
                                    <input type="number" id="promotion-value" placeholder="e.g., 10">
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="form-group">
                                    <label for="promotion-start">Start Date</label>
                                    <input type="date" id="promotion-start">
                                </div>
                                <div class="form-group">
                                    <label for="promotion-end">End Date</label>
                                    <input type="date" id="promotion-end">
                                </div>
                            </div>
                        </div>

                        <div class="form-group">
                            <label>Product Images</label>
                            <div class="image-upload">
                                <div class="upload-preview">
                                    <div class="preview-item" id="index-1">
                                        <i class="fas fa-plus"></i>
                                        <span>Add Image 1</span>
                                        <input type="file" accept="image/*">
                                    </div>
                                    <div class="preview-item empty" id="index-2">
                                        <i class="fas fa-plus"></i>
                                        <span>Add Image 2</span>
                                        <input type="file" accept="image/*">
                                    </div>
                                    <div class="preview-item empty" id="index-3">
                                        <i class="fas fa-plus"></i>
                                        <span>Add Image 3</span>
                                        <input type="file" accept="image/*">
                                    </div>
                                    <div class="preview-item empty" id="index-4">
                                        <i class="fas fa-plus"></i>
                                        <span>Add Image 4</span>
                                        <input type="file" accept="image/*">
                                    </div>
                                </div>
                                <p class="upload-note">Upload up to 4 images (First image will be the main display)</p>
                            </div>
                        </div>
                        
                        <div class="form-row">
                            <div class="form-group">
                                <label class="toggle-label">
                                    <span>Availability</span>
                                    <label class="toggle-switch">
                                        <input type="checkbox" id="availability-toggle" checked>
                                        <span class="slider"></span>
                                    </label>
                                    <span class="toggle-status">In Stock</span>
                                </label>
                                <div id="availability-fields" style="display: none; margin-top: 10px;">
                                    <label for="availability-start" style="font-weight: 500;">Available From:</label>
                                    <input type="date" id="availability-start">
                                    <div class="availability-message" style="margin-top: 8px; color: #218838;">
                                        This product will be available for buyers starting from the selected date.
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="form-actions">
                            <button type="button" class="btn btn-secondary">Cancel</button>
                            <button type="submit" class="btn btn-primary">Upload Product</button>
                        </div>
                    </form>
                </section>
                
                <!-- My Products Section -->
                <section class="content-section" id="products-content">
                    <div class="section-header">
                        <h2>My Products</h2>
                        <p>Manage your listed farm produce</p>
                    </div>
                    
                    <div class="products-filter">
                        <div class="search-box">
                            <i class="fas fa-search"></i>
                            <input type="text" placeholder="Search products...">
                        </div>
                        <div class="filter-options">
                            <select>
                                <option>All Categories</option>
                                <option>Fruits</option>
                                <option>Vegetables</option>
                                <option>Grains</option>
                            </select>
                            <select>
                                <option>All Status</option>
                                <option>In Stock</option>
                                <option>Out of Stock</option>
                            </select>
                        </div>
                    </div>
                    
                    <div class="products-grid">
                        <div class="product-card">
                            <div class="product-image">
                            <img src="https://thumbs.dreamstime.com/b/view-fresh-tomatoes-different-shapes-tomato-shapes-173362970.jpg" alt="Organic Tomatoes">
                                <div class="product-status in-stock">In Stock</div>
                            </div>
                            <div class="product-info">
                                <h3>Organic Tomatoes</h3>
                                <div class="product-meta">
                                    <span><i class="fas fa-tag"></i> Vegetables</span>
                                    <span><i class="fas fa-box"></i> 85kg left</span>
                                </div>
                                <div class="product-price">R 45.00 /kg</div>
                            </div>
                            <div class="product-actions">
                                <button class="btn-icon edit"><i class="fas fa-edit"></i></button>
                                <button class="btn-icon delete"><i class="fas fa-trash"></i></button>
                            </div>
                        </div>
                        
                        <div class="product-card">
                            <div class="product-image">
                                <img src="https://tse1.mm.bing.net/th/id/OIP.cc1fmrVHT-YDXEVia6rsUwHaHa?rs=1&pid=ImgDetMain&o=7&rm=3" alt="Fresh Apples">
                                <div class="product-status in-stock">In Stock</div>
                            </div>
                            <div class="product-info">
                                <h3>Fresh Apples</h3>
                                <div class="product-meta">
                                    <span><i class="fas fa-tag"></i> Fruits</span>
                                    <span><i class="fas fa-box"></i> 120kg left</span>
                                </div>
                                <div class="product-price">R 65.00 /kg</div>
                            </div>
                            <div class="product-actions">
                                <button class="btn-icon edit"><i class="fas fa-edit"></i></button>
                                <button class="btn-icon delete"><i class="fas fa-trash"></i></button>
                            </div>
                        </div>
                        
                        <div class="product-card">
                            <div class="product-image">
                                <img src="https://tse4.mm.bing.net/th/id/OIP.jNvLzjm9bZSCJKKjiZL2AQAAAA?rs=1&pid=ImgDetMain&o=7&rm=3" alt="Sweet Corn">
                                <div class="product-status low-stock">Low Stock</div>
                            </div>
                            <div class="product-info">
                                <h3>Sweet Corn</h3>
                                <div class="product-meta">
                                    <span><i class="fas fa-tag"></i> Vegetables</span>
                                    <span><i class="fas fa-box"></i> 15kg left</span>
                                </div>
                                <div class="product-price">R 30.00 /kg</div>
                            </div>
                            <div class="product-actions">
                                <button class="btn-icon edit"><i class="fas fa-edit"></i></button>
                                <button class="btn-icon delete"><i class="fas fa-trash"></i></button>
                            </div>
                        </div>
                        
                        <div class="product-card">
                            <div class="product-image">
                                <img src="https://th.bing.com/th/id/R.2a211c11dab40396b01d0129693c27d6?rik=YQM%2fl2ZuC0I3ug&pid=ImgRaw&r=0" alt="Carrots">
                                <div class="product-status out-of-stock">Out of Stock</div>
                            </div>
                            <div class="product-info">
                                <h3>Fresh Carrots</h3>
                                <div class="product-meta">
                                    <span><i class="fas fa-tag"></i> Vegetables</span>
                                    <span><i class="fas fa-box"></i> 0kg left</span>
                                </div>
                                <div class="product-price">R 40.00 /kg</div>
                            </div>
                            <div class="product-actions">
                                <button class="btn-icon edit"><i class="fas fa-edit"></i></button>
                                <button class="btn-icon delete"><i class="fas fa-trash"></i></button>
                            </div>
                        </div>
                    </div>
                    
                    <div class="pagination">
                        <button class="page-nav" disabled><i class="fas fa-chevron-left"></i></button>
                        <button class="page-number active">1</button>
                        <button class="page-number">2</button>
                        <button class="page-number">3</button>
                        <button class="page-nav"><i class="fas fa-chevron-right"></i></button>
                    </div>
                </section>
                
                <!-- Orders Received Section -->
                <section class="content-section" id="orders-content">
                    <div class="section-header">
                        <h2>Orders Received</h2>
                        <p>Manage and track your orders</p>
                    </div>
                    
                    <div class="orders-filter">
                        <div class="filter-tabs">
                            <button class="tab-btn active">All Orders (12)</button>
                            <button class="tab-btn">Pending (3)</button>
                            <button class="tab-btn">Confirmed (5)</button>
                            <button class="tab-btn">Delivered (4)</button>
                        </div>
                        <div class="filter-actions">
                            <div class="date-filter">
                                <i class="fas fa-calendar-alt"></i>
                                <span>Last 30 days</span>
                                <i class="fas fa-chevron-down"></i>
                            </div>
                        </div>
                    </div>
                    
                    <div class="orders-table">
                        <div class="table-header">
                            <div class="col order-id">Order ID</div>
                            <div class="col buyer">Buyer</div>
                            <div class="col product">Product</div>
                            <div class="col quantity">Quantity</div>
                            <div class="col amount">Amount</div>
                            <div class="col date">Date</div>
                            <div class="col status">Status</div>
                            <div class="col actions">Actions</div>
                        </div>
                        
                        <div class="table-row">
                            <div class="col order-id">#ORD-00125</div>
                            <div class="col buyer">
                                <div class="buyer-avatar">
                                    <img src="../../assets/images/daniel.jpg" alt="Buyer">
                                </div>
                                <span>Fresh Foods Market</span>
                            </div>
                            <div class="col product">Organic Tomatoes</div>
                            <div class="col quantity">15kg</div>
                            <div class="col amount">R 675.00</div>
                            <div class="col date">Today, 10:45 AM</div>
                            <div class="col status">
                                <span class="status-badge pending">Pending</span>
                            </div>
                            <div class="col actions">
                                <button class="btn-icon view"><i class="fas fa-eye"></i></button>
                                <button class="btn-icon confirm"><i class="fas fa-check"></i></button>
                            </div>
                        </div>
                        
                        <div class="table-row">
                            <div class="col order-id">#ORD-00124</div>
                            <div class="col buyer">
                                <div class="buyer-avatar">
                                    <img src="../../assets/images/divin.jpeg" alt="Buyer">
                                </div>
                                <span>Green Restaurant</span>
                            </div>
                            <div class="col product">Fresh Apples</div>
                            <div class="col quantity">10kg</div>
                            <div class="col amount">R 650.00</div>
                            <div class="col date">Yesterday, 2:30 PM</div>
                            <div class="col status">
                                <span class="status-badge confirmed">Confirmed</span>
                            </div>
                            <div class="col actions">
                                <button class="btn-icon view"><i class="fas fa-eye"></i></button>
                                <button class="btn-icon ship"><i class="fas fa-truck"></i></button>
                            </div>
                        </div>
                        
                        <div class="table-row">
                            <div class="col order-id">#ORD-00123</div>
                            <div class="col buyer">
                                <div class="buyer-avatar">
                                    <img src="../../assets/images/emmanuel.jpg" alt="Buyer">
                                </div>
                                <span>Organic Store</span>
                            </div>
                            <div class="col product">Sweet Corn</div>
                            <div class="col quantity">20kg</div>
                            <div class="col amount">R 600.00</div>
                            <div class="col date">Yesterday, 9:15 AM</div>
                            <div class="col status">
                                <span class="status-badge delivered">Delivered</span>
                            </div>
                            <div class="col actions">
                                <button class="btn-icon view"><i class="fas fa-eye"></i></button>
                                <button class="btn-icon review"><i class="fas fa-star"></i></button>
                            </div>
                        </div>
                    </div>
                    
                    <div class="pagination">
                        <button class="page-nav" disabled><i class="fas fa-chevron-left"></i></button>
                        <button class="page-number active">1</button>
                        <button class="page-number">2</button>
                        <button class="page-number">3</button>
                        <button class="page-nav"><i class="fas fa-chevron-right"></i></button>
                    </div>
                </section>
                
                <!-- Feedback Section -->
                <section class="content-section" id="feedback-content">
                    <div class="section-header">
                        <h2>Rating & Feedback</h2>
                        <p>Reviews from your buyers</p>
                    </div>
                    
                    <div class="feedback-summary">
                        <div class="rating-overview">
                            <div class="average-rating">
                                <div class="rating-stars">
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star-half-alt"></i>
                                </div>
                                <div class="rating-value">4.7</div>
                                <div class="rating-count">Based on 24 reviews</div>
                            </div>
                            <div class="rating-distribution">
                                <div class="rating-bar">
                                    <span class="rating-label">5 stars</span>
                                    <div class="bar-container">
                                        <div class="bar-fill" style="width: 70%"></div>
                                    </div>
                                    <span class="rating-percent">70%</span>
                                </div>
                                <div class="rating-bar">
                                    <span class="rating-label">4 stars</span>
                                    <div class="bar-container">
                                        <div class="bar-fill" style="width: 20%"></div>
                                    </div>
                                    <span class="rating-percent">20%</span>
                                </div>
                                <div class="rating-bar">
                                    <span class="rating-label">3 stars</span>
                                    <div class="bar-container">
                                        <div class="bar-fill" style="width: 5%"></div>
                                    </div>
                                    <span class="rating-percent">5%</span>
                                </div>
                                <div class="rating-bar">
                                    <span class="rating-label">2 stars</span>
                                    <div class="bar-container">
                                        <div class="bar-fill" style="width: 3%"></div>
                                    </div>
                                    <span class="rating-percent">3%</span>
                                </div>
                                <div class="rating-bar">
                                    <span class="rating-label">1 star</span>
                                    <div class="bar-container">
                                        <div class="bar-fill" style="width: 2%"></div>
                                    </div>
                                    <span class="rating-percent">2%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="reviews-list">
                        <div class="review-card">
                            <div class="review-header">
                                <div class="reviewer">
                                    <div class="reviewer-avatar">
                                        <img src="../../assets/images/daniel.jpg" alt="Buyer">
                                    </div>
                                    <div class="reviewer-info">
                                        <h4>Fresh Foods Market</h4>
                                        <div class="review-date">2 days ago</div>
                                    </div>
                                </div>
                                <div class="review-rating">
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                </div>
                            </div>
                            <div class="review-content">
                                <h3>Organic Tomatoes</h3>
                                <p>Excellent quality tomatoes, just as described. Fresh and delicious. Will definitely order again!</p>
                            </div>
                        </div>
                        
                        <div class="review-card">
                            <div class="review-header">
                                <div class="reviewer">
                                    <div class="reviewer-avatar">
                                        <img src="../../assets/images/divin.jpeg" alt="Buyer">
                                    </div>
                                    <div class="reviewer-info">
                                        <h4>Green Restaurant</h4>
                                        <div class="review-date">1 week ago</div>
                                    </div>
                                </div>
                                <div class="review-rating">
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                </div>
                            </div>
                            <div class="review-content">
                                <h3>Fresh Apples</h3>
                                <p>Great apples, very sweet and crisp. The delivery was fast and the packaging was perfect.</p>
                            </div>
                        </div>
                        
                        <div class="review-card">
                            <div class="review-header">
                                <div class="reviewer">
                                    <div class="reviewer-avatar">
                                        <img src="../../assets/images/emmanuel.jpg" alt="Buyer">
                                    </div>
                                    <div class="reviewer-info">
                                        <h4>Organic Store</h4>
                                        <div class="review-date">2 weeks ago</div>
                                    </div>
                                </div>
                                <div class="review-rating">
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="far fa-star"></i>
                                </div>
                            </div>
                            <div class="review-content">
                                <h3>Sweet Corn</h3>
                                <p>Good quality corn, but the delivery took longer than expected. The product itself was fresh and tasty.</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="pagination">
                        <button class="page-nav" disabled><i class="fas fa-chevron-left"></i></button>
                        <button class="page-number active">1</button>
                        <button class="page-number">2</button>
                        <button class="page-number">3</button>
                        <button class="page-nav"><i class="fas fa-chevron-right"></i></button>
                    </div>
                </section>
                
                <!-- Billing & Payments Section -->
                <section class="content-section" id="billing-content">
                    <div class="section-header">
                        <h2>Billing & Payments</h2>
                        <p>View your earnings and payment history</p>
                    </div>
                    
                    <div class="billing-tabs">
                        <button class="tab-btn active">Overview</button>
                        <button class="tab-btn">Pending Payments</button>
                        <button class="tab-btn">Payment History</button>
                        <button class="tab-btn">Withdraw Funds</button>
                    </div>
                    
                    <div class="billing-overview">
                        <div class="balance-card">
                            <div class="balance-header">
                                <h3>Available Balance</h3>
                                <i class="fas fa-wallet"></i>
                            </div>
                            <div class="balance-amount">R 8,450.00</div>
                            <div class="balance-actions">
                                <button class="btn-withdraw">Withdraw</button>
                                <button class="btn-view">View Details</button>
                            </div>
                        </div>
                        
                        <div class="stats-grid">
                            <div class="stat-card">
                                <div class="stat-icon">
                                    <i class="fas fa-money-bill-wave"></i>
                                </div>
                                <div class="stat-info">
                                    <h3>R 12,500.00</h3>
                                    <p>Total Earnings</p>
                                </div>
                            </div>
                            
                            <div class="stat-card">
                                <div class="stat-icon">
                                    <i class="fas fa-clock"></i>
                                </div>
                                <div class="stat-info">
                                    <h3>R 4,050.00</h3>
                                    <p>Pending Clearance</p>
                                </div>
                            </div>
                            
                            <div class="stat-card">
                                <div class="stat-icon">
                                    <i class="fas fa-calendar-check"></i>
                                </div>
                                <div class="stat-info">
                                    <h3>R 8,450.00</h3>
                                    <p>Paid This Month</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="transactions-table">
                        <div class="table-header">
                            <h3>Recent Transactions</h3>
                            <div class="table-actions">
                                <div class="date-filter">
                                    <i class="fas fa-calendar-alt"></i>
                                    <span>Last 30 days</span>
                                    <i class="fas fa-chevron-down"></i>
                                </div>
                            </div>
                        </div>
                        
                        <div class="table-content">
                            <div class="transactions-header">
                                <div class="col date">Date</div>
                                <div class="col description">Description</div>
                                <div class="col amount">Amount</div>
                                <div class="col status">Status</div>
                                <div class="col invoice">Invoice</div>
                            </div>
                            
                            <div class="transactions-row">
                                <div class="col date">15 Jun 2025</div>
                                <div class="col description">Payment for Order #ORD-00120</div>
                                <div class="col amount">R 1,250.00</div>
                                <div class="col status">
                                    <span class="status-badge completed">Completed</span>
                                </div>
                                <div class="col invoice">
                                    <button class="btn-icon"><i class="fas fa-download"></i></button>
                                </div>
                            </div>
                            
                            <div class="transactions-row">
                                <div class="col date">10 Jun 2025</div>
                                <div class="col description">Payment for Order #ORD-00118</div>
                                <div class="col amount">R 980.00</div>
                                <div class="col status">
                                    <span class="status-badge completed">Completed</span>
                                </div>
                                <div class="col invoice">
                                    <button class="btn-icon"><i class="fas fa-download"></i></button>
                                </div>
                            </div>
                            
                            <div class="transactions-row">
                                <div class="col date">5 Jun 2025</div>
                                <div class="col description">Payment for Order #ORD-00115</div>
                                <div class="col amount">R 1,750.00</div>
                                <div class="col status">
                                    <span class="status-badge completed">Completed</span>
                                </div>
                                <div class="col invoice">
                                    <button class="btn-icon"><i class="fas fa-download"></i></button>
                                </div>
                            </div>
                            
                            <div class="transactions-row">
                                <div class="col date">1 Jun 2025</div>
                                <div class="col description">Withdrawal to Bank Account</div>
                                <div class="col amount">- R 5,000.00</div>
                                <div class="col status">
                                    <span class="status-badge completed">Completed</span>
                                </div>
                                <div class="col invoice">
                                    <button class="btn-icon"><i class="fas fa-download"></i></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                
                <!-- Profile Section -->
                <section class="content-section" id="profile-content">
                    <div class="section-header">
                        <h2>My Profile</h2>
                        <p>Manage your account information</p>
                    </div>
                    
                    <div class="profile-container">
                        <div class="profile-sidebar">
                            <div class="profile-card">
                                <div class="profile-image">
                                    <img src="../../assets/images/divine.png" alt="Profile">
                                    <button class="edit-avatar"><i class="fas fa-camera"></i></button>
                                </div>
                                <h3 class="user-name">Divin</h3>
                                <p>Farmer Account</p>
                                <div class="profile-stats">
                                    <div class="stat-item">
                                        <i class="fas fa-boxes"></i>
                                        <span>24 Products</span>
                                    </div>
                                    <div class="stat-item">
                                        <i class="fas fa-star"></i>
                                        <span>4.7 Rating</span>
                                    </div>
                                </div>
                            </div>
                            
                            <nav class="profile-menu">
                                <ul>
                                    <li class="active"><a href="#personal-info">Personal Information</a></li>
                                    <li><a href="#farm-info">Farm Information</a></li>
                                    <li><a href="#bank-details">Bank Details</a></li>
                                    <li><a href="#security">Security</a></li>
                                </ul>
                            </nav>
                        </div>
                        
                        <div class="profile-content">
                            <div class="profile-section active" id="personal-info-section">
                                <h3>Personal Information</h3>
                                <form class="profile-form">
                                    <div class="form-row">
                                        <div class="form-group">
                                            <label for="first-name">First Name</label>
                                            <input type="text" id="first-name" value="Divin">
                                        </div>
                                        <div class="form-group">
                                            <label for="last-name">Last Name</label>
                                            <input type="text" id="last-name" value="Nkosi">
                                        </div>
                                    </div>
                                    
                                    <div class="form-group">
                                        <label for="email">Email Address</label>
                                        <input type="email" id="email" value="divindaniel58@gmail@gmail.com">
                                    </div>
                                    
                                    <div class="form-group">
                                        <label for="phone">Phone Number</label>
                                        <input type="tel" id="phone" value="+27 12 345 6789">
                                    </div>
                                    
                                    <div class="form-group">
                                        <label for="address">Address</label>
                                        <textarea id="address">123 Farm Road, Agricultural Area, Pretoria</textarea>
                                    </div>
                                    
                                    <div class="form-actions">
                                        <button type="button" class="btn btn-secondary">Cancel</button>
                                        <button type="submit" class="btn btn-primary">Save Changes</button>
                                    </div>
                                </form>
                            </div>
                            
                            <div class="profile-section" id="farm-info-section">
                                <h3>Farm Information</h3>
                                <form class="profile-form">
                                    <div class="form-group">
                                        <label for="farm-name">Farm Name</label>
                                        <input type="text" id="farm-name" value="Nkosi Family Farm">
                                    </div>
                                    
                                    <div class="form-group">
                                        <label for="farm-location">Farm Location</label>
                                        <input type="text" id="farm-location" value="Pretoria, Gauteng">
                                        <div class="map-placeholder">
                                            <i class="fas fa-map"></i>
                                            <span>Map will appear here when integrated</span>
                                        </div>
                                    </div>
                                    
                                    <div class="form-group">
                                        <label for="farm-type">Farm Type</label>
                                        <select id="farm-type">
                                            <option>Mixed Farming</option>
                                            <option>Vegetables</option>
                                            <option>Fruits</option>
                                            <option>Grains</option>
                                            <option>Livestock</option>
                                        </select>
                                    </div>
                                    
                                    <div class="form-group">
                                        <label for="farm-size">Farm Size</label>
                                        <div class="input-with-unit">
                                            <input type="number" id="farm-size" value="50">
                                            <span class="unit">hectares</span>
                                        </div>
                                    </div>
                                    
                                    <div class="form-group">
                                        <label for="farm-description">Farm Description</label>
                                        <textarea id="farm-description">Our family farm specializes in organic vegetables and fruits, with over 20 years of farming experience. We prioritize sustainable practices and quality produce.</textarea>
                                    </div>
                                    
                                    <div class="form-actions">
                                        <button type="button" class="btn btn-secondary">Cancel</button>
                                        <button type="submit" class="btn btn-primary">Save Changes</button>
                                    </div>
                                </form>
                            </div>
                            
                            <div class="profile-section" id="bank-details-section">
                                <h3>Bank Details</h3>
                                <div class="alert-message">
                                    <i class="fas fa-lock"></i>
                                    <p>Your bank details are securely encrypted and only used for payment processing.</p>
                                </div>
                                
                                <form class="profile-form">
                                    <div class="form-group">
                                        <label for="bank-name">Bank Name</label>
                                        <select id="bank-name">
                                            <option>ABSA</option>
                                            <option>First National Bank</option>
                                            <option>Standard Bank</option>
                                            <option>Nedbank</option>
                                            <option>Capitec Bank</option>
                                        </select>
                                    </div>
                                    
                                    <div class="form-group">
                                        <label for="account-name">Account Name</label>
                                        <input type="text" id="account-name" value="Divin Mathem's">
                                    </div>
                                    
                                    <div class="form-group">
                                        <label for="account-number">Account Number</label>
                                        <input type="text" id="account-number" value="1234567890">
                                    </div>
                                    
                                    <div class="form-group">
                                        <label for="branch-code">Branch Code</label>
                                        <input type="text" id="branch-code" value="632005">
                                    </div>
                                    
                                    <div class="form-actions">
                                        <button type="button" class="btn btn-secondary">Cancel</button>
                                        <button type="submit" class="btn btn-primary">Save Changes</button>
                                    </div>
                                </form>
                            </div>
                            
                            <div class="profile-section" id="security-section">
                                <h3>Security</h3>
                                <form class="profile-form">
                                    <div class="form-group">
                                        <label for="current-password">Current Password</label>
                                        <input type="password" id="current-password">
                                    </div>
                                    
                                    <div class="form-group">
                                        <label for="new-password">New Password</label>
                                        <input type="password" id="new-password">
                                        <div class="password-strength">
                                            <div class="strength-meter">
                                                <span class="strength-bar"></span>
                                                <span class="strength-bar"></span>
                                                <span class="strength-bar"></span>
                                            </div>
                                            <span class="strength-text"></span>
                                        </div>
                                    </div>
                                    
                                    <div class="form-group">
                                        <label for="confirm-password">Confirm New Password</label>
                                        <input type="password" id="confirm-password">
                                    </div>
                                    
                                    <div class="form-actions">
                                        <button type="button" class="btn btn-secondary">Cancel</button>
                                        <button type="submit" class="btn btn-primary">Change Password</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    </div>

    <!-- AgriAssistant Modal -->
    <div id="agriAssistantModal" class="agri-modal">
        <div class="agri-modal-backdrop">
            <div class="floating-particles">
                <div class="particle"></div>
                <div class="particle"></div>
                <div class="particle"></div>
                <div class="particle"></div>
                <div class="particle"></div>
                <div class="particle"></div>
                <div class="particle"></div>
                <div class="particle"></div>
            </div>
        </div>
        
        <div class="agri-modal-container">
            <div class="agri-modal-header">
                <div class="modal-header-content">
                    <div class="ai-avatar">
                        <div class="ai-pulse"></div>
                        <i class="fas fa-robot"></i>
                    </div>
                    <div class="header-text">
                        <h2>AgriAssistant AI
                            <!-- <span class="premium-badge" title="Pro Version">
                                <i class="fas fa-crown"></i> Premium
                            </span> -->
                        </h2>
                        <p>Your intelligent farming companion</p>
                    </div>
                </div>
                <button class="agri-modal-close" id="closeAgriModal">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            
            <div class="agri-modal-body">
                <!-- AI Features Grid -->
                <div class="ai-features-grid">

                    <div class="ai-feature-card smart-chat" data-feature="smart-chat">
                        <div class="feature-icon">
                            <i class="fas fa-comments"></i>
                        </div>
                        <div class="feature-content">
                            <h3>Smart Chat</h3>
                            <p>Conversational AI for farming questions and guidance</p>
                            <div class="feature-status">
                                <span class="status-dot active"></span>
                                <span>Active</span>
                            </div>
                        </div>
                    </div>

                    <div class="ai-feature-card crop-analysis" data-feature="crop-analysis">
                        <div class="feature-icon">
                            <i class="fas fa-seedling"></i>
                        </div>
                        <div class="feature-content">
                            <h3>Crop Analysis</h3>
                            <p>AI-powered crop health monitoring and disease detection</p>
                            <div class="feature-status">
                                <span class="status-dot active"></span>
                                <span>Active</span>
                            </div>
                        </div>
                    </div>
                    
                    
                    <div class="ai-feature-card market-trends" data-feature="market-trends">
                        <div class="feature-icon">
                            <i class="fas fa-chart-line"></i>
                        </div>
                        <div class="feature-content">
                            <h3>Market Trends
                                <span class="premium-badge" title="Pro Version">
                                    <i class="fas fa-crown"></i> Pro
                                </span>
                            </h3>
                            <p>Real-time market analysis and price predictions</p>
                            <div class="feature-status">
                                <span class="status-dot active"></span>
                                <span>Active</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="ai-feature-card products-sales-overview" data-feature="products-sales-overview">
                        <div class="feature-icon">
                            <i class="fas fa-sticky-note"></i>
                        </div>
                        <div class="feature-content">
                            <h3>Products & Sales Overview
                                <span class="premium-badge" title="Pro Version">
                                    <i class="fas fa-crown"></i> Pro
                                </span>
                            </h3>
                            <p>Analyze product trends, review past sales, and get AI-driven selling advice</p>
                            <div class="feature-status">
                                <span class="status-dot active"></span>
                                <span>Active</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="ai-feature-card yield-prediction" data-feature="yield-prediction">
                        <div class="feature-icon">
                            <i class="fas fa-calculator"></i>
                        </div>
                        <div class="feature-content">
                            <h3>Yield Prediction
                                <span class="premium-badge" title="Pro Version">
                                    <i class="fas fa-crown"></i> Pro
                                </span>
                            </h3>
                            <p>Advanced analytics for harvest forecasting</p>
                            <div class="feature-status">
                                <span class="status-dot active"></span>
                                <span>Active</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="ai-feature-card weather-insights" data-feature="weather-insights">
                        <div class="feature-icon">
                            <i class="fas fa-cloud-sun"></i>
                        </div>
                        <div class="feature-content">
                            <h3>Weather Insights
                            </h3>
                            <p>Smart weather predictions and farming recommendations</p>
                            <div class="feature-status">
                                <span class="status-dot active"></span>
                                <span>Active</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Quick Actions -->
                <div class="ai-quick-actions">
                    <h3>Quick AI Actions</h3>
                    <div class="quick-actions-grid">
                        <button class="quick-action-btn analyze-photos">
                            <i class="fas fa-camera"></i>
                            <span>Analyze Crop Photos</span>
                        </button>
                        <button class="quick-action-btn weather-forecast">
                            <i class="fas fa-cloud"></i>
                            <span>7-Day Forecast</span>
                        </button>
                        <button class="quick-action-btn price-check">
                            <i class="fas fa-dollar-sign"></i>
                            <span>Price Check</span>
                        </button>
                        <button class="quick-action-btn ask-ai">
                            <i class="fas fa-question-circle"></i>
                            <span>Ask AI Anything</span>
                        </button>
                    </div>
                </div>

                <!-- AI Recommendations Panel -->
                <div class="ai-recommendations">
                    <h3>Today's AI Recommendations</h3>
                    <div class="recommendations-list">
                        <div class="recommendation-item priority-high">
                            <div class="rec-icon">
                                <i class="fas fa-exclamation-triangle"></i>
                            </div>
                            <div class="rec-content">
                                <h4>Weather Alert</h4>
                                <p>Heavy rainfall expected in 3 days. Consider harvesting tomatoes early.</p>
                                <span class="rec-confidence">95% confidence</span>
                            </div>
                        </div>
                        
                        <div class="recommendation-item priority-medium">
                            <div class="rec-icon">
                                <i class="fas fa-chart-up"></i>
                            </div>
                            <div class="rec-content">
                                <h4>Market Opportunity</h4>
                                <p>Tomato prices increasing by 15% this week. Good time to list premium stock.</p>
                                <span class="rec-confidence">87% confidence</span>
                            </div>
                        </div>
                        
                        <div class="recommendation-item priority-low">
                            <div class="rec-icon">
                                <i class="fas fa-leaf"></i>
                            </div>
                            <div class="rec-content">
                                <h4>Crop Care</h4>
                                <p>Apple trees showing optimal growth. Consider light pruning next week.</p>
                                <span class="rec-confidence">78% confidence</span>
                            </div>
                        </div>
                    </div>
                </div>
            
            </div>
            
            <div class="agri-modal-footer">
                <div class="ai-status">
                    <div class="status-indicator">
                        <div class="pulse-dot"></div>
                        <span>AI Systems Online</span>
                    </div>
                    <div class="last-update">
                        Last updated: 2 minutes ago
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Chat Interface Modal (Sub-modal for Smart Chat) -->
    <div id="aiChatModal" class="ai-chat-modal">
        <div class="chat-modal-container">
            <div class="chat-header">
                <div class="chat-avatar">
                    <i class="fas fa-robot"></i>
                </div>
                <div class="chat-title">
                    <h3>AgriAssistant Chat</h3>
                    <p>Ask me anything about farming</p>
                </div>
                <button class="chat-close" id="closeChatModal">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            
            <div class="chat-messages" id="chatMessages">
                <div class="message ai-message">
                    <div class="message-avatar">
                        <i class="fas fa-robot"></i>
                    </div>
                    <div class="message-content">
                        <p>Hello Divin! I'm your AgriAssistant AI. I can help you with crop management, weather insights, market trends, and any farming questions you have. How can I assist you today?</p>
                        <span class="message-time">Just now</span>
                    </div>
                </div>
            </div>
            
            <!-- <div class="chat-suggestions">
                <div class="suggestion-chips">
                    <button class="suggestion-chip">What's the best time to plant tomatoes?</button>
                    <button class="suggestion-chip">Check my crop health</button>
                    <button class="suggestion-chip">Market prices for apples</button>
                    <button class="suggestion-chip">Weather forecast for next week</button>
                </div>
            </div> -->
            
            <div class="chat-input-container">
                <div class="chat-input">
                    <input type="text" placeholder="Type your farming question..." id="chatInput">
                    <button class="send-button" id="sendMessage">
                        <i class="fas fa-paper-plane"></i>
                    </button>
                </div>
            </div>
        </div>
    </div>

    <script src="../../scripts/farmer.js"></script>
    <script src="../../scripts/chatbot.js"></script>

</body>
</html>