function toggleTheme() {
  const html = document.documentElement;
  const current = html.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('gigshield-theme', next);
}

function initTheme() {
  const saved = localStorage.getItem('gigshield-theme');
  if (saved) {
    document.documentElement.setAttribute('data-theme', saved);
  }
}

const router = {
  navigate(page, ...args) {
    switch (page) {
      case 'login':
        renderLogin();
        break;
      case 'verify':
        renderVerify(...args);
        break;
      case 'dashboard':
        renderDashboard();
        break;
      default:
        renderLogin();
    }
  }
};