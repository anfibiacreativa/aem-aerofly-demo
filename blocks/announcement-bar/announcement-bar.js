export default function decorate(block) {
  const rows = [...block.children];
  block.innerHTML = '';
  block.classList.add('af-announcement', 'af-announcement--default');

  const inner = document.createElement('div');
  inner.className = 'af-announcement__inner';

  const content = rows[0];
  if (content) {
    const message = document.createElement('span');
    message.className = 'af-announcement__message';

    const link = content.querySelector('a');
    if (link) {
      link.className = 'af-announcement__link';
      // Text before the link
      const textBefore = content.textContent.split(link.textContent)[0].trim();
      if (textBefore) message.textContent = textBefore + ' ';
      message.appendChild(link);
    } else {
      message.textContent = content.textContent.trim();
    }

    inner.appendChild(message);
  }

  // Dismiss button
  const dismiss = document.createElement('button');
  dismiss.className = 'af-announcement__dismiss';
  dismiss.innerHTML = '&times;';
  dismiss.setAttribute('aria-label', 'Dismiss');
  dismiss.addEventListener('click', () => {
    block.style.display = 'none';
  });
  inner.appendChild(dismiss);

  block.appendChild(inner);
}
