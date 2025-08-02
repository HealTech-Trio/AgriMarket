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
});


