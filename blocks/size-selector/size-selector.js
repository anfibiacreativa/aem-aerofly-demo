export default function decorate(block) {
  const rows = [...block.children];
  block.innerHTML = '';
  block.classList.add('af-size-selector');

  // Header
  const header = document.createElement('div');
  header.className = 'af-size-selector__header';

  const strong = rows[0]?.querySelector('strong');
  if (strong) {
    const heading = document.createElement('span');
    heading.className = 'af-size-selector__heading';
    heading.textContent = strong.textContent;
    header.appendChild(heading);
  }

  const unitMatch = rows[0]?.textContent.match(/\(([^)]+)\)/);
  if (unitMatch) {
    const unit = document.createElement('span');
    unit.className = 'af-size-selector__unit';
    unit.textContent = `(${unitMatch[1]})`;
    header.appendChild(unit);
  }

  block.appendChild(header);

  // Size grid
  if (rows[1]) {
    const grid = document.createElement('div');
    grid.className = 'af-size-selector__grid';

    const sizes = rows[1].textContent.split('|').map((s) => s.trim()).filter(Boolean);
    sizes.forEach((size) => {
      const btn = document.createElement('button');
      btn.className = 'af-size-selector__button';
      btn.type = 'button';

      const val = document.createElement('span');
      val.className = 'af-size-selector__value';
      val.textContent = size;
      btn.appendChild(val);

      btn.addEventListener('click', () => {
        grid.querySelectorAll('.af-size-selector__button').forEach((b) => b.classList.remove('af-size-selector__button--selected'));
        btn.classList.add('af-size-selector__button--selected');
      });

      grid.appendChild(btn);
    });

    block.appendChild(grid);
  }
}
