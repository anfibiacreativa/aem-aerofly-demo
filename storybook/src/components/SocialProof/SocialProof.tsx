import React from 'react';
import './SocialProof.css';

export interface SocialProofStat {
  value: string;
  label: string;
  prefix?: string;
  suffix?: string;
}

export interface SocialProofProps {
  stats: SocialProofStat[];
  variant?: 'default' | 'card' | 'inline';
  theme?: 'light' | 'dark';
  heading?: string;
}

export const SocialProof: React.FC<SocialProofProps> = ({
  stats,
  variant = 'default',
  theme = 'light',
  heading,
}) => {
  return (
    <section
      className={`af-social-proof af-social-proof--${variant} af-social-proof--${theme}`}
    >
      {heading && <h2 className="af-social-proof__heading">{heading}</h2>}
      <div className="af-social-proof__row">
        {stats.map((stat, index) => (
          <div key={index} className="af-social-proof__stat">
            <span className="af-social-proof__value">
              {stat.prefix && <span className="af-social-proof__prefix">{stat.prefix}</span>}
              {stat.value}
              {stat.suffix && <span className="af-social-proof__suffix">{stat.suffix}</span>}
            </span>
            <span className="af-social-proof__label">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
};
