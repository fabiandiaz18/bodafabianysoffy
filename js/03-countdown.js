/* ══════════════════════════════════════════════════════
   03-countdown.js  —  Contador regresivo
   Boda: 22 de Marzo de 2026 — hora local
   Fabián & Soffy · Boda 22 Marzo 2026
══════════════════════════════════════════════════════ */

(function () {
  'use strict';

  // ── Fecha objetivo (constructor numérico = hora local del dispositivo)
  // new Date(año, mes-1, día)  →  mes 2 = marzo (0-indexed)
  var WEDDING_DATE = new Date(2026, 7, 22).getTime();

  function pad(n, len) {
    return String(Math.max(0, n)).padStart(len || 2, '0');
  }

  function tick() {
    var diff = WEDDING_DATE - Date.now();

    if (diff <= 0) {
      // Día de la boda — mostrar mensaje festivo
      var units = ['cd-days', 'cd-hours', 'cd-minutes', 'cd-seconds'];
      units.forEach(function (id) {
        var el = document.getElementById(id);
        if (el) el.innerText = '00';
      });
      var heading = document.querySelector('.countdown-section .section-heading');
      if (heading) heading.innerText = '¡Hoy es el gran día!';
      return;
    }

    var days    = Math.floor(diff / 86400000);
    var hours   = Math.floor((diff % 86400000) / 3600000);
    var minutes = Math.floor((diff % 3600000)  / 60000);
    var seconds = Math.floor((diff % 60000)    / 1000);

    var elDays = document.getElementById('cd-days');
    var elH    = document.getElementById('cd-hours');
    var elM    = document.getElementById('cd-minutes');
    var elS    = document.getElementById('cd-seconds');

    if (elDays) elDays.innerText = pad(days, 3);
    if (elH)    elH.innerText    = pad(hours);
    if (elM)    elM.innerText    = pad(minutes);
    if (elS)    elS.innerText    = pad(seconds);

    setTimeout(tick, 1000);
  }

  // Arrancar inmediatamente (sin esperar DOMContentLoaded para evitar retardos)
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', tick);
  } else {
    tick();
  }

})();
