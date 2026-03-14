export default function decorate(block) {
  const rows = [...block.children];
  block.innerHTML = '';
  block.classList.add('af-add-to-cart');

  // Container
  const container = document.createElement('div');
  container.className = 'af-add-to-cart__container';

  // Quantity selector
  const quantityWrapper = document.createElement('div');
  quantityWrapper.className = 'af-add-to-cart__quantity';

  const decreaseBtn = document.createElement('button');
  decreaseBtn.className = 'af-add-to-cart__qty-btn af-add-to-cart__qty-btn--decrease';
  decreaseBtn.type = 'button';
  decreaseBtn.setAttribute('aria-label', 'Decrease quantity');
  decreaseBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"></line></svg>';

  const quantityInput = document.createElement('input');
  quantityInput.className = 'af-add-to-cart__qty-input';
  quantityInput.type = 'number';
  quantityInput.min = '1';
  quantityInput.max = '99';
  quantityInput.value = '1';
  quantityInput.setAttribute('aria-label', 'Quantity');

  const increaseBtn = document.createElement('button');
  increaseBtn.className = 'af-add-to-cart__qty-btn af-add-to-cart__qty-btn--increase';
  increaseBtn.type = 'button';
  increaseBtn.setAttribute('aria-label', 'Increase quantity');
  increaseBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>';

  // Quantity logic
  decreaseBtn.addEventListener('click', () => {
    const val = parseInt(quantityInput.value, 10);
    if (val > 1) quantityInput.value = val - 1;
    updateButtonStates();
  });

  increaseBtn.addEventListener('click', () => {
    const val = parseInt(quantityInput.value, 10);
    if (val < 99) quantityInput.value = val + 1;
    updateButtonStates();
  });

  quantityInput.addEventListener('change', () => {
    let val = parseInt(quantityInput.value, 10);
    if (Number.isNaN(val) || val < 1) val = 1;
    if (val > 99) val = 99;
    quantityInput.value = val;
    updateButtonStates();
  });

  function updateButtonStates() {
    const val = parseInt(quantityInput.value, 10);
    decreaseBtn.disabled = val <= 1;
    increaseBtn.disabled = val >= 99;
  }

  quantityWrapper.appendChild(decreaseBtn);
  quantityWrapper.appendChild(quantityInput);
  quantityWrapper.appendChild(increaseBtn);
  container.appendChild(quantityWrapper);

  // Add to cart button
  const addButton = document.createElement('button');
  addButton.className = 'af-add-to-cart__button';
  addButton.type = 'button';

  // Get button text from content or use default
  const buttonText = rows[0]?.textContent.trim() || 'Add to Cart';
  addButton.innerHTML = `
    <svg class="af-add-to-cart__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M6 6h15l-1.5 9h-12z"></path>
      <circle cx="9" cy="20" r="1"></circle>
      <circle cx="18" cy="20" r="1"></circle>
      <path d="M2 2h3l1 4"></path>
    </svg>
    <span class="af-add-to-cart__text">${buttonText}</span>
  `;

  // Add to cart animation
  addButton.addEventListener('click', () => {
    addButton.classList.add('af-add-to-cart__button--loading');
    addButton.disabled = true;

    // Simulate adding to cart
    setTimeout(() => {
      addButton.classList.remove('af-add-to-cart__button--loading');
      addButton.classList.add('af-add-to-cart__button--success');

      const textSpan = addButton.querySelector('.af-add-to-cart__text');
      textSpan.textContent = 'Added!';

      setTimeout(() => {
        addButton.classList.remove('af-add-to-cart__button--success');
        addButton.disabled = false;
        textSpan.textContent = buttonText;
      }, 2000);
    }, 800);

    // Dispatch custom event for cart integration
    block.dispatchEvent(new CustomEvent('addtocart', {
      bubbles: true,
      detail: {
        quantity: parseInt(quantityInput.value, 10),
      },
    }));
  });

  container.appendChild(addButton);
  block.appendChild(container);

  // Wishlist button (optional - if second row exists)
  if (rows[1]) {
    const wishlistBtn = document.createElement('button');
    wishlistBtn.className = 'af-add-to-cart__wishlist';
    wishlistBtn.type = 'button';
    wishlistBtn.setAttribute('aria-label', 'Add to wishlist');
    wishlistBtn.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
      </svg>
    `;

    wishlistBtn.addEventListener('click', () => {
      wishlistBtn.classList.toggle('af-add-to-cart__wishlist--active');
    });

    container.appendChild(wishlistBtn);
  }

  updateButtonStates();
}
