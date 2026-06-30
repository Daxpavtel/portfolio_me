(function () {
  function initAnimations() {
    const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    revealEls.forEach(function (el) {
      observer.observe(el);
    });

    const statNumbers = document.querySelectorAll('.stat-number[data-count]');
    const statObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            statObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    statNumbers.forEach(function (el) {
      statObserver.observe(el);
    });

    const skillBars = document.querySelectorAll('.skill-bar-fill');
    const barObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('animated');
            barObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    skillBars.forEach(function (el) {
      barObserver.observe(el);
    });
  }

  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-count'), 10);
    if (isNaN(target)) return;

    let current = 0;
    const increment = Math.max(1, Math.floor(target / 40));
    const duration = 1500;
    const step = Math.max(16, Math.floor(duration / target));

    const timer = setInterval(function () {
      current += increment;
      if (current >= target) {
        el.textContent = target + '+';
        clearInterval(timer);
      } else {
        el.textContent = current;
      }
    }, step);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAnimations);
  } else {
    initAnimations();
  }

  window.DevPortfolioAnimations = { animateCounter, initAnimations };
})();
