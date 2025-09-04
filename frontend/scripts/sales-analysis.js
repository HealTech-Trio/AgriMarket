// Products & Sales Overview Modal Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Create products & sales modal element
    const productsSalesModal = document.createElement('div');
    productsSalesModal.className = 'products-sales-modal';
    productsSalesModal.innerHTML = `
        <div class="products-sales-modal-backdrop"></div>
        <div class="products-sales-modal-container">
            <div class="products-sales-modal-header">
                <div class="products-sales-header-content">
                    <div class="products-sales-avatar">
                        <div class="products-sales-pulse"></div>
                        <i class="fas fa-sticky-note"></i>
                    </div>
                    <div class="products-sales-header-text">
                        <h2>Products & Sales Overview</h2>
                        <p>Analyze product trends and get AI-driven selling advice</p>
                    </div>
                </div>
                <button class="products-sales-modal-close" id="closeProductsSalesModal">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="products-sales-modal-body">
                <div class="products-sales-filters">
                    <div class="ps-filter-group">
                        <label for="ps-timeframe">Time Frame</label>
                        <select id="ps-timeframe">
                            <option value="7">Last 7 Days</option>
                            <option value="30" selected>Last 30 Days</option>
                            <option value="90">Last 90 Days</option>
                            <option value="365">Last 12 Months</option>
                        </select>
                    </div>
                    <div class="ps-filter-group">
                        <label for="ps-category">Category</label>
                        <select id="ps-category">
                            <option value="all" selected>All Categories</option>
                            <option value="vegetables">Vegetables</option>
                            <option value="fruits">Fruits</option>
                            <option value="grains">Grains</option>
                            <option value="dairy">Dairy</option>
                        </select>
                    </div>
                    <div class="ps-filter-group">
                        <label for="ps-sort">Sort By</label>
                        <select id="ps-sort">
                            <option value="revenue" selected>Revenue</option>
                            <option value="units">Units Sold</option>
                            <option value="growth">Growth Rate</option>
                            <option value="rating">Customer Rating</option>
                        </select>
                    </div>
                    <button class="apply-ps-filters" id="applyPsFilters">
                        <i class="fas fa-filter"></i>
                        Apply Filters
                    </button>
                </div>
                
                <div class="sales-overview">
                    <div class="overview-header">
                        <h3 class="overview-title"><i class="fas fa-chart-line"></i> Sales Overview</h3>
                        <div class="overview-period">Sept 1 - Sept 30, 2023</div>
                    </div>
                    <div class="overview-cards">
                        <div class="ps-overview-card primary">
                            <div class="ps-card-title">
                                <i class="fas fa-money-bill-wave"></i>
                                Total Revenue
                            </div>
                            <div class="ps-card-value">R 24,580</div>
                            <div class="ps-card-change change-positive">
                                <i class="fas fa-arrow-up"></i>
                                +18.3% from previous period
                            </div>
                        </div>
                        <div class="ps-overview-card">
                            <div class="ps-card-title">
                                <i class="fas fa-shopping-bag"></i>
                                Units Sold
                            </div>
                            <div class="ps-card-value">542</div>
                            <div class="ps-card-change change-positive">
                                <i class="fas fa-arrow-up"></i>
                                +12.7% from previous period
                            </div>
                        </div>
                        <div class="ps-overview-card">
                            <div class="ps-card-title">
                                <i class="fas fa-truck"></i>
                                Avg. Order Value
                            </div>
                            <div class="ps-card-value">R 845</div>
                            <div class="ps-card-change change-positive">
                                <i class="fas fa-arrow-up"></i>
                                +5.2% from previous period
                            </div>
                        </div>
                        <div class="ps-overview-card">
                            <div class="ps-card-title">
                                <i class="fas fa-star"></i>
                                Customer Rating
                            </div>
                            <div class="ps-card-value">4.7/5</div>
                            <div class="ps-card-change change-negative">
                                <i class="fas fa-arrow-down"></i>
                                -0.2 from previous period
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="sales-trends">
                    <div class="trend-header">
                        <h3 class="trend-title"><i class="fas fa-chart-bar"></i> Sales Trends</h3>
                        <div class="trend-period">
                            <button class="trend-btn active">Weekly</button>
                            <button class="trend-btn">Monthly</button>
                            <button class="trend-btn">Quarterly</button>
                        </div>
                    </div>
                    <div class="trend-chart-container">
                        <div class="trend-chart-placeholder">
                            <i class="fas fa-chart-line"></i>
                            <p>Sales trends visualization will appear here</p>
                            <small>Weekly revenue and units sold comparison</small>
                        </div>
                    </div>
                </div>
                
                <div class="top-products">
                    <h3 class="top-products-title"><i class="fas fa-trophy"></i> Top Performing Products</h3>
                    <div class="product-rankings">
                        <div class="product-item">
                            <div class="product-rank">1</div>
                            <div class="product-image">
                                <img src="https://thumbs.dreamstime.com/b/view-fresh-tomatoes-different-shapes-tomato-shapes-173362970.jpg" alt="Organic Tomatoes">
                            </div>
                            <div class="product-info">
                                <div class="product-name">Organic Tomatoes</div>
                                <div class="product-category">Vegetables</div>
                            </div>
                            <div class="product-sales">
                                <div class="sales-value">R 8,450</div>
                                <div class="sales-growth change-positive">
                                    <i class="fas fa-arrow-up"></i>
                                    +22.5%
                                </div>
                            </div>
                        </div>
                        <div class="product-item">
                            <div class="product-rank">2</div>
                            <div class="product-image">
                                <img src="https://tse1.mm.bing.net/th/id/OIP.cc1fmrVHT-YDXEVia6rsUwHaHa?rs=1&pid=ImgDetMain&o=7&rm=3" alt="Fresh Apples">
                            </div>
                            <div class="product-info">
                                <div class="product-name">Fresh Apples</div>
                                <div class="product-category">Fruits</div>
                            </div>
                            <div class="product-sales">
                                <div class="sales-value">R 6,820</div>
                                <div class="sales-growth change-positive">
                                    <i class="fas fa-arrow-up"></i>
                                    +15.3%
                                </div>
                            </div>
                        </div>
                        <div class="product-item">
                            <div class="product-rank">3</div>
                            <div class="product-image">
                                <img src="https://tse4.mm.bing.net/th/id/OIP.jNvLzjm9bZSCJKKjiZL2AQAAAA?rs=1&pid=ImgDetMain&o=7&rm=3" alt="Sweet Corn">
                            </div>
                            <div class="product-info">
                                <div class="product-name">Sweet Corn</div>
                                <div class="product-category">Vegetables</div>
                            </div>
                            <div class="product-sales">
                                <div class="sales-value">R 4,230</div>
                                <div class="sales-growth change-positive">
                                    <i class="fas fa-arrow-up"></i>
                                    +8.7%
                                </div>
                            </div>
                        </div>
                        <div class="product-item">
                            <div class="product-rank">4</div>
                            <div class="product-image">
                                <img src="https://th.bing.com/th/id/R.2a211c11dab40396b01d0129693c27d6?rik=YQM%2fl2ZuC0I3ug&pid=ImgRaw&r=0" alt="Carrots">
                            </div>
                            <div class="product-info">
                                <div class="product-name">Fresh Carrots</div>
                                <div class="product-category">Vegetables</div>
                            </div>
                            <div class="product-sales">
                                <div class="sales-value">R 3,150</div>
                                <div class="sales-growth change-negative">
                                    <i class="fas fa-arrow-down"></i>
                                    -3.2%
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="ai-recommendations">
                    <h3 class="ai-rec-title"><i class="fas fa-robot"></i> AI-Powered Recommendations</h3>
                    <div class="recommendation-cards">
                        <div class="ai-rec-card">
                            <div class="rec-card-header">
                                <div class="rec-card-icon">
                                    <i class="fas fa-tags"></i>
                                </div>
                                <h4 class="rec-card-title">Pricing Optimization</h4>
                            </div>
                            <p class="rec-card-content">Increase tomato prices by 8-12% during peak demand periods. Current market can support premium pricing for organic varieties.</p>
                            <div class="rec-card-metrics">
                                <div class="rec-metric">
                                    <div class="rec-metric-label">Potential Revenue Increase</div>
                                    <div class="rec-metric-value positive">+R 1,250</div>
                                </div>
                                <div class="rec-metric">
                                    <div class="rec-metric-label">Confidence Level</div>
                                    <div class="rec-metric-value">92%</div>
                                </div>
                            </div>
                        </div>
                        <div class="ai-rec-card premium">
                            <div class="rec-card-header">
                                <div class="rec-card-icon">
                                    <i class="fas fa-calendar-alt"></i>
                                </div>
                                <h4 class="rec-card-title">Seasonal Planning</h4>
                                <div class="rec-card-badge">
                                    <i class="fas fa-crown"></i>
                                    Pro
                                </div>
                            </div>
                            <p class="rec-card-content">Expand apple orchard by 15% for next season. Market demand is growing at 18% annually with higher margins in Q4.</p>
                            <div class="rec-card-metrics">
                                <div class="rec-metric">
                                    <div class="rec-metric-label">ROI Potential</div>
                                    <div class="rec-metric-value positive">+34%</div>
                                </div>
                                <div class="rec-metric">
                                    <div class="rec-metric-label">Confidence Level</div>
                                    <div class="rec-metric-value">88%</div>
                                </div>
                            </div>
                        </div>
                        <div class="ai-rec-card">
                            <div class="rec-card-header">
                                <div class="rec-card-icon">
                                    <i class="fas fa-box"></i>
                                </div>
                                <h4 class="rec-card-title">Inventory Management</h4>
                            </div>
                            <p class="rec-card-content">Reduce carrot inventory by 20% and allocate space to higher-margin products. Carrot sales have declined 3.2% while tomatoes grew 22.5%.</p>
                            <div class="rec-card-metrics">
                                <div class="rec-metric">
                                    <div class="rec-metric-label">Space Optimization</div>
                                    <div class="rec-metric-value positive">+15%</div>
                                </div>
                                <div class="rec-metric">
                                    <div class="rec-metric-label">Confidence Level</div>
                                    <div class="rec-metric-value">85%</div>
                                </div>
                            </div>
                        </div>
                        <div class="ai-rec-card premium">
                            <div class="rec-card-header">
                                <div class="rec-card-icon">
                                    <i class="fas fa-chart-pie"></i>
                                </div>
                                <h4 class="rec-card-title">Market Expansion</h4>
                                <div class="rec-card-badge">
                                    <i class="fas fa-crown"></i>
                                    Pro
                                </div>
                            </div>
                            <p class="rec-card-content">Explore export opportunities for premium organic tomatoes to European markets. Potential premium of 40-60% over local prices.</p>
                            <div class="rec-card-metrics">
                                <div class="rec-metric">
                                    <div class="rec-metric-label">Revenue Potential</div>
                                    <div class="rec-metric-value positive">+R 18,500</div>
                                </div>
                                <div class="rec-metric">
                                    <div class="rec-metric-label">Confidence Level</div>
                                    <div class="rec-metric-value">79%</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="upgrade-section">
                    <div class="upgrade-content">
                        <h3 class="upgrade-title"><i class="fas fa-crown"></i> Upgrade to Pro Version</h3>
                        <p class="upgrade-desc">Unlock advanced analytics, predictive insights, and personalized recommendations to maximize your farm's profitability.</p>
                        <div class="upgrade-features">
                            <div class="upgrade-feature">
                                <i class="fas fa-check-circle"></i>
                                <span>Advanced predictive analytics</span>
                            </div>
                            <div class="upgrade-feature">
                                <i class="fas fa-check-circle"></i>
                                <span>Market trend forecasting</span>
                            </div>
                            <div class="upgrade-feature">
                                <i class="fas fa-check-circle"></i>
                                <span>Export opportunity analysis</span>
                            </div>
                            <div class="upgrade-feature">
                                <i class="fas fa-check-circle"></i>
                                <span>Competitor benchmarking</span>
                            </div>
                        </div>
                    </div>
                    <button class="upgrade-btn">
                        <i class="fas fa-rocket"></i>
                        Upgrade Now
                    </button>
                </div>
                
                <div class="products-sales-actions">
                    <button class="ps-action-btn">
                        <i class="fas fa-download"></i>
                        Export Report
                    </button>
                    <button class="ps-action-btn">
                        <i class="fas fa-envelope"></i>
                        Share Insights
                    </button>
                    <button class="ps-action-btn primary">
                        <i class="fas fa-play-circle"></i>
                        Apply Recommendations
                    </button>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(productsSalesModal);
    
    // Get elements
    const productsSalesModalBackdrop = productsSalesModal.querySelector('.products-sales-modal-backdrop');
    const closeProductsSalesModal = productsSalesModal.querySelector('#closeProductsSalesModal');
    const applyPsFilters = productsSalesModal.querySelector('#applyPsFilters');
    const trendBtns = productsSalesModal.querySelectorAll('.trend-btn');
    
    // Open modal when products & sales overview is clicked
    document.addEventListener('click', function(e) {
        if (e.target.closest('.products-sales-overview')) {
            e.preventDefault();
            openProductsSalesModal();
        }
    });
    
    // Close modal when close button is clicked
    if (closeProductsSalesModal) {
        closeProductsSalesModal.addEventListener('click', closeProductsSalesModalFunc);
    }
    
    // Close modal when clicking outside
    if (productsSalesModalBackdrop) {
        productsSalesModalBackdrop.addEventListener('click', function(e) {
            if (e.target === productsSalesModalBackdrop) {
                closeProductsSalesModalFunc();
            }
        });
    }
    
    // Apply filters button click
    if (applyPsFilters) {
        applyPsFilters.addEventListener('click', function() {
            applyPsFilters.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Applying...';
            
            // Simulate API call delay
            setTimeout(() => {
                updateSalesData();
                applyPsFilters.innerHTML = '<i class="fas fa-filter"></i> Apply Filters';
            }, 1500);
        });
    }
    
    // Trend buttons click
    trendBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            trendBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            updateChart(this.textContent);
        });
    });
    
    // Function to open the Products & Sales modal
    function openProductsSalesModal() {
        productsSalesModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Initialize with default data
        updateSalesData();
    }
    
    // Function to close the Products & Sales modal
    function closeProductsSalesModalFunc() {
        productsSalesModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    
    // Function to update sales data based on filters
    function updateSalesData() {
        const timeframe = document.getElementById('ps-timeframe').value;
        const category = document.getElementById('ps-category').value;
        const sortBy = document.getElementById('ps-sort').value;
        
        // In a real app, this would fetch data from an API
        // For demo, we'll update with mock data based on filters
        
        // Update overview cards with random variations
        const overviewCards = productsSalesModal.querySelectorAll('.ps-overview-card');
        const values = [24580, 542, 845, 4.7];
        const changes = [18.3, 12.7, 5.2, -0.2];
        
        overviewCards.forEach((card, index) => {
            // Add some random variation based on filters
            const variation = (Math.random() * 5) - 2.5; // -2.5 to +2.5
            const newValue = index === 3 ? 
                (values[index] + variation/10).toFixed(1) : 
                Math.round(values[index] * (1 + variation/100));
                
            const newChange = changes[index] + variation;
            
            card.querySelector('.ps-card-value').textContent = index === 3 ? 
                `${newValue}/5` : `R ${newValue.toLocaleString()}`;
                
            const changeElement = card.querySelector('.ps-card-change');
            changeElement.innerHTML = newChange >= 0 ?
                `<i class="fas fa-arrow-up"></i>+${newChange.toFixed(1)}% from previous period` :
                `<i class="fas fa-arrow-down"></i>${newChange.toFixed(1)}% from previous period`;
                
            changeElement.className = `ps-card-change ${newChange >= 0 ? 'change-positive' : 'change-negative'}`;
        });
        
        // Update product rankings based on sort criteria
        const productItems = productsSalesModal.querySelectorAll('.product-item');
        const growthRates = [22.5, 15.3, 8.7, -3.2];
        
        productItems.forEach((item, index) => {
            // Adjust growth rates based on sort criteria
            const adjustment = (Math.random() * 4) - 2; // -2 to +2
            const newGrowth = growthRates[index] + adjustment;
            
            const growthElement = item.querySelector('.sales-growth');
            growthElement.innerHTML = newGrowth >= 0 ?
                `<i class="fas fa-arrow-up"></i>+${newGrowth.toFixed(1)}%` :
                `<i class="fas fa-arrow-down"></i>${newGrowth.toFixed(1)}%`;
                
            growthElement.className = `sales-growth ${newGrowth >= 0 ? 'change-positive' : 'change-negative'}`;
            
            // Update sales values based on category filter
            if (category !== 'all') {
                const salesValue = item.querySelector('.sales-value');
                const currentValue = parseInt(salesValue.textContent.replace('R ', '').replace(',', ''));
                const newValue = Math.round(currentValue * (0.8 + Math.random() * 0.4));
                salesValue.textContent = `R ${newValue.toLocaleString()}`;
            }
        });
        
        // Update period text
        const periodText = productsSalesModal.querySelector('.overview-period');
        const today = new Date();
        const startDate = new Date();
        startDate.setDate(today.getDate() - parseInt(timeframe));
        
        const options = { month: 'short', day: 'numeric' };
        periodText.textContent = `${startDate.toLocaleDateString('en-US', options)} - ${today.toLocaleDateString('en-US', options)}`;
        
        // Animate results appearance
        const resultsSections = productsSalesModal.querySelectorAll('.sales-overview, .sales-trends, .top-products, .ai-recommendations');
        resultsSections.forEach(section => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(20px)';
            section.style.transition = 'all 0.5s ease';
            
            setTimeout(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, 100);
        });
    }
    
    // Function to update chart based on period
    function updateChart(period) {
        const chartPlaceholder = productsSalesModal.querySelector('.trend-chart-placeholder');
        
        // In a real app, this would render a real chart
        // For demo, we'll just update the text
        chartPlaceholder.innerHTML = `
            <i class="fas fa-chart-line"></i>
            <p>Sales trends for ${period} period</p>
            <small>Revenue and units sold comparison</small>
        `;
    }
});