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

  // ❌ Show errors
  if (errors.length > 0) {
      alert("Please fix the following:\n\n" + errors.join("\n"));
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
          alert("Product added!");
      } else {
          alert("Upload failed.");
      }
  })
  .catch(err => {
      console.error("Upload error", err);
  });
});
