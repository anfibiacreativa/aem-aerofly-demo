export default function decorate(block) {
  const rows = [...block.children];
  block.innerHTML = '';
  block.classList.add('af-immersive-hero');

  const shell = document.createElement('div');
  shell.className = 'af-immersive-hero__shell';

  const copy = document.createElement('div');
  copy.className = 'af-immersive-hero__copy';

  const media = document.createElement('div');
  media.className = 'af-immersive-hero__media';

  const picture = rows[0]?.querySelector('picture');
  if (picture) {
    const image = picture.querySelector('img');
    if (image) image.classList.add('af-immersive-hero__image');
    media.appendChild(picture.cloneNode(true));
  }

  const kickerStrong = rows[1]?.querySelector('strong');
  if (kickerStrong) {
    const kicker = document.createElement('span');
    kicker.className = 'af-immersive-hero__kicker';
    kicker.textContent = kickerStrong.textContent.trim();
    copy.appendChild(kicker);
  }

  const heading = rows[2]?.querySelector('h1, h2');
  if (heading) {
    heading.className = 'af-immersive-hero__heading';
    copy.appendChild(heading);
  }

  if (rows[3]) {
    const lead = document.createElement('p');
    lead.className = 'af-immersive-hero__lead';
    lead.textContent = rows[3].textContent.trim();
    copy.appendChild(lead);
  }

  const actionsRow = rows.find((row, index) => index >= 4 && row.querySelector('a'));
  if (actionsRow) {
    const actions = document.createElement('div');
    actions.className = 'af-immersive-hero__actions';

    [...actionsRow.querySelectorAll('a')].forEach((link, index) => {
      link.className = `af-immersive-hero__button af-immersive-hero__button--${index === 0 ? 'primary' : 'secondary'}`;
      actions.appendChild(link);
    });

    copy.appendChild(actions);
  }

  const statRows = rows.filter((row, index) => index > 4 && !row.querySelector('a'));
  if (statRows.length) {
    const stats = document.createElement('div');
    stats.className = 'af-immersive-hero__stats';

    statRows.forEach((row) => {
      const cells = [...row.children];
      if (cells.length < 2) return;

      const stat = document.createElement('article');
      stat.className = 'af-immersive-hero__stat';

      const value = document.createElement('strong');
      value.className = 'af-immersive-hero__stat-value';
      value.textContent = cells[0].textContent.trim();

      const label = document.createElement('span');
      label.className = 'af-immersive-hero__stat-label';
      label.textContent = cells[1].textContent.trim();

      stat.append(value, label);
      stats.appendChild(stat);
    });

    media.appendChild(stats);
  }

  shell.append(copy, media);
  block.appendChild(shell);
}
