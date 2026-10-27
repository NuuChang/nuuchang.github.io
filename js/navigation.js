const navigationMenu = document.getElementById('menu');

navigationMenu.querySelectorAll('.nav-link').forEach((link) => {
    link.addEventListener('click', () => {
        if (navigationMenu.classList.contains('show') && window.bootstrap?.Collapse) {
            window.bootstrap.Collapse.getOrCreateInstance(navigationMenu).hide();
        }
    });
});
