/* =====================================================
   PORTFOLIO — JavaScript
   Handles: theme toggle, mobile menu, scroll reveal,
   contact form, and footer year.
   ===================================================== */

/* ---------- 1. Footer year ---------- */
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ---------- 2. Dark / Light theme toggle ---------- */
const themeBtn = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.dataset.theme = savedTheme;
if (themeBtn) themeBtn.textContent = savedTheme === 'dark' ? '☀️' : '🌙';

if (themeBtn) {
  themeBtn.addEventListener('click', () => {
    const current = document.documentElement.dataset.theme;
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    themeBtn.textContent = next === 'dark' ? '☀️' : '🌙';
    localStorage.setItem('theme', next);
  });
}

/* ---------- 3. Mobile menu toggle ---------- */
const menuBtn  = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

if (menuBtn && navLinks) {
  menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  // Close mobile menu when a link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });
}

/* ---------- 4. Scroll reveal using IntersectionObserver ---------- */
const revealItems = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px' });

  revealItems.forEach(el => observer.observe(el));
} else {
  revealItems.forEach(el => el.classList.add('visible'));
}

/* ---------- 5. Contact form (demo) ---------- */
const form      = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');

if (form && submitBtn) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    submitBtn.textContent = "Thank you — I'll be in touch ✓";
    submitBtn.disabled = true;
    form.reset();

    setTimeout(() => {
      submitBtn.textContent = 'Send message ↗';
      submitBtn.disabled = false;
    }, 4000);
  });
}

/* ---------- 6. Lightbox functionality ---------- */
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxExternalLink = document.getElementById('lightboxExternalLink');
const closeBtn = document.querySelector('.close-lightbox');

if (lightbox && lightboxImg && closeBtn) {
  document.addEventListener('click', (e) => {
    const project = e.target.closest('.project');
    if (!project) return;

    e.preventDefault();
    const img = project.querySelector('img');
    const projectUrl = project.getAttribute('href');

    if (img) {
      lightboxImg.src = '';
      lightboxImg.alt = img.alt || 'Full view';
      
      // Update the external link in the lightbox
      if (projectUrl && projectUrl !== "#" && projectUrl !== "") {
        lightboxExternalLink.href = projectUrl;
        lightboxExternalLink.style.display = "inline-block";
      } else {
        lightboxExternalLink.style.display = "none";
      }

      document.body.classList.add('is-lightbox-open');

      lightboxImg.onload = () => {
        lightbox.classList.add('active');
      };
      lightboxImg.src = img.currentSrc || img.src;
    }
  });

  const closeLightbox = () => {
    lightbox.classList.remove('active');
    document.body.classList.remove('is-lightbox-open');
  };

  closeBtn.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) closeLightbox();
  });
}
