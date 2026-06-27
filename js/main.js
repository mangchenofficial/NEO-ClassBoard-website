(function () {
  const html = document.documentElement;
  const themeToggle = document.querySelector('.theme-toggle');
  const mobileToggle = document.querySelector('.mobile-menu-toggle');
  const mainNav = document.querySelector('.main-nav');
  const subscribeForm = document.querySelector('.subscribe-form');
  const formMessage = document.querySelector('.form-message');

  function initTheme() {
    const saved = localStorage.getItem('neocn-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = saved || (prefersDark ? 'dark' : 'light');
    html.setAttribute('data-theme', theme);
  }

  function toggleTheme() {
    const current = html.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('neocn-theme', next);
  }

  function toggleMobileMenu() {
    const isOpen = mainNav.classList.toggle('open');
    mobileToggle.classList.toggle('active', isOpen);
    mobileToggle.setAttribute('aria-expanded', String(isOpen));
    mobileToggle.setAttribute('aria-label', isOpen ? '关闭菜单' : '打开菜单');
  }

  function closeMobileMenu() {
    mainNav.classList.remove('open');
    mobileToggle.classList.remove('active');
    mobileToggle.setAttribute('aria-expanded', 'false');
    mobileToggle.setAttribute('aria-label', '打开菜单');
  }

  function handleSubscribe(event) {
    event.preventDefault();
    const input = subscribeForm.querySelector('input[type="email"]');
    const value = input.value.trim();

    if (!value) {
      showMessage('请输入邮箱地址。', 'error');
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(value)) {
      showMessage('邮箱格式不正确，请检查后再试。', 'error');
      return;
    }

    showMessage('感谢订阅！我们会将最新动态发送到 ' + value, 'success');
    input.value = '';
  }

  function showMessage(text, type) {
    formMessage.textContent = text;
    formMessage.className = 'form-message ' + type;
  }

  initTheme();

  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }

  if (mobileToggle) {
    mobileToggle.addEventListener('click', toggleMobileMenu);
  }

  if (mainNav) {
    mainNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMobileMenu);
    });
  }

  if (subscribeForm) {
    subscribeForm.addEventListener('submit', handleSubscribe);
  }
})();
