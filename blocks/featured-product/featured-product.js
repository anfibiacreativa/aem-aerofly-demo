export default function decorate(block) {
  const rows = [...block.children];
  block.innerHTML = '';
  block.classList.add('af-featured-product');

  // Gallery section
  const gallery = document.createElement('div');
  gallery.className = 'af-featured-product__gallery';

  // Main image
  const mainImageWrapper = document.createElement('div');
  mainImageWrapper.className = 'af-featured-product__main-image';

  const mainPicture = rows[0]?.querySelector('picture');
  if (mainPicture) {
    const img = mainPicture.querySelector('img');
    if (img) img.classList.add('af-featured-product__image');
    mainImageWrapper.appendChild(mainPicture.cloneNode(true));
  }

  // Badge (optional)
  const badgeText = rows.find((r) => r.querySelector('strong') && !r.querySelector('h1, h2, h3'));
  if (badgeText) {
    const strong = badgeText.querySelector('strong');
    if (strong && strong.textContent.length < 20) {
      const badge = document.createElement('span');
      badge.className = 'af-featured-product__badge';
      badge.textContent = strong.textContent;
      mainImageWrapper.appendChild(badge);
    }
  }

  gallery.appendChild(mainImageWrapper);

  // Thumbnails (from additional images)
  const additionalImages = rows.filter((r, i) => i > 0 && r.querySelector('picture'));
  if (additionalImages.length > 0) {
    const thumbs = document.createElement('div');
    thumbs.className = 'af-featured-product__thumbnails';

    // Add main image as first thumb
    if (mainPicture) {
      const thumb = document.createElement('button');
      thumb.className = 'af-featured-product__thumb af-featured-product__thumb--active';
      thumb.type = 'button';
      const thumbPic = mainPicture.cloneNode(true);
      thumb.appendChild(thumbPic);
      thumbs.appendChild(thumb);
    }

    additionalImages.forEach((row) => {
      const pic = row.querySelector('picture');
      if (pic) {
        const thumb = document.createElement('button');
        thumb.className = 'af-featured-product__thumb';
        thumb.type = 'button';
        thumb.appendChild(pic.cloneNode(true));
        thumbs.appendChild(thumb);
      }
    });

    // Thumbnail click handler
    thumbs.querySelectorAll('.af-featured-product__thumb').forEach((thumb) => {
      thumb.addEventListener('click', () => {
        thumbs.querySelectorAll('.af-featured-product__thumb').forEach((t) => t.classList.remove('af-featured-product__thumb--active'));
        thumb.classList.add('af-featured-product__thumb--active');

        const pic = thumb.querySelector('picture');
        if (pic) {
          mainImageWrapper.innerHTML = '';
          mainImageWrapper.appendChild(pic.cloneNode(true));
          if (badgeText) {
            const strong = badgeText.querySelector('strong');
            if (strong && strong.textContent.length < 20) {
              const badge = document.createElement('span');
              badge.className = 'af-featured-product__badge';
              badge.textContent = strong.textContent;
              mainImageWrapper.appendChild(badge);
            }
          }
        }
      });
    });

    gallery.appendChild(thumbs);
  }

  block.appendChild(gallery);

  // Details section
  const details = document.createElement('div');
  details.className = 'af-featured-product__details';

  // Find text content rows (not images)
  const textRows = rows.filter((r) => !r.querySelector('picture') || r.querySelector('h1, h2, h3'));

  // Heading
  const headingRow = textRows.find((r) => r.querySelector('h1, h2, h3'));
  if (headingRow) {
    const h = headingRow.querySelector('h1, h2, h3');
    if (h) {
      h.className = 'af-featured-product__title';
      details.appendChild(h);
    }
  }

  // Price
  const priceRow = textRows.find((r) => r.textContent.includes('$'));
  if (priceRow) {
    const priceWrapper = document.createElement('div');
    priceWrapper.className = 'af-featured-product__price-wrapper';

    const text = priceRow.textContent;
    const prices = text.match(/\$[\d,.]+/g);

    if (prices && prices.length >= 2) {
      const originalPrice = document.createElement('span');
      originalPrice.className = 'af-featured-product__price af-featured-product__price--original';
      originalPrice.textContent = prices[1];
      priceWrapper.appendChild(originalPrice);

      const salePrice = document.createElement('span');
      salePrice.className = 'af-featured-product__price af-featured-product__price--sale';
      salePrice.textContent = prices[0];
      priceWrapper.appendChild(salePrice);
    } else if (prices) {
      const price = document.createElement('span');
      price.className = 'af-featured-product__price';
      price.textContent = prices[0];
      priceWrapper.appendChild(price);
    }

    details.appendChild(priceWrapper);
  }

  // Rating (stars)
  const ratingRow = textRows.find((r) => r.textContent.includes('★') || r.textContent.includes('star'));
  if (ratingRow) {
    const ratingWrapper = document.createElement('div');
    ratingWrapper.className = 'af-featured-product__rating';

    // Default 5 stars if rating info exists
    const stars = document.createElement('div');
    stars.className = 'af-featured-product__stars';
    stars.innerHTML = '★★★★★';

    const ratingText = document.createElement('span');
    ratingText.className = 'af-featured-product__rating-text';
    ratingText.textContent = ratingRow.textContent.trim();

    ratingWrapper.appendChild(stars);
    ratingWrapper.appendChild(ratingText);
    details.appendChild(ratingWrapper);
  }

  // Description
  const descRow = textRows.find((r) => {
    const text = r.textContent.trim();
    return text.length > 50 && !r.querySelector('h1, h2, h3, a') && !text.includes('$');
  });

  if (descRow) {
    const desc = document.createElement('p');
    desc.className = 'af-featured-product__description';
    desc.textContent = descRow.textContent.trim();
    details.appendChild(desc);
  }

  // Features list
  const featuresRow = textRows.find((r) => r.textContent.includes('|') && r.textContent.length < 200);
  if (featuresRow && featuresRow !== descRow) {
    const features = document.createElement('ul');
    features.className = 'af-featured-product__features';

    const items = featuresRow.textContent.split('|').map((s) => s.trim()).filter(Boolean);
    items.forEach((item) => {
      const li = document.createElement('li');
      li.className = 'af-featured-product__feature';
      li.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>${item}`;
      features.appendChild(li);
    });

    details.appendChild(features);
  }

  // CTA buttons
  const ctaRow = textRows.find((r) => r.querySelector('a'));
  if (ctaRow) {
    const actions = document.createElement('div');
    actions.className = 'af-featured-product__actions';

    const links = ctaRow.querySelectorAll('a');
    links.forEach((link, i) => {
      link.className = `af-featured-product__cta af-featured-product__cta--${i === 0 ? 'primary' : 'secondary'}`;
      actions.appendChild(link);
    });

    details.appendChild(actions);
  }

  block.appendChild(details);
}
