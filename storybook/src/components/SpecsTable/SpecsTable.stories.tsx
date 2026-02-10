import type { Meta, StoryObj } from '@storybook/react';
import { SpecsTable } from './SpecsTable';

const meta = {
  title: 'Components/SpecsTable',
  component: SpecsTable,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Product specification table with alternating row colors. Highlight rows use accent color. Supports default, card, and compact variants.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'card', 'compact'],
    },
    theme: {
      control: 'select',
      options: ['light', 'dark'],
    },
  },
} satisfies Meta<typeof SpecsTable>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultSpecs = [
  { label: 'Weight', value: '8.2 oz' },
  { label: 'Drop', value: '8mm', highlight: true },
  { label: 'Upper', value: 'AeroWeave™ Mesh', highlight: true },
  { label: 'Midsole', value: 'ReactFoam Pro' },
  { label: 'Outsole', value: 'Continental™ Rubber' },
  { label: 'Stack Height', value: '32mm / 24mm' },
  { label: 'Width', value: 'Standard (D)' },
  { label: 'Carbon Plate', value: 'Yes', highlight: true },
];

export const Default: Story = {
  args: {
    heading: 'Technical Specifications',
    specs: defaultSpecs,
    variant: 'default',
    theme: 'light',
  },
};

export const CardVariant: Story = {
  args: {
    heading: 'Technical Specifications',
    specs: defaultSpecs,
    variant: 'card',
    theme: 'light',
  },
};

export const Compact: Story = {
  args: {
    heading: 'Specs',
    specs: defaultSpecs,
    variant: 'compact',
    theme: 'light',
  },
};

export const DarkTheme: Story = {
  args: {
    heading: 'Technical Specifications',
    specs: defaultSpecs,
    variant: 'card',
    theme: 'dark',
  },
  decorators: [
    (Story) => (
      <div style={{ padding: '24px', background: '#1E293B', borderRadius: '8px' }}>
        <Story />
      </div>
    ),
  ],
};
