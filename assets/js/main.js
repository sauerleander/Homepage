const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
const prefersLight = window.matchMedia('(prefers-color-scheme: light)');
const root = document.documentElement;
const body = document.body;
const themeToggle = document.getElementById('theme-toggle');
const searchInput = document.getElementById('site-search');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.getElementById('nav-links');
const searchResults = document.getElementById('search-results');
const resultsList = document.getElementById('results-list');
const sections = [...document.querySelectorAll('section')];

const STORAGE_KEY = 'adrian-theme-preference-v1';

const sectionIndex = sections.map((section) => ({
  id: section.id,
  title: section.querySelector('h2')?.textContent ?? section.dataset.sectionTitle,
  description: section.querySelector('p')?.textContent ?? '',
}));

const projectCards = [...document.querySelectorAll('.project-card')];
const journalCards = [...document.querySelectorAll('.journal-card')];
const favoriteCards = [...document.querySelectorAll('.favorite-card')];

function setTheme(theme) {
  if (theme) {
    root.setAttribute('data-theme', theme);
  } else {
    root.removeAttribute('data-theme');
  }
}

function loadStoredTheme() {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch (error) {
    console.warn('Kann gespeicherte Einstellungen nicht lesen.', error);
    return null;
  }
}

function storeTheme(theme) {
  try {
    if (theme) {
      localStorage.setItem(STORAGE_KEY, theme);
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  } catch (error) {
    console.warn('Kann Einstellungen nicht speichern.', error);
  }
}

function resolveInitialTheme() {
  const stored = loadStoredTheme();
  if (stored) {
    setTheme(stored);
    return;
  }
  if (prefersDark.matches) {
    setTheme('dark');
  } else if (prefersLight.matches) {
    setTheme('light');
  }
}

function toggleTheme() {
  const current = root.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  setTheme(next);
  storeTheme(next);
}

themeToggle?.addEventListener('click', toggleTheme);

prefersDark.addEventListener('change', (event) => {
  if (!loadStoredTheme()) {
    setTheme(event.matches ? 'dark' : 'light');
  }
});

window.addEventListener('DOMContentLoaded', () => {
  resolveInitialTheme();
  const year = document.getElementById('year');
  if (year) {
    year.textContent = new Date().getFullYear();
  }
});

menuToggle?.addEventListener('click', () => {
  const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!expanded));
  navLinks?.classList.toggle('open', !expanded);
});

function searchSections(query) {
  const normalized = query.trim().toLowerCase();
  if (!normalized) {
    searchResults.hidden = true;
    resultsList.innerHTML = '';
    removeHighlights();
    return;
  }

  const matches = sectionIndex
    .map((section) => {
      const text = `${section.title} ${section.description}`.toLowerCase();
      return text.includes(normalized) ? section : null;
    })
    .filter(Boolean);

  resultsList.innerHTML = '';
  if (!matches.length) {
    searchResults.hidden = false;
    const emptyState = document.createElement('li');
    emptyState.textContent = 'Keine Treffer gefunden.';
    resultsList.appendChild(emptyState);
    removeHighlights();
    return;
  }

  matches.forEach((match) => {
    const listItem = document.createElement('li');
    const link = document.createElement('a');
    link.href = `#${match.id}`;
    link.textContent = match.title;
    link.addEventListener('click', () => {
      searchResults.hidden = true;
      removeHighlights();
      highlightSection(match.id);
    });
    const snippet = document.createElement('span');
    snippet.textContent = match.description;
    snippet.classList.add('snippet');
    listItem.appendChild(link);
    listItem.appendChild(snippet);
    resultsList.appendChild(listItem);
  });

  searchResults.hidden = false;
}

function highlightSection(id) {
  const section = document.getElementById(id);
  if (section) {
    section.classList.add('highlight');
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setTimeout(() => {
      section.classList.remove('highlight');
    }, 2400);
  }
}

function removeHighlights() {
  sections.forEach((section) => section.classList.remove('highlight'));
}

searchInput?.addEventListener('input', (event) => {
  const value = event.target.value;
  searchSections(value);
  searchProjects(value);
  searchJournal(value);
  searchFavorites(value);
});

searchInput?.addEventListener('focus', () => {
  if (searchInput.value) {
    searchSections(searchInput.value);
  }
});

window.addEventListener('click', (event) => {
  if (!searchResults.contains(event.target) && event.target !== searchInput) {
    searchResults.hidden = true;
  }
});

// Motion preference: disable animations when user prefers reduced motion
const mediaMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
if (mediaMotion.matches) {
  disableAnimations();
}
mediaMotion.addEventListener('change', (event) => {
  if (event.matches) {
    disableAnimations();
  } else {
    enableAnimations();
  }
});

let originalTransitions = [];

function disableAnimations() {
  originalTransitions = [];
  document.querySelectorAll('*').forEach((element) => {
    const transition = getComputedStyle(element).transition;
    const animation = getComputedStyle(element).animation;
    originalTransitions.push({ element, transition, animation });
    element.style.transition = 'none';
    element.style.animation = 'none';
  });
}

function enableAnimations() {
  originalTransitions.forEach(({ element, transition, animation }) => {
    element.style.transition = transition;
    element.style.animation = animation;
  });
  originalTransitions = [];
}

function searchProjects(query) {
  const normalized = query.trim().toLowerCase();
  if (!normalized) {
    projectCards.forEach((card) => (card.hidden = false));
    return;
  }

  projectCards.forEach((card) => {
    const keywords = card.dataset.keywords ?? '';
    const text = `${card.textContent} ${keywords}`.toLowerCase();
    card.hidden = !text.includes(normalized);
  });
}

function searchJournal(query) {
  const normalized = query.trim().toLowerCase();
  if (!normalized) {
    journalCards.forEach((card) => (card.hidden = false));
    return;
  }

  journalCards.forEach((card) => {
    const keywords = card.dataset.keywords ?? '';
    const text = `${card.textContent} ${keywords}`.toLowerCase();
    card.hidden = !text.includes(normalized);
  });
}

function searchFavorites(query) {
  const normalized = query.trim().toLowerCase();
  if (!normalized) {
    favoriteCards.forEach((card) => (card.hidden = false));
    return;
  }

  favoriteCards.forEach((card) => {
    const text = card.textContent.toLowerCase();
    card.hidden = !text.includes(normalized);
  });
}

// Close search results with Escape key
searchInput?.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    searchInput.value = '';
    searchResults.hidden = true;
    removeHighlights();
    searchProjects('');
    searchJournal('');
    searchFavorites('');
  }
});
