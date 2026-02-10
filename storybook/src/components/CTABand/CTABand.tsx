import React from 'react';
import './CTABand.css';

export interface CTABandProps {
  heading: string;
  subheading?: string;
  ctaText: string;
  ctaHref?: string;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
  variant?: 'default' | 'split' | 'compact';
  theme?: 'brand' | 'accent' | 'dark' | 'light';
}

export const CTABand: React.FC<CTABandProps> = ({
  heading,
  subheading,
  ctaText,
  ctaHref = '#',
  secondaryCtaText,
  secondaryCtaHref = '#',
  variant = 'default',
  theme = 'brand',
}) => {
  return (
    <section
      className={`af-cta-band af-cta-band--${variant} af-cta-band--${theme}`}
    >
      <div className="af-cta-band__inner">
        <div className="af-cta-band__content">
          <h2 className="af-cta-band__heading">{heading}</h2>
          {subheading && (
            <p className="af-cta-band__subheading">{subheading}</p>
          )}
        </div>
        <div className="af-cta-band__actions">
          <a href={ctaHref} className="af-cta-band__cta af-cta-band__cta--primary">
            {ctaText}
          </a>
          {secondaryCtaText && (
            <a href={secondaryCtaHref} className="af-cta-band__cta af-cta-band__cta--secondary">
              {secondaryCtaText}
            </a>
          )}
        </div>
      </div>
    </section>
  );
};
