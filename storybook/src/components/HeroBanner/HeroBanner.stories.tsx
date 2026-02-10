import type { Meta, StoryObj } from '@storybook/react';
import { HeroBanner } from './HeroBanner';

const meta = {
  title: 'Components/HeroBanner',
  component: HeroBanner,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Full-width hero banner with background image, headline, CTA, and multiple layout variants. Used as the primary above-the-fold element on landing pages and product launches.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['full-bleed', 'split', 'centered', 'minimal'],
    },
    theme: {
      control: 'select',
      options: ['dark', 'light'],
    },
  },
} satisfies Meta<typeof HeroBanner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FullBleed: Story = {
  args: {
    overline: 'NEW ARRIVAL',
    heading: 'AirPulse Max',
    subheading: 'Engineered for speed. Designed for the long run. 40% lighter with our revolutionary AeroWeave™ upper.',
    ctaText: 'Shop Now',
    secondaryCtaText: 'Learn More',
    variant: 'full-bleed',
    theme: 'dark',
  },
};

export const Centered: Story = {
  args: {
    overline: 'SPRING 2026 COLLECTION',
    heading: 'Run Without Limits',
    subheading: 'Three new silhouettes. One relentless pursuit of performance.',
    ctaText: 'Explore Collection',
    variant: 'centered',
    theme: 'dark',
  },
};

export const Split: Story = {
  args: {
    heading: 'CloudStride Everyday',
    subheading: 'From morning runs to evening commutes. The shoe that does it all.',
    ctaText: 'Shop CloudStride',
    secondaryCtaText: 'See Reviews',
    variant: 'split',
    theme: 'dark',
  },
};

export const Minimal: Story = {
  args: {
    heading: 'Sustainability Report 2026',
    subheading: 'How we\'re reducing our carbon footprint by 60% this year.',
    ctaText: 'Read Report',
    variant: 'minimal',
    theme: 'light',
    badge: 'Limited Edition',
  },
};

export const ProductLaunch: Story = {
  args: {
    overline: 'JUST DROPPED',
    heading: 'TrailForge Pro',
    subheading: 'Grip that adapts. Cushioning that responds. Built for trails that don\'t exist on maps.',
    ctaText: 'Pre-Order Now',
    secondaryCtaText: 'Watch Film',
    variant: 'full-bleed',
    theme: 'dark',
    badge: 'Pre-Order',
  },
};
