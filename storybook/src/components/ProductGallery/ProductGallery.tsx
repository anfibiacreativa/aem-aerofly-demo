import React from 'react';
import './ProductGallery.css';

export interface ProductGalleryImage {
  src: string;
  alt: string;
}

export interface ProductGalleryProps {
  /** Array of image objects with src and alt */
  images: ProductGalleryImage[];
  /** Layout variant: grid (uniform), featured (first image larger), masonry */
  variant?: 'grid' | 'featured' | 'masonry';
  /** Number of columns for grid layouts */
  columns?: 2 | 3 | 4;
  /** Gap between images */
  gap?: 'sm' | 'md' | 'lg';
}

export const ProductGallery: React.FC<ProductGalleryProps> = ({
  images,
  variant = 'grid',
  columns = 3,
  gap = 'md',
}) => {
  if (!images || images.length === 0) return null;

  return (
    <div
      className={`af-product-gallery af-product-gallery--${variant} af-product-gallery--cols-${columns} af-product-gallery--gap-${gap}`}
      role="region"
      aria-label="Product image gallery"
    >
      {images.map((img, index) => (
        <div
          key={`${img.src}-${index}`}
          className={`af-product-gallery__item ${variant === 'featured' && index === 0 ? 'af-product-gallery__item--featured' : ''}`}
        >
          <div className="af-product-gallery__image-wrapper">
            <img
              src={img.src}
              alt={img.alt}
              className="af-product-gallery__image"
              loading={index === 0 ? 'eager' : 'lazy'}
            />
          </div>
        </div>
      ))}
    </div>
  );
};
