export default function decorate(block) {
  const rows = [...block.children];
  block.innerHTML = '';
  block.classList.add('af-immersive-gallery');

  const shell = document.createElement('div');
  shell.className = 'af-immersive-gallery__shell';

  const grid = document.createElement('div');
  grid.className = 'af-immersive-gallery__grid';

  rows.forEach((row) => {
    const picture = row.querySelector('picture');
    if (!picture) return;

    const cells = [...row.children];
    const card = document.createElement('article');
    card.className = 'af-immersive-gallery__card';

    card.appendChild(picture.cloneNode(true));

    const captionCell = cells[1];
    if (captionCell) {
      const caption = document.createElement('span');
      caption.className = 'af-immersive-gallery__caption';
      caption.textContent = captionCell.textContent.trim();
      card.appendChild(caption);
    }

    grid.appendChild(card);
  });

  shell.appendChild(grid);
  block.appendChild(shell);
}
