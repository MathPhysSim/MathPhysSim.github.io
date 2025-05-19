(function () {
  "use strict";

  $(function () {
    // Load the menu content
    $(".menu-container").load("menu.html", function() {
      // After menu is loaded, set up the mobile menu toggle
      const menuButton = document.getElementById('mobile-menu-toggle');
      const menuItems = document.getElementById('menu-items');

      if (menuButton && menuItems) {
        // Function to check if we're on a mobile screen size
        function isMobileSize() {
          return window.innerWidth <= 768;
        }

        // Initially hide menu on mobile
        if (isMobileSize()) {
          menuItems.style.display = 'none';
        }

        // Toggle menu visibility when button is clicked
        menuButton.addEventListener('click', function(e) {
          e.stopPropagation();
          if (menuItems.style.display === 'none' || menuItems.style.display === '') {
            menuItems.style.display = 'flex';
            menuItems.classList.add('menu-items-visible');
          } else {
            menuItems.style.display = 'none';
            menuItems.classList.remove('menu-items-visible');
          }
        });

        // Close menu when clicking elsewhere
        document.addEventListener('click', function(e) {
          if (isMobileSize() && 
              menuItems.style.display !== 'none' &&
              !menuButton.contains(e.target) &&
              !menuItems.contains(e.target)) {
            menuItems.style.display = 'none';
            menuItems.classList.remove('menu-items-visible');
          }
        });

        // Close menu when a menu item is clicked
        const menuLinks = menuItems.querySelectorAll('a');
        menuLinks.forEach(link => {
          link.addEventListener('click', function() {
            if (isMobileSize()) {
              menuItems.style.display = 'none';
              menuItems.classList.remove('menu-items-visible');
            }
          });
        });

        // Handle window resize
        window.addEventListener('resize', function() {
          if (isMobileSize()) {
            if (!menuItems.classList.contains('menu-items-visible')) {
              menuItems.style.display = 'none';
            }
          } else {
            menuItems.style.display = 'flex';
            menuItems.classList.remove('menu-items-visible');
          }
        });
      }

      // Highlight current page in menu
      const current = location.pathname.split('/').pop() || 'index.html';
      
      $('.menu-items a').each(function () {
        const $link = $(this);
        if ($link.attr('href') === current) {
          // Add the appropriate menu-[pagename] class
          const pageName = current.split('.')[0];
          if (pageName) {
            $link.addClass('menu-' + pageName);
          }
          return false;
        }
      });
      
      // Handle window resize events
      $(window).resize(function() {
        // Close mobile menu if open during resize to desktop
        if ($(window).width() > 768 && $('.menu-items').hasClass('menu-items-visible')) {
          $('.menu-items').removeClass('menu-items-visible');
        }
        
        // Add any other resize-specific functionality here
      });
    });
  });
})();