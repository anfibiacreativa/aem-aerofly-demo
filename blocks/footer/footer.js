export default function decorate(block) {
  const rows = [...block.children];
  block.innerHTML = '';
  block.classList.add('af-footer', 'af-footer--dark');

  const main = document.createElement('div');
  main.className = 'af-footer__main';

  const columns = document.createElement('div');
  columns.className = 'af-footer__columns';

  let copyrightText = '';

  rows.forEach((row) => {
    const text = row.textContent.trim();

    // Copyright row
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

  // Bottom bar
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
