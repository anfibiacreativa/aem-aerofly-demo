export default function decorate(block) {
  const rows = [...block.children];
  block.innerHTML = '';
  block.classList.add('af-immersive-video');

  const shell = document.createElement('div');
  shell.className = 'af-immersive-video__shell';

  const frame = document.createElement('div');
  frame.className = 'af-immersive-video__frame';

  const firstCell = rows[0]?.children[0];
  const videoLink = firstCell?.querySelector('a');
  const videoSource = videoLink?.getAttribute('href') || firstCell?.textContent.trim();
  if (videoSource) {
    const video = document.createElement('video');
    video.src = videoSource;
    video.autoplay = true;
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    frame.appendChild(video);
  }

  const copy = document.createElement('div');
  copy.className = 'af-immersive-video__copy';

  const heading = rows[1]?.querySelector('h2, h3');
  if (heading) {
    heading.className = 'af-immersive-video__heading';
    copy.appendChild(heading);
  }

  if (rows[2]) {
    const body = document.createElement('p');
    body.className = 'af-immersive-video__body';
    body.textContent = rows[2].textContent.trim();
    copy.appendChild(body);
  }

  frame.appendChild(copy);
  shell.appendChild(frame);
  block.appendChild(shell);
}
