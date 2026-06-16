// Configuração central do site — substitua os placeholders antes do go-live.
const SITE_CONFIG = {
  whatsapp: '5521999999999',
  demoAnchor: '#contato',
  clientAreaUrl: '#',
  whatsappMessage: 'Olá! Gostaria de conhecer a plataforma SFPM Engenharia.',
  theme: 'system',
  backgrounds: {
    hero: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1200&q=75&auto=format&fit=crop',
    demo: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&q=75&auto=format&fit=crop',
    problems: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&q=75&auto=format&fit=crop',
    cta: 'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c8?w=1200&q=75&auto=format&fit=crop',
  },
};

(function () {
  'use strict';

  var THEME_KEY = 'sfpm-theme';
  var header = document.querySelector('.site-header');
  var menuToggle = document.querySelector('.site-header__toggle');
  var mobileMenu = document.querySelector('.site-header__mobile');
  var mobileLinks = document.querySelectorAll('.site-header__mobile-link, .site-header__mobile-actions a');
  var themeToggles = document.querySelectorAll('.theme-toggle');
  var faqItems = document.querySelectorAll('.faq-item');
  var tabBtns = document.querySelectorAll('.tabs__btn');
  var tabPanels = document.querySelectorAll('.tabs__panel');
  var revealEls = document.querySelectorAll('.reveal');
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function applyTheme(preference) {
    var root = document.documentElement;
    if (preference === 'light' || preference === 'dark') {
      root.setAttribute('data-theme', preference);
    } else {
      root.removeAttribute('data-theme');
    }
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      var isDark = preference === 'dark' ||
        (preference === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
      meta.setAttribute('content', isDark ? '#0f172a' : '#2563eb');
    }
    if (themeToggles.length) {
      var label = preference === 'dark' ? 'Ativar modo claro' :
        preference === 'light' ? 'Ativar modo escuro' : 'Alternar tema (automático)';
      themeToggles.forEach(function (btn) {
        btn.setAttribute('aria-label', label);
      });
    }
  }

  function getStoredTheme() {
    return localStorage.getItem(THEME_KEY) || SITE_CONFIG.theme || 'system';
  }

  function initTheme() {
    applyTheme(getStoredTheme());

    themeToggles.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var current = getStoredTheme();
        var next = current === 'system' ? 'light' : current === 'light' ? 'dark' : 'system';
        localStorage.setItem(THEME_KEY, next);
        applyTheme(next);
      });
    });

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function () {
      if (getStoredTheme() === 'system') {
        applyTheme('system');
      }
    });
  }

  function initBackgrounds() {
    var map = [
      ['data-bg-hero', SITE_CONFIG.backgrounds.hero],
      ['data-bg-demo', SITE_CONFIG.backgrounds.demo],
      ['data-bg-problems', SITE_CONFIG.backgrounds.problems],
      ['data-bg-cta', SITE_CONFIG.backgrounds.cta],
    ];
    map.forEach(function (item) {
      var imgs = document.querySelectorAll('[' + item[0] + ']');
      imgs.forEach(function (img) {
        if (item[1]) img.src = item[1];
      });
    });
  }

  function initConfig() {
    var waLinks = document.querySelectorAll('[data-whatsapp]');
    var waUrl = 'https://wa.me/' + SITE_CONFIG.whatsapp + '?text=' + encodeURIComponent(SITE_CONFIG.whatsappMessage);
    waLinks.forEach(function (link) {
      link.href = waUrl;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
    });

    document.querySelectorAll('[data-demo]').forEach(function (link) {
      link.href = SITE_CONFIG.demoAnchor;
    });

    document.querySelectorAll('[data-client-area]').forEach(function (link) {
      link.href = SITE_CONFIG.clientAreaUrl;
    });
  }

  function initHeaderScroll() {
    if (!header) return;
    function onScroll() {
      header.classList.toggle('site-header--scrolled', window.scrollY > 40);
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
      document.body.style.touchAction = '';
    }

    function openMenu() {
      menuToggle.setAttribute('aria-expanded', 'true');
      mobileMenu.classList.add('is-open');
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
    }

    menuToggle.addEventListener('click', function () {
      if (menuToggle.getAttribute('aria-expanded') === 'true') closeMenu();
      else openMenu();
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
          var q = other.querySelector('.faq-item__question');
          if (q) q.setAttribute('aria-expanded', 'false');
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
      revealEls.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el) { observer.observe(el); });
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
        window.scrollTo({
          top: target.getBoundingClientRect().top + window.scrollY - offset,
          behavior: prefersReducedMotion ? 'auto' : 'smooth',
        });
      });
    });
  }

  initTheme();
  initBackgrounds();
  initConfig();
  initHeaderScroll();
  initMobileMenu();
  initFaq();
  initTabs();
  initReveal();
  initSmoothScroll();
})();
