export default function decorate(block) {
  // Create semantic structure
  const rows = [...block.children];
  block.innerHTML = '';
  block.classList.add('af-hero', 'af-hero--dark');

  // Background
  const bgDiv = document.createElement('div');
  bgDiv.className = 'af-hero__background';

  const picture = rows[0]?.querySelector('picture');
  if (picture) {
    const img = picture.querySelector('img');
    if (img) img.classList.add('af-hero__image');
    bgDiv.appendChild(picture);
  }

  const overlay = document.createElement('div');
  overlay.className = 'af-hero__overlay';
  bgDiv.appendChild(overlay);
  block.appendChild(bgDiv);

  // Content
  const content = document.createElement('div');
  content.className = 'af-hero__content';

  // Overline (bold text row)
  if (rows[1]) {
    const strong = rows[1].querySelector('strong');
    if (strong) {
      const overline = document.createElement('span');
      overline.className = 'af-hero__overline';
      overline.textContent = strong.textContent;
      content.appendChild(overline);
    }
  }

  // Heading
  if (rows[2]) {
    const h1 = rows[2].querySelector('h1');
    if (h1) {
      h1.className = 'af-hero__heading';
      content.appendChild(h1);
    }
  }

  // Subheading
  if (rows[3]) {
    const sub = document.createElement('p');
    sub.className = 'af-hero__subheading';
    sub.textContent = rows[3].textContent.trim();
    content.appendChild(sub);
  }

  // CTAs
  if (rows[4]) {
    const actions = document.createElement('div');
    actions.className = 'af-hero__actions';
    const links = rows[4].querySelectorAll('a');
    links.forEach((link, i) => {
      link.className = `af-hero__cta af-hero__cta--${i === 0 ? 'primary' : 'secondary'}`;
      actions.appendChild(link);
    });
    content.appendChild(actions);
  }

  block.appendChild(content);
}
