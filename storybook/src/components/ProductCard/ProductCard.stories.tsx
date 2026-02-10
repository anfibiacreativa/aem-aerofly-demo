import type { Meta, StoryObj } from '@storybook/react';
import { ProductCard } from './ProductCard';

const meta = {
  title: 'Components/ProductCard',
  component: ProductCard,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Product card displaying image, name, price, rating, color swatches, and CTA. Supports default, horizontal, and featured layout variants.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'horizontal', 'featured'],
    },
  },
} satisfies Meta<typeof ProductCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultImage = 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80';

export const Default: Story = {
  args: {
    name: 'AirPulse Pro',
    price: 149,
    image: defaultImage,
    rating: 4.5,
    reviewCount: 128,
    ctaText: 'Add to Cart',
  },
};

export const OnSale: Story = {
  args: {
    name: 'CloudStride Everyday',
    price: 89,
    originalPrice: 129,
    image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&q=80',
    rating: 4.8,
    reviewCount: 256,
    badge: 'Sale',
    ctaText: 'Add to Cart',
  },
};

export const Featured: Story = {
  args: {
    name: 'TrailForge Pro',
    price: 189,
    image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=600&q=80',
    rating: 5,
    reviewCount: 89,
    badge: 'New',
    ctaText: 'Shop Now',
    variant: 'featured',
  },
};

export const WithColorSwatches: Story = {
  args: {
    name: 'SpeedLite Runner',
    price: 119,
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&q=80',
    rating: 4.6,
    reviewCount: 312,
    colors: [
      { name: 'Navy', hex: '#0A1628' },
      { name: 'Coral', hex: '#FF4F3E' },
      { name: 'White', hex: '#FFFFFF' },
      { name: 'Gray', hex: '#64748B' },
    ],
    ctaText: 'Add to Cart',
  },
};

export const Bestseller: Story = {
  args: {
    name: 'AeroWeave Ultra',
    price: 169,
    image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=600&q=80',
    rating: 4.9,
    reviewCount: 1024,
    badge: 'Bestseller',
    colors: [
      { name: 'Black', hex: '#0F172A' },
      { name: 'Navy', hex: '#1B2D4A' },
    ],
    ctaText: 'Add to Cart',
  },
};
