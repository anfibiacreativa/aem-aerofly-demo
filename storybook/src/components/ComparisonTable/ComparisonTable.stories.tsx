import type { Meta, StoryObj } from '@storybook/react';
import { ComparisonTable } from './ComparisonTable';

const defaultProducts = [
  {
    name: 'AirPulse Max',
    price: '$180',
    specs: {
      Weight: '8.2 oz',
      Drop: '10mm',
      Cushioning: 'Max',
      'Carbon Plate': true,
      Waterproof: false,
      'Best For': 'Speed / Racing',
    },
  },
  {
    name: 'CloudStride',
    price: '$145',
    specs: {
      Weight: '9.1 oz',
      Drop: '8mm',
      Cushioning: 'Moderate',
      'Carbon Plate': false,
      Waterproof: false,
      'Best For': 'Daily Training',
    },
  },
  {
    name: 'TrailForge Pro',
    price: '$210',
    specs: {
      Weight: '10.4 oz',
      Drop: '6mm',
      Cushioning: 'Max',
      'Carbon Plate': true,
      Waterproof: true,
      'Best For': 'Trail / Ultra',
    },
  },
];

const defaultFeatures = [
  'Weight',
  'Drop',
  'Cushioning',
  'Carbon Plate',
  'Waterproof',
  'Best For',
];

const meta = {
  title: 'Components/ComparisonTable',
  component: ComparisonTable,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Product comparison table. Columns are products, rows are feature specs. Boolean values render as ✓/✗. Optional highlight for recommended column.',
      },
    },
  },
  argTypes: {
    variant: { control: 'select', options: ['default', 'compact'] },
  },
} satisfies Meta<typeof ComparisonTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    heading: 'Compare Models',
    products: defaultProducts,
    features: defaultFeatures,
    highlightIndex: 0,
    variant: 'default',
  },
};

export const ThreeProducts: Story = {
  args: {
    heading: 'Find Your Perfect Match',
    products: defaultProducts,
    features: defaultFeatures,
    highlightIndex: 1,
    variant: 'default',
  },
};

export const Compact: Story = {
  args: {
    heading: 'Compare Models',
    products: defaultProducts,
    features: defaultFeatures,
    highlightIndex: 2,
    variant: 'compact',
  },
};
