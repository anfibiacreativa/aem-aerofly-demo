import type { Meta, StoryObj } from '@storybook/react';
import { CategoryBrowser } from './CategoryBrowser';

const meta = {
  title: 'Components/CategoryBrowser',
  component: CategoryBrowser,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Category tiles with images, name overlay, and optional product count. Dark gradient overlay for text readability. Hover lifts the tile.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['grid', 'scroll', 'featured'],
    },
    columns: {
      control: 'select',
      options: [2, 3, 4],
    },
  },
} satisfies Meta<typeof CategoryBrowser>;

export default meta;
type Story = StoryObj<typeof meta>;

const unsplashBase = 'https://images.unsplash.com';
const defaultCategories = [
  { name: 'Running', image: `${unsplashBase}/photo-1542291026-7eec264c27ff?w=400&q=80`, href: '#', count: 42 },
  { name: 'Training', image: `${unsplashBase}/photo-1606107557195-0e29a4b5b4aa?w=400&q=80`, href: '#', count: 28 },
  { name: 'Trail', image: `${unsplashBase}/photo-1552346154-21d32810aba3?w=400&q=80`, href: '#', count: 19 },
  { name: 'Lifestyle', image: `${unsplashBase}/photo-1595950653106-6c9ebd614d3a?w=400&q=80`, href: '#', count: 56 },
  { name: 'Sale', image: `${unsplashBase}/photo-1608231387042-66d1773070a5?w=400&q=80`, href: '#', count: 12 },
  { name: 'New Arrivals', image: `${unsplashBase}/photo-1460353581641-37baddab0fa2?w=400&q=80`, href: '#', count: 8 },
];

export const Default: Story = {
  args: {
    heading: 'Shop by Category',
    subheading: 'Find your perfect fit',
    categories: defaultCategories,
    variant: 'grid',
    columns: 3,
  },
};

export const TwoColumn: Story = {
  args: {
    heading: 'Shop by Category',
    subheading: 'Find your perfect fit',
    categories: defaultCategories,
    variant: 'grid',
    columns: 2,
  },
};

export const ScrollVariant: Story = {
  args: {
    heading: 'Shop by Category',
    subheading: 'Scroll to explore',
    categories: defaultCategories,
    variant: 'scroll',
  },
};

export const Featured: Story = {
  args: {
    heading: 'Shop by Category',
    subheading: 'Explore our collections',
    categories: defaultCategories,
    variant: 'featured',
  },
};
