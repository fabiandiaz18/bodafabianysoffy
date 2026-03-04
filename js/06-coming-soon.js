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
      // ✓ Contraseña correcta — flash y redirigir
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

  /* ── Eventos ── */
  if (openBtn)   openBtn.addEventListener('click', openModal);
  if (closeBtn)  closeBtn.addEventListener('click', closeModal);
  if (submitBtn) submitBtn.addEventListener('click', tryAccess);

  /* Enviar con Enter */
  if (inputEl) {
    inputEl.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') tryAccess();
    });
  }

  /* Mostrar/ocultar contraseña */
  if (eyeBtn && inputEl) {
    eyeBtn.addEventListener('click', function () {
      var isHidden = inputEl.type === 'password';
      inputEl.type = isHidden ? 'text' : 'password';
      eyeBtn.innerHTML = isHidden
        ? '<svg viewBox="0 0 22 16" fill="none" stroke="currentColor" stroke-width="1.5" width="16" height="16"><path d="M1 8S4.5 1 11 1s10 7 10 7-3.5 7-10 7S1 8 1 8z"/><circle cx="11" cy="8" r="3"/><line x1="3" y1="2" x2="19" y2="14" stroke-linecap="round"/></svg>'
        : '<svg viewBox="0 0 22 16" fill="none" stroke="currentColor" stroke-width="1.5" width="16" height="16"><path d="M1 8S4.5 1 11 1s10 7 10 7-3.5 7-10 7S1 8 1 8z"/><circle cx="11" cy="8" r="3"/></svg>';
    });
  }

  /* Cerrar con Escape o clic fuera */
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
  });

})();
