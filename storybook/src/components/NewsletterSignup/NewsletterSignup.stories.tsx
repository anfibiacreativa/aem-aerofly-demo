import type { Meta, StoryObj } from '@storybook/react';
import { NewsletterSignup } from './NewsletterSignup';

const meta = {
  title: 'Components/NewsletterSignup',
  component: NewsletterSignup,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Email capture form for newsletter signup. Supports default (stacked), inline (input + button on same line), and card layout variants. Themes: light, dark, brand (warm sand).',
      },
    },
  },
  argTypes: {
    variant: { control: 'select', options: ['default', 'inline', 'card'] },
    theme: { control: 'select', options: ['light', 'dark', 'brand'] },
  },
} satisfies Meta<typeof NewsletterSignup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    heading: 'Stay in the Loop',
    subheading:
      'Get early access to drops, athlete stories, and sustainability updates.',
    placeholder: 'Enter your email',
    buttonText: 'Subscribe',
    variant: 'default',
    theme: 'light',
  },
};

export const Inline: Story = {
  args: {
    heading: 'Stay in the Loop',
    subheading:
      'Get early access to drops, athlete stories, and sustainability updates.',
    placeholder: 'Enter your email',
    buttonText: 'Subscribe',
    variant: 'inline',
    theme: 'light',
  },
};

export const CardVariant: Story = {
  args: {
    heading: 'Stay in the Loop',
    subheading:
      'Get early access to drops, athlete stories, and sustainability updates.',
    placeholder: 'Enter your email',
    buttonText: 'Subscribe',
    variant: 'card',
    theme: 'light',
  },
};

export const BrandTheme: Story = {
  args: {
    heading: 'Stay in the Loop',
    subheading:
      'Get early access to drops, athlete stories, and sustainability updates.',
    placeholder: 'Enter your email',
    buttonText: 'Subscribe',
    variant: 'default',
    theme: 'brand',
  },
};

export const DarkTheme: Story = {
  args: {
    heading: 'Stay in the Loop',
    subheading:
      'Get early access to drops, athlete stories, and sustainability updates.',
    placeholder: 'Enter your email',
    buttonText: 'Subscribe',
    variant: 'card',
    theme: 'dark',
    disclaimer: 'By subscribing, you agree to our Privacy Policy.',
  },
};
