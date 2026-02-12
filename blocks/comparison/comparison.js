export default function decorate(block) {
  const rows = [...block.children];
  block.innerHTML = '';
  block.classList.add('af-comparison-table');

  // Heading
  const h2 = rows[0]?.querySelector('h2');
  if (h2) {
    h2.className = 'af-comparison-table__heading';
    block.appendChild(h2);
  }

  const scroll = document.createElement('div');
  scroll.className = 'af-comparison-table__scroll';

  const table = document.createElement('table');
  table.className = 'af-comparison-table__table';

  // Header row (product names)
  if (rows[1]) {
    const headerText = rows[1].textContent.trim();
    const products = headerText.split('|').map((p) => p.trim()).filter(Boolean);

    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');

    // Empty feature column header
    const th0 = document.createElement('th');
    th0.className = 'af-comparison-table__feature-header';
    headerRow.appendChild(th0);

    products.forEach((prod, i) => {
      const th = document.createElement('th');
      th.className = 'af-comparison-table__product-header';
      if (i === 0) th.classList.add('af-comparison-table__product-header--highlight');
      th.textContent = prod;
      headerRow.appendChild(th);
    });

    thead.appendChild(headerRow);
    table.appendChild(thead);
  }

  // Data rows
  const tbody = document.createElement('tbody');
  rows.slice(2).forEach((row) => {
    const text = row.textContent.trim();
    if (!text) return;

    const cells = text.split('|').map((c) => c.trim()).filter(Boolean);
    if (cells.length < 2) return;

    const tr = document.createElement('tr');
    tr.className = 'af-comparison-table__row';

    const label = document.createElement('td');
    label.className = 'af-comparison-table__feature-label';
    label.textContent = cells[0];
    tr.appendChild(label);

    cells.slice(1).forEach((val, i) => {
      const td = document.createElement('td');
      td.className = 'af-comparison-table__cell';
      if (i === 0) td.classList.add('af-comparison-table__cell--highlight');

      if (val === '✓') {
        td.innerHTML = '<span class="af-comparison-table__check">✓</span>';
      } else if (val === '✗') {
        td.innerHTML = '<span class="af-comparison-table__cross">✗</span>';
      } else {
        td.textContent = val;
      }

      tr.appendChild(td);
    });

    tbody.appendChild(tr);
  });

  table.appendChild(tbody);
  scroll.appendChild(table);
  block.appendChild(scroll);
}
