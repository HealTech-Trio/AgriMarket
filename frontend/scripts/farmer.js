document.addEventListener('DOMContentLoaded', function() {
  
  // // Fetch user data from sessionStorage
  // const user = JSON.parse(sessionStorage.getItem("userData"));

  // if (user) {
  //   document.querySelectorAll(".user-name").forEach((el) => {
  //     el.textContent = user.profile.full_name;
  //   });
  // }

  document.querySelectorAll(".logout").forEach(btn => {
    btn.addEventListener("click", () => {
      fetch("http://localhost/AgriMarket/backend/logins/logout.php", {
        method: "POST"
      })
      .then(() => {
        sessionStorage.clear();
        window.location.href = "../../index.html"; // Redirect screen
      })
      .catch(err => {
        console.error("Logout failed", err);
      });
    });
  });

  // Tab Switching Functionality
  const menuLinks = document.querySelectorAll('.sidebar-menu a');
  const contentSections = document.querySelectorAll('.content-section');
  
  menuLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Get the target section ID from href
      const targetId = this.getAttribute('href').substring(1);
      const targetSection = document.getElementById(`${targetId}-content`);
      
      // Hide all sections
      contentSections.forEach(section => {
        section.classList.remove('active');
      });
      
      // Show target section
      if (targetSection) {
        targetSection.classList.add('active', 'fade-in');
      }
      
      // Update active menu item
      menuLinks.forEach(menuLink => {
        menuLink.parentElement.classList.remove('active');
      });
      
      this.parentElement.classList.add('active');
    });
  });
  
  // Time Filter Buttons in Sales Overview
  const timeFilterButtons = document.querySelectorAll('.time-filter button');
  timeFilterButtons.forEach(button => {
    button.addEventListener('click', function() {
      timeFilterButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
      
      // Here you would typically fetch new data based on the filter
      // For now, we'll just simulate it
      updateChart(this.textContent.trim());
    });
  });

  // Promotion toggle logic
  const promotionToggle = document.getElementById('promotion-toggle');
  const promotionFields = document.getElementById('promotion-fields');
  if (promotionToggle && promotionFields) {
    promotionToggle.addEventListener('change', function() {
      promotionFields.style.display = this.checked ? 'block' : 'none';
    });
  }

  // Availability toggle logic
  const availabilityToggle = document.getElementById('availability-toggle');
  const availabilityFields = document.getElementById('availability-fields');
  if (availabilityToggle && availabilityFields) {
    availabilityToggle.addEventListener('change', function() {
      availabilityFields.style.display = this.checked ? 'block' : 'none';
    });
    // Show fields if checked on load
    availabilityFields.style.display = availabilityToggle.checked ? 'block' : 'none';
  }

  // Auto Sync quantity unit with price unit
  const quantityUnit = document.getElementById('quantity-unit');
  const priceUnit = document.getElementById('price-unit');
  if (quantityUnit && priceUnit) {
    quantityUnit.addEventListener('change', function() {
      priceUnit.textContent = '/' + this.value;
    });
  }

  // Initialize Chart
  initializeChart();
  
  // Profile Section Tabs
  const profileMenuLinks = document.querySelectorAll('.profile-menu a');
  const profileSections = document.querySelectorAll('.profile-section');
  
  profileMenuLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href').substring(1);
      const targetSection = document.getElementById(`${targetId}-section`);
      
      profileSections.forEach(section => {
        section.classList.remove('active');
      });
      
      profileMenuLinks.forEach(menuLink => {
        menuLink.parentElement.classList.remove('active');
      });
      
      if (targetSection) {
        targetSection.classList.add('active', 'fade-in');
      }
      
      this.parentElement.classList.add('active');
    });
  });
  
  // Mobile Menu Toggle
  const mobileMenuToggle = document.createElement('button');
  mobileMenuToggle.className = 'mobile-menu-toggle';
  mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
  document.querySelector('.header-left').prepend(mobileMenuToggle);
  
  mobileMenuToggle.addEventListener('click', function() {
    document.querySelector('.sidebar').classList.toggle('active');
  });
  
  // Dropdown Menus
  const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
  dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', function() {
      const menu = this.nextElementSibling;
      menu.style.opacity = menu.style.opacity === '1' ? '0' : '1';
      menu.style.visibility = menu.style.visibility === 'visible' ? 'hidden' : 'visible';
      menu.style.transform = menu.style.transform === 'translateY(0px)' ? 'translateY(10px)' : 'translateY(0px)';
    });
  });
  
  // Close dropdowns when clicking outside
  document.addEventListener('click', function(e) {
    if (!e.target.closest('.language-switcher') && !e.target.closest('.profile-dropdown')) {
      document.querySelectorAll('.dropdown-menu').forEach(menu => {
        menu.style.opacity = '0';
        menu.style.visibility = 'hidden';
        menu.style.transform = 'translateY(10px)';
      });
    }
  });
  
  // Chart Functions
  function initializeChart() {
    const chartPlaceholder = document.querySelector('.chart-placeholder');
    if (!chartPlaceholder) return;
    
    // Replace placeholder with actual chart canvas
    chartPlaceholder.innerHTML = '<canvas id="salesChart"></canvas>';
    
    // Initialize Chart.js
    const ctx = document.getElementById('salesChart').getContext('2d');
    window.salesChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
          label: 'Sales (ZAR)',
          data: [1200, 1900, 1500, 2100, 2400, 1800, 2500],
          backgroundColor: 'rgba(30, 144, 255, 0.1)',
          borderColor: 'rgba(30, 144, 255, 1)',
          borderWidth: 2,
          tension: 0.4,
          fill: true,
          pointBackgroundColor: '#fff',
          pointBorderColor: 'rgba(30, 144, 255, 1)',
          pointBorderWidth: 2,
          pointRadius: 4,
          pointHoverRadius: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            backgroundColor: '#fff',
            titleColor: '#333',
            bodyColor: '#666',
            borderColor: '#eee',
            borderWidth: 1,
            padding: 12,
            usePointStyle: true,
            callbacks: {
              label: function(context) {
                return 'R ' + context.parsed.y.toFixed(2);
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(0, 0, 0, 0.05)'
            },
            ticks: {
              callback: function(value) {
                return 'R ' + value;
              }
            }
          },
          x: {
            grid: {
              display: false
            }
          }
        }
      }
    });
  }
  
  function updateChart(timeRange) {
    if (!window.salesChart) return;
    
    // Simulate different data based on time range
    let labels, data;
    
    switch(timeRange) {
      case 'Week':
        labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        data = [1200, 1900, 1500, 2100, 2400, 1800, 2500];
        break;
      case 'Month':
        labels = Array.from({length: 12}, (_, i) => `Week ${i+1}`);
        data = [4500, 5200, 4800, 5600, 6100, 5900, 6300, 6700, 7100, 6800, 7500, 8000];
        break;
      case 'Year':
        labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        data = [22000, 24000, 26000, 28000, 30000, 32000, 34000, 36000, 38000, 40000, 42000, 45000];
        break;
    }
    
    window.salesChart.data.labels = labels;
    window.salesChart.data.datasets[0].data = data;
    window.salesChart.update();
  }
  
  // Password Strength Indicator
  const passwordInput = document.getElementById('new-password');
  if (passwordInput) {
    passwordInput.addEventListener('input', function() {
      const strengthMeter = this.closest('.form-group').querySelector('.password-strength');
      const strengthBars = strengthMeter.querySelectorAll('.strength-bar');
      const strengthText = strengthMeter.querySelector('.strength-text');
      
      const password = this.value;
      let strength = 0;
      
      // Length check
      if (password.length >= 8) strength++;
      if (password.length >= 12) strength++;
      
      // Complexity checks
      if (/[A-Z]/.test(password)) strength++;
      if (/[0-9]/.test(password)) strength++;
      if (/[^A-Za-z0-9]/.test(password)) strength++;
      
      // Cap at 4 for our 4-bar display
      strength = Math.min(strength, 4);
      
      // Update UI
      strengthBars.forEach((bar, index) => {
        if (index < strength) {
          bar.style.backgroundColor = 
            strength < 2 ? '#dc3545' : 
            strength < 4 ? '#ffc107' : '#28a745';
        } else {
          bar.style.backgroundColor = '#e0e0e0';
        }
      });
      
      strengthText.textContent = 
        strength === 0 ? '' : 
        strength < 2 ? 'Weak' : 
        strength < 4 ? 'Moderate' : 'Strong';
      strengthText.style.color = 
        strength < 2 ? '#dc3545' : 
        strength < 4 ? '#ffc107' : '#28a745';
    });
  }
  
  // Image Upload Preview
  const imageUploadInputs = document.querySelectorAll('.image-upload input[type="file"]');
  imageUploadInputs.forEach(input => {
    input.addEventListener('change', function() {
      const previewItem = this.closest('.preview-item');
      const file = this.files[0];
      
      if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
          previewItem.innerHTML = `<img src="${e.target.result}" alt="Preview">`;
          previewItem.classList.remove('empty');
        }
        reader.readAsDataURL(file);
      }
    });
  });
});

const uploadedFiles = {};

// Track image inputs
const imageInputs = document.querySelectorAll('.preview-item input[type="file"]');
imageInputs.forEach((input, index) => {
    input.addEventListener('change', function () {
        if (this.files && this.files.length > 0) {
            uploadedFiles[`image${index + 1}`] = this.files[0];
        }
    });
});

// Validate and handle submit
document.querySelector('.btn.btn-primary').addEventListener('click', function (e) {
  e.preventDefault();

  // ✅ Create FormData to send to PHP
  const formData = new FormData();
  const farmer_id = 22; // You’ll replace this with actual user ID later

  // Collect values
  const productName = document.getElementById('product-name').value.trim();
  const category = document.getElementById('product-category').value;
  const quantity = document.getElementById('product-quantity').value;
  const quantityUnit = document.getElementById('quantity-unit').value;
  const price = document.getElementById('product-price').value;
  const priceUnit = document.getElementById('price-unit').textContent;
  const description = document.getElementById('product-description').value.trim();
  const promotionEnabled = document.getElementById('promotion-toggle').checked;

  const availability = document.getElementById('availability-toggle').checked;
  const availabilityStart = document.getElementById('availability-start')?.value;

  // 🔍 Validation
  let errors = [];

  if (!productName) errors.push("Product name is required.");
  if (!category) errors.push("Category is required.");
  if (!quantity || isNaN(quantity) || Number(quantity) <= 0) errors.push("Quantity must be a positive number.");
  if (!quantityUnit) errors.push("Quantity unit is required.");
  if (!price || isNaN(price) || Number(price) <= 0) errors.push("Price must be a positive number.");
  if (!priceUnit) errors.push("Price unit is missing.");
  if (!description) errors.push("Description is required.");

  if (Object.keys(uploadedFiles).length === 0) {
      errors.push("At least one image must be uploaded.");
  }

  if (promotionEnabled) {
      const promoName = document.getElementById('promotion-name').value.trim();
      const promoCode = document.getElementById('promotion-code').value.trim();
      const promoType = document.getElementById('promotion-type').value;
      const promoValue = document.getElementById('promotion-value').value;
      const promoStart = document.getElementById('promotion-start').value;
      const promoEnd = document.getElementById('promotion-end').value;

      if (!promoName || !promoCode || !promoType || !promoValue || !promoStart || !promoEnd) {
          errors.push("All promotion fields must be filled in.");
      }
  }

  if (errors.length > 0) {
      // alert("Please fix the following:\n\n" + errors.join("\n"));
      return;
  }

  formData.append("farmer_id", farmer_id);
  formData.append("productName", productName);
  formData.append("category", category);
  formData.append("quantity", quantity);
  formData.append("quantityUnit", quantityUnit);
  formData.append("price", price);
  formData.append("priceUnit", priceUnit);
  formData.append("description", description);
  formData.append("availability", availability ? 1 : 0);
  formData.append("availabilityStart", availability ? availabilityStart : "");

  formData.append("promotionEnabled", promotionEnabled);
  if (promotionEnabled) {
    const promotionDetails = {
      name: document.getElementById('promotion-name').value.trim(),
      code: document.getElementById('promotion-code').value.trim(),
      type: document.getElementById('promotion-type').value,
      value: document.getElementById('promotion-value').value,
      start: document.getElementById('promotion-start').value,
      end: document.getElementById('promotion-end').value
    };

    formData.append("promotionName", promotionDetails.name);
    formData.append("promotionCode", promotionDetails.code);
    formData.append("promotionType", promotionDetails.type);
    formData.append("promotionValue", promotionDetails.value);
    formData.append("promotionStart", promotionDetails.start);
    formData.append("promotionEnd", promotionDetails.end);
  }

  // Append multiple images under 'images[]'
  Object.values(uploadedFiles).forEach(file => {
      formData.append("images[]", file);
  });

  // Submit to PHP
  fetch("http://localhost/AgriMarket/backend/products/add_product.php", {
      method: "POST",
      body: formData
  })
  .then(res => res.json())
  .then(data => {
      console.log(data);
      if (data.success) {
          // alert("Product added!");
      } else {
          // alert("Upload failed.");
      }
  })
  .catch(err => {
      console.error("Upload error", err);
  });
});


// AgriAssistant Modal Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get modal elements
    const agriModal = document.getElementById('agriAssistantModal');
    const agriModalBackdrop = document.querySelector('.agri-modal-backdrop');
    const closeAgriModal = document.getElementById('closeAgriModal');
    const aiChatModal = document.getElementById('aiChatModal');
    const closeChatModal = document.getElementById('closeChatModal');
    const chatInput = document.getElementById('chatInput');
    const sendMessage = document.getElementById('sendMessage');
    const chatMessages = document.getElementById('chatMessages');
    
    // Open modal when assistant is clicked
    const assistantBtn = document.getElementById('assistant');
    if (assistantBtn) {
        assistantBtn.addEventListener('click', function(e) {
            e.preventDefault();
            openAgriModal();
        });
    }
    
    // Close modal when close button is clicked
    if (closeAgriModal) {
        closeAgriModal.addEventListener('click', closeAgriModalFunc);
    }
    
    // Close modal when clicking outside
    if (agriModalBackdrop) {
        agriModalBackdrop.addEventListener('click', function(e) {
            if (e.target === agriModalBackdrop) {
                closeAgriModalFunc();
            }
        });
    }
    
    // Close chat modal
    if (closeChatModal) {
        closeChatModal.addEventListener('click', closeChatModalFunc);
    }
    
    // Send message functionality
    if (sendMessage) {
        sendMessage.addEventListener('click', sendChatMessage);
    }
    
    if (chatInput) {
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendChatMessage();
            }
        });
    }
    
    // Feature card click handlers
    const featureCards = document.querySelectorAll('.ai-feature-card');
    featureCards.forEach(card => {
        card.addEventListener('click', function() {
            const feature = this.getAttribute('data-feature');
            handleFeatureClick(feature);
        });
    });
    
    // Suggestion chip click handlers
    const suggestionChips = document.querySelectorAll('.suggestion-chip');
    suggestionChips.forEach(chip => {
        chip.addEventListener('click', function() {
            const question = this.textContent;
            chatInput.value = question;
            sendChatMessage();
        });
    });
    
    // Quick action button handlers
    const quickActionBtns = document.querySelectorAll('.quick-action-btn');
    quickActionBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const action = Array.from(this.classList).find(cls => cls !== 'quick-action-btn');
            handleQuickAction(action);
        });
    });
    
    // Function to open the AgriAssistant modal
    function openAgriModal() {
        if (agriModal) {
            agriModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
            
            // Generate demo data for the modal
            generateDemoData();
        }
    }
    
    // Function to close the AgriAssistant modal
    function closeAgriModalFunc() {
        if (agriModal) {
            agriModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
        closeChatModalFunc();
    }
    
    // Function to open the chat modal
    function openChatModal() {
        if (aiChatModal) {
            aiChatModal.style.display = 'flex';
        }
    }
    
    // Function to close the chat modal
    function closeChatModalFunc() {
        if (aiChatModal) {
            aiChatModal.style.display = 'none';
        }
    }
    
    // Function to handle feature card clicks
    function handleFeatureClick(feature) {
        switch(feature) {
            case 'smart-chat':
                openChatModal();
                break;
            case 'crop-analysis':
                showCropAnalysis();
                break;
            case 'weather-insights':
                showWeatherInsights();
                break;
            case 'market-trends':
                showMarketTrends();
                break;
            case 'yield-prediction':
                showYieldPrediction();
                break;
            case 'resource-optimizer':
                showResourceOptimizer();
                break;
        }
    }
    
    // Function to handle quick actions
    function handleQuickAction(action) {
        switch(action) {
            case 'analyze-photos':
                showCropAnalysis();
                break;
            case 'weather-forecast':
                showWeatherForecast();
                break;
            case 'price-check':
                checkMarketPrices();
                break;
            case 'ask-ai':
                openChatModal();
                break;
        }
    }
    
    // Function to send chat message
    function sendChatMessage() {
        const message = chatInput.value.trim();
        if (message) {
            // Add user message
            addChatMessage(message, 'user');
            
            // Clear input
            chatInput.value = '';
            
            // Simulate AI response after a short delay
            setTimeout(() => {
                const aiResponse = generateAIResponse(message);
                addChatMessage(aiResponse, 'ai');
                
                // Scroll to bottom
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }, 1000);
        }
    }
    
    // Function to add chat message
    function addChatMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        
        const avatarDiv = document.createElement('div');
        avatarDiv.className = 'message-avatar';
        
        if (sender === 'ai') {
            avatarDiv.innerHTML = '<i class="fas fa-robot"></i>';
        } else {
            avatarDiv.innerHTML = '<i class="fas fa-user"></i>';
        }
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        
        const messageP = document.createElement('p');
        messageP.textContent = text;
        
        const timeSpan = document.createElement('span');
        timeSpan.className = 'message-time';
        timeSpan.textContent = 'Just now';
        
        contentDiv.appendChild(messageP);
        contentDiv.appendChild(timeSpan);
        
        messageDiv.appendChild(avatarDiv);
        messageDiv.appendChild(contentDiv);
        
        chatMessages.appendChild(messageDiv);
        
        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // Function to generate AI response based on message
    function generateAIResponse(message) {
        message = message.toLowerCase();
        
        // Crop-related questions
        if (message.includes('tomato') || message.includes('tomatoes')) {
            return "Based on your crop data, your tomatoes are growing well but could use some additional nutrients. I recommend applying organic fertilizer with higher phosphorus content to improve fruit production.";
        }
        
        if (message.includes('plant') || message.includes('growing')) {
            return "The optimal planting time for your region is between September and November. Make sure to prepare the soil with compost and maintain proper spacing of about 45-60cm between plants.";
        }
        
        // Weather-related questions
        if (message.includes('weather') || message.includes('rain')) {
            return "The weather forecast for the next 7 days shows moderate rainfall (15-20mm) expected on Thursday and Friday. Temperatures will range between 18°C and 28°C. Good conditions for most crops.";
        }
        
        // Market-related questions
        if (message.includes('price') || message.includes('market')) {
            return "Current market prices for your region: Tomatoes - R45-55/kg, Apples - R60-70/kg, Corn - R25-35/kg. Prices are expected to rise by 10-15% over the next two weeks due to increased demand.";
        }
        
        // General farming advice
        if (message.includes('pest') || message.includes('disease')) {
            return "I'm detecting some early signs of aphid infestation in your crops. Consider using neem oil spray or introducing ladybugs as a natural control method. Avoid chemical pesticides if possible.";
        }
        
        if (message.includes('water') || message.includes('irrigation')) {
            return "Your soil moisture levels are optimal. Based on current weather conditions, I recommend watering every 2-3 days. Drip irrigation in the early morning is most efficient.";
        }
        
        if (message.includes('soil') || message.includes('fertilizer')) {
            return "Your soil test shows adequate nitrogen but slightly low phosphorus levels. I recommend applying bone meal or rock phosphate to improve phosphorus content. pH is at 6.8 which is ideal for most crops.";
        }
        
        // Default response
        return "I understand you're asking about farming practices. Could you provide more specific details about your question so I can give you the most accurate advice for your situation?";
    }
    
    // Function to generate demo data for the modal
    function generateDemoData() {
        // This would be replaced with real API calls in production
        
        // Update last update time
        const lastUpdate = document.querySelector('.last-update');
        if (lastUpdate) {
            const now = new Date();
            lastUpdate.textContent = `Last updated: ${now.toLocaleTimeString()}`;
        }
    }
    
    // Demo functions for different features
    function showCropAnalysis() {
        // alert("Crop Analysis: Your tomatoes show 92% health with minor nutrient deficiencies detected. Apples are at 88% health with some signs of pest activity. Corn is at 95% health with optimal growth conditions.");
    }
    
    function showWeatherInsights() {
        // alert("Weather Insights: 7-day forecast shows optimal growing conditions with moderate rainfall expected. Temperature range: 18-28°C. Humidity: 65-80%. Good conditions for most crops.");
    }
    
    function showMarketTrends() {
        // alert("Market Trends: Tomato prices are rising (+15% this week). Apple demand is steady. Corn prices are stable but expected to increase next month. Best time to sell tomatoes is within the next 10 days.");
    }
    
    function showYieldPrediction() {
        // alert("Yield Prediction: Based on current growth patterns and weather forecasts, your expected yields are: Tomatoes - 850kg, Apples - 620kg, Corn - 450kg. This is 12% above your historical average.");
    }
    
    function showResourceOptimizer() {
        // alert("Resource Optimization: You can reduce water usage by 15% by adjusting irrigation schedules. Fertilizer efficiency can be improved by 20% with targeted application. Energy costs can be reduced by 10% with solar panel installation.");
    }
    
    function analyzeCropPhotos() {
        // alert("Crop Photo Analysis: Please upload images of your crops. Our AI will analyze them for disease detection, growth stage assessment, and health evaluation.");
    }
    
    function showWeatherForecast() {
        // alert("7-Day Weather Forecast: \nMon: Sunny, 25°C \nTue: Partly cloudy, 26°C \nWed: Cloudy, 24°C \nThu: Light rain, 22°C \nFri: Showers, 20°C \nSat: Partly cloudy, 23°C \nSun: Sunny, 25°C");
    }
    
    function checkMarketPrices() {
        // alert("Current Market Prices: \nTomatoes: R45-55/kg \nApples: R60-70/kg \nCorn: R25-35/kg \nCarrots: R35-45/kg \nPotatoes: R20-30/kg \nOnions: R25-40/kg");
    }
    
    // Initialize the modal with demo data
    generateDemoData();
});

// Support Team Modal Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get support modal elements
    const supportModal = document.createElement('div');
    supportModal.className = 'support-modal';
    supportModal.innerHTML = `
        <div class="support-modal-backdrop"></div>
        <div class="support-modal-container">
            <div class="support-modal-header">
                <div class="support-header-content">
                    <div class="support-avatar">
                        <div class="support-pulse"></div>
                        <i class="fas fa-headset"></i>
                    </div>
                    <div class="support-header-text">
                        <h2>Support Team</h2>
                        <p>Get help from our agricultural experts</p>
                    </div>
                </div>
                <button class="support-modal-close" id="closeSupportModal">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="support-modal-body">
                <div class="support-sidebar">
                    <div class="support-team-list" id="supportTeamList">
                        <!-- Team members will be added dynamically -->
                    </div>
                    <div class="support-info">
                        <h4>Support Statistics</h4>
                        <div class="support-stats">
                            <div class="stat-item">
                                <div class="stat-value">4.8</div>
                                <div class="stat-label">Avg. Rating</div>
                            </div>
                            <div class="stat-item">
                                <div class="stat-value">12m</div>
                                <div class="stat-label">Avg. Response</div>
                            </div>
                        </div>
                        <div class="support-contact">
                            <div class="contact-item">
                                <i class="fas fa-phone"></i>
                                <span>+27 123 456 7890</span>
                            </div>
                            <div class="contact-item">
                                <i class="fas fa-envelope"></i>
                                <span>support@agrimarket.co.za</span>
                            </div>
                            <div class="contact-item">
                                <i class="fas fa-clock"></i>
                                <span>Mon-Fri: 8AM-6PM</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="support-chat-container">
                    <div class="chat-header">
                        <div class="current-chat-info">
                            <div class="current-chat-avatar" id="currentChatAvatar">
                                <i class="fas fa-user"></i>
                            </div>
                            <div class="current-chat-details">
                                <h3 id="currentChatName">Select a team member</h3>
                                <p id="currentChatStatus">to start conversation</p>
                            </div>
                        </div>
                        <div class="chat-actions">
                            <button class="chat-action-btn">
                                <i class="fas fa-phone"></i>
                            </button>
                            <button class="chat-action-btn">
                                <i class="fas fa-video"></i>
                            </button>
                            <button class="chat-action-btn">
                                <i class="fas fa-info-circle"></i>
                            </button>
                        </div>
                    </div>
                    <div class="chat-messages" id="supportChatMessages">
                        <div class="message support">
                            <div class="message-avatar">
                                <i class="fas fa-headset"></i>
                            </div>
                            <div class="message-content">
                                <p class="message-text">Welcome to AgriMarket Support! Please select a team member to start chatting.</p>
                                <span class="message-time">Just now</span>
                            </div>
                        </div>
                    </div>
                    <div class="chat-input-container">
                        <div class="chat-input-wrapper">
                            <button class="attachment-btn">
                                <i class="fas fa-paperclip"></i>
                            </button>
                            <div class="chat-input">
                                <textarea id="supportChatInput" placeholder="Type your message..." rows="1"></textarea>
                                <button class="send-button" id="sendSupportMessage">
                                    <i class="fas fa-paper-plane"></i>
                                </button>
                            </div>
                        </div>
                        <div class="quick-replies">
                            <h4>Quick replies:</h4>
                            <div class="reply-chips">
                                <button class="reply-chip">Payment issue</button>
                                <button class="reply-chip">Product question</button>
                                <button class="reply-chip">Technical problem</button>
                                <button class="reply-chip">Order status</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(supportModal);
    
    // Get elements
    const supportModalBackdrop = supportModal.querySelector('.support-modal-backdrop');
    const closeSupportModal = supportModal.querySelector('#closeSupportModal');
    const supportTeamList = supportModal.querySelector('#supportTeamList');
    const supportChatMessages = supportModal.querySelector('#supportChatMessages');
    const supportChatInput = supportModal.querySelector('#supportChatInput');
    const sendSupportMessage = supportModal.querySelector('#sendSupportMessage');
    const currentChatAvatar = supportModal.querySelector('#currentChatAvatar');
    const currentChatName = supportModal.querySelector('#currentChatName');
    const currentChatStatus = supportModal.querySelector('#currentChatStatus');
    const replyChips = supportModal.querySelectorAll('.reply-chip');
    
    // Support team data
    const supportTeam = [
        {
            id: 1,
            name: "Sarah Johnson",
            role: "Agricultural Specialist",
            status: "online",
            avatarText: "SJ",
            specialty: "Crop management, soil health",
            responseTime: "5m",
            avatarColor: "#4CAF50"
        },
        {
            id: 2,
            name: "David Wilson",
            role: "Technical Support",
            status: "online",
            avatarText: "DW",
            specialty: "Platform issues, account management",
            responseTime: "3m",
            avatarColor: "#2196F3"
        },
        {
            id: 3,
            name: "Grace Mbeki",
            role: "Sales Consultant",
            status: "busy",
            avatarText: "GM",
            specialty: "Product listings, pricing strategy",
            responseTime: "15m",
            avatarColor: "#9C27B0"
        },
        {
            id: 4,
            name: "Thomas van der Merwe",
            role: "Billing Specialist",
            status: "away",
            avatarText: "TV",
            specialty: "Payments, invoices, refunds",
            responseTime: "25m",
            avatarColor: "#FF9800"
        }
    ];
    
    // Conversation data
    const conversations = {
        1: [
            {
                sender: "support",
                text: "Hello Divin! I'm Sarah, your agricultural specialist. How can I help you with your crops today?",
                time: "2 minutes ago"
            }
        ],
        2: [
            {
                sender: "support",
                text: "Hi there! David from technical support here. What can I assist you with today?",
                time: "5 minutes ago"
            }
        ],
        3: [
            {
                sender: "support",
                text: "Good day! Grace from sales consulting. Do you need help with product listings or pricing?",
                time: "10 minutes ago"
            }
        ],
        4: [
            {
                sender: "support",
                text: "Hello, Thomas here from billing. How can I help with your payment questions?",
                time: "15 minutes ago"
            }
        ]
    };
    
    let activeTeamMember = null;
    
    // Open modal when support team is clicked
    const supportTeamBtn = document.getElementById('supportTeam');
    if (supportTeamBtn) {
        supportTeamBtn.addEventListener('click', function(e) {
            e.preventDefault();
            openSupportModal();
        });
    }
    
    // Close modal when close button is clicked
    if (closeSupportModal) {
        closeSupportModal.addEventListener('click', closeSupportModalFunc);
    }
    
    // Close modal when clicking outside
    if (supportModalBackdrop) {
        supportModalBackdrop.addEventListener('click', function(e) {
            if (e.target === supportModalBackdrop) {
                closeSupportModalFunc();
            }
        });
    }
    
    // Send message functionality
    if (sendSupportMessage) {
        sendSupportMessage.addEventListener('click', sendSupportChatMessage);
    }
    
    if (supportChatInput) {
        supportChatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendSupportChatMessage();
            }
        });
        
        // Auto-resize textarea
        supportChatInput.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = (this.scrollHeight) + 'px';
        });
    }
    
    // Reply chip click handlers
    replyChips.forEach(chip => {
        chip.addEventListener('click', function() {
            const message = this.textContent;
            supportChatInput.value = message;
            sendSupportChatMessage();
        });
    });
    
    // Function to open the Support modal
    function openSupportModal() {
        supportModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Populate team list
        populateTeamList();
    }
    
    // Function to close the Support modal
    function closeSupportModalFunc() {
        supportModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    
    // Function to populate team list
    function populateTeamList() {
        supportTeamList.innerHTML = '';
        
        supportTeam.forEach(member => {
            const memberElement = document.createElement('div');
            memberElement.className = 'team-member';
            memberElement.dataset.id = member.id;
            
            memberElement.innerHTML = `
                <div class="member-avatar" style="background-color: ${member.avatarColor};">
                    ${member.avatarText}
                </div>
                <div class="member-info">
                    <div class="member-name">${member.name}</div>
                    <div class="member-role">${member.role}</div>
                    <div class="member-status">
                        <span class="status-dot status-${member.status}"></span>
                        <span>${member.status.charAt(0).toUpperCase() + member.status.slice(1)} • ${member.responseTime}</span>
                    </div>
                </div>
            `;
            
            memberElement.addEventListener('click', function() {
                selectTeamMember(member.id);
            });
            
            supportTeamList.appendChild(memberElement);
        });
    }
    
    // Function to select a team member
    function selectTeamMember(memberId) {
        // Remove active class from all members
        const allMembers = supportTeamList.querySelectorAll('.team-member');
        allMembers.forEach(member => member.classList.remove('active'));
        
        // Add active class to selected member
        const selectedMember = supportTeamList.querySelector(`[data-id="${memberId}"]`);
        selectedMember.classList.add('active');
        
        // Set active team member
        activeTeamMember = supportTeam.find(member => member.id === memberId);
        
        // Update current chat info
        currentChatAvatar.innerHTML = activeTeamMember.avatarText;
        currentChatAvatar.style.backgroundColor = activeTeamMember.avatarColor;
        currentChatName.textContent = activeTeamMember.name;
        currentChatStatus.textContent = `${activeTeamMember.role} • ${activeTeamMember.status.charAt(0).toUpperCase() + activeTeamMember.status.slice(1)}`;
        
        // Load conversation
        loadConversation(memberId);
    }
    
    // Function to load conversation
    function loadConversation(memberId) {
        supportChatMessages.innerHTML = '';
        
        if (conversations[memberId]) {
            conversations[memberId].forEach(message => {
                addSupportMessage(message.text, message.sender, message.time);
            });
        }
        
        // Scroll to bottom
        supportChatMessages.scrollTop = supportChatMessages.scrollHeight;
    }
    
    // Function to send chat message
    function sendSupportChatMessage() {
        const message = supportChatInput.value.trim();
        if (message && activeTeamMember) {
            // Add user message
            addSupportMessage(message, 'user', 'Just now');
            
            // Clear input and reset height
            supportChatInput.value = '';
            supportChatInput.style.height = 'auto';
            
            // Simulate support response after a short delay
            setTimeout(() => {
                const response = generateSupportResponse(message, activeTeamMember.id);
                addSupportMessage(response, 'support', 'Just now');
                
                // Add to conversation history
                conversations[activeTeamMember.id].push(
                    { sender: 'user', text: message, time: 'Just now' },
                    { sender: 'support', text: response, time: 'Just now' }
                );
                
                // Scroll to bottom
                supportChatMessages.scrollTop = supportChatMessages.scrollHeight;
            }, 1500);
        } else if (!activeTeamMember) {
            // Show warning if no team member is selected
            const warningMessage = "Please select a support team member to chat with.";
            addSupportMessage(warningMessage, 'support', 'Just now');
            supportChatMessages.scrollTop = supportChatMessages.scrollHeight;
        }
    }
    
    // Function to add message to chat
    function addSupportMessage(text, sender, time) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;
        
        const avatarDiv = document.createElement('div');
        avatarDiv.className = 'message-avatar';
        
        if (sender === 'support') {
            avatarDiv.innerHTML = activeTeamMember ? activeTeamMember.avatarText : '<i class="fas fa-headset"></i>';
            if (activeTeamMember) {
                avatarDiv.style.backgroundColor = activeTeamMember.avatarColor;
            }
        } else {
            avatarDiv.innerHTML = '<i class="fas fa-user"></i>';
            avatarDiv.style.backgroundColor = '#e0e0e0';
        }
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        
        const messageP = document.createElement('p');
        messageP.className = 'message-text';
        messageP.textContent = text;
        
        const timeSpan = document.createElement('span');
        timeSpan.className = 'message-time';
        timeSpan.textContent = time;
        
        contentDiv.appendChild(messageP);
        contentDiv.appendChild(timeSpan);
        
        messageDiv.appendChild(avatarDiv);
        messageDiv.appendChild(contentDiv);
        
        supportChatMessages.appendChild(messageDiv);
        
        // Scroll to bottom
        supportChatMessages.scrollTop = supportChatMessages.scrollHeight;
    }
    
    // Function to generate support response
    function generateSupportResponse(message, memberId) {
        message = message.toLowerCase();
        const member = supportTeam.find(m => m.id === memberId);
        
        // Agricultural specialist responses
        if (memberId === 1) {
            if (message.includes('tomato') || message.includes('tomatoes')) {
                return "For tomatoes, I recommend checking the soil pH first. It should be between 6.0-6.8. Are you noticing any specific issues with your tomatoes?";
            }
            if (message.includes('water') || message.includes('irrigation')) {
                return "Tomatoes need about 1-2 inches of water per week. It's best to water deeply but infrequently to encourage strong root development.";
            }
            if (message.includes('pest') || message.includes('insect')) {
                return "Common tomato pests include aphids and hornworms. I recommend using neem oil or introducing beneficial insects like ladybugs. Can you describe what you're seeing?";
            }
            return "Thank you for your question about crop management. I'd be happy to help you with that. Could you provide more details about your specific situation?";
        }
        
        // Technical support responses
        if (memberId === 2) {
            if (message.includes('login') || message.includes('password')) {
                return "I can help you reset your password. Would you like me to send a password reset link to your email address?";
            }
            if (message.includes('upload') || message.includes('product')) {
                return "For product upload issues, please make sure your images are under 5MB and in JPG or PNG format. Are you getting any specific error message?";
            }
            if (message.includes('app') || message.includes('mobile')) {
                return "Our mobile app is available for both iOS and Android. You can download it from the App Store or Google Play Store. Is there a specific issue you're experiencing with the app?";
            }
            return "Thank you for contacting technical support. I'll be happy to help you resolve any issues you're experiencing with our platform. Can you please describe the problem in more detail?";
        }
        
        // Sales consultant responses
        if (memberId === 3) {
            if (message.includes('price') || message.includes('cost')) {
                return "Pricing depends on market demand, quality, and quantity. Based on current market trends, I'd recommend pricing your tomatoes between R45-65 per kg. Would you like more specific advice?";
            }
            if (message.includes('promot') || message.includes('market')) {
                return "We have several promotion options available, including featured listings and seasonal campaigns. What type of products are you looking to promote?";
            }
            if (message.includes('sell') || message.includes('listing')) {
                return "To create an effective product listing, make sure to include high-quality photos, detailed descriptions, and accurate measurements. Would you like me to review your current listings?";
            }
            return "Thank you for your inquiry. I'm here to help you maximize your sales on our platform. Could you tell me more about what you'd like to achieve?";
        }
        
        // Billing specialist responses
        if (memberId === 4) {
            if (message.includes('payment') || message.includes('pay')) {
                return "I can help you with payment issues. We accept bank transfers, credit cards, and mobile money. Which payment method are you having trouble with?";
            }
            if (message.includes('invoice') || message.includes('receipt')) {
                return "You can download your invoices from the Billing section of your dashboard. Do you need help finding a specific invoice?";
            }
            if (message.includes('fee') || message.includes('commission')) {
                return "Our standard commission is 10% on sales. This helps us maintain the platform and provide support services. Are you seeing unexpected charges?";
            }
            return "Thank you for your billing inquiry. I'll be happy to assist you with any payment or invoice questions. Could you please provide more details about your issue?";
        }
        
        // Default response
        return "Thank you for your message. I'll be happy to help you with that. Could you please provide more details so I can assist you better?";
    }
    
    // Initialize the modal with demo data
    populateTeamList();
});

// Weather Insights Modal - Simple Not Implemented Message
document.addEventListener('DOMContentLoaded', function() {
    // Create weather modal element
    const weatherModal = document.createElement('div');
    weatherModal.className = 'weather-modal';
    weatherModal.innerHTML = `
        <div class="weather-modal-backdrop"></div>
        <div class="weather-modal-container">
            <div class="weather-modal-header">
                <div class="weather-header-content">
                    <div class="weather-avatar">
                        <div class="weather-pulse"></div>
                        <i class="fas fa-cloud-sun"></i>
                    </div>
                    <div class="weather-header-text">
                        <h2>Weather Insights</h2>
                        <p>Real-time weather data and farming recommendations</p>
                    </div>
                </div>
                <button class="weather-modal-close" id="closeWeatherModal">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="weather-modal-body">
                <div class="not-implemented-section">
                    <div class="not-implemented-icon">
                        <i class="fas fa-tools"></i>
                    </div>
                    <h3>Feature Coming Soon</h3>
                    <p>Weather insights functionality is not yet implemented in our system.</p>
                    <p>We will be integrating with commercial agricultural APIs in a future release.</p>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(weatherModal);
    
    // Get elements
    const weatherModalBackdrop = weatherModal.querySelector('.weather-modal-backdrop');
    const closeWeatherModal = weatherModal.querySelector('#closeWeatherModal');
    
    // Open modal when weather insights is clicked
    document.addEventListener('click', function(e) {
        if (e.target.closest('.weather-insights')) {
            e.preventDefault();
            openWeatherModal();
        }
    });
    
    // Close modal when close button is clicked
    if (closeWeatherModal) {
        closeWeatherModal.addEventListener('click', closeWeatherModalFunc);
    }
    
    // Close modal when clicking outside
    if (weatherModalBackdrop) {
        weatherModalBackdrop.addEventListener('click', function(e) {
            if (e.target === weatherModalBackdrop) {
                closeWeatherModalFunc();
            }
        });
    }
    
    // Function to open the Weather Insights modal
    function openWeatherModal() {
        weatherModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
    
    // Function to close the Weather Insights modal
    function closeWeatherModalFunc() {
        weatherModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});