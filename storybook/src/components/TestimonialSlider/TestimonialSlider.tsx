import React from 'react';
import './TestimonialSlider.css';

export interface TestimonialSliderTestimonial {
  quote: string;
  author: string;
  role?: string;
  avatar?: string;
  rating?: number;
}

export interface TestimonialSliderProps {
  testimonials: TestimonialSliderTestimonial[];
  variant?: 'default' | 'card' | 'minimal';
  theme?: 'light' | 'dark';
  heading?: string;
}

export const TestimonialSlider: React.FC<TestimonialSliderProps> = ({
  testimonials,
  variant = 'default',
  theme = 'light',
  heading,
}) => {
  const renderStars = (rating?: number) => {
    if (rating === undefined) return null;
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span
          key={i}
          className="af-testimonial-slider__star"
          aria-hidden={i >= rating}
        >
          ★
        </span>
      );
    }
    return (
      <div className="af-testimonial-slider__rating" role="img" aria-label={`${rating} out of 5 stars`}>
        {stars}
      </div>
    );
  };

  return (
    <section
      className={`af-testimonial-slider af-testimonial-slider--${variant} af-testimonial-slider--${theme}`}
    >
      {heading && <h2 className="af-testimonial-slider__heading">{heading}</h2>}
      <div className="af-testimonial-slider__row">
        {testimonials.map((testimonial, index) => (
          <article key={index} className="af-testimonial-slider__card">
            <span className="af-testimonial-slider__quote-mark" aria-hidden>
              "
            </span>
            <blockquote className="af-testimonial-slider__quote">
              {testimonial.quote}
            </blockquote>
            {renderStars(testimonial.rating)}
            <footer className="af-testimonial-slider__footer">
              {testimonial.avatar && (
                <img
                  src={testimonial.avatar}
                  alt=""
                  className="af-testimonial-slider__avatar"
                />
              )}
              <div className="af-testimonial-slider__author-info">
                <cite className="af-testimonial-slider__author">
                  {testimonial.author}
                </cite>
                {testimonial.role && (
                  <span className="af-testimonial-slider__role">
                    {testimonial.role}
                  </span>
                )}
              </div>
            </footer>
          </article>
        ))}
      </div>
    </section>
  );
};
