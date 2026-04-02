import { getMetadata } from '../../scripts/aem.js';

/** Shown when /nav.plain.html is missing or unreachable (e.g. DA without nav doc). */
const DEFAULT_NAV_HTML = `
<div>
  <p><a href="/"><strong>AEROFLY</strong></a></p>
  <ul>
    <li><a href="/men">Men</a></li>
    <li><a href="/women">Women</a></li>
    <li><a href="/running">Running</a></li>
    <li><a href="/training">Training</a></li>
    <li><a href="/collection">Collection</a></li>
    <li><a href="/sale">Sale</a></li>
  </ul>
</div>
`.trim();

// media query match that indicates mobile/tablet width
const isDesktop = window.matchMedia('(min-width: 900px)');

function closeOnEscape(e) {
  if (e.code === 'Escape') {
    const nav = document.getElementById('nav');
    if (nav) {
      const expanded = nav.getAttribute('aria-expanded') === 'true';
      if (expanded) toggleMenu(nav); // eslint-disable-line no-use-before-define
    }
  }
}

function toggleMenu(nav, forceExpanded = null) {
  const expanded = forceExpanded !== null
    ? !forceExpanded
    : nav.getAttribute('aria-expanded') === 'true';
  const button = nav.closest('header')?.querySelector('.nav-hamburger button');

  nav.setAttribute('aria-expanded', expanded ? 'false' : 'true');
  document.body.style.overflowY = expanded ? '' : 'hidden';
  if (button) button.setAttribute('aria-label', expanded ? 'Open navigation' : 'Close navigation');

  if (expanded) {
    window.removeEventListener('keydown', closeOnEscape);
  } else {
    window.addEventListener('keydown', closeOnEscape);
  }
}

function buildNavDom(block, html) {
  const nav = document.createElement('nav');
  nav.id = 'nav';
  nav.innerHTML = html.trim();

  block.classList.add('af-nav', 'af-nav--dark');

  const inner = document.createElement('div');
  inner.className = 'af-nav__inner';

  const strong = nav.querySelector('strong');
  if (strong) {
    const logo = document.createElement('a');
    logo.className = 'af-nav__logo';
    logo.href = '/';
    logo.textContent = strong.textContent;
    inner.appendChild(logo);
  }

  const allLinks = [...nav.querySelectorAll('a')];
  const navLinks = allLinks.filter((a) => a.closest('ul') || !a.querySelector('strong'));
  if (navLinks.length) {
    const navEl = document.createElement('nav');
    navEl.className = 'af-nav__menu';
    navEl.setAttribute('aria-label', 'Main navigation');
    const ul = document.createElement('ul');
    ul.className = 'af-nav__links';
    navLinks.forEach((a) => {
      const li = document.createElement('li');
      a.className = 'af-nav__link';
      li.appendChild(a);
      ul.appendChild(li);
    });
    navEl.appendChild(ul);
    inner.appendChild(navEl);
  }

  const utils = document.createElement('div');
  utils.className = 'af-nav__utils';

  const searchBtn = document.createElement('button');
  searchBtn.className = 'af-nav__icon-btn';
  searchBtn.innerHTML = '<span class="af-nav__icon">🔍</span>';
  searchBtn.setAttribute('aria-label', 'Search');
  utils.appendChild(searchBtn);

  const cartBtn = document.createElement('a');
  cartBtn.className = 'af-nav__cart-btn';
  cartBtn.href = '/cart';
  cartBtn.innerHTML = '<span class="af-nav__icon">🛒</span>';
  cartBtn.setAttribute('aria-label', 'Cart');
  utils.appendChild(cartBtn);

  const hamburger = document.createElement('div');
  hamburger.className = 'nav-hamburger';
  const hamburgerBtn = document.createElement('button');
  hamburgerBtn.setAttribute('aria-label', 'Open navigation');
  hamburgerBtn.innerHTML = '<span class="nav-hamburger-icon"></span>';
  hamburger.appendChild(hamburgerBtn);
  utils.appendChild(hamburger);

  inner.appendChild(utils);

  nav.innerHTML = '';
  nav.setAttribute('aria-expanded', 'false');
  nav.appendChild(inner);

  hamburgerBtn.addEventListener('click', () => toggleMenu(nav));
  isDesktop.addEventListener('change', () => {
    if (isDesktop.matches) toggleMenu(nav, false);
  });

  block.innerHTML = '';
  block.appendChild(nav);

  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      block.classList.add('scrolled');
    } else {
      block.classList.remove('scrolled');
    }
  }, { passive: true });
}

export default async function decorate(block) {
  const navMeta = getMetadata('nav');
  const navPath = navMeta ? new URL(navMeta, window.location).pathname : '/nav';

  let html = '';
  try {
    const resp = await fetch(`${navPath}.plain.html`);
    if (resp.ok) {
      html = await resp.text();
    }
  } catch {
    /* network / CORS */
  }

  if (!html || !html.trim()) {
    html = DEFAULT_NAV_HTML;
  }

  buildNavDom(block, html);
}
