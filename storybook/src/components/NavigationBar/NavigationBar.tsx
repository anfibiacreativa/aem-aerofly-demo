import React from 'react';
import './NavigationBar.css';

export interface NavLink {
  label: string;
  href: string;
  active?: boolean;
}

export interface NavigationBarProps {
  logo?: string;
  links: NavLink[];
  showSearch?: boolean;
  showCart?: boolean;
  cartCount?: number;
  variant?: 'default' | 'transparent' | 'minimal';
  theme?: 'light' | 'dark';
}

export const NavigationBar: React.FC<NavigationBarProps> = ({
  logo = 'AEROFLY',
  links,
  showSearch = true,
  showCart = true,
  cartCount = 0,
  variant = 'default',
  theme = 'light',
}) => {
  return (
    <nav className={`af-nav af-nav--${variant} af-nav--${theme}`} role="navigation" aria-label="Main navigation">
      <div className="af-nav__inner">
        <a href="/" className="af-nav__logo">{logo}</a>
        <ul className="af-nav__links">
          {links.map((link, index) => (
            <li key={index}>
              <a href={link.href} className={`af-nav__link ${link.active ? 'af-nav__link--active' : ''}`} aria-current={link.active ? 'page' : undefined}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="af-nav__utils">
          {showSearch && (
            <button type="button" className="af-nav__icon-btn" aria-label="Search">
              <span className="af-nav__icon af-nav__icon--search" aria-hidden>🔍</span>
            </button>
          )}
          {showCart && (
            <a href="/cart" className="af-nav__cart-btn" aria-label={`Cart (${cartCount} items)`}>
              <span className="af-nav__icon af-nav__icon--cart" aria-hidden>🛒</span>
              {cartCount > 0 && <span className="af-nav__cart-badge">{cartCount > 99 ? '99+' : cartCount}</span>}
            </a>
          )}
        </div>
      </div>
    </nav>
  );
};
