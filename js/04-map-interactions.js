/* ══════════════════════════════════════════════════════
   04-map-interactions.js  —  Modal de mapas · Ripple
   Fabián & Soffy · Boda 22 Marzo 2026
══════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ── Datos de ubicaciones ── */
  var LOCATIONS = {
    parroquia: {
      tag:     'La Ceremonia',
      name:    'Parroquia Cristo Evangelizador',
      address: 'Cúcuta, Norte de Santander, Colombia',
      gmaps:   'https://maps.google.com/?q=Parroquia+Cristo+Evangelizador+Cucuta',
      waze:    'https://waze.com/ul?q=Parroquia+Cristo+Evangelizador+Cucuta',
      apple:   'https://maps.apple.com/?q=Parroquia+Cristo+Evangelizador+Cucuta',
    },
    palmas: {
      tag:     'La Celebración',
      name:    'Palmas Golf Club',
      address: 'Cúcuta, Norte de Santander, Colombia',
      gmaps:   'https://maps.google.com/?q=Palmas+Golf+Club+Cucuta',
      waze:    'https://waze.com/ul?q=Palmas+Golf+Club+Cucuta',
      apple:   'https://maps.apple.com/?q=Palmas+Golf+Club+Cucuta',
    },
  };

  var modal       = document.getElementById('map-modal');
  var modalTag    = document.getElementById('modal-tag');
  var modalName   = document.getElementById('modal-name');
  var modalAddr   = document.getElementById('modal-address');
  var modalGmaps  = document.getElementById('modal-gmaps');
  var modalWaze   = document.getElementById('modal-waze');
  var modalApple  = document.getElementById('modal-apple');

  /* ── Abrir modal ── */
  window.openMap = function (key) {
    var loc = LOCATIONS[key];
    if (!loc || !modal) return;

    if (modalTag)   modalTag.innerText   = loc.tag;
    if (modalName)  modalName.innerText  = loc.name;
    if (modalAddr)  modalAddr.innerText  = loc.address;
    if (modalGmaps) modalGmaps.href      = loc.gmaps;
    if (modalWaze)  modalWaze.href       = loc.waze;
    if (modalApple) modalApple.href      = loc.apple;

    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  /* ── Cerrar modal ── */
  window.closeMap = function () {
    if (!modal) return;
    modal.classList.remove('open');
    document.body.style.overflow = '';
  };

  /* Cerrar al hacer clic fuera de la tarjeta */
  if (modal) {
    modal.addEventListener('click', function (e) {
      if (e.target === modal) window.closeMap();
    });
  }

  /* Cerrar con Escape */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') window.closeMap();
  });

  /* ── Efecto Ripple (para cualquier elemento .ripple) ── */
  document.addEventListener('click', function (e) {
    var btn = e.target.closest('.ripple');
    if (!btn) return;

    var rect   = btn.getBoundingClientRect();
    var size   = Math.max(rect.width, rect.height) * 1.5;
    var x      = e.clientX - rect.left - size / 2;
    var y      = e.clientY - rect.top  - size / 2;

    var wave = document.createElement('span');
    wave.className = 'ripple-wave';
    wave.style.cssText = [
      'width:'  + size + 'px',
      'height:' + size + 'px',
      'left:'   + x    + 'px',
      'top:'    + y    + 'px',
    ].join(';');

    btn.appendChild(wave);
    wave.addEventListener('animationend', function () { wave.remove(); });
  });

})();
