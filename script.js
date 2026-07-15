/* ============================================================
   La voix des anges — interactions & animations
   ============================================================ */
(function () {
  'use strict';

  /* ---- year ---- */
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  /* ---- nav background on scroll ---- */
  var nav = document.getElementById('nav');
  function onScroll() {
    if (window.scrollY > 40) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---- mobile menu ---- */
  var burger = document.getElementById('burger');
  var links = document.querySelector('.nav__links');
  burger.addEventListener('click', function () {
    burger.classList.toggle('open');
    links.classList.toggle('open');
  });
  links.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () {
      burger.classList.remove('open');
      links.classList.remove('open');
    });
  });

  /* ---- reveal on scroll ---- */
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---- twinkling stars in hero ---- */
  var starsWrap = document.getElementById('stars');
  if (starsWrap && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var count = 26;
    var frag = document.createDocumentFragment();
    for (var i = 0; i < count; i++) {
      var s = document.createElement('i');
      s.style.left = Math.random() * 100 + '%';
      s.style.top = Math.random() * 100 + '%';
      s.style.animationDelay = (Math.random() * 3.5) + 's';
      s.style.transform = 'scale(' + (0.5 + Math.random()) + ')';
      frag.appendChild(s);
    }
    starsWrap.appendChild(frag);
  }

  /* ---- subtle parallax on hero photo ---- */
  var photo = document.querySelector('.hero__photo-frame');
  if (photo && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    window.addEventListener('scroll', function () {
      var y = window.scrollY;
      if (y < window.innerHeight) {
        photo.style.transform = 'translateY(' + (y * 0.06) + 'px)';
      }
    }, { passive: true });
  }
})();
