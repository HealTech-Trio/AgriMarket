<?php
    // session security 
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Dashboard | AgriMarket</title>
    <!-- <link rel="stylesheet" href="../../stylesheets/main.css"> -->
    <link rel="stylesheet" href="../../stylesheets/admin.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/lipis/flag-icons@7.3.2/css/flag-icons.min.css" />
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <link rel="stylesheet" href="graph.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body>
    <!-- Dashboard Container -->
    <div class="admin-container">
        <!-- Fixed Sidebar -->
        <aside class="admin-sidebar">
            <div class="sidebar-header">
                <div class="logo">
                    <i class="fas fa-seedling"></i>
                    <span>AgriMarket</span>
                    <span class="admin-badge">Admin</span>
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
                        <a href="#users">
                            <i class="fas fa-users"></i>
                            <span>User Management</span>
                            <span class="badge">24</span>
                        </a>
                    </li>
                    <li>
                        <a href="#farmers">
                            <i class="fas fa-user-tie"></i>
                            <span>Farmer Verification</span>
                            <span class="badge warning">8</span>
                        </a>
                    </li>
                    <li>
                        <a href="#products">
                            <i class="fas fa-box-open"></i>
                            <span>Product Moderation</span>
                            <span class="badge danger">5</span>
                        </a>
                    </li>
                    <li>
                        <a href="#transactions">
                            <i class="fas fa-exchange-alt"></i>
                            <span>Transactions</span>
                        </a>
                    </li>
                    <li>
                        <a href="#payments">
                            <i class="fas fa-money-bill-wave"></i>
                            <span>Farmer Payments</span>
                            <span class="badge">12</span>
                        </a>
                    </li>
                    <li>
                        <a href="#support">
                            <i class="fas fa-headset"></i>
                            <span>Support Tickets</span>
                            <span class="badge warning">15</span>
                        </a>
                    </li>
                    <li>
                        <a href="#reports">
                            <i class="fas fa-chart-bar"></i>
                            <span>Reports & Analytics</span>
                        </a>
                    </li>
                    <li>
                        <a href="#announcements">
                            <i class="fas fa-bullhorn"></i>
                            <span>Announcements</span>
                        </a>
                    </li>
                    <li>
                        <a href="#settings">
                            <i class="fas fa-cog"></i>
                            <span>System Settings</span>
                        </a>
                    </li>
                    <li class="logout">
                        <a href="#">
                            <i class="fas fa-sign-out-alt"></i>
                            <span>Logout</span>
                        </a>
                    </li>
                </ul>
            </nav>
        </aside>

        <!-- Main Content Area -->
        <main class="admin-content">
            <!-- Fixed Header -->
            <header class="admin-header">
                <div class="header-left">
                    <h1>Admin Dashboard</h1>
                    <p>Welcome back, <span class="admin-name">Lutho</span></p>
                </div>
                
                <div class="header-right">
                    <div class="search-box">
                        <input type="text" placeholder="Search...">
                        <i class="fas fa-search"></i>
                    </div>
                    
                    <div class="header-actions">
                        <div class="notification">
                            <i class="fas fa-bell"></i>
                            <span class="badge">7</span>
                        </div>
                        
                        <div class="admin-profile">
                            <div class="avatar">
                                <img src="../../assets/images/lutho.png" alt="Admin">
                            </div>
                            <div class="profile-dropdown">
                                <span>Lutho Buyaphi</span>
                                <i class="fas fa-chevron-down"></i>
                                <div class="dropdown-menu">
                                    <a href="#"><i class="fas fa-user"></i> My Profile</a>
                                    <a href="#"><i class="fas fa-cog"></i> Settings</a>
                                    <div class="divider"></div>
                                    <a href="#" class="logout"><i class="fas fa-sign-out-alt"></i> Logout</a>
                                </div>
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
                        <div class="stat-card stat1">
                            <div class="stat-icon">
                                <i class="fas fa-users"></i>
                            </div>
                            <div class="stat-info">
                                <h3>1,245</h3>
                                <p>Total Users</p>
                                <span class="stat-change up">+12% from last week</span>
                            </div>
                        </div>
                        
                        <div class="stat-card stat2">
                            <div class="stat-icon">
                                <i class="fas fa-user-tie"></i>
                            </div>
                            <div class="stat-info">
                                <h3>328</h3>
                                <p>Verified Farmers</p>
                                <span class="stat-change up">+8% from last week</span>
                            </div>
                        </div>
                        
                        <div class="stat-card stat3">
                            <div class="stat-icon">
                                <i class="fas fa-box-open"></i>
                            </div>
                            <div class="stat-info">
                                <h3>2,156</h3>
                                <p>Active Products</p>
                                <span class="stat-change up">+5% from last week</span>
                            </div>
                        </div>
                        
                        <div class="stat-card stat4">
                            <div class="stat-icon">
                                <i class="fas fa-exchange-alt"></i>
                            </div>
                            <div class="stat-info">
                                <h3>R 245,780</h3>
                                <p>Total Transactions</p>
                                <span class="stat-change down">-3% from last week</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="content-row">
                        <div class="chart-card">
                            <div class="dashboard-header">
                                <div class="time-filters">
                                    <div class="time-filter">Day</div>
                                    <div class="time-filter">Week</div>
                                    <div class="time-filter active">Month</div>
                                    <div class="time-filter">Quarter</div>
                                    <div class="time-filter">Year</div>
                                </div>
                            </div>
                            
                            <div class="main-chart-container">
                                <div class="chart-title">
                                    <i class="fas fa-chart-column"></i> Business Performance Overview
                                </div>
                                <div class="chart-area">
                                    <canvas id="unifiedColumnChart"></canvas>
                                </div>
                                <div class="chart-legend">
                                    <div class="legend-item">
                                        <div class="legend-color" style="background-color: #3498db;"></div>
                                        <span>User Growth</span>
                                    </div>
                                    <div class="legend-item">
                                        <div class="legend-color" style="background-color: #2ecc71;"></div>
                                        <span>Verified Farmers</span>
                                    </div>
                                    <div class="legend-item">
                                        <div class="legend-color" style="background-color: #9b59b6;"></div>
                                        <span>Active Products</span>
                                    </div>
                                    <div class="legend-item">
                                        <div class="legend-color" style="background-color: #e74c3c;"></div>
                                        <span>Total Transactions</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="recent-activity">
                            <div class="card-header">
                                <h3>Recent Activity</h3>
                                <a href="#" class="view-all">View All</a>
                            </div>
                            <div class="activity-list">
                                <div class="activity-item">
                                    <div class="activity-icon">
                                        <i class="fas fa-user-plus"></i>
                                    </div>
                                    <div class="activity-info">
                                        <p><strong>5 new farmers</strong> registered and awaiting verification</p>
                                        <span class="activity-time">10 minutes ago</span>
                                    </div>
                                </div>
                                <div class="activity-item">
                                    <div class="activity-icon">
                                        <i class="fas fa-exclamation-triangle"></i>
                                    </div>
                                    <div class="activity-info">
                                        <p><strong>3 products</strong> reported by users</p>
                                        <span class="activity-time">1 hour ago</span>
                                    </div>
                                </div>
                                <div class="activity-item">
                                    <div class="activity-icon">
                                        <i class="fas fa-headset"></i>
                                    </div>
                                    <div class="activity-info">
                                        <p><strong>7 new support tickets</strong> received</p>
                                        <span class="activity-time">3 hours ago</span>
                                    </div>
                                </div>
                                <div class="activity-item">
                                    <div class="activity-icon">
                                        <i class="fas fa-money-bill-wave"></i>
                                    </div>
                                    <div class="activity-info">
                                        <p><strong>12 farmer payments</strong> processed</p>
                                        <span class="activity-time">Yesterday</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="quick-actions">
                        <h3>Quick Actions</h3>
                        <div class="actions-grid">
                            <a href="#farmers" class="action-card">
                                <i class="fas fa-user-check"></i>
                                <span>Verify Farmers</span>
                            </a>
                            <a href="#payments" class="action-card">
                                <i class="fas fa-money-bill-alt"></i>
                                <span>Process Payments</span>
                            </a>
                            <a href="#announcements" class="action-card">
                                <i class="fas fa-bullhorn"></i>
                                <span>Send Announcement</span>
                            </a>
                            <a href="#reports" class="action-card">
                                <i class="fas fa-file-export"></i>
                                <span>Generate Report</span>
                            </a>
                        </div>
                    </div>
                </section>
                
                <!-- User Management Section -->
                <section class="content-section" id="users-content">
                    <div class="section-header">
                        <h2>User Management</h2>
                        <p>Manage all buyer and farmer accounts</p>
                    </div>
                    
                    <div class="users-filter">
                        <div class="search-box">
                            <i class="fas fa-search"></i>
                            <input type="text" placeholder="Search users...">
                        </div>
                        <div class="filter-options">
                            <select>
                                <option>All Users</option>
                                <option>Buyers</option>
                                <option>Farmers</option>
                                <option>Verified Farmers</option>
                                <option>Unverified Farmers</option>
                            </select>
                            <select>
                                <option>All Status</option>
                                <option>Active</option>
                                <option>Suspended</option>
                                <option>Banned</option>
                            </select>
                        </div>
                        <button class="btn btn-primary">
                            <i class="fas fa-plus"></i> Add New User
                        </button>
                    </div>
                    
                    <div class="users-table">
                        <div class="table-header">
                            <div class="col user">User</div>
                            <div class="col type">Type</div>
                            <div class="col joined">Joined</div>
                            <div class="col last-active">Last Active</div>
                            <div class="col status">Status</div>
                            <div class="col actions">Actions</div>
                        </div>
                        
                        <div class="table-row">
                            <div class="col user">
                                <div class="user-avatar">
                                    <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="User">
                                </div>
                                <div class="user-info">
                                    <h4>Thando Nkosi</h4>
                                    <span>thando@example.com</span>
                                </div>
                            </div>
                            <div class="col type">
                                <span class="badge buyer">Buyer</span>
                            </div>
                            <div class="col joined">15 Jun 2025</div>
                            <div class="col last-active">Today, 10:45 AM</div>
                            <div class="col status">
                                <span class="status-badge active">Active</span>
                            </div>
                            <div class="col actions">
                                <button class="btn-icon view"><i class="fas fa-eye"></i></button>
                                <button class="btn-icon edit"><i class="fas fa-edit"></i></button>
                                <button class="btn-icon suspend"><i class="fas fa-ban"></i></button>
                            </div>
                        </div>
                        
                        <div class="table-row">
                            <div class="col user">
                                <div class="user-avatar">
                                    <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="User">
                                </div>
                                <div class="user-info">
                                    <h4>Sarah Johnson</h4>
                                    <span>sarah@example.com</span>
                                </div>
                            </div>
                            <div class="col type">
                                <span class="badge farmer">Farmer</span>
                            </div>
                            <div class="col joined">10 Jun 2025</div>
                            <div class="col last-active">Yesterday, 2:30 PM</div>
                            <div class="col status">
                                <span class="status-badge active">Active</span>
                            </div>
                            <div class="col actions">
                                <button class="btn-icon view"><i class="fas fa-eye"></i></button>
                                <button class="btn-icon edit"><i class="fas fa-edit"></i></button>
                                <button class="btn-icon suspend"><i class="fas fa-ban"></i></button>
                            </div>
                        </div>
                        
                        <div class="table-row">
                            <div class="col user">
                                <div class="user-avatar">
                                    <img src="https://randomuser.me/api/portraits/men/67.jpg" alt="User">
                                </div>
                                <div class="user-info">
                                    <h4>David Smith</h4>
                                    <span>david@example.com</span>
                                </div>
                            </div>
                            <div class="col type">
                                <span class="badge farmer unverified">Farmer (Unverified)</span>
                            </div>
                            <div class="col joined">5 Jun 2025</div>
                            <div class="col last-active">Yesterday, 9:15 AM</div>
                            <div class="col status">
                                <span class="status-badge pending">Pending</span>
                            </div>
                            <div class="col actions">
                                <button class="btn-icon view"><i class="fas fa-eye"></i></button>
                                <button class="btn-icon verify"><i class="fas fa-check-circle"></i></button>
                                <button class="btn-icon reject"><i class="fas fa-times-circle"></i></button>
                            </div>
                        </div>
                        
                        <div class="table-row">
                            <div class="col user">
                                <div class="user-avatar">
                                    <img src="https://randomuser.me/api/portraits/women/28.jpg" alt="User">
                                </div>
                                <div class="user-info">
                                    <h4>Amanda Brown</h4>
                                    <span>amanda@example.com</span>
                                </div>
                            </div>
                            <div class="col type">
                                <span class="badge buyer">Buyer</span>
                            </div>
                            <div class="col joined">1 Jun 2025</div>
                            <div class="col last-active">3 days ago</div>
                            <div class="col status">
                                <span class="status-badge suspended">Suspended</span>
                            </div>
                            <div class="col actions">
                                <button class="btn-icon view"><i class="fas fa-eye"></i></button>
                                <button class="btn-icon edit"><i class="fas fa-edit"></i></button>
                                <button class="btn-icon activate"><i class="fas fa-check"></i></button>
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
                
                <!-- Farmer Verification Section -->
                <section class="content-section" id="farmers-content">
                    <div class="section-header">
                        <h2>Farmer Verification</h2>
                        <p>Review and verify new farmer registrations</p>
                    </div>
                    
                    <div class="farmers-filter">
                        <div class="filter-tabs">
                            <button class="tab-btn active">Pending Verification (8)</button>
                            <button class="tab-btn">Verified (328)</button>
                            <button class="tab-btn">Rejected (12)</button>
                        </div>
                        <div class="search-box">
                            <i class="fas fa-search"></i>
                            <input type="text" placeholder="Search farmers...">
                        </div>
                    </div>
                    
                    <div class="verification-grid">
                        <div class="verification-card">
                            <div class="farmer-header">
                                <div class="farmer-avatar">
                                    <img src="https://randomuser.me/api/portraits/men/53.jpg" alt="Farmer">
                                </div>
                                <div class="farmer-info">
                                    <h3>Thomas Green</h3>
                                    <p>Green Valley Farm</p>
                                    <div class="farmer-meta">
                                        <span><i class="fas fa-map-marker-alt"></i> Pretoria, Gauteng</span>
                                        <span><i class="fas fa-phone"></i> +27 12 345 6789</span>
                                    </div>
                                </div>
                            </div>
                            <div class="verification-details">
                                <div class="detail-item">
                                    <label>Farm Type:</label>
                                    <span>Vegetables & Fruits</span>
                                </div>
                                <div class="detail-item">
                                    <label>Farm Size:</label>
                                    <span>25 hectares</span>
                                </div>
                                <div class="detail-item">
                                    <label>Documents:</label>
                                    <div class="documents">
                                        <a href="#" class="document"><i class="fas fa-file-alt"></i> ID Copy</a>
                                        <a href="#" class="document"><i class="fas fa-file-alt"></i> Farm License</a>
                                        <a href="#" class="document"><i class="fas fa-file-alt"></i> Tax Certificate</a>
                                    </div>
                                </div>
                                <div class="detail-item">
                                    <label>Submitted:</label>
                                    <span>2 days ago</span>
                                </div>
                            </div>
                            <div class="verification-actions">
                                <button class="btn btn-success"><i class="fas fa-check"></i> Approve</button>
                                <button class="btn btn-danger"><i class="fas fa-times"></i> Reject</button>
                                <button class="btn btn-secondary"><i class="fas fa-envelope"></i> Request More Info</button>
                            </div>
                        </div>
                        
                        <div class="verification-card">
                            <div class="farmer-header">
                                <div class="farmer-avatar">
                                    <img src="https://randomuser.me/api/portraits/women/65.jpg" alt="Farmer">
                                </div>
                                <div class="farmer-info">
                                    <h3>Lisa White</h3>
                                    <p>Sunshine Orchards</p>
                                    <div class="farmer-meta">
                                        <span><i class="fas fa-map-marker-alt"></i> Stellenbosch, Western Cape</span>
                                        <span><i class="fas fa-phone"></i> +27 21 987 6543</span>
                                    </div>
                                </div>
                            </div>
                            <div class="verification-details">
                                <div class="detail-item">
                                    <label>Farm Type:</label>
                                    <span>Fruits</span>
                                </div>
                                <div class="detail-item">
                                    <label>Farm Size:</label>
                                    <span>15 hectares</span>
                                </div>
                                <div class="detail-item">
                                    <label>Documents:</label>
                                    <div class="documents">
                                        <a href="#" class="document"><i class="fas fa-file-alt"></i> ID Copy</a>
                                        <a href="#" class="document"><i class="fas fa-file-alt"></i> Farm License</a>
                                    </div>
                                </div>
                                <div class="detail-item">
                                    <label>Submitted:</label>
                                    <span>1 day ago</span>
                                </div>
                            </div>
                            <div class="verification-actions">
                                <button class="btn btn-success"><i class="fas fa-check"></i> Approve</button>
                                <button class="btn btn-danger"><i class="fas fa-times"></i> Reject</button>
                                <button class="btn btn-secondary"><i class="fas fa-envelope"></i> Request More Info</button>
                            </div>
                        </div>
                        
                        <div class="verification-card">
                            <div class="farmer-header">
                                <div class="farmer-avatar">
                                    <img src="https://randomuser.me/api/portraits/men/42.jpg" alt="Farmer">
                                </div>
                                <div class="farmer-info">
                                    <h3>James Wilson</h3>
                                    <p>Wilson Dairy Farm</p>
                                    <div class="farmer-meta">
                                        <span><i class="fas fa-map-marker-alt"></i> Durban, KwaZulu-Natal</span>
                                        <span><i class="fas fa-phone"></i> +27 31 456 7890</span>
                                    </div>
                                </div>
                            </div>
                            <div class="verification-details">
                                <div class="detail-item">
                                    <label>Farm Type:</label>
                                    <span>Dairy</span>
                                </div>
                                <div class="detail-item">
                                    <label>Farm Size:</label>
                                    <span>50 hectares</span>
                                </div>
                                <div class="detail-item">
                                    <label>Documents:</label>
                                    <div class="documents">
                                        <a href="#" class="document"><i class="fas fa-file-alt"></i> ID Copy</a>
                                        <a href="#" class="document"><i class="fas fa-file-alt"></i> Farm License</a>
                                        <a href="#" class="document"><i class="fas fa-file-alt"></i> Health Certificate</a>
                                    </div>
                                </div>
                                <div class="detail-item">
                                    <label>Submitted:</label>
                                    <span>3 days ago</span>
                                </div>
                            </div>
                            <div class="verification-actions">
                                <button class="btn btn-success"><i class="fas fa-check"></i> Approve</button>
                                <button class="btn btn-danger"><i class="fas fa-times"></i> Reject</button>
                                <button class="btn btn-secondary"><i class="fas fa-envelope"></i> Request More Info</button>
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
                
                <!-- Product Moderation Section -->
                <section class="content-section" id="products-content">
                    <div class="section-header">
                        <h2>Product Moderation</h2>
                        <p>Review and manage reported products</p>
                    </div>
                    
                    <div class="products-filter">
                        <div class="filter-tabs">
                            <button class="tab-btn active">Reported Products (5)</button>
                            <button class="tab-btn">All Products (2,156)</button>
                        </div>
                        <div class="search-box">
                            <i class="fas fa-search"></i>
                            <input type="text" placeholder="Search products...">
                        </div>
                    </div>
                    
                    <div class="products-table">
                        <div class="table-header">
                            <div class="col product">Product</div>
                            <div class="col farmer">Farmer</div>
                            <div class="col reports">Reports</div>
                            <div class="col reason">Reason</div>
                            <div class="col status">Status</div>
                            <div class="col actions">Actions</div>
                        </div>
                        
                        <div class="table-row">
                            <div class="col product">
                                <div class="product-image">
                                    <img src="https://static4.depositphotos.com/1020804/343/i/950/depositphotos_3434099-stock-photo-fruits.jpg" alt="Product">
                                </div>
                                <div class="product-info">
                                    <h4>Organic Apples</h4>
                                    <span class="product-category">Fruits</span>
                                    <span class="product-price">R 65.00 /kg</span>
                                </div>
                            </div>
                            <div class="col farmer">
                                <div class="farmer-avatar">
                                    <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Farmer">
                                </div>
                                <span>Green Valley Farm</span>
                            </div>
                            <div class="col reports">3</div>
                            <div class="col reason">Misleading description</div>
                            <div class="col status">
                                <span class="status-badge pending">Under Review</span>
                            </div>
                            <div class="col actions">
                                <button class="btn-icon view"><i class="fas fa-eye"></i></button>
                                <button class="btn-icon approve"><i class="fas fa-check"></i></button>
                                <button class="btn-icon remove"><i class="fas fa-trash"></i></button>
                            </div>
                        </div>
                        
                        <div class="table-row">
                            <div class="col product">
                                <div class="product-image">
                                    <img src="https://tse3.mm.bing.net/th/id/OIP.CyJLvdoWCD8uETyeCKrniAHaEo?rs=1&pid=ImgDetMain&o=7&rm=3" alt="Product">
                                </div>
                                <div class="product-info">
                                    <h4>Premium Tomatoes</h4>
                                    <span class="product-category">Vegetables</span>
                                    <span class="product-price">R 45.00 /kg</span>
                                </div>
                            </div>
                            <div class="col farmer">
                                <div class="farmer-avatar">
                                    <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Farmer">
                                </div>
                                <span>Sunshine Orchards</span>
                            </div>
                            <div class="col reports">2</div>
                            <div class="col reason">Quality issues</div>
                            <div class="col status">
                                <span class="status-badge pending">Under Review</span>
                            </div>
                            <div class="col actions">
                                <button class="btn-icon view"><i class="fas fa-eye"></i></button>
                                <button class="btn-icon approve"><i class="fas fa-check"></i></button>
                                <button class="btn-icon remove"><i class="fas fa-trash"></i></button>
                            </div>
                        </div>
                        
                        <div class="table-row">
                            <div class="col product">
                                <div class="product-image">
                                    <img src="https://tse2.mm.bing.net/th/id/OIP._ZMHcD5rUmHNE0c3NuRDIgHaE7?w=2000&h=1333&rs=1&pid=ImgDetMain&o=7&rm=3" alt="Product">
                                </div>
                                <div class="product-info">
                                    <h4>Hass Avocados</h4>
                                    <span class="product-category">Fruits</span>
                                    <span class="product-price">R 90.00 /kg</span>
                                </div>
                            </div>
                            <div class="col farmer">
                                <div class="farmer-avatar">
                                    <img src="https://randomuser.me/api/portraits/men/67.jpg" alt="Farmer">
                                </div>
                                <span>Wilson Dairy Farm</span>
                            </div>
                            <div class="col reports">1</div>
                            <div class="col reason">Incorrect weight</div>
                            <div class="col status">
                                <span class="status-badge pending">Under Review</span>
                            </div>
                            <div class="col actions">
                                <button class="btn-icon view"><i class="fas fa-eye"></i></button>
                                <button class="btn-icon approve"><i class="fas fa-check"></i></button>
                                <button class="btn-icon remove"><i class="fas fa-trash"></i></button>
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
                
                <!-- Transactions Section -->
                <section class="content-section" id="transactions-content">
                    <div class="section-header">
                        <h2>Transactions</h2>
                        <p>View all platform transactions</p>
                    </div>
                    
                    <div class="transactions-filter">
                        <div class="filter-tabs">
                            <button class="tab-btn active">All Transactions (245)</button>
                            <button class="tab-btn">Today (15)</button>
                            <button class="tab-btn">This Week (78)</button>
                            <button class="tab-btn">This Month (156)</button>
                        </div>
                        <div class="date-filter">
                            <i class="fas fa-calendar-alt"></i>
                            <span>Last 30 days</span>
                            <i class="fas fa-chevron-down"></i>
                        </div>
                    </div>
                    
                    <div class="transactions-table">
                        <div class="table-header">
                            <div class="col id">Transaction ID</div>
                            <div class="col buyer">Buyer</div>
                            <div class="col farmer">Farmer</div>
                            <div class="col amount">Amount</div>
                            <div class="col date">Date</div>
                            <div class="col status">Status</div>
                            <div class="col actions">Actions</div>
                        </div>
                        
                        <div class="table-row">
                            <div class="col id">#TXN-00125</div>
                            <div class="col buyer">
                                <div class="user-avatar">
                                    <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Buyer">
                                </div>
                                <span>Thando Nkosi</span>
                            </div>
                            <div class="col farmer">
                                <div class="user-avatar">
                                    <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Farmer">
                                </div>
                                <span>Sarah Johnson</span>
                            </div>
                            <div class="col amount">R 675.00</div>
                            <div class="col date">Today, 10:45 AM</div>
                            <div class="col status">
                                <span class="status-badge completed">Completed</span>
                            </div>
                            <div class="col actions">
                                <button class="btn-icon view"><i class="fas fa-eye"></i></button>
                                <button class="btn-icon receipt"><i class="fas fa-receipt"></i></button>
                            </div>
                        </div>
                        
                        <div class="table-row">
                            <div class="col id">#TXN-00124</div>
                            <div class="col buyer">
                                <div class="user-avatar">
                                    <img src="https://randomuser.me/api/portraits/women/28.jpg" alt="Buyer">
                                </div>
                                <span>Amanda Brown</span>
                            </div>
                            <div class="col farmer">
                                <div class="user-avatar">
                                    <img src="https://randomuser.me/api/portraits/men/67.jpg" alt="Farmer">
                                </div>
                                <span>David Smith</span>
                            </div>
                            <div class="col amount">R 650.00</div>
                            <div class="col date">Yesterday, 2:30 PM</div>
                            <div class="col status">
                                <span class="status-badge completed">Completed</span>
                            </div>
                            <div class="col actions">
                                <button class="btn-icon view"><i class="fas fa-eye"></i></button>
                                <button class="btn-icon receipt"><i class="fas fa-receipt"></i></button>
                            </div>
                        </div>
                        
                        <div class="table-row">
                            <div class="col id">#TXN-00123</div>
                            <div class="col buyer">
                                <div class="user-avatar">
                                    <img src="https://randomuser.me/api/portraits/men/42.jpg" alt="Buyer">
                                </div>
                                <span>James Wilson</span>
                            </div>
                            <div class="col farmer">
                                <div class="user-avatar">
                                    <img src="https://randomuser.me/api/portraits/women/65.jpg" alt="Farmer">
                                </div>
                                <span>Lisa White</span>
                            </div>
                            <div class="col amount">R 600.00</div>
                            <div class="col date">Yesterday, 9:15 AM</div>
                            <div class="col status">
                                <span class="status-badge refunded">Refunded</span>
                            </div>
                            <div class="col actions">
                                <button class="btn-icon view"><i class="fas fa-eye"></i></button>
                                <button class="btn-icon receipt"><i class="fas fa-receipt"></i></button>
                            </div>
                        </div>
                        
                        <div class="table-row">
                            <div class="col id">#TXN-00122</div>
                            <div class="col buyer">
                                <div class="user-avatar">
                                    <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Buyer">
                                </div>
                                <span>Sarah Johnson</span>
                            </div>
                            <div class="col farmer">
                                <div class="user-avatar">
                                    <img src="https://randomuser.me/api/portraits/men/53.jpg" alt="Farmer">
                                </div>
                                <span>Thomas Green</span>
                            </div>
                            <div class="col amount">R 450.00</div>
                            <div class="col date">3 days ago</div>
                            <div class="col status">
                                <span class="status-badge failed">Failed</span>
                            </div>
                            <div class="col actions">
                                <button class="btn-icon view"><i class="fas fa-eye"></i></button>
                                <button class="btn-icon receipt"><i class="fas fa-receipt"></i></button>
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
                
                <!-- Farmer Payments Section -->
                <section class="content-section" id="payments-content">
                    <div class="section-header">
                        <h2>Farmer Payments</h2>
                        <p>Process payments to farmers for completed orders</p>
                    </div>
                    
                    <div class="payments-filter">
                        <div class="filter-tabs">
                            <button class="tab-btn active">Pending Payments (12)</button>
                            <button class="tab-btn">Payment History (156)</button>
                        </div>
                        <div class="search-box">
                            <i class="fas fa-search"></i>
                            <input type="text" placeholder="Search farmers...">
                        </div>
                    </div>
                    
                    <div class="payments-table">
                        <div class="table-header">
                            <div class="col farmer">Farmer</div>
                            <div class="col orders">Orders</div>
                            <div class="col amount">Amount</div>
                            <div class="col last-payment">Last Payment</div>
                            <div class="col status">Status</div>
                            <div class="col actions">Actions</div>
                        </div>
                        
                        <div class="table-row">
                            <div class="col farmer">
                                <div class="farmer-avatar">
                                    <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Farmer">
                                </div>
                                <div class="farmer-info">
                                    <h4>Sarah Johnson</h4>
                                    <span>Sunshine Orchards</span>
                                </div>
                            </div>
                            <div class="col orders">3</div>
                            <div class="col amount">R 1,250.00</div>
                            <div class="col last-payment">15 Jun 2025</div>
                            <div class="col status">
                                <span class="status-badge pending">Pending</span>
                            </div>
                            <div class="col actions">
                                <button class="btn btn-primary"><i class="fas fa-money-bill-wave"></i> Process Payment</button>
                            </div>
                        </div>
                        
                        <div class="table-row">
                            <div class="col farmer">
                                <div class="farmer-avatar">
                                    <img src="https://randomuser.me/api/portraits/men/67.jpg" alt="Farmer">
                                </div>
                                <div class="farmer-info">
                                    <h4>David Smith</h4>
                                    <span>Green Valley Farm</span>
                                </div>
                            </div>
                            <div class="col orders">2</div>
                            <div class="col amount">R 980.00</div>
                            <div class="col last-payment">10 Jun 2025</div>
                            <div class="col status">
                                <span class="status-badge pending">Pending</span>
                            </div>
                            <div class="col actions">
                                <button class="btn btn-primary"><i class="fas fa-money-bill-wave"></i> Process Payment</button>
                            </div>
                        </div>
                        
                        <div class="table-row">
                            <div class="col farmer">
                                <div class="farmer-avatar">
                                    <img src="https://randomuser.me/api/portraits/women/65.jpg" alt="Farmer">
                                </div>
                                <div class="farmer-info">
                                    <h4>Lisa White</h4>
                                    <span>Sunshine Orchards</span>
                                </div>
                            </div>
                            <div class="col orders">1</div>
                            <div class="col amount">R 1,750.00</div>
                            <div class="col last-payment">5 Jun 2025</div>
                            <div class="col status">
                                <span class="status-badge pending">Pending</span>
                            </div>
                            <div class="col actions">
                                <button class="btn btn-primary"><i class="fas fa-money-bill-wave"></i> Process Payment</button>
                            </div>
                        </div>
                        
                        <div class="table-row">
                            <div class="col farmer">
                                <div class="farmer-avatar">
                                    <img src="https://randomuser.me/api/portraits/men/53.jpg" alt="Farmer">
                                </div>
                                <div class="farmer-info">
                                    <h4>Thomas Green</h4>
                                    <span>Green Valley Farm</span>
                                </div>
                            </div>
                            <div class="col orders">4</div>
                            <div class="col amount">R 2,150.00</div>
                            <div class="col last-payment">1 Jun 2025</div>
                            <div class="col status">
                                <span class="status-badge pending">Pending</span>
                            </div>
                            <div class="col actions">
                                <button class="btn btn-primary"><i class="fas fa-money-bill-wave"></i> Process Payment</button>
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
                
                <!-- Support Tickets Section -->
                <section class="content-section" id="support-content">
                    <div class="section-header">
                        <h2>Support Tickets</h2>
                        <p>Manage support requests from users</p>
                    </div>
                    
                    <div class="support-filter">
                        <div class="filter-tabs">
                            <button class="tab-btn active">Open Tickets (15)</button>
                            <button class="tab-btn">In Progress (8)</button>
                            <button class="tab-btn">Resolved (42)</button>
                        </div>
                        <div class="search-box">
                            <i class="fas fa-search"></i>
                            <input type="text" placeholder="Search tickets...">
                        </div>
                    </div>
                    
                    <div class="support-tickets">
                        <div class="ticket-card">
                            <div class="ticket-header">
                                <div class="ticket-id">#TKT-00125</div>
                                <div class="ticket-priority high">High</div>
                            </div>
                            <div class="ticket-subject">Payment issue - Order #ORD-00120</div>
                            <div class="ticket-meta">
                                <div class="user-info">
                                    <div class="user-avatar">
                                        <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="User">
                                    </div>
                                    <span>Thando Nkosi</span>
                                </div>
                                <div class="ticket-date">Today, 10:45 AM</div>
                            </div>
                            <div class="ticket-actions">
                                <button class="btn btn-primary"><i class="fas fa-reply"></i> Respond</button>
                                <button class="btn btn-success"><i class="fas fa-check"></i> Resolve</button>
                            </div>
                        </div>
                        
                        <div class="ticket-card">
                            <div class="ticket-header">
                                <div class="ticket-id">#TKT-00124</div>
                                <div class="ticket-priority medium">Medium</div>
                            </div>
                            <div class="ticket-subject">Account verification question</div>
                            <div class="ticket-meta">
                                <div class="user-info">
                                    <div class="user-avatar">
                                        <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="User">
                                    </div>
                                    <span>Sarah Johnson</span>
                                </div>
                                <div class="ticket-date">Yesterday, 2:30 PM</div>
                            </div>
                            <div class="ticket-actions">
                                <button class="btn btn-primary"><i class="fas fa-reply"></i> Respond</button>
                                <button class="btn btn-success"><i class="fas fa-check"></i> Resolve</button>
                            </div>
                        </div>
                        
                        <div class="ticket-card">
                            <div class="ticket-header">
                                <div class="ticket-id">#TKT-00123</div>
                                <div class="ticket-priority low">Low</div>
                            </div>
                            <div class="ticket-subject">How to update product listing?</div>
                            <div class="ticket-meta">
                                <div class="user-info">
                                    <div class="user-avatar">
                                        <img src="https://randomuser.me/api/portraits/men/67.jpg" alt="User">
                                    </div>
                                    <span>David Smith</span>
                                </div>
                                <div class="ticket-date">Yesterday, 9:15 AM</div>
                            </div>
                            <div class="ticket-actions">
                                <button class="btn btn-primary"><i class="fas fa-reply"></i> Respond</button>
                                <button class="btn btn-success"><i class="fas fa-check"></i> Resolve</button>
                            </div>
                        </div>
                        
                        <div class="ticket-card">
                            <div class="ticket-header">
                                <div class="ticket-id">#TKT-00122</div>
                                <div class="ticket-priority high">High</div>
                            </div>
                            <div class="ticket-subject">Reported product - Organic Apples</div>
                            <div class="ticket-meta">
                                <div class="user-info">
                                    <div class="user-avatar">
                                        <img src="https://randomuser.me/api/portraits/women/28.jpg" alt="User">
                                    </div>
                                    <span>Amanda Brown</span>
                                </div>
                                <div class="ticket-date">3 days ago</div>
                            </div>
                            <div class="ticket-actions">
                                <button class="btn btn-primary"><i class="fas fa-reply"></i> Respond</button>
                                <button class="btn btn-success"><i class="fas fa-check"></i> Resolve</button>
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
                
                <!-- Reports & Analytics Section -->
                <section class="content-section" id="reports-content">
                    <div class="section-header">
                        <h2>Reports & Analytics</h2>
                        <p>Platform performance and insights</p>
                    </div>
                    
                    <div class="reports-tabs">
                        <button class="tab-btn active">Overview</button>
                        <button class="tab-btn">User Growth</button>
                        <button class="tab-btn">Transaction Volume</button>
                        <button class="tab-btn">Farmer Performance</button>
                        <button class="tab-btn">Export Data</button>
                    </div>
                    
                    <div class="reports-grid">
                        <div class="chart-card">
                            <div class="card-header">
                                <h3>User Growth</h3>
                                <div class="time-filter">
                                    <button class="active">Month</button>
                                    <button>Quarter</button>
                                    <button>Year</button>
                                </div>
                            </div>
                            <div class="chart-placeholder">
                                <i class="fas fa-chart-line"></i>
                                <p>User growth chart will appear here</p>
                            </div>
                        </div>
                        
                        <div class="chart-card">
                            <div class="card-header">
                                <h3>Transaction Volume</h3>
                                <div class="time-filter">
                                    <button class="active">Month</button>
                                    <button>Quarter</button>
                                    <button>Year</button>
                                </div>
                            </div>
                            <div class="chart-placeholder">
                                <i class="fas fa-chart-bar"></i>
                                <p>Transaction volume chart will appear here</p>
                            </div>
                        </div>
                        
                        <div class="chart-card">
                            <div class="card-header">
                                <h3>Top Categories</h3>
                                <div class="time-filter">
                                    <button class="active">Month</button>
                                    <button>Quarter</button>
                                    <button>Year</button>
                                </div>
                            </div>
                            <div class="chart-placeholder">
                                <i class="fas fa-chart-pie"></i>
                                <p>Category distribution chart will appear here</p>
                            </div>
                        </div>
                        
                        <div class="chart-card">
                            <div class="card-header">
                                <h3>Regional Distribution</h3>
                                <div class="time-filter">
                                    <button class="active">Month</button>
                                    <button>Quarter</button>
                                    <button>Year</button>
                                </div>
                            </div>
                            <div class="chart-placeholder">
                                <i class="fas fa-map-marked-alt"></i>
                                <p>Regional distribution chart will appear here</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="export-options">
                        <h3>Export Data</h3>
                        <div class="export-form">
                            <div class="form-group">
                                <label for="export-type">Data Type</label>
                                <select id="export-type">
                                    <option>User Data</option>
                                    <option>Transaction Data</option>
                                    <option>Product Data</option>
                                    <option>Support Tickets</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="export-format">Format</label>
                                <select id="export-format">
                                    <option>CSV</option>
                                    <option>Excel</option>
                                    <option>PDF</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="export-date">Date Range</label>
                                <select id="export-date">
                                    <option>Last 7 days</option>
                                    <option>Last 30 days</option>
                                    <option>Last quarter</option>
                                    <option>Last year</option>
                                    <option>Custom range</option>
                                </select>
                            </div>
                            <button class="btn btn-primary"><i class="fas fa-file-export"></i> Export Data</button>
                        </div>
                    </div>
                </section>
                
                <!-- Announcements Section -->
                <section class="content-section" id="announcements-content">
                    <div class="section-header">
                        <h2>Announcements</h2>
                        <p>Send notifications to platform users</p>
                    </div>
                    
                    <div class="announcements-actions">
                        <button class="btn btn-primary">
                            <i class="fas fa-plus"></i> Create New Announcement
                        </button>
                        <div class="search-box">
                            <i class="fas fa-search"></i>
                            <input type="text" placeholder="Search announcements...">
                        </div>
                    </div>
                    
                    <div class="announcements-list">
                        <div class="announcement-card">
                            <div class="announcement-header">
                                <h3>System Maintenance Scheduled</h3>
                                <div class="announcement-meta">
                                    <span class="status active">Active</span>
                                    <span class="date">Posted: 15 Jun 2025</span>
                                </div>
                            </div>
                            <div class="announcement-content">
                                <p>We will be performing scheduled maintenance on the platform this Saturday from 2:00 AM to 4:00 AM. The platform will be unavailable during this time.</p>
                                <div class="announcement-target">
                                    <span><i class="fas fa-users"></i> All Users</span>
                                </div>
                            </div>
                            <div class="announcement-actions">
                                <button class="btn btn-secondary"><i class="fas fa-edit"></i> Edit</button>
                                <button class="btn btn-danger"><i class="fas fa-trash"></i> Delete</button>
                            </div>
                        </div>
                        
                        <div class="announcement-card">
                            <div class="announcement-header">
                                <h3>New Feature: Bulk Ordering</h3>
                                <div class="announcement-meta">
                                    <span class="status active">Active</span>
                                    <span class="date">Posted: 10 Jun 2025</span>
                                </div>
                            </div>
                            <div class="announcement-content">
                                <p>We're excited to announce our new bulk ordering feature! Farmers can now offer discounts for larger orders. Check your dashboard for details.</p>
                                <div class="announcement-target">
                                    <span><i class="fas fa-user-tie"></i> Farmers Only</span>
                                </div>
                            </div>
                            <div class="announcement-actions">
                                <button class="btn btn-secondary"><i class="fas fa-edit"></i> Edit</button>
                                <button class="btn btn-danger"><i class="fas fa-trash"></i> Delete</button>
                            </div>
                        </div>
                        
                        <div class="announcement-card">
                            <div class="announcement-header">
                                <h3>Payment Processing Update</h3>
                                <div class="announcement-meta">
                                    <span class="status expired">Expired</span>
                                    <span class="date">Posted: 5 Jun 2025</span>
                                </div>
                            </div>
                            <div class="announcement-content">
                                <p>We've updated our payment processing system to reduce transaction times. All payments will now be processed within 24 hours.</p>
                                <div class="announcement-target">
                                    <span><i class="fas fa-user-tie"></i> Farmers Only</span>
                                </div>
                            </div>
                            <div class="announcement-actions">
                                <button class="btn btn-secondary"><i class="fas fa-edit"></i> Edit</button>
                                <button class="btn btn-danger"><i class="fas fa-trash"></i> Delete</button>
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
                
                <!-- System Settings Section -->
                <section class="content-section" id="settings-content">
                    <div class="section-header">
                        <h2>System Settings</h2>
                        <p>Configure platform settings and preferences</p>
                    </div>
                    
                    <div class="settings-tabs">
                        <button class="tab-btn active">General</button>
                        <button class="tab-btn">Payment</button>
                        <button class="tab-btn">Notifications</button>
                        <button class="tab-btn">Security</button>
                        <button class="tab-btn">Maintenance</button>
                    </div>
                    
                    <div class="settings-form">
                        <form>
                            <div class="form-group">
                                <label for="platform-name">Platform Name</label>
                                <input type="text" id="platform-name" value="AgriMarket">
                            </div>
                            
                            <div class="form-group">
                                <label for="platform-currency">Default Currency</label>
                                <select id="platform-currency">
                                    <option>ZAR - South African Rand</option>
                                    <option>USD - US Dollar</option>
                                    <option>EUR - Euro</option>
                                </select>
                            </div>
                            
                            <div class="form-group">
                                <label for="platform-timezone">Timezone</label>
                                <select id="platform-timezone">
                                    <option>Africa/Johannesburg (SAST)</option>
                                    <option>UTC</option>
                                    <option>Other timezones...</option>
                                </select>
                            </div>
                            
                            <div class="form-group">
                                <label for="platform-logo">Platform Logo</label>
                                <div class="file-upload">
                                    <div class="upload-preview">
                                        <img src="../../assets/images/logo.png" alt="Current Logo">
                                    </div>
                                    <input type="file" id="platform-logo" accept="image/*">
                                    <label for="platform-logo" class="btn btn-secondary">Change Logo</label>
                                </div>
                            </div>
                            
                            <div class="form-group">
                                <label for="platform-favicon">Favicon</label>
                                <div class="file-upload">
                                    <div class="upload-preview small">
                                        <img src="../../assets/images/favicon.png" alt="Current Favicon">
                                    </div>
                                    <input type="file" id="platform-favicon" accept="image/*">
                                    <label for="platform-favicon" class="btn btn-secondary">Change Favicon</label>
                                </div>
                            </div>
                            
                            <div class="form-group">
                                <label class="toggle-label">
                                    <span>Enable Farmer Verification</span>
                                    <label class="toggle-switch">
                                        <input type="checkbox" id="verification-toggle" checked>
                                        <span class="slider"></span>
                                    </label>
                                </label>
                            </div>
                            
                            <div class="form-group">
                                <label class="toggle-label">
                                    <span>Enable Product Moderation</span>
                                    <label class="toggle-switch">
                                        <input type="checkbox" id="moderation-toggle" checked>
                                        <span class="slider"></span>
                                    </label>
                                </label>
                            </div>
                            
                            <div class="form-group">
                                <label class="toggle-label">
                                    <span>Maintenance Mode</span>
                                    <label class="toggle-switch">
                                        <input type="checkbox" id="maintenance-toggle">
                                        <span class="slider"></span>
                                    </label>
                                </label>
                                <div id="maintenance-fields" style="display: none; margin-top: 10px;">
                                    <label for="maintenance-message" style="font-weight: 500;">Maintenance Message:</label>
                                    <textarea id="maintenance-message" placeholder="Enter message to display during maintenance..."></textarea>
                                </div>
                            </div>
                            
                            <div class="form-actions">
                                <button type="button" class="btn btn-secondary">Cancel</button>
                                <button type="submit" class="btn btn-primary">Save Settings</button>
                            </div>
                        </form>
                    </div>
                </section>
            </div>
        </main>
    </div>

    <script src="../../scripts/admin.js"></script>
    <script src="../../scripts/admin-chart.js"></script>
</body>
</html>