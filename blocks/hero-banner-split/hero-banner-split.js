export default function decorate(block) {
  const rows = [...block.children];
  block.innerHTML = '';
  block.classList.add('af-hero-split');

  // Determine layout direction (image-left or image-right)
  const isReversed = block.classList.contains('reversed');

  // Media side
  const mediaSide = document.createElement('div');
  mediaSide.className = 'af-hero-split__media';

  const picture = rows[0]?.querySelector('picture');
  if (picture) {
    const img = picture.querySelector('img');
    if (img) img.classList.add('af-hero-split__image');
    mediaSide.appendChild(picture);
  }

  // Content side
  const contentSide = document.createElement('div');
  contentSide.className = 'af-hero-split__content';

  // Overline
  if (rows[1]) {
    const strong = rows[1].querySelector('strong');
    if (strong) {
      const overline = document.createElement('span');
      overline.className = 'af-hero-split__overline';
      overline.textContent = strong.textContent;
      contentSide.appendChild(overline);
    }
  }

  // Heading
  if (rows[2]) {
    const h1 = rows[2].querySelector('h1, h2');
    if (h1) {
      h1.className = 'af-hero-split__heading';
      contentSide.appendChild(h1);
    }
  }

  // Description
  if (rows[3]) {
    const desc = document.createElement('p');
    desc.className = 'af-hero-split__description';
    desc.textContent = rows[3].textContent.trim();
    contentSide.appendChild(desc);
  }

  // Features list (optional)
  if (rows[4] && !rows[4].querySelector('a')) {
    const features = document.createElement('ul');
    features.className = 'af-hero-split__features';
    const items = rows[4].textContent.split('|').map((s) => s.trim()).filter(Boolean);
    items.forEach((item) => {
      const li = document.createElement('li');
      li.className = 'af-hero-split__feature';
      li.innerHTML = `<svg class="af-hero-split__check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>${item}`;
      features.appendChild(li);
    });
    contentSide.appendChild(features);
  }

  // CTAs
  const ctaRow = rows.find((r) => r.querySelector('a'));
  if (ctaRow) {
    const actions = document.createElement('div');
    actions.className = 'af-hero-split__actions';
    const links = ctaRow.querySelectorAll('a');
    links.forEach((link, i) => {
      link.className = `af-hero-split__cta af-hero-split__cta--${i === 0 ? 'primary' : 'secondary'}`;
      actions.appendChild(link);
    });
    contentSide.appendChild(actions);
  }

  // Append in correct order based on layout
  if (isReversed) {
    block.appendChild(contentSide);
    block.appendChild(mediaSide);
  } else {
    block.appendChild(mediaSide);
    block.appendChild(contentSide);
  }
}
