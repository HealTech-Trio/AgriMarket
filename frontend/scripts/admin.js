/* JavaScript for Tab Functionality */
/* Add this to your admin.js file */
document.addEventListener('DOMContentLoaded', function() {
  // Tab functionality
  const tabButtons = document.querySelectorAll('.tab-btn');
  tabButtons.forEach(button => {
    button.addEventListener('click', function() {
      const parent = this.parentElement;
      parent.querySelector('.tab-btn.active').classList.remove('active');
      this.classList.add('active');
    });
  });

  // Sidebar menu functionality
  const menuItems = document.querySelectorAll('.sidebar-menu li:not(.logout)');
  menuItems.forEach(item => {
    item.addEventListener('click', function() {
      document.querySelector('.sidebar-menu li.active').classList.remove('active');
      this.classList.add('active');
      
      // Hide all content sections
      document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
      });
      
      // Show the corresponding content section
      const target = this.querySelector('a').getAttribute('href').substring(1);
      document.getElementById(`${target}-content`).classList.add('active');
    });
  });

  // Toggle maintenance fields
  const maintenanceToggle = document.getElementById('maintenance-toggle');
  if (maintenanceToggle) {
    maintenanceToggle.addEventListener('change', function() {
      const fields = document.getElementById('maintenance-fields');
      fields.style.display = this.checked ? 'block' : 'none';
    });
  }

  // Mobile menu toggle (you'll need to add a menu toggle button in your HTML)
  const menuToggle = document.querySelector('.menu-toggle');
  if (menuToggle) {
    menuToggle.addEventListener('click', function() {
      document.querySelector('.admin-sidebar').classList.toggle('active');
    });
  }

  // Initialize all time filters
  const allTimeFilters = document.querySelectorAll('.time-filter');
  allTimeFilters.forEach(filter => {
      filter.addEventListener('click', function() {
          const parent = this.closest('.time-filters');
          parent.querySelectorAll('.time-filter').forEach(f => f.classList.remove('active'));
          this.classList.add('active');
          
          // Update chart data based on selected time filter
          updateChartData(this.textContent);
      });
  });

  // Create the unified column chart
  const ctx = document.getElementById('unifiedColumnChart').getContext('2d');

  // Generate data for the chart
  const quarters = ['Q1', 'Q2', 'Q3', 'Q4'];

  // Data for each metric (normalized for comparison)
  const userGrowthData = [12050, 13500, 14200, 15408];
  const VerifiedFarmersData = [18500, 21000, 19500, 23400];
  // Use higher values for better chart balance:
  const ActiveProductsData = [12000, 15000, 17000, 20000];
  const TotalTransactionsData = [18500, 21000, 19500, 23400];

  // Create the chart with initial data (Quarterly view)
  const chart = new Chart(ctx, {
      type: 'bar',
      data: {
          labels: quarters,
          datasets: [
              {
                  label: 'User Growth',
                  data: userGrowthData,
                  backgroundColor: '#3498db',
                  borderColor: '#2980b9',
                  borderWidth: 1,
                  borderRadius: 5,
                  yAxisID: 'y'
              },
              {
                  label: 'Verified Farmers',
                  data: VerifiedFarmersData,
                  backgroundColor: '#2ecc71',
                  borderColor: '#27ae60',
                  borderWidth: 1,
                  borderRadius: 5,
                  yAxisID: 'y1'
              },
              {
                  label: 'Active Products',
                  data: ActiveProductsData,
                  backgroundColor: '#9b59b6',
                  borderColor: '#8e44ad',
                  borderWidth: 1,
                  borderRadius: 5,
                  yAxisID: 'y'
              },
              {
                  label: 'Total Transactions',
                  data: TotalTransactionsData,
                  backgroundColor: '#e74c3c',
                  borderColor: '#c0392b',
                  borderWidth: 1,
                  borderRadius: 5,
                  yAxisID: 'y'
              }
          ]
      },
      options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
              legend: {
                  display: false
              },
              tooltip: {
                  mode: 'index',
                  intersect: false,
                  padding: 15,
                  backgroundColor: 'rgba(0, 0, 0, 0.8)',
                  titleFont: {
                      size: 14
                  },
                  bodyFont: {
                      size: 14
                  },
                  callbacks: {
                      label: function(context) {
                          let label = context.dataset.label || '';
                          if (label) {
                              label += ': ';
                          }
                          if (context.parsed.y !== null) {
                              label += new Intl.NumberFormat().format(context.parsed.y);
                          }
                          return label;
                      }
                  }
              }
          },
          scales: {
              y: {
                  type: 'linear',
                  display: true,
                  position: 'left',
                  title: {
                      display: true,
                      text: 'User Growth / Active Products',
                      color: '#5a6b82',
                      font: {
                          weight: 'bold'
                      }
                  },
                  grid: {
                      color: 'rgba(0, 0, 0, 0.05)'
                  }
              },
              y1: {
                  type: 'linear',
                  display: true,
                  position: 'right',
                  title: {
                      display: true,
                      text: 'Verified Farmers / Total Transactions',
                      color: '#5a6b82',
                      font: {
                          weight: 'bold'
                      }
                  },
                  grid: {
                      drawOnChartArea: false
                  }
              },
              x: {
                  grid: {
                      display: false
                  },
                  title: {
                      display: true,
                      text: 'Quarters',
                      color: '#5a6b82',
                      font: {
                          weight: 'bold'
                      }
                  }
              }
          },
          layout: {
              padding: {
                  top: 10
              }
          }
      }
  });

  // Function to update chart data based on selected time filter
  function updateChartData(timeFrame) {
    let labels, userData, FarmersData, ProductsData, TotalData;
    
    switch(timeFrame) {
        case 'Month':
            labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
            userData = [12000, 12500, 13000, 13500, 14000, 14500];
            FarmersData = [18000, 18500, 19000, 19500, 20000, 20500];
            ProductsData = [11000, 12000, 13000, 14000, 15000, 16000];
            TotalData = [17000, 17500, 18000, 18500, 19000, 19500];
            break;
        case 'Quarter':
            labels = ['Q1', 'Q2', 'Q3', 'Q4'];
            userData = [12500, 13500, 14200, 15048];
            FarmersData = [18500, 21000, 19500, 23400];
            ProductsData = [12000, 15000, 17000, 20000];
            TotalData = [18500, 21000, 19500, 23400];
            break;
        case 'Year':
            labels = ['2022', '2023', '2024', '2025'];
            userData = [10000, 12500, 14200, 15408];
            FarmersData = [15000, 18500, 21000, 23400];
            ProductsData = [9000, 11000, 15000, 20000];
            TotalData = [12000, 15000, 18000, 22000];
            break;
        default: // Week
            labels = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
            userData = [12000, 12500, 13000, 13500];
            FarmersData = [18000, 18500, 19000, 19500];
            ProductsData = [10000, 12000, 14000, 16000];
            TotalData = [16000, 17000, 18000, 19000];
    }
    
    // Update chart data
    chart.data.labels = labels;
    chart.data.datasets[0].data = userData;
    chart.data.datasets[1].data = FarmersData;
    chart.data.datasets[2].data = ProductsData;
    chart.data.datasets[3].data = TotalData;
    
    // Update chart
    chart.update();
  }

  const allTimeFilters4 = document.querySelectorAll('.time-filter');
  allTimeFilters4.forEach(filter => {
      filter.addEventListener('click', function() {
          const parent = this.closest('.time-filters');
          parent.querySelectorAll('.time-filter').forEach(f => f.classList.remove('active'));
          this.classList.add('active');
      });
  });
  
  // User Growth Chart
  const userGrowthCtx = document.getElementById('userGrowthChart').getContext('2d');
  new Chart(userGrowthCtx, {
      type: 'line',
      data: {
          labels: ['Q1', 'Q2', 'Q3', 'Q4'],
          datasets: [{
              label: 'New Users',
              data: [12500, 13500, 14020, 15048],
              borderColor: '#3498db',
              backgroundColor: 'rgba(52, 152, 219, 0.1)',
              borderWidth: 3,
              tension: 0.3,
              fill: true
          }]
      },
      options: {
          responsive: true,
          maintainAspectRatio: false, // Changed to false for better container fitting
          plugins: {
              legend: {
                  display: false
              }
          },
          scales: {
              y: {
                  beginAtZero: false,
                  grid: {
                      color: 'rgba(0, 0, 0, 0.05)'
                  }
              },
              x: {
                  grid: {
                      display: false
                  }
              }
          },
          layout: {
              padding: {
                  top: 10,
                  bottom: 10,
                  left: 10,
                  right: 10
              }
          }
      }
  });
  
  // Top Categories Chart
  const categoriesCtx = document.getElementById('categoriesChart').getContext('2d');
  new Chart(categoriesCtx, {
      type: 'doughnut',
      data: {
          labels: ['Fruits', 'Vegetables', 'Grains', 'Legumes', 'Mushrooms'],
          datasets: [{
              data: [35, 25, 20, 12, 8],
              backgroundColor: [
                  '#3498db',
                  '#2ecc71',
                  '#9b59b6',
                  '#e74c3c',
                  '#f39c12'
              ],
              borderWidth: 0
          }]
      },
      options: {
          responsive: true,
          maintainAspectRatio: false, // Changed to false for better container fitting
          plugins: {
              legend: {
                  position: 'right',
                  labels: {
                      boxWidth: 12,
                      font: {
                          size: 11
                      }
                  }
              }
          },
          layout: {
              padding: {
                  left: 10,
                  right: 10,
                  top: 10,
                  bottom: 10
              }
          }
      }
  });
  
  // Transaction Volume Chart
  const transactionCtx = document.getElementById('transactionChart').getContext('2d');
  new Chart(transactionCtx, {
      type: 'bar',
      data: {
          labels: ['Q1', 'Q2', 'Q3', 'Q4'],
          datasets: [{
              label: 'Transactions',
              data: [18500, 21000, 19500, 23400],
              backgroundColor: 'rgba(46, 204, 113, 0.7)',
              borderColor: 'rgba(46, 204, 113, 1)',
              borderWidth: 1,
              borderRadius: 6
          }]
      },
      options: {
          responsive: true,
          maintainAspectRatio: false, // Changed to false for better container fitting
          plugins: {
              legend: {
                  display: false
              }
          },
          scales: {
              y: {
                  beginAtZero: true,
                  grid: {
                      color: 'rgba(0, 0, 0, 0.05)'
                  }
              },
              x: {
                  grid: {
                      display: false
                  }
              }
          },
          layout: {
              padding: {
                  top: 10,
                  bottom: 10,
                  left: 10,
                  right: 10
              }
          }
      }
  });
  
  // Regional Distribution Chart
  const regionalCtx = document.getElementById('regionalChart').getContext('2d');
  new Chart(regionalCtx, {
      type: 'polarArea',
      data: {
          labels: ['North America', 'Europe', 'Asia', 'South America', 'Africa'],
          datasets: [{
              data: [35, 28, 22, 10, 15],
              backgroundColor: [
                  'rgba(52, 152, 219, 0.7)',
                  'rgba(46, 204, 113, 0.7)',
                  'rgba(155, 89, 182, 0.7)',
                  'rgba(231, 76, 60, 0.7)',
                  'rgba(243, 156, 18, 0.7)'
              ],
              borderWidth: 0
          }]
      },
      options: {
          responsive: true,
          maintainAspectRatio: false, // Changed to false for better container fitting
          plugins: {
              legend: {
                  position: 'right',
                  labels: {
                      boxWidth: 12,
                      font: {
                          size: 11
                      }
                  }
              }
          },
          layout: {
              padding: {
                  left: 10,
                  right: 10,
                  top: 10,
                  bottom: 10
              }
          }
      }
  });
});



