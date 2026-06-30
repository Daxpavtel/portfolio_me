(function () {
  function initMain() {
    var yearEl = document.getElementById('currentYear');
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }

    var footer = document.querySelector('.footer p');
    if (footer) {
      var name = document.querySelector('h1');
      var userName = name ? name.textContent.trim() : 'Daksh Patel';
      footer.innerHTML = '&copy; <span id="currentYear">' + new Date().getFullYear() + '</span> ' + userName + '.';
    }

    initTyping();
    initModal();
  }

  function initTyping() {
    var el = document.getElementById('typingSpan');
    if (!el) return;

    var roles = [
      'Full Stack Developer',
      'Mobile App Developer',
      'AI & Cloud Enthusiast',
    ];

    var roleIndex = 0;
    var charIndex = 0;
    var isDeleting = false;

    function type() {
      var current = roles[roleIndex];

      if (!isDeleting) {
        el.textContent = current.substring(0, charIndex + 1);
        charIndex++;
        if (charIndex === current.length) {
          setTimeout(function () { isDeleting = true; type(); }, 2000);
          return;
        }
        setTimeout(type, 80);
      } else {
        el.textContent = current.substring(0, charIndex - 1);
        charIndex--;
        if (charIndex === 0) {
          isDeleting = false;
          roleIndex = (roleIndex + 1) % roles.length;
          setTimeout(type, 400);
          return;
        }
        setTimeout(type, 40);
      }
    }

    setTimeout(type, 500);
  }

  function initModal() {
    var modalOverlay = document.getElementById('projectModal');
    var modalClose = document.getElementById('modalClose');

    if (modalClose && modalOverlay) {
      modalClose.addEventListener('click', function () {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
      });

      modalOverlay.addEventListener('click', function (e) {
        if (e.target === modalOverlay) {
          modalOverlay.classList.remove('active');
          document.body.style.overflow = '';
        }
      });
    }

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('active')) {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  document.addEventListener('click', function (e) {
    var card = e.target.closest('.project-card');
    if (card && !e.target.closest('a')) {
      var title = card.querySelector('h3');
      var desc = card.querySelector('p');
      var tags = card.querySelector('.project-tags');
      var modalOverlay = document.getElementById('projectModal');
      var modalTitle = document.getElementById('modalTitle');
      var modalBody = document.getElementById('modalBody');

      if (modalOverlay && modalTitle && modalBody) {
        modalTitle.textContent = title ? title.textContent : '';
        var bodyHtml = '<p>' + (desc ? desc.textContent : '') + '</p>';
        if (tags) {
          bodyHtml += '<div style="margin-top:var(--spacing-md)"><strong>Tech Stack:</strong><div style="display:flex;flex-wrap:wrap;gap:8px;margin-top:8px">' + tags.innerHTML + '</div></div>';
        }
        modalBody.innerHTML = bodyHtml;
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    }
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMain);
  } else {
    initMain();
  }
})();
