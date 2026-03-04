/*   Animación de entrada: Sobre con sello → video apertura → fade blanco */

(function () {
  'use strict';

  var overlay    = document.getElementById('intro-overlay');
  var staticEl   = document.getElementById('intro-static');
  var videoWrap  = document.getElementById('intro-video-wrap');
  var video      = document.getElementById('intro-video');
  var flash      = document.getElementById('intro-flash');
  var tapHint    = document.getElementById('intro-tap-hint');

  if (!overlay) return; // Si no existe el overlay, salir

  var triggered = false;
  var autoTimer = null;

  // ── Fase 2: arrancar el video ──
  function startVideo() {
    if (triggered) return;
    triggered = true;
    clearTimeout(autoTimer);

    // Ocultar hint
    if (tapHint) tapHint.style.opacity = '0';

    // Mostrar video suavemente
    videoWrap.classList.add('visible');
    staticEl.classList.add('hidden');

    // Precargar y reproducir
    video.currentTime = 0;
    var playPromise = video.play();
    if (playPromise) {
      playPromise.catch(function () {
        // Fallback si el navegador bloquea autoplay
        video.muted = true;
        video.play();
      });
    }
  }

  // ── Fase 3: flash blanco → revelar página ──
  function triggerFlash() {
    // Iniciar fade a blanco
    flash.classList.add('fade-in');

    // Después del fade, ocultar overlay y mostrar página
    setTimeout(function () {
      overlay.classList.add('fade-out');
      // Activar reveal-up de la página
      document.querySelectorAll('.reveal-up').forEach(function (el) {
        var match = el.style.cssText.match(/--delay:\s*([\d.]+)s/);
        var delay = match ? parseFloat(match[1]) * 1000 : 0;
        setTimeout(function () { el.classList.add('visible'); }, delay + 100);
      });
    }, 600);

    // Quitar overlay del DOM tras la transición
    setTimeout(function () {
      overlay.classList.add('gone');
      document.body.style.overflow = '';
    }, 1700);
  }

  // ── Escuchar fin del video ──
  video.addEventListener('ended', function () {
    triggerFlash();
  });

  // Seguridad: si el video tarda más de lo esperado
  video.addEventListener('timeupdate', function () {
    var duration = video.duration || 4;
    if (video.currentTime >= duration - 0.15) {
      triggerFlash();
    }
  });

  // ── Click / tap en cualquier parte → arrancar video ──
  overlay.addEventListener('click', startVideo);
  overlay.addEventListener('touchend', function (e) {
    e.preventDefault();
    startVideo();
  }, { passive: false });

  // ── Auto-trigger a los 300 segundos ──
  autoTimer = setTimeout(startVideo, 300000);

  // ── Bloquear scroll mientras corre la intro ──
  document.body.style.overflow = 'hidden';

  // ── Precargar video en segundo plano ──
  video.load();

})();
