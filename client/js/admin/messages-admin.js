(function () {
  window.AdminMessages = {
    init: function () {
      this.load();
    },

    load: async function (page) {
      page = page || 1;
      const container = document.getElementById('messagesList');
      if (!container) return;
      container.innerHTML = '<div class="admin-loading"><div class="spinner"></div></div>';

      try {
        const res = await api.get('/contact?page=' + page + '&limit=20');
        this.render(res.data || { messages: [], pagination: {} });
      } catch (err) {
        container.innerHTML = '<p style="color:var(--color-error)">Failed to load: ' + err.message + '</p>';
      }
    },

    render: function (data) {
      const container = document.getElementById('messagesList');
      if (!container) return;

      var messages = data.messages || [];
      var pagination = data.pagination || {};

      if (!messages.length) {
        container.innerHTML = '<div class="empty-state">No messages yet.</div>';
        return;
      }

      var html = '';
      messages.forEach(function (m) {
        var date = new Date(m.createdAt).toLocaleString();
        html += '<div class="message-item' + (m.read ? '' : ' unread') + '">' +
          '<div class="message-header">' +
          '<h3>' + this.esc(m.subject) + '</h3>' +
          '<div class="message-meta">' + date + '</div>' +
          '</div>' +
          '<div><strong>' + this.esc(m.name) + '</strong> &lt;' + this.esc(m.email) + '&gt;</div>' +
          '<div class="message-body"><p>' + this.esc(m.message) + '</p></div>' +
          '<div class="message-actions">' +
          (m.read ? '' : '<button class="btn btn-sm btn-secondary mark-read-btn" data-id="' + m._id + '">Mark Read</button>') +
          '<button class="btn btn-sm btn-delete delete-msg-btn" data-id="' + m._id + '">Delete</button>' +
          '</div>' +
          '</div>';
      }, this);

      if (pagination.pages && pagination.pages > 1) {
        html += '<div style="text-align:center;margin-top:var(--spacing-lg)">';
        for (var i = 1; i <= pagination.pages; i++) {
          html += '<button class="btn btn-sm btn-secondary page-btn" data-page="' + i + '" style="margin:2px">' + i + '</button>';
        }
        html += '</div>';
      }

      container.innerHTML = html;

      container.querySelectorAll('.mark-read-btn').forEach(function (btn) {
        btn.addEventListener('click', async function () {
          await AdminMessages.markRead(this.getAttribute('data-id'));
        });
      });

      container.querySelectorAll('.delete-msg-btn').forEach(function (btn) {
        btn.addEventListener('click', async function () {
          if (confirm('Delete this message?')) {
            await AdminMessages.del(this.getAttribute('data-id'));
          }
        });
      });

      container.querySelectorAll('.page-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
          AdminMessages.load(parseInt(this.getAttribute('data-page'), 10));
        });
      });
    },

    markRead: async function (id) {
      try {
        await api.patch('/contact/' + id + '/read');
        this.load();
      } catch (err) {
        alert('Error: ' + err.message);
      }
    },

    del: async function (id) {
      try {
        await api.delete('/contact/' + id);
        this.load();
      } catch (err) {
        alert('Error: ' + err.message);
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
