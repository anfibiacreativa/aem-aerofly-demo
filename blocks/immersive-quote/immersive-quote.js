function observeReveal(block) {
  const el = block.querySelector('.af-immersive-quote__shell');
  if (!el || typeof IntersectionObserver === 'undefined') return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  observer.observe(el);
}

export default function decorate(block) {
  const rows = [...block.children];
  block.innerHTML = '';
  block.classList.add('af-immersive-quote');

  const shell = document.createElement('div');
  shell.className = 'af-immersive-quote__shell';

  const frame = document.createElement('div');
  frame.className = 'af-immersive-quote__frame';

  const picture = rows[0]?.querySelector('picture');
  const loneImg = rows[0]?.querySelector('img:not(picture img)');

  if (picture) {
    const clone = picture.cloneNode(true);
    const img = clone.querySelector('img');
    if (img) {
      img.loading = 'lazy';
      img.decoding = 'async';
    }
    frame.appendChild(clone);
  } else if (loneImg) {
    const img = loneImg.cloneNode(true);
    img.loading = 'lazy';
    img.decoding = 'async';
    frame.appendChild(img);
  }

  shell.appendChild(frame);

  const quoteRow = rows[1];
  if (quoteRow) {
    const existing = quoteRow.querySelector('blockquote');
    const quote = document.createElement('blockquote');
    quote.className = 'af-immersive-quote__quote';
    if (existing) {
      quote.innerHTML = existing.innerHTML;
    } else {
      quote.textContent = quoteRow.textContent.trim();
    }
    shell.appendChild(quote);
  }

  block.appendChild(shell);
  observeReveal(block);
}
