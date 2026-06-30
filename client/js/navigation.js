(function () {
  function initNavigation() {
    var hamburger = document.getElementById('hamburger');
    var navLinks = document.getElementById('navLinks');
    var links = navLinks ? navLinks.querySelectorAll('a[href^="#"]') : [];

    var overlay = document.createElement('div');
    overlay.className = 'nav-overlay';
    overlay.id = 'navOverlay';
    document.body.appendChild(overlay);

    function closeNav() {
      navLinks.classList.remove('open');
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    }

    function openNav() {
      navLinks.classList.add('open');
      overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    if (hamburger && navLinks) {
      hamburger.addEventListener('click', function () {
        if (navLinks.classList.contains('open')) {
          closeNav();
        } else {
          openNav();
        }
      });

      links.forEach(function (a) {
        a.addEventListener('click', function () {
          closeNav();
        });
      });

      overlay.addEventListener('click', function () {
        closeNav();
      });
    }

    window.addEventListener('resize', function () {
      if (window.innerWidth > 768 && navLinks.classList.contains('open')) {
        closeNav();
      }
    });

    function updateActiveLink() {
      var scrollPos = window.scrollY + 150;
      var current = '';

      document.querySelectorAll('section[id]').forEach(function (section) {
        var top = section.offsetTop - 100;
        var bottom = top + section.offsetHeight;
        if (scrollPos >= top && scrollPos < bottom) {
          current = section.getAttribute('id');
        }
      });

      links.forEach(function (link) {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
          link.classList.add('active');
        }
      });
    }

    window.addEventListener('scroll', updateActiveLink, { passive: true });
    updateActiveLink();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNavigation);
  } else {
    initNavigation();
  }
})();
