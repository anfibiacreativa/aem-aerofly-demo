export default function decorate(block) {
  const rows = [...block.children];
  block.innerHTML = '';
  block.classList.add('af-value-prop', 'af-value-prop--light');

  const inner = document.createElement('div');
  inner.className = 'af-value-prop__inner';

  const firstRow = rows[0];
  if (firstRow) {
    const raw = firstRow.textContent.trim();
    const emojiMatch = raw.match(/^(\p{Emoji_Presentation}|\p{Emoji}\uFE0F?)/u);
    if (emojiMatch) {
      const icon = document.createElement('div');
      icon.className = 'af-value-prop__icon';
      icon.textContent = emojiMatch[0];
      inner.appendChild(icon);
    }
  }

  const content = document.createElement('div');
  content.className = 'af-value-prop__content';

  const h2 = rows[0]?.querySelector('h2') || rows[1]?.querySelector('h2');
  if (h2) {
    h2.className = 'af-value-prop__heading';
    content.appendChild(h2);
  }

  const textRow = rows.find((r) => r.textContent.trim() && !r.querySelector('h2') && !r.querySelector('a'));
  if (textRow) {
    const p = document.createElement('p');
    p.className = 'af-value-prop__text';
    p.textContent = textRow.textContent.trim();
    content.appendChild(p);
  }

  const linkRow = rows.find((r) => r.querySelector('a'));
  if (linkRow) {
    const link = linkRow.querySelector('a');
    if (link) {
      link.className = 'af-value-prop__link';
      content.appendChild(link);
    }
  }

  inner.appendChild(content);
  block.appendChild(inner);
}
