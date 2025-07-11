document.addEventListener('DOMContentLoaded', function() {

    const farmersNearMeLinks = document.querySelectorAll('.farmers-near');
    const mainContent = document.querySelector('.buyer-products');
    const farmersContent = document.querySelector('.farmers-near-container');
    const homeLinks = document.querySelectorAll('.main-links li:first-child a');
    const products_sidebar = document.querySelector('.buyer-sidebar');
    
    // Initially hide the farmers content
    if (farmersContent) {
        farmersContent.style.display = 'none';
    }
    
    // Function to show farmers content
    function showFarmersContent() {
        if (mainContent) {
            mainContent.style.display = 'none';
            products_sidebar.style.display = 'none';
        }
        
        if (farmersContent) {
            farmersContent.style.display = 'block';
        }
        
        // Update active state in navigation
        const navLinks = document.querySelectorAll('.main-links a');
        navLinks.forEach(navLink => {
            navLink.classList.remove('active');
        });
        
        // Activate the Farmers nav link (3rd item)
        const farmersNavLink = document.querySelector('.main-links li:nth-child(3) a');
        if (farmersNavLink) {
            farmersNavLink.classList.add('active');
        }
        
        // Scroll to top
        window.scrollTo(0, 0);
    }
    
    // Function to show main content
    function showMainContent() {
        if (mainContent) {
            mainContent.style.display = 'block';
            products_sidebar.style.display = 'block';
        }
        
        if (farmersContent) {
            farmersContent.style.display = 'none';
        }
        
        // Update active state in navigation
        const navLinks = document.querySelectorAll('.main-links a');
        navLinks.forEach(navLink => {
            navLink.classList.remove('active');
        });
        
        // Activate the Home nav link (1st item)
        const homeNavLink = document.querySelector('.main-links li:first-child a');
        if (homeNavLink) {
            homeNavLink.classList.add('active');
        }
        
        // Scroll to top
        window.scrollTo(0, 0);
    }
    
    farmersNearMeLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            showFarmersContent();
        });
    });
    
    homeLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            showMainContent();
        });
    });
    
    // Simulate sorting functionality
    const sortOptions = document.querySelector('.farmers-sort select');
    if (sortOptions) {
        sortOptions.addEventListener('change', function() {
           
            console.log('Sorting by:', this.value);
        });
    }
    
    // Simulate search functionality
    const searchFarmers = document.querySelector('.farmers-search input');
    const searchButton = document.querySelector('.farmers-search button');
    if (searchFarmers && searchButton) {
        searchButton.addEventListener('click', function() {
            console.log('Searching for:', searchFarmers.value);
        });
        
        searchFarmers.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                console.log('Searching for:', searchFarmers.value);
            }
        });
    }
});