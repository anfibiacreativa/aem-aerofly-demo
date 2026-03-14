export default function decorate(block) {
  const rows = [...block.children];
  block.innerHTML = '';
  block.classList.add('af-product-catalog');

  // Header with optional filters
  const header = document.createElement('div');
  header.className = 'af-product-catalog__header';

  // Title
  const titleRow = rows[0];
  if (titleRow) {
    const h2 = titleRow.querySelector('h2');
    if (h2) {
      h2.className = 'af-product-catalog__title';
      header.appendChild(h2);
    }
  }

  // Filter bar (categories in second row)
  if (rows[1] && !rows[1].querySelector('picture')) {
    const filterBar = document.createElement('div');
    filterBar.className = 'af-product-catalog__filters';

    const categories = rows[1].textContent.split('|').map((s) => s.trim()).filter(Boolean);
    categories.forEach((cat, i) => {
      const btn = document.createElement('button');
      btn.className = 'af-product-catalog__filter';
      btn.type = 'button';
      btn.textContent = cat;
      if (i === 0) btn.classList.add('af-product-catalog__filter--active');

      btn.addEventListener('click', () => {
        filterBar.querySelectorAll('.af-product-catalog__filter').forEach((b) => b.classList.remove('af-product-catalog__filter--active'));
        btn.classList.add('af-product-catalog__filter--active');
        // Filter logic would go here
      });

      filterBar.appendChild(btn);
    });

    header.appendChild(filterBar);
  }

  block.appendChild(header);

  // Product grid
  const grid = document.createElement('div');
  grid.className = 'af-product-catalog__grid';

  // Find product rows (rows with images)
  const productRows = rows.filter((r) => r.querySelector('picture'));

  productRows.forEach((row) => {
    const card = document.createElement('article');
    card.className = 'af-product-catalog__card';

    // Image
    const imageWrapper = document.createElement('div');
    imageWrapper.className = 'af-product-catalog__image-wrapper';

    const picture = row.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      if (img) img.classList.add('af-product-catalog__image');
      imageWrapper.appendChild(picture);
    }

    // Quick view button
    const quickView = document.createElement('button');
    quickView.className = 'af-product-catalog__quick-view';
    quickView.type = 'button';
    quickView.textContent = 'Quick View';
    imageWrapper.appendChild(quickView);

    card.appendChild(imageWrapper);

    // Product info
    const info = document.createElement('div');
    info.className = 'af-product-catalog__info';

    // Extract product details from row content
    const cells = [...row.children];
    const textCell = cells.find((c) => !c.querySelector('picture'));

    if (textCell) {
      // Look for product name (strong or h3)
      const nameEl = textCell.querySelector('strong, h3, h4');
      if (nameEl) {
        const name = document.createElement('h3');
        name.className = 'af-product-catalog__name';
        name.textContent = nameEl.textContent;
        info.appendChild(name);
      }

      // Look for category/type
      const em = textCell.querySelector('em');
      if (em) {
        const category = document.createElement('span');
        category.className = 'af-product-catalog__category';
        category.textContent = em.textContent;
        info.appendChild(category);
      }

      // Look for price (text containing $)
      const text = textCell.textContent;
      const priceMatch = text.match(/\$[\d,.]+/);
      if (priceMatch) {
        const priceWrapper = document.createElement('div');
        priceWrapper.className = 'af-product-catalog__price-wrapper';

        const price = document.createElement('span');
        price.className = 'af-product-catalog__price';
        price.textContent = priceMatch[0];
        priceWrapper.appendChild(price);

        // Check for sale price
        const salePriceMatch = text.match(/\$[\d,.]+.*?(\$[\d,.]+)/);
        if (salePriceMatch) {
          price.classList.add('af-product-catalog__price--sale');
          const originalPrice = document.createElement('span');
          originalPrice.className = 'af-product-catalog__price--original';
          originalPrice.textContent = salePriceMatch[1];
          priceWrapper.insertBefore(originalPrice, price);
        }

        info.appendChild(priceWrapper);
      }

      // Link
      const link = textCell.querySelector('a');
      if (link) {
        const cardLink = document.createElement('a');
        cardLink.className = 'af-product-catalog__link';
        cardLink.href = link.href;
        cardLink.setAttribute('aria-label', `View ${nameEl?.textContent || 'product'}`);
        card.appendChild(cardLink);
      }
    }

    card.appendChild(info);
    grid.appendChild(card);
  });

  block.appendChild(grid);

  // View all link (if present)
  const viewAllRow = rows.find((r) => !r.querySelector('picture') && r.querySelector('a'));
  if (viewAllRow && viewAllRow !== rows[0]) {
    const viewAllLink = viewAllRow.querySelector('a');
    if (viewAllLink) {
      const footer = document.createElement('div');
      footer.className = 'af-product-catalog__footer';
      viewAllLink.className = 'af-product-catalog__view-all';
      footer.appendChild(viewAllLink);
      block.appendChild(footer);
    }
  }
}
