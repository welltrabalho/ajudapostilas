/* ===== app.js (menu mobile 3D + submenus) ===== */

// elementos
const hamburger = document.querySelector('.hamburger');
const navList = document.querySelector('.nav-list');
const submenuToggles = document.querySelectorAll('.submenu-toggle');
const submenuInnerToggles = document.querySelectorAll('.submenu-inner-toggle');

// abre/fecha menu mobile
function toggleMenu() {
  const opened = navList.classList.toggle('active');
  hamburger.classList.toggle('open', opened);
  // acessibilidade
  hamburger.setAttribute('aria-expanded', opened ? 'true' : 'false');
}
hamburger.addEventListener('click', (e) => {
  e.stopPropagation();
  toggleMenu();
});

// fecha o menu ao clicar fora (mobile)
document.addEventListener('click', (e) => {
  if (window.innerWidth <= 768) {
    if (!navList.contains(e.target) && !hamburger.contains(e.target)) {
      navList.classList.remove('active');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      // fechar todos os submenus
      document.querySelectorAll('.submenu.open, .submenu-inner.open').forEach(el => el.classList.remove('open'));
    }
  }
});

// FUNÇÃO AUX: toggle submenu apenas no mobile (previne comportamento default)
function setupToggles(toggles, selectorName) {
  toggles.forEach(toggle => {
    toggle.addEventListener('click', (e) => {
      // mobile only
      if (window.innerWidth <= 768) {
        e.preventDefault();
        e.stopPropagation();
        const parentLi = toggle.parentElement;
        // alterna .open
        parentLi.classList.toggle('open');
      } else {
        // em desktop deixamos o hover funcionar (sem interferir)
      }
    });
  });
}
setupToggles(submenuToggles, '.submenu');
setupToggles(submenuInnerToggles, '.submenu-inner');

// Opcional: fechar submenus ao redimensionar para desktop
window.addEventListener('resize', () => {
  if (window.innerWidth > 768) {
    // garantir que menu mobile esteja fechado
    navList.classList.remove('active');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    // remover .open de submenus
    document.querySelectorAll('.submenu.open, .submenu-inner.open').forEach(el => el.classList.remove('open'));
  }
});
