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
    threshold: 0.15,
    rootMargin: '0px 0px -60px 0px',
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
          const duration = 2000;

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
        }, index * 150);
      });
    });
  }, { threshold: 0.4 });

  const statsContainer = root.querySelector('.af-immersive-hero__stats');
  if (statsContainer) observer.observe(statsContainer);
}

function enableParallax(block) {
  const media = block.querySelector('.af-immersive-hero__media');
  if (!media) return;

  let ticking = false;

  const update = () => {
    const scrollY = window.scrollY;
    const shift = scrollY * 0.25;
    media.style.setProperty('--immersive-parallax', `${shift.toFixed(1)}px`);
    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  }, { passive: true });

  update();
}

function enableScrollProgress() {
  if (document.querySelector('.immersive-scroll-progress')) return;

  const bar = document.createElement('div');
  bar.className = 'immersive-scroll-progress';
  document.body.appendChild(bar);

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0;
      bar.style.width = `${pct}%`;
      ticking = false;
    });
  }, { passive: true });
}

function injectParallaxOrbs() {
  const main = document.querySelector('main.immersive-v2');
  if (!main || main.querySelector('.immersive-orb')) return;

  for (let i = 1; i <= 3; i += 1) {
    const orb = document.createElement('div');
    orb.className = `immersive-orb immersive-orb--${i}`;
    main.appendChild(orb);
  }

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const { scrollY } = window;
      main.querySelectorAll('.immersive-orb').forEach((orb, idx) => {
        const speed = 0.03 + idx * 0.015;
        const dir = idx % 2 === 0 ? 1 : -1;
        orb.style.transform = `translateY(${scrollY * speed * dir}px)`;
      });
      ticking = false;
    });
  }, { passive: true });
}

function markMainAsImmersive() {
  const main = document.querySelector('main');
  if (main && !main.classList.contains('immersive-v2')) {
    main.classList.add('immersive-v2');
  }
}

function applyRTL(block) {
  const path = window.location.pathname;
  if (path.includes('/sa/') || path.includes('/ar/')) {
    block.setAttribute('dir', 'rtl');
    document.documentElement.setAttribute('dir', 'rtl');
  }
}

function applyLang() {
  const path = window.location.pathname;
  if (path.includes('/ja/')) {
    document.documentElement.lang = 'ja';
  } else if (path.includes('/sa/') || path.includes('/ar/')) {
    document.documentElement.lang = 'ar';
  }
}

function triggerHeroReveals(block) {
  window.setTimeout(() => {
    block.querySelectorAll('.af-immersive-reveal').forEach((el) => {
      el.classList.add('is-visible');
    });
  }, 400);
}

export default function decorate(block) {
  const rows = [...block.children];
  block.innerHTML = '';
  block.classList.add('af-immersive-hero');

  markMainAsImmersive();
  applyRTL(block);
  applyLang();

  // Background media — full bleed (video or image)
  const media = document.createElement('div');
  media.className = 'af-immersive-hero__media';

  const firstCell = rows[0]?.querySelector('a');
  const videoUrl = firstCell?.getAttribute('href') || '';
  const isVideo = /\.(mp4|webm)$/i.test(videoUrl) || videoUrl.includes('video');

  if (isVideo && videoUrl) {
    block.classList.add('af-immersive-hero--video');
    const video = document.createElement('video');
    video.className = 'af-immersive-hero__video';
    video.autoplay = true;
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    video.src = videoUrl;
    media.appendChild(video);
  } else {
    const picture = rows[0]?.querySelector('picture');
    if (picture) {
      const clonedPicture = picture.cloneNode(true);
      const image = clonedPicture.querySelector('img');
      if (image) image.classList.add('af-immersive-hero__image');
      media.appendChild(clonedPicture);
    }
  }
  block.appendChild(media);

  // Glow
  const glow = document.createElement('div');
  glow.className = 'af-immersive-hero__glow';
  block.appendChild(glow);

  // Content overlay
  const content = document.createElement('div');
  content.className = 'af-immersive-hero__content';

  const kickerStrong = rows[1]?.querySelector('strong');
  if (kickerStrong) {
    const kicker = document.createElement('span');
    kicker.className = 'af-immersive-hero__kicker af-immersive-reveal';
    kicker.textContent = kickerStrong.textContent.trim();
    content.appendChild(kicker);
  }

  const heading = rows[2]?.querySelector('h1, h2');
  if (heading) {
    heading.className = 'af-immersive-hero__heading af-immersive-reveal af-immersive-reveal--delay-1';
    content.appendChild(heading);
  }

  if (rows[3]) {
    const lead = document.createElement('p');
    lead.className = 'af-immersive-hero__lead af-immersive-reveal af-immersive-reveal--delay-2';
    lead.textContent = rows[3].textContent.trim();
    content.appendChild(lead);
  }

  const actionsRow = rows.find((row, index) => index >= 4 && row.querySelector('a'));
  if (actionsRow) {
    const actions = document.createElement('div');
    actions.className = 'af-immersive-hero__actions af-immersive-reveal af-immersive-reveal--delay-3';

    [...actionsRow.querySelectorAll('a')].forEach((link, index) => {
      link.className = `af-immersive-hero__button af-immersive-hero__button--${index === 0 ? 'primary' : 'secondary'}`;
      actions.appendChild(link);
    });

    content.appendChild(actions);
  }

  block.appendChild(content);

  // Stats strip
  const statRows = rows.filter((row, index) => index > 4 && !row.querySelector('a'));
  if (statRows.length) {
    const stats = document.createElement('div');
    stats.className = 'af-immersive-hero__stats';

    statRows.forEach((row, index) => {
      const cells = [...row.children];
      if (cells.length < 2) return;

      const stat = document.createElement('article');
      stat.className = `af-immersive-hero__stat af-immersive-reveal af-immersive-reveal--delay-${Math.min(index + 3, 5)}`;

      const value = document.createElement('strong');
      value.className = 'af-immersive-hero__stat-value';
      value.textContent = cells[0].textContent.trim();

      const label = document.createElement('span');
      label.className = 'af-immersive-hero__stat-label';
      label.textContent = cells[1].textContent.trim();

      stat.append(value, label);
      stats.appendChild(stat);
    });

    block.appendChild(stats);
  }

  // Scroll indicator
  const scrollIndicator = document.createElement('div');
  scrollIndicator.className = 'af-immersive-hero__scroll';
  const scrollLine = document.createElement('div');
  scrollLine.className = 'af-immersive-hero__scroll-line';
  scrollIndicator.appendChild(scrollLine);
  scrollIndicator.appendChild(document.createTextNode('Scroll'));
  block.appendChild(scrollIndicator);

  // Play/pause control for video heroes
  if (isVideo) {
    const ctrl = document.createElement('button');
    ctrl.className = 'af-immersive-hero__video-ctrl';
    ctrl.type = 'button';
    ctrl.setAttribute('aria-label', 'Pause video');
    ctrl.innerHTML = `<svg class="af-immersive-hero__icon af-immersive-hero__icon--pause" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg><svg class="af-immersive-hero__icon af-immersive-hero__icon--play" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>`;

    ctrl.addEventListener('click', () => {
      const vid = block.querySelector('.af-immersive-hero__video');
      if (!vid) return;
      if (vid.paused) {
        vid.play();
        ctrl.classList.remove('is-paused');
        ctrl.setAttribute('aria-label', 'Pause video');
      } else {
        vid.pause();
        ctrl.classList.add('is-paused');
        ctrl.setAttribute('aria-label', 'Play video');
      }
    });

    block.appendChild(ctrl);
  }

  // Activate effects
  triggerHeroReveals(block);
  animateMetrics(block);
  if (!isVideo) enableParallax(block);
  enableScrollProgress();
  injectParallaxOrbs();
}
