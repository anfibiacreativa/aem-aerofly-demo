export default function decorate(block) {
  const rows = [...block.children];
  block.innerHTML = '';
  block.classList.add('af-social-proof', 'af-social-proof--dark');

  const container = document.createElement('div');
  container.className = 'af-social-proof__row';

  rows.forEach((row) => {
    const text = row.textContent.trim();
    const strong = row.querySelector('strong');
    if (!strong) return;

    const stat = document.createElement('div');
    stat.className = 'af-social-proof__stat';

    const value = document.createElement('div');
    value.className = 'af-social-proof__value';
    value.textContent = strong.textContent;

    const label = document.createElement('div');
    label.className = 'af-social-proof__label';
    // Label is the text after the bold value
    label.textContent = text.replace(strong.textContent, '').trim();

    stat.appendChild(value);
    stat.appendChild(label);
    container.appendChild(stat);
  });

  block.appendChild(container);
}
