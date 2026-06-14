

'use strict';


(function () {
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
  const sections = [];

  navLinks.forEach(link => {
    const id = link.getAttribute('href').replace('#', '');
    const el = document.getElementById(id);
    if (el) sections.push({ id, el, link });
  });

  function onScroll() {
    const scrollY = window.scrollY + 80;
    let current = '';

    sections.forEach(({ id, el }) => {
      if (el.offsetTop <= scrollY) current = id;
    });

    sections.forEach(({ id, link }) => {
      link.classList.toggle('active', id === current);
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

(function () {
  const targets = document.querySelectorAll(
    '.content-card, .conf-index-item, .glossary-item, .pantone-chip, .experience-block, .highlight-box'
  );

  if (!('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  targets.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(18px)';
    el.style.transition = 'opacity 0.45s ease, transform 0.45s ease';
    observer.observe(el);
  });

  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.is-visible').forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
  });
})();


(function () {
  const style = document.createElement('style');
  style.textContent = `.is-visible { opacity: 1 !important; transform: none !important; }`;
  document.head.appendChild(style);
})();

(function () {
  const nav = document.querySelector('nav');
  const navLinks = document.querySelector('.nav-links');
  if (!nav || !navLinks) return;

  let btn = document.querySelector('.nav-toggle');
  if (!btn) {
    btn = document.createElement('button');
    btn.className = 'nav-toggle';
    btn.setAttribute('aria-label', 'Abrir menú / Open menu');
    btn.setAttribute('aria-expanded', 'false');
    btn.innerHTML = `<span></span><span></span><span></span>`;
    nav.appendChild(btn);
  }

  btn.addEventListener('click', () => {
    const open = navLinks.classList.toggle('is-open');
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navLinks.classList.remove('is-open');
      btn.setAttribute('aria-expanded', 'false');
    });
  });
})();


document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const top = target.getBoundingClientRect().top + window.scrollY - 70;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

const brand = document.querySelector('.nav-brand');
if (brand) {
  brand.addEventListener('click', e => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
