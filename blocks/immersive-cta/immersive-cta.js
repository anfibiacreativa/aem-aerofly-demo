export default function decorate(block) {
  const rows = [...block.children];
  block.innerHTML = '';
  block.classList.add('af-immersive-cta');

  const shell = document.createElement('div');
  shell.className = 'af-immersive-cta__shell';

  const copy = document.createElement('div');
  copy.className = 'af-immersive-cta__copy';

  const headingStrong = rows[0]?.querySelector('strong');
  if (headingStrong) {
    const heading = document.createElement('strong');
    heading.className = 'af-immersive-cta__heading';
    heading.textContent = headingStrong.textContent.trim();
    copy.appendChild(heading);
  }

  if (rows[1]) {
    const body = document.createElement('p');
    body.className = 'af-immersive-cta__body';
    body.textContent = rows[1].textContent.trim();
    copy.appendChild(body);
  }

  shell.appendChild(copy);

  const actionsRow = rows.find((row) => row.querySelector('a'));
  if (actionsRow) {
    const actions = document.createElement('div');
    actions.className = 'af-immersive-cta__actions';
    [...actionsRow.querySelectorAll('a')].forEach((link, index) => {
      link.className = `af-immersive-cta__button af-immersive-cta__button--${index === 0 ? 'primary' : 'secondary'}`;
      actions.appendChild(link);
    });
    shell.appendChild(actions);
  }

  block.appendChild(shell);
}
