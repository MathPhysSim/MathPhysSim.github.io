(function () {
  "use strict";

  $(function () {
    $(".menu-container").load("menu.html");
  });

    /* Highlight the menu entry that matches the current page */
    $(function () {
      // current file name, defaults to 'index.html' when empty
      const current = location.pathname.split('/').pop() || 'index.html';
    
      $('.menu-items a').each(function () {
        const $link = $(this);
        if ($link.attr('href') === current) {
          $link.addClass('active');
          return false;              // stop once we found the match
        }
      });
    });
})();