/* ═══════════════════════════════════════════════════
   FABIÁN & SOFFY — BODA ITALIANA 2025
   script.js — Door FX · Countdown · Particles · Modal
═══════════════════════════════════════════════════ */

'use strict';

/* ─────────────────────────────────────────
   LOCATION DATA
───────────────────────────────────────── */
const LOCATIONS = {
  parroquia: {
    tag: 'La Ceremonia · 5:00 PM',
    name: 'Parroquia Cristo Evangelizador',
    address: 'Cúcuta, Norte de Santander, Colombia',
    query: 'Parroquia+Cristo+Evangelizador+Cucuta+Colombia',
  },
  palmas: {
    tag: 'La Recepción · 7:00 PM',
    name: 'Palmas Golf Club',
    address: 'Cúcuta, Norte de Santander, Colombia',
    query: 'Palmas+Golf+Club+Cucuta+Colombia',
  },
};

/* ─────────────────────────────────────────
   LOADER
───────────────────────────────────────── */
function initLoader() {
  const loader = document.getElementById('loader');
  if (!loader) return;

  const hide = () => {
    loader.classList.add('hidden');
    setTimeout(initReveal, 300);
  };

  if (document.readyState === 'complete') {
    setTimeout(hide, 1900);
  } else {
    window.addEventListener('load', () => setTimeout(hide, 1900));
  }
}

/* ─────────────────────────────────────────
   SCROLL REVEAL
───────────────────────────────────────── */
function initReveal() {
  const els = document.querySelectorAll('.reveal-up');
  if (!els.length) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -36px 0px' });

  els.forEach(el => io.observe(el));
}

/* ─────────────────────────────────────────
   COUNTDOWN — simple & bulletproof
   Colombia = UTC-5 → 17:00 local = 22:00 UTC
───────────────────────────────────────── */
function initCountdown() {
  var target = new Date('2025-08-22T22:00:00Z').getTime();

  function tick() {
    var now  = Date.now();
    var diff = target - now;

    var days    = Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)));
    var hours   = Math.max(0, Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    var minutes = Math.max(0, Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)));
    var seconds = Math.max(0, Math.floor((diff % (1000 * 60)) / 1000));

    var dEl = document.getElementById('cd-days');
    var hEl = document.getElementById('cd-hours');
    var mEl = document.getElementById('cd-minutes');
    var sEl = document.getElementById('cd-seconds');

    if (dEl) dEl.textContent = String(days).padStart(3, '0');
    if (hEl) hEl.textContent = String(hours).padStart(2, '0');
    if (mEl) mEl.textContent = String(minutes).padStart(2, '0');
    if (sEl) sEl.textContent = String(seconds).padStart(2, '0');
  }

  tick();
  setInterval(tick, 1000);
}

/* ─────────────────────────────────────────
   RIPPLE EFFECT
───────────────────────────────────────── */
function createRipple(el, e) {
  const rect = el.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height) * 2.2;
  const cx   = (e.clientX ?? rect.left + rect.width  / 2) - rect.left - size / 2;
  const cy   = (e.clientY ?? rect.top  + rect.height / 2) - rect.top  - size / 2;

  const wave = document.createElement('span');
  wave.className = 'ripple-wave';
  wave.style.cssText = `width:${size}px;height:${size}px;left:${cx}px;top:${cy}px;`;
  el.appendChild(wave);
  setTimeout(() => wave.remove(), 650);
}

function initRipples() {
  document.addEventListener('pointerdown', e => {
    const el = e.target.closest('.ripple');
    if (el) createRipple(el, e);
  });
}

/* ─────────────────────────────────────────
   DOOR ANIMATION
───────────────────────────────────────── */
let _doorDestination = null;
let _doorOpen        = false;

function openDoor(href) {
  const overlay = document.getElementById('door-overlay');
  if (!overlay || _doorOpen) return;
  _doorOpen        = true;
  _doorDestination = href;

  if (navigator.vibrate) navigator.vibrate([10, 30, 10]);

  overlay.classList.add('active', 'opening');

  // After doors finish opening → show glow → navigate
  setTimeout(() => {
    burstConfetti();
  }, 300);

  setTimeout(() => {
    window.open(_doorDestination, '_blank', 'noopener');
    // Start closing doors
    overlay.classList.remove('opening');
    overlay.classList.add('closing');

    setTimeout(() => {
      overlay.classList.remove('active', 'closing');
      _doorOpen = false;
    }, 550);
  }, 1600);
}

/* ─────────────────────────────────────────
   MAP MODAL
───────────────────────────────────────── */
let _focusReturn = null;

function openMap(key) {
  const loc   = LOCATIONS[key];
  const modal = document.getElementById('map-modal');
  if (!loc || !modal) return;

  _focusReturn = document.activeElement;

  document.getElementById('modal-tag').textContent     = loc.tag;
  document.getElementById('modal-name').textContent    = loc.name;
  document.getElementById('modal-address').textContent = loc.address;

  document.getElementById('modal-gmaps').href =
    `https://www.google.com/maps/search/?api=1&query=${loc.query}`;
  document.getElementById('modal-waze').href  =
    `https://waze.com/ul?q=${loc.query}&navigate=yes`;
  document.getElementById('modal-apple').href =
    `https://maps.apple.com/?q=${encodeURIComponent(loc.name)}`;

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
  if (navigator.vibrate) navigator.vibrate(8);
}

function closeMap() {
  const modal = document.getElementById('map-modal');
  if (!modal) return;
  modal.classList.remove('open');
  document.body.style.overflow = '';
  if (_focusReturn) _focusReturn.focus();
}

function initModal() {
  const modal = document.getElementById('map-modal');
  if (!modal) return;

  modal.addEventListener('click', e => { if (e.target === modal) closeMap(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMap(); });

  const card = modal.querySelector('.modal-card');
  if (card) {
    let startY = 0;
    card.addEventListener('touchstart', e => { startY = e.touches[0].clientY; }, { passive: true });
    card.addEventListener('touchend',   e => {
      if (e.changedTouches[0].clientY - startY > 72) closeMap();
    }, { passive: true });
  }
}

// Expose
window.openMap  = openMap;
window.closeMap = closeMap;

/* ─────────────────────────────────────────
   RSVP BUTTON → DOOR
───────────────────────────────────────── */
function initRsvpButton() {
  const btn = document.getElementById('rsvp-btn');
  if (!btn) return;

  btn.addEventListener('click', e => {
    e.preventDefault();
    const href = btn.getAttribute('data-href') || btn.href || 'https://lu.ma';
    openDoor(href);
  });
}

/* ─────────────────────────────────────────
   CONFETTI BURST
───────────────────────────────────────── */
function burstConfetti() {
  const canvas = document.getElementById('particles');
  const ctx    = canvas?.getContext('2d');
  if (!canvas || !ctx) return;

  const cx = window.innerWidth  / 2;
  const cy = window.innerHeight / 2;
  const colors = ['#FCD116','#003087','#CE1126','#b8963e','#d4af6a','#f5f0e8'];

  const pieces = Array.from({ length: 55 }, () => {
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 7 + 2.5;
    return {
      x: cx, y: cy,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      w: Math.random() * 7 + 2,
      h: Math.random() * 4 + 2,
      alpha: 1,
      rot: Math.random() * Math.PI * 2,
      rotV: (Math.random() - 0.5) * 0.22,
    };
  });

  let frame = 0;
  function draw() {
    if (frame++ > 75) return;
    pieces.forEach(p => {
      p.x  += p.vx; p.y  += p.vy;
      p.vy += 0.2;
      p.alpha -= 0.014;
      p.rot += p.rotV;
      if (p.alpha <= 0) return;
      ctx.save();
      ctx.globalAlpha = p.alpha;
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
    });
    requestAnimationFrame(draw);
  }
  draw();
}

/* ─────────────────────────────────────────
   FLOATING PARTICLES
───────────────────────────────────────── */
function initParticles() {
  const canvas = document.getElementById('particles');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, particles, raf;

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function makeParticle() {
    return {
      x: Math.random() * W,
      y: Math.random() * H + H,
      r: Math.random() * 1.4 + 0.3,
      vx: (Math.random() - 0.5) * 0.18,
      vy: -(Math.random() * 0.22 + 0.07),
      alpha: Math.random() * 0.45 + 0.1,
      gold: Math.random() > 0.65,
    };
  }

  function createParticles() {
    const count = Math.min(Math.floor(W * H / 17000), 60);
    particles = Array.from({ length: count }, makeParticle);
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach((p, i) => {
      p.x += p.vx; p.y += p.vy; p.alpha -= 0.0007;
      if (p.y < -10 || p.alpha <= 0) { particles[i] = makeParticle(); return; }
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.gold
        ? `rgba(184,150,62,${p.alpha})`
        : `rgba(245,240,232,${p.alpha * 0.6})`;
      ctx.fill();
    });
    raf = requestAnimationFrame(draw);
  }

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) cancelAnimationFrame(raf);
    else draw();
  });

  resize();
  createParticles();
  draw();
  window.addEventListener('resize', () => { resize(); createParticles(); });
}

/* ─────────────────────────────────────────
   HERO PARALLAX (desktop only)
───────────────────────────────────────── */
function initParallax() {
  if (window.matchMedia('(hover: none)').matches) return;
  const img  = document.querySelector('.hero-img');
  const hero = document.getElementById('hero');
  if (!img || !hero) return;

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const pct = Math.min(window.scrollY / hero.offsetHeight, 1);
        img.style.transform = `scale(1.08) translateY(${pct * 9}%)`;
        ticking = false;
      });
      ticking = true;
    }
  });
}

/* ─────────────────────────────────────────
   INIT
───────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initLoader();
  initCountdown();
  initRipples();
  initModal();
  initParticles();
  initRsvpButton();
  initParallax();
});
