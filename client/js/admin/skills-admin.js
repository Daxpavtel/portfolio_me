(function () {
  window.AdminSkills = {
    init: function () {
      this.load();
      const addBtn = document.getElementById('addSkillBtn');
      if (addBtn) {
        addBtn.addEventListener('click', function () { AdminSkills.showForm(); });
      }
    },

    load: async function () {
      const container = document.getElementById('skillsList');
      if (!container) return;
      container.innerHTML = '<div class="admin-loading"><div class="spinner"></div></div>';

      try {
        const res = await api.get('/skills');
        this.render(res.data || []);
      } catch (err) {
        container.innerHTML = '<p style="color:var(--color-error)">Failed to load: ' + err.message + '</p>';
      }
    },

    render: function (skills) {
      const container = document.getElementById('skillsList');
      if (!container) return;

      if (!skills.length) {
        container.innerHTML = '<div class="empty-state">No skills yet.</div>';
        return;
      }

      var html = '<table class="admin-table"><thead><tr><th>Name</th><th>Category</th><th>Proficiency</th><th>Actions</th></tr></thead><tbody>';
      skills.forEach(function (s) {
        html += '<tr>' +
          '<td>' + this.esc(s.name) + '</td>' +
          '<td>' + this.esc(s.category) + '</td>' +
          '<td>' + s.proficiency + '%</td>' +
          '<td class="actions">' +
          '<button class="btn-edit" data-id="' + s._id + '">Edit</button>' +
          '<button class="btn-delete" data-id="' + s._id + '">Delete</button>' +
          '</td>' +
          '</tr>';
      }, this);
      html += '</tbody></table>';
      container.innerHTML = html;

      container.querySelectorAll('.btn-edit').forEach(function (btn) {
        btn.addEventListener('click', function () {
          var id = this.getAttribute('data-id');
          var skill = skills.find(function (s) { return s._id === id; });
          if (skill) AdminSkills.showForm(skill);
        });
      });

      container.querySelectorAll('.btn-delete').forEach(function (btn) {
        btn.addEventListener('click', async function () {
          if (confirm('Delete this skill?')) {
            await AdminSkills.del(this.getAttribute('data-id'));
          }
        });
      });
    },

    showForm: function (skill) {
      var isEdit = !!skill;
      var catOptions = ['frontend', 'backend', 'database', 'devops', 'tools', 'soft-skills'];

      var html = '<div class="admin-form" id="skillForm">';
      html += '<h3>' + (isEdit ? 'Edit Skill' : 'Add Skill') + '</h3>';

      html += '<div class="form-group"><label>Name</label><input type="text" name="name" value="' + (skill ? this.esc(skill.name) : '') + '" maxlength="50"></div>';

      html += '<div class="form-group"><label>Category</label><select name="category">';
      catOptions.forEach(function (c) {
        html += '<option value="' + c + '"' + (skill && skill.category === c ? ' selected' : '') + '>' + c.replace('-', ' ') + '</option>';
      });
      html += '</select></div>';

      html += '<div class="form-group"><label>Proficiency (1-100)</label><input type="number" name="proficiency" value="' + (skill ? skill.proficiency : '50') + '" min="1" max="100"></div>';

      html += '<div class="form-actions">' +
        '<button type="button" class="btn btn-primary btn-sm" id="skillFormSaveBtn">Save</button>' +
        '<button type="button" class="btn btn-secondary btn-sm" id="skillFormCancelBtn">Cancel</button>' +
        '</div></div>';

      var container = document.getElementById('skillsList');
      container.innerHTML = html;

      document.getElementById('skillFormSaveBtn').addEventListener('click', async function () {
        await AdminSkills.save(skill ? skill._id : null);
      });
      document.getElementById('skillFormCancelBtn').addEventListener('click', function () {
        AdminSkills.load();
      });
    },

    save: async function (id) {
      var form = document.getElementById('skillForm');
      if (!form) return;

      var data = {
        name: form.querySelector('[name="name"]').value.trim(),
        category: form.querySelector('[name="category"]').value,
        proficiency: parseInt(form.querySelector('[name="proficiency"]').value, 10),
      };

      if (!data.name) { alert('Name is required.'); return; }

      try {
        if (id) {
          await api.put('/skills/' + id, data);
        } else {
          await api.post('/skills', data);
        }
        this.load();
      } catch (err) {
        alert('Error saving: ' + err.message);
      }
    },

    del: async function (id) {
      try {
        await api.delete('/skills/' + id);
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
