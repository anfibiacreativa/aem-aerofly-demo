import React from 'react';
import './HeroBanner.css';

export interface HeroBannerProps {
  /** Overline text above the heading (e.g., "NEW ARRIVAL") */
  overline?: string;
  /** Main headline */
  heading: string;
  /** Supporting text below the heading */
  subheading?: string;
  /** Primary CTA button text */
  ctaText?: string;
  /** Primary CTA link URL */
  ctaHref?: string;
  /** Secondary CTA button text */
  secondaryCtaText?: string;
  /** Secondary CTA link URL */
  secondaryCtaHref?: string;
  /** Background image URL */
  backgroundImage?: string;
  /** Layout variant */
  variant?: 'full-bleed' | 'split' | 'centered' | 'minimal';
  /** Dark or light text overlay */
  theme?: 'dark' | 'light';
  /** Optional badge text (e.g., "Limited Edition") */
  badge?: string;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  overline,
  heading,
  subheading,
  ctaText = 'Shop Now',
  ctaHref = '#',
  secondaryCtaText,
  secondaryCtaHref = '#',
  backgroundImage = 'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=1920&q=80',
  variant = 'full-bleed',
  theme = 'dark',
  badge,
}) => {
  return (
    <section className={`af-hero af-hero--${variant} af-hero--${theme}`}>
      <div className="af-hero__background">
        <img src={backgroundImage} alt="" className="af-hero__image" />
        <div className="af-hero__overlay" />
      </div>
      <div className="af-hero__content">
        {badge && <span className="af-hero__badge">{badge}</span>}
        {overline && <span className="af-hero__overline">{overline}</span>}
        <h1 className="af-hero__heading">{heading}</h1>
        {subheading && <p className="af-hero__subheading">{subheading}</p>}
        <div className="af-hero__actions">
          {ctaText && (
            <a href={ctaHref} className="af-hero__cta af-hero__cta--primary">
              {ctaText}
            </a>
          )}
          {secondaryCtaText && (
            <a href={secondaryCtaHref} className="af-hero__cta af-hero__cta--secondary">
              {secondaryCtaText}
            </a>
          )}
        </div>
      </div>
    </section>
  );
};
