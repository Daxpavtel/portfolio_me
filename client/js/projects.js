(function () {
  let currentFilter = 'all';
  let allProjects = [];

  function initProjects() {
    loadProjects();

    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        filterBtns.forEach(function (b) { b.classList.remove('active'); });
        this.classList.add('active');
        currentFilter = this.getAttribute('data-filter') || 'all';
        renderProjects(allProjects);
      });
    });
  }

  async function loadProjects() {
    const grid = document.getElementById('projectsGrid');
    if (!grid) return;

    try {
      const res = await api.get('/projects');
      allProjects = res.data || [];
      renderProjects(allProjects);
    } catch (err) {
      grid.innerHTML = '<p style="text-align:center;color:var(--color-error)">Failed to load projects: ' + escapeHtml(err.message || 'Unknown error') + '</p>';
    }
  }

  function renderProjects(projects) {
    const grid = document.getElementById('projectsGrid');
    if (!grid) return;

    const filtered = currentFilter === 'all'
      ? projects
      : projects.filter(function (p) { return p.category === currentFilter; });

    if (!filtered.length) {
      grid.innerHTML = '<p style="text-align:center;color:var(--color-text-muted);padding:2rem">No projects found.</p>';
      return;
    }

    grid.innerHTML = filtered.map(function (p) {
      const tags = (p.techStack || []).map(function (t) {
        return '<span class="project-tag">' + escapeHtml(t) + '</span>';
      }).join('');

      const links = '';
      var githubLink = p.githubUrl ? '<a href="' + escapeHtml(p.githubUrl) + '" target="_blank" rel="noopener" class="btn btn-sm btn-secondary">GitHub</a>' : '';
      var liveLink = p.liveUrl ? '<a href="' + escapeHtml(p.liveUrl) + '" target="_blank" rel="noopener" class="btn btn-sm btn-primary">Live Demo</a>' : '';

      return '<article class="project-card' + (p.featured ? ' featured' : '') + '">' +
        '<img src="' + escapeHtml(p.imageUrl) + '" alt="' + escapeHtml(p.title) + '" class="project-card-image" loading="lazy">' +
        '<div class="project-card-body">' +
        '<h3>' + escapeHtml(p.title) + '</h3>' +
        '<p>' + escapeHtml(p.description) + '</p>' +
        '<div class="project-tags">' + tags + '</div>' +
        '<div class="project-links">' + githubLink + liveLink + '</div>' +
        '</div>' +
        '</article>';
    }).join('');
  }

  function escapeHtml(str) {
    if (!str) return '';
    var div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initProjects);
  } else {
    initProjects();
  }
})();
