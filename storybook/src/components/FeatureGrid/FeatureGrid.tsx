import React from 'react';
import './FeatureGrid.css';

export interface FeatureGridFeature {
  icon: string;
  title: string;
  description: string;
}

export interface FeatureGridProps {
  /** Optional section heading */
  heading?: string;
  /** Optional subheading below the heading */
  subheading?: string;
  /** Array of feature items */
  features: FeatureGridFeature[];
  /** Number of grid columns */
  columns?: 2 | 3 | 4;
  /** Layout variant */
  variant?: 'default' | 'card' | 'icon-left';
  /** Light or dark theme */
  theme?: 'light' | 'dark';
}

export const FeatureGrid: React.FC<FeatureGridProps> = ({
  heading,
  subheading,
  features,
  columns = 3,
  variant = 'default',
  theme = 'light',
}) => {
  return (
    <section className={`af-feature-grid af-feature-grid--${variant} af-feature-grid--${theme}`}>
      {(heading || subheading) && (
        <header className="af-feature-grid__header">
          {heading && <h2 className="af-feature-grid__heading">{heading}</h2>}
          {subheading && <p className="af-feature-grid__subheading">{subheading}</p>}
        </header>
      )}
      <div className={`af-feature-grid__grid af-feature-grid__grid--cols-${columns}`}>
        {features.map((feature, index) => (
          <div key={index} className="af-feature-grid__item">
            <span className="af-feature-grid__icon" role="img" aria-hidden>
              {feature.icon}
            </span>
            <div className="af-feature-grid__content">
              <h3 className="af-feature-grid__title">{feature.title}</h3>
              <p className="af-feature-grid__description">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
