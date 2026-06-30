(function () {
  window.AdminProjects = {
    init: function () {
      this.load();
      const addBtn = document.getElementById('addProjectBtn');
      if (addBtn) {
        addBtn.addEventListener('click', function () { AdminProjects.showForm(); });
      }
    },

    load: async function () {
      const container = document.getElementById('projectsList');
      if (!container) return;
      container.innerHTML = '<div class="admin-loading"><div class="spinner"></div></div>';

      try {
        const res = await api.get('/projects');
        this.render(res.data || []);
      } catch (err) {
        container.innerHTML = '<p style="color:var(--color-error)">Failed to load: ' + err.message + '</p>';
      }
    },

    render: function (projects) {
      const container = document.getElementById('projectsList');
      if (!container) return;

      if (!projects.length) {
        container.innerHTML = '<div class="empty-state">No projects yet. Add your first project!</div>';
        return;
      }

      var html = '<table class="admin-table"><thead><tr><th>Title</th><th>Category</th><th>Featured</th><th>Actions</th></tr></thead><tbody>';
      projects.forEach(function (p) {
        html += '<tr>' +
          '<td>' + this.esc(p.title) + '</td>' +
          '<td>' + this.esc(p.category) + '</td>' +
          '<td>' + (p.featured ? 'Yes' : 'No') + '</td>' +
          '<td class="actions">' +
          '<button class="btn-edit" data-id="' + p._id + '">Edit</button>' +
          '<button class="btn-delete" data-id="' + p._id + '">Delete</button>' +
          '</td>' +
          '</tr>';
      }, this);
      html += '</tbody></table>';
      container.innerHTML = html;

      container.querySelectorAll('.btn-edit').forEach(function (btn) {
        btn.addEventListener('click', function () {
          var id = this.getAttribute('data-id');
          var project = projects.find(function (p) { return p._id === id; });
          if (project) AdminProjects.showForm(project);
        });
      });

      container.querySelectorAll('.btn-delete').forEach(function (btn) {
        btn.addEventListener('click', async function () {
          if (confirm('Delete this project?')) {
            await AdminProjects.del(this.getAttribute('data-id'));
          }
        });
      });
    },

    showForm: function (project) {
      var isEdit = !!project;
      var title = isEdit ? 'Edit Project' : 'Add Project';
      var html = '<div class="admin-form" id="projectForm">';

      var fields = [
        { label: 'Title', name: 'title', type: 'text', required: true, max: 100 },
        { label: 'Description', name: 'description', type: 'textarea', required: true, max: 500 },
        { label: 'Long Description', name: 'longDescription', type: 'textarea', required: false, max: 2000 },
        { label: 'Tech Stack (comma-separated)', name: 'techStack', type: 'text', required: true },
        { label: 'Image URL', name: 'imageUrl', type: 'text', required: true },
        { label: 'GitHub URL', name: 'githubUrl', type: 'text', required: false },
        { label: 'Live URL', name: 'liveUrl', type: 'text', required: false },
      ];

      html += '<h3>' + title + '</h3>';

      fields.forEach(function (f) {
        var val = project ? (project[f.name] || '') : '';
        if (f.name === 'techStack' && Array.isArray(val)) val = val.join(', ');
        html += '<div class="form-group">' +
          '<label>' + f.label + '</label>';
        if (f.type === 'textarea') {
          html += '<textarea name="' + f.name + '"' + (f.max ? ' maxlength="' + f.max + '"' : '') + '>' + this.esc(String(val)) + '</textarea>';
        } else {
          html += '<input type="' + f.type + '" name="' + f.name + '" value="' + this.esc(String(val)) + '"' + (f.max ? ' maxlength="' + f.max + '"' : '') + '>';
        }
        html += '</div>';
      }, this);

      html += '<div class="form-group">' +
        '<label><input type="checkbox" name="featured" value="true"' + (project && project.featured ? ' checked' : '') + '> Featured</label>' +
        '</div>';

      html += '<div class="form-group">' +
        '<label>Category</label>' +
        '<select name="category">' +
        '<option value="web"' + (project && project.category === 'web' ? ' selected' : '') + '>Web</option>' +
        '<option value="mobile"' + (project && project.category === 'mobile' ? ' selected' : '') + '>Mobile</option>' +
        '<option value="backend"' + (project && project.category === 'backend' ? ' selected' : '') + '>Backend</option>' +
        '<option value="fullstack"' + (project && project.category === 'fullstack' ? ' selected' : '') + '>Full Stack</option>' +
        '<option value="other"' + (project && project.category === 'other' ? ' selected' : '') + '>Other</option>' +
        '</select>' +
        '</div>';

      html += '<div class="form-actions">' +
        '<button type="button" class="btn btn-primary btn-sm" id="formSaveBtn">Save</button>' +
        '<button type="button" class="btn btn-secondary btn-sm" id="formCancelBtn">Cancel</button>' +
        '</div>' +
        '</div>';

      var container = document.getElementById('projectsList');
      container.innerHTML = html;

      document.getElementById('formSaveBtn').addEventListener('click', async function () {
        await AdminProjects.save(project ? project._id : null);
      });
      document.getElementById('formCancelBtn').addEventListener('click', function () {
        AdminProjects.load();
      });
    },

    save: async function (id) {
      var form = document.getElementById('projectForm');
      if (!form) return;

      var getVal = function (name) {
        var el = form.querySelector('[name="' + name + '"]');
        return el ? el.value.trim() : '';
      };

      var data = {
        title: getVal('title'),
        description: getVal('description'),
        longDescription: getVal('longDescription'),
        techStack: getVal('techStack').split(',').map(function (s) { return s.trim(); }).filter(Boolean),
        imageUrl: getVal('imageUrl'),
        githubUrl: getVal('githubUrl'),
        liveUrl: getVal('liveUrl'),
        featured: form.querySelector('[name="featured"]').checked,
        category: getVal('category'),
      };

      if (!data.title || !data.description || !data.imageUrl || !data.techStack.length) {
        alert('Title, description, image URL, and tech stack are required.');
        return;
      }

      try {
        if (id) {
          await api.put('/projects/' + id, data);
        } else {
          await api.post('/projects', data);
        }
        this.load();
      } catch (err) {
        alert('Error saving: ' + err.message);
      }
    },

    del: async function (id) {
      try {
        await api.delete('/projects/' + id);
        this.load();
      } catch (err) {
        alert('Error deleting: ' + err.message);
      }
    },

    esc: function (str) {
      if (!str) return '';
      var d = document.createElement('div');
      d.textContent = str;
      return d.innerHTML;
    },
  };
})();
