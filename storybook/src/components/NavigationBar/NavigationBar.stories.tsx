import type { Meta, StoryObj } from '@storybook/react';
import { NavigationBar } from './NavigationBar';

const defaultLinks = [
  { label: 'Men', href: '#', active: false },
  { label: 'Women', href: '#', active: false },
  { label: 'Running', href: '#', active: true },
  { label: 'Training', href: '#', active: false },
  { label: 'Sustainability', href: '#', active: false },
  { label: 'Sale', href: '#', active: false },
];

const meta = {
  title: 'Components/NavigationBar',
  component: NavigationBar,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Horizontal navigation bar with logo on the left, nav links in the center, and utility icons (search, cart) on the right. Supports transparent variant for hero overlays and cart count badge.',
      },
    },
  },
  argTypes: {
    variant: { control: 'select', options: ['default', 'transparent', 'minimal'] },
    theme: { control: 'select', options: ['light', 'dark'] },
  },
} satisfies Meta<typeof NavigationBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    logo: 'AEROFLY',
    links: defaultLinks,
    showSearch: true,
    showCart: true,
    cartCount: 0,
    variant: 'default',
    theme: 'light',
  },
};

export const Transparent: Story = {
  args: {
    logo: 'AEROFLY',
    links: defaultLinks,
    showSearch: true,
    showCart: true,
    cartCount: 3,
    variant: 'transparent',
    theme: 'dark',
  },
  parameters: {
    backgrounds: {
      default: 'dark',
      values: [{ name: 'dark', value: 'linear-gradient(135deg, #0A1628 0%, #1B2D4A 100%)' }],
    },
  },
};

export const DarkTheme: Story = {
  args: {
    logo: 'AEROFLY',
    links: defaultLinks,
    showSearch: true,
    showCart: true,
    cartCount: 5,
    variant: 'default',
    theme: 'dark',
  },
};

export const WithCart: Story = {
  args: {
    logo: 'AEROFLY',
    links: defaultLinks,
    showSearch: true,
    showCart: true,
    cartCount: 12,
    variant: 'default',
    theme: 'light',
  },
};

export const Minimal: Story = {
  args: {
    logo: 'AEROFLY',
    links: defaultLinks,
    showSearch: true,
    showCart: false,
    cartCount: 0,
    variant: 'minimal',
    theme: 'light',
  },
};
