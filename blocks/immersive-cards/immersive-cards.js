function observeReveal(root) {
  if (typeof IntersectionObserver === 'undefined') return;
  const items = root.querySelectorAll('.af-immersive-cards__card, .af-immersive-cards__shell');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -60px 0px',
  });

  items.forEach((item) => observer.observe(item));
}

function enableCardGlow(grid) {
  grid.addEventListener('mousemove', (e) => {
    const cards = grid.querySelectorAll('.af-immersive-cards__card');
    cards.forEach((card) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
}

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

  rows.slice(2).forEach((row, index) => {
    const cells = [...row.children];
    if (cells.length < 3) return;

    const card = document.createElement('article');
    card.className = 'af-immersive-cards__card';
    card.style.setProperty('--immersive-delay', `${index * 120}ms`);

    const label = document.createElement('em');
    label.className = 'af-immersive-cards__label';
    label.textContent = cells[0].textContent.trim();

    const title = document.createElement('strong');
    title.className = 'af-immersive-cards__title';
    title.textContent = cells[1].textContent.trim();

    const body = document.createElement('p');
    body.className = 'af-immersive-cards__body';
    body.textContent = cells[2].textContent.trim();

    const meter = document.createElement('div');
    meter.className = 'af-immersive-cards__meter';
    const fill = document.createElement('span');
    fill.className = 'af-immersive-cards__meter-fill';
    fill.style.setProperty('--immersive-meter-target', `${[88, 76, 92, 68][index % 4]}%`);
    meter.appendChild(fill);

    card.append(label, title, body, meter);
    grid.appendChild(card);
  });

  shell.appendChild(grid);
  block.appendChild(shell);
  observeReveal(block);
  enableCardGlow(grid);
}
