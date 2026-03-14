export default function decorate(block) {
  const rows = [...block.children];
  block.innerHTML = '';
  block.classList.add('af-hero-video');

  // Background container
  const bgContainer = document.createElement('div');
  bgContainer.className = 'af-hero-video__background';

  // Video element - look for video URL in first row
  const videoUrl = rows[0]?.querySelector('a')?.href || rows[0]?.textContent.trim();
  if (videoUrl && (videoUrl.endsWith('.mp4') || videoUrl.endsWith('.webm') || videoUrl.includes('video'))) {
    const video = document.createElement('video');
    video.className = 'af-hero-video__video';
    video.autoplay = true;
    video.muted = true;
    video.loop = true;
    video.playsInline = true;

    const source = document.createElement('source');
    source.src = videoUrl;
    source.type = videoUrl.endsWith('.webm') ? 'video/webm' : 'video/mp4';
    video.appendChild(source);

    bgContainer.appendChild(video);
  } else {
    // Fallback to image if no video
    const picture = rows[0]?.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      if (img) img.classList.add('af-hero-video__fallback-image');
      bgContainer.appendChild(picture);
    }
  }

  // Overlay
  const overlay = document.createElement('div');
  overlay.className = 'af-hero-video__overlay';
  bgContainer.appendChild(overlay);
  block.appendChild(bgContainer);

  // Content wrapper
  const content = document.createElement('div');
  content.className = 'af-hero-video__content';

  // Badge/Overline
  if (rows[1]) {
    const strong = rows[1].querySelector('strong');
    if (strong) {
      const badge = document.createElement('span');
      badge.className = 'af-hero-video__badge';
      badge.textContent = strong.textContent;
      content.appendChild(badge);
    }
  }

  // Heading
  if (rows[2]) {
    const h1 = rows[2].querySelector('h1, h2');
    if (h1) {
      h1.className = 'af-hero-video__heading';
      content.appendChild(h1);
    }
  }

  // Subheading
  if (rows[3] && !rows[3].querySelector('a')) {
    const sub = document.createElement('p');
    sub.className = 'af-hero-video__subheading';
    sub.textContent = rows[3].textContent.trim();
    content.appendChild(sub);
  }

  // CTAs
  const ctaRow = rows.find((r, i) => i > 0 && r.querySelector('a'));
  if (ctaRow) {
    const actions = document.createElement('div');
    actions.className = 'af-hero-video__actions';

    const links = ctaRow.querySelectorAll('a');
    links.forEach((link, i) => {
      link.className = `af-hero-video__cta af-hero-video__cta--${i === 0 ? 'primary' : 'secondary'}`;
      actions.appendChild(link);
    });

    content.appendChild(actions);
  }

  block.appendChild(content);

  // Play/Pause button
  const playPauseBtn = document.createElement('button');
  playPauseBtn.className = 'af-hero-video__control';
  playPauseBtn.type = 'button';
  playPauseBtn.setAttribute('aria-label', 'Pause video');
  playPauseBtn.innerHTML = `
    <svg class="af-hero-video__icon af-hero-video__icon--pause" viewBox="0 0 24 24" fill="currentColor">
      <rect x="6" y="4" width="4" height="16"></rect>
      <rect x="14" y="4" width="4" height="16"></rect>
    </svg>
    <svg class="af-hero-video__icon af-hero-video__icon--play" viewBox="0 0 24 24" fill="currentColor">
      <polygon points="5 3 19 12 5 21 5 3"></polygon>
    </svg>
  `;

  playPauseBtn.addEventListener('click', () => {
    const video = block.querySelector('video');
    if (video) {
      if (video.paused) {
        video.play();
        playPauseBtn.classList.remove('af-hero-video__control--paused');
        playPauseBtn.setAttribute('aria-label', 'Pause video');
      } else {
        video.pause();
        playPauseBtn.classList.add('af-hero-video__control--paused');
        playPauseBtn.setAttribute('aria-label', 'Play video');
      }
    }
  });

  block.appendChild(playPauseBtn);
}
