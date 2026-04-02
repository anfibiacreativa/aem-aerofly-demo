import { getMetadata } from '../../scripts/aem.js';

/** Shown when /footer.plain.html is missing or unreachable. */
const DEFAULT_FOOTER_HTML = `
<div>
  <p><strong>Shop</strong></p>
  <p><a href="/men">Men</a></p>
  <p><a href="/women">Women</a></p>
  <p><a href="/running">Running</a></p>
  <p><a href="/training">Training</a></p>
  <p><a href="/sale">Sale</a></p>
</div>
<div>
  <p><strong>Company</strong></p>
  <p><a href="/about">About Us</a></p>
  <p><a href="/sustainability">Sustainability</a></p>
  <p><a href="/careers">Careers</a></p>
  <p><a href="/stores">Store Locator</a></p>
</div>
<div>
  <p><strong>Help</strong></p>
  <p><a href="/help">FAQs</a></p>
  <p><a href="/size-guide">Size Guide</a></p>
  <p><a href="/returns">Returns &amp; Exchanges</a></p>
  <p><a href="/newsletter">Newsletter</a></p>
</div>
<div>
  <p>© 2026 Aerofly. All rights reserved.</p>
</div>
`.trim();

/**
 * Decorate footer rows (column groups + copyright)
 * @param {Element} container Element with rows of footer content
 * @param {Element} block The footer block element
 */
function decorateFooterContent(container, block) {
  const rows = [...container.children];
  block.classList.add('af-footer', 'af-footer--dark');

  const main = document.createElement('div');
  main.className = 'af-footer__main';

  const columns = document.createElement('div');
  columns.className = 'af-footer__columns';

  let copyrightText = '';

  rows.forEach((row) => {
    const text = row.textContent.trim();

    if (text.startsWith('©') || text.startsWith('(c)')) {
      copyrightText = text;
      return;
    }

    const strong = row.querySelector('strong');
    if (!strong) return;

    const column = document.createElement('div');
    column.className = 'af-footer__column';

    const title = document.createElement('div');
    title.className = 'af-footer__column-title';
    title.textContent = strong.textContent.replace(/:$/, '');
    column.appendChild(title);

    const linksList = document.createElement('ul');
    linksList.className = 'af-footer__links';

    const links = row.querySelectorAll('a');
    links.forEach((a) => {
      const li = document.createElement('li');
      a.className = 'af-footer__link';
      li.appendChild(a);
      linksList.appendChild(li);
    });

    column.appendChild(linksList);
    columns.appendChild(column);
  });

  main.appendChild(columns);
  block.appendChild(main);

  if (copyrightText) {
    const bottom = document.createElement('div');
    bottom.className = 'af-footer__bottom';
    const p = document.createElement('p');
    p.className = 'af-footer__bottom-text';
    p.textContent = copyrightText;
    bottom.appendChild(p);
    block.appendChild(bottom);
  }
}

export default async function decorate(block) {
  const footerMeta = getMetadata('footer');
  const footerPath = footerMeta
    ? new URL(footerMeta, window.location).pathname
    : '/footer';

  let html = '';
  try {
    const resp = await fetch(`${footerPath}.plain.html`);
    if (resp.ok) {
      html = await resp.text();
    }
  } catch {
    /* network / CORS */
  }

  if (!html || !html.trim()) {
    html = DEFAULT_FOOTER_HTML;
  }

  const fragment = document.createElement('div');
  fragment.innerHTML = html.trim();

  block.innerHTML = '';
  decorateFooterContent(fragment, block);
}
