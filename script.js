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

// ── PROJECT MODALS ──
function openModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;
  modal.classList.remove('open');
  document.body.style.overflow = '';
}
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal.open').forEach(m => {
      m.classList.remove('open');
      document.body.style.overflow = '';
    });
  }
});

// ── CINEMATIC VIDEO PLAYER ──
const mainVideo = document.getElementById('mainVideo');
const vcOverlay = document.getElementById('vcOverlay');
const vcPlayBtn = document.getElementById('vcPlayBtn');
const vcProgress = document.getElementById('vcProgress');
const vcTime = document.getElementById('vcTime');
const vcMute = document.getElementById('vcMute');
const vcFull = document.getElementById('vcFull');
const vcProgressBar = document.querySelector('.vc-progress-bar');

function formatTime(s) {
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return m + ':' + (sec < 10 ? '0' : '') + sec;
}

if (mainVideo) {
  vcOverlay.addEventListener('click', () => {
    if (mainVideo.paused) {
      mainVideo.play();
      vcOverlay.classList.add('playing');
    } else {
      mainVideo.pause();
      vcOverlay.classList.remove('playing');
    }
  });

  mainVideo.addEventListener('timeupdate', () => {
    if (mainVideo.duration) {
      vcProgress.style.width = (mainVideo.currentTime / mainVideo.duration * 100) + '%';
      vcTime.textContent = formatTime(mainVideo.currentTime) + ' / ' + formatTime(mainVideo.duration);
    }
  });

  mainVideo.addEventListener('ended', () => {
    vcOverlay.classList.remove('playing');
    vcProgress.style.width = '0%';
  });

  if (vcProgressBar) {
    vcProgressBar.addEventListener('click', (e) => {
      const rect = vcProgressBar.getBoundingClientRect();
      const ratio = (e.clientX - rect.left) / rect.width;
      mainVideo.currentTime = ratio * mainVideo.duration;
    });
  }

  if (vcMute) {
    vcMute.addEventListener('click', (e) => {
      e.stopPropagation();
      mainVideo.muted = !mainVideo.muted;
      vcMute.style.opacity = mainVideo.muted ? '0.4' : '1';
    });
  }

  if (vcFull) {
    vcFull.addEventListener('click', (e) => {
      e.stopPropagation();
      if (mainVideo.requestFullscreen) mainVideo.requestFullscreen();
    });
  }
}