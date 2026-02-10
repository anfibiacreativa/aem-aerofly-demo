import type { Meta, StoryObj } from '@storybook/react';
import { ProductGallery } from './ProductGallery';

const meta = {
  title: 'Components/ProductGallery',
  component: ProductGallery,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Product image gallery with grid, featured (first image larger), and masonry layouts. Images have hover zoom effect.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['grid', 'featured', 'masonry'],
    },
    columns: {
      control: 'select',
      options: [2, 3, 4],
    },
    gap: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
} satisfies Meta<typeof ProductGallery>;

export default meta;
type Story = StoryObj<typeof meta>;

const unsplashBase = 'https://images.unsplash.com';
const defaultImages = [
  { src: `${unsplashBase}/photo-1542291026-7eec264c27ff?w=600&q=80`, alt: 'Nike athletic shoe side view' },
  { src: `${unsplashBase}/photo-1606107557195-0e29a4b5b4aa?w=600&q=80`, alt: 'White running shoes' },
  { src: `${unsplashBase}/photo-1552346154-21d32810aba3?w=600&q=80`, alt: 'Trail running shoe' },
  { src: `${unsplashBase}/photo-1595950653106-6c9ebd614d3a?w=600&q=80`, alt: 'Sneakers on track' },
  { src: `${unsplashBase}/photo-1608231387042-66d1773070a5?w=600&q=80`, alt: 'Athletic footwear' },
  { src: `${unsplashBase}/photo-1460353581641-37baddab0fa2?w=600&q=80`, alt: 'Colorful sneakers' },
  { src: `${unsplashBase}/photo-1549298916-b41d501d3772?w=600&q=80`, alt: 'Sports shoe detail' },
  { src: `${unsplashBase}/photo-1518002171953-a080ee817e1f?w=600&q=80`, alt: 'Running shoes close-up' },
];

export const Grid: Story = {
  args: {
    images: defaultImages,
    variant: 'grid',
    columns: 3,
    gap: 'md',
  },
};

export const FeaturedLayout: Story = {
  args: {
    images: defaultImages,
    variant: 'featured',
    columns: 3,
    gap: 'md',
  },
};

export const TwoColumn: Story = {
  args: {
    images: defaultImages.slice(0, 6),
    variant: 'grid',
    columns: 2,
    gap: 'lg',
  },
};

export const MasonryStyle: Story = {
  args: {
    images: defaultImages,
    variant: 'masonry',
    columns: 3,
    gap: 'md',
  },
};
