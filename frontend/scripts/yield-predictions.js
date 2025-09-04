// Yield Prediction Modal with Gemini Integration
document.addEventListener('DOMContentLoaded', function() {
    // State variables
    let predictionInProgress = false;

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
                            <option value="wheat">Wheat</option>
                            <option value="rice">Rice</option>
                            <option value="soybean">Soybean</option>
                            <option value="cassava">Cassava</option>
                            <option value="sorghum">Sorghum</option>
                            <option value="barley">Barley</option>
                            <option value="millet">Millet</option>
                            <option value="beans">Beans</option>
                            <option value="pea">Pea</option>
                            <option value="cotton">Cotton</option>
                            <option value="sugarcane">Sugarcane</option>
                            <option value="coffee">Coffee</option>
                            <option value="tea">Tea</option>
                            <option value="cocoa">Cocoa</option>
                        </select>
                    </div>
                    <div class="input-group">
                        <label for="yield-variety">Variety</label>
                        <select id="yield-variety">
                            <!-- Varieties will be populated dynamically based on crop selection -->
                            <option value="cherry">Cherry Tomatoes</option>
                            <option value="beefsteak" selected>Beefsteak Tomatoes</option>
                            <option value="roma">Roma Tomatoes</option>
                            <option value="heirloom">Heirloom Tomatoes</option>
                        </select>
                    </div>
                    <div class="input-group">
                        <label for="yield-area">Cultivation Area (hectares)</label>
                        <input type="number" id="yield-area" value="2.5" step="0.1" min="0.1">
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
                            <option value="peat">Peat</option>
                            <option value="chalky">Chalky</option>
                            <option value="clay_loam">Clay Loam</option>
                            <option value="sandy_loam">Sandy Loam</option>
                        </select>
                    </div>
                    <div class="input-group">
                        <label for="yield-irrigation">Irrigation Type</label>
                        <select id="yield-irrigation">
                            <option value="drip" selected>Drip Irrigation</option>
                            <option value="sprinkler">Sprinkler</option>
                            <option value="flood">Flood</option>
                            <option value="rainfed">Rain-fed</option>
                            <option value="manual">Manual</option>
                            <option value="pivot">Pivot</option>
                            <option value="subsurface">Subsurface</option>
                        </select>
                    </div>
                    <button class="predict-btn" id="predictYield">
                        <i class="fas fa-calculator"></i>
                        Predict Yield
                    </button>
                </div>
                
                <!-- Results section -->
                <div class="yield-overview" style="display: none;">
                    <div class="yield-cards">
                        <div class="yield-card">
                            <div class="yield-icon">
                                <i class="fas fa-weight-hanging"></i>
                            </div>
                            <div class="yield-content">
                                <h3>Total Yield</h3>
                                <div class="yield-value">0 tons</div>
                                <div class="yield-comparison comparison-neutral">
                                    <i class="fas fa-equals"></i>
                                    <span>No comparison data</span>
                                </div>
                            </div>
                        </div>
                        <div class="yield-card">
                            <div class="yield-icon">
                                <i class="fas fa-chart-area"></i>
                            </div>
                            <div class="yield-content">
                                <h3>Yield per Hectare</h3>
                                <div class="yield-value">0 t/ha</div>
                                <div class="yield-comparison comparison-neutral">
                                    <i class="fas fa-equals"></i>
                                    <span>No comparison data</span>
                                </div>
                            </div>
                        </div>
                        <div class="yield-card">
                            <div class="yield-icon">
                                <i class="fas fa-calendar-alt"></i>
                            </div>
                            <div class="yield-content">
                                <h3>Harvest Window</h3>
                                <div class="yield-value">Not determined</div>
                                <div class="yield-comparison comparison-neutral">
                                    <i class="fas fa-info-circle"></i>
                                    <span>Based on planting date</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="confidence-badge">
                        <span>0% Prediction Confidence</span>
                    </div>
                </div>
                
                <div class="yield-chart-section" style="display: none;">
                    <h3>Yield Factors Analysis</h3>
                    <div class="factor-analysis">
                        <div class="factor-card">
                            <div class="factor-header">
                                <div class="factor-icon">
                                    <i class="fas fa-cloud-sun"></i>
                                </div>
                                <h4>Weather Conditions</h4>
                                <div class="factor-impact impact-neutral">0%</div>
                            </div>
                            <div class="factor-progress">
                                <div class="progress-bar">
                                    <div class="bar-fill bar-optimal" style="width: 0%"></div>
                                </div>
                                <div class="factor-score">
                                    <span>Score:</span>
                                    <span>0/100</span>
                                </div>
                            </div>
                            <div class="factor-details">
                                <div class="factor-detail">
                                    <span>Rainfall:</span>
                                    <span>Not analyzed</span>
                                </div>
                                <div class="factor-detail">
                                    <span>Temperature:</span>
                                    <span>Not analyzed</span>
                                </div>
                            </div>
                            <div class="factor-recommendation">
                                Weather analysis pending...
                            </div>
                        </div>
                        
                        <div class="factor-card">
                            <div class="factor-header">
                                <div class="factor-icon">
                                    <i class="fas fa-mountain"></i>
                                </div>
                                <h4>Soil Quality</h4>
                                <div class="factor-impact impact-neutral">0%</div>
                            </div>
                            <div class="factor-progress">
                                <div class="progress-bar">
                                    <div class="bar-fill bar-optimal" style="width: 0%"></div>
                                </div>
                                <div class="factor-score">
                                    <span>Score:</span>
                                    <span>0/100</span>
                                </div>
                            </div>
                            <div class="factor-details">
                                <div class="factor-detail">
                                    <span>pH Balance:</span>
                                    <span>Not analyzed</span>
                                </div>
                                <div class="factor-detail">
                                    <span>Organic Matter:</span>
                                    <span>Not analyzed</span>
                                </div>
                            </div>
                            <div class="factor-recommendation">
                                Soil analysis pending...
                            </div>
                        </div>
                        
                        <div class="factor-card">
                            <div class="factor-header">
                                <div class="factor-icon">
                                    <i class="fas fa-tint"></i>
                                </div>
                                <h4>Water Management</h4>
                                <div class="factor-impact impact-neutral">0%</div>
                            </div>
                            <div class="factor-progress">
                                <div class="progress-bar">
                                    <div class="bar-fill bar-optimal" style="width: 0%"></div>
                                </div>
                                <div class="factor-score">
                                    <span>Score:</span>
                                    <span>0/100</span>
                                </div>
                            </div>
                            <div class="factor-details">
                                <div class="factor-detail">
                                    <span>Water Stress:</span>
                                    <span>Not analyzed</span>
                                </div>
                                <div class="factor-detail">
                                    <span>Efficiency:</span>
                                    <span>Not analyzed</span>
                                </div>
                            </div>
                            <div class="factor-recommendation">
                                Water analysis pending...
                            </div>
                        </div>
                        
                        <div class="factor-card">
                            <div class="factor-header">
                                <div class="factor-icon">
                                    <i class="fas fa-bug"></i>
                                </div>
                                <h4>Pest & Disease Risk</h4>
                                <div class="factor-impact impact-neutral">0%</div>
                            </div>
                            <div class="factor-progress">
                                <div class="progress-bar">
                                    <div class="bar-fill bar-optimal" style="width: 0%"></div>
                                </div>
                                <div class="factor-score">
                                    <span>Score:</span>
                                    <span>0/100</span>
                                </div>
                            </div>
                            <div class="factor-details">
                                <div class="factor-detail">
                                    <span>Risk Level:</span>
                                    <span>Not analyzed</span>
                                </div>
                                <div class="factor-detail">
                                    <span>Primary Threat:</span>
                                    <span>Not analyzed</span>
                                </div>
                            </div>
                            <div class="factor-recommendation">
                                Pest analysis pending...
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="recommendations-section" style="display: none;">
                    <h3>Optimization Recommendations</h3>
                    <div class="recommendation-cards">
                        <p class="no-recommendations">Submit a prediction to get personalized recommendations</p>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Add the modal to the DOM FIRST
    document.body.appendChild(yieldModal);

    // Crop varieties data structure
    const CROP_VARIETIES = {
        tomatoes: [
            {value: "cherry", name: "Cherry Tomatoes"},
            {value: "beefsteak", name: "Beefsteak Tomatoes"},
            {value: "roma", name: "Roma Tomatoes"},
            {value: "heirloom", name: "Heirloom Tomatoes"},
            {value: "grape", name: "Grape Tomatoes"},
            {value: "plum", name: "Plum Tomatoes"}
        ],
        apples: [
            {value: "fuji", name: "Fuji"},
            {value: "gala", name: "Gala"},
            {value: "granny_smith", name: "Granny Smith"},
            {value: "red_delicious", name: "Red Delicious"},
            {value: "honeycrisp", name: "Honeycrisp"},
            {value: "mcintosh", name: "McIntosh"}
        ],
        corn: [
            {value: "sweet", name: "Sweet Corn"},
            {value: "dent", name: "Dent Corn"},
            {value: "flint", name: "Flint Corn"},
            {value: "popcorn", name: "Popcorn"},
            {value: "flour", name: "Flour Corn"},
            {value: "pod", name: "Pod Corn"}
        ],
        carrots: [
            {value: "nantes", name: "Nantes"},
            {value: "imperator", name: "Imperator"},
            {value: "chantenay", name: "Chantenay"},
            {value: "danvers", name: "Danvers"},
            {value: "baby", name: "Baby Carrots"},
            {value: "purple", name: "Purple Carrots"}
        ],
        potatoes: [
            {value: "russet", name: "Russet"},
            {value: "red", name: "Red Potatoes"},
            {value: "white", name: "White Potatoes"},
            {value: "yellow", name: "Yellow Potatoes"},
            {value: "purple", name: "Purple Potatoes"},
            {value: "fingerling", name: "Fingerling Potatoes"}
        ],
        wheat: [
            {value: "hard_red", name: "Hard Red Wheat"},
            {value: "hard_white", name: "Hard White Wheat"},
            {value: "soft_red", name: "Soft Red Wheat"},
            {value: "soft_white", name: "Soft White Wheat"},
            {value: "durum", name: "Durum Wheat"},
            {value: "spring", name: "Spring Wheat"}
        ],
        rice: [
            {value: "jasmine", name: "Jasmine Rice"},
            {value: "basmati", name: "Basmati Rice"},
            {value: "arborio", name: "Arborio Rice"},
            {value: "brown", name: "Brown Rice"},
            {value: "white", name: "White Rice"},
            {value: "black", name: "Black Rice"}
        ],
        soybean: [
            {value: "maturity_group_0", name: "Maturity Group 0"},
            {value: "maturity_group_1", name: "Maturity Group 1"},
            {value: "maturity_group_2", name: "Maturity Group 2"},
            {value: "maturity_group_3", name: "Maturity Group 3"},
            {value: "maturity_group_4", name: "Maturity Group 4"}
        ],
        cassava: [
            {value: "sweet", name: "Sweet Cassava"},
            {value: "bitter", name: "Bitter Cassava"},
            {value: "tms", name: "TMS Varieties"},
            {value: "local", name: "Local Varieties"}
        ],
        sorghum: [
            {value: "grain", name: "Grain Sorghum"},
            {value: "sweet", name: "Sweet Sorghum"},
            {value: "forage", name: "Forage Sorghum"},
            {value: "biomass", name: "Biomass Sorghum"}
        ],
        barley: [
            {value: "two_row", name: "Two-Row Barley"},
            {value: "six_row", name: "Six-Row Barley"},
            {value: "winter", name: "Winter Barley"},
            {value: "spring", name: "Spring Barley"}
        ],
        millet: [
            {value: "pearl", name: "Pearl Millet"},
            {value: "finger", name: "Finger Millet"},
            {value: "foxtail", name: "Foxtail Millet"},
            {value: "proso", name: "Proso Millet"}
        ],
        beans: [
            {value: "pinto", name: "Pinto Beans"},
            {value: "black", name: "Black Beans"},
            {value: "kidney", name: "Kidney Beans"},
            {value: "navy", name: "Navy Beans"}
        ],
        pea: [
            {value: "green", name: "Green Peas"},
            {value: "yellow", name: "Yellow Peas"},
            {value: "chickpea", name: "Chickpeas"},
            {value: "pigeon", name: "Pigeon Peas"}
        ],
        cotton: [
            {value: "upland", name: "Upland Cotton"},
            {value: "pima", name: "Pima Cotton"},
            {value: "egyptian", name: "Egyptian Cotton"},
            {value: "asiatic", name: "Asiatic Cotton"}
        ],
        sugarcane: [
            {value: "noble", name: "Noble Cane"},
            {value: "commercial", name: "Commercial Hybrids"},
            {value: "wild", name: "Wild Varieties"}
        ],
        coffee: [
            {value: "arabica", name: "Arabica"},
            {value: "robusta", name: "Robusta"},
            {value: "liberica", name: "Liberica"},
            {value: "excelsa", name: "Excelsa"}
        ],
        tea: [
            {value: "assam", name: "Assam"},
            {value: "darjeeling", name: "Darjeeling"},
            {value: "ceylon", name: "Ceylon"},
            {value: "green", name: "Green Tea"}
        ],
        cocoa: [
            {value: "criollo", name: "Criollo"},
            {value: "forastero", name: "Forastero"},
            {value: "trinitario", name: "Trinitario"},
            {value: "national", name: "National"}
        ],
        // Default for any unlisted crops
        default: [
            {value: "local", name: "Local Variety"},
            {value: "improved", name: "Improved Variety"},
            {value: "hybrid", name: "Hybrid Variety"},
            {value: "traditional", name: "Traditional Variety"}
        ]
    };

    // Function to update variety options
    function updateVarietyOptions(cropType) {
        const varietySelect = document.getElementById('yield-variety');
        if (!varietySelect) return;
        
        const varieties = CROP_VARIETIES[cropType] || CROP_VARIETIES.default;
        
        // Clear existing options
        varietySelect.innerHTML = '';
        
        // Add new options
        varieties.forEach(variety => {
            const option = document.createElement('option');
            option.value = variety.value;
            option.textContent = variety.name;
            varietySelect.appendChild(option);
        });
        
        // Select the first option by default
        if (varieties.length > 0) {
            varietySelect.value = varieties[0].value;
        }
    }

    // Get elements
    const yieldModalBackdrop = yieldModal.querySelector('.yield-modal-backdrop');
    const closeYieldModal = yieldModal.querySelector('#closeYieldModal');
    const predictYieldBtn = yieldModal.querySelector('#predictYield');
    
    // Set up event listeners after DOM is ready
    setTimeout(() => {
        // Initialize with tomato varieties
        updateVarietyOptions('tomatoes');
        
        // Add event listener for crop selection change
        const cropSelect = document.getElementById('yield-crop');
        if (cropSelect) {
            cropSelect.addEventListener('change', function() {
                updateVarietyOptions(this.value);
            });
        }
    }, 100);
    
    // Open modal when yield prediction is clicked
    document.addEventListener('click', function(e) {
        if (e.target.closest('.yield-prediction')) {
            e.preventDefault();
            openYieldModal();
        }
    });
    
    // Close modal handlers
    if (closeYieldModal) {
        closeYieldModal.addEventListener('click', closeYieldModalFunc);
    }
    
    if (yieldModalBackdrop) {
        yieldModalBackdrop.addEventListener('click', function(e) {
            if (e.target === yieldModalBackdrop) {
                closeYieldModalFunc();
            }
        });
    }
    
    // Predict yield button click
    if (predictYieldBtn) {
        predictYieldBtn.addEventListener('click', async function() {
            if (predictionInProgress) return;
            await performYieldPrediction();
        });
    }
    
    // Functions
    function openYieldModal() {
        yieldModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        resetYieldModal();
        
        // Set default planting date (30 days ago)
        const today = new Date();
        const defaultPlantingDate = new Date(today);
        defaultPlantingDate.setDate(today.getDate() - 30);
        document.getElementById('yield-planting').value = defaultPlantingDate.toISOString().split('T')[0];
    }
    
    function closeYieldModalFunc() {
        yieldModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    
    function resetYieldModal() {
        // Clear state
        predictionInProgress = false;
        
        // Reset button
        if (predictYieldBtn) {
            predictYieldBtn.disabled = false;
            predictYieldBtn.innerHTML = '<i class="fas fa-calculator"></i> Predict Yield';
        }
        
        // Hide result sections
        hideResultSections();
        
        // Remove overlays
        removeOverlays();
    }
    
    async function performYieldPrediction() {
        if (predictionInProgress) return;

        predictionInProgress = true;
        showPredictionLoading();

        try {
            const predictionResult = await sendDataToBackend();
            hidePredictionLoading();
            displayPredictionResults(predictionResult);
        } catch (error) {
            console.error('Prediction error:', error);
            hidePredictionLoading();
            showPredictionError(error.message || 'Failed to predict yield. Please try again.');
        } finally {
            predictionInProgress = false;
        }
    }

    async function sendDataToBackend() {
        // Get form values
        const cropType = document.getElementById('yield-crop').value;
        const variety = document.getElementById('yield-variety').value;
        const area = document.getElementById('yield-area').value;
        const plantingDate = document.getElementById('yield-planting').value;
        const soilType = document.getElementById('yield-soil').value;
        const irrigationType = document.getElementById('yield-irrigation').value;
        
        // Validate all fields
        if (!cropType || !variety || !area || !plantingDate || !soilType || !irrigationType) {
            throw new Error('Please fill in all fields');
        }
        
        // Validate area is a positive number
        if (parseFloat(area) <= 0) {
            throw new Error('Cultivation area must be a positive number');
        }
        
        // Create form data
        const formData = new FormData();
        formData.append('crop_type', cropType);
        formData.append('variety', variety);
        formData.append('area', area);
        formData.append('planting_date', plantingDate);
        formData.append('soil_type', soilType);
        formData.append('irrigation_type', irrigationType);

        const response = await fetch('http://127.0.0.1:5000/api/yield-prediction', {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.error || `Server error: ${response.status}`);
        }

        const data = await response.json();

        if (data.status === 'error') {
            throw new Error(data.error);
        }

        return data.prediction;
    }

    function showPredictionLoading() {
        if (!predictYieldBtn) return;
        
        predictYieldBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Predicting...';
        predictYieldBtn.disabled = true;

        hideResultSections();

        const loadingOverlay = document.createElement('div');
        loadingOverlay.className = 'analysis-loading-overlay';
        loadingOverlay.innerHTML = `
            <div class="loading-content">
                <div class="loading-spinner">
                    <div class="spinner-ring"></div>
                    <div class="spinner-ring"></div>
                    <div class="spinner-ring"></div>
                </div>
                <h3>Analyzing Your Crop Data</h3>
                <p>AI is processing your information and calculating yield predictions...</p>
                <div class="loading-progress">
                    <div class="progress-bar">
                        <div class="progress-fill"></div>
                    </div>
                    <span class="progress-text">Processing crop parameters...</span>
                </div>
            </div>
        `;

        const modalBody = yieldModal.querySelector('.yield-modal-body');
        if (modalBody) {
            modalBody.appendChild(loadingOverlay);
            animateProgress();
        }
    }

    function hidePredictionLoading() {
        removeOverlays();
        if (predictYieldBtn) {
            predictYieldBtn.innerHTML = '<i class="fas fa-calculator"></i> Predict Yield';
            predictYieldBtn.disabled = false;
        }
    }

    function animateProgress() {
        const overlay = yieldModal.querySelector('.analysis-loading-overlay');
        if (!overlay) return;

        const progressFill = overlay.querySelector('.progress-fill');
        const progressText = overlay.querySelector('.progress-text');

        setTimeout(() => {
            if (progressFill) progressFill.style.width = '30%';
            if (progressText) progressText.textContent = 'Analyzing environmental factors...';
        }, 500);

        setTimeout(() => {
            if (progressFill) progressFill.style.width = '60%';
            if (progressText) progressText.textContent = 'Calculating yield potential...';
        }, 1500);

        setTimeout(() => {
            if (progressFill) progressFill.style.width = '90%';
            if (progressText) progressText.textContent = 'Generating recommendations...';
        }, 2500);
    }

    function displayPredictionResults(prediction) {
        // Update overview cards
        const cards = yieldModal.querySelectorAll('.yield-card');
        if (cards.length >= 3) {
            // Total yield card
            const totalYieldEl = cards[0].querySelector('.yield-value');
            if (totalYieldEl && prediction.total_yield) {
                totalYieldEl.textContent = `${prediction.total_yield} tons`;
            }
            
            if (prediction.comparison_percentage && prediction.comparison_status) {
                updateComparison(cards[0], prediction.comparison_percentage, prediction.comparison_status);
            }
            
            // Yield per hectare card
            const yieldPerHectareEl = cards[1].querySelector('.yield-value');
            if (yieldPerHectareEl && prediction.yield_per_hectare) {
                yieldPerHectareEl.textContent = `${prediction.yield_per_hectare} t/ha`;
            }
            
            if (prediction.comparison_percentage && prediction.comparison_status) {
                updateComparison(cards[1], prediction.comparison_percentage, prediction.comparison_status);
            }
            
            // Harvest window card
            const harvestWindowEl = cards[2].querySelector('.yield-value');
            if (harvestWindowEl && prediction.harvest_window) {
                harvestWindowEl.textContent = prediction.harvest_window;
            }
        }

        // Update confidence badge
        const confidenceBadge = yieldModal.querySelector('.confidence-badge span');
        if (confidenceBadge && prediction.confidence) {
            confidenceBadge.textContent = `${prediction.confidence}% Prediction Confidence`;
        }

        // Update factor analysis
        updateFactorAnalysis(prediction);

        // Update recommendations
        updateRecommendations(prediction.recommendations);

        // Show results with animation
        showResultSections();
    }

    function updateComparison(card, percentage, status) {
        const comparison = card.querySelector('.yield-comparison');
        if (!comparison) return;
        
        if (status === 'above') {
            comparison.className = 'yield-comparison comparison-positive';
            comparison.innerHTML = `<i class="fas fa-arrow-up"></i><span>${percentage}% above average</span>`;
        } else if (status === 'below') {
            comparison.className = 'yield-comparison comparison-negative';
            comparison.innerHTML = `<i class="fas fa-arrow-down"></i><span>${percentage}% below average</span>`;
        } else {
            comparison.className = 'yield-comparison comparison-neutral';
            comparison.innerHTML = `<i class="fas fa-equals"></i><span>No comparison data</span>`;
        }
    }

    function updateFactorAnalysis(prediction) {
        const factorCards = yieldModal.querySelectorAll('.factor-card');
        
        // Weather factor
        if (factorCards[0]) {
            updateFactorCard(factorCards[0], {
                score: prediction.weather_score,
                impact: prediction.weather_impact,
                values: [
                    { label: 'Rainfall', value: prediction.weather_rainfall },
                    { label: 'Temperature', value: prediction.weather_temperature }
                ],
                recommendation: prediction.weather_recommendation
            });
        }

        // Soil factor
        if (factorCards[1]) {
            updateFactorCard(factorCards[1], {
                score: prediction.soil_score,
                impact: prediction.soil_impact,
                values: [
                    { label: 'pH Balance', value: prediction.soil_ph },
                    { label: 'Organic Matter', value: prediction.soil_organic_matter }
                ],
                recommendation: prediction.soil_recommendation
            });
        }

        // Water factor
        if (factorCards[2]) {
            updateFactorCard(factorCards[2], {
                score: prediction.water_score,
                impact: prediction.water_impact,
                values: [
                    { label: 'Water Stress', value: prediction.water_stress },
                    { label: 'Efficiency', value: prediction.water_efficiency }
                ],
                recommendation: prediction.water_recommendation
            });
        }

        // Pest factor
        if (factorCards[3]) {
            updateFactorCard(factorCards[3], {
                score: prediction.pest_score,
                impact: prediction.pest_impact,
                values: [
                    { label: 'Risk Level', value: prediction.pest_risk_level },
                    { label: 'Primary Threat', value: prediction.pest_primary_threat }
                ],
                recommendation: prediction.pest_recommendation
            });
        }
    }

    function updateFactorCard(card, data) {
        if (!data) return;
        
        // Update impact
        const impact = card.querySelector('.factor-impact');
        if (impact && data.impact) {
            impact.textContent = data.impact;
            
            // Update impact class
            if (data.impact.startsWith('+')) {
                impact.className = 'factor-impact impact-positive';
            } else if (data.impact.startsWith('-')) {
                impact.className = 'factor-impact impact-negative';
            } else {
                impact.className = 'factor-impact impact-neutral';
            }
        }

        // Update score
        const scoreElements = card.querySelectorAll('.factor-value span:last-child');
        if (scoreElements[0] && data.score) {
            scoreElements[0].textContent = `${data.score}/100`;
        }

        // Update progress bar
        const barFill = card.querySelector('.bar-fill');
        if (barFill && data.score) {
            barFill.style.width = `${data.score}%`;
            
            // Update bar class based on score
            if (data.score >= 80) {
                barFill.className = 'bar-fill bar-optimal';
            } else if (data.score >= 60) {
                barFill.className = 'bar-fill bar-suboptimal';
            } else {
                barFill.className = 'bar-fill bar-critical';
            }
        }

        // Update values
        if (data.values && scoreElements.length >= data.values.length + 1) {
            data.values.forEach((value, index) => {
                if (scoreElements[index + 1] && value.value) {
                    scoreElements[index + 1].textContent = value.value;
                }
            });
        }

        // Update recommendation
        const recommendation = card.querySelector('.factor-recommendation');
        if (recommendation && data.recommendation) {
            recommendation.textContent = data.recommendation;
        }
    }

    function updateRecommendations(recommendations) {
        const recommendationsContainer = yieldModal.querySelector('.recommendation-cards');
        if (!recommendationsContainer) return;
        
        recommendationsContainer.innerHTML = '';

        if (!recommendations || recommendations.length === 0) {
            const noRecs = document.createElement('p');
            noRecs.className = 'no-recommendations';
            noRecs.textContent = 'Your crop conditions look optimal! Continue with current management practices.';
            recommendationsContainer.appendChild(noRecs);
            return;
        }

        recommendations.forEach(rec => {
            const recElement = document.createElement('div');
            recElement.className = `recommendation-card ${rec.urgency === 'high' ? 'urgent' : ''}`;

            recElement.innerHTML = `
                <div class="rec-icon">
                    <i class="${rec.icon || 'fas fa-info-circle'}"></i>
                </div>
                <div class="rec-content">
                    <h4>${rec.title || 'Recommendation'}</h4>
                    <p>${rec.description || 'No description available'}</p>
                    <div class="rec-details">
                        <div class="rec-detail">
                            <i class="fas fa-clock"></i>
                            <span>${rec.timeframe || 'Not specified'}</span>
                        </div>
                        <div class="rec-detail">
                            <i class="fas fa-arrow-up"></i>
                            <span>${rec.potential_gain || 'Potential improvement'}</span>
                        </div>
                    </div>
                </div>
            `;

            recommendationsContainer.appendChild(recElement);
        });
    }

    function showResultSections() {
        const sections = yieldModal.querySelectorAll('.yield-overview, .yield-chart-section, .factor-analysis, .recommendations-section');
        sections.forEach((section, index) => {
            section.style.display = 'block';
            section.style.opacity = '0';
            section.style.transform = 'translateY(20px)';

            setTimeout(() => {
                section.style.transition = 'all 0.5s ease';
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, index * 200);
        });
    }

    function hideResultSections() {
        const sections = yieldModal.querySelectorAll('.yield-overview, .yield-chart-section, .factor-analysis, .recommendations-section');
        sections.forEach(section => {
            section.style.display = 'none';
        });
    }

    function showPredictionError(message) {
        const errorOverlay = document.createElement('div');
        errorOverlay.className = 'analysis-error-overlay';
        errorOverlay.innerHTML = `
            <div class="error-content">
                <i class="fas fa-exclamation-circle"></i>
                <h3>Prediction Failed</h3>
                <p>${message}</p>
                <button class="error-retry-btn" onclick="this.closest('.analysis-error-overlay').remove()">
                    Try Again
                </button>
            </div>
        `;

        const modalBody = yieldModal.querySelector('.yield-modal-body');
        if (modalBody) {
            modalBody.appendChild(errorOverlay);
        }

        setTimeout(() => {
            if (errorOverlay.parentElement) {
                errorOverlay.remove();
            }
        }, 10000);
    }

    function removeOverlays() {
        const overlays = yieldModal.querySelectorAll('.analysis-loading-overlay, .analysis-error-overlay');
        overlays.forEach(overlay => overlay.remove());
    }
});