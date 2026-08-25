/**
 * main.js — ZAYANE
 * Interactions front-end : navbar au scroll, menu mobile, révélation au scroll.
 * Vanilla JS, sans dépendance, prêt à être étendu (filtres boutique, lightbox galerie...).
 */
document.addEventListener('DOMContentLoaded', function () {

  /* ---------- Navbar : changement d'apparence au scroll ---------- */
  const navbar = document.getElementById('navbar');
  const onScroll = () => {
    if (window.scrollY > 40) {
      navbar.classList.add('is-scrolled');
    } else {
      navbar.classList.remove('is-scrolled');
    }
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- Menu hamburger mobile ---------- */
  const toggle = document.getElementById('navbarToggle');
  const nav = document.getElementById('navbarNav');

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Ferme le menu quand on clique un lien
    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  /* ---------- Apparition des sections au scroll (IntersectionObserver) ---------- */
  const revealEls = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            // léger décalage pour un effet "cascade" sur les grilles
            const delay = (index % 4) * 90;
            setTimeout(() => entry.target.classList.add('is-visible'), delay);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    );

    revealEls.forEach((el) => observer.observe(el));
  } else {
    // Fallback : navigateurs sans support IntersectionObserver
    revealEls.forEach((el) => el.classList.add('is-visible'));
  }

});