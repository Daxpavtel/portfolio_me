var API_BASE_URL = (function () {
  if (window.API_BASE_URL) return window.API_BASE_URL;
  var host = window.location.hostname;
  var isLocal = !host || host === 'localhost' || host === '127.0.0.1'
    || host.startsWith('10.') || host.startsWith('192.168.')
    || (host.startsWith('172.') && host.charAt(4) === '.' && parseInt(host.split('.')[1], 10) >= 16);
  if (isLocal) {
    return 'http://localhost:5000/api/v1';
  }
  return 'https://portfolio-me-z294.onrender.com/api/v1';
})();
