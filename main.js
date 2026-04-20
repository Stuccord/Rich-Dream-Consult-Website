// ======================== ICONS ========================
lucide.createIcons();

// ======================== MOBILE NAV ========================
const navToggle = document.getElementById('nav-toggle');
const mobileMenu = document.getElementById('mobile-menu');

if (navToggle && mobileMenu) {
  const toggle = () => {
    const isOpen = mobileMenu.classList.toggle('open');
    navToggle.classList.toggle('open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  };

  navToggle.addEventListener('click', toggle);
  navToggle.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') toggle();
  });

  // Close mobile menu on any link click
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      navToggle.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // Close on outside click / escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('open')) toggle();
  });
}

// ======================== SCROLL REVEAL ========================
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

revealElements.forEach(el => {
  el.style.opacity = '0';
  revealObserver.observe(el);
});

// ======================== SMART NAVBAR ========================
const nav = document.getElementById('main-nav');
if (nav) {
  const scrolledClass = () => {
    if (window.scrollY > 80) {
      nav.style.background = 'rgba(10, 10, 11, 0.92)';
      nav.style.backdropFilter = 'blur(24px)';
      nav.style.borderColor = 'rgba(255,255,255,0.06)';
    } else {
      nav.style.background = 'rgba(255, 255, 255, 0.03)';
      nav.style.backdropFilter = 'blur(12px)';
      nav.style.borderColor = 'rgba(255,255,255,0.08)';
    }
  };
  window.addEventListener('scroll', scrolledClass, { passive: true });
}

// ======================== MOUSE GLOW ========================
const meshBg = document.querySelector('.mesh-bg');
if (meshBg) {
  let ticking = false;
  document.addEventListener('mousemove', (e) => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      meshBg.style.background = `
        radial-gradient(circle at ${x}% ${y}%, rgba(197, 160, 89, 0.08) 0%, transparent 45%),
        radial-gradient(circle at 0% 0%, rgba(197, 160, 89, 0.04) 0%, transparent 50%),
        #0A0A0B
      `;
      ticking = false;
    });
  });
}

// ======================== SMOOTH SCROLL ========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ======================== ACTIVE NAV LINK ========================
const currentPath = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('#nav-menu a, #mobile-menu a').forEach(link => {
  const linkPath = link.getAttribute('href').replace('./', '');
  if (linkPath === currentPath) {
    link.style.color = 'var(--primary)';
    link.style.opacity = '1';
  }
});
