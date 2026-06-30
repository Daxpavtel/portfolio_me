(function () {
  function initDashboard() {
    const navBtns = document.querySelectorAll('.admin-nav button[data-panel]');
    navBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        navBtns.forEach(function (b) { b.classList.remove('active'); });
        this.classList.add('active');

        document.querySelectorAll('.admin-panel').forEach(function (p) {
          p.classList.remove('active');
        });

        var panelId = 'panel-' + this.getAttribute('data-panel');
        var panel = document.getElementById(panelId);
        if (panel) {
          panel.classList.add('active');
        }
      });
    });

    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', function () {
        window.AdminAuth.logout();
      });
    }

    window.AdminDashboard = window.AdminDashboard || {};

    if (typeof AdminProjects !== 'undefined') AdminProjects.init();
    if (typeof AdminSkills !== 'undefined') AdminSkills.init();
    if (typeof AdminExperience !== 'undefined') AdminExperience.init();
    if (typeof AdminMessages !== 'undefined') AdminMessages.init();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDashboard);
  } else {
    initDashboard();
  }
})();
