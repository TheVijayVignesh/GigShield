document.addEventListener('DOMContentLoaded', () => {
    initTheme();

    const token = sessionStorage.getItem('access_token');
    if (token) {
        renderDashboard();
    } else {
        renderLogin();
    }
});