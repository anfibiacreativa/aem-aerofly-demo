import React from 'react';
import './CategoryBrowser.css';

export interface CategoryBrowserCategory {
  name: string;
  image: string;
  href: string;
  count?: number;
}

export interface CategoryBrowserProps {
  /** Array of category objects */
  categories: CategoryBrowserCategory[];
  /** Optional section heading */
  heading?: string;
  /** Optional subheading */
  subheading?: string;
  /** Layout variant */
  variant?: 'grid' | 'scroll' | 'featured';
  /** Number of columns for grid layouts */
  columns?: 2 | 3 | 4;
}

export const CategoryBrowser: React.FC<CategoryBrowserProps> = ({
  categories,
  heading,
  subheading,
  variant = 'grid',
  columns = 3,
}) => {
  if (!categories || categories.length === 0) return null;

  return (
    <section className={`af-category-browser af-category-browser--${variant} af-category-browser--cols-${columns}`}>
      {(heading || subheading) && (
        <header className="af-category-browser__header">
          {heading && <h2 className="af-category-browser__heading">{heading}</h2>}
          {subheading && <p className="af-category-browser__subheading">{subheading}</p>}
        </header>
      )}
      <div className="af-category-browser__grid">
        {categories.map((category, index) => (
          <a
            key={`${category.name}-${index}`}
            href={category.href}
            className="af-category-browser__tile"
          >
            <div className="af-category-browser__image-wrapper">
              <img
                src={category.image}
                alt=""
                className="af-category-browser__image"
                loading="lazy"
              />
              <div className="af-category-browser__overlay" />
              <div className="af-category-browser__content">
                <span className="af-category-browser__name">{category.name}</span>
                {category.count !== undefined && (
                  <span className="af-category-browser__count">{category.count} products</span>
                )}
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};
