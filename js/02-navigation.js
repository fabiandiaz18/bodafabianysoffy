/* ══════════════════════════════════════════════════════
   02-navigation.js  —  Navbar sticky · Menú móvil
   Fabián & Soffy · Boda 22 Marzo 2026
══════════════════════════════════════════════════════ */

(function () {
  'use strict';

  var navbar    = document.getElementById('navbar');
  var toggle    = document.getElementById('navbar-toggle');
  var mobileMenu = document.getElementById('navbar-mobile');
  var mobileLinks = mobileMenu ? mobileMenu.querySelectorAll('a') : [];

  if (!navbar) return;

  /* ── Scroll: añadir clase .scrolled ── */
  function onScroll() {
    if (window.scrollY > 80) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ── Toggle menú móvil ── */
  function openMenu() {
    if (!toggle || !mobileMenu) return;
    toggle.classList.add('open');
    mobileMenu.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeMenu() {
    if (!toggle || !mobileMenu) return;
    toggle.classList.remove('open');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (toggle) {
    toggle.addEventListener('click', function () {
      if (mobileMenu && mobileMenu.classList.contains('open')) {
        closeMenu();
      } else {
        openMenu();
      }
    });
  }

  /* Cerrar al hacer clic en un enlace del menú móvil */
  mobileLinks.forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  /* Cerrar con Escape */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMenu();
  });

})();
