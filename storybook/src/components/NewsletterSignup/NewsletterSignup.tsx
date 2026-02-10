import React, { useState, FormEvent } from 'react';
import './NewsletterSignup.css';

export interface NewsletterSignupProps {
  heading?: string;
  subheading?: string;
  placeholder?: string;
  buttonText?: string;
  variant?: 'default' | 'inline' | 'card';
  theme?: 'light' | 'dark' | 'brand';
  disclaimer?: string;
}

export const NewsletterSignup: React.FC<NewsletterSignupProps> = ({
  heading = 'Stay in the Loop',
  subheading,
  placeholder = 'Enter your email',
  buttonText = 'Subscribe',
  variant = 'default',
  theme = 'light',
  disclaimer,
}) => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      // Form submission logic would go here
      console.log('Subscribed:', email);
    }
  };

  const formContent = (
    <form onSubmit={handleSubmit} className="af-newsletter__form">
      <div className="af-newsletter__fields">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={placeholder}
          className="af-newsletter__input"
          aria-label="Email address"
        />
        <button type="submit" className="af-newsletter__button">
          {buttonText}
        </button>
      </div>
      {disclaimer && (
        <p className="af-newsletter__disclaimer">{disclaimer}</p>
      )}
    </form>
  );

  const textContent = (
    <>
      <h3 id="newsletter-heading" className="af-newsletter__heading">
        {heading}
      </h3>
      {subheading && (
        <p className="af-newsletter__subheading">{subheading}</p>
      )}
      {formContent}
    </>
  );

  return (
    <div
      className={`af-newsletter af-newsletter--${variant} af-newsletter--${theme}`}
      role="form"
      aria-labelledby="newsletter-heading"
    >
      {variant === 'card' ? (
        <div className="af-newsletter__card">{textContent}</div>
      ) : (
        <div className="af-newsletter__inner">{textContent}</div>
      )}
    </div>
  );
};
