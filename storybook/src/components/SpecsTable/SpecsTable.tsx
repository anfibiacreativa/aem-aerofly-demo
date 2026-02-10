import React from 'react';
import './SpecsTable.css';

export interface SpecsTableSpec {
  label: string;
  value: string;
  highlight?: boolean;
}

export interface SpecsTableProps {
  /** Optional table heading */
  heading?: string;
  /** Array of spec rows */
  specs: SpecsTableSpec[];
  /** Layout variant */
  variant?: 'default' | 'card' | 'compact';
  /** Light or dark theme */
  theme?: 'light' | 'dark';
}

export const SpecsTable: React.FC<SpecsTableProps> = ({
  heading,
  specs,
  variant = 'default',
  theme = 'light',
}) => {
  if (!specs || specs.length === 0) return null;

  const content = (
    <>
      {heading && (
        <h3 className="af-specs-table__heading">{heading}</h3>
      )}
      <table className="af-specs-table__table">
        <tbody>
          {specs.map((spec, index) => (
            <tr
              key={`${spec.label}-${index}`}
              className={`af-specs-table__row ${spec.highlight ? 'af-specs-table__row--highlight' : ''}`}
            >
              <td className="af-specs-table__label">{spec.label}</td>
              <td className="af-specs-table__value">{spec.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );

  return (
    <div className={`af-specs-table af-specs-table--${variant} af-specs-table--${theme}`}>
      {variant === 'card' ? (
        <div className="af-specs-table__card">{content}</div>
      ) : (
        content
      )}
    </div>
  );
};
