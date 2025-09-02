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
const userGrowthData = [1250, 1350, 1420, 1548];
const VerifiedFarmersData = [18500, 21000, 19500, 23400];
const ActiveProductsData = [35, 25, 20, 12]; // Using % values
const TotalTransactionsData = [35, 28, 22, 10]; // Using % values

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
                            if (['User Growth', 'Verified Farmers'].includes(context.dataset.label)) {
                                label += new Intl.NumberFormat().format(context.parsed.y);
                            } else {
                                label += context.parsed.y + '%';
                            }
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
            userData = [1200, 1250, 1300, 1350, 1400, 1450];
            FarmersData = [18000, 18500, 19000, 19500, 20000, 20500];
            ProductsData = [30, 28, 32, 35, 33, 34];
            TotalData = [30, 32, 31, 35, 34, 33];
            break;
        case 'Quarter':
            labels = ['Q1', 'Q2', 'Q3', 'Q4'];
            userData = [1250, 1350, 1420, 1548];
            FarmersData = [18500, 21000, 19500, 23400];
            ProductsData = [35, 25, 20, 12];
            TotalData = [35, 28, 22, 10];
            break;
        case 'Year':
            labels = ['2020', '2021', '2022', '2023'];
            userData = [1000, 1250, 1420, 1548];
            FarmersData = [15000, 18500, 21000, 23400];
            ProductsData = [25, 30, 32, 35];
            TotalData = [25, 30, 32, 35];
            break;
        default: // Week
            labels = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
            userData = [1200, 1250, 1300, 1350];
            FarmersData = [18000, 18500, 19000, 19500];
            ProductsData = [30, 32, 34, 35];
            TotalData = [30, 32, 33, 35];
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
});



