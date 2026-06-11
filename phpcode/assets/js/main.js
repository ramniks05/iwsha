// ── Mobile menu ──────────────────────────────────────────────────
(function () {
  const btn   = document.getElementById('menuBtn');
  const panel = document.getElementById('headerRight');
  if (!btn || !panel) return;

  btn.addEventListener('click', () => {
    const open = panel.classList.toggle('open');
    btn.setAttribute('aria-expanded', String(open));
  });

  // Close on nav link click
  panel.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => {
      panel.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    })
  );

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!btn.contains(e.target) && !panel.contains(e.target)) {
      panel.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    }
  });
})();

// ── Sticky header shadow on scroll ───────────────────────────────
(function () {
  const header = document.querySelector('.header');
  if (!header) return;
  window.addEventListener('scroll', () => {
    header.classList.toggle('header--scrolled', window.scrollY > 10);
  }, { passive: true });
})();

// ── Counter animation on stats ────────────────────────────────────
(function () {
  const counters = document.querySelectorAll('.stat-item strong, .hero-stat-item strong');
  if (!counters.length) return;

  const animate = (el) => {
    const text  = el.textContent;
    const match = text.match(/^(\d+)/);
    if (!match) return;
    const target = parseInt(match[1], 10);
    const suffix = text.replace(match[1], '');
    let current  = 0;
    const step   = Math.max(1, Math.ceil(target / 60));
    const timer  = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = current + suffix;
      if (current >= target) clearInterval(timer);
    }, 16);
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { animate(e.target); observer.unobserve(e.target); } });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
})();

// ── Auto-dismiss flash alerts ─────────────────────────────────────
(function () {
  document.querySelectorAll('.form-alert, .flash-alert').forEach(alert => {
    setTimeout(() => { alert.style.opacity = '0'; setTimeout(() => alert.remove(), 500); }, 6000);
  });
})();
