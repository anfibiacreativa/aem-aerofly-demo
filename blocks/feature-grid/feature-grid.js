export default function decorate(block) {
  const rows = [...block.children];
  block.innerHTML = '';
  block.classList.add('af-feature-grid', 'af-feature-grid--light');

  // Header
  const header = document.createElement('div');
  header.className = 'af-feature-grid__header';

  const h2 = rows[0]?.querySelector('h2');
  if (h2) {
    h2.className = 'af-feature-grid__heading';
    header.appendChild(h2);
  }

  if (rows[1] && !rows[1].querySelector('strong')) {
    const sub = document.createElement('p');
    sub.className = 'af-feature-grid__subheading';
    sub.textContent = rows[1].textContent.trim();
    header.appendChild(sub);
  }

  block.appendChild(header);

  // Grid
  const grid = document.createElement('div');
  grid.className = 'af-feature-grid__grid';

  const featureStartIndex = rows[1] && !rows[1].querySelector('strong') ? 2 : 1;
  const featureRows = rows.slice(featureStartIndex);

  grid.classList.add(`af-feature-grid__grid--cols-${Math.min(featureRows.length, 3)}`);

  featureRows.forEach((row) => {
    const text = row.innerHTML;
    const item = document.createElement('div');
    item.className = 'af-feature-grid__item';

    // Parse: emoji + bold title + "—" + description
    const raw = row.textContent.trim();
    const emojiMatch = raw.match(/^(\p{Emoji_Presentation}|\p{Emoji}\uFE0F?)/u);

    if (emojiMatch) {
      const icon = document.createElement('div');
      icon.className = 'af-feature-grid__icon';
      icon.textContent = emojiMatch[0];
      item.appendChild(icon);
    }

    const content = document.createElement('div');
    content.className = 'af-feature-grid__content';

    const strong = row.querySelector('strong');
    if (strong) {
      const titleText = strong.textContent.replace(/—$/, '').trim();
      const title = document.createElement('div');
      title.className = 'af-feature-grid__title';
      title.textContent = titleText;
      content.appendChild(title);
    }

    // Description: text after the em-dash
    const fullText = row.textContent;
    const dashIndex = fullText.indexOf('—');
    if (dashIndex >= 0) {
      const desc = document.createElement('p');
      desc.className = 'af-feature-grid__description';
      desc.textContent = fullText.substring(dashIndex + 1).trim();
      content.appendChild(desc);
    }

    item.appendChild(content);
    grid.appendChild(item);
  });

  block.appendChild(grid);
}
