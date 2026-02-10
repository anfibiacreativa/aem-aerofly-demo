import React from 'react';
import './Footer.css';

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterColumn {
  title: string;
  links: FooterLink[];
}

export interface SocialLink {
  platform: string;
  href: string;
}

export interface FooterProps {
  columns: FooterColumn[];
  showNewsletter?: boolean;
  newsletterHeading?: string;
  newsletterSubheading?: string;
  socialLinks?: SocialLink[];
  bottomText?: string;
  variant?: 'default' | 'minimal' | 'centered';
  theme?: 'dark' | 'light';
}

export const Footer: React.FC<FooterProps> = ({
  columns,
  showNewsletter = false,
  newsletterHeading = 'Stay in the loop',
  newsletterSubheading = 'Get the latest on new releases, exclusive offers, and more.',
  socialLinks = [],
  bottomText = '© 2026 Aerofly. All rights reserved.',
  variant = 'default',
  theme = 'dark',
}) => {
  return (
    <footer
      className={`af-footer af-footer--${variant} af-footer--${theme}`}
      role="contentinfo"
    >
      {showNewsletter && (
        <div className="af-footer__newsletter">
          <h3 className="af-footer__newsletter-heading">{newsletterHeading}</h3>
          <p className="af-footer__newsletter-subheading">{newsletterSubheading}</p>
          <form className="af-footer__newsletter-form" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Enter your email"
              className="af-footer__newsletter-input"
              aria-label="Email address"
            />
            <button type="submit" className="af-footer__newsletter-btn">
              Subscribe
            </button>
          </form>
        </div>
      )}

      <div className="af-footer__main">
        <div className="af-footer__columns">
          {columns.map((column, colIndex) => (
            <div key={colIndex} className="af-footer__column">
              <h4 className="af-footer__column-title">{column.title}</h4>
              <ul className="af-footer__links">
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a href={link.href} className="af-footer__link">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {socialLinks.length > 0 && (
          <div className="af-footer__social">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                className="af-footer__social-link"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.platform}
              >
                {social.platform}
              </a>
            ))}
          </div>
        )}
      </div>

      <div className="af-footer__bottom">
        <p className="af-footer__bottom-text">{bottomText}</p>
      </div>
    </footer>
  );
};
