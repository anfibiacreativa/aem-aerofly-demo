function observeReveal(root) {
  const revealItems = root.querySelectorAll('.af-immersive-reveal');
  if (!revealItems.length || typeof IntersectionObserver === 'undefined') return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, {
    threshold: 0.2,
    rootMargin: '0px 0px -80px 0px',
  });

  revealItems.forEach((item) => observer.observe(item));
}

function parseMetricValue(valueText) {
  const cleaned = valueText.trim();
  const match = cleaned.match(/([\d.]+)/);
  if (!match) return null;

  const numericValue = Number.parseFloat(match[1]);
  if (Number.isNaN(numericValue)) return null;

  return {
    target: numericValue,
    prefix: cleaned.slice(0, match.index),
    suffix: cleaned.slice((match.index ?? 0) + match[1].length),
    decimals: match[1].includes('.') ? match[1].split('.')[1].length : 0,
  };
}

function animateMetrics(root) {
  const values = [...root.querySelectorAll('.af-immersive-hero__stat-value')];
  const metrics = values
    .map((element) => ({ element, config: parseMetricValue(element.textContent || '') }))
    .filter((entry) => entry.config);

  if (!metrics.length || typeof IntersectionObserver === 'undefined') return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      observer.unobserve(entry.target);

      metrics.forEach(({ element, config }, index) => {
        window.setTimeout(() => {
          const start = performance.now();
          const duration = 1300;

          const tick = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = progress === 1 ? 1 : 1 - (2 ** (-10 * progress));
            const current = config.decimals > 0
              ? (config.target * eased).toFixed(config.decimals)
              : Math.round(config.target * eased).toString();

            element.textContent = `${config.prefix}${current}${config.suffix}`;

            if (progress < 1) {
              requestAnimationFrame(tick);
            }
          };

          requestAnimationFrame(tick);
        }, index * 120);
      });
    });
  }, {
    threshold: 0.45,
  });

  observer.observe(root);
}

function enableParallax(block) {
  const media = block.querySelector('.af-immersive-hero__media');
  if (!media) return;

  let ticking = false;

  const updateParallax = () => {
    const rect = block.getBoundingClientRect();
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    const progress = (viewportHeight - rect.top) / (viewportHeight + rect.height);
    const clamped = Math.max(0, Math.min(1, progress));
    const shift = (clamped - 0.5) * 36;
    media.style.setProperty('--immersive-parallax', `${shift.toFixed(2)}px`);
    ticking = false;
  };

  updateParallax();

  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(updateParallax);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
}

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

  const mediaGrid = document.createElement('div');
  mediaGrid.className = 'af-immersive-hero__grid';
  media.appendChild(mediaGrid);

  const picture = rows[0]?.querySelector('picture');
  if (picture) {
    const clonedPicture = picture.cloneNode(true);
    const image = clonedPicture.querySelector('img');
    if (image) image.classList.add('af-immersive-hero__image');
    media.appendChild(clonedPicture);
  }

  const kickerStrong = rows[1]?.querySelector('strong');
  if (kickerStrong) {
    const kicker = document.createElement('span');
    kicker.className = 'af-immersive-hero__kicker af-immersive-reveal';
    kicker.textContent = kickerStrong.textContent.trim();
    copy.appendChild(kicker);
  }

  const heading = rows[2]?.querySelector('h1, h2');
  if (heading) {
    heading.className = 'af-immersive-hero__heading af-immersive-reveal af-immersive-reveal--delay-1';
    copy.appendChild(heading);
  }

  if (rows[3]) {
    const lead = document.createElement('p');
    lead.className = 'af-immersive-hero__lead af-immersive-reveal af-immersive-reveal--delay-2';
    lead.textContent = rows[3].textContent.trim();
    copy.appendChild(lead);
  }

  const actionsRow = rows.find((row, index) => index >= 4 && row.querySelector('a'));
  if (actionsRow) {
    const actions = document.createElement('div');
    actions.className = 'af-immersive-hero__actions af-immersive-reveal af-immersive-reveal--delay-3';

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

    statRows.forEach((row, index) => {
      const cells = [...row.children];
      if (cells.length < 2) return;

      const stat = document.createElement('article');
      stat.className = `af-immersive-hero__stat af-immersive-reveal af-immersive-reveal--delay-${Math.min(index + 2, 5)}`;

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

  observeReveal(block);
  animateMetrics(block);
  enableParallax(block);
}
