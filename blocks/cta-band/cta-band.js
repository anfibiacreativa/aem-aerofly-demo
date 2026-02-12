export default function decorate(block) {
  const rows = [...block.children];
  block.innerHTML = '';
  block.classList.add('af-cta-band', 'af-cta-band--brand');

  const inner = document.createElement('div');
  inner.className = 'af-cta-band__inner';

  const content = document.createElement('div');
  content.className = 'af-cta-band__content';

  // Heading
  const h2 = rows[0]?.querySelector('h2');
  if (h2) {
    h2.className = 'af-cta-band__heading';
    content.appendChild(h2);
  }

  // Subheading
  if (rows[1] && !rows[1].querySelector('a')) {
    const sub = document.createElement('p');
    sub.className = 'af-cta-band__subheading';
    sub.textContent = rows[1].textContent.trim();
    content.appendChild(sub);
  }

  inner.appendChild(content);

  // Actions
  const actionsRow = rows.find((r) => r.querySelector('a'));
  if (actionsRow) {
    const actions = document.createElement('div');
    actions.className = 'af-cta-band__actions';
    const links = actionsRow.querySelectorAll('a');
    links.forEach((link, i) => {
      link.className = `af-cta-band__cta af-cta-band__cta--${i === 0 ? 'primary' : 'secondary'}`;
      actions.appendChild(link);
    });
    inner.appendChild(actions);
  }

  block.appendChild(inner);
}
