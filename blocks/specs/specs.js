export default function decorate(block) {
  const rows = [...block.children];
  block.innerHTML = '';
  block.classList.add('af-specs-table');

  // Heading
  const h2 = rows[0]?.querySelector('h2');
  if (h2) {
    h2.className = 'af-specs-table__heading';
    block.appendChild(h2);
  }

  // Table
  const table = document.createElement('table');
  table.className = 'af-specs-table__table';

  const tbody = document.createElement('tbody');

  rows.slice(1).forEach((row) => {
    const text = row.textContent.trim();
    if (!text) return;

    // Split by | for label | value
    const cells = text.split('|').map((c) => c.trim()).filter(Boolean);
    if (cells.length < 2) return;

    const tr = document.createElement('tr');
    tr.className = 'af-specs-table__row';

    const labelCell = document.createElement('td');
    labelCell.className = 'af-specs-table__label';
    labelCell.textContent = cells[0];
    tr.appendChild(labelCell);

    const valueCell = document.createElement('td');
    valueCell.className = 'af-specs-table__value';
    valueCell.textContent = cells[1];
    tr.appendChild(valueCell);

    tbody.appendChild(tr);
  });

  table.appendChild(tbody);
  block.appendChild(table);
}
