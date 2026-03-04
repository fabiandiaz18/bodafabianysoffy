/* ══════════════════════════════════════════════════════
   05-particles-parallax.js  —  Partículas doradas
                                 Parallax del hero
   Fabián & Soffy · Boda 22 Marzo 2026
══════════════════════════════════════════════════════ */

/* ════════════════ PARTÍCULAS ════════════════ */
window.initParticles = (function () {
  'use strict';

  var canvas, ctx, particles = [], W, H, rafId;

  var COLORS = [
    'rgba(212,175,106,',
    'rgba(232,213,163,',
    'rgba(184,150,62,',
    'rgba(255,235,180,',
  ];

  function Particle() { this.reset(true); }

  Particle.prototype.reset = function (initial) {
    this.x  = Math.random() * W;
    this.y  = initial ? Math.random() * H : H + 8;
    this.r  = Math.random() * 1.8 + 0.5;
    this.vx = (Math.random() - 0.5) * 0.4;
    this.vy = -(Math.random() * 0.55 + 0.2);
    this.a  = Math.random() * 0.55 + 0.15;
    this.da = (Math.random() - 0.5) * 0.006;
    this.c  = COLORS[Math.floor(Math.random() * COLORS.length)];
  };

  Particle.prototype.update = function () {
    this.x += this.vx;
    this.y += this.vy;
    this.a += this.da;
    if (this.a < 0.05) this.a = 0.05;
    if (this.a > 0.65) { this.da = -Math.abs(this.da); }
    if (this.y < -10 || this.x < -10 || this.x > W + 10) this.reset(false);
  };

  Particle.prototype.draw = function () {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = this.c + this.a + ')';
    ctx.fill();
  };

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function loop() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(function (p) { p.update(); p.draw(); });
    rafId = requestAnimationFrame(loop);
  }

  return function init() {
    canvas = document.getElementById('particles');
    if (!canvas) return;

    ctx = canvas.getContext('2d');
    resize();

    var count = Math.min(90, Math.floor(W * H / 14000));
    particles = [];
    for (var i = 0; i < count; i++) { particles.push(new Particle()); }

    window.addEventListener('resize', resize, { passive: true });

    if (rafId) cancelAnimationFrame(rafId);
    loop();
  };
})();

/* ════════════════ PARALLAX HERO ════════════════ */
(function () {
  'use strict';

  var heroImg = document.querySelector('.hero-img');
  if (!heroImg) return;

  var ticking = false;
  var lastY   = 0;

  function applyParallax() {
    var offset = lastY * 0.28;
    heroImg.style.transform = 'translateY(' + offset + 'px)';
    ticking = false;
  }

  window.addEventListener('scroll', function () {
    lastY = window.scrollY;
    if (!ticking) {
      requestAnimationFrame(applyParallax);
      ticking = true;
    }
  }, { passive: true });

})();
