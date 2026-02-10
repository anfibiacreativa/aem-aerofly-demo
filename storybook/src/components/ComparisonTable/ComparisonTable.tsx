import React from 'react';
import './ComparisonTable.css';

export interface ComparisonTableProduct {
  name: string;
  image?: string;
  price: string;
  specs: Record<string, string | boolean>;
}

export interface ComparisonTableProps {
  heading?: string;
  products: ComparisonTableProduct[];
  features: string[];
  highlightIndex?: number;
  variant?: 'default' | 'compact';
}

export const ComparisonTable: React.FC<ComparisonTableProps> = ({
  heading,
  products,
  features,
  highlightIndex,
  variant = 'default',
}) => {
  if (!products?.length || !features?.length) return null;

  const renderCellValue = (value: string | boolean) => {
    if (typeof value === 'boolean') {
      return value ? (
        <span className="af-comparison-table__check" aria-label="Yes">
          ✓
        </span>
      ) : (
        <span className="af-comparison-table__cross" aria-label="No">
          ✗
        </span>
      );
    }
    return <span>{value}</span>;
  };

  return (
    <div
      className={`af-comparison-table af-comparison-table--${variant}`}
      role="region"
      aria-labelledby={heading ? 'comparison-table-heading' : undefined}
    >
      {heading && (
        <h3 id="comparison-table-heading" className="af-comparison-table__heading">
          {heading}
        </h3>
      )}
      <div className="af-comparison-table__scroll">
        <table className="af-comparison-table__table">
          <thead>
            <tr>
              <th className="af-comparison-table__feature-header" scope="col">
                &nbsp;
              </th>
              {products.map((product, index) => (
                <th
                  key={product.name}
                  scope="col"
                  className={`af-comparison-table__product-header ${
                    index === highlightIndex ? 'af-comparison-table__product-header--highlight' : ''
                  }`}
                >
                  {product.image ? (
                    <div className="af-comparison-table__product-cell">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="af-comparison-table__product-image"
                      />
                      <span className="af-comparison-table__product-name">{product.name}</span>
                      <span className="af-comparison-table__product-price">{product.price}</span>
                    </div>
                  ) : (
                    <div className="af-comparison-table__product-cell">
                      <span className="af-comparison-table__product-name">{product.name}</span>
                      <span className="af-comparison-table__product-price">{product.price}</span>
                    </div>
                  )}
                  {index === highlightIndex && (
                    <span className="af-comparison-table__badge">Recommended</span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {features.map((feature) => (
              <tr key={feature} className="af-comparison-table__row">
                <td className="af-comparison-table__feature-label">{feature}</td>
                {products.map((product, index) => (
                  <td
                    key={`${product.name}-${feature}`}
                    className={`af-comparison-table__cell ${
                      index === highlightIndex ? 'af-comparison-table__cell--highlight' : ''
                    }`}
                  >
                    {renderCellValue(product.specs[feature] ?? '—')}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
