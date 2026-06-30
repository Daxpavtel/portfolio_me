(function () {
  const TOKEN_KEY = 'admin_token';
  const USER_KEY = 'admin_user';

  window.AdminAuth = {
    login: async function (username, password) {
      const res = await api.post('/auth/login', { username, password });
      const token = res.data.token;
      sessionStorage.setItem(TOKEN_KEY, token);
      sessionStorage.setItem(USER_KEY, res.data.username || username);
      return token;
    },

    logout: function () {
      sessionStorage.removeItem(TOKEN_KEY);
      sessionStorage.removeItem(USER_KEY);
      window.location.href = 'login.html';
    },

    getToken: function () {
      return sessionStorage.getItem(TOKEN_KEY);
    },

    isAuthenticated: function () {
      const token = sessionStorage.getItem(TOKEN_KEY);
      if (!token) return false;
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.exp * 1000 > Date.now();
      } catch {
        return false;
      }
    },

    requireAuth: function () {
      if (!this.isAuthenticated()) {
        window.location.href = 'login.html';
      }
    },
  };

  if (window.location.pathname.includes('login.html')) {
    const form = document.getElementById('loginForm');
    if (form) {
      form.addEventListener('submit', async function (e) {
        e.preventDefault();
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value;
        const errorEl = document.getElementById('loginError');
        const btn = document.getElementById('loginBtn');

        if (!username || !password) {
          errorEl.textContent = 'Please enter both username and password.';
          errorEl.classList.add('show');
          return;
        }

        errorEl.classList.remove('show');
        btn.disabled = true;
        btn.textContent = 'Signing in...';

        try {
          await window.AdminAuth.login(username, password);
          window.location.href = 'dashboard.html';
        } catch (err) {
          errorEl.textContent = err.message || 'Login failed. Check your credentials.';
          errorEl.classList.add('show');
          btn.disabled = false;
          btn.textContent = 'Sign In';
        }
      });
    }
  }

  if (window.location.pathname.includes('dashboard.html')) {
    window.AdminAuth.requireAuth();
  }
})();
