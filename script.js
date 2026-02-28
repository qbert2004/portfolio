// ═══════════════════════════════════════
//   MEREY MAUTOVA — IR PORTFOLIO
//   script.js
// ═══════════════════════════════════════

// ── NAVBAR HIDE ON SCROLL ──
let lastY = 0;
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  navbar.classList.toggle('hidden', y > lastY && y > 80);
  lastY = y;
});

// ── REVEAL ON SCROLL ──
const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 80);
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
revealEls.forEach(el => observer.observe(el));

// ── SIDE DOTS ACTIVE STATE ──
const sections = document.querySelectorAll('section');
const dots = document.querySelectorAll('.dot');
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      dots.forEach(d => d.classList.remove('active'));
      const id = e.target.id;
      const dot = document.querySelector(`.dot[data-section="${id}"]`);
      if (dot) dot.classList.add('active');
    }
  });
}, { threshold: 0.4 });
sections.forEach(s => sectionObserver.observe(s));

// ── DOT CLICK SCROLL ──
dots.forEach(dot => {
  dot.addEventListener('click', () => {
    const id = dot.dataset.section;
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  });
});

// ── EMAIL COPY ──
const emailEl = document.getElementById('emailCopy');
const hint = document.getElementById('copyHint');
if (emailEl) {
  emailEl.addEventListener('click', () => {
    navigator.clipboard.writeText(emailEl.textContent.trim()).then(() => {
      hint.classList.add('show');
      setTimeout(() => hint.classList.remove('show'), 2000);
    });
  });
}