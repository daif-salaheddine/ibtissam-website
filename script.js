/* ══════════════════════════════════════════════════
   IBTISSAM DAIF — PORTFOLIO
   script.js
══════════════════════════════════════════════════ */

/* ─── THEME TOGGLE ──────────────────────────────── */
(function () {
  const html    = document.documentElement;
  const btn     = document.getElementById('theme-toggle');
  if (!btn) return;

  const icon  = btn.querySelector('.toggle-icon');
  const label = btn.querySelector('.toggle-label');

  function applyTheme(theme) {
    if (theme === 'light') {
      html.setAttribute('data-theme', 'light');
      icon.textContent  = '☀';
      label.textContent = 'MORNING';
      btn.setAttribute('aria-label', 'Switch to night mode');
    } else {
      html.removeAttribute('data-theme');
      icon.textContent  = '☽';
      label.textContent = 'NIGHT';
      btn.setAttribute('aria-label', 'Switch to morning mode');
    }
  }

  /* restore saved preference, fall back to dark */
  applyTheme(localStorage.getItem('ibtissam-theme') || 'dark');

  btn.addEventListener('click', () => {
    const next = html.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    applyTheme(next);
    localStorage.setItem('ibtissam-theme', next);
  });
})();

/* ─── CUSTOM CURSOR ─────────────────────────────── */
const cursor   = document.getElementById('cursor');
const follower = document.getElementById('cursor-follower');

let mouseX = 0, mouseY = 0;
let fX = 0, fY = 0;

if (cursor && follower) {
  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top  = mouseY + 'px';
  }, { passive: true });

  (function moveFollower() {
    fX += (mouseX - fX) * 0.11;
    fY += (mouseY - fY) * 0.11;
    follower.style.left = fX + 'px';
    follower.style.top  = fY + 'px';
    requestAnimationFrame(moveFollower);
  })();

  const hoverEls = document.querySelectorAll(
    'a, button, h1, h2, h3, .mc-card, .theme-card, .svc-card, .proj-card, .pillar-card, .cw-chip'
  );
  hoverEls.forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-over'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-over'));
  });
}

/* ─── SCROLL PROGRESS BAR ───────────────────────── */
const bar = document.getElementById('progress-bar');
if (bar) {
  window.addEventListener('scroll', () => {
    const st  = window.scrollY;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (max > 0 ? (st / max) * 100 : 0) + '%';
  }, { passive: true });
}

/* ─── SCROLL REVEAL ──────────────────────────────── */
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('visible');
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.reveal, .reveal-child').forEach(el => revealObs.observe(el));

/* ─── ACTIVE NAV DOTS ───────────────────────────── */
const sections = [...document.querySelectorAll('main section[id]')];
const dots     = [...document.querySelectorAll('.nav-dot')];

const navObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const id = e.target.id;
      dots.forEach(d => d.classList.toggle('active', d.getAttribute('href') === '#' + id));
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => navObs.observe(s));

dots.forEach(d => {
  d.addEventListener('click', e => {
    e.preventDefault();
    const t = document.querySelector(d.getAttribute('href'));
    if (t) t.scrollIntoView({ behavior: 'smooth' });
  });
});

/* ─── STAT COUNTERS ─────────────────────────────── */
let countered = false;

function easeOutCubic(t) { return 1 - Math.pow(1 - t, 3); }

function countUp(el, target, duration) {
  const start = performance.now();
  const tick  = now => {
    const p = Math.min((now - start) / duration, 1);
    el.textContent = Math.round(easeOutCubic(p) * target);
    if (p < 1) requestAnimationFrame(tick);
    else el.textContent = target;
  };
  requestAnimationFrame(tick);
}

const statsSection = document.querySelector('.hero-stats');
if (statsSection) {
  new IntersectionObserver(entries => {
    if (entries[0].isIntersecting && !countered) {
      countered = true;
      document.querySelectorAll('.stat-number[data-target]').forEach(el => {
        countUp(el, parseInt(el.dataset.target, 10), 1800);
      });
    }
  }, { threshold: 0.6 }).observe(statsSection);
}

/* ─── HORIZONTAL DRAG SCROLL (MASTERCLASSES) ────── */
const wrapper = document.getElementById('mc-wrapper');
const track   = document.getElementById('mc-track');

if (wrapper && track) {
  let down = false, startX = 0, scrollLeft = 0;

  wrapper.addEventListener('mousedown', e => {
    down        = true;
    startX      = e.pageX - wrapper.offsetLeft;
    scrollLeft  = wrapper.scrollLeft;
    wrapper.style.userSelect = 'none';
  });

  const endDrag = () => {
    down = false;
    wrapper.style.userSelect = '';
  };
  document.addEventListener('mouseup',    endDrag);
  wrapper.addEventListener('mouseleave',  endDrag);

  wrapper.addEventListener('mousemove', e => {
    if (!down) return;
    e.preventDefault();
    const x    = e.pageX - wrapper.offsetLeft;
    const walk = (x - startX) * 1.6;
    wrapper.scrollLeft = scrollLeft - walk;
  });

  /* touch support */
  let touchStart = 0, touchScroll = 0;
  wrapper.addEventListener('touchstart', e => {
    touchStart  = e.touches[0].pageX;
    touchScroll = wrapper.scrollLeft;
  }, { passive: true });

  wrapper.addEventListener('touchmove', e => {
    const dx = touchStart - e.touches[0].pageX;
    wrapper.scrollLeft = touchScroll + dx;
  }, { passive: true });
}

/* ─── SCROLL CUE CLICK ──────────────────────────── */
const scrollCue = document.querySelector('.scroll-cue');
if (scrollCue) {
  scrollCue.addEventListener('click', e => {
    e.preventDefault();
    const next = document.getElementById('identity');
    if (next) next.scrollIntoView({ behavior: 'smooth' });
  });
}

/* ─── PHOTO UPLOAD ──────────────────────────────── */
(function () {
  const frame       = document.getElementById('photo-frame');
  const input       = document.getElementById('photo-input');
  const placeholder = document.getElementById('photo-placeholder');
  const img         = document.getElementById('photo-img');

  if (!frame || !input || !img) return;

  function applyPhoto(src) {
    img.src = src;
    img.removeAttribute('hidden');
    placeholder.style.display = 'none';
    frame.classList.add('has-photo');
  }

  /* restore from localStorage */
  const saved = localStorage.getItem('ibtissam-photo');
  if (saved) applyPhoto(saved);

  input.addEventListener('change', () => {
    const file = input.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = e => {
      const src = e.target.result;
      applyPhoto(src);
      try { localStorage.setItem('ibtissam-photo', src); } catch (_) {}
    };
    reader.readAsDataURL(file);
    input.value = ''; /* allow re-selecting same file */
  });
})();

/* ─── SUBTLE PARALLAX ON HERO DIAGONAL ─────────── */
const diag = document.querySelector('.hero-diagonal');
if (diag) {
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    diag.style.transform = `rotate(-14deg) translateX(${y * 0.06}px)`;
  }, { passive: true });
}

/* ─── NARRATIVE WATERMARK PARALLAX ─────────────── */
const wm = document.querySelector('.narrative-watermark');
if (wm) {
  const section = document.getElementById('narrative');
  window.addEventListener('scroll', () => {
    if (!section) return;
    const rect = section.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      const progress = -rect.top / section.offsetHeight;
      wm.style.transform = `translateY(calc(-50% + ${progress * 60}px))`;
    }
  }, { passive: true });
}

/* ─── EXPAND / COLLAPSE ─────────────────────────── */
document.querySelectorAll('.expand-btn').forEach(btn => {
  /* store original label once */
  btn.dataset.original = btn.textContent.trim();
  btn.addEventListener('click', () => {
    const body = btn.previousElementSibling;
    const open = body.classList.toggle('open');
    btn.setAttribute('aria-expanded', String(open));
    btn.textContent = open ? 'Show less ' : btn.dataset.original + ' ';
  });
});
