(function () {
  const root = document.documentElement;
  const storedTheme = window.localStorage.getItem('adrian-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
  const toggleButton = document.getElementById('theme-toggle');
  const yearSpan = document.getElementById('year');

  function setTheme(mode) {
    if (mode === 'dark') {
      root.setAttribute('data-theme', 'dark');
    } else if (mode === 'light') {
      root.setAttribute('data-theme', 'light');
    } else {
      root.setAttribute('data-theme', prefersDark.matches ? 'dark' : 'light');
    }
  }

  function cycleTheme() {
    const current = root.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    setTheme(next);
    window.localStorage.setItem('adrian-theme', next);
  }

  if (storedTheme === 'light' || storedTheme === 'dark') {
    setTheme(storedTheme);
  } else {
    setTheme('auto');
  }

  prefersDark.addEventListener('change', () => {
    if (!window.localStorage.getItem('adrian-theme')) {
      setTheme('auto');
    }
  });

  if (toggleButton) {
    toggleButton.addEventListener('click', cycleTheme);
  }

  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear().toString();
  }
})();
