// charts.js - Add this to your existing admin.js or create a new file

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all charts when DOM is loaded
    initDashboardCharts();
    initReportsCharts();
    setupChartFilters();
});

// ======================
// DASHBOARD CHARTS
// ======================

function initDashboardCharts() {
    // Platform Activity Chart (Line Chart)
    const platformActivityCtx = document.querySelector('.chart-placeholder').getContext('2d');
    const platformActivityChart = new Chart(platformActivityCtx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
            datasets: [
                {
                    label: 'New Users',
                    data: [320, 450, 280, 510, 410, 600, 750],
                    borderColor: '#2e7d32',
                    backgroundColor: 'rgba(46, 125, 50, 0.1)',
                    tension: 0.3,
                    fill: true
                },
                {
                    label: 'Transactions',
                    data: [1200, 1500, 1100, 1800, 2100, 1900, 2400],
                    borderColor: '#4caf50',
                    backgroundColor: 'rgba(76, 175, 80, 0.1)',
                    tension: 0.3,
                    fill: true
                }
            ]
        },
        options: getChartOptions('Platform Activity Over Time')
    });

    // Replace placeholder with actual chart
    replaceChartPlaceholder('#dashboard-content .chart-placeholder', platformActivityChart);
}

// ======================
// REPORTS CHARTS
// ======================

function initReportsCharts() {
    // User Growth Chart (Bar Chart)
    const userGrowthCtx = document.querySelector('#reports-content .chart-placeholder:nth-of-type(1)').getContext('2d');
    const userGrowthChart = new Chart(userGrowthCtx, {
        type: 'bar',
        data: {
            labels: ['Q1', 'Q2', 'Q3', 'Q4'],
            datasets: [
                {
                    label: 'Buyers',
                    data: [320, 450, 510, 600],
                    backgroundColor: 'rgba(33, 150, 243, 0.7)',
                    borderColor: 'rgba(33, 150, 243, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Farmers',
                    data: [180, 220, 280, 350],
                    backgroundColor: 'rgba(76, 175, 80, 0.7)',
                    borderColor: 'rgba(76, 175, 80, 1)',
                    borderWidth: 1
                }
            ]
        },
        options: getChartOptions('User Growth by Quarter', true)
    });

    // Transaction Volume Chart (Line Chart)
    const transactionVolumeCtx = document.querySelector('#reports-content .chart-placeholder:nth-of-type(2)').getContext('2d');
    const transactionVolumeChart = new Chart(transactionVolumeCtx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [
                {
                    label: 'Transaction Volume (R)',
                    data: [125000, 145000, 162000, 158000, 175000, 190000],
                    borderColor: '#ff9800',
                    backgroundColor: 'rgba(255, 152, 0, 0.1)',
                    tension: 0.3,
                    fill: true
                }
            ]
        },
        options: getChartOptions('Monthly Transaction Volume')
    });

    // Top Categories Chart (Doughnut Chart)
    const topCategoriesCtx = document.querySelector('#reports-content .chart-placeholder:nth-of-type(3)').getContext('2d');
    const topCategoriesChart = new Chart(topCategoriesCtx, {
        type: 'doughnut',
        data: {
            labels: ['Vegetables', 'Fruits', 'Dairy', 'Grains', 'Meat'],
            datasets: [{
            data: [120000, 95000, 80000, 60000, 40000],
                backgroundColor: [
                    '#2e7d32',
                    '#4caf50',
                    '#8bc34a',
                    '#cddc39',
                    '#ffc107'
                ],
                borderWidth: 1
            }]
        },
        options: getChartOptions('Product Category Distribution', false, true)
    });

    // Regional Distribution Chart (Bar Chart - Horizontal)
    const regionalDistributionCtx = document.querySelector('#reports-content .chart-placeholder:nth-of-type(4)').getContext('2d');
    const regionalDistributionChart = new Chart(regionalDistributionCtx, {
        type: 'bar',
        data: {
            labels: ['Gauteng', 'Western Cape', 'KwaZulu-Natal', 'Eastern Cape', 'Limpopo'],
            datasets: [{
                label: 'Transactions',
                data: [65000, 48000, 42000, 28000, 18000],
                backgroundColor: 'rgba(46, 125, 50, 0.7)',
                borderColor: 'rgba(46, 125, 50, 1)',
                borderWidth: 1
            }]
        },
        options: getChartOptions('Regional Transaction Distribution', false, false, true)
    });

    // Replace all placeholders with actual charts
    replaceChartPlaceholder('#reports-content .chart-placeholder:nth-of-type(1)', userGrowthChart);
    replaceChartPlaceholder('#reports-content .chart-placeholder:nth-of-type(2)', transactionVolumeChart);
    replaceChartPlaceholder('#reports-content .chart-placeholder:nth-of-type(3)', topCategoriesChart);
    replaceChartPlaceholder('#reports-content .chart-placeholder:nth-of-type(4)', regionalDistributionChart);
}

// ======================
// CHART UTILITY FUNCTIONS
// ======================

function getChartOptions(title, isBarChart = false, isDoughnut = false, isHorizontal = false) {
    const baseOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    padding: 20,
                    usePointStyle: true,
                    pointStyle: 'circle'
                }
            },
            title: {
                display: true,
                text: title,
                font: {
                    size: 16,
                    weight: '600'
                },
                padding: {
                    top: 10,
                    bottom: 20
                }
            },
            tooltip: {
                backgroundColor: 'rgba(0,0,0,0.8)',
                titleFont: {
                    size: 14,
                    weight: 'bold'
                },
                bodyFont: {
                    size: 12
                },
                padding: 12,
                usePointStyle: true,
                callbacks: {
                    label: function(context) {
                        let label = context.dataset.label || '';
                        if (label) {
                            label += ': ';
                        }
                        if (context.parsed.y !== undefined) {
                            label += isHorizontal ? context.parsed.x : context.parsed.y;
                        } else {
                            label += context.raw;
                        }
                        if (!isDoughnut) {
                            label += isHorizontal ? ' transactions' : ' R';
                        }
                        return label;
                    }
                }
            }
        },
        scales: isHorizontal ? {
            x: {
                beginAtZero: true,
                ticks: {
                    callback: function(value) {
                        return 'R ' + value.toLocaleString();
                    }
                },
                grid: {
                    display: false
                }
            },
            y: {
                grid: {
                    display: false
                }
            }
        } : {
            y: {
                beginAtZero: true,
                ticks: {
                    callback: function(value) {
                        return isBarChart ? value : 'R ' + value.toLocaleString();
                    }
                },
                grid: {
                    display: false
                }
            },
            x: {
                grid: {
                    display: false
                }
            }
        }
    };

    if (isDoughnut) {
        baseOptions.plugins.tooltip.callbacks.label = function(context) {
            const label = context.label || '';
            const value = context.raw;
            return `R${label}: ${value}`;
        };
    }

    return baseOptions;
}

function replaceChartPlaceholder(selector, chartInstance) {
    const placeholder = document.querySelector(selector);
    if (placeholder) {
        // Create a container for the chart
        const chartContainer = document.createElement('div');
        chartContainer.className = 'chart-container';
        chartContainer.style.position = 'relative';
        chartContainer.style.height = '300px'; // Fixed height for consistency
        
        // Replace the placeholder content
        placeholder.innerHTML = '';
        placeholder.appendChild(chartContainer);
        
        // Set the canvas to fill the container
        chartInstance.canvas.style.width = '100%';
        chartInstance.canvas.style.height = '100%';
    }
}

// ======================
// FILTER FUNCTIONALITY
// ======================

function setupChartFilters() {
    // Dashboard time filter
    const dashboardTimeFilter = document.querySelector('#dashboard-content .time-filter');
    if (dashboardTimeFilter) {
        dashboardTimeFilter.addEventListener('click', function(e) {
            if (e.target.tagName === 'BUTTON') {
                // Remove active class from all buttons
                this.querySelectorAll('button').forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                e.target.classList.add('active');
                
                // Here you would typically reload chart data based on the selected time period
                // For this example, we'll just log the selection
                console.log('Selected time period:', e.target.textContent);
            }
        });
    }

    // Reports time filter
    const reportsTimeFilters = document.querySelectorAll('#reports-content .time-filter');
    reportsTimeFilters.forEach(filter => {
        filter.addEventListener('click', function(e) {
            if (e.target.tagName === 'BUTTON') {
                // Remove active class from all buttons in this filter group
                this.querySelectorAll('button').forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                e.target.classList.add('active');
                
                // Here you would typically reload chart data based on the selected time period
                console.log('Selected time period:', e.target.textContent);
            }
        });
    });

    // Reports tabs
    const reportsTabs = document.querySelector('#reports-content .reports-tabs');
    if (reportsTabs) {
        reportsTabs.addEventListener('click', function(e) {
            if (e.target.tagName === 'BUTTON') {
                // Remove active class from all buttons
                this.querySelectorAll('button').forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                e.target.classList.add('active');
                
                // Here you would typically switch between different chart views
                console.log('Selected report tab:', e.target.textContent);
            }
        });
    }
}

// ======================
// HELPER FUNCTIONS
// ======================

// Function to generate random data for demo purposes
function generateRandomData(count, min, max) {
    return Array.from({ length: count }, () => Math.floor(Math.random() * (max - min + 1)) + min);
}