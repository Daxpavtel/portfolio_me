(function () {
  window.AdminExperience = {
    init: function () {
      this.load();
      const addBtn = document.getElementById('addExperienceBtn');
      if (addBtn) {
        addBtn.addEventListener('click', function () { AdminExperience.showForm(); });
      }
    },

    load: async function () {
      const container = document.getElementById('experienceList');
      if (!container) return;
      container.innerHTML = '<div class="admin-loading"><div class="spinner"></div></div>';

      try {
        const res = await api.get('/experience');
        this.render(res.data || []);
      } catch (err) {
        container.innerHTML = '<p style="color:var(--color-error)">Failed to load: ' + err.message + '</p>';
      }
    },

    render: function (experiences) {
      const container = document.getElementById('experienceList');
      if (!container) return;

      if (!experiences.length) {
        container.innerHTML = '<div class="empty-state">No experience entries yet.</div>';
        return;
      }

      var html = '<table class="admin-table"><thead><tr><th>Role</th><th>Company</th><th>Type</th><th>Actions</th></tr></thead><tbody>';
      experiences.forEach(function (e) {
        html += '<tr>' +
          '<td>' + this.esc(e.role) + '</td>' +
          '<td>' + this.esc(e.company) + '</td>' +
          '<td>' + this.esc(e.type) + '</td>' +
          '<td class="actions">' +
          '<button class="btn-edit" data-id="' + e._id + '">Edit</button>' +
          '<button class="btn-delete" data-id="' + e._id + '">Delete</button>' +
          '</td>' +
          '</tr>';
      }, this);
      html += '</tbody></table>';
      container.innerHTML = html;

      container.querySelectorAll('.btn-edit').forEach(function (btn) {
        btn.addEventListener('click', function () {
          var id = this.getAttribute('data-id');
          var exp = experiences.find(function (e) { return e._id === id; });
          if (exp) AdminExperience.showForm(exp);
        });
      });

      container.querySelectorAll('.btn-delete').forEach(function (btn) {
        btn.addEventListener('click', async function () {
          if (confirm('Delete this experience entry?')) {
            await AdminExperience.del(this.getAttribute('data-id'));
          }
        });
      });
    },

    showForm: function (exp) {
      var isEdit = !!exp;
      var fmtDate = function (d) {
        if (!d) return '';
        return new Date(d).toISOString().split('T')[0];
      };

      var html = '<div class="admin-form" id="experienceForm">';
      html += '<h3>' + (isEdit ? 'Edit Experience' : 'Add Experience') + '</h3>';

      var fields = [
        { label: 'Role', name: 'role', type: 'text', max: 100 },
        { label: 'Company', name: 'company', type: 'text', max: 100 },
        { label: 'Location', name: 'location', type: 'text', required: false },
        { label: 'Description', name: 'description', type: 'textarea', max: 1000 },
        { label: 'Start Date', name: 'startDate', type: 'date' },
        { label: 'End Date (leave blank for Present)', name: 'endDate', type: 'date', required: false },
      ];

      fields.forEach(function (f) {
        var val = exp ? (exp[f.name] || '') : '';
        if (f.type === 'date' && val) val = fmtDate(val);
        html += '<div class="form-group"><label>' + f.label + '</label>';
        if (f.type === 'textarea') {
          html += '<textarea name="' + f.name + '"' + (f.max ? ' maxlength="' + f.max + '"' : '') + '>' + this.esc(String(val)) + '</textarea>';
        } else {
          html += '<input type="' + f.type + '" name="' + f.name + '" value="' + this.esc(String(val)) + '"' + (f.max ? ' maxlength="' + f.max + '"' : '') + '>';
        }
        html += '</div>';
      }, this);

      html += '<div class="form-group"><label>Type</label><select name="type">' +
        '<option value="work"' + (exp && exp.type === 'work' ? ' selected' : '') + '>Work</option>' +
        '<option value="education"' + (exp && exp.type === 'education' ? ' selected' : '') + '>Education</option>' +
        '<option value="internship"' + (exp && exp.type === 'internship' ? ' selected' : '') + '>Internship</option>' +
        '</select></div>';

      html += '<div class="form-actions">' +
        '<button type="button" class="btn btn-primary btn-sm" id="expFormSaveBtn">Save</button>' +
        '<button type="button" class="btn btn-secondary btn-sm" id="expFormCancelBtn">Cancel</button>' +
        '</div></div>';

      var container = document.getElementById('experienceList');
      container.innerHTML = html;

      document.getElementById('expFormSaveBtn').addEventListener('click', async function () {
        await AdminExperience.save(exp ? exp._id : null);
      });
      document.getElementById('expFormCancelBtn').addEventListener('click', function () {
        AdminExperience.load();
      });
    },

    save: async function (id) {
      var form = document.getElementById('experienceForm');
      if (!form) return;

      var getVal = function (name) {
        var el = form.querySelector('[name="' + name + '"]');
        return el ? el.value.trim() : '';
      };

      var data = {
        role: getVal('role'),
        company: getVal('company'),
        location: getVal('location'),
        description: getVal('description'),
        startDate: getVal('startDate'),
        endDate: getVal('endDate') || null,
        type: getVal('type'),
      };

      if (!data.role || !data.company || !data.description || !data.startDate) {
        alert('Role, company, description, and start date are required.');
        return;
      }

      try {
        if (id) {
          await api.put('/experience/' + id, data);
        } else {
          await api.post('/experience', data);
        }
        this.load();
      } catch (err) {
        alert('Error saving: ' + err.message);
      }
    },

    del: async function (id) {
      try {
        await api.delete('/experience/' + id);
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
