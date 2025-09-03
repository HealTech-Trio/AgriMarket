// Market Analysis Modal Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Create market modal element
    const marketModal = document.createElement('div');
    marketModal.className = 'market-modal';
    marketModal.innerHTML = `
        <div class="market-modal-backdrop"></div>
        <div class="market-modal-container">
            <div class="market-modal-header">
                <div class="market-header-content">
                    <div class="market-avatar">
                        <div class="market-pulse"></div>
                        <i class="fas fa-chart-line"></i>
                    </div>
                    <div class="market-header-text">
                        <h2>Market Analysis</h2>
                        <p>Real-time market trends and price predictions</p>
                    </div>
                </div>
                <button class="market-modal-close" id="closeMarketModal">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="market-modal-body">
                <div class="market-filters">
                    <div class="filter-group">
                        <label for="market-crop">Crop Type</label>
                        <select id="market-crop">
                            <option value="tomatoes" selected>Tomatoes</option>
                            <option value="apples">Apples</option>
                            <option value="corn">Corn</option>
                            <option value="carrots">Carrots</option>
                            <option value="potatoes">Potatoes</option>
                        </select>
                    </div>
                    <div class="filter-group">
                        <label for="market-region">Region</label>
                        <select id="market-region">
                            <option value="gauteng" selected>Gauteng</option>
                            <option value="western-cape">Western Cape</option>
                            <option value="eastern-cape">Eastern Cape</option>
                            <option value="kzn">KwaZulu-Natal</option>
                            <option value="limpopo">Limpopo</option>
                        </select>
                    </div>
                    <div class="filter-group">
                        <label for="market-quality">Quality Grade</label>
                        <select id="market-quality">
                            <option value="premium">Premium</option>
                            <option value="standard" selected>Standard</option>
                            <option value="economy">Economy</option>
                        </select>
                    </div>
                    <button class="apply-filters" id="applyMarketFilters">
                        <i class="fas fa-filter"></i>
                        Apply Filters
                    </button>
                </div>
                
                <div class="market-overview">
                    <h3 class="section-title"><i class="fas fa-globe"></i> Market Overview</h3>
                    <div class="overview-cards">
                        <div class="overview-card primary">
                            <div class="card-title">Current Price</div>
                            <div class="card-value">R 48.50 /kg</div>
                            <div class="card-change change-positive">
                                <i class="fas fa-arrow-up"></i>
                                +5.2% from last week
                            </div>
                        </div>
                        <div class="overview-card">
                            <div class="card-title">7-Day Average</div>
                            <div class="card-value">R 46.20 /kg</div>
                            <div class="card-change change-positive">
                                <i class="fas fa-arrow-up"></i>
                                +3.8%
                            </div>
                        </div>
                        <div class="overview-card">
                            <div class="card-title">Demand Level</div>
                            <div class="card-value">High</div>
                            <div class="card-change change-positive">
                                <i class="fas fa-arrow-up"></i>
                                +12% this month
                            </div>
                        </div>
                        <div class="overview-card">
                            <div class="card-title">Market Competition</div>
                            <div class="card-value">Medium</div>
                            <div class="card-change change-negative">
                                <i class="fas fa-arrow-down"></i>
                                -5% from last month
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="price-trends">
                    <h3 class="section-title"><i class="fas fa-chart-line"></i> Price Trends</h3>
                    <div class="trend-period">
                        <button class="period-btn active">1W</button>
                        <button class="period-btn">1M</button>
                        <button class="period-btn">3M</button>
                        <button class="period-btn">1Y</button>
                    </div>
                    <div class="trend-chart">
                        <div class="trend-chart-placeholder">
                            <i class="fas fa-chart-bar"></i>
                            <p>Price trend visualization will appear here</p>
                        </div>
                    </div>
                </div>
                
                <div class="market-predictions">
                    <h3 class="section-title"><i class="fas fa-crystal-ball"></i> Price Predictions</h3>
                    <div class="prediction-cards">
                        <div class="prediction-card">
                            <div class="prediction-icon">
                                <i class="fas fa-arrow-up"></i>
                            </div>
                            <div class="prediction-content">
                                <h4>Next 7 Days</h4>
                                <p>Expected to continue rising</p>
                            </div>
                            <div class="prediction-value">+8%</div>
                        </div>
                        <div class="prediction-card">
                            <div class="prediction-icon">
                                <i class="fas fa-arrow-up"></i>
                            </div>
                            <div class="prediction-content">
                                <h4>Next 30 Days</h4>
                                <p>Seasonal demand increase</p>
                            </div>
                            <div class="prediction-value">+15%</div>
                        </div>
                        <div class="prediction-card">
                            <div class="prediction-icon">
                                <i class="fas fa-arrow-down"></i>
                            </div>
                            <div class="prediction-content">
                                <h4>Next 90 Days</h4>
                                <p>Expected market correction</p>
                            </div>
                            <div class="prediction-value">-5%</div>
                        </div>
                    </div>
                </div>
                
                <div class="recommended-actions">
                    <h3 class="section-title"><i class="fas fa-lightbulb"></i> Recommended Actions</h3>
                    <div class="action-cards">
                        <div class="action-card">
                            <div class="action-header">
                                <div class="action-icon">
                                    <i class="fas fa-arrow-up"></i>
                                </div>
                                <h4 class="action-title">Sell Now</h4>
                            </div>
                            <p class="action-desc">Current prices are favorable with rising trend. Consider selling 40-60% of your inventory.</p>
                            <div class="action-details">
                                <div class="action-detail">
                                    <span class="detail-label">Optimal Timing</span>
                                    <span class="detail-value">Within 7 days</span>
                                </div>
                                <div class="action-detail">
                                    <span class="detail-label">Potential Gain</span>
                                    <span class="detail-value">+12%</span>
                                </div>
                            </div>
                        </div>
                        <div class="action-card sell">
                            <div class="action-header">
                                <div class="action-icon">
                                    <i class="fas fa-pause"></i>
                                </div>
                                <h4 class="action-title">Hold Inventory</h4>
                            </div>
                            <p class="action-desc">Keep 30-40% for potential higher prices in the next 3-4 weeks as demand increases.</p>
                            <div class="action-details">
                                <div class="action-detail">
                                    <span class="detail-label">Hold Until</span>
                                    <span class="detail-value">Oct 15-22</span>
                                </div>
                                <div class="action-detail">
                                    <span class="detail-label">Potential Gain</span>
                                    <span class="detail-value">+18%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="market-actions">
                    <button class="market-action-btn">
                        <i class="fas fa-download"></i>
                        Export Report
                    </button>
                    <button class="market-action-btn">
                        <i class="fas fa-bell"></i>
                        Set Price Alert
                    </button>
                    <button class="market-action-btn primary">
                        <i class="fas fa-store"></i>
                        List Products Now
                    </button>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(marketModal);
    
    // Get elements
    const marketModalBackdrop = marketModal.querySelector('.market-modal-backdrop');
    const closeMarketModal = marketModal.querySelector('#closeMarketModal');
    const applyMarketFilters = marketModal.querySelector('#applyMarketFilters');
    const periodBtns = marketModal.querySelectorAll('.period-btn');
    
    // Open modal when market trends is clicked
    document.addEventListener('click', function(e) {
        if (e.target.closest('.market-trends')) {
            e.preventDefault();
            openMarketModal();
        }
    });
    
    // Close modal when close button is clicked
    if (closeMarketModal) {
        closeMarketModal.addEventListener('click', closeMarketModalFunc);
    }
    
    // Close modal when clicking outside
    if (marketModalBackdrop) {
        marketModalBackdrop.addEventListener('click', function(e) {
            if (e.target === marketModalBackdrop) {
                closeMarketModalFunc();
            }
        });
    }
    
    // Apply filters button click
    if (applyMarketFilters) {
        applyMarketFilters.addEventListener('click', function() {
            applyMarketFilters.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Applying...';
            
            // Simulate API call delay
            setTimeout(() => {
                updateMarketData();
                applyMarketFilters.innerHTML = '<i class="fas fa-filter"></i> Apply Filters';
            }, 1500);
        });
    }
    
    // Period buttons click
    periodBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            periodBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Update chart based on selected period
            updateChart(this.textContent);
        });
    });
    
    // Function to open the Market Analysis modal
    function openMarketModal() {
        marketModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Initialize with default data
        updateMarketData();
    }
    
    // Function to close the Market Analysis modal
    function closeMarketModalFunc() {
        marketModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    
    // Function to update market data based on filters
    function updateMarketData() {
        const cropSelect = marketModal.querySelector('#market-crop');
        const regionSelect = marketModal.querySelector('#market-region');
        const qualitySelect = marketModal.querySelector('#market-quality');
        
        const crop = cropSelect.value;
        const region = regionSelect.value;
        const quality = qualitySelect.value;
        
        // In a real app, this would fetch data from an API
        // For demo, we'll use mock data based on selections
        
        let price, change, demand, competition;
        
        // Mock data based on crop type
        if (crop === 'tomatoes') {
            price = (48.50 + Math.random() * 5).toFixed(2);
            change = (3 + Math.random() * 4).toFixed(1);
            demand = 'High';
            competition = 'Medium';
        } else if (crop === 'apples') {
            price = (65.00 + Math.random() * 8).toFixed(2);
            change = (2 + Math.random() * 3).toFixed(1);
            demand = 'Medium';
            competition = 'High';
        } else if (crop === 'corn') {
            price = (30.00 + Math.random() * 4).toFixed(2);
            change = (1 + Math.random() * 2).toFixed(1);
            demand = 'Medium';
            competition = 'Low';
        } else if (crop === 'carrots') {
            price = (40.00 + Math.random() * 6).toFixed(2);
            change = (4 + Math.random() * 3).toFixed(1);
            demand = 'High';
            competition = 'Medium';
        } else if (crop === 'potatoes') {
            price = (25.00 + Math.random() * 3).toFixed(2);
            change = (0.5 + Math.random() * 1.5).toFixed(1);
            demand = 'Low';
            competition = 'High';
        }
        
        // Update overview cards
        const overviewCards = marketModal.querySelectorAll('.overview-card');
        overviewCards[0].querySelector('.card-value').textContent = `R ${price} /kg`;
        overviewCards[0].querySelector('.card-change').innerHTML = `
            <i class="fas fa-arrow-up"></i>
            +${change}% from last week
        `;
        
        overviewCards[1].querySelector('.card-value').textContent = `R ${(parseFloat(price) - 2.3).toFixed(2)} /kg`;
        
        overviewCards[2].querySelector('.card-value').textContent = demand;
        
        overviewCards[3].querySelector('.card-value').textContent = competition;
        
        // Update predictions based on crop
        const predictionCards = marketModal.querySelectorAll('.prediction-card');
        if (crop === 'tomatoes') {
            predictionCards[0].querySelector('.prediction-value').textContent = '+8%';
            predictionCards[1].querySelector('.prediction-value').textContent = '+15%';
            predictionCards[2].querySelector('.prediction-value').textContent = '-5%';
        } else if (crop === 'apples') {
            predictionCards[0].querySelector('.prediction-value').textContent = '+5%';
            predictionCards[1].querySelector('.prediction-value').textContent = '+10%';
            predictionCards[2].querySelector('.prediction-value').textContent = '-3%';
        } else if (crop === 'corn') {
            predictionCards[0].querySelector('.prediction-value').textContent = '+3%';
            predictionCards[1].querySelector('.prediction-value').textContent = '+8%';
            predictionCards[2].querySelector('.prediction-value').textContent = '-2%';
        }
        
        // Update recommendations
        const actionCards = marketModal.querySelectorAll('.action-card');
        actionCards[0].querySelector('.detail-value').textContent = `Within ${7 + Math.floor(Math.random() * 4)} days`;
        actionCards[0].querySelector('.action-detail:last-child .detail-value').textContent = `+${12 + Math.floor(Math.random() * 6)}%`;
        
        actionCards[1].querySelector('.detail-value').textContent = `Oct ${15 + Math.floor(Math.random() * 7)}-${22 + Math.floor(Math.random() * 7)}`;
        actionCards[1].querySelector('.action-detail:last-child .detail-value').textContent = `+${18 + Math.floor(Math.random() * 8)}%`;
    }
    
    // Function to update chart based on period
    function updateChart(period) {
        const chartPlaceholder = marketModal.querySelector('.trend-chart-placeholder');
        
        // In a real app, this would render a real chart
        // For demo, we'll just update the text
        chartPlaceholder.innerHTML = `
            <i class="fas fa-chart-bar"></i>
            <p>Price trend for ${period} period</p>
            <small>Chart would visualize historical and predicted prices</small>
        `;
    }
});