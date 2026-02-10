import React, { useState } from 'react';
import './AnnouncementBar.css';

export interface AnnouncementBarProps {
  message: string;
  linkText?: string;
  linkHref?: string;
  dismissible?: boolean;
  variant?: 'default' | 'accent' | 'warning';
  icon?: string;
}

export const AnnouncementBar: React.FC<AnnouncementBarProps> = ({
  message,
  linkText,
  linkHref = '#',
  dismissible = false,
  variant = 'default',
  icon,
}) => {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) {
    return null;
  }

  return (
    <div
      className={`af-announcement af-announcement--${variant}`}
      role="banner"
      aria-live="polite"
    >
      <div className="af-announcement__inner">
        {icon && <span className="af-announcement__icon" aria-hidden>{icon}</span>}
        <span className="af-announcement__message">{message}</span>
        {linkText && (
          <a href={linkHref} className="af-announcement__link">
            {linkText}
          </a>
        )}
        {dismissible && (
          <button
            type="button"
            className="af-announcement__dismiss"
            aria-label="Dismiss"
            onClick={() => setDismissed(true)}
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
};
