(function () {
  const html = document.documentElement;
  const themeToggle = document.getElementById('themeToggle');
  const navbar = document.querySelector('.navbar');

  function getStoredTheme() {
    try {
      return localStorage.getItem('theme');
    } catch (e) {
      return null;
    }
  }

  function setStoredTheme(theme) {
    try {
      localStorage.setItem('theme', theme);
    } catch (e) {
    }
  }

  function getPreferredTheme() {
    const stored = getStoredTheme();
    if (stored) return stored;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function applyTheme(theme) {
    html.setAttribute('data-theme', theme);
  }

  applyTheme(getPreferredTheme());

  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      const current = html.getAttribute('data-theme') || 'light';
      const next = current === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      setStoredTheme(next);
    });
  }

  let lastScroll = 0;
  window.addEventListener('scroll', function () {
    const scroll = window.scrollY || window.pageYOffset;
    if (navbar) {
      if (scroll > 10) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }
    lastScroll = scroll;
  }, { passive: true });

  if ('IntersectionObserver' in window) {
    const elements = document.querySelectorAll('.feature-card, .tech-card, .section-header, .dl-option, .dl-download-section, .dl-side-card');
    elements.forEach(function (el, index) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
      el.style.transitionDelay = (index % 3) * 0.08 + 's';
    });

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -80px 0px' });

    elements.forEach(function (el) {
      observer.observe(el);
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

  const typedEl = document.getElementById('typedText');
  if (typedEl) {
    const phrases = ['常驻桌面', '实时课表', '自动隐藏', '换课调休', '自定义提示音'];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function tick() {
      const current = phrases[phraseIndex];
      if (!isDeleting) {
        typedEl.textContent = current.slice(0, charIndex + 1);
        charIndex++;
        if (charIndex === current.length) {
          isDeleting = true;
          setTimeout(tick, 1800);
          return;
        }
        setTimeout(tick, 120);
      } else {
        typedEl.textContent = current.slice(0, charIndex - 1);
        charIndex--;
        if (charIndex === 0) {
          isDeleting = false;
          phraseIndex = (phraseIndex + 1) % phrases.length;
          setTimeout(tick, 400);
          return;
        }
        setTimeout(tick, 60);
      }
    }

    tick();
  }

  var modal = document.getElementById('mirrorModal');
  var closeBtn = document.getElementById('mirrorModalClose');
  var mirrorBtns = document.querySelectorAll('.mirror-dl-btn');
  var platformBtns = document.querySelectorAll('.mirror-platform-btn');

  if (modal) {
    mirrorBtns.forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });

    function closeModal() {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }

    if (closeBtn) {
      closeBtn.addEventListener('click', closeModal);
    }

    modal.addEventListener('click', function (e) {
      if (e.target === modal) {
        closeModal();
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
      }
    });

    platformBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var url = this.getAttribute('data-url');
        if (url) {
          window.open(url, '_blank', 'noopener');
        }
      });
    });
  }
})();