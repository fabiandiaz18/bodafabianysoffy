/* ══════════════════════════════════════════════════════
   06-coming-soon.js  —  Acceso privado con contraseña
                          Contador de coming-soon
   Fabián & Soffy · Boda 22 Marzo 2026
══════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ────────────────────────────────────────────────
     ★  CAMBIA AQUÍ LA CONTRASEÑA DE ACCESO PRIVADO
  ──────────────────────────────────────────────── */
  var SECRET = 'soffy2026';

  /* ── Contador regresivo (coming-soon) ── */
  var WEDDING_DATE = new Date(2026, 2, 22).getTime(); // 22 marzo 2026

  function pad(n, len) { return String(Math.max(0, n)).padStart(len || 2, '0'); }

  function tickCS() {
    var diff = WEDDING_DATE - Date.now();
    if (diff < 0) diff = 0;

    var el = {
      d: document.getElementById('cs-days'),
      h: document.getElementById('cs-hours'),
      m: document.getElementById('cs-minutes'),
      s: document.getElementById('cs-seconds'),
    };

    if (el.d) el.d.innerText = pad(Math.floor(diff / 86400000), 3);
    if (el.h) el.h.innerText = pad(Math.floor((diff % 86400000) / 3600000));
    if (el.m) el.m.innerText = pad(Math.floor((diff % 3600000) / 60000));
    if (el.s) el.s.innerText = pad(Math.floor((diff % 60000) / 1000));

    setTimeout(tickCS, 1000);
  }

  /* ── Modal de acceso privado ── */
  var openBtn    = document.getElementById('cs-private-btn');
  var overlay    = document.getElementById('cs-modal-overlay');
  var closeBtn   = document.getElementById('cs-modal-close');
  var inputEl    = document.getElementById('cs-password');
  var eyeBtn     = document.getElementById('cs-eye-btn');
  var submitBtn  = document.getElementById('cs-submit-btn');
  var errorMsg   = document.getElementById('cs-error-msg');
  var flash      = document.getElementById('cs-flash');

  function openModal() {
    if (!overlay) return;
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    setTimeout(function () { if (inputEl) inputEl.focus(); }, 100);
  }

  function closeModal() {
    if (!overlay) return;
    overlay.classList.remove('open');
    document.body.style.overflow = '';
    if (inputEl) inputEl.value = '';
    if (errorMsg) errorMsg.classList.remove('visible');
    if (inputEl) inputEl.classList.remove('error');
  }

  function showError() {
    if (!inputEl || !errorMsg) return;
    inputEl.classList.add('error');
    errorMsg.classList.add('visible');
    setTimeout(function () {
      if (inputEl) inputEl.classList.remove('error');
    }, 500);
  }

  function tryAccess() {
    if (!inputEl) return;
    var val = inputEl.value.trim();
    if (val === SECRET) {
      if (flash) {
        flash.classList.add('active');
        setTimeout(function () { flash.classList.remove('active'); }, 300);
      }
      setTimeout(function () {
        window.location.href = 'wedding.html';
      }, 400);
    } else {
      showError();
      if (inputEl) inputEl.select();
    }
  }

  if (openBtn)   openBtn.addEventListener('click', openModal);
  if (closeBtn)  closeBtn.addEventListener('click', closeModal);
  if (submitBtn) submitBtn.addEventListener('click', tryAccess);

  if (inputEl) {
    inputEl.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') tryAccess();
    });
  }

  if (eyeBtn && inputEl) {
    eyeBtn.addEventListener('click', function () {
      var isHidden = inputEl.type === 'password';
      inputEl.type = isHidden ? 'text' : 'password';
    });
  }

  if (overlay) {
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) closeModal();
    });
  }
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeModal();
  });

  /* ── Arranque ── */
  document.addEventListener('DOMContentLoaded', function () {
    tickCS();

    // Activar elementos reveal-up con animación escalonada
    document.querySelectorAll('.reveal-up').forEach(function (el) {
      var match = el.style.cssText.match(/--delay:\s*([\d.]+)s/);
      var delay = match ? parseFloat(match[1]) * 1000 : 0;
      setTimeout(function () { el.classList.add('visible'); }, delay + 150);
    });
  });

})();
