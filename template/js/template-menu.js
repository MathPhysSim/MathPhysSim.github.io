(function () {
  "use strict";

  // Check if device is iOS to apply special handling
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  
  $(function () {
    // Load the menu content from template directory
    $(".menu-container").load("menu.html", function() {
      // After menu is loaded, set up the mobile menu toggle
      const menuButton = document.getElementById('mobile-menu-toggle');
      const menuItems = document.getElementById('menu-items');

      if (menuButton && menuItems) {
        // Function to check if we're on a mobile screen size
        function isMobileSize() {
          return window.innerWidth <= 768;
        }

        // Set initial display state for mobile
        function setInitialMenuState() {
          if (isMobileSize()) {
            menuItems.style.display = 'none';
            menuItems.classList.remove('menu-items-visible');
          } else {
            menuItems.style.display = 'flex';
            menuItems.classList.remove('menu-items-visible');
          }
        }

        // Set initial state
        setInitialMenuState();

        // iOS-specific fix to ensure the menu button is tappable
        if (isIOS) {
          menuButton.style.cursor = 'pointer';
          menuButton.style.touchAction = 'manipulation';
          menuButton.addEventListener('touchstart', function(e) {
            e.preventDefault(); // Prevent double-tap zoom on iOS
          });
        }

        // Toggle menu visibility with improved iOS handling
        menuButton.addEventListener('click', function(e) {
          e.stopPropagation();
          e.preventDefault();
          
          if (menuItems.classList.contains('menu-items-visible')) {
            menuItems.classList.remove('menu-items-visible');
            menuItems.style.display = 'none';
          } else {
            menuItems.classList.add('menu-items-visible');
            menuItems.style.display = 'flex';
          }
        });

        // For iOS specifically, add touchend event
        if (isIOS) {
          menuButton.addEventListener('touchend', function(e) {
            e.stopPropagation();
            e.preventDefault();
            
            if (menuItems.classList.contains('menu-items-visible')) {
              menuItems.classList.remove('menu-items-visible');
              menuItems.style.display = 'none';
            } else {
              menuItems.classList.add('menu-items-visible');
              menuItems.style.display = 'flex';
            }
          });
        }

        // Close menu when clicking elsewhere
        document.addEventListener('click', function(e) {
          if (isMobileSize() && 
              menuItems.classList.contains('menu-items-visible') &&
              !menuButton.contains(e.target) &&
              !menuItems.contains(e.target)) {
            menuItems.classList.remove('menu-items-visible');
            menuItems.style.display = 'none';
          }
        });

        // Close menu when a menu item is clicked
        const menuLinks = menuItems.querySelectorAll('a');
        menuLinks.forEach(link => {
          link.addEventListener('click', function() {
            if (isMobileSize()) {
              menuItems.classList.remove('menu-items-visible');
              menuItems.style.display = 'none';
            }
          });
        });

        // Handle window resize
        window.addEventListener('resize', function() {
          setInitialMenuState();
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
    });
  });
})();
