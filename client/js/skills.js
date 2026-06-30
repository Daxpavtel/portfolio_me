(function () {
  function initSkills() {
    loadSkills();
  }

  async function loadSkills() {
    var grid = document.getElementById('skillsGrid');
    if (!grid) return;

    try {
      var res = await api.get('/skills');
      var skills = res.data || [];
      if (!skills.length) {
        grid.innerHTML = '<p style="text-align:center;color:var(--color-text-muted);padding:2rem">No skills added yet.</p>';
        return;
      }
      renderSkills(skills);
    } catch (err) {
      grid.innerHTML = '<p style="text-align:center;color:var(--color-error)">Failed to load skills: ' + err.message + '</p>';
    }
  }

  function renderSkills(skills) {
    var grid = document.getElementById('skillsGrid');
    if (!grid) return;

    var categories = {};
    skills.forEach(function (s) {
      if (!categories[s.category]) categories[s.category] = [];
      categories[s.category].push(s);
    });

    var order = ['frontend', 'backend', 'database', 'devops', 'tools', 'soft-skills'];
    var html = '';

    order.forEach(function (cat) {
      if (!categories[cat] || !categories[cat].length) return;

      var label = cat.replace('-', ' ');
      html += '<div class="skill-category reveal">';
      html += '<div class="skill-category-header">';
      html += '<h3>' + label + '</h3></div>';

      categories[cat].forEach(function (s) {
        html += '<div class="skill-item">' +
          '<div class="skill-item-header">' +
          '<span class="skill-name">' + s.name + '</span>' +
          '<span class="skill-pct">' + s.proficiency + '%</span>' +
          '</div>' +
          '<div class="skill-bar">' +
          '<div class="skill-bar-fill" style="width:0%;--skill-progress:' + s.proficiency + '%"></div>' +
          '</div>' +
          '</div>';
      });

      html += '</div>';
    });

    grid.innerHTML = html;

    document.querySelectorAll('.skill-category').forEach(function (el) {
      el.classList.add('visible');
    });

    var barObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('animated');
            barObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    document.querySelectorAll('.skill-bar-fill').forEach(function (el) {
      barObserver.observe(el);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSkills);
  } else {
    initSkills();
  }
})();
