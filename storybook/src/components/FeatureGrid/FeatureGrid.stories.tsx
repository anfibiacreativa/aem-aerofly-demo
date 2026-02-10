import type { Meta, StoryObj } from '@storybook/react';
import { FeatureGrid } from './FeatureGrid';

const meta = {
  title: 'Components/FeatureGrid',
  component: FeatureGrid,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Grid of feature items with icon, title, and description. Supports 2–4 columns, card and icon-left variants, and light/dark themes.',
      },
    },
  },
  argTypes: {
    columns: {
      control: 'select',
      options: [2, 3, 4],
    },
    variant: {
      control: 'select',
      options: ['default', 'card', 'icon-left'],
    },
    theme: {
      control: 'select',
      options: ['light', 'dark'],
    },
  },
} satisfies Meta<typeof FeatureGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

const performanceFeatures = [
  {
    icon: '⚡',
    title: 'AeroWeave™ Upper',
    description:
      '40% lighter engineered mesh breathes like no other. Lock-down fit without the bulk.',
  },
  {
    icon: '🦶',
    title: 'Adaptive Cushioning',
    description:
      'Our ReactFoam midsole adjusts to your stride. Soft on impact, responsive on toe-off.',
  },
  {
    icon: '🎯',
    title: 'Precision Traction',
    description:
      'Dual-density rubber outsole with micro-lug pattern grips wet and dry surfaces.',
  },
];

const sustainabilityFeatures = [
  {
    icon: '🌿',
    title: 'Recycled Materials',
    description: 'Upper crafted from 75% recycled polyester. Every step treads lighter.',
  },
  {
    icon: '♻️',
    title: 'Circular Design',
    description: 'Take-back program turns worn shoes into new cushioning. No landfill.',
  },
  {
    icon: '💧',
    title: 'Water-Based Adhesives',
    description: 'Zero solvent emissions. Cleaner production from factory to finish.',
  },
];

const technologyFeatures = [
  {
    icon: '📊',
    title: 'SmartFit Insole',
    description: 'Pressure-mapped comfort zones. Data-informed design for your exact foot.',
  },
  {
    icon: '🔬',
    title: 'Climate Control',
    description: 'Phase-change materials regulate temperature. Cool in heat, warm in cold.',
  },
  {
    icon: '🛡️',
    title: 'HydroGuard',
    description: 'Water-resistant treatment without sacrificing breathability or flex.',
  },
  {
    icon: '🧵',
    title: 'Seamless Construction',
    description: 'Reduced seams mean fewer pressure points. Like a second skin.',
  },
];

export const ThreeColumn: Story = {
  args: {
    heading: 'Built for Performance',
    subheading:
      'Every element of Aerofly footwear is engineered to help you run faster, longer, and more comfortably.',
    features: performanceFeatures,
    columns: 3,
    variant: 'default',
    theme: 'light',
  },
};

export const TwoColumn: Story = {
  args: {
    heading: 'Our Sustainability Commitments',
    subheading: 'We\'re reducing our footprint while elevating your run.',
    features: sustainabilityFeatures,
    columns: 2,
    variant: 'default',
    theme: 'light',
  },
};

export const FourColumn: Story = {
  args: {
    heading: 'Innovation in Every Step',
    subheading: 'Cutting-edge technology meets everyday comfort.',
    features: technologyFeatures,
    columns: 4,
    variant: 'default',
    theme: 'light',
  },
};

export const CardVariant: Story = {
  args: {
    heading: 'Why Athletes Choose Aerofly',
    subheading: 'The details that make the difference.',
    features: performanceFeatures,
    columns: 3,
    variant: 'card',
    theme: 'light',
  },
};

export const DarkTheme: Story = {
  args: {
    heading: 'Engineered to Excel',
    subheading: 'Precision-built for runners who demand more.',
    features: sustainabilityFeatures,
    columns: 3,
    variant: 'default',
    theme: 'dark',
  },
};
