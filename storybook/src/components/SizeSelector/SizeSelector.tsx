import React from 'react';
import './SizeSelector.css';

export interface SizeSelectorSize {
  value: string;
  available: boolean;
}

export interface SizeSelectorProps {
  sizes: SizeSelectorSize[];
  selectedSize?: string;
  onSelect?: (size: string) => void;
  unit?: 'US' | 'EU' | 'UK';
  heading?: string;
  showGuide?: boolean;
  variant?: 'default' | 'compact' | 'minimal';
}

export const SizeSelector: React.FC<SizeSelectorProps> = ({
  sizes,
  selectedSize,
  onSelect,
  unit = 'US',
  heading,
  showGuide = false,
  variant = 'default',
}) => {
  if (!sizes?.length) return null;

  const handleClick = (size: SizeSelectorSize) => {
    if (size.available && onSelect) {
      onSelect(size.value);
    }
  };

  const unitLabel = unit === 'US' ? 'US' : unit === 'EU' ? 'EU' : 'UK';

  return (
    <div
      className={`af-size-selector af-size-selector--${variant}`}
      role="group"
      aria-labelledby={heading ? 'size-selector-heading' : undefined}
    >
      <div className="af-size-selector__header">
        {heading && (
          <h3 id="size-selector-heading" className="af-size-selector__heading">
            {heading}
          </h3>
        )}
        {unit && (
          <span className="af-size-selector__unit">({unitLabel})</span>
        )}
        {showGuide && (
          <a href="#size-guide" className="af-size-selector__guide">
            Size Guide
          </a>
        )}
      </div>
      <div className="af-size-selector__grid" role="radiogroup" aria-label={`Select size in ${unitLabel}`}>
        {sizes.map((size) => {
          const isSelected = selectedSize === size.value;
          const isDisabled = !size.available;
          return (
            <button
              key={size.value}
              type="button"
              role="radio"
              aria-checked={isSelected}
              aria-disabled={isDisabled}
              disabled={isDisabled}
              className={`af-size-selector__button ${
                isSelected ? 'af-size-selector__button--selected' : ''
              } ${!size.available ? 'af-size-selector__button--unavailable' : ''}`}
              onClick={() => handleClick(size)}
            >
              <span className="af-size-selector__value">{size.value}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
