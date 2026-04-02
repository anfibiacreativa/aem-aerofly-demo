function observeReveal(root) {
  if (typeof IntersectionObserver === 'undefined') return;
  const items = root.querySelectorAll('.af-immersive-gallery__card');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, {
    threshold: 0.18,
    rootMargin: '0px 0px -80px 0px',
  });

  items.forEach((item) => observer.observe(item));
}

export default function decorate(block) {
  const rows = [...block.children];
  block.innerHTML = '';
  block.classList.add('af-immersive-gallery');

  const shell = document.createElement('div');
  shell.className = 'af-immersive-gallery__shell';

  const grid = document.createElement('div');
  grid.className = 'af-immersive-gallery__grid';

  rows.forEach((row, index) => {
    const picture = row.querySelector('picture');
    if (!picture) return;

    const cells = [...row.children];
    const card = document.createElement('article');
    card.className = 'af-immersive-gallery__card';
    card.style.setProperty('--immersive-delay', `${index * 120}ms`);

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
  observeReveal(block);
}
