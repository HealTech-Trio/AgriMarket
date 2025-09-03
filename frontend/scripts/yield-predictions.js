// Yield Prediction Modal Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Create yield modal element
    const yieldModal = document.createElement('div');
    yieldModal.className = 'yield-modal';
    yieldModal.innerHTML = `
        <div class="yield-modal-backdrop"></div>
        <div class="yield-modal-container">
            <div class="yield-modal-header">
                <div class="yield-header-content">
                    <div class="yield-avatar">
                        <div class="yield-pulse"></div>
                        <i class="fas fa-calculator"></i>
                    </div>
                    <div class="yield-header-text">
                        <h2>Yield Prediction</h2>
                        <p>Advanced analytics for harvest forecasting</p>
                    </div>
                </div>
                <button class="yield-modal-close" id="closeYieldModal">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="yield-modal-body">
                <div class="yield-input-section">
                    <div class="input-group">
                        <label for="yield-crop">Crop Type</label>
                        <select id="yield-crop">
                            <option value="tomatoes" selected>Tomatoes</option>
                            <option value="apples">Apples</option>
                            <option value="corn">Corn</option>
                            <option value="carrots">Carrots</option>
                            <option value="potatoes">Potatoes</option>
                        </select>
                    </div>
                    <div class="input-group">
                        <label for="yield-variety">Variety</label>
                        <select id="yield-variety">
                            <option value="cherry">Cherry Tomatoes</option>
                            <option value="beefsteak" selected>Beefsteak Tomatoes</option>
                            <option value="roma">Roma Tomatoes</option>
                            <option value="heirloom">Heirloom Tomatoes</option>
                        </select>
                    </div>
                    <div class="input-group">
                        <label for="yield-area">Cultivation Area (hectares)</label>
                        <input type="number" id="yield-area" value="2.5" step="0.1">
                    </div>
                    <div class="input-group">
                        <label for="yield-planting">Planting Date</label>
                        <input type="date" id="yield-planting" value="2023-08-15">
                    </div>
                    <div class="input-group">
                        <label for="yield-soil">Soil Type</label>
                        <select id="yield-soil">
                            <option value="loam" selected>Loam</option>
                            <option value="clay">Clay</option>
                            <option value="sandy">Sandy</option>
                            <option value="silt">Silt</option>
                        </select>
                    </div>
                    <div class="input-group">
                        <label for="yield-irrigation">Irrigation Type</label>
                        <select id="yield-irrigation">
                            <option value="drip" selected>Drip Irrigation</option>
                            <option value="sprinkler">Sprinkler</option>
                            <option value="flood">Flood</option>
                            <option value="rainfed">Rain-fed</option>
                        </select>
                    </div>
                    <button class="predict-btn" id="predictYield">
                        <i class="fas fa-calculator"></i>
                        Predict Yield
                    </button>
                </div>
                
                <div class="yield-overview">
                    <div class="overview-header">
                        <h3 class="overview-title"><i class="fas fa-seedling"></i> Yield Prediction Results</h3>
                        <div class="confidence-badge">
                            <i class="fas fa-chart-line"></i>
                            <span>89% Prediction Confidence</span>
                        </div>
                    </div>
                    <div class="overview-cards">
                        <div class="yield-card primary">
                            <div class="yield-icon">
                                <i class="fas fa-weight"></i>
                            </div>
                            <div class="yield-value">8.7 tons</div>
                            <div class="yield-label">Predicted Total Yield</div>
                            <div class="yield-comparison comparison-positive">
                                <i class="fas fa-arrow-up"></i>
                                <span>12% above average</span>
                            </div>
                        </div>
                        <div class="yield-card">
                            <div class="yield-icon">
                                <i class="fas fa-ruler"></i>
                            </div>
                            <div class="yield-value">3.48 t/ha</div>
                            <div class="yield-label">Yield per Hectare</div>
                            <div class="yield-comparison comparison-positive">
                                <i class="fas fa-arrow-up"></i>
                                <span>8% above average</span>
                            </div>
                        </div>
                        <div class="yield-card">
                            <div class="yield-icon">
                                <i class="fas fa-calendar-day"></i>
                            </div>
                            <div class="yield-value">Nov 12-18</div>
                            <div class="yield-label">Optimal Harvest Window</div>
                            <div class="yield-comparison comparison-positive">
                                <i class="fas fa-check-circle"></i>
                                <span>Ideal conditions</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="yield-chart-section">
                    <h3 class="section-title"><i class="fas fa-chart-bar"></i> Yield Forecast</h3>
                    <div class="chart-container">
                        <div class="chart-placeholder">
                            <i class="fas fa-chart-line"></i>
                            <p>Yield prediction chart will appear here</p>
                            <small>Visualizing historical data and future predictions</small>
                        </div>
                    </div>
                    <div class="chart-legend">
                        <div class="legend-item">
                            <div class="legend-color legend-predicted"></div>
                            <span>Predicted Yield</span>
                        </div>
                        <div class="legend-item">
                            <div class="legend-color legend-historical"></div>
                            <span>Historical Average</span>
                        </div>
                        <div class="legend-item">
                            <div class="legend-color legend-optimal"></div>
                            <span>Optimal Potential</span>
                        </div>
                    </div>
                </div>
                
                <div class="factor-analysis">
                    <h3 class="section-title"><i class="fas fa-sliders-h"></i> Yield Factors Analysis</h3>
                    <div class="factor-cards">
                        <div class="factor-card">
                            <div class="factor-header">
                                <div class="factor-icon">
                                    <i class="fas fa-cloud-sun"></i>
                                </div>
                                <h4 class="factor-title">Weather Conditions</h4>
                                <span class="factor-impact impact-positive">+8%</span>
                            </div>
                            <div class="factor-details">
                                <div class="factor-value">
                                    <span>Forecast Score</span>
                                    <span>82/100</span>
                                </div>
                                <div class="factor-bar">
                                    <div class="bar-fill bar-optimal" style="width: 82%"></div>
                                </div>
                                <div class="factor-value">
                                    <span>Rainfall</span>
                                    <span>Optimal</span>
                                </div>
                                <div class="factor-value">
                                    <span>Temperature</span>
                                    <span>Ideal range</span>
                                </div>
                                <p class="factor-recommendation">Weather conditions are favorable for maximum yield potential.</p>
                            </div>
                        </div>
                        <div class="factor-card">
                            <div class="factor-header">
                                <div class="factor-icon">
                                    <i class="fas fa-vial"></i>
                                </div>
                                <h4 class="factor-title">Soil Health</h4>
                                <span class="factor-impact impact-positive">+5%</span>
                            </div>
                            <div class="factor-details">
                                <div class="factor-value">
                                    <span>Nutrient Level</span>
                                    <span>78/100</span>
                                </div>
                                <div class="factor-bar">
                                    <div class="bar-fill bar-optimal" style="width: 78%"></div>
                                </div>
                                <div class="factor-value">
                                    <span>pH Balance</span>
                                    <span>6.8 (Ideal)</span>
                                </div>
                                <div class="factor-value">
                                    <span>Organic Matter</span>
                                    <span>Good</span>
                                </div>
                                <p class="factor-recommendation">Soil conditions are excellent. Maintain current practices.</p>
                            </div>
                        </div>
                        <div class="factor-card">
                            <div class="factor-header">
                                <div class="factor-icon">
                                    <i class="fas fa-tint"></i>
                                </div>
                                <h4 class="factor-title">Water Availability</h4>
                                <span class="factor-impact impact-neutral">+2%</span>
                            </div>
                            <div class="factor-details">
                                <div class="factor-value">
                                    <span>Irrigation Score</span>
                                    <span>65/100</span>
                                </div>
                                <div class="factor-bar">
                                    <div class="bar-fill bar-suboptimal" style="width: 65%"></div>
                                </div>
                                <div class="factor-value">
                                    <span>Water Stress</span>
                                    <span>Low</span>
                                </div>
                                <div class="factor-value">
                                    <span>Efficiency</span>
                                    <span>Could improve</span>
                                </div>
                                <p class="factor-recommendation">Consider optimizing irrigation schedule for better efficiency.</p>
                            </div>
                        </div>
                        <div class="factor-card">
                            <div class="factor-header">
                                <div class="factor-icon">
                                    <i class="fas fa-bug"></i>
                                </div>
                                <h4 class="factor-title">Pest & Disease Risk</h4>
                                <span class="factor-impact impact-negative">-3%</span>
                            </div>
                            <div class="factor-details">
                                <div class="factor-value">
                                    <span>Risk Level</span>
                                    <span>Medium</span>
                                </div>
                                <div class="factor-bar">
                                    <div class="bar-fill bar-suboptimal" style="width: 60%"></div>
                                </div>
                                <div class="factor-value">
                                    <span>Early Blight</span>
                                    <span>Low risk</span>
                                </div>
                                <div class="factor-value">
                                    <span>Aphids</span>
                                    <span>Moderate risk</span>
                                </div>
                                <p class="factor-recommendation">Monitor closely. Consider preventive measures in 2 weeks.</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="recommendations-section">
                    <h3 class="section-title"><i class="fas fa-clipboard-list"></i> Optimization Recommendations</h3>
                    <div class="recommendation-cards">
                        <div class="recommendation-card">
                            <div class="rec-icon">
                                <i class="fas fa-tint"></i>
                            </div>
                            <div class="rec-content">
                                <h4>Optimize Irrigation</h4>
                                <p>Adjust drip irrigation to 30 minutes twice daily instead of 45 minutes once daily. This improves water absorption and reduces runoff.</p>
                                <div class="rec-details">
                                    <div class="rec-detail">
                                        <i class="fas fa-clock"></i>
                                        <span>Implement within 7 days</span>
                                    </div>
                                    <div class="rec-detail">
                                        <i class="fas fa-arrow-up"></i>
                                        <span>Potential yield gain: +5%</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="recommendation-card urgent">
                            <div class="rec-icon">
                                <i class="fas fa-spray-can"></i>
                            </div>
                            <div class="rec-content">
                                <h4>Pest Prevention</h4>
                                <p>Apply neem oil solution as preventive measure against aphids. Focus on lower leaf surfaces where pests typically gather.</p>
                                <div class="rec-details">
                                    <div class="rec-detail">
                                        <i class="fas fa-clock"></i>
                                        <span>Apply within 5 days</span>
                                    </div>
                                    <div class="rec-detail">
                                        <i class="fas fa-shield-alt"></i>
                                        <span>Prevents 3-5% yield loss</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="yield-actions">
                    <button class="yield-action-btn">
                        <i class="fas fa-download"></i>
                        Export Full Report
                    </button>
                    <button class="yield-action-btn">
                        <i class="fas fa-bell"></i>
                        Set Harvest Reminder
                    </button>
                    <button class="yield-action-btn primary">
                        <i class="fas fa-seedling"></i>
                        Create Management Plan
                    </button>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(yieldModal);
    
    // Get elements
    const yieldModalBackdrop = yieldModal.querySelector('.yield-modal-backdrop');
    const closeYieldModal = yieldModal.querySelector('#closeYieldModal');
    const predictYieldBtn = yieldModal.querySelector('#predictYield');
    
    // Open modal when yield prediction is clicked
    document.addEventListener('click', function(e) {
        if (e.target.closest('.yield-prediction')) {
            e.preventDefault();
            openYieldModal();
        }
    });
    
    // Close modal when close button is clicked
    if (closeYieldModal) {
        closeYieldModal.addEventListener('click', closeYieldModalFunc);
    }
    
    // Close modal when clicking outside
    if (yieldModalBackdrop) {
        yieldModalBackdrop.addEventListener('click', function(e) {
            if (e.target === yieldModalBackdrop) {
                closeYieldModalFunc();
            }
        });
    }
    
    // Predict yield button click
    if (predictYieldBtn) {
        predictYieldBtn.addEventListener('click', function() {
            predictYieldBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Analyzing...';
            predictYieldBtn.disabled = true;
            
            // Simulate API call delay
            setTimeout(() => {
                calculateYieldPrediction();
                predictYieldBtn.innerHTML = '<i class="fas fa-calculator"></i> Predict Yield';
                predictYieldBtn.disabled = false;
            }, 2000);
        });
    }
    
    // Function to open the Yield Prediction modal
    function openYieldModal() {
        yieldModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Set default values
        document.getElementById('yield-area').value = '2.5';
        document.getElementById('yield-planting').value = '2023-08-15';
    }
    
    // Function to close the Yield Prediction modal
    function closeYieldModalFunc() {
        yieldModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    
    // Function to calculate yield prediction
    function calculateYieldPrediction() {
        const cropType = document.getElementById('yield-crop').value;
        const variety = document.getElementById('yield-variety').value;
        const area = parseFloat(document.getElementById('yield-area').value);
        const plantingDate = new Date(document.getElementById('yield-planting').value);
        const soilType = document.getElementById('yield-soil').value;
        const irrigationType = document.getElementById('yield-irrigation').value;
        
        // In a real app, this would use complex algorithms and APIs
        // For demo, we'll calculate based on inputs with some randomness
        
        // Base yield per hectare for different crops (tons/hectare)
        const baseYields = {
            'tomatoes': 3.2,
            'apples': 22.5,
            'corn': 6.8,
            'carrots': 40.2,
            'potatoes': 28.7
        };
        
        // Variety multipliers
        const varietyMultipliers = {
            'cherry': 0.9,
            'beefsteak': 1.1,
            'roma': 1.0,
            'heirloom': 0.95
        };
        
        // Soil type multipliers
        const soilMultipliers = {
            'loam': 1.1,
            'clay': 0.9,
            'sandy': 0.85,
            'silt': 1.05
        };
        
        // Irrigation type multipliers
        const irrigationMultipliers = {
            'drip': 1.15,
            'sprinkler': 1.0,
            'flood': 0.9,
            'rainfed': 0.8
        };
        
        // Calculate days since planting
        const today = new Date();
        const daysSincePlanting = Math.floor((today - plantingDate) / (1000 * 60 * 60 * 24));
        
        // Growth stage multiplier (based on days since planting)
        let growthMultiplier = 1.0;
        if (daysSincePlanting < 30) growthMultiplier = 0.3;
        else if (daysSincePlanting < 60) growthMultiplier = 0.7;
        else if (daysSincePlanting < 90) growthMultiplier = 0.9;
        
        // Calculate yield per hectare
        const baseYield = baseYields[cropType] || 3.0;
        const varietyMultiplier = varietyMultipliers[variety] || 1.0;
        const soilMultiplier = soilMultipliers[soilType] || 1.0;
        const irrigationMultiplier = irrigationMultipliers[irrigationType] || 1.0;
        
        // Random factor for simulation (would be real data in production)
        const randomFactor = 0.95 + (Math.random() * 0.1);
        
        const yieldPerHectare = baseYield * varietyMultiplier * soilMultiplier * 
                               irrigationMultiplier * growthMultiplier * randomFactor;
        
        const totalYield = yieldPerHectare * area;
        
        // Update UI with calculated values
        document.querySelector('.yield-value').textContent = `${totalYield.toFixed(1)} tons`;
        document.querySelector('.yield-card:nth-child(2) .yield-value').textContent = `${yieldPerHectare.toFixed(2)} t/ha`;
        
        // Calculate comparison to average (for demo purposes)
        const avgYield = baseYield * 0.92; // Simulated average yield
        const percentDifference = ((yieldPerHectare - avgYield) / avgYield) * 100;
        
        const comparisonElement = document.querySelector('.yield-comparison');
        if (percentDifference >= 0) {
            comparisonElement.className = 'yield-comparison comparison-positive';
            comparisonElement.innerHTML = `<i class="fas fa-arrow-up"></i><span>${Math.abs(percentDifference).toFixed(0)}% above average</span>`;
        } else {
            comparisonElement.className = 'yield-comparison comparison-negative';
            comparisonElement.innerHTML = `<i class="fas fa-arrow-down"></i><span>${Math.abs(percentDifference).toFixed(0)}% below average</span>`;
        }
        
        // Update harvest window based on planting date
        const harvestDate = new Date(plantingDate);
        harvestDate.setDate(harvestDate.getDate() + 120); // 120 days for tomatoes
        
        const harvestStart = new Date(harvestDate);
        harvestStart.setDate(harvestStart.getDate() - 7);
        
        const harvestEnd = new Date(harvestDate);
        harvestEnd.setDate(harvestEnd.getDate() + 7);
        
        const options = { month: 'short', day: 'numeric' };
        const harvestWindow = `${harvestStart.toLocaleDateString('en-US', options)}-${harvestEnd.toLocaleDateString('en-US', options)}`;
        
        document.querySelector('.yield-card:nth-child(3) .yield-value').textContent = harvestWindow;
        
        // Animate results appearance
        const resultsSections = yieldModal.querySelectorAll('.yield-overview, .yield-chart-section, .factor-analysis, .recommendations-section');
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
});