(function () {
  function initExperience() {
    loadExperience();
  }

  async function loadExperience() {
    const container = document.getElementById('timeline');
    if (!container) return;

    try {
      const res = await api.get('/experience');
      const experiences = res.data || [];
      renderExperience(experiences);
    } catch (err) {
      container.innerHTML = '<p style="text-align:center;color:var(--color-error)">Failed to load experience: ' + escapeHtml(err.message || 'Unknown error') + '</p>';
    }
  }

  function formatDate(dateStr) {
    if (!dateStr) return 'Present';
    var d = new Date(dateStr);
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months[d.getMonth()] + ' ' + d.getFullYear();
  }

  function renderExperience(experiences) {
    const container = document.getElementById('timeline');
    if (!container) return;

    if (!experiences.length) {
      container.innerHTML = '<p style="text-align:center;color:var(--color-text-muted)">No experience listed yet.</p>';
      return;
    }

    var html = '';
    experiences.forEach(function (e) {
      var start = formatDate(e.startDate);
      var end = formatDate(e.endDate);
      var respList = (e.responsibilities || []).map(function (r) {
        return '<li>' + escapeHtml(r) + '</li>';
      }).join('');

      html += '<div class="timeline-item ' + escapeHtml(e.type || 'work') + '">' +
        '<div class="timeline-dot"></div>' +
        '<div class="timeline-header">' +
        '<h3>' + escapeHtml(e.role) + '</h3>' +
        '<div class="company">' + escapeHtml(e.company) + (e.location ? ', ' + escapeHtml(e.location) : '') + '</div>' +
        '<div class="timeline-date">' + start + ' &mdash; ' + end + '</div>' +
        '</div>' +
        '<div class="timeline-body">' +
        '<p>' + escapeHtml(e.description) + '</p>' +
        (respList ? '<ul>' + respList + '</ul>' : '') +
        '</div>' +
        '</div>';
    });

    container.innerHTML = html;
  }

  function escapeHtml(str) {
    if (!str) return '';
    var div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initExperience);
  } else {
    initExperience();
  }
})();
