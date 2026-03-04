/* ══════════════════════════════════════════════════════
   01-loader-door.js  —  Loader de progreso · Puertas 3D
   Fabián & Soffy · Boda 22 Marzo 2026
══════════════════════════════════════════════════════ */

(function () {
  'use strict';

  var loader   = document.getElementById('loader');
  var fill     = document.querySelector('.loader-fill');
  var doorEl   = document.getElementById('door-overlay');

  var progress  = 0;
  var rafId     = null;

  function animateLoader() {
    progress += Math.random() * 3.5 + 1;
    if (progress >= 100) {
      progress = 100;
      if (fill) fill.style.width = '100%';
      setTimeout(showDoors, 280);
      return;
    }
    if (fill) fill.style.width = progress + '%';
    rafId = requestAnimationFrame(animateLoader);
  }

  function showDoors() {
    if (loader) loader.classList.add('hidden');

    if (!doorEl) { initPage(); return; }

    // Mostrar texto sobre las puertas
    setTimeout(function () {
      doorEl.classList.add('show-text');
    }, 200);

    // Abrir las puertas
    setTimeout(function () {
      doorEl.classList.add('opened');
    }, 900);

    // Ocultar overlay completamente
    setTimeout(function () {
      doorEl.classList.add('gone');
      initPage();
    }, 2100);
  }

  function initPage() {
    // Desencadenar reveal-up de elementos visibles
    revealVisible();
    // Activar partículas si está disponible
    if (typeof window.initParticles === 'function') {
      window.initParticles();
    }
  }

  function revealVisible() {
    var els = document.querySelectorAll('.reveal-up');
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    els.forEach(function (el) { observer.observe(el); });
  }

  // Arranque
  document.addEventListener('DOMContentLoaded', function () {
    animateLoader();
  });

})();
