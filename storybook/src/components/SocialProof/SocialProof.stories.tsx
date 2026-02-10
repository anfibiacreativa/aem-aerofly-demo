import type { Meta, StoryObj } from '@storybook/react';
import { SocialProof } from './SocialProof';

const meta = {
  title: 'Components/SocialProof',
  component: SocialProof,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A row of impressive statistics. Large values with labels beneath. Supports default, card, and inline variants.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'card', 'inline'],
    },
    theme: {
      control: 'select',
      options: ['light', 'dark'],
    },
  },
} satisfies Meta<typeof SocialProof>;

export default meta;
type Story = StoryObj<typeof meta>;

const aeroflyStats = [
  { value: '10M+', label: 'Runners Worldwide' },
  { value: '50+', label: 'Countries' },
  { value: '4.9', label: 'Average Rating', suffix: '★' },
  { value: '98', label: 'Recycled Materials', suffix: '%' },
];

export const Default: Story = {
  args: {
    heading: 'Trusted by Runners Everywhere',
    stats: aeroflyStats,
    variant: 'default',
    theme: 'light',
  },
};

export const CardVariant: Story = {
  args: {
    heading: 'By the Numbers',
    stats: aeroflyStats,
    variant: 'card',
    theme: 'light',
  },
};

export const DarkTheme: Story = {
  args: {
    heading: 'Our Impact',
    stats: aeroflyStats,
    variant: 'default',
    theme: 'dark',
  },
};

export const InlineVariant: Story = {
  args: {
    heading: 'Aerofly in Numbers',
    stats: [
      { value: '10M+', label: 'Runners' },
      { value: '50+', label: 'Countries' },
      { value: '4.9★', label: 'Avg Rating' },
      { value: '98%', label: 'Recycled' },
    ],
    variant: 'inline',
    theme: 'light',
  },
};
