export default function decorate(block) {
  const rows = [...block.children];
  block.innerHTML = '';
  block.classList.add('af-newsletter');

  const inner = document.createElement('div');
  inner.className = 'af-newsletter__inner';

  // Heading
  const h2 = rows[0]?.querySelector('h2');
  if (h2) {
    h2.className = 'af-newsletter__heading';
    inner.appendChild(h2);
  }

  // Subheading
  if (rows[1] && !rows[1].querySelector('a')) {
    const sub = document.createElement('p');
    sub.className = 'af-newsletter__subheading';
    sub.textContent = rows[1].textContent.trim();
    inner.appendChild(sub);
  }

  // Form
  const form = document.createElement('form');
  form.className = 'af-newsletter__form';
  form.addEventListener('submit', (e) => e.preventDefault());

  const fields = document.createElement('div');
  fields.className = 'af-newsletter__fields';

  const input = document.createElement('input');
  input.className = 'af-newsletter__input';
  input.type = 'email';
  input.placeholder = 'Enter your email';
  input.required = true;
  fields.appendChild(input);

  const btn = document.createElement('button');
  btn.className = 'af-newsletter__button';
  btn.type = 'submit';
  btn.textContent = 'Subscribe';
  fields.appendChild(btn);

  form.appendChild(fields);

  const disclaimer = document.createElement('p');
  disclaimer.className = 'af-newsletter__disclaimer';
  disclaimer.textContent = 'By subscribing, you agree to our Privacy Policy.';
  form.appendChild(disclaimer);

  inner.appendChild(form);
  block.appendChild(inner);
}
