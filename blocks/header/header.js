import { getMetadata } from '../../scripts/aem.js';

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

export default async function decorate(block) {
  // Fetch nav content from DA fragment
  const navMeta = getMetadata('nav');
  const navPath = navMeta ? new URL(navMeta, window.location).pathname : '/nav';

  const resp = await fetch(`${navPath}.plain.html`);
  if (!resp.ok) return;

  const html = await resp.text();

  // Build nav element
  const nav = document.createElement('nav');
  nav.id = 'nav';
  nav.innerHTML = html;

  // Decorate as Aerofly navigation
  block.classList.add('af-nav', 'af-nav--dark');

  const inner = document.createElement('div');
  inner.className = 'af-nav__inner';

  // Logo — first <strong> in the fragment
  const strong = nav.querySelector('strong');
  if (strong) {
    const logo = document.createElement('a');
    logo.className = 'af-nav__logo';
    logo.href = '/';
    logo.textContent = strong.textContent;
    inner.appendChild(logo);
  }

  // Nav links — all <a> except the brand link
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

  // Utility buttons (search + cart)
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

  // Hamburger menu (mobile)
  const hamburger = document.createElement('div');
  hamburger.className = 'nav-hamburger';
  const hamburgerBtn = document.createElement('button');
  hamburgerBtn.setAttribute('aria-label', 'Open navigation');
  hamburgerBtn.innerHTML = '<span class="nav-hamburger-icon"></span>';
  hamburger.appendChild(hamburgerBtn);
  utils.appendChild(hamburger);

  inner.appendChild(utils);

  // Assemble
  nav.innerHTML = '';
  nav.setAttribute('aria-expanded', 'false');
  nav.appendChild(inner);

  // Toggle mobile menu
  hamburgerBtn.addEventListener('click', () => toggleMenu(nav));
  isDesktop.addEventListener('change', () => {
    if (isDesktop.matches) toggleMenu(nav, false);
  });

  block.innerHTML = '';
  block.appendChild(nav);

  // Darken nav background on scroll (used by immersive pages)
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      block.classList.add('scrolled');
    } else {
      block.classList.remove('scrolled');
    }
  }, { passive: true });
}
