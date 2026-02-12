export default function decorate(block) {
  const rows = [...block.children];
  block.innerHTML = '';
  block.classList.add('af-nav', 'af-nav--default', 'af-nav--dark');

  const inner = document.createElement('div');
  inner.className = 'af-nav__inner';

  // Logo
  const strong = rows[0]?.querySelector('strong');
  if (strong) {
    const logo = document.createElement('a');
    logo.className = 'af-nav__logo';
    logo.href = '/';
    logo.textContent = strong.textContent;
    inner.appendChild(logo);
  }

  // Links
  if (rows[1]) {
    const nav = document.createElement('nav');
    const links = document.createElement('ul');
    links.className = 'af-nav__links';

    const anchors = rows[1].querySelectorAll('a');
    anchors.forEach((a) => {
      const li = document.createElement('li');
      a.className = 'af-nav__link';
      li.appendChild(a);
      links.appendChild(li);
    });

    nav.appendChild(links);
    inner.appendChild(nav);
  }

  // Utils (cart, search icons)
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

  inner.appendChild(utils);
  block.appendChild(inner);
}
