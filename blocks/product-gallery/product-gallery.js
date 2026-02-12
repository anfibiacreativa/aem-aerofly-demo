export default function decorate(block) {
  const rows = [...block.children];
  block.innerHTML = '';
  block.classList.add('af-product-gallery', 'af-product-gallery--grid', 'af-product-gallery--cols-2', 'af-product-gallery--gap-md');

  // First image is featured
  rows.forEach((row, i) => {
    const picture = row.querySelector('picture');
    if (!picture) return;

    const item = document.createElement('div');
    item.className = 'af-product-gallery__item';
    if (i === 0) item.classList.add('af-product-gallery__item--featured');

    const wrapper = document.createElement('div');
    wrapper.className = 'af-product-gallery__image-wrapper';

    const img = picture.querySelector('img');
    if (img) img.classList.add('af-product-gallery__image');
    wrapper.appendChild(picture);

    item.appendChild(wrapper);
    block.appendChild(item);
  });

  // If we have a featured item, switch to featured layout
  if (rows.length > 2) {
    block.classList.remove('af-product-gallery--grid');
    block.classList.add('af-product-gallery--featured');
  }
}
