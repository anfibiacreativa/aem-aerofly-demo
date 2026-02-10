import type { Meta, StoryObj } from '@storybook/react';
import { CTABand } from './CTABand';

const meta = {
  title: 'Components/CTABand',
  component: CTABand,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Full-width call-to-action strip. Supports brand, accent, dark, and light themes. Variants: default (stacked), split (text left, CTAs right), compact.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'split', 'compact'],
    },
    theme: {
      control: 'select',
      options: ['brand', 'accent', 'dark', 'light'],
    },
  },
} satisfies Meta<typeof CTABand>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BrandTheme: Story = {
  args: {
    heading: 'Ready to Run Lighter?',
    subheading: 'Join 10 million runners who have made the switch to Aerofly.',
    ctaText: 'Shop Running Shoes',
    ctaHref: '/shop',
    variant: 'default',
    theme: 'brand',
  },
};

export const AccentTheme: Story = {
  args: {
    heading: 'New Velocity 3 Just Dropped',
    subheading: 'Our lightest racing flat yet. Pre-order now and save 15%.',
    ctaText: 'Pre-Order Now',
    ctaHref: '/velocity-3',
    variant: 'default',
    theme: 'accent',
  },
};

export const Split: Story = {
  args: {
    heading: 'Free Shipping on Orders Over $75',
    subheading: 'Plus easy returns. Find your perfect fit risk-free.',
    ctaText: 'Start Shopping',
    ctaHref: '/shop',
    variant: 'split',
    theme: 'brand',
  },
};

export const Compact: Story = {
  args: {
    heading: 'Get 10% off your first order',
    ctaText: 'Sign Up',
    ctaHref: '/newsletter',
    variant: 'compact',
    theme: 'accent',
  },
};

export const WithSecondary: Story = {
  args: {
    heading: 'The Ultimate Running Experience',
    subheading: 'Engineered for speed. Built for comfort. Made to last.',
    ctaText: 'Shop Collection',
    ctaHref: '/collection',
    secondaryCtaText: 'Learn More',
    secondaryCtaHref: '/about',
    variant: 'default',
    theme: 'brand',
  },
};
