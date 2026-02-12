export default function decorate(block) {
  const rows = [...block.children];
  block.innerHTML = '';
  block.classList.add('af-testimonials', 'af-testimonials--light');

  // Heading
  const h2 = rows[0]?.querySelector('h2');
  if (h2) {
    h2.className = 'af-testimonials__heading';
    block.appendChild(h2);
  }

  // Cards row
  const cardRow = document.createElement('div');
  cardRow.className = 'af-testimonials__row';

  rows.slice(1).forEach((row) => {
    const text = row.textContent.trim();
    if (!text) return;

    const card = document.createElement('div');
    card.className = 'af-testimonials__card';

    // Quote mark
    const qm = document.createElement('div');
    qm.className = 'af-testimonials__quote-mark';
    qm.textContent = '\u201C';
    card.appendChild(qm);

    // Parse: "quote text" — **Author**, Role, ★★★★★
    const dashIndex = text.indexOf('—');
    const quoteText = dashIndex >= 0 ? text.substring(0, dashIndex).replace(/^[""\u201C]|[""\u201D]$/g, '').trim() : text;
    const metaText = dashIndex >= 0 ? text.substring(dashIndex + 1).trim() : '';

    const quote = document.createElement('p');
    quote.className = 'af-testimonials__quote';
    quote.textContent = quoteText.replace(/^[""]|[""]$/g, '');
    card.appendChild(quote);

    // Stars
    const stars = (text.match(/★/g) || []).length;
    if (stars > 0) {
      const rating = document.createElement('div');
      rating.className = 'af-testimonials__rating';
      for (let i = 0; i < 5; i++) {
        const star = document.createElement('span');
        star.className = 'af-testimonials__star';
        star.textContent = '★';
        if (i >= stars) star.setAttribute('aria-hidden', 'true');
        rating.appendChild(star);
      }
      card.appendChild(rating);
    }

    // Author
    if (metaText) {
      const footer = document.createElement('div');
      footer.className = 'af-testimonials__footer';

      const authorInfo = document.createElement('div');
      authorInfo.className = 'af-testimonials__author-info';

      const strong = row.querySelector('strong');
      if (strong) {
        const author = document.createElement('cite');
        author.className = 'af-testimonials__author';
        author.textContent = strong.textContent;
        authorInfo.appendChild(author);
      }

      // Role: text between author name and stars
      const roleText = metaText
        .replace(strong?.textContent || '', '')
        .replace(/★+/g, '')
        .replace(/,\s*/g, ' ')
        .trim();
      if (roleText) {
        const role = document.createElement('span');
        role.className = 'af-testimonials__role';
        role.textContent = roleText;
        authorInfo.appendChild(role);
      }

      footer.appendChild(authorInfo);
      card.appendChild(footer);
    }

    cardRow.appendChild(card);
  });

  block.appendChild(cardRow);
}
