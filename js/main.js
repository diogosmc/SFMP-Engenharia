const SITE_CONFIG = {
  whatsapp: '5521999999999',
  demoAnchor: '#contato',
  clientAreaUrl: '#',
  whatsappMessage: 'Olá! Gostaria de conhecer a plataforma SFPM Engenharia.',
};

(function () {
  'use strict';

  const header = document.querySelector('.site-header');
  const menuToggle = document.querySelector('.site-header__toggle');
  const mobileMenu = document.querySelector('.site-header__mobile');
  const mobileLinks = document.querySelectorAll('.site-header__mobile-link, .site-header__mobile-actions a');
  const faqItems = document.querySelectorAll('.faq-item');
  const tabBtns = document.querySelectorAll('.tabs__btn');
  const tabPanels = document.querySelectorAll('.tabs__panel');
  const revealEls = document.querySelectorAll('.reveal');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function initConfig() {
    const waLinks = document.querySelectorAll('[data-whatsapp]');
    const waUrl = 'https://wa.me/' + SITE_CONFIG.whatsapp + '?text=' + encodeURIComponent(SITE_CONFIG.whatsappMessage);
    waLinks.forEach(function (link) {
      link.href = waUrl;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
    });

    const demoLinks = document.querySelectorAll('[data-demo]');
    demoLinks.forEach(function (link) {
      link.href = SITE_CONFIG.demoAnchor;
    });

    const clientLinks = document.querySelectorAll('[data-client-area]');
    clientLinks.forEach(function (link) {
      link.href = SITE_CONFIG.clientAreaUrl;
    });
  }

  function initHeaderScroll() {
    if (!header) return;

    function onScroll() {
      if (window.scrollY > 40) {
        header.classList.add('site-header--scrolled');
      } else {
        header.classList.remove('site-header--scrolled');
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  function initMobileMenu() {
    if (!menuToggle || !mobileMenu) return;

    function closeMenu() {
      menuToggle.setAttribute('aria-expanded', 'false');
      mobileMenu.classList.remove('is-open');
      document.body.style.overflow = '';
    }

    function openMenu() {
      menuToggle.setAttribute('aria-expanded', 'true');
      mobileMenu.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    }

    menuToggle.addEventListener('click', function () {
      var isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    mobileLinks.forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && mobileMenu.classList.contains('is-open')) {
        closeMenu();
        menuToggle.focus();
      }
    });
  }

  function initFaq() {
    faqItems.forEach(function (item) {
      var question = item.querySelector('.faq-item__question');
      if (!question) return;

      question.addEventListener('click', function () {
        var isOpen = item.classList.contains('is-open');

        faqItems.forEach(function (other) {
          other.classList.remove('is-open');
          other.querySelector('.faq-item__question').setAttribute('aria-expanded', 'false');
        });

        if (!isOpen) {
          item.classList.add('is-open');
          question.setAttribute('aria-expanded', 'true');
        }
      });
    });
  }

  function initTabs() {
    tabBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var target = btn.getAttribute('data-tab');

        tabBtns.forEach(function (b) {
          b.classList.remove('is-active');
          b.setAttribute('aria-selected', 'false');
        });
        tabPanels.forEach(function (panel) {
          panel.classList.remove('is-active');
        });

        btn.classList.add('is-active');
        btn.setAttribute('aria-selected', 'true');
        var panel = document.getElementById('tab-' + target);
        if (panel) panel.classList.add('is-active');
      });
    });
  }

  function initReveal() {
    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      revealEls.forEach(function (el) {
        el.classList.add('is-visible');
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  }

  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        var id = anchor.getAttribute('href');
        if (id === '#') return;
        var target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        var offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-height')) || 72;
        var top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: top, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
      });
    });
  }

  initConfig();
  initHeaderScroll();
  initMobileMenu();
  initFaq();
  initTabs();
  initReveal();
  initSmoothScroll();
})();
