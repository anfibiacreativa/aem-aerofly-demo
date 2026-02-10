import React from 'react';
import './ProductCard.css';

export interface ProductCardColor {
  name: string;
  hex: string;
}

export interface ProductCardProps {
  /** Product name */
  name: string;
  /** Current price in dollars */
  price: number;
  /** Original price for sale display (strikethrough) */
  originalPrice?: number;
  /** Product image URL */
  image: string;
  /** Star rating 1-5 */
  rating?: number;
  /** Number of reviews */
  reviewCount?: number;
  /** Badge text (e.g., "New", "Sale", "Bestseller") */
  badge?: string;
  /** Available color swatches */
  colors?: ProductCardColor[];
  /** Layout variant */
  variant?: 'default' | 'horizontal' | 'featured';
  /** CTA button text */
  ctaText?: string;
  /** Link URL for the card/CTA */
  href?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  name,
  price,
  originalPrice,
  image,
  rating,
  reviewCount,
  badge,
  colors,
  variant = 'default',
  ctaText = 'Add to Cart',
  href = '#',
}) => {
  const content = (
    <>
      <div className="af-product-card__media">
        <img src={image} alt={name} className="af-product-card__image" />
        {badge && <span className="af-product-card__badge">{badge}</span>}
      </div>
      <div className="af-product-card__body">
        <h3 className="af-product-card__name">{name}</h3>
        {(rating !== undefined || reviewCount !== undefined) && (
          <div className="af-product-card__rating">
            {rating !== undefined && (
              <span className="af-product-card__stars">
                {'★'.repeat(Math.round(rating))}
                {'☆'.repeat(5 - Math.round(rating))}
              </span>
            )}
            {reviewCount !== undefined && (
              <span className="af-product-card__reviews">({reviewCount})</span>
            )}
          </div>
        )}
        <div className="af-product-card__pricing">
          {originalPrice !== undefined && originalPrice > price && (
            <span className="af-product-card__original-price">${originalPrice}</span>
          )}
          <span className="af-product-card__price">${price}</span>
        </div>
        {colors && colors.length > 0 && (
          <div className="af-product-card__colors">
            {colors.map((color) => (
              <span
                key={color.name}
                className="af-product-card__swatch"
                style={{ backgroundColor: color.hex }}
                title={color.name}
                aria-label={color.name}
              />
            ))}
          </div>
        )}
        <a href={href} className="af-product-card__cta">
          {ctaText}
        </a>
      </div>
    </>
  );

  return (
    <article className={`af-product-card af-product-card--${variant}`}>
      {content}
    </article>
  );
};
