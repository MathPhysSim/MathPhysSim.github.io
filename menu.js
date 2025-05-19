$(document).ready(function () {
  // Load the menu content
  $('.menu-container').load('menu.html', function() {
    // After menu is loaded, set up the mobile menu toggle
    const menuButton = document.querySelector('.menu-button');
    const menuItems = document.querySelector('.menu-items');

    if (menuButton && menuItems) {
      menuButton.addEventListener('click', function () {
        menuItems.classList.toggle('menu-items-visible');
      });
      
      // Close menu when an item is clicked
      const menuLinks = menuItems.querySelectorAll('a');
      menuLinks.forEach(link => {
        link.addEventListener('click', function() {
          menuItems.classList.remove('menu-items-visible');
        });
      });
      
      // Close menu when clicking outside
      document.addEventListener('click', function(event) {
        if (!menuButton.contains(event.target) && !menuItems.contains(event.target)) {
          menuItems.classList.remove('menu-items-visible');
        }
      });
    }
    
    // Ensure active menu item is highlighted based on current page
    highlightCurrentPage();
  });
});

// Function to highlight the current page in the menu
function highlightCurrentPage() {
  // Get the current page filename
  const path = window.location.pathname;
  const page = path.split("/").pop();
  
  // Default to index if no page is specified
  const currentPage = page || 'index.html';
  
  // Find the appropriate menu item and highlight it
  const menuItems = document.querySelectorAll('.menu-items a');
  
  menuItems.forEach(function(item) {
    const href = item.getAttribute('href');
    
    // Check if this menu item corresponds to the current page
    if (href === currentPage) {
      // Add appropriate class based on the page
      if (currentPage === 'index.html') {
        item.classList.add('menu-index');
      } else if (currentPage === 'publications.html') {
        item.classList.add('menu-publications');
      } else if (currentPage === 'phd.html') {
        item.classList.add('menu-phd');
      } else if (currentPage === 'rl.html') {
        item.classList.add('menu-rl');
      } else if (currentPage === 'embedding.html') {
        item.classList.add('menu-embedding');
      }
    }
  });
}
