export default function decorate(block) {
  const rows = [...block.children];
  block.innerHTML = '';
  block.classList.add('af-categories');

  // Header
  const h2 = rows[0]?.querySelector('h2');
  if (h2) {
    const header = document.createElement('div');
    header.className = 'af-categories__header';
    h2.className = 'af-categories__heading';
    header.appendChild(h2);
    block.appendChild(header);
  }

  // Grid
  const grid = document.createElement('div');
  grid.className = 'af-categories__grid';

  const catRows = rows.slice(1);
  catRows.forEach((row) => {
    const link = row.querySelector('a');
    const picture = row.querySelector('picture');
    const text = row.textContent.trim();
    const countMatch = text.match(/\((\d+ products?)\)/);

    const tile = document.createElement('a');
    tile.className = 'af-categories__tile';
    tile.href = link ? link.href : '#';

    const imgWrapper = document.createElement('div');
    imgWrapper.className = 'af-categories__image-wrapper';

    if (picture) {
      const img = picture.querySelector('img');
      if (img) img.classList.add('af-categories__image');
      imgWrapper.appendChild(picture);
    }

    const overlayDiv = document.createElement('div');
    overlayDiv.className = 'af-categories__overlay';
    imgWrapper.appendChild(overlayDiv);

    const content = document.createElement('div');
    content.className = 'af-categories__content';

    const name = document.createElement('div');
    name.className = 'af-categories__name';
    name.textContent = link ? link.textContent : '';
    content.appendChild(name);

    if (countMatch) {
      const count = document.createElement('div');
      count.className = 'af-categories__count';
      count.textContent = countMatch[1];
      content.appendChild(count);
    }

    imgWrapper.appendChild(content);
    tile.appendChild(imgWrapper);
    grid.appendChild(tile);
  });

  block.appendChild(grid);
}
