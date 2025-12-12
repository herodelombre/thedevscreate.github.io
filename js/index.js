    const root = document.documentElement;
    const toggle = document.getElementById('theme-toggle');
    const thumb = toggle.querySelector('.toggle-thumb');
    const label = toggle.querySelector('span');

    const setTheme = mode => {
      root.setAttribute('data-theme', mode);
      const isDark = mode === 'dark';
      toggle.setAttribute('aria-pressed', isDark);
      thumb.textContent = isDark ? '🌙' : '☀️';
      label.textContent = isDark ? 'Dark' : 'Light';
      localStorage.setItem('lumen-theme', mode);
    };

    const stored = localStorage.getItem('lumen-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(stored || (prefersDark ? 'dark' : 'light'));

    toggle.addEventListener('click', () => {
      const next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      setTheme(next);
    });