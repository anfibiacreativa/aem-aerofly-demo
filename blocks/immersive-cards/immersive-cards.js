export default function decorate(block) {
  const rows = [...block.children];
  block.innerHTML = '';
  block.classList.add('af-immersive-cards');

  const shell = document.createElement('div');
  shell.className = 'af-immersive-cards__shell';

  const heading = rows[0]?.querySelector('h2, h3');
  if (heading) {
    heading.className = 'af-immersive-cards__heading';
    shell.appendChild(heading);
  }

  if (rows[1]) {
    const intro = document.createElement('p');
    intro.className = 'af-immersive-cards__intro';
    intro.textContent = rows[1].textContent.trim();
    shell.appendChild(intro);
  }

  const grid = document.createElement('div');
  grid.className = 'af-immersive-cards__grid';

  rows.slice(2).forEach((row) => {
    const cells = [...row.children];
    if (cells.length < 3) return;

    const card = document.createElement('article');
    card.className = 'af-immersive-cards__card';

    const label = document.createElement('em');
    label.className = 'af-immersive-cards__label';
    label.textContent = cells[0].textContent.trim();

    const title = document.createElement('strong');
    title.className = 'af-immersive-cards__title';
    title.textContent = cells[1].textContent.trim();

    const body = document.createElement('p');
    body.className = 'af-immersive-cards__body';
    body.textContent = cells[2].textContent.trim();

    card.append(label, title, body);
    grid.appendChild(card);
  });

  shell.appendChild(grid);
  block.appendChild(shell);
}
